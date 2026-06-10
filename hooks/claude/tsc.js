import path from "node:path"
import ts from "typescript"
// read stdin
async function readInput() {
  const chunks = []
  for await (const chunk of process.stdin) {
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString())
}

function runTypeCheck(configPath) {
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile)

  if (configFile.error) {
    console.error(
      ts.formatDiagnostic(configFile.error, {
        getCanonicalFileName: (x) => x,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
      })
    )
    return
  }

  const parseConfigHost = {
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    onUnRecoverableConfigFileDiagnostic: () => {},
  }

  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    parseConfigHost,
    path.dirname(configPath)
  )
  const compilerOptions = {
    ...parsed.options,
    noEmit: true,
    // Persist type info between runs so only the first check is a cold,
    // full-project pass; later edits reuse cached results.
    incremental: true,
    tsBuildInfoFile: path.join(
      path.dirname(configPath),
      "node_modules/.cache/tsc-hook/tsconfig.tsbuildinfo"
    ),
  }

  const program = ts.createIncrementalProgram({
    rootNames: parsed.fileNames,
    options: compilerOptions,
    projectReferences: parsed.projectReferences,
  })

  const allDiagnostics = [
    ...program.getConfigFileParsingDiagnostics(),
    ...program.getOptionsDiagnostics(),
    ...program.getGlobalDiagnostics(),
    ...program.getSyntacticDiagnostics(),
    ...program.getSemanticDiagnostics(),
  ]

  // Write the .tsbuildinfo cache (noEmit means no JS is emitted, only the
  // build-info file) so the next run can be incremental.
  program.emit()

  if(allDiagnostics.length > 0) {
    const formatHost = {
        getCanonicalFileName: (path) => path,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine
    }
    const formattedDiagnostics = ts.formatDiagnostics(allDiagnostics, formatHost)

    return formattedDiagnostics; // Type check failed
  }
  return null; // Type check passed
}

async function main() {
    const input = await readInput()
    const file = input.tool_response?.filePath || input.tool_input?.file_path

    if(!file || !/\.(ts|tsx)$/.test(file)){
        process.exit(0)
    }
    const typeChecks = runTypeCheck("./tsconfig.json")
    if(typeChecks) {
        console.error(typeChecks)
        process.exit(2)
    }
}

main();
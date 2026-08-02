import type { Credential } from "./data"

export function CertCard({
  credential,
  status,
}: {
  credential: Credential
  status: string
}) {
  return (
    <div className="grid grid-cols-1 border-2 border-foreground bg-background shadow-[4px_4px_0_0_var(--foreground)] sm:grid-cols-[70px_1fr_auto]">
      {/* issuer block — inverted, mirrors the design's .cert-card .mono */}
      <div className="flex items-center justify-center border-b-2 border-foreground bg-foreground p-3 font-heading text-lg font-black tracking-tight text-background sm:border-r-2 sm:border-b-0">
        {credential.mono}
      </div>

      <div className="min-w-0 p-4">
        <div className="flex flex-wrap items-center gap-2 text-[10px] tracking-widest uppercase">
          <span className="font-bold">{credential.issuer}</span>
          <span className="border border-foreground px-1.5 py-0.5">
            {credential.track}
          </span>
        </div>
        <h3 className="mt-2 font-heading text-lg leading-tight font-black tracking-tight text-pretty">
          {credential.name}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <span className="font-bold">{credential.year}</span>
          {credential.id ? (
            <>
              <span aria-hidden>/</span>
              <span>ID {credential.id}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-3 border-t-2 border-foreground p-4 sm:min-w-32 sm:flex-col sm:items-end sm:justify-between sm:border-t-0 sm:border-l-2">
        <span className="w-max border-2 border-foreground bg-foreground px-2 py-0.5 text-[10px] font-bold tracking-widest text-background uppercase">
          ✓ {status}
        </span>
        {credential.url ? (
          <a
            href={credential.url}
            target="_blank"
            rel="noreferrer"
            className="w-max border-b-2 border-foreground text-[11px] font-bold tracking-wider uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            verificar ↗
          </a>
        ) : null}
      </div>
    </div>
  )
}

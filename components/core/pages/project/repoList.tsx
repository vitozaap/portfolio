export interface Repo {
  name: string
  description: string
  url: string
}

export function RepoList({ repos }: { repos: Repo[] }) {
  return (
    <div className="flex flex-col gap-3">
      {repos.map((repo) => (
        <a
          key={repo.url}
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col gap-3 border-2 border-foreground p-4 transition-colors hover:bg-foreground hover:text-background sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex min-w-0 flex-col gap-1">
            <span className="font-bold tracking-wide max-sm:text-sm">
              {repo.name}
            </span>
            <span className="text-sm text-foreground/70 group-hover:text-background/70 max-sm:text-xs">
              {repo.description}
            </span>
          </span>
          <span className="shrink-0 border-2 border-current px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase max-sm:w-max">
            → repo
          </span>
        </a>
      ))}
    </div>
  )
}

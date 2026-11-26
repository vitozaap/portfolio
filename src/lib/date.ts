// Datas no formato "2024", "2023 - 2024" ou "2025 - atual"
export function parseYears(date: string) {
  const years = date.match(/\d{4}/g)?.map(Number) ?? []
  const start = years[0] ?? 0
  const end = isCurrent(date) ? Infinity : (years.at(-1) ?? start)
  return { start, end }
}

export function isCurrent(date: string) {
  return date.includes("atual")
}

// Mais recente primeiro: compara o ano final e, em seguida, o inicial
export function compareDatesDesc(a: string, b: string) {
  const aYears = parseYears(a)
  const bYears = parseYears(b)
  if (aYears.end !== bYears.end) return bYears.end - aYears.end
  return bYears.start - aYears.start
}

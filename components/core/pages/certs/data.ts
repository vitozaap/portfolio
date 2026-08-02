// Credentials split by what the underlying document actually proves:
// `certifications` are proctored exams, `courses` are completion certificates.
// Keeping them apart means neither has to be described as the other.

export interface Credential {
  issuer: string
  // Two or three letters for the badge block on the left of the card.
  mono: string
  name: string
  track: string
  year: string
  id?: string
  // Public verification page. Omitted when the issuer provides none — the card
  // then renders without a link rather than pointing somewhere unverifiable.
  url?: string
}

export const certifications: Credential[] = [
  {
    issuer: "AWS",
    mono: "AWS",
    name: "AWS Certified Cloud Practitioner",
    track: "Foundational",
    year: "2026",
    id: "CLF-C02",
    url: "https://www.credly.com/badges/aa9c6f00-2b7e-4422-bd34-21793e61452f/public_url",
  },
]

export const courses: Credential[] = [
  {
    issuer: "Harvard University",
    mono: "H",
    name: "CS50's Introduction to Programming with Python",
    track: "CS50 · edX",
    year: "2026",
    url: "https://cs50.harvard.edu/certificates/cc135a27-67e6-45e4-b1f5-75b62c6d0c84",
  },
  {
    issuer: "Anthropic",
    mono: "AN",
    name: "Anthropic Academy",
    track: "Claude Code 101 · Claude Code in Action · AI Fluency",
    year: "2026",
  },
  {
    issuer: "DataCamp",
    mono: "DC",
    name: "GitHub Foundations",
    track: "Curso de 9h · preparatório para a certificação da GitHub",
    year: "2026",
    id: "889459",
  },
]

export const resume = {
  file: "/victor-santos-cv.pdf",
  name: "victor-santos-cv.pdf",
  updated: "2026",
}

import { certImages, certLogos } from "../assets/index";

export type CertificateCategory =
  | "Programming"
  | "Web Development"
  | "Artificial Intelligence"
  | "Research"
  | "Competition"
  | "Teaching"
  | "Leadership"
  | "UI/UX";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  thumbnail: string;
  category: CertificateCategory;
  credentialId: string;
  issueDate: string;
  verifyUrl: string;
  featured?: boolean;
}

export const categoryColors: Record<CertificateCategory, string> = {
  Programming: "#2563EB",
  "Web Development": "#7C3AED",
  "Artificial Intelligence": "#FACC15",
  Research: "#22C55E",
  Competition: "#EF4444",
  Teaching: "#2563EB",
  Leadership: "#7C3AED",
  "UI/UX": "#22C55E",
};

export const certificateCategories: (CertificateCategory | "All")[] = [
  "All",
  "Programming",
  "Web Development",
  "Artificial Intelligence",
  "Research",
  "Competition",
  "Teaching",
  "Leadership",
  "UI/UX",
];

export const certificateStats = [
  { value: 0, suffix: "+", label: "Lorem Ipsum" },
  { value: 0, suffix: "", label: "Lorem Ipsum" },
  { value: 0, suffix: "", label: "Lorem Ipsum" },
  { value: 0, suffix: "", label: "Lorem Ipsum", display: "0000-0000" },
];

export const certificates: Certificate[] = [
  {
    id: "cert-01",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-01"],
    category: "Web Development",
    credentialId: "LOREM-0000-0000",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0000",
    featured: true,
  },
  {
    id: "cert-02",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-02"],
    category: "Artificial Intelligence",
    credentialId: "LOREM-0000-0001",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0001",
  },
  {
    id: "cert-03",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-03"],
    category: "Competition",
    credentialId: "LOREM-0000-0002",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0002",
  },
  {
    id: "cert-04",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-04"],
    category: "UI/UX",
    credentialId: "LOREM-0000-0003",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0003",
  },
  {
    id: "cert-05",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-05"],
    category: "Teaching",
    credentialId: "LOREM-0000-0004",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0004",
  },
  {
    id: "cert-06",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-06"],
    category: "Research",
    credentialId: "LOREM-0000-0005",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0005",
  },
  {
    id: "cert-07",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-07"],
    category: "Leadership",
    credentialId: "LOREM-0000-0006",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0006",
  },
  {
    id: "cert-08",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-08"],
    category: "Web Development",
    credentialId: "LOREM-0000-0007",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0007",
  },
  {
    id: "cert-09",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-09"],
    category: "Programming",
    credentialId: "LOREM-0000-0008",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0008",
  },
  {
    id: "cert-10",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-10"],
    category: "Competition",
    credentialId: "LOREM-0000-0009",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0009",
  },
  {
    id: "cert-11",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-11"],
    category: "Artificial Intelligence",
    credentialId: "LOREM-0000-0010",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0010",
  },
  {
    id: "cert-12",
    title: "Lorem Ipsum Dolor Sit Amet",
    issuer: "Lorem Ipsum",
    issuerLogo: certLogos["logo-placeholder"],
    thumbnail: certImages["certificate-12"],
    category: "Teaching",
    credentialId: "LOREM-0000-0011",
    issueDate: "2026-01-01",
    verifyUrl: "https://example.com/verify/LOREM-0000-0011",
  },
];

export const certificateTimeline = [2021, 2022, 2023, 2024, 2025, 2026];
export type ExperienceCategory = 'all' | 'hospital' | 'industry' | 'distribution' | 'community' | 'organization';

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface ExperienceItem {
  id: string;
  type: 'practical' | 'organization' | 'other';
  institution: string;
  badgeLabel: string; // e.g. "RSUD Andi Makkasau | Hospital Pharmacy"
  role: string;
  programType: string;
  period: string;
  location: string;
  category: ExperienceCategory;
  categoryLabel: string;
  shortSummary: string;
  fullOverview: string;
  image?: string;
  galleryPhotos: GalleryPhoto[];
  dutiesAndAchievements: string[];
  regulatoryStandards: string[];
  competencies: string[];
  metrics: { label: string; value: string }[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  scale: string;
  honors?: string;
  focus: string;
  achievements: string[];
}

export interface SkillBadge {
  name: string;
  description?: string;
  level?: string;
}

export interface SkillCategoryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: SkillBadge[];
}

export interface CertificateCardItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  description?: string;
  imageUrl?: string;
  certificateUrl?: string; // Tautan URL eksternal ke sertifikat asli
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  year: string;
  authors: string;
  abstractSummary: string;
  customDescription?: string; // Keterangan singkat yang hanya bisa diedit eksklusif oleh admin
  url: string;
  keywords: string[];
}

export interface PersonalInfo {
  name: string;
  shortGreeting: string;
  displayBadge: string;
  yearBadge: string;
  role: string;
  specialization: string;
  summary: string;
  email: string;
  whatsapp: string;
  whatsappUrl: string;
  linkedin: string;
  linkedinUrl: string;
  location: string;
}

export interface SectionHeaders {
  pkpaBadge: string;
  pkpaTitle: string;
  pkpaSubtitle: string;
  orgBadge: string;
  orgTitle: string;
  orgSubtitle: string;
  skillsBadge: string;
  skillsTitle: string;
  skillsSubtitle: string;
  certBadge: string;
  certTitle: string;
  certSubtitle: string;
  pubBadge: string;
  pubTitle: string;
  pubSubtitle: string;
  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  otherBadge: string;
  otherTitle: string;
  otherSubtitle: string;
}

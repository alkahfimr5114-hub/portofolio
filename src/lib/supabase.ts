import { createClient } from '@supabase/supabase-js';
import { 
  PersonalInfo, 
  EducationItem, 
  ExperienceItem, 
  SkillCategoryItem, 
  CertificateCardItem, 
  PublicationItem,
  SectionHeaders
} from '../types/pharmacy';
import { Project } from '../types/portfolio';

export interface FullPortfolioData {
  personalInfo: PersonalInfo;
  profilePhoto: string;
  educationList: EducationItem[];
  practicalExperiences: ExperienceItem[];
  organizationExperiences: ExperienceItem[];
  skillGroups: SkillCategoryItem[];
  certificates: CertificateCardItem[];
  publication: PublicationItem;
  projects?: Project[];
  sectionHeaders?: SectionHeaders;
  otherExperiences?: ExperienceItem[];
}

export const DEFAULT_SECTION_HEADERS: SectionHeaders = {
  pkpaBadge: "PKPA WORKS & PRAKTIK PROFESI APOTEKER",
  pkpaTitle: "Pengalaman Praktik Kefarmasian",
  pkpaSubtitle: "Setiap kartu memiliki Halaman Detail tersendiri dengan rincian tugas komprehensif, kepatuhan regulasi, serta Galeri Dokumentasi Foto PKPA.",
  orgBadge: "KEPEMIMPINAN & ASISTENSI LABORATORIUM",
  orgTitle: "Pengalaman Organisasi & Akademik",
  orgSubtitle: "Peran kepemimpinan dalam bimbingan ratusan praktikan laboratorium mikrobiologi dan diplomasi kemitraan antarkampus farmasi.",
  skillsBadge: "KEAHLIAN TEKNIS & REGULATORI",
  skillsTitle: "Tools & Keterampilan Kefarmasian",
  skillsSubtitle: "Instrumen analisis, pengawasan mutu, perangkat lunak farmasi, dan kepatuhan sistem regulasi.",
  certBadge: "SERTIFIKASI & PELATIHAN",
  certTitle: "Lisensi & Pengembangan Kompetensi",
  certSubtitle: "Sertifikasi resmi, surat tanda registrasi, dan lokakarya kefarmasian terverifikasi.",
  pubBadge: "PUBLIKASI ILMIAH & RISET",
  pubTitle: "Karya Ilmiah & Penelitian",
  pubSubtitle: "Kontribusi riset farmasi, formulasi, dan publikasi jurnal terakreditasi.",
  contactBadge: "HUBUNGI SAYA",
  contactTitle: "Koneksi & Kolaborasi Profesional",
  contactSubtitle: "Terbuka untuk peluang karier kefarmasian, kolaborasi riset, dan diskusi profesional.",
  otherBadge: "REKAM JEJAK & PENCAPAIAN TAMBAHAN",
  otherTitle: "Pengalaman dan Pencapaian Lainnya",
  otherSubtitle: "Dokumentasi kegiatan, proyek kolaborasi, kompetisi, dan pencapaian profesional lainnya.",
};

export const SUPABASE_URL = "https://xhzudsuwkvwgskgpvllk.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_42ZVOj6RjARC8yayvM8vjw_B_oma7a0";

export const isSupabaseConfigured = true;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

const SETTINGS_ROW_ID = 'main';
const TABLE_NAME = 'portfolio_settings';

/**
 * Fetch portfolio data from Supabase 'portfolio_settings' table.
 * Returns null if Supabase is not configured or query fails.
 */
export async function fetchPortfolioSettings(): Promise<Partial<FullPortfolioData> | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', SETTINGS_ROW_ID)
      .maybeSingle();

    if (error) {
      // If table doesn't exist yet or query fails, log warning and return null
      console.warn('[Supabase Sync] Note during fetch:', error.message);
      return null;
    }

    if (!data) return null;

    // Support both wrapped `data` payload and direct column storage
    if (data.data && typeof data.data === 'object') {
      return data.data as Partial<FullPortfolioData>;
    }

    return {
      personalInfo: data.personal_info || data.personalInfo,
      profilePhoto: data.profile_photo || data.profilePhoto,
      educationList: data.education_list || data.educationList,
      practicalExperiences: data.practical_experiences || data.practicalExperiences,
      organizationExperiences: data.organization_experiences || data.organizationExperiences,
      skillGroups: data.skill_groups || data.skillGroups,
      certificates: data.certificates,
      publication: data.publication,
      sectionHeaders: data.section_headers || data.sectionHeaders,
      otherExperiences: data.other_experiences || data.otherExperiences,
    };
  } catch (err) {
    console.warn('[Supabase Sync] Fetch error:', err);
    return null;
  }
}

/**
 * Save updated portfolio data to Supabase 'portfolio_settings' table
 * and mirror to localStorage for instantaneous offline availability.
 */
export async function savePortfolioSettings(portfolioData: FullPortfolioData): Promise<boolean> {
  // Always update localStorage first for zero-latency local experience
  try {
    localStorage.setItem('alkahfi_personal_info', JSON.stringify(portfolioData.personalInfo));
    localStorage.setItem('alkahfi_profile_photo', portfolioData.profilePhoto);
    localStorage.setItem('alkahfi_education', JSON.stringify(portfolioData.educationList));
    localStorage.setItem('alkahfi_practical_exp_v2', JSON.stringify(portfolioData.practicalExperiences));
    localStorage.setItem('alkahfi_org_exp', JSON.stringify(portfolioData.organizationExperiences));
    if (portfolioData.otherExperiences) {
      localStorage.setItem('alkahfi_other_exp', JSON.stringify(portfolioData.otherExperiences));
    }
    localStorage.setItem('alkahfi_skills', JSON.stringify(portfolioData.skillGroups));
    localStorage.setItem('alkahfi_certificates', JSON.stringify(portfolioData.certificates));
    localStorage.setItem('alkahfi_publication', JSON.stringify(portfolioData.publication));
    if (portfolioData.sectionHeaders) {
      localStorage.setItem('alkahfi_section_headers', JSON.stringify(portfolioData.sectionHeaders));
    }
  } catch (e) {
    console.error('[Storage] Error saving to localStorage:', e);
  }

  try {
    // Upsert into portfolio_settings with { id: 'main', data }
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({
        id: SETTINGS_ROW_ID,
        data: portfolioData,
      }, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase Sync] Upsert notice:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Sync] Save error:', err);
    return false;
  }
}

/**
 * Subscribe to real-time changes on the 'portfolio_settings' table
 */
export function subscribeToPortfolioChanges(
  onUpdate: (data: Partial<FullPortfolioData>) => void
): () => void {
  if (!supabase) return () => {};

  try {
    const channel = supabase
      .channel('public:portfolio_settings_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: TABLE_NAME },
        (payload) => {
          if (payload.new) {
            const raw = payload.new as Record<string, unknown>;
            if (raw.data && typeof raw.data === 'object') {
              onUpdate(raw.data as Partial<FullPortfolioData>);
            } else {
              onUpdate({
                personalInfo: (raw.personal_info || raw.personalInfo) as PersonalInfo | undefined,
                profilePhoto: (raw.profile_photo || raw.profilePhoto) as string | undefined,
                educationList: (raw.education_list || raw.educationList) as EducationItem[] | undefined,
                practicalExperiences: (raw.practical_experiences || raw.practicalExperiences) as ExperienceItem[] | undefined,
                organizationExperiences: (raw.organization_experiences || raw.organizationExperiences) as ExperienceItem[] | undefined,
                otherExperiences: (raw.other_experiences || raw.otherExperiences) as ExperienceItem[] | undefined,
                skillGroups: (raw.skill_groups || raw.skillGroups) as SkillCategoryItem[] | undefined,
                certificates: raw.certificates as CertificateCardItem[] | undefined,
                publication: raw.publication as PublicationItem | undefined,
                sectionHeaders: (raw.section_headers || raw.sectionHeaders) as SectionHeaders | undefined,
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('[Supabase Realtime] Setup notice:', err);
    return () => {};
  }
}

export const BUCKET_NAME = 'portfolio-images';

export interface StorageUploadResult {
  url: string;
  isCloud: boolean;
  error?: string;
}

/**
 * Automatically converts Google Drive share links to high-resolution direct image URLs
 * that bypass browser CORS restrictions (https://lh3.googleusercontent.com/d/ID=w1000).
 */
export function formatImageUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Google Drive file link: /file/d/ID/view or /file/d/ID
  const driveFileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}=w1000`;
  }

  // Google Drive url parameter: /open?id=ID or /uc?id=ID or &id=ID
  const driveIdMatch = trimmed.match(/drive\.google\.com\/(?:open|uc)\?(?:[^&]*&)*id=([a-zA-Z0-9_-]+)/i);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}=w1000`;
  }

  return trimmed;
}

/**
 * Compresses an image file using an HTML5 Canvas to max dimension 900px, JPEG quality 0.75.
 * Yields an ultra-lightweight (<150KB), high-performance image suitable for JSONB or Storage.
 */
export function compressImageWithCanvas(
  file: File,
  maxDimension: number = 900,
  quality: number = 0.75
): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve((event.target?.result as string) || '');
          return;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve((event.target?.result as string) || '');
      };
      img.src = (event.target?.result as string) || '';
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

/**
 * Upload an image file to Supabase Storage bucket 'portfolio-images'.
 * 1. Client-side Canvas compression (max 900px, image/jpeg, 0.75 quality, <150KB).
 * 2. Uploads compressed blob to Supabase Storage bucket 'portfolio-images'.
 * 3. If storage upload succeeds, returns publicUrl.
 * 4. If storage bucket fails or restricted, returns compressed Canvas data URL,
 *    ensuring 100% permanent persistence in Supabase portfolio_settings JSONB.
 */
export async function uploadImageToSupabaseStorage(
  file: File,
  folder: string = 'general'
): Promise<StorageUploadResult> {
  const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9.]/g, '_');
  const filePath = `${folder}/${Date.now()}-${cleanName}.jpg`;

  // a. Client-side compression
  let compressedDataUrl = '';
  try {
    compressedDataUrl = await compressImageWithCanvas(file, 900, 0.75);
  } catch (err) {
    console.warn('[Canvas] Compression notice:', err);
  }

  // Convert compressed dataUrl to Blob
  let blobToUpload: Blob | null = null;
  if (compressedDataUrl && compressedDataUrl.startsWith('data:image/jpeg;base64,')) {
    try {
      const base64Data = compressedDataUrl.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blobToUpload = new Blob([byteArray], { type: 'image/jpeg' });
    } catch (e) {
      console.warn('[Blob conversion notice]:', e);
    }
  }

  // b. Try Supabase Storage upload
  if (supabase) {
    try {
      const uploadTarget = blobToUpload || file;
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, uploadTarget, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg',
        });

      if (!error && data?.path) {
        const publicUrl = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(filePath).data.publicUrl;

        if (publicUrl) {
          return {
            url: formatImageUrl(publicUrl),
            isCloud: true,
          };
        }
      } else if (error) {
        console.warn('[Supabase Storage] Notice:', error.message);
      }
    } catch (err: any) {
      console.warn('[Supabase Storage] Exception:', err);
    }
  }

  // c. Return lightweight Canvas dataUrl (<150KB) for permanent JSONB database storage
  return {
    url: compressedDataUrl || '',
    isCloud: false,
    error: 'Disimpan via kompresi database portfolio_settings (Storage bucket belum aktif).',
  };
}

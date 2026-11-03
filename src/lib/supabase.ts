import { createClient } from '@supabase/supabase-js';
import { 
  PersonalInfo, 
  EducationItem, 
  ExperienceItem, 
  SkillCategoryItem, 
  CertificateCardItem, 
  PublicationItem 
} from '../types/pharmacy';

export interface FullPortfolioData {
  personalInfo: PersonalInfo;
  profilePhoto: string;
  educationList: EducationItem[];
  practicalExperiences: ExperienceItem[];
  organizationExperiences: ExperienceItem[];
  skillGroups: SkillCategoryItem[];
  certificates: CertificateCardItem[];
  publication: PublicationItem;
}

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

function isValidHttpUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  isValidHttpUrl(supabaseUrl)
);

export const supabase = isSupabaseConfigured
  ? (() => {
      try {
        return createClient(supabaseUrl, supabaseAnonKey, {
          auth: { persistSession: false },
        });
      } catch (e) {
        console.warn('[Supabase] Init notice:', e);
        return null;
      }
    })()
  : null;

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
    localStorage.setItem('alkahfi_skills', JSON.stringify(portfolioData.skillGroups));
    localStorage.setItem('alkahfi_certificates', JSON.stringify(portfolioData.certificates));
    localStorage.setItem('alkahfi_publication', JSON.stringify(portfolioData.publication));
  } catch (e) {
    console.error('[Storage] Error saving to localStorage:', e);
  }

  if (!supabase) {
    return false;
  }

  try {
    // Upsert into portfolio_settings
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({
        id: SETTINGS_ROW_ID,
        data: portfolioData,
        personal_info: portfolioData.personalInfo,
        profile_photo: portfolioData.profilePhoto,
        education_list: portfolioData.educationList,
        practical_experiences: portfolioData.practicalExperiences,
        organization_experiences: portfolioData.organizationExperiences,
        skill_groups: portfolioData.skillGroups,
        certificates: portfolioData.certificates,
        publication: portfolioData.publication,
        updated_at: new Date().toISOString(),
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
                skillGroups: (raw.skill_groups || raw.skillGroups) as SkillCategoryItem[] | undefined,
                certificates: raw.certificates as CertificateCardItem[] | undefined,
                publication: raw.publication as PublicationItem | undefined,
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
 * Compresses an image file using an HTML5 Canvas to max width 800px, JPEG quality 0.7.
 * Returns a lightweight, high-performance base64 data URL.
 */
export function compressImageWithCanvas(
  file: File,
  maxWidth: number = 800,
  quality: number = 0.7
): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve((event.target?.result as string) || '');
          return;
        }

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
 * Uses format: `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
 * Automatically retrieves the public URL for permanent cloud access.
 * If cloud upload fails or bucket is unavailable, safely falls back to Canvas compression (max 800px, quality 0.7)
 * so user edits are preserved without interruption and save cleanly to Supabase portfolio_settings.
 */
export async function uploadImageToSupabaseStorage(
  file: File,
  folder: string = 'general'
): Promise<StorageUploadResult> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
  const filePath = `${folder}/${Date.now()}-${cleanName}`;

  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'image/jpeg',
        });

      if (!error && data?.path) {
        const publicUrl = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(filePath).data.publicUrl;

        if (publicUrl) {
          return {
            url: publicUrl,
            isCloud: true,
          };
        }
      } else if (error) {
        console.warn('[Supabase Storage] Upload notice:', error.message);
      }
    } catch (err: any) {
      console.warn('[Supabase Storage] Upload exception:', err);
    }
  }

  // Fallback to Canvas compression (max 800px, quality 0.7 JPEG base64 DataURL)
  try {
    const compressedUrl = await compressImageWithCanvas(file, 800, 0.7);
    return {
      url: compressedUrl,
      isCloud: false,
      error: 'Foto dikompresi & disimpan ke database portfolio_settings (Storage bucket belum aktif).',
    };
  } catch (canvasErr) {
    console.warn('[Canvas Compression] Fallback to raw DataURL:', canvasErr);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          url: (e.target?.result as string) || '',
          isCloud: false,
        });
      };
      reader.onerror = () => resolve({ url: '', isCloud: false });
      reader.readAsDataURL(file);
    });
  }
}

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Lock, Cloud, CloudUpload, Check } from 'lucide-react';
import { FuturisticBackground } from './components/FuturisticBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceOverview } from './components/ExperienceOverview';
import { ExperienceDetailModal } from './components/ExperienceDetailModal';
import { Skills } from './components/Skills';
import { Publication } from './components/Publication';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { AdminPinModal } from './components/AdminPinModal';
import { ExperienceItem, EducationItem, SkillCategoryItem, CertificateCardItem, PublicationItem, PersonalInfo } from './types/pharmacy';
import { 
  PERSONAL_INFO, 
  PROFILE_PHOTO, 
  EDUCATION_DATA, 
  PRACTICAL_EXPERIENCES, 
  ORGANIZATIONAL_EXPERIENCES, 
  SKILL_GROUPS, 
  INITIAL_CERTIFICATES,
  SCIENTIFIC_PUBLICATION 
} from './data/pharmacyData';
import { 
  fetchPortfolioSettings, 
  savePortfolioSettings, 
  subscribeToPortfolioChanges, 
  isSupabaseConfigured,
  FullPortfolioData 
} from './lib/supabase';

const DEFAULT_FALLBACK_IMAGES: Record<string, string> = {
  hospital: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
  industry: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop',
  distribution: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
  community: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1200&auto=format&fit=crop',
  organization: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200&auto=format&fit=crop',
};

const defaultPracticalMap = new Map<string, ExperienceItem>(
  PRACTICAL_EXPERIENCES.map((item) => [item.id, item])
);
const defaultOrgMap = new Map<string, ExperienceItem>(
  ORGANIZATIONAL_EXPERIENCES.map((item) => [item.id, item])
);

function mergeWithDefaultPracticalExperience(item: any): ExperienceItem {
  if (!item || typeof item !== 'object') {
    return PRACTICAL_EXPERIENCES[0];
  }
  const defaultItem = defaultPracticalMap.get(item.id);
  const category = item.category || defaultItem?.category || 'hospital';
  const fallbackImg = DEFAULT_FALLBACK_IMAGES[category] || DEFAULT_FALLBACK_IMAGES.default;

  // Merge fullOverview
  const fullOverview = (typeof item.fullOverview === 'string' && item.fullOverview.trim().length > 0)
    ? item.fullOverview
    : (defaultItem?.fullOverview || item.shortSummary || defaultItem?.shortSummary || 'Pengalaman praktik kefarmasian komprehensif.');

  // Merge dutiesAndAchievements
  const dutiesAndAchievements = (Array.isArray(item.dutiesAndAchievements) && item.dutiesAndAchievements.length > 0)
    ? item.dutiesAndAchievements
    : (defaultItem?.dutiesAndAchievements || []);

  // Merge regulatoryStandards
  const regulatoryStandards = (Array.isArray(item.regulatoryStandards) && item.regulatoryStandards.length > 0)
    ? item.regulatoryStandards
    : (defaultItem?.regulatoryStandards || []);

  // Merge competencies
  const competencies = (Array.isArray(item.competencies) && item.competencies.length > 0)
    ? item.competencies
    : (defaultItem?.competencies || []);

  // Merge metrics
  const metrics = (Array.isArray(item.metrics) && item.metrics.length > 0)
    ? item.metrics
    : (defaultItem?.metrics || []);

  // Image & galleryPhotos
  let image = item.image;
  if (!image || typeof image !== 'string' || image.startsWith('/src/assets/')) {
    image = defaultItem?.image || fallbackImg;
  }

  const rawPhotos = (Array.isArray(item.galleryPhotos) && item.galleryPhotos.length > 0)
    ? item.galleryPhotos
    : (defaultItem?.galleryPhotos || []);

  const galleryPhotos = rawPhotos.map((p: any, idx: number) => {
    let url = p?.url || '';
    if (!url || typeof url !== 'string' || url.startsWith('/src/assets/')) {
      url = defaultItem?.galleryPhotos?.[idx]?.url || fallbackImg;
    }
    return {
      id: p?.id || `photo-${idx}-${Date.now()}`,
      url,
      caption: p?.caption || defaultItem?.galleryPhotos?.[idx]?.caption || 'Dokumentasi Praktik Kefarmasian',
    };
  });

  return {
    ...item,
    type: 'practical',
    institution: item.institution || defaultItem?.institution || 'Instansi Kefarmasian',
    badgeLabel: item.badgeLabel || defaultItem?.badgeLabel || item.institution || 'PKPA',
    role: item.role || defaultItem?.role || 'Apoteker Praktik',
    period: item.period || defaultItem?.period || '',
    location: item.location || defaultItem?.location || 'Makassar, Sulawesi Selatan',
    category,
    categoryLabel: item.categoryLabel || defaultItem?.categoryLabel || 'Hospital Pharmacy',
    shortSummary: item.shortSummary || defaultItem?.shortSummary || fullOverview,
    fullOverview,
    image,
    galleryPhotos,
    dutiesAndAchievements,
    regulatoryStandards,
    competencies,
    metrics,
  };
}

function mergeWithDefaultOrgExperience(item: any): ExperienceItem {
  if (!item || typeof item !== 'object') {
    return ORGANIZATIONAL_EXPERIENCES[0];
  }
  const defaultItem = defaultOrgMap.get(item.id);
  const category = 'organization';
  const fallbackImg = DEFAULT_FALLBACK_IMAGES.organization || DEFAULT_FALLBACK_IMAGES.default;

  const fullOverview = (typeof item.fullOverview === 'string' && item.fullOverview.trim().length > 0)
    ? item.fullOverview
    : (defaultItem?.fullOverview || item.shortSummary || defaultItem?.shortSummary || 'Pengalaman organisasi & akademik.');

  const dutiesAndAchievements = (Array.isArray(item.dutiesAndAchievements) && item.dutiesAndAchievements.length > 0)
    ? item.dutiesAndAchievements
    : (defaultItem?.dutiesAndAchievements || []);

  const regulatoryStandards = (Array.isArray(item.regulatoryStandards) && item.regulatoryStandards.length > 0)
    ? item.regulatoryStandards
    : (defaultItem?.regulatoryStandards || []);

  const competencies = (Array.isArray(item.competencies) && item.competencies.length > 0)
    ? item.competencies
    : (defaultItem?.competencies || []);

  const metrics = (Array.isArray(item.metrics) && item.metrics.length > 0)
    ? item.metrics
    : (defaultItem?.metrics || []);

  let image = item.image;
  if (!image || typeof image !== 'string' || image.startsWith('/src/assets/')) {
    image = defaultItem?.image || fallbackImg;
  }

  const rawPhotos = (Array.isArray(item.galleryPhotos) && item.galleryPhotos.length > 0)
    ? item.galleryPhotos
    : (defaultItem?.galleryPhotos || []);

  const galleryPhotos = rawPhotos.map((p: any, idx: number) => {
    let url = p?.url || '';
    if (!url || typeof url !== 'string' || url.startsWith('/src/assets/')) {
      url = defaultItem?.galleryPhotos?.[idx]?.url || fallbackImg;
    }
    return {
      id: p?.id || `photo-${idx}-${Date.now()}`,
      url,
      caption: p?.caption || defaultItem?.galleryPhotos?.[idx]?.caption || 'Dokumentasi Organisasi',
    };
  });

  return {
    ...item,
    type: 'organization',
    institution: item.institution || defaultItem?.institution || 'Organisasi Mahasiswa',
    badgeLabel: item.badgeLabel || defaultItem?.badgeLabel || item.institution || 'Organisasi',
    role: item.role || defaultItem?.role || 'Pengurus',
    period: item.period || defaultItem?.period || '',
    location: item.location || defaultItem?.location || 'Makassar, Sulawesi Selatan',
    category,
    categoryLabel: item.categoryLabel || defaultItem?.categoryLabel || 'Academic & Organization',
    shortSummary: item.shortSummary || defaultItem?.shortSummary || fullOverview,
    fullOverview,
    image,
    galleryPhotos,
    dutiesAndAchievements,
    regulatoryStandards,
    competencies,
    metrics,
  };
}

function sanitizeCertificate(cert: any): CertificateCardItem {
  if (!cert || typeof cert !== 'object') {
    return INITIAL_CERTIFICATES[0];
  }
  let imageUrl = cert.imageUrl;
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.startsWith('/src/assets/')) {
    imageUrl = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop';
  }
  return { ...cert, imageUrl };
}

function sanitizeProfilePhoto(photo: any): string {
  if (!photo || typeof photo !== 'string' || photo.startsWith('/src/assets/')) {
    return PROFILE_PHOTO;
  }
  return photo;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [isCVOpen, setIsCVOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // START Gate state: User must click START on Landing screen to open the main portfolio
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Editable content state unlocked via PIN 261026
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // 1. Profile Photo
  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    return sanitizeProfilePhoto(localStorage.getItem('alkahfi_profile_photo')) || PROFILE_PHOTO;
  });

  // 2. Personal Info (Updated name to 'apt. Andi Al Kahfi Akihito MR, S.Farm' & cleaned terms)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem('alkahfi_personal_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name !== 'apt. Andi Al Kahfi Akihito MR, S.Farm') {
          parsed.name = 'apt. Andi Al Kahfi Akihito MR, S.Farm';
          parsed.shortGreeting = "Hello I'm apt. Andi Al Kahfi Akihito MR, S.Farm";
          localStorage.setItem('alkahfi_personal_info', JSON.stringify(parsed));
        }
        if (parsed.specialization) {
          parsed.specialization = parsed.specialization
            .replace(/Regulatory Affairs[,\s·]*/gi, '')
            .replace(/Sistem Mutu (\(CPKB\/CPOB\/CDOB\)\s*&\s*Pelayanan Farmasi|& Pelayanan Farmasi|dan Sistem Mutu)/gi, '')
            .replace(/dan Sistem Mutu\.?/gi, '')
            .trim();
          if (!parsed.specialization) {
            parsed.specialization = PERSONAL_INFO.specialization;
          }
        }
        if (parsed.summary) {
          parsed.summary = parsed.summary
            .replace(/Memiliki minat kuat pada Regulatory Affairs dan Sistem Mutu\.?/gi, '')
            .replace(/Regulatory Affairs dan Sistem Mutu/gi, '')
            .replace(/Regulatory Affairs/gi, '')
            .replace(/Sistem Mutu/gi, '')
            .replace(/lulusan terakreditasi/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return PERSONAL_INFO;
  });

  // 3. Education List (Sanitizing 'UMI' to full 'Universitas Muslim Indonesia')
  const [educationList, setEducationList] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem('alkahfi_education');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: EducationItem) => ({
            ...item,
            institution: item.institution?.replace(/Universitas Muslim Indonesia\s*\(UMI\)/gi, 'Universitas Muslim Indonesia').replace(/\bUMI\b/g, 'Universitas Muslim Indonesia') || item.institution,
            focus: item.focus?.replace(/\bUMI\b/g, 'Universitas Muslim Indonesia') || item.focus,
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return EDUCATION_DATA;
  });

  // 4. Practical Experiences (PKPA)
  const [practicalExperiences, setPracticalExperiences] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem('alkahfi_practical_exp_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(mergeWithDefaultPracticalExperience);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return PRACTICAL_EXPERIENCES.map(mergeWithDefaultPracticalExperience);
  });

  // 5. Organization Experiences (Sanitizing 'UMI' to full 'Universitas Muslim Indonesia')
  const [organizationExperiences, setOrganizationExperiences] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem('alkahfi_org_exp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(mergeWithDefaultOrgExperience);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return ORGANIZATIONAL_EXPERIENCES.map(mergeWithDefaultOrgExperience);
  });

  // 6. Skill Groups (Tools, Lab, Software)
  const [skillGroups, setSkillGroups] = useState<SkillCategoryItem[]>(() => {
    const saved = localStorage.getItem('alkahfi_skills');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return SKILL_GROUPS;
  });

  // 6.b Certificates (Cards system with image upload & custom external URLs)
  const [certificates, setCertificates] = useState<CertificateCardItem[]>(() => {
    const saved = localStorage.getItem('alkahfi_certificates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeCertificate);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CERTIFICATES.map(sanitizeCertificate);
  });

  // 7. Scientific Publication
  const [publication, setPublication] = useState<PublicationItem>(() => {
    const saved = localStorage.getItem('alkahfi_publication');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return SCIENTIFIC_PUBLICATION;
  });

  // Cloud Sync state
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const isInitialMount = useRef(true);

  // 1. Initial Cloud Sync from Supabase on load & Real-time subscription
  useEffect(() => {
    let isMounted = true;

    const loadFromCloud = async () => {
      if (!isSupabaseConfigured) return;
      setCloudSyncStatus('syncing');
      try {
        const cloudData = await fetchPortfolioSettings();
        if (cloudData && isMounted) {
          if (cloudData.personalInfo) setPersonalInfo(cloudData.personalInfo);
          if (cloudData.profilePhoto) setProfilePhoto(sanitizeProfilePhoto(cloudData.profilePhoto));
          if (cloudData.educationList) setEducationList(cloudData.educationList);
          if (cloudData.practicalExperiences) setPracticalExperiences(cloudData.practicalExperiences.map(mergeWithDefaultPracticalExperience));
          if (cloudData.organizationExperiences) setOrganizationExperiences(cloudData.organizationExperiences.map(mergeWithDefaultOrgExperience));
          if (cloudData.skillGroups) setSkillGroups(cloudData.skillGroups);
          if (cloudData.certificates) setCertificates(cloudData.certificates.map(sanitizeCertificate));
          if (cloudData.publication) setPublication(cloudData.publication);
          setCloudSyncStatus('synced');
        } else {
          setCloudSyncStatus('idle');
        }
      } catch (e) {
        console.warn('[Cloud Sync] Initial load notice:', e);
        if (isMounted) setCloudSyncStatus('idle');
      }
    };

    loadFromCloud();

    // 2. Real-time subscription for changes made from other admin sessions/devices
    const unsubscribe = subscribeToPortfolioChanges((updated) => {
      if (!isMounted) return;
      if (updated.personalInfo) setPersonalInfo(updated.personalInfo);
      if (updated.profilePhoto) setProfilePhoto(sanitizeProfilePhoto(updated.profilePhoto));
      if (updated.educationList) setEducationList(updated.educationList);
      if (updated.practicalExperiences) setPracticalExperiences(updated.practicalExperiences.map(mergeWithDefaultPracticalExperience));
      if (updated.organizationExperiences) setOrganizationExperiences(updated.organizationExperiences.map(mergeWithDefaultOrgExperience));
      if (updated.skillGroups) setSkillGroups(updated.skillGroups);
      if (updated.certificates) setCertificates(updated.certificates.map(sanitizeCertificate));
      if (updated.publication) setPublication(updated.publication);
      setCloudSyncStatus('synced');
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // 3. Centralized Auto-save to Supabase & localStorage whenever portfolio state changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const payload: FullPortfolioData = {
      personalInfo,
      profilePhoto,
      educationList,
      practicalExperiences,
      organizationExperiences,
      skillGroups,
      certificates,
      publication,
    };

    setCloudSyncStatus('syncing');
    const timer = setTimeout(() => {
      savePortfolioSettings(payload)
        .then(() => setCloudSyncStatus('synced'))
        .catch(() => setCloudSyncStatus('error'));
    }, 400);

    return () => clearTimeout(timer);
  }, [
    personalInfo,
    profilePhoto,
    educationList,
    practicalExperiences,
    organizationExperiences,
    skillGroups,
    certificates,
    publication,
  ]);

  // START / Masuk Portofolio handler
  const handleStartPortfolio = () => {
    setHasEntered(true);
    setTimeout(() => {
      const profileEl = document.getElementById('profile');
      if (profileEl) {
        profileEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Update Profile Photo
  const handleUpdateProfilePhoto = (newPhoto: string) => {
    setProfilePhoto(newPhoto);
    localStorage.setItem('alkahfi_profile_photo', newPhoto);
  };

  // Update Personal Info
  const handleUpdatePersonalInfo = (newInfo: PersonalInfo) => {
    setPersonalInfo(newInfo);
    localStorage.setItem('alkahfi_personal_info', JSON.stringify(newInfo));
  };

  // Education CRUD
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: 'Universitas / Institusi Baru',
      degree: 'Program Studi / Gelar',
      period: 'Bulan Tahun - Bulan Tahun',
      gpa: '3.80',
      scale: '4.00',
      honors: 'Dengan Pujian',
      focus: 'Fokus bidang pembelajaran, kefarmasian, atau riset.',
      achievements: ['Pencapaian atau keikutsertaan program utama.']
    };
    const updated = [...educationList, newEdu];
    setEducationList(updated);
    localStorage.setItem('alkahfi_education', JSON.stringify(updated));
  };

  const handleDeleteEducation = (id: string) => {
    const updated = educationList.filter(item => item.id !== id);
    setEducationList(updated);
    localStorage.setItem('alkahfi_education', JSON.stringify(updated));
  };

  const handleUpdateEducation = (updatedItem: EducationItem) => {
    const updated = educationList.map(item => item.id === updatedItem.id ? updatedItem : item);
    setEducationList(updated);
    localStorage.setItem('alkahfi_education', JSON.stringify(updated));
  };

  // PKPA CRUD
  const handleAddPracticalExperience = () => {
    const newId = `pkpa-${Date.now()}`;
    const newExp: ExperienceItem = {
      id: newId,
      type: 'practical',
      institution: 'Instansi / Rumah Sakit / Industri Baru',
      badgeLabel: 'Instansi Baru | PKPA',
      role: 'Apoteker Praktik / Bagian Farmasi',
      programType: 'Praktik Kerja Profesi Apoteker',
      period: 'Bulan Tahun - Bulan Tahun',
      location: 'Makassar, Sulawesi Selatan',
      category: 'hospital',
      categoryLabel: 'Hospital Pharmacy',
      shortSummary: 'Deskripsi ringkas aktivitas dan tanggung jawab praktik kefarmasian.',
      fullOverview: 'Ringkasan komprehensif alur pelayanan kefarmasian, manajemen perbekalan sediaan, pemantauan klinis, dan implementasi standar regulasi.',
      galleryPhotos: [],
      dutiesAndAchievements: [
        'Melaksanakan skrining resep dan pelayanan informasi obat (PIO).',
        'Penyusunan pelaporan administrasi dan penataan stok sediaan farmasi.'
      ],
      regulatoryStandards: ['Standar Pelayanan Kefarmasian', 'CPOB / CPKB / CDOB'],
      competencies: ['Pelayanan Farmasi', 'Dokumentasi Mutu'],
      metrics: [
        { label: 'Capaian', value: '100%' }
      ]
    };
    const updated = [newExp, ...practicalExperiences];
    setPracticalExperiences(updated);
    localStorage.setItem('alkahfi_practical_exp_v2', JSON.stringify(updated));
    setSelectedExperience(newExp);
  };

  const handleDeletePracticalExperience = (id: string) => {
    const updated = practicalExperiences.filter(item => item.id !== id);
    setPracticalExperiences(updated);
    localStorage.setItem('alkahfi_practical_exp_v2', JSON.stringify(updated));
    if (selectedExperience?.id === id) {
      setSelectedExperience(null);
    }
  };

  // Organization CRUD
  const handleAddOrganizationExperience = () => {
    const newId = `org-${Date.now()}`;
    const newOrg: ExperienceItem = {
      id: newId,
      type: 'organization',
      institution: 'Organisasi / Laboratorium Baru',
      badgeLabel: 'Organisasi Baru | Peran',
      role: 'Koordinator / Asisten / Pengurus',
      programType: 'Pengalaman Organisasi & Akademik',
      period: 'Tahun - Tahun',
      location: 'Makassar, Indonesia',
      category: 'organization',
      categoryLabel: 'Academic & Organization',
      shortSummary: 'Deskripsi kegiatan kepemimpinan, asistensi, dan kontribusi organisasi.',
      fullOverview: 'Peran kepemimpinan dalam mengelola kegiatan akademik/organisasi, koordinasi tim, dan kemitraan strategis.',
      galleryPhotos: [],
      dutiesAndAchievements: [
        'Memimpin koordinasi dan pelaksanaan program kerja organisasi.',
        'Menjalin komunikasi dan jejaring kemitraan strategis.'
      ],
      regulatoryStandards: ['Standar Organisasi Mahasiswa Farmasi'],
      competencies: ['Leadership', 'Teamwork', 'Communication'],
      metrics: [
        { label: 'Peserta / Binaan', value: '50+' }
      ]
    };
    const updated = [newOrg, ...organizationExperiences];
    setOrganizationExperiences(updated);
    localStorage.setItem('alkahfi_org_exp', JSON.stringify(updated));
    setSelectedExperience(newOrg);
  };

  const handleDeleteOrganizationExperience = (id: string) => {
    const updated = organizationExperiences.filter(item => item.id !== id);
    setOrganizationExperiences(updated);
    localStorage.setItem('alkahfi_org_exp', JSON.stringify(updated));
    if (selectedExperience?.id === id) {
      setSelectedExperience(null);
    }
  };

  // Update Experience detail
  const handleUpdateExperience = (updatedItem: ExperienceItem) => {
    if (updatedItem.type === 'practical') {
      const updatedList = practicalExperiences.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setPracticalExperiences(updatedList);
      localStorage.setItem('alkahfi_practical_exp_v2', JSON.stringify(updatedList));
    } else {
      const updatedList = organizationExperiences.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setOrganizationExperiences(updatedList);
      localStorage.setItem('alkahfi_org_exp', JSON.stringify(updatedList));
    }
    setSelectedExperience(updatedItem);
  };

  // Skills CRUD
  const handleAddSkillBadge = (groupId: string, badgeName: string) => {
    const updated = skillGroups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          items: [...group.items, { name: badgeName, description: '', level: '' }]
        };
      }
      return group;
    });
    setSkillGroups(updated);
    localStorage.setItem('alkahfi_skills', JSON.stringify(updated));
  };

  const handleDeleteSkillBadge = (groupId: string, badgeIndex: number) => {
    const updated = skillGroups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          items: group.items.filter((_, idx) => idx !== badgeIndex)
        };
      }
      return group;
    });
    setSkillGroups(updated);
    localStorage.setItem('alkahfi_skills', JSON.stringify(updated));
  };

  const handleDeleteSkillCategory = (groupId: string) => {
    const updated = skillGroups.filter((g) => g.id !== groupId);
    setSkillGroups(updated);
    localStorage.setItem('alkahfi_skills', JSON.stringify(updated));
  };

  const handleAddSkillCategory = (title: string) => {
    const newCategory: SkillCategoryItem = {
      id: `category-${Date.now()}`,
      title,
      description: '',
      icon: 'Award',
      items: [{ name: 'Keahlian Baru', description: '', level: '' }]
    };
    const updated = [...skillGroups, newCategory];
    setSkillGroups(updated);
    localStorage.setItem('alkahfi_skills', JSON.stringify(updated));
  };

  // Publication update
  const handleUpdatePublication = (updatedPub: PublicationItem) => {
    setPublication(updatedPub);
    localStorage.setItem('alkahfi_publication', JSON.stringify(updatedPub));
  };

  // Certificate CRUD
  const handleAddCertificate = () => {
    const newCert: CertificateCardItem = {
      id: `cert-${Date.now()}`,
      title: 'Nama Sertifikat / Lisensi Baru',
      issuer: 'Instansi / Lembaga Penerbit',
      date: '2026',
      description: 'Deskripsi singkat sertifikasi kompetensi atau pelatihan kefarmasian.',
      imageUrl: '/src/assets/images/pharmacist_portrait_1793688651919.jpg',
      certificateUrl: 'https://'
    };
    const updated = [newCert, ...certificates];
    setCertificates(updated);
    localStorage.setItem('alkahfi_certificates', JSON.stringify(updated));
  };

  const handleUpdateCertificate = (updatedItem: CertificateCardItem) => {
    const updated = certificates.map((c) => (c.id === updatedItem.id ? updatedItem : c));
    setCertificates(updated);
    localStorage.setItem('alkahfi_certificates', JSON.stringify(updated));
  };

  const handleDeleteCertificate = (id: string) => {
    const updated = certificates.filter((c) => c.id !== id);
    setCertificates(updated);
    localStorage.setItem('alkahfi_certificates', JSON.stringify(updated));
  };

  // Reset cache & restore default data
  const handleResetCache = () => {
    localStorage.removeItem('alkahfi_personal_info');
    localStorage.removeItem('alkahfi_profile_photo');
    localStorage.removeItem('alkahfi_education');
    localStorage.removeItem('alkahfi_practical_exp_v2');
    localStorage.removeItem('alkahfi_org_exp');
    localStorage.removeItem('alkahfi_skills');
    localStorage.removeItem('alkahfi_certificates');
    localStorage.removeItem('alkahfi_publication');

    setPersonalInfo(PERSONAL_INFO);
    setProfilePhoto(PROFILE_PHOTO);
    setEducationList(EDUCATION_DATA);
    setPracticalExperiences(PRACTICAL_EXPERIENCES.map(mergeWithDefaultPracticalExperience));
    setOrganizationExperiences(ORGANIZATIONAL_EXPERIENCES.map(mergeWithDefaultOrgExperience));
    setSkillGroups(SKILL_GROUPS);
    setCertificates(INITIAL_CERTIFICATES.map(sanitizeCertificate));
    setPublication(SCIENTIFIC_PUBLICATION);

    savePortfolioSettings({
      personalInfo: PERSONAL_INFO,
      profilePhoto: PROFILE_PHOTO,
      educationList: EDUCATION_DATA,
      practicalExperiences: PRACTICAL_EXPERIENCES.map(mergeWithDefaultPracticalExperience),
      organizationExperiences: ORGANIZATIONAL_EXPERIENCES.map(mergeWithDefaultOrgExperience),
      skillGroups: SKILL_GROUPS,
      certificates: INITIAL_CERTIFICATES.map(sanitizeCertificate),
      publication: SCIENTIFIC_PUBLICATION,
    });
  };

  // Scroll detection for active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowScrollTop(window.scrollY > 400);

      // Section intersection detection
      const sections = ['home', 'profile', 'tools', 'pkpa-works', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId !== 'home') {
      setHasEntered(true);
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allExperiences = [...practicalExperiences, ...organizationExperiences];

  return (
    <div className="min-h-screen relative font-['Plus_Jakarta_Sans'] bg-black text-slate-100 selection:bg-sky-400 selection:text-black">
      
      {/* Top Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-300 z-[60] shadow-[0_0_10px_#00d4ff]"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Futuristic Electric Blue Ambient Gradient Mesh */}
      <FuturisticBackground />

      {/* Floating Admin Status Bar with "Keluar Mode Admin" button (ONLY visible when admin is active) */}
      {isEditMode && (
        <aside
          aria-label="Status Bar Admin"
          className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2.5 p-2 px-4 rounded-full bg-slate-950/95 border border-amber-400/90 shadow-[0_0_30px_rgba(245,158,11,0.45)] backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="text-xs font-mono font-bold text-amber-300 hidden sm:inline-flex items-center gap-1.5">
            <span>Mode Admin Aktif</span>
            <span className="text-amber-500">·</span>
            {isSupabaseConfigured ? (
              <span className="text-sky-300 inline-flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5 text-sky-400" />
                {cloudSyncStatus === 'syncing' ? 'Menyinkronkan Cloud...' : 'Cloud Sync (Supabase)'}
              </span>
            ) : (
              <span>Simpan Otomatis</span>
            )}
          </span>
          <span className="text-xs font-mono font-bold text-amber-300 sm:hidden">
            {isSupabaseConfigured ? 'Admin · Supabase' : 'Admin Aktif'}
          </span>
          <button
            onClick={() => setIsEditMode(false)}
            className="ml-2 px-3 py-1 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(239,68,68,0.5)] cursor-pointer hover:scale-105 active:scale-95"
            title="Kunci & Keluar dari mode admin"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Keluar Mode Admin</span>
          </button>
        </aside>
      )}

      {/* Futuristic Pill Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCV={() => setIsCVOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col">
        
        {/* Hero Section: Giant 'Portfolio.' Typography with hidden admin trigger dot + START Button + Intro */}
        <Hero
          onOpenCV={() => setIsCVOpen(true)}
          onNavigate={handleNavigate}
          isEditMode={isEditMode}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
          personalInfo={personalInfo}
          onUpdatePersonalInfo={handleUpdatePersonalInfo}
          profilePhoto={profilePhoto}
          onUpdateProfilePhoto={handleUpdateProfilePhoto}
          educationList={educationList}
          onAddEducation={handleAddEducation}
          onDeleteEducation={handleDeleteEducation}
          onUpdateEducation={handleUpdateEducation}
          hasEntered={hasEntered}
          onStartPortfolio={handleStartPortfolio}
        />

        {/* Bagian Utama Portofolio (Hanya terbuka setelah klik START atau jika Mode Admin aktif) */}
        {(hasEntered || isEditMode) && (
          <div className="space-y-16 lg:space-y-24 animate-fadeIn">
            {/* 03. Pengalaman Praktik (PKPA Works) & Organisasi - Terbuka Langsung */}
            <div className="animate-fadeIn">
              <ExperienceOverview
                practicalExperiences={practicalExperiences}
                organizationExperiences={organizationExperiences}
                onSelectExperience={(item) => setSelectedExperience(item)}
                isEditMode={isEditMode}
                onAddPractical={handleAddPracticalExperience}
                onDeletePractical={handleDeletePracticalExperience}
                onAddOrganization={handleAddOrganizationExperience}
                onDeleteOrganization={handleDeleteOrganizationExperience}
              />
            </div>

            {/* 04. Tools, Keahlian & Sertifikasi */}
            <Skills
              isEditMode={isEditMode}
              skillGroups={skillGroups}
              onAddBadge={handleAddSkillBadge}
              onDeleteBadge={handleDeleteSkillBadge}
              onDeleteCategory={handleDeleteSkillCategory}
              onAddCategory={handleAddSkillCategory}
              certificates={certificates}
              onAddCertificate={handleAddCertificate}
              onUpdateCertificate={handleUpdateCertificate}
              onDeleteCertificate={handleDeleteCertificate}
            />

            {/* 05. Publikasi Ilmiah */}
            <Publication
              isEditMode={isEditMode}
              publication={publication}
              onUpdatePublication={handleUpdatePublication}
            />

            {/* 06. Kontak, WhatsApp, dan Formulir Pesan */}
            <Contact
              isEditMode={isEditMode}
              personalInfo={personalInfo}
              onUpdatePersonalInfo={handleUpdatePersonalInfo}
            />
          </div>
        )}

      </main>

      {/* Footer (Hanya tampil setelah klik START atau jika Mode Admin aktif) */}
      {(hasEntered || isEditMode) && <Footer />}

      {/* Multi-Page / Modal Detail View for PKPA & Organizations with Photo Gallery */}
      <ExperienceDetailModal
        experience={selectedExperience}
        allExperiences={allExperiences}
        onClose={() => setSelectedExperience(null)}
        onSelectExperience={(item) => setSelectedExperience(item)}
        isEditMode={isEditMode}
        onUpdateExperience={handleUpdateExperience}
      />

      {/* Digital Curriculum Vitae Modal */}
      <CVModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
      />

      {/* Admin Verification Modal (PIN 261026) Triggered only by dot in Portfolio */}
      <AdminPinModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isEditMode={isEditMode}
        onUnlock={() => {
          setIsEditMode(true);
          setHasEntered(true);
        }}
        onLock={() => setIsEditMode(false)}
        onResetCache={handleResetCache}
      />

      {/* Floating Back to Top Pill Button */}
      {showScrollTop && (hasEntered || isEditMode) && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full pill-badge-active shadow-[0_0_20px_rgba(0,112,243,0.6)] hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer transition-all bg-sky-500 text-black font-bold"
        >
          <ArrowUp className="w-5 h-5 text-black" />
        </button>
      )}

    </div>
  );
}

import { ExperienceItem, EducationItem, SkillCategoryItem, CertificateCardItem, PublicationItem } from '../types/pharmacy';

// URL placeholder foto profil HTTPS publik yang valid (100% tampil di semua environment & build Vercel)
export const PROFILE_PHOTO = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop';

export const PERSONAL_INFO = {
  name: 'apt. Andi Al Kahfi Akihito MR, S.Farm',
  shortGreeting: "Hello I'm apt. Andi Al Kahfi Akihito MR, S.Farm",
  displayBadge: 'Pharmacist',
  yearBadge: '2026',
  role: 'Apoteker Berlisensi (STRA Aktif)',
  specialization: 'Apoteker Berlisensi (STRA Aktif) & Pelayanan Kefarmasian Komprehensif',
  summary:
    'Apoteker dengan STRA aktif dan pengalaman praktik kefarmasian lintas bidang: industri kosmetik (CPKB/CPOB), penyusunan Dokumen Informasi Produk (DIP), pengawasan mutu (QA/QC), distribusi farmasi (CDOB/CDAKB), serta pelayanan kefarmasian di Rumah Sakit, Puskesmas, dan Apotek.',
  email: 'alkahfimr5114@gmail.com',
  whatsapp: '+6283196204080',
  whatsappUrl: 'https://wa.me/6283196204080?text=Halo%20apt.%20Andi%20Al%20Kahfi%20Akihito%20MR,%20saya%20tertarik%20berdiskusi%20mengenai%20peluang%20kerja%20sama%20kefarmasian.',
  linkedin: 'linkedin.com/in/alkahfiakihito',
  linkedinUrl: 'https://linkedin.com/in/alkahfiakihito',
  location: 'Makassar, Sulawesi Selatan',
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'unhas-profesi',
    institution: 'Universitas Hasanuddin (UNHAS)',
    degree: 'Program Studi Profesi Apoteker (PSPA)',
    period: 'Aug 2025 - Aug 2026',
    gpa: '3.85',
    scale: '4.00',
    honors: 'Dengan Pujian (Cum Laude)',
    focus: 'Manajemen Farmasi Rumah Sakit, Regulasi Industri Kosmetik/Farmasi, Distribusi CDOB, Farmakoterapi Komprehensif',
    achievements: [
      'Menyelesaikan 5 rotasi PKPA (RSUD, Industri Manufaktur, PBF Nasional, Apotek Komunitas, Puskesmas) dengan evaluasi predikat memuaskan.',
      'Surat Tanda Registrasi Apoteker (STRA) aktif.',
      'Sertifikasi English Proficiency Test (EPT) UNHAS Skor 463.'
    ]
  },
  {
    id: 'umi-sarjana',
    institution: 'Universitas Muslim Indonesia',
    degree: 'Sarjana Farmasi (S.Farm.)',
    period: 'Aug 2021 - May 2025',
    gpa: '3.64',
    scale: '4.00',
    honors: 'Sangat Memuaskan',
    focus: 'Mikrobiologi Farmasi, Farmakologi Molekuler, Kimia Analisis, Teknologi Formulasi',
    achievements: [
      'Mempublikasikan riset metabolit antibakteri akar porang di Jurnal Terakreditasi Nasional (SINTA).',
      'Asisten Dosen Laboratorium Mikrobiologi Farmasi selama 3 semester (1.5 tahun).',
      'Pengurus BEM Fakultas Farmasi Divisi Hubungan Masyarakat (PIC Studi Banding).'
    ]
  }
];

export const PRACTICAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'rsud-andi-makkasau',
    type: 'practical',
    institution: 'RSUD Andi Makkasau Parepare',
    badgeLabel: 'RSUD Andi Makkasau | Hospital Pharmacy',
    role: 'Pelayanan Kefarmasian Rumah Sakit & CSSD',
    programType: 'Praktik Kerja Profesi Apoteker',
    period: 'Jun 2026',
    location: 'Parepare, Sulawesi Selatan',
    category: 'hospital',
    categoryLabel: 'Hospital Pharmacy',
    shortSummary: 'Pelayanan farmasi klinis di Rawat Inap, Rawat Jalan, IGD, OK, visite/PTO terkolaborasi, penataan FEFO/FIFO, dan sterilisasi CSSD.',
    fullOverview: 'Melaksanakan praktik kefarmasian komprehensif di rumah sakit tipe B. Bertanggung jawab atas pengelolaan obat terintegrasi, skrining resep, pemantauan terapi obat bersama dokter & perawat di ruang rawat inap, pengendalian obat High Alert, serta prosedur dekontaminasi dan sterilisasi di CSSD.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'rsud-1', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', caption: 'Depo Farmasi Rawat Inap & Sistem Dispensing Resep RSUD' },
      { id: 'rsud-2', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop', caption: 'Konseling Pasien Rawat Jalan & Pelayanan Informasi Obat (PIO)' }
    ],
    dutiesAndAchievements: [
      'Menjamin ketersediaan, penyimpanan, dan pengelolaan sediaan farmasi/perbekalan sesuai standar RS.',
      'Skrining resep, penyiapan obat, PIO, dan konseling pada 30+ pasien/hari di unit Rawat Inap, Rawat Jalan, IGD, dan Kamar Operasi (OK).',
      'Visite & Pemantauan Terapi Obat (PTO) berkolaborasi dengan dokter & perawat.',
      'Penataan obat berbasis FEFO/FIFO serta pemantauan kartu stok.',
      'Berpartisipasi aktif dalam kegiatan CSSD (Central Sterile Supply Department) dengan prosedur sterilisasi standar.'
    ],
    regulatoryStandards: ['Standar Pelayanan Kefarmasian di RS (Permenkes No. 72/2016)', 'CSSD & PPI RS', 'Akreditasi KARS'],
    competencies: ['Skrining Resep Klinis', 'Konseling Pasien & PIO', 'Visite Bangsal (PTO)', 'Dispensing Rawat Inap & Jalan', 'CSSD Prosedur Sterilisasi'],
    metrics: [
      { label: 'Pasien Terlayani', value: '30+ / Hari' },
      { label: 'Unit Rotasi', value: 'Ranap, Rajal, IGD, OK' },
      { label: 'Kepatuhan FIFO/FEFO', value: '100%' }
    ]
  },
  {
    id: 'urban-asia-bali',
    type: 'practical',
    institution: 'PT. Urban Asia Industri Bali',
    badgeLabel: 'PT. Urban Asia Industri | Quality Control (CPKB)',
    role: 'Pengendalian Mutu & Manufaktur Kosmetik (CPKB/GMP)',
    programType: 'Praktik Kerja Profesi Apoteker',
    period: 'Dec 2025 - Jan 2026',
    location: 'Bali, Indonesia',
    category: 'industry',
    categoryLabel: 'Cosmetics Industry',
    shortSummary: 'Penyusunan Dokumen Informasi Produk (DIP) maklon OEM/ODM, verifikasi QC/QA bahan baku & kemas, IPC, dan uji fisik-kimia.',
    fullOverview: 'Berperan aktif dalam divisi QA/QC pada industri manufaktur kosmetik maklon. Memastikan kepatuhan terhadap regulasi CPKB BPOM, validasi dokumen legalitas produk (DIP), serta pengujian parameter kualitas fisik-kimia di laboratorium industri.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'urban-1', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop', caption: 'Laboratorium Pengujian Mutu Fisik-Kimia & Instrumen Analisis (pH/TDS)' },
      { id: 'urban-2', url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1200&auto=format&fit=crop', caption: 'Gudang Bahan Baku & Karantina Kemas Sesuai Standar CPKB' }
    ],
    dutiesAndAchievements: [
      'Menyusun dan menyiapkan Dokumen Informasi Produk (DIP) untuk produk maklon (OEM/ODM) sesuai standar regulasi BPOM/CPKB.',
      'Verifikasi dan pengawasan mutu (QC/QA) bahan baku serta bahan kemas sebelum proses produksi.',
      'In-Process Control (IPC) pengemasan primer, penomoran bets, dan penimbangan akhir.',
      'Pengujian fisik-kimia (pH, TDS Meter) pada sampel produk retain dan air proses industri.'
    ],
    regulatoryStandards: ['Cara Pembuatan Kosmetika yang Baik (CPKB BPOM)', 'Pedoman Dokumen Informasi Produk (DIP)', 'ISO 22716 Cosmetics GMP'],
    competencies: ['Penyusunan Dokumen DIP', 'QC/QA Bahan Baku & Kemas', 'In-Process Control (IPC)', 'Pengujian pH & TDS Meter', 'Retain Sample Testing'],
    metrics: [
      { label: 'DIP Produk Disusun', value: 'Maklon OEM/ODM' },
      { label: 'Standar Mutu', value: 'CPKB Golongan A' },
      { label: 'Pengujian Mutu', value: 'pH, TDS & Organoleptik' }
    ]
  },
  {
    id: 'antarmitra-sembada-gowa',
    type: 'practical',
    institution: 'PT. Antarmitra Sembada Gowa',
    badgeLabel: 'PT. Antarmitra Sembada | Distribution (CDOB & CDAKB)',
    role: 'Distribusi Farmasi (CDOB & CDAKB)',
    programType: 'Praktik Kerja Profesi Apoteker',
    period: 'Sep 2025 - Oct 2025',
    location: 'Gowa, Sulawesi Selatan',
    category: 'distribution',
    categoryLabel: 'Pharmaceutical Distribution',
    shortSummary: 'Penerapan standar CDOB & CDAKB, verifikasi faktur distribusi, pengelolaan Cold Chain Products, dan obat khusus Psikotropika/OOT.',
    fullOverview: 'Melaksanakan penjaminan mutu pada Pedagang Besar Farmasi (PBF) cabang Gowa. Menjaga integritas rantai distribusi obat dari penerimaan, penyimpanan chiller/freezer dengan pemantauan suhu real-time, hingga pengiriman dengan armada tervalidasi.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'ams-1', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop', caption: 'Area Penyimpanan Gudang PBF & Fasilitas Cold Chain Berstandar CDOB' }
    ],
    dutiesAndAchievements: [
      'Penerapan standar CDOB & CDAKB pada operasional distribusi perbekalan farmasi & alat kesehatan.',
      'Skrining, verifikasi, serta pengarsipan faktur penjualan/distribusi secara manual dan digital.',
      'Pengelolaan penerimaan, penyimpanan, dan penanganan khusus Cold Chain Products (Rantai Dingin).',
      'Penanganan dan pengawasan distribusi obat kelompok Psikotropika, Prekursor, dan OOT.'
    ],
    regulatoryStandards: ['Cara Distribusi Obat yang Baik (CDOB BPOM)', 'Cara Distribusi Alat Kesehatan yang Baik (CDAKB)', 'Regulasi Obat Psikotropika & OOT'],
    competencies: ['Cold Chain Handling (2-8°C)', 'Verifikasi Surat Pesanan (SP)', 'Audit Faktur Distribusi', 'Pengawasan Psikotropika/OOT', 'Gudang Farmasi CDOB'],
    metrics: [
      { label: 'Suhu Cold Chain', value: '2°C - 8°C Stabil' },
      { label: 'Legalitas Faktur', value: '100% Terverifikasi' },
      { label: 'Kepatuhan Regulasi', value: 'CDOB & CDAKB' }
    ]
  },
  {
    id: 'kimia-farma-bulukumba',
    type: 'practical',
    institution: 'Apotek Kimia Farma Bulukumba',
    badgeLabel: 'Apotek Kimia Farma | Community Pharmacy',
    role: 'Farmasi Komunitas & Swamedikasi',
    programType: 'Praktik Kerja Profesi Apoteker',
    period: 'Oct 2025 - Nov 2025',
    location: 'Bulukumba, Sulawesi Selatan',
    category: 'community',
    categoryLabel: 'Community Pharmacy',
    shortSummary: 'Pelayanan resep dokter, swamedikasi rasional, PIO dan konseling 30+ pasien/hari, perencanaan pengadaan, dan stok opnam.',
    fullOverview: 'Menjalankan fungsi Apoteker Pengelola Apotek di jaringan Kimia Farma. Memberikan edukasi swamedikasi rasional kepada masyarakat, pelayanan resep racikan, pengelolaan stok obat preventif dari expired, serta pengawasan administrasi pelaporan.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'kf-1', url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1200&auto=format&fit=crop', caption: 'Area Dispensing Resep & Meja Konseling Edukasi Pasien Komunitas' }
    ],
    dutiesAndAchievements: [
      'Melayani resep, swamedikasi, PIO, dan konseling obat kepada 30+ pasien per hari.',
      'Pengelolaan perbekalan farmasi meliputi perencanaan, pengadaan, verifikasi penerimaan, penyimpanan, dan stok opnam.'
    ],
    regulatoryStandards: ['Standar Pelayanan Kefarmasian di Apotek (Permenkes No. 73/2016)', 'Pedoman Swamedikasi Rasional BPOM'],
    competencies: ['Konseling Obat Pasien', 'Swamedikasi Tepat Indikasi', 'Perencanaan & Stok Opnam', 'Manajemen Apotek Komunitas'],
    metrics: [
      { label: 'Pasien Terlayani', value: '30+ / Hari' },
      { label: 'Akurasi Stok', value: 'Opnam Terkendali' },
      { label: 'Layanan', value: 'Resep & Swamedikasi' }
    ]
  },
  {
    id: 'puskesmas-antang-makassar',
    type: 'practical',
    institution: 'Puskesmas Antang Perumnas Makassar',
    badgeLabel: 'Puskesmas Antang Perumnas | Public Health',
    role: 'Pelayanan Kefarmasian Manajerial & Komunitas',
    programType: 'Praktik Kerja Profesi Apoteker',
    period: 'Apr 2026 - May 2026',
    location: 'Makassar, Sulawesi Selatan',
    category: 'community',
    categoryLabel: 'Public Health Care',
    shortSummary: 'Pelayanan resep & konseling 30+ pasien/hari, pengelolaan inventaris obat program kesehatan nasional, dan program Cek Kesehatan SD.',
    fullOverview: 'Memberikan pelayanan farmasi primer di fasilitas kesehatan masyarakat. Mengelola alokasi obat program nasional (TB, Imunisasi, Gizi), skrining resep, serta turun langsung dalam penyuluhan kesehatan dan skrining di sekolah dasar binaan puskesmas.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'pusk-1', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop', caption: 'Ruang Farmasi Puskesmas & Pendistribusian Obat Program Pemerintah' }
    ],
    dutiesAndAchievements: [
      'Pelayanan resep, PIO, dan konseling penggunaan obat aman bagi 30+ pasien per hari.',
      'Pengelolaan inventaris farmasi, pendistribusian obat program kesehatan nasional, serta pencatatan data kesehatan dalam program Cek Kesehatan Gratis di SD.'
    ],
    regulatoryStandards: ['Standar Pelayanan Kefarmasian di Puskesmas (Permenkes No. 74/2016)', 'Pedoman LPLPO Dinkes'],
    competencies: ['LPLPO & Inventaris Puskesmas', 'Obat Program Nasional', 'Skrining Kesehatan Sekolah', 'Konseling Pasien Primer'],
    metrics: [
      { label: 'Pasien Terlayani', value: '30+ / Hari' },
      { label: 'Inisiatif Komunitas', value: 'Cek Kesehatan SD' },
      { label: 'Pengelolaan', value: 'LPLPO Tepat Waktu' }
    ]
  },
  {
    id: 'balai-paru-makassar',
    type: 'practical',
    institution: 'Balai Besar Kesehatan Paru Masyarakat Makassar',
    badgeLabel: 'Balai Besar Paru Masyarakat | Specialized Care',
    role: 'Pelayanan Khusus Paru & Penyiapan Obat',
    programType: 'KKN-Profesi',
    period: 'Jan 2025 - Feb 2025',
    location: 'Makassar, Sulawesi Selatan',
    category: 'hospital',
    categoryLabel: 'Specialized Respiratory Center',
    shortSummary: 'PIO khusus pasien program paru 10+/hari, pengelolaan administrasi dokumen sediaan farmasi, dan penerimaan stok.',
    fullOverview: 'Fokus pada penanganan farmakoterapi penyakit tuberkulosis (OAT), asma, dan PPOK. Memberikan konseling mendalam terkait kepatuhan minum obat jangka panjang guna mencegah terjadinya resistensi obat (MDR-TB).',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'bbkpm-1', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop', caption: 'Pemberian Informasi Obat Pasien Program Tuberkulosis & Respirasi' }
    ],
    dutiesAndAchievements: [
      'Pemberian Pelayanan Informasi Obat (PIO) mendalam kepada 10+ pasien program khusus paru per hari mengenai kepatuhan terapi jangka panjang.',
      'Pengelolaan administrasi dokumen sediaan farmasi dan penerimaan stok farmasi spesifik penyakit respirasi.',
      'Edukasi cara penggunaan perangkat inhaler, nebulizer, dan pemantauan efek samping obat antituberkulosis (OAT).'
    ],
    regulatoryStandards: ['Pedoman Pengendalian Tuberkulosis Kemenkes RI', 'Standar Penanganan Terapi Respirasi'],
    competencies: ['Edukasi Terapi OAT & Asma', 'Penggunaan Inhaler/Nebulizer', 'Konseling Kepatuhan Pasien TB', 'Logistik Obat Program'],
    metrics: [
      { label: 'Konseling Khusus Paru', value: '10+ Pasien/Hari' },
      { label: 'Fokus Penyakit', value: 'TB, Asma & PPOK' },
      { label: 'Kepatuhan Obat', value: 'Tingkat Tinggi' }
    ]
  },
  {
    id: 'rs-mata-makassar',
    type: 'practical',
    institution: 'RS Mata Kemenkes Makassar',
    badgeLabel: 'RS Mata Kemenkes Makassar | Specialized Eye Hospital',
    role: 'Pelayanan Farmasi Sediaan Khusus Mata & Swamedikasi',
    programType: 'Magang Mandiri',
    period: 'Nov 2023 - Dec 2023',
    location: 'Makassar, Sulawesi Selatan',
    category: 'hospital',
    categoryLabel: 'Specialized Eye Hospital',
    shortSummary: 'Swamedikasi 10+ pasien obat khusus, pelayanan resep oftalmologi, penyiapan obat sediaan steril mata, dan administrasi farmasi.',
    fullOverview: 'Melaksanakan magang mandiri di Rumah Sakit Mata Kemenkes Makassar. Fokus pada penanganan dan dispensing sediaan obat mata steril (tetes/salep mata), edukasi swamedikasi bagi 10+ pasien obat khusus per hari, pelayanan resep oftalmologi, serta pengelolaan administrasi farmasi terintegrasi.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'rsmata-1', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop', caption: 'Dispensing Sediaan Steril Oftalmik & Pelayanan Resep Khusus Mata' }
    ],
    dutiesAndAchievements: [
      'Swamedikasi 10+ pasien per hari terkait penggunaan obat khusus oftalmik dan penanganan keluhan mata ringan.',
      'Pelayanan resep dokter spesialis mata meliputi skrining klinis, penyesuaian dosis, dan pengecekan interaksi obat.',
      'Penyiapan sediaan obat mata steril (tetes mata unidose/multidose & salep mata) dengan teknik aseptis.',
      'Pengelolaan administrasi farmasi, pengarsipan resep, serta pemantauan tanggal kedaluwarsa (ED) sediaan oftalmik.'
    ],
    regulatoryStandards: ['SOP Sediaan Steril Oftalmik', 'Standar Pelayanan Kefarmasian di RS', 'Standar Keselamatan Pasien (Patient Safety)'],
    competencies: ['Swamedikasi Obat Khusus Mata', 'Dispensing Sediaan Steril Oftalmik', 'Skrining Resep Spesialis', 'Administrasi & Arsip Resep'],
    metrics: [
      { label: 'Swamedikasi Pasien', value: '10+ Pasien/Hari' },
      { label: 'Spesialisasi', value: 'Oftalmologi / Mata' },
      { label: 'Kepatuhan Steril', value: '100% SOP' }
    ]
  },
  {
    id: 'rs-stella-maris',
    type: 'practical',
    institution: 'RS Stella Maris Makassar',
    badgeLabel: 'RS Stella Maris Makassar | Depo Rotation',
    role: 'Pelayanan Farmasi & Rotasi Lintas Depo',
    programType: 'Magang Mandiri',
    period: 'Jul 2023 - Aug 2023',
    location: 'Makassar, Sulawesi Selatan',
    category: 'hospital',
    categoryLabel: 'General Hospital',
    shortSummary: 'Pelayanan resep, penyiapan obat, administrasi, serta rotasi di apotek rawat jalan, rawat inap, dan depo umum.',
    fullOverview: 'Menjalani rotasi pelayanan kefarmasian di RS Stella Maris Makassar. Mengasah ketangkasan dispensing obat, verifikasi resep dokter, pengarsipan administrasi, serta rotasi multi-unit di Apotek Rawat Jalan, Rawat Inap, dan Depo Umum dengan ritme kerja dinamis.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'stellamaris-1', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop', caption: 'Rotasi Depo Farmasi Rawat Jalan & Penyiapan Obat Pasien RS Stella Maris' }
    ],
    dutiesAndAchievements: [
      'Pelayanan resep dokter dan penyiapan obat dengan prinsip 5 benar (pasien, obat, dosis, rute, waktu pemberian).',
      'Rotasi pelayanan aktif di Apotek Rawat Jalan, Rawat Inap, dan Depo Umum dengan ketepatan dan efisiensi dispensing.',
      'Pengelolaan administrasi farmasi, mutasi persediaan obat antardepo, dan pengarsipan berkas resep harian.',
      'Pengecekan stok fisik obat harian, pemantauan batas kedaluwarsa (FEFO/FIFO), dan kerapian rak penyimpanan obat.'
    ],
    regulatoryStandards: ['Standar Pelayanan Kefarmasian RS', 'Akreditasi KARS', 'Manajemen Obat FEFO/FIFO'],
    competencies: ['Rotasi Depo Rajal/Ranap/Umum', 'Dispensing Kecepatan Tinggi', 'Verifikasi Resep Klinis', 'Administrasi Mutasi Obat'],
    metrics: [
      { label: 'Rotasi Unit', value: 'Rajal, Ranap, Umum' },
      { label: 'Akurasi Dispensing', value: '100% Verifikasi' },
      { label: 'Manajemen Stok', value: 'FEFO / FIFO' }
    ]
  }
];

export const ORGANIZATIONAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'asisten-lab-mikrobiologi',
    type: 'organization',
    institution: 'Laboratorium Mikrobiologi Farmasi Universitas Muslim Indonesia',
    badgeLabel: 'Lab Mikrobiologi Universitas Muslim Indonesia | Academic & Laboratory',
    role: 'Asisten Laboratorium Mikrobiologi Farmasi',
    programType: 'Pengalaman Akademik & Laboratorium',
    period: 'Jan 2024 - Jul 2025',
    location: 'Makassar, Sulawesi Selatan',
    category: 'organization',
    categoryLabel: 'Academic & Laboratory',
    shortSummary: 'Membimbing 200+ mahasiswa mikrobiologi dasar, mengelola instrumen laboratorium (autoklaf, LAF), penanggung jawab praktikum susulan, serta tim penilai OSCE.',
    fullOverview: 'Dipercaya menjadi asisten dosen selama 3 semester. Bertanggung jawab atas standardisasi teknik aseptis mahasiswa, kalibrasi instrumen laboratorium, perumusan rubrik penilaian praktikum, serta bertindak sebagai penguji mandiri pada ujian OSCE laboratorium.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'lab-1', url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop', caption: 'Pengujian Aktivitas Antibakteri & Pembiakan Kultur Bakteri di LAF' },
      { id: 'lab-2', url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1200&auto=format&fit=crop', caption: 'Pemeliharaan Instrumen Autoklaf & Kalibrasi Peralatan Sterilisasi' }
    ],
    dutiesAndAchievements: [
      'Membimbing 200+ mahasiswa mikrobiologi dasar dan mikrobiologi terapan mengenai teknik aseptis dan inokulasi.',
      'Mengelola instrumen laboratorium (Autoklaf, Laminar Air Flow / LAF, Spektrofotometer UV-Vis, Colony Counter).',
      'Penanggung jawab praktikum susulan serta tim penilai ujian OSCE laboratorium.'
    ],
    regulatoryStandards: ['Good Laboratory Practice (GLP)', 'Biosafety Level 1/2 Standards'],
    competencies: ['Teknik Aseptis & Sterilisasi', 'Pengoperasian Autoklaf & LAF', 'Uji Antibakteri & ALT/AKK', 'Evaluasi OSCE Mahasiswa'],
    metrics: [
      { label: 'Mahasiswa Dibimbing', value: '200+ Mahasiswa' },
      { label: 'Masa Bakti', value: '1.5 Tahun (3 Semester)' },
      { label: 'Peran Kunci', value: 'Penguji OSCE & Kalibrasi' }
    ]
  },
  {
    id: 'bem-kabamafar-umi',
    type: 'organization',
    institution: 'BEM KABAMAFAR Farmasi Universitas Muslim Indonesia',
    badgeLabel: 'BEM KABAMAFAR Universitas Muslim Indonesia | Organization & Public Relations',
    role: 'Anggota Divisi Hubungan Masyarakat (Humas)',
    programType: 'Organisasi Mahasiswa',
    period: 'Sep 2023 - Aug 2024',
    location: 'Makassar, Sulawesi Selatan',
    category: 'organization',
    categoryLabel: 'Student Organization',
    shortSummary: 'Penanggung jawab kegiatan Studi Banding bersama BEM KEMAFAR UNHAS serta koordinator komunikasi eksternal.',
    fullOverview: 'Memimpin koordinasi diplomasi dan kolaborasi antarkampus farmasi di Makassar. Menjadi Person in Charge (PIC) kegiatan Studi Banding bersama BEM KEMAFAR UNHAS guna pertukaran keilmuan dan program kemahasiswaan.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    galleryPhotos: [
      { id: 'bem-1', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop', caption: 'Dokumentasi Kepengurusan & Pertemuan Koordinasi Mahasiswa Farmasi' }
    ],
    dutiesAndAchievements: [
      'Penanggung jawab kegiatan Studi Banding bersama BEM KEMAFAR UNHAS.',
      'Mengelola komunikasi eksternal, audiensi resmi, dan relasi antarlembaga farmasi se-Sulawesi Selatan.'
    ],
    regulatoryStandards: ['Manajemen Kehumasan & Kolaborasi Lembaga Farmasi'],
    competencies: ['Diplomasi Antarkampus', 'Public Speaking & Negosiasi', 'Manajemen Kegiatan Besar', 'Kerja Sama Lintas Tim'],
    metrics: [
      { label: 'Kegiatan Utama', value: 'Studi Banding Universitas Muslim Indonesia - UNHAS' },
      { label: 'Hasil', value: 'Kemitraan Strategis' },
      { label: 'Periode', value: '1 Periode Penuh' }
    ]
  }
];

export const SKILL_GROUPS: SkillCategoryItem[] = [
  {
    id: 'technical',
    title: 'Teknis & Laboratorium',
    description: 'Penguasaan instrumen pengujian mikrobiologi dan instrumen analisis laboratorium kefarmasian.',
    icon: 'FlaskConical',
    items: [
      { name: 'Pelayanan Kefarmasian' },
      { name: 'Teknik Aseptis & CSSD' },
      { name: 'Pengujian Mikrobiologi' },
      { name: 'Autoklaf' },
      { name: 'Laminar Air Flow (LAF)' },
      { name: 'pH Meter' },
      { name: 'TDS Meter' },
      { name: 'Viskometer' },
      { name: 'Spectrophotometer UV-Vis' },
      { name: 'Colony Counter' }
    ]
  },
  {
    id: 'software',
    title: 'Software',
    description: 'Aplikasi pengolah data farmasi, rekam medis elektronik, dan media komunikasi digital.',
    icon: 'Laptop',
    items: [
      { name: 'Microsoft Office' },
      { name: 'Google Workspace' },
      { name: 'SIMRS / CPPT' },
      { name: 'Canva' },
      { name: 'CapCut' },
      { name: 'ibisPaint' }
    ]
  }
];

export const INITIAL_CERTIFICATES: CertificateCardItem[] = [
  {
    id: 'cert-stra',
    title: 'Surat Tanda Registrasi Apoteker (STRA) Aktif',
    issuer: 'Konsil Tenaga Kesehatan Indonesia (KTKI) / Kemenkes RI',
    date: '2026 - Sekarang',
    description: 'Surat Tanda Registrasi resmi Apoteker berlisensi untuk praktik kefarmasian nasional.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
    certificateUrl: 'https://ktki.kemkes.go.id'
  },
  {
    id: 'cert-ukai',
    title: 'Sertifikat Profesi Apoteker (UKAI)',
    issuer: 'Panitia Nasional Uji Kompetensi Apoteker Indonesia',
    date: '2026',
    description: 'Sertifikat kelulusan Ujian Kompetensi Apoteker Indonesia dengan predikat memuaskan.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    certificateUrl: 'https://ukai.or.id'
  },
  {
    id: 'cert-ept',
    title: 'English Proficiency Test (EPT) UNHAS - Skor 463',
    issuer: 'Pusat Bahasa Universitas Hasanuddin',
    date: '2025',
    description: 'Sertifikasi kemahiran bahasa Inggris standar akademik dan profesional kefarmasian.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
    certificateUrl: 'https://unhas.ac.id'
  }
];

export const SCIENTIFIC_PUBLICATION: PublicationItem = {
  id: 'pub-akar-porang',
  title: 'Potensi Bakteri Rizosfer Penghasil Antibakteri dari Akar Porang (Amorphophallus muelleri Blume) terhadap Patogen Saluran Pencernaan',
  journal: 'Microbiology Science (Jurnal Mikrobiologi Sains Farmasi Universitas Muslim Indonesia)',
  year: '2025',
  authors: 'Andi Al Kahfi Akihito, dkk.',
  abstractSummary: 'Penelitian ilmiah yang mengeksplorasi isolasi dan karakterisasi bakteri rizosfer dari tanaman porang yang memiliki aktivitas metabolit sekunder antibakteri alami terhadap bakteri patogen saluran cerna (Escherichia coli dan Salmonella typhi). Menunjukkan potensi besar sebagai kandidat antibiotik alami masa depan.',
  customDescription: 'Riset unggulan mikrobiologi farmasi yang berhasil mengisolasi galur bakteri rizosfer potensial dengan zona hambat signifikan terhadap Escherichia coli dan Salmonella typhi, dipublikasikan pada Jurnal Terakreditasi Nasional SINTA.',
  url: 'https://jurnal.farmasi.umi.ac.id/index.php/microbiologyscience/article/view/1342',
  keywords: ['Amorphophallus muelleri Blume', 'Bakteri Rizosfer', 'Antibakteri Alami', 'Mikrobiologi Farmasi', 'Patogen Saluran Pencernaan']
};

export const ALL_EXPERIENCES = [...PRACTICAL_EXPERIENCES, ...ORGANIZATIONAL_EXPERIENCES];

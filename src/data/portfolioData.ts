import { Project, SkillCategory, ExperienceItem, Testimonial } from '../types/portfolio';

export const HERO_AVATAR = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'cloudlytics-saas',
    title: 'Cloudlytics - Observabilitas Infrastruktur Cloud',
    category: 'webapp',
    categoryLabel: 'Web App & SaaS',
    year: '2026',
    client: 'FinTech Nusantara',
    summary: 'Platform analitik cloud enterprise real-time untuk memantau performa ribuan container, latensi mikroservis, dan biaya komputasi secara presisi.',
    fullDescription: 'Cloudlytics adalah platform dashboard observabilitas yang memproses jutaan event metrik per menit. Dibangun dengan fokus pada kecepatan respon sub-100ms, visualisasi data interaktif, dan notifikasi anomali cerdas. Sistem ini menggabungkan rendering grafis canvas performa tinggi dengan pipeline data terdistribusi.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'WebSockets'],
    metrics: [
      { label: 'Latency Query', value: '< 45ms' },
      { label: 'Efisiensi Biaya', value: '+34%' },
      { label: 'Uptime Sistem', value: '99.98%' }
    ],
    features: [
      'Visualisasi metrik CPU, RAM, & throughput real-time via WebSockets',
      'Manajemen multi-cluster dan analitik anomali otomatis',
      'Desain antarmuka Dark Mode mewah dengan kontras tinggi berstandar WCAG AA',
      'Eksport laporan performa otomatis ke format PDF & CSV'
    ],
    demoUrl: 'https://cloudlytics-demo.example.com',
    githubUrl: 'https://github.com/alkahfi/cloudlytics-core',
    architectureNotes: 'Arsitektur modular dengan optimasi rendering re-render zero-cost di React, didukung caching Redis dan event-driven messaging.'
  },
  {
    id: 'aurora-commerce',
    title: 'Aurora - Lifestyle & Ceramic E-Commerce Mobile',
    category: 'mobile',
    categoryLabel: 'Mobile Experience',
    year: '2025',
    client: 'Studio Keramik Aurora',
    summary: 'Aplikasi belanja kurasi keramik mewah dengan pengalaman interaktif 3D preview produk, checkout kilat satu sentuhan, dan transisi fluid.',
    fullDescription: 'Aurora menghadirkan keanggunan belanja keramik artisanal ke genggaman pengguna. Dirancang dengan micro-interactions ultra-responsif, haptic feedback visual, dan alur checkout yang dipersingkat hingga 40% lebih cepat daripada e-commerce konvensional.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    tags: ['React Native', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Stripe API'],
    metrics: [
      { label: 'Konversi Checkout', value: '+42%' },
      { label: 'Rata-rata Rating', value: '4.9 / 5.0' },
      { label: 'Waktu Muat', value: '0.8 detik' }
    ],
    features: [
      'Pratinjau tekstur dan dimensi produk interaktif 360 derajat',
      'Alur checkout ekspres dengan integrasi gateway pembayaran lokal dan global',
      'Desain minimalis berfokus pada tipografi editorial dan materialitas produk',
      'Sistem cache offline untuk katalog produk bahkan tanpa koneksi internet stabil'
    ],
    demoUrl: 'https://aurora-store.example.com',
    githubUrl: 'https://github.com/alkahfi/aurora-mobile-app',
    architectureNotes: 'Optimasi aset gambar multi-resolusi otomatis, offline persistence dengan SQLite, dan state management ringan via Zustand.'
  },
  {
    id: 'aether-studio',
    title: 'Aether - Platform Interaktif & Studio Digital',
    category: 'design',
    categoryLabel: 'Creative Platform',
    year: '2025',
    client: 'Aether Digital London',
    summary: 'Situs galeri interaktif multi-penghargaan dengan arsitektur web modern, transisi halaman spasial, dan tipografi editorial berkarakter.',
    fullDescription: 'Dibuat untuk sebuah studio desain avant-garde global, Aether menggabungkan fluid motion physics dengan arsitektur web headless. Menghadirkan pameran portofolio visual imersif yang memenangkan apresiasi FWA of the Day dan Awwwards Honorable Mention.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'Motion', 'Tailwind CSS', 'Canvas API', 'Headless CMS'],
    metrics: [
      { label: 'Awwwards Score', value: '8.7 / 10' },
      { label: 'Waktu di Halaman', value: '4.2 Menit' },
      { label: 'Lighthouse Score', value: '98 / 100' }
    ],
    features: [
      'Transisi rute bebas jeda menggunakan fluid layout animations',
      'Navigasi gestur keyboard dan kursor interaktif yang dinamis',
      'Dukungan multi-bahasa terintegrasi dan sistem tema adaptif',
      'Aksesibilitas ramah pembaca layar (screen reader) tanpa mengorbankan estetika'
    ],
    demoUrl: 'https://aether-studio.example.com',
    githubUrl: 'https://github.com/alkahfi/aether-web-experience',
    architectureNotes: 'SSR dengan kompilasi static incremental (ISR), prefetching pintar untuk aset visual resolusi tinggi.'
  },
  {
    id: 'synthex-ai',
    title: 'Synthex - Sistem Otomasi Kontrak Cerdas & Dokumen',
    category: 'ai',
    categoryLabel: 'AI & Cloud Tool',
    year: '2026',
    client: 'LegalTech Solusindo',
    summary: 'Asisten pemrosesan dan verifikasi dokumen legal dengan ekstraksi klausul berbasis pemodelan semantik dan antarmuka tinjau cepat dua kolom.',
    fullDescription: 'Synthex mengotomatisasi analisis klausul kontrak hukum yang panjang ke dalam ringkasan eksekutif, tabel perbandingan hak kewajiban, dan deteksi resiko instan. Mempersingkat waktu tinjauan pengacara dari 3 jam menjadi kurang dari 15 menit.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Python FastApi', 'LangChain', 'PostgreSQL'],
    metrics: [
      { label: 'Akurasi Ekstraksi', value: '99.2%' },
      { label: 'Efisiensi Waktu Review', value: '12x Lebih Cepat' },
      { label: 'Dokumen Terproses', value: '45.000+' }
    ],
    features: [
      'Visualisasi perbandingan dokumen side-by-side dengan highlight perbedaan warna',
      'Deteksi klausul resiko kepatuhan secara otomatis dengan saran revisi',
      'Audit log tersertifikasi untuk setiap perubahan dan komentar tim',
      'Penyimpanan terenkripsi AES-256 end-to-end'
    ],
    demoUrl: 'https://synthex-legal.example.com',
    githubUrl: 'https://github.com/alkahfi/synthex-contracts',
    architectureNotes: 'Pipeline vector embeddings terisolasi, streaming respons token real-time, dan micro-service orchestration.'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    description: 'Pondasi utama dalam membangun antarmuka web yang cepat, responsif, aksesibel, dan berestetika tinggi.',
    iconName: 'Layout',
    skills: [
      { name: 'React 19 & Next.js', level: 96, experience: '5+ Tahun', description: 'Server Components, Hooks modern, Suspense, arsitektur modular skala besar.' },
      { name: 'TypeScript', level: 92, experience: '4+ Tahun', description: 'Strict typing, generics tingkat lanjut, type inference yang aman.' },
      { name: 'Tailwind CSS & CSS Architecture', level: 98, experience: '5+ Tahun', description: 'Tailwind v4, token desain kustom, layout flex & grid presisi tinggi.' },
      { name: 'Motion & Interactivity', level: 90, experience: '3+ Tahun', description: 'Animasi fluid 60 FPS, micro-interactions, layout physics, dan scroll triggers.' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend & Database Architecture',
    description: 'Merancang API yang andal, scalable, aman, dan berlatensi rendah untuk mendukung aplikasi dinamis.',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express / NestJS', level: 88, experience: '4+ Tahun', description: 'RESTful API, WebSockets real-time, arsitektur event-driven.' },
      { name: 'PostgreSQL & Drizzle / Prisma', level: 86, experience: '3+ Tahun', description: 'Skema relasional optimal, indeksasi performa, migrasi terotomasi.' },
      { name: 'REST & GraphQL APIs', level: 90, experience: '4+ Tahun', description: 'Perancangan kontrak API yang terstruktur, pagination, dan otentikasi JWT.' },
      { name: 'Redis Caching & Queue', level: 82, experience: '2+ Tahun', description: 'Manajemen sesi, in-memory caching, dan rate limiting terdistribusi.' }
    ]
  },
  {
    id: 'design',
    name: 'UI/UX & Desain Sistem',
    description: 'Menjembatani estetika visual dengan logika rekayasa kode untuk menghasilkan produk berkelas.',
    iconName: 'Palette',
    skills: [
      { name: 'Figma & Design Tokens', level: 92, experience: '4+ Tahun', description: 'Komponen dinamis, auto-layout, wireframing, dan dokumentasi design system.' },
      { name: 'Aksesibilitas (WCAG AA)', level: 88, experience: '3+ Tahun', description: 'Kontras warna teruji, navigasi keyboard lengkap, semantic HTML.' },
      { name: 'Responsif & Mobile-First', level: 96, experience: '5+ Tahun', description: 'Desain adaptif tanpa kompromi pada layar HP, Tablet, hingga Monitor 4K.' },
      { name: 'Micro-Interactions & Haptics', level: 89, experience: '3+ Tahun', description: 'Umpan balik sentuhan dan kursor yang intuitif dan memuaskan.' }
    ]
  },
  {
    id: 'devops',
    name: 'Tools, DevOps & Performance',
    description: 'Alur kerja modern, pengujian otomatis, dan optimasi performa web untuk skor Lighthouse sempurna.',
    iconName: 'Cpu',
    skills: [
      { name: 'Git & GitHub Workflow', level: 94, experience: '5+ Tahun', description: 'Branching strategy, pull request review, CI/CD automated test.' },
      { name: 'Vite & Modern Bundlers', level: 93, experience: '4+ Tahun', description: 'Konfigurasi build kilat, tree-shaking, code splitting terukur.' },
      { name: 'Docker & Containerization', level: 80, experience: '2+ Tahun', description: 'Dockerfile multi-stage, konsistensi lingkungan dev dan produksi.' },
      { name: 'Core Web Vitals & SEO', level: 95, experience: '4+ Tahun', description: 'Skor LCP < 1.2s, CLS 0, dan optimasi struktur data Google Schema.' }
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2023 - Sekarang',
    role: 'Lead Frontend & UI Engineer',
    company: 'Nusantara Digital Labs',
    location: 'Jakarta (Remote)',
    type: 'Penuh Waktu',
    description: [
      'Memimpin rekayasa arsitektur frontend untuk 4 produk SaaS skala enterprise dengan total 150.000+ pengguna bulanan aktif.',
      'Membangun Core Design System internal yang mempercepat waktu delivery fitur baru tim rekayasa hingga 35%.',
      'Mengurangi bundle size aplikasi utama sebesar 42% dan mencapai skor Google Lighthouse rata-rata 98/100.'
    ],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Vitest']
  },
  {
    id: 'exp-2',
    period: '2021 - 2023',
    role: 'Fullstack Web Developer',
    company: 'Solusi Teknologi Kreasi',
    location: 'Bandung',
    type: 'Penuh Waktu',
    description: [
      'Mengembangkan lebih dari 12 aplikasi web dan platform e-commerce dari konsep awal hingga peluncuran produksi.',
      'Mengintegrasikan sistem pembayaran digital, integrasi logistik real-time, dan analitik performa.',
      'Melakukan refactor backend API dari arsitektur monolitik ke microservices modular berlatensi rendah.'
    ],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker']
  },
  {
    id: 'exp-3',
    period: '2020 - 2021',
    role: 'Frontend Developer & UI Specialist',
    company: 'Studio Cipta Kreasi',
    location: 'Surabaya',
    type: 'Kontrak',
    description: [
      'Merancang antarmuka landing page interaktif dengan motion dinamis untuk berbagai brand teknologi dan startup.',
      'Berkolaborasi erat dengan tim desainer UI/UX untuk memastikan implementasi kode 100% presisi pixel-perfect.'
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'Figma']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Reza Pratama',
    role: 'Chief Technology Officer',
    company: 'FinTech Nusantara',
    quote: 'Alkahfi memiliki kepekaan desain yang langka di kalangan software engineer. Dashboard analitik yang ia bangun bukan hanya luar biasa cepat dan tanpa bug, tetapi juga sangat memukau secara visual. Klien kami sangat puas.',
    rating: 5
  },
  {
    id: 'test-2',
    author: 'Clara Wijaya',
    role: 'Head of Product',
    company: 'Studio Keramik Aurora',
    quote: 'Kerjasama yang sangat menyenangkan. Alur interaksi aplikasi mobile yang dibuat sangat halus dan intuitif. Penjualan produk kami naik lebih dari 40% sejak peluncuran aplikasi baru.',
    rating: 5
  },
  {
    id: 'test-3',
    author: 'Arif Setiawan',
    role: 'Founder & Managing Director',
    company: 'Aether Digital Labs',
    quote: 'Keahlian teknis tingkat tinggi berpadu dengan ketelitian estetika. Kode yang ditulis bersih, terstruktur rapi, dan mudah dirawat. Sangat direkomendasikan untuk proyek digital kelas atas.',
    rating: 5
  }
];

export const KEY_METRICS = [
  { value: '5+', label: 'Tahun Pengalaman', detail: 'Rekayasa web & aplikasi modern' },
  { value: '38+', label: 'Proyek Selesai', detail: 'SaaS, mobile & platform digital' },
  { value: '99.8%', label: 'Kepuasan Klien', detail: 'Berdasarkan ulasan kerja sama' },
  { value: '< 1.1s', label: 'Rata-rata Waktu Muat', detail: 'Optimasi performa & SEO' }
];

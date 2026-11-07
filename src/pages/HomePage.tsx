import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Cpu,
  GraduationCap,
  Landmark,
  LibraryBig,
  LineChart,
  Microscope,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

import { buttonClass } from '../lib/styles';
import { firstName } from '../lib/format';
import { useAuth } from '../context/AuthContext';

const heroStats = [
  { value: '12.400+', label: 'Mahasiswa aktif' },
  { value: '42', label: 'Program studi' },
  { value: '38', label: 'Tahun berkarya' },
  { value: '96%', label: 'Lulusan terserap' },
];

const faculties = [
  {
    icon: Cpu,
    index: '01',
    title: 'Fakultas Teknologi & Sains',
    description:
      'Membangun kompetensi teknis dan riset terapan di bidang komputasi, rekayasa, dan sains dasar.',
    programs: ['Informatika', 'Sistem Informasi', 'Teknik Elektro', 'Data Science'],
  },
  {
    icon: LineChart,
    index: '02',
    title: 'Fakultas Bisnis & Ekonomi',
    description:
      'Menyiapkan pemimpin bisnis yang adaptif, beretika, dan mampu mengambil keputusan berbasis data.',
    programs: ['Manajemen', 'Akuntansi', 'Bisnis Digital', 'Keuangan'],
  },
  {
    icon: Landmark,
    index: '03',
    title: 'Fakultas Sosial & Humaniora',
    description:
      'Mengembangkan pemikiran kritis dan kepedulian sosial untuk menjawab tantangan masyarakat.',
    programs: ['Ilmu Komunikasi', 'Hubungan Internasional', 'Psikologi', 'Hukum'],
  },
];

const advantages = [
  {
    icon: Microscope,
    title: 'Riset yang berdampak',
    description:
      'Pusat riset lintas disiplin yang menghubungkan laboratorium kampus dengan kebutuhan industri dan masyarakat.',
  },
  {
    icon: Users,
    title: 'Mentor akademik',
    description:
      'Dosen dan praktisi berpengalaman mendampingi setiap mahasiswa sepanjang perjalanan akademik.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Karier sejak dini',
    description:
      'Program magang, studio industri, dan jejaring alumni memperluas peluang sebelum lulus.',
  },
  {
    icon: ShieldCheck,
    title: 'Tata kelola terpercaya',
    description:
      'Layanan akademik terintegrasi dengan standar keamanan data dan transparansi proses.',
  },
];

const academicServices = [
  {
    icon: GraduationCap,
    title: 'Portal Akademik',
    description: 'Akses layanan akademik dalam satu pintu.',
    href: '/login',
  },
  {
    icon: LibraryBig,
    title: 'Perpustakaan Digital',
    description: 'Jurnal, e-book, dan repositori karya ilmiah.',
    href: '#akademik',
  },
  {
    icon: CalendarDays,
    title: 'Kalender Akademik',
    description: 'Jadwal perkuliahan, ujian, dan registrasi.',
    href: '#akademik',
  },
];

export function HomePage() {
  const { user } = useAuth();

  const primaryTarget = !user
    ? '/register'
    : user.role === 'ADMIN'
      ? '/admin/dashboard'
      : '/';

  const primaryLabel = !user
    ? 'Mulai Pendaftaran'
    : user.role === 'ADMIN'
      ? 'Buka Dashboard'
      : 'Masuk ke Beranda';

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[94vh] items-center overflow-hidden bg-navy-950 pt-[76px]">
        <img
          src="/campus.jpg"
          alt="Kampus Universitas Nusantara Cendekia"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute -left-32 top-1/4 size-[520px] rounded-full bg-gold-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[480px] rounded-full bg-navy-400/15 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            {user && (
              <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-100">
                <CheckCircle2 className="size-4 text-emerald-300" aria-hidden="true" />
                Selamat datang kembali, {firstName(user.name)}
              </div>
            )}

            <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-gold-300/30 bg-gold-400/10 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold-200">
              <Award className="size-4 text-gold-400" aria-hidden="true" />
              Terakreditasi Unggul · Kampus Masa Depan
            </div>

            <h1 className="animate-fade-up animation-delay-100 mt-7 font-display text-[2.75rem] font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-[3.6rem] lg:text-[4.15rem]">
              Ilmu yang mencerahkan,
              <br />
              <em className="text-gradient-gold not-italic">masa depan</em> yang
              berdampak.
            </h1>

            <p className="animate-fade-up animation-delay-200 mt-6 max-w-xl text-base leading-8 text-navy-100/80 sm:text-lg">
              Universitas Nusantara Cendekia menyatukan tradisi akademik yang
              kuat dengan pembelajaran modern — tempat ide bertumbuh, talenta
              ditempa, dan solusi nyata lahir.
            </p>

            <div className="animate-fade-up animation-delay-300 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={primaryTarget} className={buttonClass('gold', 'lg')}>
                {primaryLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <a href="#akademik" className={buttonClass('outlineLight', 'lg')}>
                Jelajahi Akademik
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>

            {!user && (
              <p className="animate-fade-up animation-delay-300 mt-4 text-xs text-navy-200/60">
                Sudah memiliki akun?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-gold-300 underline-offset-4 transition hover:text-gold-200 hover:underline"
                >
                  Masuk ke portal akademik
                </Link>
              </p>
            )}

            <dl className="animate-fade-up animation-delay-500 mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-medium text-white">
                    {stat.value}
                  </dd>
                  <dd className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.13em] text-navy-200/55">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden justify-end lg:flex">
            <div className="relative w-full max-w-[360px]">
              <div className="animate-float glass-card rounded-[2rem] p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-400 text-navy-950">
                    <BookOpen className="size-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                    Semester Ganjil
                  </span>
                </div>

                <p className="mt-7 font-display text-2xl leading-snug text-white">
                  Satu portal untuk seluruh perjalanan akademik Anda.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    'Layanan akademik terintegrasi',
                    'Akses aman berbasis peran',
                    'Data mahasiswa terpusat',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-xs text-white/75"
                    >
                      <CheckCircle2
                        className="size-3.5 shrink-0 text-gold-400"
                        aria-hidden="true"
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                      Tahun Akademik
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      2026 / 2027
                    </p>
                  </div>
                  <Sparkles className="size-5 text-gold-400" aria-hidden="true" />
                </div>
              </div>

              <div className="absolute -bottom-8 -left-10 w-[230px] rounded-2xl border border-gold-300/25 bg-gold-400 p-5 text-navy-950 shadow-2xl">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy-800/70">
                  Penerimaan Mahasiswa
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold leading-tight">
                  Gelombang I dibuka
                </p>
                <Link
                  to={user ? primaryTarget : '/register'}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold underline-offset-4 hover:underline"
                >
                  Daftar sekarang
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#tentang"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/40 transition hover:text-white/80 lg:flex"
        >
          Kenali kami
          <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="tentang" className="paper-grid relative scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div className="relative">
            <div className="absolute -left-5 -top-5 hidden h-full w-full rounded-[2rem] border border-gold-400/40 sm:block" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
              <img
                src="/about-campus.jpg"
                alt="Gedung utama kampus Universitas Nusantara Cendekia"
                className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-[1.03] sm:aspect-[5/6]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div className="rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                  <p className="font-display text-3xl font-semibold text-navy-950">
                    38+
                  </p>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-navy-500">
                    Tahun berkarya
                  </p>
                </div>

                <div className="flex size-14 items-center justify-center rounded-full bg-gold-400 text-navy-950 shadow-lg">
                  <Landmark className="size-6" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold-600">
              Tentang Institusi
            </p>

            <h2 className="mt-4 max-w-xl font-display text-[2.15rem] font-medium leading-[1.16] tracking-[-0.01em] text-navy-950 sm:text-[2.75rem]">
              Tradisi akademik, semangat untuk terus{' '}
              <em className="text-gold-600">berinovasi.</em>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-navy-600 sm:text-base">
              Sejak 1987, Universitas Nusantara Cendekia tumbuh sebagai ruang
              belajar yang menghargai gagasan, mendorong eksplorasi, dan
              menempatkan mahasiswa sebagai pusat dari setiap keputusan
              akademik.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-navy-600 sm:text-base">
              Kami percaya pendidikan terbaik lahir dari perpaduan antara
              kedalaman ilmu, keberanian bereksperimen, dan kepedulian terhadap
              sesama.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: GraduationCap,
                  title: 'Pembelajaran berbasis proyek',
                  text: 'Teori diuji melalui karya nyata.',
                },
                {
                  icon: Building2,
                  title: 'Jejaring industri',
                  text: 'Terhubung dengan 180+ mitra.',
                },
                {
                  icon: Microscope,
                  title: 'Budaya riset',
                  text: 'Riset dosen dan mahasiswa terintegrasi.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Lingkungan inklusif',
                  text: 'Ruang aman untuk setiap talenta.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-navy-100 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-gold-200 hover:shadow-soft"
                >
                  <item.icon className="size-5 text-gold-600" aria-hidden="true" />
                  <p className="mt-2.5 text-sm font-semibold text-navy-950">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to={user ? primaryTarget : '/register'}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-950 transition hover:text-gold-700"
            >
              Mulai perjalanan akademik Anda
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Academics ────────────────────────────────────────────────────── */}
      <section id="akademik" className="relative scroll-mt-16 bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold-600">
              Akademik
            </p>
            <h2 className="mt-4 font-display text-[2.15rem] font-medium leading-[1.16] tracking-[-0.01em] text-navy-950 sm:text-[2.75rem]">
              Disiplin ilmu untuk dunia yang terus berubah.
            </h2>
            <p className="mt-5 text-sm leading-7 text-navy-500 sm:text-base">
              Tiga fakultas, satu komitmen: membekali mahasiswa dengan cara
              berpikir yang tajam dan kemampuan untuk bertindak.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {faculties.map((faculty) => (
              <article
                key={faculty.title}
                className="group relative overflow-hidden rounded-[1.75rem] border border-navy-100 bg-ivory p-7 transition duration-500 hover:-translate-y-1.5 hover:border-gold-200 hover:shadow-lift"
              >
                <span className="absolute right-6 top-6 font-display text-5xl font-medium text-navy-100 transition group-hover:text-gold-100">
                  {faculty.index}
                </span>

                <span className="relative flex size-13 items-center justify-center rounded-2xl bg-navy-950 text-gold-400 shadow-lg shadow-navy-950/15">
                  <faculty.icon className="size-6" aria-hidden="true" />
                </span>

                <h3 className="relative mt-6 font-display text-xl font-semibold leading-snug text-navy-950">
                  {faculty.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-navy-500">
                  {faculty.description}
                </p>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {faculty.programs.map((program) => (
                    <span
                      key={program}
                      className="rounded-full border border-navy-100 bg-white px-3 py-1 text-[0.65rem] font-medium text-navy-600"
                    >
                      {program}
                    </span>
                  ))}
                </div>

                <div className="relative mt-6 flex items-center gap-2 text-xs font-semibold text-gold-700 opacity-0 transition group-hover:opacity-100">
                  Lihat program studi
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {academicServices.map((service) =>
              service.href.startsWith('/') ? (
                <Link
                  key={service.title}
                  to={service.href}
                  className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition hover:border-gold-200 hover:shadow-soft"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                    <service.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy-950">
                      {service.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-navy-400">
                      {service.description}
                    </span>
                  </span>
                </Link>
              ) : (
                <a
                  key={service.title}
                  href={service.href}
                  className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition hover:border-gold-200 hover:shadow-soft"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                    <service.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy-950">
                      {service.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-navy-400">
                      {service.description}
                    </span>
                  </span>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Advantages ───────────────────────────────────────────────────── */}
      <section
        id="keunggulan"
        className="relative scroll-mt-16 overflow-hidden bg-navy-950 py-24 sm:py-28"
      >
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="pointer-events-none absolute -left-20 top-1/2 size-[460px] rounded-full bg-gold-500/8 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold-400">
              Mengapa Nusantara Cendekia
            </p>
            <h2 className="mt-4 max-w-md font-display text-[2.15rem] font-medium leading-[1.16] text-white sm:text-[2.75rem]">
              Pengalaman akademik yang <em className="text-gradient-gold">utuh.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-navy-200/70 sm:text-base">
              Kami merancang ekosistem pembelajaran yang menghubungkan ruang
              kelas, laboratorium, industri, dan masyarakat.
            </p>

            <div className="mt-9 rounded-3xl border border-white/10 bg-white/5 p-6">
              <Quote className="size-7 text-gold-400" aria-hidden="true" />
              <p className="mt-4 font-display text-lg leading-relaxed text-white/90">
                “Pendidikan bukan sekadar memindahkan pengetahuan, tetapi
                menumbuhkan keberanian untuk bertanya dan kemampuan untuk
                menjawab.”
              </p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">Prof. Dr. A. Raka</p>
                <p className="mt-0.5 text-xs text-navy-300/60">Rektor Universitas Nusantara Cendekia</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-500 hover:border-gold-400/35 hover:bg-white/[0.07]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 transition group-hover:bg-gold-400 group-hover:text-navy-950">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-navy-200/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Admissions CTA ───────────────────────────────────────────────── */}
      <section id="penerimaan" className="scroll-mt-16 bg-parchment py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-navy-950 px-6 py-14 shadow-lift sm:px-12 lg:px-16">
            <img
              src="/library.jpg"
              alt="Perpustakaan kampus"
              className="absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-900/70" />
            <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold-400">
                  Penerimaan Mahasiswa Baru 2026/2027
                </p>
                <h2 className="mt-4 max-w-xl font-display text-[2.1rem] font-medium leading-[1.14] text-white sm:text-[2.7rem]">
                  Langkah pertama menuju masa depan dimulai di sini.
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-navy-200/70 sm:text-base">
                  Buat akun portal akademik Anda, lengkapi data, dan akses
                  seluruh layanan akademik dalam satu platform yang aman.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to={primaryTarget} className={buttonClass('gold', 'lg')}>
                    {primaryLabel}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  {!user && (
                    <Link to="/login" className={buttonClass('outlineLight', 'lg')}>
                      Masuk ke Portal
                    </Link>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-400">
                  Alur Pendaftaran
                </p>
                <ol className="mt-5 space-y-4">
                  {[
                    'Buat akun dengan email aktif',
                    'Lengkapi profil akademik',
                    'Akses portal dan layanan mahasiswa',
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold-400/35 bg-gold-400/10 text-[0.65rem] font-bold text-gold-300">
                        {index + 1}
                      </span>
                      <span className="pt-0.5 text-sm leading-6 text-white/80">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-3.5 py-2.5 text-xs text-emerald-100">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  Registrasi aman, data tersimpan di server kampus.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

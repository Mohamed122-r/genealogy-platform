import Link from "next/link";
import { Shield, TreePine, Users, BookOpen, Landmark, ScrollText } from "lucide-react";
import { db } from "@/lib/db";

export default async function HomePage() {
  const [totalPeople, totalBranches, aliveCount] = await Promise.all([
    db.person.count({ where: { deletedAt: null } }),
    db.branch.count(),
    db.person.count({ where: { status: "ALIVE", deletedAt: null } }),
  ]);

  return (
    <div className="min-h-screen bg-[#08100C] text-white font-sans">
      {/* ===== الهيدر الداكن ===== */}
      <header className="bg-[#0A1711] border-b border-[#C9A227]/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#C9A227] flex items-center justify-center">
              <TreePine className="w-6 h-6 text-[#0A1711]" />
            </div>
            <div>
              <span className="text-xl font-bold">شجرة النسب العائلية</span>
              <span className="block text-xs text-[#C9A227]">Mohamed Abdalwhab</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-[#C9A227] font-bold">الرئيسية</Link>
            <Link href="/introduction" className="hover:text-[#C9A227]">المقدمة</Link>
            <Link href="/narrators" className="hover:text-[#C9A227]">الرواة</Link>
            <Link href="/tree" className="hover:text-[#C9A227]">المشجرة</Link>
            <Link href="/sources" className="hover:text-[#C9A227]">المصادر</Link>
            <Link href="/contact" className="hover:text-[#C9A227]">تواصل معنا</Link>
          </nav>
          <Link href="/login" className="bg-[#C9A227] text-[#0A1711] px-4 py-2 rounded-lg font-bold text-sm">
            <Shield className="w-4 h-4 inline ml-2" />
            لوحة التحكم
          </Link>
        </div>
      </header>

      {/* ===== قسم الهيرو (مع شجرة SVG) ===== */}
      <section className="py-20 relative overflow-hidden">
        {/* الخلفية */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%">
            <pattern id="pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#C9A227" strokeWidth="0.5" opacity="0.2" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* الشجرة المرسومة SVG */}
          <div className="mx-auto mb-12">
            <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
              {/* الجذع */}
              <path d="M200 350 Q190 300 180 250 Q170 200 200 150 Q230 200 220 250 Q210 300 200 350" fill="#5D3A1A" />
              {/* الفروع */}
              <path d="M180 250 Q120 200 80 180" stroke="#5D3A1A" strokeWidth="8" fill="none" />
              <path d="M220 250 Q280 200 320 180" stroke="#5D3A1A" strokeWidth="8" fill="none" />
              {/* الأوراق */}
              <ellipse cx="80" cy="170" rx="30" ry="15" fill="#4A8B3F" transform="rotate(-30 80 170)" />
              <ellipse cx="140" cy="140" rx="30" ry="15" fill="#6BBF59" transform="rotate(-20 140 140)" />
              <ellipse cx="200" cy="120" rx="30" ry="15" fill="#4A8B3F" />
              <ellipse cx="260" cy="140" rx="30" ry="15" fill="#6BBF59" transform="rotate(20 260 140)" />
              <ellipse cx="320" cy="170" rx="30" ry="15" fill="#4A8B3F" transform="rotate(30 320 170)" />
              {/* ورقة ذهبية */}
              <ellipse cx="160" cy="100" rx="20" ry="10" fill="#C9A227" transform="rotate(-15 160 100)" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#C9A227]/20 border border-[#C9A227]/50 px-4 py-2 rounded-full mb-6">
            <Landmark className="w-4 h-4 text-[#C9A227]" />
            <span className="text-[#C9A227] font-semibold">منصة رقمية موثوقة</span>
          </div>
          <h1 className="text-6xl font-heritage font-bold mb-4 text-[#C9A227]">شجرة النسب</h1>
          <h2 className="text-3xl text-white font-heritage mb-8">العائلية الكريمة</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            وثّق تاريخ عائلتك، احفظ أنسابك، واربط الأجيال ببعضها البعض.
          </p>
          <Link href="/tree" className="bg-[#C9A227] text-[#0A1711] px-10 py-4 rounded-lg text-xl font-bold hover:bg-[#D4AF37] transition-all shadow-xl">
            استكشف الشجرة الآن
          </Link>
        </div>
      </section>

      {/* ===== قسم البطاقات ===== */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* بطاقة المقدمة */}
            <div className="bg-white text-[#0A1711] rounded-xl p-6 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#0A1711] flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-lg font-bold mb-2">المقدمة</h3>
              <p className="text-sm text-gray-600">تعرف على تاريخ العائلة وأصولها</p>
              <Link href="/introduction" className="text-[#0A1711] text-sm font-bold mt-4 block">
                اقرأ المزيد ←
              </Link>
            </div>

            {/* بطاقة التعريف بالعائلة */}
            <div className="bg-white text-[#0A1711] rounded-xl p-6 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#0A1711] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-lg font-bold mb-2">التعريف بالعائلة</h3>
              <p className="text-sm text-gray-600">تعرّف على فروع العائلة وأعلامها</p>
              <Link href="/narrators" className="text-[#0A1711] text-sm font-bold mt-4 block">
                اقرأ المزيد ←
              </Link>
            </div>

            {/* بطاقة الرواة */}
            <div className="bg-white text-[#0A1711] rounded-xl p-6 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#0A1711] flex items-center justify-center mb-4">
                <ScrollText className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-lg font-bold mb-2">الرواة</h3>
              <p className="text-sm text-gray-600">تعرف على رواة تاريخ العائلة</p>
              <Link href="/sources" className="text-[#0A1711] text-sm font-bold mt-4 block">
                اقرأ المزيد ←
              </Link>
            </div>

            {/* بطاقة المشجرة */}
            <div className="bg-white text-[#0A1711] rounded-xl p-6 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#0A1711] flex items-center justify-center mb-4">
                <TreePine className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-lg font-bold mb-2">المشجرة</h3>
              <p className="text-sm text-gray-600">استكشف الشجرة التفاعلية</p>
              <Link href="/tree" className="text-[#0A1711] text-sm font-bold mt-4 block">
                استكشف الآن ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== قسم الإحصائيات ===== */}
      <section className="py-16 bg-[#0A1711] border-y border-[#C9A227]/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#C9A227]">{totalPeople.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-2">إجمالي الأسماء</p>
            </div>
            <div className="border-x border-[#C9A227]/20">
              <p className="text-4xl font-bold text-[#C9A227]">{totalBranches.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-2">عدد الفروع</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#C9A227]">{aliveCount.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-2">الأحياء</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== الفوتر الداكن ===== */}
      <footer className="bg-[#08100C] py-12 border-t border-[#C9A227]/20">
        <div className="container mx-auto px-4 text-center">
          {/* الشعار */}
          <div className="w-16 h-16 rounded-full bg-[#C9A227] flex items-center justify-center mx-auto mb-6">
            <TreePine className="w-8 h-8 text-[#08100C]" />
          </div>
          <p className="text-[#C9A227] text-lg mb-2">Designed & Developed by</p>
          <p className="text-white text-3xl font-heritage font-bold">Mohamed Abdalwhab</p>
        </div>
      </footer>
    </div>
  );
}

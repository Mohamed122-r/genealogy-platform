import Link from "next/link";
import { Shield, Users, BookOpen, ScrollText, TreePine, Landmark, Feather, ArrowLeft } from "lucide-react";
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
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img src="/images/small-tree.png" alt="الشعار" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-2xl font-heritage font-bold">Mohamed Abdalwhab</span>
              <span className="block text-xs text-[#C9A227]">شجرة النسب العائلية</span>
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
          <Link href="/login" className="bg-[#C9A227] text-[#0A1711] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" />
            لوحة التحكم
          </Link>
        </div>
      </header>

      {/* ===== قسم الهيرو (مستنسخ من الصورة) ===== */}
      <section className="relative overflow-hidden">
        {/* الخلفية الكريمية */}
        <div className="absolute inset-0 bg-[#FDFBF3]">
          <img src="/images/bg.png" alt="الخلفية" className="w-full h-full object-cover opacity-20" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* الشجرة الكبيرة */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src="/images/big-tree.png" 
              alt="شجرة العائلة" 
              className="w-full max-w-[500px] h-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* النص التراثي */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/20 border border-[#C9A227]/50 px-4 py-2 rounded-full mb-6">
              <Feather className="w-4 h-4 text-[#C9A227]" />
              <span className="text-[#C9A227] font-semibold">منصة رقمية موثوقة</span>
            </div>
            <h1 className="text-6xl font-heritage font-bold text-[#0A1711] mb-4">شجرة النسب</h1>
            <h2 className="text-4xl text-[#C9A227] font-heritage mb-8">العائلية الكريمة</h2>
            <p className="text-[#0A1711]/80 text-lg mb-8 leading-relaxed">
              وثّق تاريخ عائلتك، احفظ أنسابك، واربط الأجيال ببعضها البعض.
            </p>
            <Link href="/tree" className="bg-[#C9A227] text-[#0A1711] px-10 py-4 rounded-lg text-xl font-bold hover:bg-[#D4AF37] transition-all shadow-xl">
              استكشف الشجرة الآن
            </Link>
          </div>
        </div>
      </section>

      {/* ===== قسم البطاقات (تراثي) ===== */}
      <section className="py-16 bg-[#FDFBF3]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* بطاقة المقدمة */}
            <div className="bg-white text-[#0A1711] rounded-xl p-6 shadow-xl border border-[#C9A227]/20">
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
            <div className="bg-white text-[#0A1711] rounded-xl p-6 shadow-xl border border-[#C9A227]/20">
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
            <div className="bg-white text-[#0A1711] rounded-xl p-6 shadow-xl border border-[#C9A227]/20">
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
            <div className="bg-white text-[#0A1711] rounded-xl p-6 shadow-xl border border-[#C9A227]/20">
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

      {/* ===== قسم الإحصائيات الداكن ===== */}
      <section className="py-16 bg-[#0A1711] border-y border-[#C9A227]/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-[#C9A227]">{totalPeople.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-2">إجمالي الأسماء</p>
            </div>
            <div className="border-x border-[#C9A227]/20">
              <p className="text-5xl font-bold text-[#C9A227]">{totalBranches.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-2">عدد الفروع</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#C9A227]">{aliveCount.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-2">الأحياء</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== الفوتر الذهبي ===== */}
      <footer className="bg-[#08100C] py-12 border-t border-[#C9A227]/20">
        <div className="container mx-auto px-4 text-center">
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

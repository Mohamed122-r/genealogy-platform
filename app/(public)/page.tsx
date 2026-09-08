import Link from "next/link";
import { TreePine, Users, Landmark, ScrollText, BookOpen, Feather, ArrowLeft, Shield } from "lucide-react";
import { db } from "@/lib/db";

export default async function HomePage() {
  const [totalPeople, totalBranches, aliveCount] = await Promise.all([
    db.person.count({ where: { deletedAt: null } }),
    db.branch.count(),
    db.person.count({ where: { status: "ALIVE", deletedAt: null } }),
  ]);

  return (
    <div className="min-h-screen bg-heritage-bg text-deep-green">
      {/* الهيدر التراثي */}
      <header className="bg-deep-green text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center text-2xl font-bold">
              ش
            </div>
            <div>
              <span className="font-heritage text-2xl font-bold">شجرة النسب العائلية</span>
              <span className="block text-xs text-gold-500">المصدر الرقمي للتاريخ العائلي</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-gold-500">الرئيسية</Link>
            <Link href="/introduction" className="hover:text-gold-500">المقدمة</Link>
            <Link href="/narrators" className="hover:text-gold-500">الرواة</Link>
            <Link href="/tree" className="hover:text-gold-500">المشجرة</Link>
            <Link href="/sources" className="hover:text-gold-500">المصادر</Link>
            <Link href="/contact" className="hover:text-gold-500">تواصل معنا</Link>
          </nav>
          <Link href="/login" className="bg-gold-500 text-deep-green px-4 py-2 rounded-md font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4" /> لوحة التحكم
          </Link>
        </div>
      </header>

      {/* قسم الهيرو التراثي */}
      <section className="bg-gradient-to-b from-deep-green to-[#0a2b20] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#C9A227" strokeWidth="1" />
                <circle cx="40" cy="40" r="20" fill="none" stroke="#C9A227" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/50 px-4 py-2 rounded-full mb-6">
            <Feather className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 font-semibold">منصة رقمية موثوقة</span>
          </div>
          <h1 className="text-6xl font-heritage font-bold mb-4">شجرة النسب</h1>
          <h2 className="text-3xl text-gold-500 font-heritage mb-8">العائلية الكريمة</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            وثّق تاريخ عائلتك، احفظ أنسابك، واربط الأجيال ببعضها البعض.
          </p>
          <Link href="/tree" className="bg-gold-500 text-deep-green px-10 py-4 rounded-lg text-xl font-bold hover:bg-gold-600 transition-all shadow-xl">
            استكشف الشجرة الآن
          </Link>
        </div>
      </section>

      {/* قسم الإحصائيات */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-gold-600">{totalPeople.toLocaleString('ar-EG')}</p>
              <p className="text-deep-green mt-2">إجمالي الأسماء</p>
            </div>
            <div className="border-x border-gold-500/30">
              <p className="text-4xl font-bold text-gold-600">{totalBranches.toLocaleString('ar-EG')}</p>
              <p className="text-deep-green mt-2">عدد الفروع</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gold-600">{aliveCount.toLocaleString('ar-EG')}</p>
              <p className="text-deep-green mt-2">الأحياء</p>
            </div>
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer className="bg-deep-green text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-500 text-lg">Designed & Developed by <span className="font-bold text-white">Mohamed Abdalwhab</span></p>
        </div>
      </footer>
    </div>
  );
}

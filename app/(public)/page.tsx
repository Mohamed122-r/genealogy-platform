import Link from "next/link";
import { TreePine, Users, Landmark, ScrollText, BookOpen, Feather, ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";

export default async function HomePage() {
  // جلب إحصائيات حقيقية من قاعدة البيانات
  const [totalPeople, totalBranches, aliveCount] = await Promise.all([
    db.person.count({ where: { deletedAt: null } }),
    db.branch.count(),
    db.person.count({ where: { status: "ALIVE", deletedAt: null } }),
  ]);

  return (
    <>
      {/* قسم الهيرو (Hero) التراثي */}
      <section className="relative bg-gradient-to-b from-deep-green to-[#0a2b20] text-white overflow-hidden">
        {/* زخارف إسلامية خلفية */}
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

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/50 px-4 py-2 rounded-full mb-6">
              <Feather className="w-4 h-4 text-gold-500" />
              <span className="text-gold-500 font-semibold">منصة رقمية موثوقة</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heritage font-bold leading-tight mb-6">
              شجرة النسب
              <span className="block text-gold-500 text-3xl md:text-5xl mt-2">العائلية الكريمة</span>
            </h1>

            <p className="text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              وثّق تاريخ عائلتك، احفظ أنسابك، واربط الأجيال ببعضها البعض. 
              منصة حديثة بتصميم تراثي أصيل لعرض وتحليل شجرة العائلة بأكثر من {totalPeople.toLocaleString('ar-EG')} اسم.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/tree" className="bg-gold-500 text-deep-green px-8 py-4 rounded-lg text-xl font-bold hover:bg-gold-600 transition-all shadow-xl flex items-center gap-2">
                <TreePine className="w-6 h-6" />
                استكشف الشجرة الآن
              </Link>
              <Link href="/introduction" className="border-2 border-white/50 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                اقرأ المقدمة
              </Link>
            </div>
          </div>
        </div>

        {/* شريط إحصائيات أسفل الهيرو */}
        <div className="border-t border-gold-500/20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gold-500">{totalPeople.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-1">إجمالي الأسماء الموثقة</p>
            </div>
            <div className="text-center border-x border-gold-500/20">
              <p className="text-4xl font-bold text-gold-500">{totalBranches.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-1">الفروع والعائلات</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gold-500">{aliveCount.toLocaleString('ar-EG')}</p>
              <p className="text-gray-300 mt-1">الأحياء حالياً</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم المزايا */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heritage font-bold text-deep-green mb-4">لماذا منصتنا؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نجمع بين أصالة التراث العربي وأحدث التقنيات الرقمية لتقديم تجربة فريدة في توثيق الأنساب.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ميزة 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gold-500/30 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto bg-deep-green rounded-full flex items-center justify-center mb-6">
                <Landmark className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-2xl font-bold text-deep-green mb-3">توثيق موثوق</h3>
              <p className="text-gray-600 leading-relaxed">
                بنية بيانات منظمة تضمن حفظ العلاقات بين الأفراد بدقة، مع سجل كامل للعمليات.
              </p>
            </div>

            {/* ميزة 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gold-500/30 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto bg-deep-green rounded-full flex items-center justify-center mb-6">
                <TreePine className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-2xl font-bold text-deep-green mb-3">شجرة تفاعلية</h3>
              <p className="text-gray-600 leading-relaxed">
                استكشف الشجرة بتقنية SVG حديثة، ابحث عن أي اسم، وانتقل بين الأجيال بسهولة.
              </p>
            </div>

            {/* ميزة 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gold-500/30 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto bg-deep-green rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-2xl font-bold text-deep-green mb-3">إدارة متقدمة</h3>
              <p className="text-gray-600 leading-relaxed">
                لوحة تحكم شاملة تتيح إضافة وتعديل البيانات بمرونة تامة مع أدوار ومستخدمين متعددين.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم دعوة للإجراء (CTA) */}
      <section className="bg-deep-green text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="cta-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0 L20 40 M0 20 L40 20" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-heritage font-bold mb-6">ابدأ رحلتك في توثيق تاريخ عائلتك اليوم</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            انضم إلينا للمساهمة في حفظ الأنساب، أو استكشف الشجرة الحالية لمشاركة تاريخك مع العالم.
          </p>
          <Link href="/tree" className="inline-flex bg-gold-500 text-deep-green px-10 py-4 rounded-lg text-xl font-bold hover:bg-gold-600 transition-all shadow-xl">
            تصفح الشجرة الكريمة
            <ArrowLeft className="w-6 h-6 mr-3" />
          </Link>
        </div>
      </section>
    </>
  );
}
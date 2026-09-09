import Link from "next/link";
import { TreePine, Users, BookOpen, ScrollText, Feather, Shield } from "lucide-react";
import { db } from "@/lib/db";

export default async function HomePage() {
  const [totalPeople, totalBranches, aliveCount] = await Promise.all([
    db.person.count({ where: { deletedAt: null } }),
    db.branch.count(),
    db.person.count({ where: { status: "ALIVE", deletedAt: null } }),
  ]);

  return (
    <div className="min-h-screen">
      {/* ===== الهيدر الداكن ===== */}
      <header className="header">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-icon">
              <TreePine />
            </div>
            <div>
              <span className="logo-text">شجرة النسب العائلية</span>
              <span className="logo-subtext">Mohamed Abdalwhab</span>
            </div>
          </div>

          <nav className="header-nav">
            <Link href="/" className="active">الرئيسية</Link>
            <Link href="/introduction">المقدمة</Link>
            <Link href="/narrators">الرواة</Link>
            <Link href="/tree">المشجرة</Link>
            <Link href="/sources">المصادر</Link>
            <Link href="/contact">تواصل معنا</Link>
          </nav>

          <Link href="/login" className="header-cta">
            <Shield className="w-4 h-4" />
            لوحة التحكم
          </Link>
        </div>
      </header>

      {/* ===== قسم البطل ===== */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-badge">
            <Feather />
            <span>منصة رقمية موثوقة</span>
          </div>
          <h1>شجرة النسب</h1>
          <h2>العائلية الكريمة</h2>
          <p>
            وثّق تاريخ عائلتك، احفظ أنسابك، واربط الأجيال ببعضها البعض.
          </p>
          <Link href="/tree" className="hero-cta">
            استكشف الشجرة الآن
          </Link>
        </div>
      </section>

      {/* ===== قسم البطاقات ===== */}
      <section className="cards-section">
        <div className="cards-container">
          <div className="cards-grid">
            {/* بطاقة المقدمة */}
            <div className="card">
              <div className="card-icon">
                <BookOpen />
              </div>
              <h3>المقدمة</h3>
              <p>تعرف على تاريخ العائلة وأصولها</p>
              <Link href="/introduction" className="card-link">اقرأ المزيد ←</Link>
            </div>

            {/* بطاقة التعريف بالعائلة */}
            <div className="card">
              <div className="card-icon">
                <Users />
              </div>
              <h3>التعريف بالعائلة</h3>
              <p>تعرّف على فروع العائلة وأعلامها</p>
              <Link href="/narrators" className="card-link">اقرأ المزيد ←</Link>
            </div>

            {/* بطاقة الرواة */}
            <div className="card">
              <div className="card-icon">
                <ScrollText />
              </div>
              <h3>الرواة</h3>
              <p>تعرف على رواة تاريخ العائلة</p>
              <Link href="/sources" className="card-link">اقرأ المزيد ←</Link>
            </div>

            {/* بطاقة المشجرة */}
            <div className="card">
              <div className="card-icon">
                <TreePine />
              </div>
              <h3>المشجرة</h3>
              <p>استكشف الشجرة التفاعلية</p>
              <Link href="/tree" className="card-link">استكشف الآن ←</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== قسم الإحصائيات ===== */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div>
              <p className="stat-number">{totalPeople.toLocaleString('ar-EG')}</p>
              <p className="stat-label">إجمالي الأسماء</p>
            </div>
            <div className="border-between">
              <p className="stat-number">{totalBranches.toLocaleString('ar-EG')}</p>
              <p className="stat-label">عدد الفروع</p>
            </div>
            <div>
              <p className="stat-number">{aliveCount.toLocaleString('ar-EG')}</p>
              <p className="stat-label">الأحياء</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== الفوتر ===== */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <TreePine />
          </div>
          <p className="footer-designer">Designed & Developed by</p>
          <p className="footer-name">Mohamed Abdalwhab</p>
        </div>
      </footer>
    </div>
  );
}

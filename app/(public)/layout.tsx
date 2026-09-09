import Link from "next/link";
import { TreePine, Shield } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* الهيدر */}
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
            <Link href="/">الرئيسية</Link>
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

      {/* المحتوى */}
      <main>{children}</main>

      {/* الفوتر */}
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

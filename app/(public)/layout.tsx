import Link from "next/link";
import { Shield } from "lucide-react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-heritage-bg">
      <header className="bg-deep-green text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center text-2xl font-bold text-deep-green">ش</div>
            <div className="flex flex-col">
              <span className="font-heritage text-2xl font-bold">شجرة النسب العائلية</span>
              <span className="text-xs text-gold-500">المصدر الرقمي للتاريخ العائلي</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-gold-500 transition-colors">الرئيسية</Link>
            <Link href="/introduction" className="hover:text-gold-500 transition-colors">المقدمة</Link>
            <Link href="/narrators" className="hover:text-gold-500 transition-colors">الرواة</Link>
            <Link href="/tree" className="hover:text-gold-500 transition-colors">المشجرة</Link>
            <Link href="/sources" className="hover:text-gold-500 transition-colors">المصادر</Link>
            <Link href="/contact" className="hover:text-gold-500 transition-colors">تواصل معنا</Link>
          </nav>
          <Link href="/login" className="bg-gold-500 text-deep-green px-4 py-2 rounded-md font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2">
            <Shield className="w-4 h-4" /> لوحة التحكم
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-deep-green text-white border-t-4 border-gold-500">
        <div className="container mx-auto px-4 py-8">
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400">Designed & Developed by <span className="text-gold-500 font-bold">Mohamed Abdalwhab</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
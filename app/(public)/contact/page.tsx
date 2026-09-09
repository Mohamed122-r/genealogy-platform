export default function ContactPage() {
  return (
    <section className="content-section">
      <div className="content-container">
        <div className="content-card">
          <h1 className="text-4xl font-bold mb-6 text-center">تواصل معنا</h1>
          <div className="h-1 w-32 bg-[#C9A227] mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">معلومات التواصل</h3>
              <p className="text-gray-600 mb-4">يسعدنا استقبال استفساراتكم واقتراحاتكم.</p>
              <p className="text-gray-700 mb-2">📧 info@example.com</p>
              <p className="text-gray-700 mb-2">📱 +966 555 555 555</p>
              <p className="text-gray-700">📍 المملكة العربية السعودية</p>
            </div>
            <div>
              <form className="space-y-4">
                <input type="text" placeholder="الاسم الكامل" className="w-full p-3 border border-[#C9A227]/30 rounded-lg focus:outline-none focus:border-[#C9A227]" />
                <input type="email" placeholder="البريد الإلكتروني" className="w-full p-3 border border-[#C9A227]/30 rounded-lg focus:outline-none focus:border-[#C9A227]" />
                <textarea rows={4} placeholder="رسالتك" className="w-full p-3 border border-[#C9A227]/30 rounded-lg focus:outline-none focus:border-[#C9A227]" />
                <button type="submit" className="bg-[#C9A227] text-[#0A1711] px-6 py-3 rounded-lg font-bold">إرسال الرسالة</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

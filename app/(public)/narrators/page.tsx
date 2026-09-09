import { Users } from "lucide-react";

const narrators = [
  { name: "الشيخ / محمد بن عبدالله", role: "راوٍ رئيسي", bio: "قام بتوثيق الجيل الأول والثاني من العائلة." },
  { name: "الأستاذ / أحمد بن خالد", role: "مؤرخ", bio: "ساهم في مراجعة المصادر التاريخية وتوثيق الفروع." },
  { name: "الحاج / عمر بن سعيد", role: "راوٍ مساعد", bio: "قدم معلومات قيمة عن فروع العائلة." },
];

export default function NarratorsPage() {
  return (
    <section className="content-section">
      <div className="content-container">
        <div className="content-card">
          <h1 className="text-4xl font-bold mb-6 text-center">الرواة والمحدثون</h1>
          <div className="h-1 w-32 bg-[#C9A227] mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {narrators.map((narrator, index) => (
              <div key={index} className="bg-[#FDFBF3] p-6 rounded-xl text-center border border-[#C9A227]/20">
                <div className="w-16 h-16 rounded-full bg-[#0A1711] flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#C9A227]" />
                </div>
                <h3 className="text-xl font-bold">{narrator.name}</h3>
                <p className="text-[#C9A227] font-bold my-2">{narrator.role}</p>
                <p className="text-gray-600">{narrator.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

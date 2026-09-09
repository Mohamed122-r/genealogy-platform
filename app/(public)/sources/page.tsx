import { ScrollText } from "lucide-react";

const sources = [
  { title: "كتاب تاريخ العائلة", author: "محمد بن عبدالله", type: "كتاب مطبوع", year: "1985" },
  { title: "مخطوطة النسب القديمة", author: "غير معروف", type: "مخطوطة أصلية", year: "القرن الثامن عشر" },
  { title: "سجلات الأحوال المدنية", author: "دائرة الأحوال المدنية", type: "سجل رسمي", year: "1900 - 2020" },
];

export default function SourcesPage() {
  return (
    <section className="content-section">
      <div className="content-container">
        <div className="content-card">
          <h1 className="text-4xl font-bold mb-6 text-center">المصادر والمراجع</h1>
          <div className="h-1 w-32 bg-[#C9A227] mx-auto mb-8"></div>
          <div className="space-y-6">
            {sources.map((source, index) => (
              <div key={index} className="flex items-center gap-4 bg-[#FDFBF3] p-6 rounded-xl border border-[#C9A227]/20">
                <div className="w-12 h-12 rounded-full bg-[#0A1711] flex items-center justify-center">
                  <ScrollText className="w-6 h-6 text-[#C9A227]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{source.title}</h3>
                  <p className="text-gray-600">المؤلف: {source.author}</p>
                  <span className="text-[#C9A227] font-semibold text-sm">{source.type} - {source.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

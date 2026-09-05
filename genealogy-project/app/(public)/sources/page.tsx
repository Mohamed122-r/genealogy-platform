import { ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sources = [
  {
    title: "كتاب تاريخ العائلة",
    author: "محمد بن عبدالله",
    type: "كتاب مطبوع",
    year: "1985",
  },
  {
    title: "مخطوطة النسب القديمة",
    author: "غير معروف",
    type: "مخطوطة أصلية",
    year: "القرن الثامن عشر",
  },
  {
    title: "سجلات الأحوال المدنية",
    author: "دائرة الأحوال المدنية",
    type: "سجل رسمي",
    year: "1900 - 2020",
  },
];

export default function SourcesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-heritage font-bold text-deep-green text-center mb-8">
          المصادر والمراجع
        </h1>
        <div className="w-32 h-1 bg-gold-500 mx-auto mb-12 rounded-full"></div>
        
        <div className="space-y-8">
          {sources.map((source, index) => (
            <Card key={index} className="bg-white border-gold-500/30 shadow-md">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="w-16 h-16 bg-deep-green rounded-full flex items-center justify-center shrink-0">
                  <ScrollText className="w-8 h-8 text-gold-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-deep-green mb-2">{source.title}</h3>
                  <p className="text-gray-600">المؤلف: {source.author}</p>
                  <div className="flex gap-3 mt-3">
                    <span className="bg-gold-500/20 text-gold-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {source.type}
                    </span>
                    <span className="bg-deep-green/10 text-deep-green px-3 py-1 rounded-full text-sm font-semibold">
                      سنة النشر: {source.year}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
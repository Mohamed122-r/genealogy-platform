import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

// بيان الرواة (يمكن ربطه بقاعدة البيانات لاحقاً)
const narrators = [
  {
    name: "الشيخ / محمد بن عبدالله",
    role: "راوٍ رئيسي",
    bio: "من كبار الرواة، قام بتوثيق الجيل الأول والثاني من العائلة عبر مقابلات ميدانية."
  },
  {
    name: "الأستاذ / أحمد بن خالد",
    role: "مؤرخ",
    bio: "باحث في الأنساب، ساهم في مراجعة المصادر التاريخية وتوثيق الفروع."
  },
  {
    name: "الحاج / عمر بن سعيد",
    role: "راوٍ مساعد",
    bio: "قدم معلومات قيمة عن فروع العائلة التي استقرت خارج المنطقة الأصلية."
  },
];

export default function NarratorsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-heritage font-bold text-deep-green text-center mb-8">
          الرواة والمحدثون
        </h1>
        <div className="w-32 h-1 bg-gold-500 mx-auto mb-12 rounded-full"></div>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          نبذة عن الأشخاص الذين ساهموا في توثيق وتاريخ هذه الشجرة المباركة.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {narrators.map((narrator, index) => (
            <Card key={index} className="bg-white border-gold-500/30 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-deep-green rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-gold-500" />
                </div>
                <CardTitle className="text-xl font-bold text-deep-green">{narrator.name}</CardTitle>
                <p className="text-gold-600 font-semibold">{narrator.role}</p>
              </CardHeader>
              <CardContent className="text-center text-gray-600 leading-relaxed">
                {narrator.bio}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
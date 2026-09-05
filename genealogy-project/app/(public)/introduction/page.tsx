import { Card, CardContent } from "@/components/ui/card";

export default function IntroductionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-heritage font-bold text-deep-green text-center mb-8">
          المقدمة
        </h1>
        
        <div className="w-32 h-1 bg-gold-500 mx-auto mb-12 rounded-full"></div>

        <Card className="bg-white border-gold-500/30 shadow-lg">
          <CardContent className="p-10 space-y-6 text-lg leading-loose text-gray-700">
            <p>
              <span className="font-bold text-deep-green text-2xl">الحمد لله رب العالمين، والصلاة والسلام على أشرف الأنبياء والمرسلين.</span>
            </p>
            
            <p>
              تعد الشجرة العائلية وثيقة حية تحمل بين أوراقها ذاكرة الأجيال وهويتهم الثقافية والاجتماعية. 
              من هنا انطلقت فكرة إنشاء هذه المنصة الرقمية، التي تهدف إلى جمع شتات الأنساب وتوثيقها 
              بطريقة علمية دقيقة وميسورة للجميع.
            </p>
            
            <p>
              تهدف هذه المنصة إلى الحفاظ على تاريخ العائلة وتسليط الضوء على الرواة والشخصيات البارزة 
              الذين ساهموا في صناعة المجد لهذه القبيلة. كما نحرص على توفير مصادر موثقة لجميع المعلومات 
              المقدمة، لضمان دقة النسب وصحته.
            </p>

            <div className="bg-heritage-bg border-r-4 border-gold-500 p-6 rounded-l-lg my-8">
              <p className="italic text-deep-green">
                "العائلة التي تحفظ تاريخها هي عائلة تصنع مستقبلها بثقة وإرادة."
              </p>
            </div>

            <p>
              ندعوكم لاستكشاف الشجرة التفاعلية، والبحث في أسماء أجدادكم، والمساهمة معنا في إثراء هذا 
              الكنز التاريخي.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
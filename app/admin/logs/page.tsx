import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { canManageSystem } from "@/lib/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, User, FileText } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default async function AdminLogsPage() {
  const session = await auth();
  if (!session?.user || !canManageSystem(session.user.role)) {
    redirect("/admin/dashboard");
  }

  // جلب آخر 100 عملية
  const logs = await db.auditLog.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  // دالة مساعدة لترجمة نوع العملية
  function getActionLabel(action: string) {
    const labels: Record<string, string> = {
      CREATE_PERSON: "إضافة شخص",
      UPDATE_PERSON: "تعديل شخص",
      DELETE_PERSON: "حذف شخص",
      IMPORT_PERSON: "استيراد بيانات",
      UPDATE_STATUS: "تغيير حالة",
    };
    return labels[action] || action;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-deep-green">سجل العمليات</h1>
      
      <Card className="bg-white border-gold-500/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-deep-green flex items-center gap-2">
            <ScrollText className="w-6 h-6" />
            آخر 100 عملية مسجلة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-deep-green text-white">
                <tr>
                  <th className="p-3">العملية</th>
                  <th className="p-3">المستخدم</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">تفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-muted-foreground">
                      لا توجد عمليات مسجلة بعد
                    </td>
                  </tr>
                )}
                
                {logs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-heritage-bg">
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full bg-gold-500/20 text-gold-700 text-xs font-semibold">
                        {getActionLabel(log.action)}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{log.user?.name || "النظام"}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-500">
                      {format(log.createdAt, "dd/MM/yyyy - hh:mm a", { locale: ar })}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>
                          {log.oldValues && log.newValues ? "تعديل على البيانات" : 
                           log.action === "CREATE_PERSON" || log.action === "IMPORT_PERSON" ? "إضافة جديدة" : 
                           log.action === "DELETE_PERSON" ? "حذف نهائي" : "تحديث"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

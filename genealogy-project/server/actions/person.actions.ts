"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { canManagePeople } from "@/lib/permissions";
import { personSchema, PersonFormData } from "@/lib/validations/person";
import { AuditLogService } from "@/server/services/audit.service";

// دالة مساعدة للتحقق من منع العلاقة الدائرية
async function validateFather(fatherId: string | null | undefined, personId?: string) {
  if (!fatherId) return null;

  // 1. منع أن يكون الشخص أباً لنفسه
  if (personId && fatherId === personId) {
    throw new Error("لا يمكن أن يكون الشخص أباً لنفسه");
  }

  // 2. منع العلاقة الدائرية (إذا كان الأب هو أحد الأبناء أو الأحفاد)
  let currentId: string | null = fatherId;
  const visited = new Set<string>();

  while (currentId) {
    if (personId && currentId === personId) {
      throw new Error("توجد علاقة دائرية: لا يمكن اختيار هذا الأب");
    }
    if (visited.has(currentId)) {
      throw new Error("يوجد خطأ في بنية الشجرة");
    }
    visited.add(currentId);

    // @ts-ignore - تجاهل خطأ النوع المؤقت
    const dbRecord = await db.person.findUnique({
      where: { id: currentId },
      select: { fatherId: true },
    });

    currentId = dbRecord?.fatherId || null;
  }

  return fatherId;
}

// دالة إضافة شخص جديد
export async function createPerson(data: PersonFormData) {
  const session = await auth();
  if (!session?.user || !canManagePeople(session.user.role)) {
    throw new Error("غير مصرح لك بالقيام بهذه العملية");
  }

  // التحقق من البيانات
  const parsed = personSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const { firstName, lastName, gender, status, birthDate, deathDate, notes, branchId } = parsed.data;
  
  // التحقق من الأب
  const validatedFatherId = await validateFather(parsed.data.fatherId);
  
  // تكوين الاسم الكامل
  const fullName = `${firstName} ${lastName}`;

  try {
    const newPerson = await db.person.create({
      data: {
        firstName,
        lastName,
        fullName,
        gender,
        status,
        fatherId: validatedFatherId,
        branchId: branchId || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        deathDate: deathDate ? new Date(deathDate) : null,
        notes: notes || null,
      },
    });

    // تسجيل العملية في سجل التدقيق
    await AuditLogService.log({
      action: "CREATE_PERSON",
      entityType: "Person",
      entityId: newPerson.id,
      userId: session.user.id,
      newValues: data as any,
    });

    revalidatePath("/admin/people");
    revalidatePath("/tree");
    return { success: true, id: newPerson.id };
  } catch (error) {
    console.error("Error creating person:", error);
    throw new Error("حدث خطأ أثناء إضافة الشخص");
  }
}

// دالة تعديل شخص
export async function updatePerson(id: string, data: PersonFormData) {
  const session = await auth();
  if (!session?.user || !canManagePeople(session.user.role)) {
    throw new Error("غير مصرح لك بالقيام بهذه العملية");
  }

  const parsed = personSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const oldPerson = await db.person.findUnique({ where: { id } });
  if (!oldPerson) {
    throw new Error("الشخص غير موجود");
  }

  const { firstName, lastName, gender, status, birthDate, deathDate, notes, branchId } = parsed.data;
  const validatedFatherId = await validateFather(parsed.data.fatherId, id);

  const fullName = `${firstName} ${lastName}`;

  try {
    const updatedPerson = await db.person.update({
      where: { id },
      data: {
        firstName,
        lastName,
        fullName,
        gender,
        status,
        fatherId: validatedFatherId,
        branchId: branchId || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        deathDate: deathDate ? new Date(deathDate) : null,
        notes: notes || null,
      },
    });

    // تسجيل العملية مع القيم القديمة والجديدة
    await AuditLogService.log({
      action: "UPDATE_PERSON",
      entityType: "Person",
      entityId: id,
      userId: session.user.id,
      oldValues: oldPerson as any,
      newValues: data as any,
    });

    revalidatePath("/admin/people");
    revalidatePath("/tree");
    return { success: true, id: updatedPerson.id };
  } catch (error) {
    console.error("Error updating person:", error);
    throw new Error("حدث خطأ أثناء تعديل الشخص");
  }
}

// دالة حذف الشخص (حذف ناعم)
export async function deletePerson(id: string) {
  const session = await auth();
  if (!session?.user || !canManagePeople(session.user.role)) {
    throw new Error("غير مصرح لك بالقيام بهذه العملية");
  }

  // التحقق من وجود أبناء لهذا الشخص
  const childrenCount = await db.person.count({ where: { fatherId: id, deletedAt: null } });
  if (childrenCount > 0) {
    throw new Error(`لا يمكن حذف هذا الشخص لأنه يوجد لديه ${childrenCount} من الأبناء. قم بتعديل أبنائه أولاً.`);
  }

  try {
    // الحذف الناعم (Soft Delete)
    await db.person.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await AuditLogService.log({
      action: "DELETE_PERSON",
      entityType: "Person",
      entityId: id,
      userId: session.user.id,
    });

    revalidatePath("/admin/people");
    revalidatePath("/tree");
    return { success: true };
  } catch (error) {
    console.error("Error deleting person:", error);
    throw new Error("حدث خطأ أثناء حذف الشخص");
  }
}

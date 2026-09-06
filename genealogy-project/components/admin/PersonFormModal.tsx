"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";
import { useToast } from "@/components/ui/use-toast";
import { createPerson, updatePerson } from "@/server/actions/person.actions";
import { personSchema, PersonFormData } from "@/lib/validations/person";
import { Person, Branch, PersonStatus, Gender } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface PersonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  person?: Person | null;
  branches: Branch[];
  people: Person[];
}

export function PersonFormModal({ isOpen, onClose, person, branches, people }: PersonFormModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fatherOptions = people
    .filter(p => p.id !== person?.id && p.gender === "MALE")
    .map(p => ({
      value: p.id,
      label: p.fullName,
      description: `الأب: ${p.fatherId ? people.find(f => f.id === p.fatherId)?.fullName : "غير معروف"} | الحالة: ${p.status}`
    }));

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: Gender.MALE,
      status: PersonStatus.ALIVE,
      fatherId: null,
      branchId: null,
      birthDate: "",
      deathDate: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (person) {
      form.reset({
        firstName: person.firstName,
        lastName: person.lastName,
        gender: person.gender,
        status: person.status,
        fatherId: person.fatherId,
        branchId: person.branchId,
        birthDate: person.birthDate ? new Date(person.birthDate).toISOString().split('T')[0] : "",
        deathDate: person.deathDate ? new Date(person.deathDate).toISOString().split('T')[0] : "",
        notes: person.notes || "",
      });
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        gender: Gender.MALE,
        status: PersonStatus.ALIVE,
        fatherId: null,
        branchId: null,
        birthDate: "",
        deathDate: "",
        notes: "",
      });
    }
  }, [person, form]);

  async function onSubmit(data: PersonFormData) {
    setIsSubmitting(true);
    try {
      if (person) {
        await updatePerson(person.id, data);
        toast({ title: "نجاح", description: "تم تعديل بيانات الشخص بنجاح" });
      } else {
        await createPerson(data);
        toast({ title: "نجاح", description: "تم إضافة الشخص بنجاح" });
      }
      router.refresh();
      onClose();
    } catch (error: any) {
      toast({ 
        title: "خطأ", 
        description: error.message || "حدث خطأ أثناء الحفظ", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-heritage-bg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heritage text-deep-green">
            {person ? "تعديل بيانات الشخص" : "إضافة شخص جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الاسم الأول</label>
              <Input placeholder="مثال: محمد" {...form.register("firstName")} />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">اسم العائلة</label>
              <Input placeholder="مثال: القحطاني" {...form.register("lastName")} />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الجنس</label>
              <Select onValueChange={(value) => form.setValue("gender", value as Gender)} defaultValue={form.getValues("gender")}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">ذكر</SelectItem>
                  <SelectItem value="FEMALE">أنثى</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.gender && (
                <p className="text-sm text-red-500">{form.formState.errors.gender.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الحالة</label>
              <Select onValueChange={(value) => form.setValue("status", value as PersonStatus)} defaultValue={form.getValues("status")}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALIVE">حي</SelectItem>
                  <SelectItem value="DECEASED">متوفى</SelectItem>
                  <SelectItem value="DISCONNECTED">منقطع</SelectItem>
                  <SelectItem value="UNKNOWN">غير معروف</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-sm text-red-500">{form.formState.errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الأب</label>
              <Combobox 
                options={fatherOptions}
                value={form.getValues("fatherId")}
                onChange={(value) => form.setValue("fatherId", value)}
                placeholder="ابحث عن الأب..."
                emptyMessage="لا يوجد آباء مطابقين"
              />
              {form.formState.errors.fatherId && (
                <p className="text-sm text-red-500">{form.formState.errors.fatherId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الفرع</label>
              <Select onValueChange={(value) => form.setValue("branchId", value)} defaultValue={form.getValues("branchId") || undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ الميلاد</label>
              <Input 
                type="date" 
                value={form.watch("birthDate") || ""} 
                onChange={(e) => form.setValue("birthDate", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ الوفاة</label>
              <Input 
                type="date" 
                value={form.watch("deathDate") || ""} 
                onChange={(e) => form.setValue("deathDate", e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ملاحظات</label>
            <Input placeholder="ملاحظات إضافية..." {...form.register("notes")} />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>إلغاء</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-gold-500 hover:bg-gold-600 text-deep-green">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "حفظ"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

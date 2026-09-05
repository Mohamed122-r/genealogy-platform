"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("أدخل بريداً إلكترونياً صحيحاً"),
  password: z.string().min(8, "كلمة المرور 8 أحرف على الأقل"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginForm) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast({ title: "خطأ", description: "بيانات الدخول غير صحيحة", variant: "destructive" });
      } else {
        toast({ title: "نجاح", description: "تم تسجيل الدخول بنجاح" });
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast({ title: "خطأ غير متوقع", description: "حدث خطأ في النظام", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-heritage-bg p-4">
      <Card className="w-full max-w-md border-gold-500/50 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-deep-green flex items-center justify-center text-gold-500 text-3xl font-bold">
            ش
          </div>
          <CardTitle className="text-3xl font-heritage text-deep-green">شجرة النسب العائلية</CardTitle>
          <CardDescription>تسجيل الدخول للوحة التحكم</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" placeholder="admin@example.com" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-deep-green" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "دخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactSchema = z.object({
  name: z.string().min(2, "الاسم قصير جداً"),
  email: z.string().email("بريد إلكتروني غير صالح"),
  message: z.string().min(10, "الرسالة قصيرة جداً"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(data: ContactForm) {
    setIsLoading(true);
    // محاكاة إرسال الرسالة - يجب ربطها بـ Server Action أو API حقيقي
    setTimeout(() => {
      toast({ title: "تم الإرسال", description: "شكراً لتواصلك معنا، سنرد عليك قريباً." });
      form.reset();
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-heritage font-bold text-deep-green text-center mb-8">
          تواصل معنا
        </h1>
        <div className="w-32 h-1 bg-gold-500 mx-auto mb-12 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-green">معلومات التواصل</h2>
            <p className="text-gray-600 leading-relaxed">
              يسعدنا استقبال استفساراتكم واقتراحاتكم للعمل على إثراء الشجرة وتوثيقها بشكل أفضل.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-deep-green rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-gray-700">info@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-deep-green rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-gray-700">+966 555 555 555</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-deep-green rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-gray-700">المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          <Card className="bg-white border-gold-500/30 shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input id="name" placeholder="اكتب اسمك" {...form.register("name")} />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="example@email.com" {...form.register("email")} />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">رسالتك</Label>
                  <Textarea id="message" rows={5} placeholder="اكتب رسالتك هنا..." {...form.register("message")} />
                  {form.formState.errors.message && (
                    <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-deep-green" disabled={isLoading}>
                  {isLoading ? "جاري الإرسال..." : "إرسال الرسالة"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
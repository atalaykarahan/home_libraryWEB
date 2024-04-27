"use client";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LoginDto } from "@/app/_models/DTOs/loginDto";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { loginClient } from "@/app/_api/services/authService";
import { loginAction } from "@/actions/login";
import Link from "next/link";
import { toast } from "sonner";

const LoginForm: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nick_name: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      const serverProps: LoginDto = {
        user_name: values.nick_name,
        password: values.password,
      };
      try {
        loginClient(serverProps)
          .then((res: any) => {
            if (!res.status) {
              throw new Error("User ile ilgili bir hata oluştu");
            }
            return res.data;
          })
          .then((response: any) => {
            // login islemleri esas ve cookie kaydı esas burda yapılıyor
            loginAction(values).then((data) => {
              if (data && data.error) {
                // data varsa ve içinde error varsa, hata mesajını set et
                setErrorMessage(data.error);
              } else {
                // Başka bir işlem yap veya başarı durumunu işle
              }
            });
          })
          .catch((err: any) => {
            if (err.response.data.error == "Invalid credentials") {
              setErrorMessage("Geçersiz kullanıcı bilgileri");
            } else {
              setErrorMessage("Bilinmeyen bir hata oluştu");
            }

            console.log(err);
          });
      } catch (error) {
        console.log("kullanıcı ile ilgili bir sorun oluştu ", error);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Tekrar hoşgeldin"
      backButtonLabel="Hesabın yok mu? üye ol"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nick_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" disabled={isPending} />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/reset">Şifremi unuttum!</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Giriş Yap
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;

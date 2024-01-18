"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { signUpClient } from "@/app/_api/services/authService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useState, useTransition } from "react";
import { RegisterDto } from "@/app/_models/DTOs/registerDto";
import { loginAction } from "@/actions/login";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      nick_name: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    const serverProps: RegisterDto = {
      user_name: values.nick_name,
      email: values.email,
      password: values.password,
    };

    startTransition(() => {
      try {
        console.log(serverProps);
        signUpClient(serverProps)
          .then((res: any) => {
            if (!res.status) {
              throw new Error("User ile ilgili bir hata oluştu");
            }
            return res.data;
          })
          .then((response: any) => {
            console.log(response);
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
            if (err.response.status) {
              setErrorMessage("Geçersiz kullanıcı bilgileri");
              console.log("düştü");
            }
            console.log(err);
          });
      } catch (error) {
        console.log("kullanıcı ile ilgili bir sorun oluştu ", error);
      }
    });

    console.log(serverProps);
  };

  return (
    <CardWrapper
      headerLabel="Hesap Oluştur"
      backButtonLabel="Zaten hesabın var mı?"
      backButtonHref="/login"
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
                    <Input
                      {...field}
                      placeholder="krhnatalay"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E posta</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="atalay.karahan@ornek.com"
                      type="email"
                      disabled={isPending}
                    />
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
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message="" />
          <Button type="submit" className="w-full">
            Kayıt Ol
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

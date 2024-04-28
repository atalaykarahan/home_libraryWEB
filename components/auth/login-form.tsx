"use client";
import { loginAction } from "@/actions/login";
import { loginClient } from "@/app/_api/services/authService";
import { LoginDto } from "@/app/_models/DTOs/loginDto";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import * as z from "zod";
import FormError from "../form-error";
import { Button } from "../ui/button";
import { CardWrapper } from "./card-wrapper";

const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [transitionResponse, setTransitionResponse] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nick_name: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setTransitionResponse(true);
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
              }
            });
          })
          .catch((err: any) => {
            if (err.response.data.error == "Invalid credentials") {
              setErrorMessage("Geçersiz kullanıcı bilgileri");
            } else {
              setErrorMessage("Bilinmeyen bir hata oluştu");
            }
            setTransitionResponse(false);
            console.log(err);
          });
      } catch (error) {
        setTransitionResponse(false);
        console.log("kullanıcı ile ilgili bir sorun oluştu ", error);
      }

  };

  return (
    <CardWrapper
      headerLabel="Tekrar hoşgeldin"
      backButtonLabel="Hesabın yok mu? üye ol"
      backButtonHref="/register"
      showSocial
    >
      {transitionResponse == true ? (
        <div className="flex items-center w-full justify-center">
          <BeatLoader />
        </div>
      ) : (
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
                      <Input {...field} type="text" disabled={transitionResponse} />
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
                        {...field}
                        placeholder="********"
                        type="password"
                        disabled={transitionResponse}
                      />
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
            <Button type="submit" className="w-full" disabled={transitionResponse}>
              Giriş Yap
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};

export default LoginForm;

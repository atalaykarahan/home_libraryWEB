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
import { ResetSchema } from "@/schemas";
import { useState, useTransition } from "react";
import {
  loginClient,
  resetPasswordRequestClient,
} from "@/app/_api/services/authService";
import { loginAction } from "@/actions/login";
import Link from "next/link";

const ResetForm: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      userInputValue: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      try {
        resetPasswordRequestClient(values.userInputValue)
          .then((res: any) => {
            if (!res.status) {
              throw new Error(
                "User şifre sıfırlama isteği ile ilgili bir sorun oluştu"
              );
            }
            return res;
          })
          .then((response: any) => {
            if (response.status === 200) {
              setErrorMessage("");
              setSuccessMessage("Bağlantı e postanıza gönderildi");
            }
          })
          .catch((err: any) => {
            if (err.response.status === 404) {
              setSuccessMessage("");
              setErrorMessage("Geçersiz kullanıcı bilgileri");
            }
          });
      } catch (error) {
        console.log(
          "Şifre sıfırlama isteği ile ilgili bir sorun oluştu",
          error
        );
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Şifreni mi unuttun?"
      backButtonLabel="Giriş yap"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="userInputValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E posta veya Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="krhnatalay" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          <Button type="submit" className="w-full">
            Şifre sıfırlama bağlantısı gönder.
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;

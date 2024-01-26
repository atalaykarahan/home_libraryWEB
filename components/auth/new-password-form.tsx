"use client";
import { newPasswordServer } from "@/app/_api/services/authService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import { CardWrapper } from "./card-wrapper";

const NewPasswordForm: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [tryAgain, setTryAgain] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      try {
        if (token) {
          newPasswordServer(values.password, token)
            .then((res: any) => {
              console.log(res);
              if (res.message) {
                setErrorMessage("");
                setTryAgain(false);
                setSuccessMessage("Şifreniz başarıyla değiştirildi");
              } else {
                if (
                  res.error ===
                  "Your token has been expired. Please try again verification process."
                ) {
                  setSuccessMessage("");
                  setTryAgain(true);
                  setErrorMessage("Token süresi dolmuş yeniden deneyin.");
                }
              }
            })
            .catch((err: any) => {
              if (err.message === "Failed to fetch") {
                setErrorMessage("Lütfen internet bağlantınızı kontrol edin!");
                setTryAgain(false);
                setSuccessMessage("");
              } else {
                setErrorMessage("Bilinmeyen bir hata oluştu!");
                setTryAgain(false);
                setSuccessMessage("");
              }
              console.log(
                "Şifre sıfırlama request isteği ile ilgili bir sorun oluştu",
                err
              );
            });
        }
      } catch (error) {
        setErrorMessage("Bilinmeyen bir hata oluştu!");
        setTryAgain(false);
        setSuccessMessage("");
        console.log(
          "Şifre sıfırlama isteği ile ilgili bir sorun oluştu",
          error
        );
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Yeni şifreni gir"
      backButtonLabel="Giriş yap"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={errorMessage} />
          <FormSuccess message={successMessage} />
          {tryAgain === false ? (
            <Button type="submit" className="w-full">
              Şifremi sıfırla
            </Button>
          ) : (
            <Link href="/reset">
              <Button variant="link" className="w-full">
                Yeniden dene
              </Button>
            </Link>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;

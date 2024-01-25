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
import { NewPasswordSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  loginClient,
  newPasswordServer,
  resetPasswordRequestClient,
} from "@/app/_api/services/authService";
// import { loginAction } from "@/actions/login";

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
          newPasswordServer(values.password, token).then((res: any) => {
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
          });
        }
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

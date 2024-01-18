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
import { loginClient } from "@/app/_api/services/authService";
import { loginAction } from "@/actions/login";
import Link from "next/link";

const ResetForm: React.FC = () => {
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      userInputValue: "",
    },
  });



  const onSubmit = (values: z.infer<typeof ResetSchema>) => {

    console.log(values);


    // startTransition(() => {
    //   const serverProps: LoginDto = {
    //     user_name: values.nick_name,
    //     password: values.password,
    //   };
    //   try {
    //     loginClient(serverProps)
    //       .then((res: any) => {
    //         if (!res.status) {
    //           throw new Error("User ile ilgili bir hata oluştu");
    //         }
    //         return res.data;
    //       })
    //       .then((response: any) => {
    //         loginAction(values).then((data) => {
    //           if (data && data.error) {
    //             // data varsa ve içinde error varsa, hata mesajını set et
    //             setErrorMessage(data.error);
    //           } else {
    //             // Başka bir işlem yap veya başarı durumunu işle
    //           }
    //         });
    //       })
    //       .catch((err: any) => {
    //         if (err.response.status) {
    //           setErrorMessage("Geçersiz kullanıcı bilgileri");
    //           console.log("düştü");
    //         }
    //         console.log(err);
    //       });
    //   } catch (error) {
    //     console.log("kullanıcı ile ilgili bir sorun oluştu ", error);
    //   }
    // });
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
            name="reset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="krhnatalay"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message="" />
        <FormSuccess message="" />
        <Button type="submit" className="w-full">
          Şifre sıfırlama bağlantısı gönder.
        </Button>
      </form>
    </Form>
  </CardWrapper>
  );
};

export default ResetForm;

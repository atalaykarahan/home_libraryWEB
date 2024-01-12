import * as z from "zod";

export const LoginSchema = z.object({
  nick_name: z.string({
    invalid_type_error: "Geçersiz karakter",
  }),
  password: z.string().min(1, {
    message: "Şifre girmediniz.",
  }),
});

export const RegisterSchema = z.object({
  nick_name: z.string({
    invalid_type_error: "Geçersiz karakter",
  }),
  email: z.string().email().optional(),
  password: z.string().min(1, {
    message: "Şifre minimum 6 karakter uzunluğunda olmalı.",
  }),
});

import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 karakter uzunluğunda olmalı",
  }),
});

export const ResetSchema = z.object({
  userInputValue: z.union([
    z.string().email({ message: "Geçersiz e posta adresi" }),
    z.string({ invalid_type_error: "Geçersiz karakter" }),
  ]),
});

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
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Şifre minimum 6 karakter uzunluğunda olmalı.",
  }),
});

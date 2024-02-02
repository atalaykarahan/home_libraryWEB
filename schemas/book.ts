import * as z from "zod";

// export const RegisterSchema = z.object({
//     nick_name: z.string({
//       invalid_type_error: "Geçersiz karakter",
//     }),
//     email: z.string().email(),
//     password: z.string().min(1, {
//       message: "Şifre minimum 6 karakter uzunluğunda olmalı.",
//     }),
//   });

export const CreateBookSchema = z.object({
    book_title: z.string(),
    author_name: z.string(),
    publisher_name: z.string(),
    status:z.string(),
    book_summary:z.string(),
})
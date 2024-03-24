import * as z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  key: z.string().optional(),
});

const imageExtensions = /\.(jpg|jpeg|png|webp)$/i;


export const CreateBookSchema = z.object({
  book_image: z.string().refine((file) => {
    return imageExtensions.test(file);
  },{message: "Lütfen bir resim dosyası yükleyin (jpg, jpeg, png, webp)."}),
  book_title: z.string().min(1),
  author: z.array(optionSchema).min(1).max(1),
  publisher: z.array(optionSchema).min(1).max(1),
  status: z.array(optionSchema).min(1).max(1),
  categories: z
    .array(optionSchema)
    .min(1, {
      message:
        "Her kitabın en azından 1 adet kategorisi vardır öyle değil mi? :)",
    }),
  book_summary: z.string().min(10, {
    message: "Kitap özeti minimum 10 karakter uzunluğunda olmalıdır.",
  }),
});

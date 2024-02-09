import * as z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  key: z.string(),
});

export const CreateBookSchema = z.object({
  book_title: z.string(),
  author_id: z.string(),
  publisher_id: z.string().optional(),
  status_id: z.string(),
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

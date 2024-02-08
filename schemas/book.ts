import * as z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  key:z.string().optional(),
  disable: z.boolean().optional(),
});

// const FormSchema = z.object({
//   frameworks: z.array(optionSchema).min(1),
// });




export const CreateBookSchema = z.object({
  book_title: z.string(),
  author_id: z.string(),
  publisher_id: z.string(),
  status_id: z.string(),
  // book_summary: z.string(),
  categories: z.array(optionSchema).min(1),
});

import * as z from "zod";

export const CreateBookSchema = z.object({
  book_title: z.string(),
  author_id: z.number(),
  publisher_id: z.number(),
  status_id: z.number(),
  book_summary: z.string(),
});

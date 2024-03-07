import * as z from "zod";

export const CreateAuthorSchema = z.object({
  author_name: z.string(),
  author_surname: z.string(),
});

export const EditAuthorSchema = z.object({
  author_name: z.string().min(1),
  author_surname: z.string(),
})
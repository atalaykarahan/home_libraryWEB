import * as z from "zod";

export const CreateAuthorSchema = z.object({
  author_name: z.string(),
  author_surname: z.string(),
});

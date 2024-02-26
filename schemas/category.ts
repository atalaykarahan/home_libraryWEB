import * as z from "zod";

export const CreateCategorySchema = z.object({
  category_name: z.string(),
});

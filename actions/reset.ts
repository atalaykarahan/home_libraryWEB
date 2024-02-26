"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Lütfen yabancı karakter girmeyin!" };
  }

  const { userInputValue } = validatedFields.data;

  
};

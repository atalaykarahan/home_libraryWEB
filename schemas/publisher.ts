import * as z from "zod";

export const CreatePublisherSchema = z.object({
  publisher_name: z.string(),
});

export const EditPublisherSchema = z.object({
  publisher_name: z.string(),
});
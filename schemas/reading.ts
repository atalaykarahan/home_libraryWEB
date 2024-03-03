import * as z from "zod";

export const AddMyLibrarySchema = z.object({
    status_id: z.string(),
});

export const EditMyReadingSchema = z.object({
    status_id:z.string().optional(),
    comment:z.string().optional(),
})
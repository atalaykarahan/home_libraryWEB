import * as z from "zod";

export const AddMyLibrarySchema = z.object({
    status_id: z.string(),
});
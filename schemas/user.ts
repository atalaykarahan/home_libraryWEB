import { z } from "zod";

export const UserProfilePrivacySchema = z.object({
    user_visibility: z.boolean().default(true).optional(),
    user_library_visibility: z.boolean().default(true).optional(),
})
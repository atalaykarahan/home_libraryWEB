import { z } from "zod";

export const UserProfilePrivacySchema = z.object({
    user_visibility: z.boolean(),
    user_library_visibility: z.boolean(),
})
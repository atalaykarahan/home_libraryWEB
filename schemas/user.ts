import { z } from "zod";

// const optionSchema = z.object({
//     label: z.string(),
//     value: z.string(),
//     key: z.string().optional(),
//   });


  const StatusSchema = z.object({
    value:z.string(),
    label:z.string(),
  })

export const UserProfilePrivacySchema = z.object({
    user_visibility: z.boolean(),
    user_library_visibility: z.boolean(),
})





  export const EditUsersSchema = z.object({
    authority: z.string(),
  })
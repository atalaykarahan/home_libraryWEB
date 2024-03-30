import * as z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  key: z.string().optional(),
});

const imageExtensions = /\.(jpg|jpeg|png|webp)$/i;

// export const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ];

export const MAX_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
export const ImageTestSchema = z.object({
  book_image: z.array(z.string()).min(1),
});

export const CreateBookSchema = z.object({
  book_title: z.string().min(1),
  author: z.array(optionSchema).min(1).max(1),
  publisher: z.array(optionSchema).min(1).max(1),
  status: z.array(optionSchema).min(1).max(1),
  categories: z.array(optionSchema).min(1, {
    message:
      "Her kitabın en azından 1 adet kategorisi vardır öyle değil mi? :)",
  }),
  book_summary: z.string().min(10, {
    message: "Kitap özeti minimum 10 karakter uzunluğunda olmalıdır.",
  }),
});

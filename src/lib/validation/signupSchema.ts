import { z } from "zod";
export const signUpSchema = z.object({
  name: z
    .string()
    .nonempty("Name can't be empty!")
    .min(3, "Name must be at least 3 character"),
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Please enter a valid email address!"),
  password: z
    .string()
    .nonempty("Password can't be empty!")
    .min(6, "Password must be 6 character long"),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

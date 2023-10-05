import { z } from "zod";

export const logInSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address!"),
  password: z
    .string()
    .nonempty("Password can not be empty!")
    .min(6, "Password must be at least 6 character long"),
});

export type LogInSchemaType = z.infer<typeof logInSchema>;

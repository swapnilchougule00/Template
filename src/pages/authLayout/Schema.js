import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "password is required" }),
});

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(1, { message: "name is required" })
      .regex(/^[a-zA-Z\s]+$/, "name should only contain letters"),
    email: z
      .string()
      .min(1, { message: "email is required" })
      .email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(1, { message: "password is required" })
      .refine((val) => passwordRegex.test(val), {
        message:
          "Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      }),

    confPassword: z.string().min(1, { message: "password is required" }),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "password do not match",
    path: ["confPassword"],
  });

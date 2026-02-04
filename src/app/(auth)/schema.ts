import z from "zod";

export const loginSchema = z.object({
<<<<<<< HEAD
    email: z.string().email({ message: "Enter a valid email" }),
=======
    email: z.email({ message: "Enter a valid email" }),
>>>>>>> origin/main
    password: z.string().min(6, { message: "Minimum 6 characters" }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().min(2, { message: "Enter your name" }),
<<<<<<< HEAD
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Minimum 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
}).refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
=======
    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Minimum 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
}).refine((v) => v.password === v.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
>>>>>>> origin/main
});

export type RegisterData = z.infer<typeof registerSchema>;
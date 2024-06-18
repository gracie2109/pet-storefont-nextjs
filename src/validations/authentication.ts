import {z} from "zod";


export const passWordAndConfirmSchema = z.object({
    password: z
        .string()
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
        ),
    confirmPassword: z.string(),
});
const passWordCheck = (v: any, ctx: any) => {
    if (v.password !== v.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }
};
export const emailShema = z.object({
    email: z
        .string()
        .email({message: "Invalid email address"})
        .refine((email) => email.endsWith("@gmail.com"), {
            message: "Email need end with @gmail.com",
        }),
});


export const registerSchema = z
    .object({
        username: z.string().min(5, {
            message: "Name must be at least 5 characters.",
        }),
    })
    .merge(emailShema)
    .merge(passWordAndConfirmSchema)
    .superRefine(passWordCheck);


export const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string()
})



export const recoverPasswordSchema = z.object({

}).merge(passWordAndConfirmSchema).superRefine(passWordCheck);



export const profileChangePassword = z.object({
    oldPassword: z.string().min(5, {message: "Old password"})
}).merge(passWordAndConfirmSchema).superRefine(passWordCheck);
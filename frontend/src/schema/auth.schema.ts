import {z} from "zod"

export const loginFormSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(64)
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>

export const signUpFormSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.email(),
    password: z.string().min(8).max(64),
    confirm_password: z.string().min(8).max(64),
    accept_term: z.boolean().refine((value) => value, {
        message: "Accept terms and conditions"
    })
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ['confirm_password']
})

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>

export const forgotFormSchema = z.object({
    email: z.email(),
})

export type ForgotFormSchemaType = z.infer<typeof forgotFormSchema>

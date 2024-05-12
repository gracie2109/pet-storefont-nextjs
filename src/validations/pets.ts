import {z} from "zod";


export const petSchema = z.object({
    name: z.string()
        .min(2, {message: 'Name at least 2 characters'})
        .max(30, {message: 'Name at least 30s characters'})
    ,
    icon: z.string().min(2, {message: 'Icon is required'}),
})

export const petEditSchema = z.object({
    status: z.boolean().optional()
}).merge(petSchema)


export type petInfer = z.infer<typeof petSchema>;
export type petEditInfer = z.infer<typeof petEditSchema>;

export const initValue = {
    name: "",
    status: true,
    icon: ""
}
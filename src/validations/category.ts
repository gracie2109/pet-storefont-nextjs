import {z} from "zod";


export const categoryCreateSchema = z.object({
    name: z.string()
        .min(2, {message: 'Category name at least 2 characters'})
        .max(50, {message: 'Category name max 50 characters'})
    ,
    desc:z.array(z.any()).optional(),
    images:z.any()
})

import {z} from "zod";


export const newsSchema = z.object({
    name: z.string()
        .min(2, {message: 'Post name at least 2 characters'})
        .max(50, {message: 'Post name max 50 characters'})
    ,
    images:z.any().optional(),
    preview:z.string().optional(),
    content:z.string().min(11, {message: 'Post content need content'}),
    tags:z.array(z.any()).optional(),
})

export const newsEditSchema = z.object({
    status: z.boolean().optional()
}).merge(newsSchema)


export type newsInfer = z.infer<typeof newsSchema>;
export type newsEditInfer = z.infer<typeof newsEditSchema>;


export const newInitValue = {
    name: "",
    images:null,
    preview:"",
    content:"",
    tags:[]
} satisfies newsInfer
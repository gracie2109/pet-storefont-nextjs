import {z} from "zod";

export const serviceSchema = z.object({
    name: z.string().min(2, {message: 'Name is required'}),
    desc:z.string().optional(),
    minTimeToDo:z.string().min(1)
})

export const serviceEditSchema = z.object({
    status:z.boolean()
}).merge(serviceSchema)

export const serviceInit = {
    name:"",
    desc:"",
    minTimeTodo:"",
}

export type serviceInfer =z.infer<typeof serviceSchema>;
export type serviceEditInfer = z.infer<typeof serviceEditSchema>;



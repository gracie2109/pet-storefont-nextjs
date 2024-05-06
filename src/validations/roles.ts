import {z} from "zod";
import {serviceSchema} from "@/validations/services";


export const roleSchema = z.object({
    name: z.string().min(2, {
        message: "Role name must be at least 2 characters.",
    }),
    permissions: z.array(z.string()).nonempty({
        message: "Permissions must be at least 1 item"
    }),
})
export const roleInit = {
    name: "",
    permissions: []
}

export type roleInfer = z.infer<typeof roleSchema>;

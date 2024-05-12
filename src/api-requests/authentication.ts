'use server';

import {z} from "zod";
import {loginSchema, registerSchema} from "@/validations/authentication";
import {redirect} from "next/navigation";
import {toast} from "react-hot-toast"

const baseUrl = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_PRODUCTIONS : process.env.NEXT_PUBLIC_API_DEVELOPMENT;

export async function loginHandler(payload: z.infer<typeof loginSchema>) {

    const response = await fetch(`${baseUrl}auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"content-type": "application/json; charset=UTF-8"},
        credentials: "include",
        cache: "no-store"
    });
    const data = await response.json();

    if (data.status === 200) {
        if (!data.user.isVerified) {
            return redirect("/")
        } else {
            return redirect(`/login?token=${data.accessToken}&isVerified=${data.user.isVerified}&isActive=${data.user.status}`);
        }
    }
}

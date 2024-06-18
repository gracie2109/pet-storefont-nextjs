'use client'
import {useForm} from "react-hook-form";
import {UserForm} from "@/components/forms/user-handle-form";
import React from "react";
import {FileWithPreview} from "@/types";
import {Shell} from "@/components/shell";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";


export function ProfileGeneralInfo () {
    const [images, setImages] = React.useState< FileWithPreview[] | null>(null)
    const form = useForm();
    const handleUserForm = (value:any) => {

    }



    return (
        <Shell variant="sidebar">

        <Card>
            <CardHeader>
                <CardTitle>Change profile</CardTitle>
                <CardDescription>Click on your avatar to change</CardDescription>
            </CardHeader>
          <CardContent >
              <UserForm
                  form={form}
                  handleUserForm={handleUserForm}
                  images={images}
                  setImages={setImages}
                  mode={"profile"} />
          </CardContent>
        </Card>
        </Shell>
    )
}
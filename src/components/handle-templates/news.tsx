'use client';
import * as React from 'react';
import {NewsForms} from "@/components/forms/news-forms";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newsEditSchema, newsSchema, newInitValue, newsEditInfer, newsInfer} from "@/validations/news";
import {setValuesOfForm} from "@/lib/helpers";
import toast from "react-hot-toast";
import { createNewPostFn, updatePost} from "@/api-requests/news";
import {FileWithPreview} from "@/types";
import {convertImageServerToPreview, uploadFiles} from "@/lib/utils";
import {INews} from "@/types/news";



interface Props {
    params: string,
    postSelected?: INews
}


export function NewsHandleTemplate({params, postSelected}: Props) {
    const [images, setImages] = React.useState<FileWithPreview[] | null>(null);
    const form = useForm<newsInfer | newsEditInfer>({
        mode: "all",
        resolver: zodResolver(params ==="create" ? newsSchema : newsEditSchema),
        defaultValues: params === "edit" ? postSelected : newInitValue,
    });

    const onSubmit = async (values: any) => {
        if(params == "create")    {
          if(images){
              await uploadFiles(images,"news").then((res:any[])=>{
                  console.log("res ===>", res);
                  toast.promise((createNewPostFn({...values, images:res})), {
                      loading: "Creating...",
                      error:(err:any) => {
                          console.log("err", err);
                          return "Creat news fail!"
                      },
                      success: (data: any) => {
                          console.log("success", data);
                          form.reset();
                          setImages([])
                          return "Create news success!"
                      }
                  })
              })
          }else{
              toast.promise((createNewPostFn({...values})), {
                  loading: "Creating...",
                  error:(err:any) => {
                      console.log("err", err);
                      return "Creat news fail!"
                  },
                  success: (data: any) => {
                      console.log("success", data);
                      form.reset();
                      setImages([])
                      return "Create news success!"
                  }
              })
          }

        }else{
            if(images) {
                await uploadFiles(images,"news").then((res:any[])=>{
                    toast.promise((updatePost({...values, images:res, id: params})), {
                        loading: "Creating...",
                        error:(err:any) => {
                            console.log("err", err);
                            return "Update news fail!"
                        },
                        success: (data: any) => {
                            console.log("success", data);
                            form.reset();
                            setImages([])
                            return "Update news success!"
                        }
                    })
                })
            }else{
                toast.promise((updatePost({...values,id: params})), {
                    loading: "Creating...",
                    error:(err:any) => {
                        console.log("err", err);
                        return "Update news fail!"
                    },
                    success: (data: any) => {
                        console.log("success", data);
                        form.reset();
                        setImages([])
                        return "Update news success!"
                    }
                })
            }
        }

    };

    React.useEffect(() => {
        if (postSelected && params !== "create") {
            setValuesOfForm(postSelected, form);
            const newImages = convertImageServerToPreview(postSelected?.images);
            setImages(newImages)
        }
    }, [postSelected, params])


    return (
        <React.Fragment>
            <NewsForms
                form={form}
                submitHandler={onSubmit}
                loading={false}
                mode={params}
                images={images}
                setImages={setImages}
            />
        </React.Fragment>
    )
}
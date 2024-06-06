'use client'
import * as React from "react";
import {sunEditorSetting} from "@/configs/rich-text-editor";
import 'suneditor/dist/css/suneditor.min.css';
import dynamic from "next/dynamic";
import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {onImageUploadBeforeSunEdior} from "@/lib/helpers";
import {useMounted} from "@/hooks/use-mounted";
import {SunEditorReactProps} from "suneditor-react/dist/types/SunEditorReactProps";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

interface Props {
    field: ControllerRenderProps<FieldValues, any>
}

const RichTextEditor = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>& SunEditorReactProps & Props
>(({  field,...props }, ref) =>{

    const optionsMenmo = React.useMemo(() => sunEditorSetting , []);
    const mounted = useMounted();

    if(mounted)
        return (

                <SunEditor
                    setOptions={optionsMenmo}
                    {...field}
                    {...props}
                    setContents={field.value ? field.value : ""}
                    onImageUploadBefore={onImageUploadBeforeSunEdior("petshop/products")}
                    height="50vh"


                />
    )
})
RichTextEditor.displayName = "RichTextEditor"

export { RichTextEditor }

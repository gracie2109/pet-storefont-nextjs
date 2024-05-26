'use client'
import * as React from "react";
import {sunEditorSetting} from "@/configs/rich-text-editor";
import 'suneditor/dist/css/suneditor.min.css';
import dynamic from "next/dynamic";
import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {onImageUploadBeforeSunEdior} from "@/lib/helpers";
import {SunEditorReactProps} from "suneditor-react/dist/types/SunEditorReactProps";



const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

interface Props {
    field: ControllerRenderProps<FieldValues, any>
}

const RichTextEditor = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>& Props
>(({  field }, ref) =>{
    const [value, setValue] = React.useState<string>(field.value);

    const optionsMenmo = React.useMemo(() => {
        return sunEditorSetting
    }, []);

    return (
        <div>
            <SunEditor
                setOptions={optionsMenmo}
                {...field}

                setContents={field.value ? field.value : ""}
                onImageUploadBefore={onImageUploadBeforeSunEdior("petshop/products")}
                height="50vh"
                // @ts-ignore
                ref={ref}
            />
        </div>
    )
})
RichTextEditor.displayName = "RichTextEditor"

export { RichTextEditor }

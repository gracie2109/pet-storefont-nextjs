import * as React from "react";
import {sunEditorSetting} from "@/configs/rich-text-editor";
import 'suneditor/dist/css/suneditor.min.css';
import dynamic from "next/dynamic";
import {ControllerRenderProps, FieldValues} from "react-hook-form";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

interface Props {
    field: ControllerRenderProps<FieldValues, any>
}

export function RichTextEditor({field}: Props) {

    const optionsMenmo = React.useMemo(() => {
        return sunEditorSetting
    }, []);

    return (
        <SunEditor
            setOptions={optionsMenmo}
            {...field}
            setContents={field.value ? field.value : ""}
        />
    )
}
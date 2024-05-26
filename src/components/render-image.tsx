'use client'
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import * as React from "react";
import "react-medium-image-zoom/dist/styles.css"
import {MediumZoom} from "@/components/medium-zoom";
import Image from "next/image";
import {FileWithPreview} from "@/types";
import {CropIcon} from "@radix-ui/react-icons";


interface IRenderImage {
    images: FileWithPreview[] | null,
    setImages: React.Dispatch<React.SetStateAction<any[] | null>> | React.Dispatch<React.SetStateAction<any[]>>,
    isPreviewMode: boolean
}

export function RenderImage({images, setImages, isPreviewMode}: IRenderImage) {

    return (
        <>
            <ScrollArea className="gap-6 w-full max-h-[360px] overflow-y-scroll whitespace-nowrap rounded-md my-3 relative">
                <div className="flex flex-wrap gap-3 items-center z-999 mt-5">
                    {images && images.map((item: FileWithPreview, index: number) => (
                        <MediumZoom key={index}>
                            <div key={index}
                                 className="inline-block h-[70px] w-[70px] relative  p-1 rounded border-2 border-dashed border-orange-600"
                            >
                                <Image src={item?.preview} key={index} alt="" width={20} height={20}
                                       className="h-full w-full object-cover"/>
                                {!isPreviewMode && (
                                    <div className="absolute -top-[0.5rem] -right-2 z-20"
                                         onClick={() => {
                                             const newArr = images.filter((_, idx: number) => idx !== index);
                                             setImages(newArr);
                                         }}>
                                        <div  className="cursor-pointer w-4 h-4 rounded-full bg-orange-600 text-white text-center relative">
                                            <div className="absolute w-full  h-full grid place-items-center  after:content-['x'] after:relative after:-top-[0.1rem] after:text-[12px]" />
                                        </div>
                                    </div>
                                )}

                            </div>
                            {/*<div className="absolute bottom-2 w-full backdrop-blur-lg	 bg-white/50 backdrop-opacity-10">*/}
                            {/*    <div className="flex items-center gap-3 justify-center">*/}
                            {/*        <CropIcon />*/}
                            {/*        <CropIcon />*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                        </MediumZoom>
                    ))}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>


        </>
    )
}
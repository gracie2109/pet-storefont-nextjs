
import Zoom from "react-medium-image-zoom"
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'

import "react-medium-image-zoom/dist/styles.css"
import {useMounted} from "@/hooks/use-mounted";
import React from "react";

export function MediumZoom({ children }: { children:any }) {
    const mounted = useMounted()
    return (
        <>
            {mounted && <Zoom zoomMargin={80} classDialog="zoom-image">
                {children}
            </Zoom>}

        </>
    )
}


export function ControllerZoom({ children, isZoomed,handleZoomChange }: { children:any,isZoomed:any,handleZoomChange:(value:any) => void }) {
    const mounted = useMounted()
    return (
        <>
            {mounted && (
                <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                    { children }
                </ControlledZoom>
            )}

        </>
    )
}
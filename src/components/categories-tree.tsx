'use client';

import React from "react";


interface Props {
    data: ICategory[]
}

const CategoryChild = ({data}: any) => {

    return (
        <></>
    )
}
export const CategoriesTree = ({data: categories}: Props) => {
    const [child, setChild] = React.useState<ICategory | null>(null);
    const [subChild, setSubChild] = React.useState<ICategory | null>(null);
    const handleClick = (i: ICategory) => {
        setChild(i)
    }
    const handleClickChild = (i: ICategory) => {
        setSubChild(i)
    }

    return (

        <>
            <div className="border w-full overflow-x-scroll relative">
                <div
                    className="flex relative gap-3 p-4 [&>div]:min-w-[calc(100%/3)] [&>div]:border [&>div]:relative [&>div]:h-[250px] [&>div]:overflow-y-scroll">

                    <div className="space-y-2">
                        {categories?.map((i: any, j: any) => (
                            <div className="flex" key={j} onClick={() => handleClick(i)}>
                                <div>{i.name}</div>
                                {i.children instanceof Array && i.children.length > 0 && ">"}
                            </div>
                        ))}
                    </div>
                    <div>
                        {child && child.children.length > 0 && child.children.map((i: any, j: any) => (
                                <div className="space-y-2" key={j}>
                                    <div className="" onClick={() => handleClickChild(i)}>
                                        <div>
                                            {i.name}
                                            {i.children instanceof Array && i.children.length > 0 && ">"}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div>
                        {subChild && subChild.children.length > 0 && subChild.children.map((i: any, j: any) => (
                                <div className="space-y-2" key={j}>
                                    <div className="" onClick={() => handleClickChild(i)}>{i.name}</div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

        </>
    );
}
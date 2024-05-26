import {INews} from "@/types/news";
import {truncate,cn} from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

interface Props extends  React.HTMLAttributes<HTMLDivElement> {
    data:INews,
}

export function PostCard({data,className}: Props) {
    if (data)
        return (
            <div className={cn("border border-primary rounded-lg h-92", className)}>
                <div className="grid place-items-center">
                    <Link href={`/news/${data?.slug}`}>
                        <img src={data.images?.[0].url} alt={data.name}
                             className="object-cover h-36 w-auto"/>
                    </Link>

                </div>
                <div className="px-6 py-4">
                    <p className="font-bold text-lg mb-2 hover:text-primary h-20">
                        <Link href={`/news/${data?.slug}`}>
                            {truncate(data?.name, 70)}
                        </Link>
                    </p>
                    <p className="text-gray-700 text-sm h-16 w-full">{truncate(data?.preview, 80)}</p>
                    <div className="tags_render_card">
                        {data?.tags?.slice(0, 2).map((tag, index) => (
                            <span key={index}
                                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                             #{tag.value}
                </span>
                        ))}
                        {data?.tags?.length > 2 && (
                            <span
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    + {data.tags.length - 2} tags
                </span>
                        )}
                    </div>
                </div>

            </div>
        )
}
import {Shell} from "@/components/shell";
import * as React from "react";
import {getDetailPostBySlug, getListPost} from "@/api-requests/news";
import {toTitleCase, truncate} from "@/lib/utils";
import {INews} from "@/types/news";
import {PostRelatedCard} from "@/components/cards/post-related-card";
import {Breadcrumbs} from "@/components/breadcrumb"
import {Skeleton} from "@/components/ui/skeleton";
import {CardSkeleton} from "@/components/cards/card-skeleton";
import {Card} from "@/components/ui/card";
import {ResultPageNotification} from "@/components/result-page-notification";
import Link from "next/link";

interface Params {
    params: { slug: string; }
}

export default async function PageDetailPost({params}: Params) {
    const postSelected = await getDetailPostBySlug(params.slug.toString());
    const {payload} = await getListPost();
    const relatedPost =postSelected?.status == 200 && payload.data.filter((i: INews) => i._id !== postSelected?.payload.data._id);

    if (postSelected?.status == 200 && postSelected.payload.data) {
        const data = postSelected.payload.data;
        return (
            <Shell variant="sidebar" className="relative">
                <div className="container left-6 ml-4 absolute top-5 w-full">
                    <Breadcrumbs
                        segments={[
                            {
                                title: "News",
                                href: "/news",
                            },
                            {
                                title: truncate(toTitleCase(postSelected.payload.data.name), 100),
                                type: "text",
                            }
                        ]}
                    />
                </div>
                <div className="flex gap-6 relative">
                    <div id="news_content" className="flex-1 relative overflow-y-scroll">
                        <Shell variant="default">
                            <div className="p-2 m-auto select-none h-screen">
                                <p className="font-bold text-3xl mb-5">
                                    {data?.name}
                                </p>
                                <img src={data.images?.[0].url} alt={data.name}
                                     className="object-cover aspect-video w-full border border-gray-200 rounded"/>
                                <p className="text-center">
                                    Created at {data?.createdAt}

                                </p>
                                <p className="text-muted-foreground text-md my-3 ">{truncate(data?.preview, 100)}</p>
                                <div className="my-3"
                                     dangerouslySetInnerHTML={{__html: data?.content}}/>
                            </div>
                        </Shell>
                    </div>
                    <div className="w-1/3 space-y-8">
                        <div className="mt-5 space-y-8 ">
                            <div className="text-2xl font-bold text-inner__line">TAGS</div>
                            <div className="flex flex-wrap gap-3">
                                {(data?.tags as INews['tags'])?.map((i, j: number) => (
                                    <a href="#" key={j}>
                                <span
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                #{i.value}
                            </span>
                                    </a>
                                ))}

                            </div>
                        </div>

                        <div className="mt-5 space-y-8 ">
                            <div className="text-2xl font-bold uppercase text-inner__line">Related Post</div>
                            <div className="grid  grid-cols-2 gap-4">
                                {relatedPost.slice(0, 4)?.map((j: INews, jj: number) => (
                                    <PostRelatedCard key={jj} data={j}/>
                                ))}
                            </div>
                            {relatedPost.length >= 2 && (<div className="text-center hinh-thoi w-32 m-auto p-1.5 ">

                                <button className="w-full">
                                    <a href="/news"> Show more</a>
                                </button>

                            </div>)}
                        </div>
                    </div>
                </div>
            </Shell>

        )
    } else {
        return (
            <ResultPageNotification
                status="404"
                title="NOT FOUND RECORD"
                subtitle={
                    <Link href={"/news"} className="text-primary">Go Back</Link>
                }
            >
                <></>
            </ResultPageNotification>
        )
    }
}
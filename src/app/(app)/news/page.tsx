import {Shell} from "@/components/shell";
import {getListPost} from "@/api-requests/news";
import {INews} from "@/types/news";
import {PostCard} from "@/components/cards/post-card";
import * as React from "react";
import {NewsFilters} from "@/components/filters/news-filters";
import {SelectOptions} from "@/types";
import {Breadcrumbs} from "@/components/breadcrumb";
import {toTitleCase} from "@/lib/utils";


export default  async function PageNewsList() {
    const post = await getListPost();
    const data = (post.payload.data.flatMap((i:any) => i.tags)?.map((j:SelectOptions) => j.value));
    const allTags = Array.from(new Set(data))
    return (
        <Shell>
            <div className="container -left-2  relative  mb-5 top-2 w-full">
                <Breadcrumbs
                    segments={[
                        {
                            title: "Home",
                            href: "/",
                        },
                        {
                            title: "News",
                            type:"text"
                        },
                    ]}
                />
            </div>
            <div className="flex gap-3 relative ">

                <div className=" w-1/4 relative overflow-y-scroll">
                    <NewsFilters tags={allTags}/>
                </div>
                <div className="flex-1 relative overflow-y-scroll">
                    {post.status == 200 ? (
                        <div className="grid grid-cols-3 gap-3">
                            {post.payload.data.map((i: INews, ii: number) => (
                                <PostCard key={ii} data={i}/>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>

        </Shell>
    )
}
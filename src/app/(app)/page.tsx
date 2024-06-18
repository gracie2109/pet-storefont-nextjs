import {PostCard} from "@/components/cards/post-card";
import {getListPost} from "@/api-requests/news";
import {INews} from "@/types/news";

export default async function HomePage(){
    const post = await getListPost();
    return (
        <div className="container space-y-5">
            <div>
                {post.status == 200 ? (
                    <div className="grid grid-cols-4 gap-3 ">
                        {post.payload.data.map((i: INews, ii: number) => (
                            <PostCard key={ii} data={i}/>
                        ))}
                    </div>
                ) : null}

            </div>

        </div>
    )
}
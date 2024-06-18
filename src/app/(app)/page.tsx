import {PostCard} from "@/components/cards/post-card";
import {getListPost} from "@/api-requests/news";
import {INews} from "@/types/news";
import {HoverEffect} from "@/components/ui/card-hover-effect";

export default async function HomePage(){
    const post = await getListPost();
    return (
        <div className="container space-y-5">
            <div className="max-w-5xl mx-auto px-8">

            </div>

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

 const projects = [
    {
        title: "Stripe",
        description:
            "A technology company that builds economic infrastructure for the internet.",
        link: "https://stripe.com",
    },
    {
        title: "Netflix",
        description:
            "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
        link: "https://netflix.com",
    },
    {
        title: "Google",
        description:
            "A multinational technology company that specializes in Internet-related services and products.",
        link: "https://google.com",
    },
    {
        title: "Meta",
        description:
            "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
        link: "https://meta.com",
    },
    {
        title: "Amazon",
        description:
            "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        link: "https://amazon.com",
    },
    {
        title: "Microsoft",
        description:
            "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
        link: "https://microsoft.com",
    },
];
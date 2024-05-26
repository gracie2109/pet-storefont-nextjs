import {truncate} from "@/lib/utils";

export function PostRelatedCard ({data}:{data:any}) {
    const image = data?.images?.[0]?.url
    return (
        <div className="h-[256px] border rounded-md">
            <div className="">
                <img src={image} alt={data.name}
                     className="w-full object-cover h-36 aspect-video"
                />
                <div className="p-4">
                    <p className="font-semibold text-sm hover:text-primary cursor-pointer">
                        <a href={`/news/${data.slug}`}>
                            {truncate(data.name, 85)}
                        </a>
                    </p>
                </div>

            </div>
        </div>
    )
}
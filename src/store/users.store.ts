import { atom,useAtom  } from 'jotai';
import {IServiceFetchResponse} from "@/types/service";
import http from "@/configs/http";
import {endPoint} from "@/configs/endpoint";
import { atomWithStorage } from "jotai/utils"


const configAtom = atomWithStorage<IServiceFetchResponse>("services", {
    status: 0,
    payload: {
        data: [],
        pets: []
    }
})

export const fetchPost = async (): Promise<IServiceFetchResponse> => {
    const result = await http.get(endPoint.getListServices);
    return result
}

export function useTestJotail () {
    const [chunks, setChunks] = useAtom(configAtom)


    async function getTestData() {
        const result = await http.get(endPoint.getListServices);
        setChunks(result)
    }


    return {
        getTestData,
    }


}





// export const postData = atom(
//     async (get) => {
//         const id = get(postId);
//         const cache = get(postCache) as any;
//
//         if (cache[id]) {
//             return cache[id];
//         }
//
//         // to cache fetch, use jotai-cache
//         const postFetched = await fetchPost(id);
//         if (postFetched) {
//             return postFetched;
//         }
//
//         return cache[id] || EMPTY_POST_DATA;
//     },
//     (_, set, post: PostType) => {
//         // only for hydrated data for now
//         set(postCache, (cache) => ({
//             ...cache,
//             [post.id]: post,
//         }));
//     }
// );

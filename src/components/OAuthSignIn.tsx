import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function OAuthSignIn() {
    return (
        <div className="grid grid-cols-2 items-center gap-3 justify-between w-full">
            <Button variant="outline" className="">
                <Icons.google_color className={"w-4 h-4 mr-2"} />Google
            </Button>
            <Button variant="outline">
                <Icons.facebook_color className={"w-4 h-4 mr-2"} />Google
            </Button>

        </div>
    )
}
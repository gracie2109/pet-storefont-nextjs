
import Link from "next/link";
import {ProfileGeneralInfo} from "@/components/profile/general-info";
const tabsLink = ['general', 'security', 'transaction']

export default function Profile2Page () {
    return (
        <div className="w-full">
            <div className="my-4 w-full">
                <ProfileGeneralInfo  />
            </div>
        </div>
    )
}
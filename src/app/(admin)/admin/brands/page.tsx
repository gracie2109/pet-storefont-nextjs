
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {Shell} from "@/components/shell";
import {BrandsShell} from "@/components/shells/brands-shell";
import {getListBrands} from "@/api-requests/brands";
export default async function PageBrands() {
    const data = await getListBrands()

    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated >
                <PageHeader>
                    <PageHeaderHeading size="sm">Brands</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your brands
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>
            {data.status === 200 ? <BrandsShell data={data.payload.data}/> :"Something went wrong"}
        </Shell>
    )
}
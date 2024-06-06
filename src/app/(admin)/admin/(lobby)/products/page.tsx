import {Shell} from "@/components/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/page-header";
import {ProductShell} from "@/components/shells/product-shell";
import Link from "next/link";

export default async function  PagePoductList () {
    return (
        <Shell variant="sidebar">
            <PageHeaderShell separated >
                <PageHeader>
                    <PageHeaderHeading size="sm">Products</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your product in own store
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>
            <ProductShell  data={[]}/>
            <Link href="/admin/product/create">New Product</Link>
        </Shell>
    )
}
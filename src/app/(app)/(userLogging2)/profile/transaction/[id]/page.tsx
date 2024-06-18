import {userOrderData} from "@/lib/contants";
import {Shell} from "@/components/shell";
import {clsx} from "clsx";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {BackLink} from "@/components/back-link";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {CancelOrderShell} from "../_components/cancel-order-shell"



interface Params {
    params: { id: string }
}

export default function UserOrderDetailPage ({params}: Params) {
    const selectedOrder = userOrderData.find((i) => i.id === params.id);
    console.log("selectedOrder", selectedOrder);
    if(selectedOrder) return (
        <Shell variant="sidebar">

            <div className="space-y-3">
                <div className="flex justify-between items-center gap-3">
                    <div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Order #{selectedOrder.code}
                        </h4>
                        <small
                            className="text-sm font-medium leading-none text-gray-400">{selectedOrder.orderDate}</small>
                    </div>
                    <div>
                        <BackLink href="/profile/transaction" />
                    </div>
                </div>
                <div className="">
                    <div className="grid grid-cols-5 gap-8">
                        <div className={clsx( {
                            "block col-span-12": selectedOrder.status === "CANCELLED",
                            "hidden": selectedOrder.status  !== "CANCELLED"
                        })}>
                            <Alert variant="destructive" className="w-auto max-w-screen-sm">
                                <AlertTitle>Order canceled on {selectedOrder.cancelDate} </AlertTitle>
                                <AlertDescription>
                                    Reason: {selectedOrder.cancelReason}
                                </AlertDescription>
                            </Alert>
                        </div>

                        <div className="col-span-3">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedOrder.products.map((product, index) => (
                                        <TableRow key={product._id}>
                                            <TableCell className="font-medium">
                                                <Link className="text-primary" href={"/products/"}>{product.name}</Link>
                                            </TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell className="text-right">{product.totalPrice}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={3}>Temp price</TableCell>
                                        <TableCell className="text-right">{selectedOrder.temp_price}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3}>Shipping fee</TableCell>
                                        <TableCell className="text-right">{selectedOrder.shipping_fee}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={3}>Total</TableCell>
                                        <TableCell className="text-right">{selectedOrder.total_price}</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>

                        <div className="col-span-2 [&>p]:leading-loose">

                            <div className="space-y-12">
                                <div className="[&>p]:leading-loose">
                                    <div className="text-lg font-semibold text-inner__line mb-3">Order status</div>
                                    <p><span
                                        className="font-semibold">Payment status</span>: {selectedOrder.paymentStatus}
                                    </p>
                                    <p><span
                                        className="font-semibold">Fulfillment status</span>: {selectedOrder.fulfillmentStatus}
                                    </p>
                                    <p><span
                                        className="font-semibold">Order status</span>: {selectedOrder.status}
                                    </p>
                                </div>

                                <div className="[&>p]:leading-loose">
                                    <div className="text-lg font-semibold text-inner__line mb-3">Shipping Info</div>
                                    <p>{selectedOrder.user_shipping.name}</p>
                                    <p>{selectedOrder.user_shipping.phone}</p>
                                    <p>{selectedOrder.user_shipping.address}</p>
                                </div>

                                <div className={clsx({
                                    "block": selectedOrder.status === "PENDING",
                                    "hidden": selectedOrder.status !== "PENDING",
                                })}>
                                    <CancelOrderShell/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Shell>
    )
}
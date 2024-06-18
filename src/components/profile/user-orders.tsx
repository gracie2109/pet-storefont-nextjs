
import {userOrderData} from "@/lib/contants"
import {Shell} from "@/components/shell";
import {UserTransactionHistoryShell} from "@/components/shells/user-transaction-history-shell";
export function UserOrders () {

    return (
        <Shell variant="sidebar">
            <UserTransactionHistoryShell data={userOrderData} />
        </Shell>
    )
}



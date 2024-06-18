
import {UserTransactionHistoryShell} from "@/components/shells/user-transaction-history-shell";
import {userOrderData} from "@/lib/contants";

export default function UserOrderPage () {
   return <UserTransactionHistoryShell data={userOrderData} />
}
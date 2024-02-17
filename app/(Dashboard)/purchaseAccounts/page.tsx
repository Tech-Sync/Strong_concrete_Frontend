import Link from "next/link";
import { getAllPurchaseAccounts } from "@/actions/purchaseAccountActions";
import PurchaseAccountsTable from "./PurchaseAccountsTable";

const PurchaseAccountsPage = async () => {
  const purchaseAccounts = await getAllPurchaseAccounts();
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Purchase Accounts</span>
        </li>
      </ul>
      <PurchaseAccountsTable purchaseAccounts={purchaseAccounts.data} />
    </div>
  );
};

export default PurchaseAccountsPage;

import Link from "next/link";
import { getAllPurchases } from "@/actions/purchaseActions";
import PurchaseTable from "./PurchaseTable";

const PurchasesPage = async () => {
  const purchases = await getAllPurchases();
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Purchases</span>
        </li>
      </ul>
      <PurchaseTable purchases={purchases.data} />
    </div>
  );
};

export default PurchasesPage;

import Link from "next/link";
import PurchaseTable from "@/app/components/purchases/PurchaseTable";


const PurchasesPage = async () => {
  return (
    <div className="flex flex-col space-y-5">
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
      <PurchaseTable />
    </div>
  );
};

export default PurchasesPage;

import Link from "next/link";
import PurchaseTable from "@/app/(Dashboard)/purchases/_components/PurchaseTable";
import { Metadata } from "next";
import BreadCrumb from "@/app/components/common/BreadCrumb";

export const metadata: Metadata = { title: "Purchases", description: "Purchases"};

const PurchasesPage = async () => {
  return (
    <div className="flex flex-col space-y-5">
       <BreadCrumb />

      <PurchaseTable />
    </div>
  );
};

export default PurchasesPage;

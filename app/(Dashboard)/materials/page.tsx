import { Metadata } from "next";
import Link from "next/link";
import MaterialsTable from "./_components/materialsTable";
import BreadCrumb from "@/app/components/common/BreadCrumb";

export const metadata: Metadata = { title: "Materials", description: "Materials" };

const MaterialsPage = async () => {
  return (
    <div className="flex flex-col space-y-5">
      <BreadCrumb />

      <MaterialsTable />
    </div>
  )
}

export default MaterialsPage
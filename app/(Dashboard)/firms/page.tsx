import FirmTable from "@/app/(Dashboard)/firms/_components/FirmTable";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = { title: "Firms", description: "Firms" };

const FirmPage = async () => {
  return (
    <div className="flex flex-col space-y-5">
      <BreadCrumb />

      <FirmTable />
    </div>
  );
};

export default FirmPage;

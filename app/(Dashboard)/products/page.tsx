import FirmTable from "@/app/(Dashboard)/firms/_components/FirmTable";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ProductTable from "./_components/ProductTable";
import BreadCrumb from "@/app/components/common/BreadCrumb";

export const metadata: Metadata = { title: "Products", description: "Products" };

const ProductPage = async () => {
  return (
    <div className="flex flex-col space-y-5">
      <BreadCrumb />

      <ProductTable />
    </div>
  );
};

export default ProductPage
  ;

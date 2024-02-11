import { getAllFirms } from "@/actions/firmActions";
import FirmTable from "@/app/components/firms/FirmTable";
import Link from "next/link";
import React from "react";

const FirmPage = async () => {
  return (
    <div className="flex flex-col space-y-5">
      <ul className="flex space-x-2 rtl:space-x-reverse ">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Firms</span>
        </li>
      </ul>
      <FirmTable />
    </div>
  );
};

export default FirmPage;

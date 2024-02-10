import { DeleteIcon, PlusIcon } from "@/app/icons";
import Link from "next/link";
import React from "react";

interface FirmHeaderBtnsProps {
  deleteRow: (id?: any) => Promise<void>; // Adjust the type as necessary
}

export default function FirmHeaderBtns({ deleteRow }: FirmHeaderBtnsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="btn btn-danger gap-2"
        onClick={() => deleteRow()}
      >
        <DeleteIcon />
        Delete
      </button>
      <Link href="" className="btn btn-primary gap-2">
        <PlusIcon />
        Add New
      </Link>
    </div>
  );
}

import { DeleteIcon } from "@/app/icons";
import React from "react";
import FirmModal from "./FirmModal";

interface FirmHeaderBtnsProps {
  deleteRow: (id?: any) => Promise<void>;
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
      <FirmModal />
    </div>
  );
}

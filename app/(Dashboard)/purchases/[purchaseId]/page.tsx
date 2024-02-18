/* eslint-disable @next/next/no-img-element */
"use client";
import { EditIcon, PlusIcon } from "@/app/icons";
import DownloadIcon from "@/app/icons/tableIcons/DownloadIcon";
import PrintIcon from "@/app/icons/tableIcons/PrintIcon";
import SendInvoiceIcon from "@/app/icons/tableIcons/SendInvoiceIcon";
import { readPurchase } from "@/lib/redux/slices/purchaseSlice/purchaseActions";
import { Purchase } from "@/types/types";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { useEffect, useState } from "react";

const Preview = ({ params }: { params: { purchaseId: string } }) => {
  const [purchase, setPurchase] = useState<Partial<Purchase>>({})

  useEffect(() => {

    (async () => {
      const data = await readPurchase(params.purchaseId)
      setPurchase(data)
    })()

  }, [])



  const exportTable = () => {
    window.print();
  };

  const columns = [
    {
      key: "MaterialName",
      label: "ITEM",
    },
    {
      key: "quantity",
      label: "QTY",
    },
    {
      key: "unitType",
      label: "UNIT TYPE",
    },
    {
      key: "unitPrice",
      label: "PRICE",
      class: "ltr:text-right rtl:text-left",
    },
    {
      key: "totalPrice",
      label: "AMOUNT",
      class: "ltr:text-right rtl:text-left",
    },
  ];
  function downloadFile() {
    const fileUrl = "http://localhost:3000/purchases/preview";

    const link = document.createElement("a");
    link.href = fileUrl;
    const fileName = "file.pdf";

    if (fileName) {
      link.setAttribute("download", fileName);
    }

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
        <button
          type="button"
          className="btn btn-info gap-2"
          onClick={() => (window.location.href = "mailto:destek@example.com")}
        >
          <SendInvoiceIcon />
          Send Invoice
        </button>

        <button
          type="button"
          className="btn btn-primary gap-2"
          onClick={() => exportTable()}
        >
          <PrintIcon />
          Print
        </button>

        <button
          type="button"
          className="btn btn-success gap-2"
          onClick={downloadFile}
        >
          <DownloadIcon />
          Download
        </button>

        <Link href="/purchases/add" className="btn btn-secondary gap-2">
          <PlusIcon />
          Create
        </Link>

        <Link href="/purchases/edit" className="btn btn-warning gap-2">
          <EditIcon />
          Edit
        </Link>
      </div>
      <div className="panel">
        <div className="flex flex-wrap justify-between gap-4 px-4">
          <div className="text-2xl font-semibold uppercase">Invoice</div>
          <div className="shrink-0">
            <img
              src="/assets/images/logo.svg"
              alt="img"
              className="w-14 ltr:ml-auto rtl:mr-auto"
            />
          </div>
        </div>
        <div className="px-4 ltr:text-right rtl:text-left">
          <div className="mt-6 space-y-1 text-white-dark">
            <div>Mungwi, Lusaka west Mungwi road Lusaka ZM, 10101</div>
            <div>strong-concrete@gmail.com</div>
            <div>+260 (97) 123-4567</div>
          </div>
        </div>

        <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
        <div className="flex flex-col flex-wrap justify-between gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="space-y-1 text-white-dark">
              <div>Issue For:</div>
              <div className="font-semibold text-black dark:text-white">
                {purchase.Firm?.name}
              </div>
              <div>{purchase.Firm?.address}</div>
              <div>{purchase.Firm?.email}</div>
              <div>{purchase.Firm?.phoneNo}</div>
            </div>
          </div>
          <div className="xl:1/3 sm:w-1/2 lg:w-1/5">
              <div className="mb-2 flex w-full items-center justify-start gap-x-6">
                <div className="text-white-dark">Issue Date :</div>
                <div>{formatDate(purchase.createdAt)}</div>
              </div>
              <div className="mb-2 flex w-full items-center justify-start gap-x-6">
                <div className="text-white-dark">Purhcase ID :</div>
                <div>#SC-{purchase.id}</div>
              </div>
          </div>
        </div>
        <div className="table-responsive mt-6">
          <table className="table-striped">
            <thead>
              <tr>
                {columns.map((column) => {
                  return (
                    <th key={column.key} className={column?.class}>
                      {column.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{purchase.Material?.name}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.Material?.unitType}</td>
                <td className="ltr:text-right rtl:text-left">
                  K {purchase.unitPrice}
                </td>
                <td className="ltr:text-right rtl:text-left">
                  K {purchase.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid grid-cols-1 px-4 sm:grid-cols-2">
          <div></div>
          <div className="space-y-2 ltr:text-right rtl:text-left">
            <div className="flex items-center text-lg font-semibold">
              <div className="flex-1">Grand Total</div>
              <div className="w-[37%]">K {purchase.totalPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

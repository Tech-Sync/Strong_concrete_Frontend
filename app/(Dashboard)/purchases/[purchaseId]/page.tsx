/* eslint-disable @next/next/no-img-element */
"use client";
import { EditIcon, PlusIcon } from "@/app/icons";
import DownloadIcon from "@/app/icons/tableIcons/DownloadIcon";
import PrintIcon from "@/app/icons/tableIcons/PrintIcon";
import SendInvoiceIcon from "@/app/icons/tableIcons/SendInvoiceIcon";
import Link from "next/link";

const Preview = ({ params }: { params: { purchaseId: string } }) => {
  console.log(params);

  const exportTable = () => {
    window.print();
  };

  const items = [
    {
      id: 1,
      MaterialId: 1,
      quantity: 2000,
      unitPrice: 250,
      totalPrice: 500000,
      FirmId: 2,
      unitType:'Tone',
      createdAt: "2024-02-10T08:07:15.263Z",
      updatedAt: "2024-02-14T10:13:47.487Z",
      deletedAt: null,
      creatorId: 1,
      updaterId: 1,
    },
    {
      id: 2,
      MaterialId: 1,
      quantity: 2000,
      unitPrice: 250,
      totalPrice: 500000,
      unitType:'Kg',
      FirmId: 2,
      createdAt: "2024-02-10T08:07:15.263Z",
      updatedAt: "2024-02-14T10:13:47.487Z",
      deletedAt: null,
      creatorId: 1,
      updaterId: 1,
    },
  ];

  const columns = [
    {
      key: "id",
      label: "S.NO",
    },
    {
      key: "FirmId",
      label: "FIRM",
    },
    {
      key: "MaterialId",
      label: "ITEMS",
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
            <div>13 Tetrick Road, Cypress Gardens, Florida, 33884, US</div>
            <div>vristo@gmail.com</div>
            <div>+1 (070) 123-4567</div>
          </div>
        </div>

        <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
        <div className="flex flex-col flex-wrap justify-between gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="space-y-1 text-white-dark">
              <div>Issue For:</div>
              <div className="font-semibold text-black dark:text-white">
                John Doe
              </div>
              <div>405 Mulberry Rd. Mc Grady, NC, 28649</div>
              <div>redq@company.com</div>
              <div>(128) 666 070</div>
            </div>
          </div>
          <div className="xl:1/3 sm:w-1/2 lg:w-2/5">
            <div className="mb-2 flex w-full items-center justify-end gap-x-6">
              <div className="text-white-dark">Issue Date :</div>
              <div>13 Sep 2022</div>
            </div>
            <div className="mb-2 flex w-full items-center justify-end gap-x-6">
              <div className="text-white-dark">Purhcase ID :</div>
              <div>#OD-85794</div>
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
              {items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.FirmId}</td>
                    <td>{item.MaterialId}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitType}</td>
                    <td className="ltr:text-right rtl:text-left">
                      ${item.unitPrice}
                    </td>
                    <td className="ltr:text-right rtl:text-left">
                      ${item.totalPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid grid-cols-1 px-4 sm:grid-cols-2">
          <div></div>
          <div className="space-y-2 ltr:text-right rtl:text-left">
            <div className="flex items-center">
              <div className="flex-1">Subtotal</div>
              <div className="w-[37%]">$3255</div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">Tax</div>
              <div className="w-[37%]">$700</div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">Shipping Rate</div>
              <div className="w-[37%]">$0</div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">Discount</div>
              <div className="w-[37%]">$10</div>
            </div>
            <div className="flex items-center text-lg font-semibold">
              <div className="flex-1">Grand Total</div>
              <div className="w-[37%]">$3945</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

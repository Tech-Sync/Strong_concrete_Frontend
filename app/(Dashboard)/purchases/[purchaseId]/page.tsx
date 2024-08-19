import ActionBtnGroup from "@/app/components/purchases/preview/ActionBtnGroup";
import { readPurchase } from "@/lib/redux/slices/purchaseSlice/purchaseActions";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

export async function generateMetadata({ params }: { params: { purchaseId: string } }) {
  const purchase = await readPurchase(params.purchaseId)

  if (!purchase.Firm?.name) {
    return { title: 'Purchase Not Found' }
  }
  return {
    title: purchase.Firm?.name,
    description: `This is the Purchase page of ${purchase.Firm?.name}`
  }
}

const Preview = async ({ params }: { params: { purchaseId: string } }) => {

  const purchase = await readPurchase(params.purchaseId)

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

  return (
    <div>
      <ActionBtnGroup sale={purchase} />
      <div className="panel printBody">
        <div className="flex flex-wrap justify-between gap-4 px-4">
          <div className="text-2xl font-semibold uppercase">Purchase</div>
          <div className="shrink-0">
            <Image
              width={56}
              height={56}
              src="/assets/images/logo.png"
              alt="img"
              className="ltr:ml-auto rtl:mr-auto"
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
                {columns?.map((column) => {
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

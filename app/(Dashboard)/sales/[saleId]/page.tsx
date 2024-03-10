/* eslint-disable @next/next/no-img-element */
import ActionBtnGroup from '@/app/components/purchases/preview/ActionBtnGroup';
import { saleStatuses } from '@/app/constraints/roles&status';
import { readSale } from '@/lib/redux/slices/saleSlice/saleActions';
import { formatDate } from '@/utils/formatDate';
import React from 'react'

const SalePage = async ({ params }: { params: { saleId: string } }) => {
    const sale = await readSale(params.saleId)


    const columns = [
        {
            key: "Firm",
            label: "FIRM",
        },
        {
            key: "Product",
            label: "PRODUCT",
        },
        {
            key: "orderDate",
            label: "ORDER DATE",
        },
        {
            key: "location",
            label: "LOCATION",
        },
        {
            key: "status",
            label: "STATUS",
        },
        {
            key: "quantity",
            label: "QTY",
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

    enum Status {
        Status1 = 1,
        Status2,
        Status3,
        Status4,
    }

    type BadgeClassMappings = { [key in Status]?: string; };


    const statusTextClasses: BadgeClassMappings = {
        [Status.Status1]: 'text-secondary',
        [Status.Status2]: 'text-success',
        [Status.Status3]: 'text-danger',
        [Status.Status4]: 'text-warning',
    };

    return (
        <div>
            <ActionBtnGroup />
            <div className="panel">
                <div className="flex flex-wrap justify-between gap-4 px-4">
                    <div className="text-2xl font-semibold uppercase">Sale</div>
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
                                {sale.Firm?.name}
                            </div>
                            <div>{sale.Firm?.address}</div>
                            <div>{sale.Firm?.email}</div>
                            <div>{sale.Firm?.phoneNo}</div>
                        </div>
                    </div>
                    <div className="xl:1/3 sm:w-1/2 lg:w-1/5">
                        <div className="mb-2 flex w-full items-center justify-start gap-x-6">
                            <div className="text-white-dark">Issue Date :</div>
                            <div>{formatDate(sale.createdAt)}</div>
                        </div>
                        <div className="mb-2 flex w-full items-center justify-start gap-x-6">
                            <div className="text-white-dark">Purhcase ID :</div>
                            <div>#SC-{sale.id}</div>
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
                                <td>{sale.Firm?.name}</td>
                                <td>{sale.Product?.name}</td>
                                <td>{sale.orderDate}</td>
                                <td>{sale.location}</td>
                              {/*   @ts-ignore */}
                                <td className={`${statusTextClasses[sale.status]}`}>
                                    {saleStatuses[sale.status.toString()]}
                                </td>
                                <td>{sale.quantity}</td>
                                <td className="ltr:text-right rtl:text-left">
                                    K {sale.unitPrice}
                                </td>
                                <td className="ltr:text-right rtl:text-left">
                                    K {sale.totalPrice}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 grid grid-cols-1 px-4 sm:grid-cols-2">
                    <div></div>
                    <div className="space-y-2 ltr:text-right rtl:text-left">
                        {/*    <div className="flex items-center">
                            <div className="flex-1">Subtotal</div>
                            <div className="w-[37%]">$3255</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Tax</div>
                            <div className="w-[37%]">$700</div>
                        </div> */}
                        <div className="flex items-center">
                            <div className="flex-1">Other Charges</div>
                            <div className="w-[37%]">${sale.otherCharges}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1">Discount</div>
                            <div className="w-[37%]">${sale.discount}</div>
                        </div>
                        <div className="flex items-center text-lg font-semibold">
                            <div className="flex-1">Grand Total</div>
                            <div className="w-[37%]">${sale.totalPrice}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalePage
"use client";
import Link from "next/link";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { DeleteIcon, EditIcon, PlusIcon, PreviewIcon } from "@/app/icons";
import { formatDate } from "@/utils/helperFunctions";
import { coloredToast } from "@/utils/sweetAlerts";
import useDeleteToasts from "@/hooks/useDeleteToasts";
import { useRouter } from "next/navigation";
import { saleStatuses } from "@/app/constraints/roles&status";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllSaleAsync, selectSales, updateSales, updateSaleState } from "@/lib/features/sale/saleSlice";
import { selectIsDarkMode } from "@/lib/features/themeConfig/themeConfigSlice";
import { deleteMultiSale, deleteSale } from "@/lib/features/sale/saleActions";


export default function SaleTable() {

    const dispatch = useAppDispatch();
    const router = useRouter()
    const { deleteToast, multiDeleteToast } = useDeleteToasts();
    const sales = useAppSelector(selectSales);
    const isDark = useAppSelector(selectIsDarkMode);

    useEffect(() => {
        dispatch(getAllSaleAsync({}));
        dispatch(updateSaleState(null))
    }, []);


    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(sales, "id"));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState("");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "id",
        direction: "asc",
    });

    useEffect(() => {
        setRecords(sales);
        setInitialRecords(sales);
    }, [sales]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...(Array.isArray(initialRecords) ? initialRecords.slice(from, to) : [])]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        if (sales) {
            setInitialRecords(() => {
                return sales?.filter((sale) => {
                    const firmName = sale?.Firm?.name;
                    const productName = sale.Product?.name;
                    const quantity = sale.quantity.toString();
                    const unitPrice = sale.unitPrice.toString();
                    const totalPrice = sale.totalPrice.toString();

                    return (
                        (productName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
                        (firmName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
                        (quantity?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
                        (sale.location?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
                        (totalPrice.toLowerCase().includes(search.toLowerCase()) ?? false) ||
                        (sale.requestedDate.toLowerCase().includes(search.toLowerCase()) ?? false) ||
                        (sale.sideContact.toLowerCase().includes(search.toLowerCase()) ?? false) ||
                        // (sale.orderDate?.toDateString().toLowerCase().includes(search.toLowerCase()) ?? false) ||c20
                        (unitPrice?.toLowerCase().includes(search.toLowerCase()) ?? false)
                    );
                });
            });
        }
    }, [sales, search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data2.reverse() : data2);
        setPage(1);
    }, [initialRecords, sortStatus]);

    const deleteRow = async (id: any = null) => {
        if (id) {
            const deletionSuccess = await deleteToast(id, deleteSale, updateSales);
            if (deletionSuccess) {
                setSelectedRecords([]);
                setSearch("");
            }
        } else {
            let selectedRows = selectedRecords || [];
            if (selectedRows?.length === 0) {
                coloredToast("warning", "Select items to delete!");
                return;
            }
            const ids = selectedRows?.map((d: any) => { return d.id; });
            const deletionSuccess = await multiDeleteToast(ids, deleteMultiSale, updateSales);
            if (deletionSuccess) {
                setSelectedRecords([]);
                setSearch("");
                setPage(1);
            }
        }
    };

    enum Status {
        Status1 = 1,
        Status2,
        Status3,
        Status4,
    }

    type BadgeClassMappings = { [key in Status]?: string; };

    const statusBadgeClasses: BadgeClassMappings = {
        [Status.Status1]: 'badge-outline-secondary',
        [Status.Status2]: 'badge-outline-success',
        [Status.Status3]: 'badge-outline-danger',
        [Status.Status4]: 'badge-outline-warning',
    };

    return (
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="btn btn-danger gap-2"
                            onClick={() => deleteRow()}
                        >
                            <DeleteIcon />
                            Delete
                        </button>
                        <button onClick={() => { router.push(`/sales/add`), dispatch(updateSaleState(null)) }} className="btn btn-primary gap-2">
                            <PlusIcon />
                            Add New
                        </button>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="datatables pagination-padding">
                    <DataTable
                        className={`${isDark} table-hover whitespace-nowrap`}
                        records={records?.map((sale, index) => ({
                            ...sale,
                            serialNumber: index + 1,
                        }))}
                        columns={[
                            {
                                accessor: "Id",
                                sortable: true,
                                render: ({ serialNumber }) => (
                                    <div className="font-semibold text-primary underline hover:no-underline">
                                        {`#${serialNumber}`}
                                    </div>
                                ),
                            },
                            {
                                accessor: "Firm",
                                sortable: true,
                                render: ({ Firm, id }) => (
                                    <div className="flex items-center font-semibold">
                                        <div className={Firm?.name ? "" : "text-red-800"}>{Firm?.name ?? 'Data Deleted'}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: "Product",
                                sortable: true,
                                render: ({ Product, id }) => (
                                    <div className="flex items-center justify-center ">
                                        <div className={Product?.name ? "" : "text-red-800"}>{Product?.name ?? 'Data Deleted'}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: "requestedDate",
                                sortable: true,
                            },
                            {
                                accessor: "Confirm Date",
                                sortable: true,
                                render: ({ orderDate, id, status }) => (
                                    <div className="flex items-center">
                                        <div className={orderDate ? "" : "text-gray-800"}>{orderDate ? orderDate.toString() : 'Not confirmed yet'}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: "quantity",
                                sortable: true,
                                render: ({ quantity, id }) => (
                                    <div className="flex justify-center font-semibold">
                                        <div>{quantity}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: "unitPrice",
                                sortable: true,
                            },
                            {
                                accessor: "totalPrice",
                                sortable: true,
                                render: ({ totalPrice, id }) => (
                                    <div className="flex items-center font-semibold">
                                        <div>{totalPrice}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: "createdAt",
                                sortable: true,
                                titleClassName: "text-left",
                                render: ({ createdAt, id }) => (
                                    <div>{formatDate(createdAt)}</div>
                                ),
                            },
                            {
                                accessor: "status",
                                sortable: true,
                                render: ({ status }) => (
                                    //@ts-ignore
                                    <span className={`badge ${statusBadgeClasses[status]}`}>
                                        {saleStatuses[status.toString()]}
                                    </span>
                                ),
                            },
                            {
                                accessor: "action",
                                title: "Actions",
                                sortable: false,
                                textAlignment: "center",
                                render: (sale) => (
                                    <div className="mx-auto flex w-max items-center gap-4">
                                        <button
                                            onClick={() => {
                                                router.push(`/sales/add`)
                                                dispatch(updateSaleState(sale))
                                            }}
                                            className="flex hover:text-info"
                                        >
                                            <EditIcon />
                                        </button>
                                        <Link
                                            href={`/sales/${sale.id}`}
                                            className="flex hover:text-primary"
                                        >
                                            <PreviewIcon />
                                        </Link>
                                        <button
                                            type="button"
                                            className="flex hover:text-danger"
                                            onClick={(e) => deleteRow(sale.id)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover={true}
                        totalRecords={initialRecords?.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        paginationText={({ from, to, totalRecords }) =>
                            `Showing  ${from} to ${to} of ${totalRecords} entries`
                        }
                    />
                </div>
            </div>
        </div>
    );
}

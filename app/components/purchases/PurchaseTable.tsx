"use client";
import Link from "next/link";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { useSelector } from "react-redux";
import { Purchase } from "@/types/types";
import { DeleteIcon, EditIcon, PlusIcon, PreviewIcon } from "@/app/icons";
import { formatDate } from "@/utils/formatDate";
import { coloredToast } from "@/lib/sweetAlerts";
import { getAllPurchaseAsync, updatePurchaseState, selectIsDarkMode, selectPurchases, updatePurchases, useDispatch } from "@/lib/redux";
import useDeleteToasts from "@/hooks/useDeleteToasts";
import { deleteMultiPurchase, deletePurchase } from "@/lib/redux/slices/purchaseSlice/purchaseActions";
import { useRouter } from "next/navigation";



export default function PurchaseTable() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { deleteToast, multiDeleteToast } = useDeleteToasts();
  const purchases = useSelector(selectPurchases);
  const isDark = useSelector(selectIsDarkMode);

  useEffect(() => {
    dispatch(getAllPurchaseAsync());
    dispatch(updatePurchaseState(null))
  }, []);


  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(purchases, "id"));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });


  useEffect(() => {
    setRecords(purchases);
    setInitialRecords(purchases);
  }, [purchases]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    if (purchases) {
      setInitialRecords(() => {
        return purchases.filter((purchase) => {
          const materialName = purchase?.Material?.name;
          const firmName = purchase.Firm?.name;
          const createdAt = purchase.createdAt;

          return (
            (materialName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
            (firmName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
            createdAt.toLowerCase().includes(search.toLowerCase())
          );
        });
      });
    }
  }, [purchases, search]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data2.reverse() : data2);
    setPage(1);
  }, [initialRecords, sortStatus]);

  const deleteRow = async (id: any = null) => {
    if (id) {
      const deletionSuccess = await deleteToast(id, deletePurchase, updatePurchases);
      if (deletionSuccess) {
        setSelectedRecords([]);
        setSearch("");
      }
    } else {
      let selectedRows = selectedRecords || [];
      if (selectedRows.length === 0) {
        coloredToast("warning", "Select items to delete!");
        return;
      }
      const ids = selectedRows.map((d: any) => { return d.id; });
      const deletionSuccess = await multiDeleteToast(ids, deleteMultiPurchase, updatePurchases);
      if (deletionSuccess) {
        setSelectedRecords([]);
        setSearch("");
        setPage(1);
      }
    }
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
            <Link href="/purchases/add" className="btn btn-primary gap-2">
              <PlusIcon />
              Add New
            </Link>
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
            records={records?.map((purchase) => ({ ...purchase }))}
            columns={[
              {
                accessor: "id",
                sortable: true,
                render: ({ id }) => (
                  <div className="font-semibold text-primary underline hover:no-underline">{`#${id}`}</div>
                ),
              },
              {
                accessor: "Firm",
                sortable: true,
                render: ({ Firm, id }) => (
                  <div className="flex items-center font-semibold">
                    <div className={Firm.name ? "" : "text-red-800"}>{Firm.name ?? 'Data Deleted'}</div>
                  </div>
                ),
              },
              {
                accessor: "purchase",
                sortable: true,
                render: ({ Material, id }) => (
                  <div className="flex items-center">
                    <div className={Material.name ? "" : "text-red-800"}>{Material.name ?? 'Data Deleted'}</div>
                  </div>
                ),
              },
              {
                accessor: "quantity",
                sortable: true,
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
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: (purchase) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    <button
                      onClick={() => {
                        router.push(`/purchases/add`)
                        dispatch(updatePurchaseState(purchase))
                      }}
                      className="flex hover:text-info"
                    >
                      <EditIcon />
                    </button>
                    <Link
                      href={`/purchases/${purchase.id}`}
                      className="flex hover:text-primary"
                    >
                      <PreviewIcon />
                    </Link>
                    <button
                      type="button"
                      className="flex hover:text-danger"
                      onClick={(e) => deleteRow(purchase.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ),
              },
            ]}
            highlightOnHover={true}
            totalRecords={initialRecords.length}
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

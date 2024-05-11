"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { DeleteIcon, EditIcon, PlusIcon } from "@/app/icons";
import { formatDate } from "@/utils/formatDate";
import { productionStatuses } from "@/app/constraints/roles&status";
import { coloredToast } from "@/lib/sweetAlerts";
import { getAllProductionAsync, selectIsDarkMode, useDispatch, useSelector, updateProduction, setProductionModal, updateProductionState, selectproductions, } from "@/lib/redux";
import ProductionModal from "./ProductionModal";
import useDeleteToasts from "@/hooks/useDeleteToasts";
import { deleteMultiProduction, deleteProduction } from "@/lib/redux/slices/productionSlice/productionActions";

export default function ProductionTable() {
  const dispatch = useDispatch();
  const { deleteToast, multiDeleteToast } = useDeleteToasts();
  const productions = useSelector(selectproductions);
  const isDark = useSelector(selectIsDarkMode);
  console.log('productions table-->',productions);

  useEffect(() => {
    dispatch(getAllProductionAsync());
  }, []);

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 40, 50];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(productions, "id"));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: "id", direction: "asc" });

  useEffect(() => {
    setRecords(productions);
    setInitialRecords(productions);
  }, [productions]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...(Array.isArray(initialRecords) ? initialRecords.slice(from, to) : [])]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return productions?.filter((production) => {
        return (
          production.Sale?.Product?.name.toLowerCase().includes(search.toLowerCase()) ||
          production.Sale?.orderDate.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [productions, search]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data2.reverse() : data2);
    setPage(1);
  }, [initialRecords, sortStatus]);

  const deleteRow = async (id: any = null) => {
    if (id) {
      const deletionSuccess = await deleteToast(id, deleteProduction, updateProduction);
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
      const ids = selectedRows?.map((d: any) => {
        return d.id;
      });
      const deletionSuccess = await multiDeleteToast(ids, deleteMultiProduction, updateProduction);
      if (deletionSuccess) {
        setSelectedRecords([]);
        setSearch("");
        setPage(1);
      }
    }
  };

  const defaultParams = {
    name: "",
    address: "",
    phoneNo: "",
    tpinNo: "",
    email: "",
    status: "",
  };



  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
      <div className="invoice-table">
        <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-danger gap-2"
              onClick={() => deleteRow()}>
              <DeleteIcon />
              Delete
            </button>
            {/*   <button onClick={() => { dispatch(setProductionModal(true)), dispatch(updateProductionState(defaultParams)) }} className="btn btn-primary gap-2">
              <PlusIcon />
              Add New
            </button> */}
            <ProductionModal />
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
            records={records?.map((item, index) => ({
              ...item,
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
                accessor: "name",
                sortable: true,
                render: ({ Sale, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{Sale.Product.name}</div>
                  </div>
                ),
              },
              {
                accessor: "quantity",
                sortable: true,
                render: ({ Sale, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{Sale.quantity}</div>
                  </div>
                ),
              },
              {
                accessor: "order date",
                sortable: true,
                render: ({ Sale, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{formatDate(Sale.orderDate)}</div>
                  </div>
                ),
              },
              {
                accessor: "status",
                sortable: true,
                render: ({ status }) => (
                  <span className={`badge badge-outline-secondary`}>
                    {/* @ts-ignore */}
                    {productionStatuses[String(status)]}
                  </span>
                ),
              },
              {
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: (production) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    <button
                      onClick={() => {
                        dispatch(updateProductionState(production)),
                          dispatch(setProductionModal(true))
                      }}
                      className="flex hover:text-info">
                      <EditIcon />
                    </button>
                    {/*     <Link
                      href="/apps/invoice/preview"
                      className="flex hover:text-primary"
                    >
                      <PreviewIcon />
                    </Link> */}
                    <button
                      type="button"
                      className="flex hover:text-danger"
                      onClick={(e) => deleteRow(production.id)}>
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

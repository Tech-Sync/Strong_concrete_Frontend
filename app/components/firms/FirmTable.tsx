"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { DeleteIcon, EditIcon } from "@/app/icons";
import { formatDate } from "@/utils/formatDate";
import { firmStatuses } from "@/app/constraints/roles&status";
import { coloredToast } from "@/lib/sweetAlerts";
import {
  getAllFrimAsync,
  selectFirms,
  selectIsDarkMode,
  selectFirmStatus,
  useDispatch,
  useSelector,
  updateFirm,
} from "@/lib/redux";
import FirmModal from "./FirmModal";
import {
  deleteFirm,
  deleteMultiFirm,
} from "@/lib/redux/slices/firmSlice/firmActions";
import useDeleteToasts from "@/hooks/useDeleteToasts";

export default function FirmTable() {
  const dispatch = useDispatch();
  const { deleteToast, multiDeleteToast } = useDeleteToasts();
  const firms = useSelector(selectFirms);
  const firmStatus = useSelector(selectFirmStatus);
  const isDark = useSelector(selectIsDarkMode);

  useEffect(() => {
    dispatch(getAllFrimAsync());
  }, []);

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 40, 50];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(firms, "id"));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });
  const [modal, setModal] = useState(false);

  //@ts-ignore
  const [firmInitials, setFirmInitials] = useState({
    name: "",
    address: "",
    phoneNo: "",
    tpinNo: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    setRecords(firms);
    setInitialRecords(firms);
  }, [firms]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return firms.filter((firm) => {
        return (
          firm.address.toLowerCase().includes(search.toLowerCase()) ||
          firm.email.toLowerCase().includes(search.toLowerCase()) ||
          firm.name.toLowerCase().includes(search.toLowerCase()) ||
          firm.phoneNo.toLowerCase().includes(search.toLowerCase()) ||
          firm.tpinNo.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [firms, search]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data2.reverse() : data2);
    setPage(1);
  }, [initialRecords, sortStatus]);

  const deleteRow = async (id: any = null) => {
    if (id) {
      const deletionSuccess = await deleteToast(id, deleteFirm, updateFirm);
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
      const ids = selectedRows.map((d: any) => {
        return d.id;
      });
      const deletionSuccess = await multiDeleteToast(ids, deleteMultiFirm, updateFirm);
      if (deletionSuccess) {
        setSelectedRecords([]);
        setSearch("");
        setPage(1);
      }
    }
  };

  /*   if (firmStatus === "loading") {
    return <h1 className="text-lg text-center">LOADING...</h1>;
  } */

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
            <FirmModal
              modal={modal}
              setModal={setModal}
              //@ts-ignore
              firmInitials={firmInitials}
              //@ts-ignore
              setFirmInitials={setFirmInitials}
            />
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
            records={records.map((material, index) => ({
              ...material,
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
                render: ({ name, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{name as string}</div>
                  </div>
                ),
              },
              {
                accessor: "email",
                sortable: true,
              },
              {
                accessor: "phoneNo",
                sortable: true,
              },
              {
                accessor: "tpinNo",
                sortable: true,
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
                  <span className={`badge badge-outline-secondary`}>
                    {/* @ts-ignore */}
                    {firmStatuses[String(status)]}
                  </span>
                ),
              },
              {
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: (firm) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    <button
                      onClick={() => {
                        //@ts-ignore
                        setFirmInitials(firm), setModal(true);
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
                      onClick={(e) => deleteRow(firm.id)}>
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

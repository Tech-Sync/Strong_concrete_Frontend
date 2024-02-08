"use client";
import Link from "next/link";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { useSelector } from "react-redux";
import { selectThemeConfig } from "@/lib/redux/slices/themeConfigSlice";
import { getAllFirms } from "@/actions/firmActions";
import { Firm } from "@/types/types";
import { DeleteIcon, EditIcon, PlusIcon, PreviewIcon } from "@/app/icons";
import { formatDate } from "@/utils/formatDate";
import { rolesAndStatus } from "@/app/constraints/roles&status";
import { deleteToast } from "@/lib/sweetAlerts";

export default function FirmTable() {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [initialRecords, setInitialRecords] = useState(sortBy(firms, "id"));

  useEffect(() => {
    (async () => {
      const firmRes = await getAllFirms();
      setFirms(firmRes.data);
    })();
  }, []);

  useEffect(() => {
    setInitialRecords(sortBy(firms, "id"));
  }, [firms]);

  const isDark = useSelector(selectThemeConfig).isDarkMode;

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });

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
      return firms.filter((material) => {
        return (
          material.address.toLowerCase().includes(search.toLowerCase()) ||
          material.email.toLowerCase().includes(search.toLowerCase()) ||
          material.name.toLowerCase().includes(search.toLowerCase()) ||
          material.phoneNo.toLowerCase().includes(search.toLowerCase()) ||
          material.tpinNo.toLowerCase().includes(search.toLowerCase())
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
      deleteToast(id);
      const firmRes = await getAllFirms();
      setFirms(firmRes.data);
      setRecords(firms.filter((firm) => firm.id !== id));
      setSelectedRecords([]);
      setSearch("");
    } else {
      let selectedRows = selectedRecords || [];
      const ids = selectedRows.map((d: any) => {
        return d.id;
      });
      const result = firms.filter((d) => !ids.includes(d.id as never));
      setRecords(result);
      setInitialRecords(result);
      setSelectedRecords([]);
      setSearch("");
      setPage(1);
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
            <Link href="" className="btn btn-primary gap-2">
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
            records={records.map((material) => ({ ...material }))}
            columns={[
              {
                accessor: "id",
                sortable: true,
                render: ({ id }) => (
                  <div className="font-semibold text-primary underline hover:no-underline">{`#${id}`}</div>
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
                    {rolesAndStatus.firmStatuses[String(status)]}
                  </span>
                ),
              },
              {
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: ({ id }) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    <Link
                      href="/apps/invoice/edit"
                      className="flex hover:text-info"
                    >
                      <EditIcon />
                    </Link>
                    <Link
                      href="/apps/invoice/preview"
                      className="flex hover:text-primary"
                    >
                      <PreviewIcon />
                    </Link>
                    <button
                      type="button"
                      className="flex hover:text-danger"
                      onClick={(e) => deleteRow(id)}
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

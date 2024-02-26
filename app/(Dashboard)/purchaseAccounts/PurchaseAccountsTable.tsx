"use client";
import Link from "next/link";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect, SetStateAction } from "react";
import sortBy from "lodash/sortBy";
import { useSelector } from "react-redux";
import { selectThemeConfig } from "@/lib/redux/slices/themeConfigSlice";
import { PurchaseAccount } from "@/types/types";
import { DeleteIcon, EditIcon } from "@/app/icons";
import { formatDate } from "@/utils/formatDate";
import { coloredToast, deleteToast, updateToast, multiDeleteToast } from "@/lib/sweetAlerts";
import { deleteMultiPurchaseAccount, deletePurchaseAccount, updatePurchaseAccount, getAllPurchaseAccounts } from "@/actions/purchaseAccountActions";

interface PurchaseAccountsTableProps {
  purchaseAccounts: PurchaseAccount[];
}

export default function PurchaseAccountsTable({ purchaseAccounts }: PurchaseAccountsTableProps) {
  /*   useEffect(() => {
    setInitialRecords(sortBy(purchases, "id"));
  }, [purchases]); */
  const [editingRowId, setEditingRowId] = useState<number | null>(null); // Specify the type as 'number | null'
  const [editedData, setEditedData] = useState<PurchaseAccount | {}>({}); // Specify the type as 'PurchaseAccount | {}'

  // Function to handle entering edit mode for a row
  const handleEdit = (id: number) => { // Explicitly specify the type as 'number'
    setEditingRowId(id);
    const editedRow = purchaseAccounts.find(row => row.id === id);
    if (editedRow) {
      setEditedData(editedRow);
    } else {
      setEditedData({}); // Provide an initial empty object as a fallback value
    }
  };



console.log('purchaseAccountTable:',purchaseAccounts);
  const isDark = useSelector(selectThemeConfig).isDarkMode;

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(purchaseAccounts, "id"));
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
      return purchaseAccounts.filter((purchaseAccount) => {
        return (
          // purchase.Material.name.toLowerCase().includes(search.toLowerCase()) ||
          // purchase.Firm.name.toLowerCase().includes(search.toLowerCase()) ||
          purchaseAccount.createdAt.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [purchaseAccounts, search]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data2.reverse() : data2);
    setPage(1);
  }, [initialRecords, sortStatus]);

  const deleteRow = async (id: any = null) => {
    if (id) {
      const deletionSuccess = await deleteToast(id, deletePurchaseAccount );
      if (deletionSuccess) {
        const purchaseAccountRes = await getAllPurchaseAccounts();
        setRecords(purchaseAccountRes.data);
        setInitialRecords(purchaseAccountRes.data);
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
      const deletionSuccess = await multiDeleteToast(
        ids,
        deleteMultiPurchaseAccount
      );
      if (deletionSuccess) {
        const purchaseAccountRes = await getAllPurchaseAccounts();
        setRecords(purchaseAccountRes.data);
        setInitialRecords(purchaseAccountRes.data);
        setSelectedRecords([]);
        setSearch("");
        setPage(1);
      }
    }
  };
  const handleUpdate = async (id: any = null) => {
    try {
      console.log(id, editedData)
      // const updatingSuccess = await updateToast(id, editedData, updatePurchaseAccount);
      const updatingSuccess = await updateToast(id, editedData, updatePurchaseAccount);
      
      if (updatingSuccess) {
        const purchaseAccountRes = await getAllPurchaseAccounts();
        setRecords(purchaseAccountRes.data);
        setInitialRecords(purchaseAccountRes.data);
        setSelectedRecords([]);
        setSearch("");
      }
      
      // Reset edit mode
      setEditingRowId(null);
      setEditedData({});
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };
  const handleCancel = async () => {
    try {
      // Reset edit mode
      setEditingRowId(null);
      setEditedData({});
    } catch (error) {
      console.error('Error cancelling updating row:', error);
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
            {/* <Link href="/apps/invoice/add" className="btn btn-primary gap-2">
              <PlusIcon />
              Add New
            </Link> */}
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
                accessor: "FirmId",
                sortable: true,
                render: ({ FirmId, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                    {!editingRowId || editingRowId !== id ? (
                      <div>{FirmId}</div>
                    ) : (
                      // Show input field if row is being edited
                      <input
                          type="text"
                          value={(editedData as PurchaseAccount).FirmId || ''}
                          onChange={(e) => setEditedData({ ...(editedData as PurchaseAccount), FirmId: e.target.value })}
                          placeholder="FirmId"
                          style={{ backgroundColor: editingRowId === id ? '#f0f0f0' : 'inherit' }}
                        />
                    )}
                  </div>
                ),
              },
              {
                accessor: "PurchaseId",
                sortable: true,
                render: ({ PurchaseId, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                    {!editingRowId || editingRowId !== id ? (
                      <div>{PurchaseId}</div>
                    ) : (
                      // Show input field if row is being edited
                      <input
                          type="text"
                          value={(editedData as PurchaseAccount).PurchaseId || ''}
                          onChange={(e) => setEditedData({ ...(editedData as PurchaseAccount), PurchaseId: e.target.value })}
                          placeholder="PurchaseId"
                          style={{ backgroundColor: editingRowId === id ? '#f0f0f0' : 'inherit' }}
                        />
                    )}
                  </div>
                ),
              },
              {
                accessor: "debit",
                sortable: true,
                render: ({ debit, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                    {!editingRowId || editingRowId !== id ? (
                      <div>{debit}</div>
                    ) : (
                      // Show input field if row is being edited
                      <input
                          type="text"
                          value={(editedData as PurchaseAccount).debit || ''}
                          onChange={(e) => setEditedData({ ...(editedData as PurchaseAccount), debit: e.target.value })}
                          placeholder="debit"
                          style={{ backgroundColor: editingRowId === id ? '#f0f0f0' : 'inherit' }}
                        />
                    )}
                  </div>
                ),
              },
              {
                accessor: "credit",
                sortable: true,
                render: ({ credit, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                    {!editingRowId || editingRowId !== id ? (
                      <div>{credit}</div>
                    ) : (
                      // Show input field if row is being edited
                      <input
                          type="text"
                          value={(editedData as PurchaseAccount).credit || ''}
                          onChange={(e) => setEditedData({ ...(editedData as PurchaseAccount), credit: e.target.value })}
                          placeholder="credit"
                          style={{ backgroundColor: editingRowId === id ? '#f0f0f0' : 'inherit' }}
                        />
                    )}
                  </div>
                ),
              },
              {
                accessor: "balance",
                sortable: true,
                render: ({ balance, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                    {!editingRowId || editingRowId !== id ? (
                      <div>{balance}</div>
                    ) : (
                      // Show input field if row is being edited
                      <input
                          type="text"
                          value={(editedData as PurchaseAccount).balance || ''}
                          onChange={(e) => setEditedData({ ...(editedData as PurchaseAccount), balance: e.target.value })}
                          placeholder="balance"
                          style={{ backgroundColor: editingRowId === id ? '#f0f0f0' : 'inherit' }}
                        />
                    )}
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
                accessor: "updatedAt",
                sortable: true,
                titleClassName: "text-left",
                render: ({ updatedAt, id }) => (
                  <div>{formatDate(updatedAt)}</div>
                ),
              },
              {
                accessor: "updaterId",
                sortable: true,
                render: ({ updaterId, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{updaterId}</div>
                  </div>
                ),
              },
              {
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: ({ id }) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    {/* Show edit button if row is not being edited */}
                    {!editingRowId || editingRowId !== id ? (
                      <>
                          <button
                            type="button"
                            className="flex hover:text-danger"
                            onClick={() => handleEdit(id)} // Call handleEdit function on click
                          >
                            <EditIcon />
                          </button>
                          <button
                          type="button"
                          className="flex hover:text-danger"
                          onClick={(e) => deleteRow(id)}
                        >
                          <DeleteIcon />
                        </button>
                    </>
                    ) : (
                      // Show update and cancel buttons if row is being edited
                      <>
                          <button
                            type="button"
                            className="flex hover:text-danger"
                            onClick={(e) => handleUpdate(id)} // Call handleUpdate function on click
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="flex hover:text-danger"
                            onClick={handleCancel} // Call handleUpdate function on click
                          >
                            Cancel
                          </button>
                      </>
                    )}

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

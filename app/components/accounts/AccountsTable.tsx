"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeConfig } from "@/lib/redux/slices/themeConfigSlice";
import { PurchaseAccount } from "@/types/types";
import { DeleteIcon, EditIcon } from "@/app/icons";
import { formatDate } from "@/utils/formatDate";
import { coloredToast, deleteToast, updateToast, multiDeleteToast } from "@/lib/sweetAlerts";

import { getAllAccountsAsync, selectAccounts } from "@/lib/redux";
import { deleteMultiPurchaseAccount, deletePurchaseAccount, getAllPurchaseAccounts } from "@/lib/redux/slices/accountsSlice/accountsAction";
import AccountModal from "./AccountModal";



const AccountsTable = ()=> {
  const dispatch = useDispatch();
  const accounts = useSelector(selectAccounts);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    //@ts-ignore
    dispatch(getAllAccountsAsync());
}, []);


const handleEdit = (id: any) => {
   console.log('id:',id);
  // setModal(true);
  // const account = accounts.find((account: any) => account.id === id);
  // console.log('account:',account);
  // setAccountsInitials(account);
}

console.log('purchaseAccountTable:',accounts);
  const isDark = useSelector(selectThemeConfig).isDarkMode;

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(accounts, "id"));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });

  const [accountsInitials, setAccountsInitials] = useState({
    Firm: {name: "", id: 0},
    Purchase:{id:0,Material:{name:''}},
    debit: 0,
    credit: 0,
    balance: 0,
    id: 0,
    FirmId:0,
});

useEffect(() => {
  setRecords(accounts);
  setInitialRecords(accounts);
}, [accounts]);


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
      return accounts.filter((account) => {
        return (

          //@ts-ignore
          account.Firm.name.toLowerCase().includes(search.toLowerCase()) ||
         
          account.createdAt.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [accounts, search]);

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
            <AccountModal
                        modal={modal}
                        setModal={setModal}
                        //@ts-ignore
                        accountsInitials={accountsInitials}
                        //@ts-ignore
                        setAccountsInitials={setAccountsInitials}
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
            records={records.map((account) => ({ ...account }))}
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
                    {/* Show original field if row is not being edited */}
               
                      <div>{Firm?.name}</div>
                
                  </div>
                ),
              },
              {
                accessor: "Material",
                sortable: true,
                render: ({ Purchase, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                 
                      <div>{Purchase?.Material?.name}</div>
                
                  </div>
                ),
              },
              {
                accessor: "debit",
                sortable: true,
                render: ({ debit, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                  
                      <div>{debit}</div>
           
                  </div>
                ),
              },
              {
                accessor: "credit",
                sortable: true,
                render: ({ credit, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                  
                      <div>{credit}</div>
             
                  </div>
                ),
              },
              {
                accessor: "balance",
                sortable: true,
                render: ({ balance, id }) => (
                  <div className="flex items-center font-semibold">
                    {/* Show original field if row is not being edited */}
                
                      <div>{balance}</div>
             
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
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: (account) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    {/* Show edit button if row is not being edited */}
                 
                      <>
                          <button
                            type="button"
                            className="flex hover:text-danger"
                            onClick={() => {
                              console.log('account:',account);
                              
                              //@ts-ignore
                              setAccountsInitials(account), setModal(true);
                          }}
                          >
                            <EditIcon />
                          </button>
                          <button
                          type="button"
                          className="flex hover:text-danger"
                          onClick={(e) => deleteRow(account.id)}
                        >
                          <DeleteIcon />
                        </button>
                    </>
          

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
export default AccountsTable;
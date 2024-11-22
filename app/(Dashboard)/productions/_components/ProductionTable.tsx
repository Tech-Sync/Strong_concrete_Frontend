"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { DeleteIcon, EditIcon, PlusIcon } from "@/app/icons";
import { formatDate } from "@/utils/helperFunctions";
import { productionStatuses, vehicleStatuses } from "@/app/constraints/roles&status";
import { coloredToast } from "@/utils/sweetAlerts";
import ProductionModal from "./ProductionModal";
import useDeleteToasts from "@/hooks/useDeleteToasts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllProductionAsync, selectProductions, setProductionModal, updateProduction, updateProductionState } from "@/lib/features/production/productionSlice";
import { selectIsDarkMode } from "@/lib/features/themeConfig/themeConfigSlice";
import { deleteMultiProduction, deleteProduction, updateProductionStatus } from "@/lib/features/production/productionActions";
import Dropdown from "@/app/components/Layout/Dropdown";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductionTable() {
  const dispatch = useAppDispatch();
  const { deleteToast, multiDeleteToast } = useDeleteToasts();
  const productions = useAppSelector(selectProductions);
  const isDark = useAppSelector(selectIsDarkMode);

  const router = useRouter()

  // search params for pagination
  const searchParams = useSearchParams();
  const page = (searchParams.get('page') || 1) as string;
  const limit = (searchParams.get('limit') || 20) as string;

  useEffect(() => {
    dispatch(getAllProductionAsync({ page, limit }));
  }, [page, limit, dispatch]);

  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const PAGE_SIZES = [10, 20, 30, 40, 50];
  const [initialRecords, setInitialRecords] = useState(sortBy(productions.data, "id"));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: "id", direction: "asc" });

  useEffect(() => {
    setRecords(productions.data);
    setInitialRecords(productions.data);
  }, [productions]);

  // useEffect(() => {
  //   setPage(1);
  // }, [pageSize]);

  useEffect(() => {
    // const from = (page - 1) * pageSize;
    // const to = from + pageSize;
    // setRecords([...(Array.isArray(initialRecords) ? initialRecords.slice(from, to) : [])]);

    router.push(`?${new URLSearchParams({ page: page.toString(), limit: limit.toString() })}`, { scroll: false });
    dispatch(getAllProductionAsync({ page, limit }));
  }, [page, limit, router, dispatch]);

  useEffect(() => {
    setInitialRecords(() => {
      return productions?.data.filter((production) => {
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
    // setPage(1);
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
        // setPage(1);
        router.push(`?${new URLSearchParams({ page: '1', limit: limit.toString() })}`, { scroll: false });
      }
    }
  };

  const defaultParams = {
    SaleId: null,
    VehicleIds: null,
    status: null,
  }

  enum Status { Status1, Status2, Status3, Status4, Status5, Status6, Status7 }

  type BadgeClassMappings = { [key in Status]?: string; };

  const statusBadgeClasses: BadgeClassMappings = {
    [Status.Status1]: 'badge-outline-primary',
    [Status.Status2]: 'badge-outline-secondary',
    [Status.Status3]: 'badge-outline-info',
    [Status.Status4]: 'badge-outline-danger',
    [Status.Status5]: 'badge-outline-success',
    [Status.Status6]: 'badge-outline-warning',
    [Status.Status7]: 'badge-outline-dark',
  };



  const vehiclestatusTextClasses = {
    1: 'text-success',
    2: 'text-warning',
    3: 'text-info',
    4: 'text-danger',
    5: 'text-dark',
  };


  const handleStatusChange = async (productionId: number, statusId: number) => {
    const res = await updateProductionStatus(productionId, statusId);
    if (res.message) {
      coloredToast("success", res.message, "bottom-start");
      dispatch(getAllProductionAsync({}));
    } else {
      dispatch(getAllProductionAsync({}));
      coloredToast("danger", res.error, "bottom-start");
    }
  }


  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b] mt-5">
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
            {/* <button onClick={() => { dispatch(setProductionModal(true)), dispatch(updateProductionState(defaultParams)) }} className="btn btn-primary gap-2">
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
                    <div>{Sale?.Product.name}</div>
                  </div>
                ),
              },
              {
                accessor: "quantity",
                sortable: true,
                render: ({ Sale, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{Sale?.quantity}</div>
                  </div>
                ),
              },
              {
                accessor: "Vehicles",
                sortable: true,
                render: (production) => (
                  <div className="flex gap-4 ">
                    {
                      production.VehicleIds && production.VehicleIds.length > 0 ? (
                        production.VehicleIds.map((vehicle, index) => {
                          const { driver, plateNumber, capacity, status } = vehicle;
                          return (
                            <div key={index} className="flex flex-col text-[12px] mb-2 font-sans cursor-pointer transition-all duration-700 hover:scale-110 " onClick={() => { dispatch(setProductionModal(true)), dispatch(updateProductionState(production)) }}>
                              <p >Driver:  {driver.firstName} {driver.lastName}</p>
                              <p >Phone:  {driver.phoneNo}</p>
                              <p >Plate:  {plateNumber}</p>
                              <p >Capacity:  {capacity} tons</p>
                              {/* @ts-ignore */}
                              <span className={` ${vehiclestatusTextClasses[status.toString()]} `}>Status:  {vehicleStatuses[status.toString()]}</span>
                            </div>
                          )
                        })
                      ) : (
                        <div className="flex items-center text-red-500 font-semibold cursor-pointer" onClick={() => { dispatch(setProductionModal(true)), dispatch(updateProductionState(production)) }}>
                          <div>No Vehicle Assigned</div>
                        </div>
                      )
                    }
                  </div>
                ),
              },
              {
                accessor: "order date",
                sortable: true,
                render: ({ Sale, id }) => (
                  <div className="flex items-center ">
                    <div>{formatDate(Sale?.orderDate)}</div>
                  </div>
                ),
              },
              {
                accessor: "status",
                sortable: true,
                render: ({ status, id }) => (
                  <div className="dropdown ">
                    <Dropdown
                      placement='right-start'
                      //@ts-ignore
                      btnClassName={`badge btn-sm ${statusBadgeClasses[status]}`}
                      button={
                        <span >
                          {productionStatuses[status.toString()]}
                        </span>
                      }
                    >
                      <ul className="!min-w-[170px]">
                        {
                          Object.entries(productionStatuses).map(([key, value]) => {
                            return (
                              <li key={key}>
                                <button type="button" onClick={() => handleStatusChange(id, Number(key))}>
                                  {value}
                                </button>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </Dropdown>
                  </div>
                ),
              },
              {
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: (production) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    {/* <button
                      onClick={() => {
                        dispatch(updateProductionState(production)),
                          dispatch(setProductionModal(true))
                      }}
                      className="flex hover:text-info">
                      <EditIcon />
                    </button> */}
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
            totalRecords={productions.details.totalRecords}
            recordsPerPage={Number(limit)}
            page={Number(page)}
            onPageChange={(p) => router.push(`?${new URLSearchParams({ page: p.toString(), limit: limit.toString() })}`, { scroll: false })}
            onRecordsPerPageChange={(ps) => router.push(`?${new URLSearchParams({ page: page.toString(), limit: ps.toString() })}`, { scroll: false })}
            recordsPerPageOptions={PAGE_SIZES}
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

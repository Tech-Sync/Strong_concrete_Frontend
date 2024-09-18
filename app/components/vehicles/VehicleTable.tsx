"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { DeleteIcon, EditIcon } from "@/app/icons";
import { formatDate } from "@/utils/formatDate";
import { vehicleStatuses } from "@/app/constraints/roles&status";
import { coloredToast } from "@/lib/sweetAlerts";
import {
  selectIsDarkMode,
  useDispatch,
  useSelector,
  getAllVehicleAsync,
  selectVehicles,
  updateVehicleState,
} from "@/lib/redux";
import VehicleModal from "./VehicleModal";
import useDeleteToasts from "@/hooks/useDeleteToasts";
import { deleteMultiVehicle, deleteVehicle, updateVehicleStatus } from "@/lib/redux/slices/vehicleSlice/vehicleActions";
import Dropdown from "../Layout/Dropdown";

export default function VehicleTable() {
  const dispatch = useDispatch();
  const { deleteToast, multiDeleteToast } = useDeleteToasts();
  const vehicles = useSelector(selectVehicles);
  const isDark = useSelector(selectIsDarkMode);

  useEffect(() => {
    dispatch(getAllVehicleAsync());
  }, []);

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 40, 50];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(vehicles, "plateNumber"));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });
  const [modal, setModal] = useState(false);

  //@ts-ignore
  const [vehicleInitials, setVehicleInitials] = useState({
    DriverId: '',
    plateNumber: "",
    model: '',
    capacity: '',
    status: 1,
    isPublic: true
  });

  useEffect(() => {
    setRecords(vehicles);
    setInitialRecords(vehicles);
  }, [vehicles]);

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
      return vehicles?.filter((vehicle) => {
        const plateNumber = vehicle.plateNumber.toString()
        const model = vehicle.model.toString()
        const capacity = vehicle.capacity.toString()
        const status = vehicle.status.toString()
        const firstName = vehicle.driver?.firstName
        const lastName = vehicle.driver?.lastName
        return (
          plateNumber.toLowerCase().includes(search.toLowerCase()) ||
          firstName.toLowerCase().includes(search.toLowerCase()) ||
          lastName.toLowerCase().includes(search.toLowerCase()) ||
          model.toLowerCase().includes(search.toLowerCase()) ||
          capacity.toLowerCase().includes(search.toLowerCase()) ||
          status.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [vehicles, search]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data2.reverse() : data2);
    setPage(1);
  }, [initialRecords, sortStatus]);

  const deleteRow = async (id: any = null) => {
    if (id) {
      const deletionSuccess = await deleteToast(id, deleteVehicle, updateVehicleState);
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
      const deletionSuccess = await multiDeleteToast(ids, deleteMultiVehicle, updateVehicleState);
      if (deletionSuccess) {
        setSelectedRecords([]);
        setSearch("");
        setPage(1);
      }
    }
  };

  if (vehicleStatuses.status === 'failed') coloredToast('danger', vehicleStatuses.error || 'Failed to fetch deliveries');

  enum Status {
    Status1 = 1,
    Status2,
    Status3,
    Status4,
    Status5,
  }

  type BadgeClassMappings = { [key in Status]?: string; };

  const statusBadgeClasses: BadgeClassMappings = {
    [Status.Status1]: 'badge-outline-secondary',
    [Status.Status2]: 'badge-outline-success',
    [Status.Status3]: 'badge-outline-danger',
    [Status.Status4]: 'badge-outline-warning',
    [Status.Status5]: 'badge-outline-primary',
  };


  const handleStatusChange = async (productionId: number, statusId: number) => {
    const res = await updateVehicleStatus(productionId, statusId);
    if (res.message) {
      coloredToast("success", res.message, "bottom-start");
      dispatch(getAllVehicleAsync());
    } else {
      // dispatch(getAllVehicleAsync());
      coloredToast("danger", res.error, "bottom-start");
    }
  }
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
            <VehicleModal
              modal={modal}
              setModal={setModal}
              //@ts-ignore
              vehicleInitials={vehicleInitials}
              //@ts-ignore
              setVehicleInitials={setVehicleInitials}
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
            records={records?.map((vehicle, index) => ({
              ...vehicle,
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
                accessor: "Driver Name",
                sortable: true,
                render: ({ driver, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{driver?.firstName + " " + driver?.lastName}</div>
                  </div>
                ),
              },
              {
                accessor: "plateNumber",
                sortable: true,
              },
              {
                accessor: "Condition",
                sortable: true,
                render: ({ isPublic, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{isPublic ? 'Good' : "Fixing"}</div>
                  </div>
                ),
              },
              {
                accessor: "model",
                sortable: true,
              },
              {
                accessor: "capacity",
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
                render: ({ status, id }) => (
                  <div className="dropdown ">
                    <Dropdown
                      placement='left-start'
                      //@ts-ignore
                      btnClassName={`badge btn-sm ${statusBadgeClasses[status]}`}
                      button={
                        <span >
                          {vehicleStatuses[status.toString()]}
                        </span>
                      }
                    >
                      <ul className="!min-w-[170px]">
                        {
                          Object.entries(vehicleStatuses).map(([key, value]) => {
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
                render: (vehicle) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    <button
                      onClick={() => {
                        //@ts-ignore
                        setVehicleInitials(vehicle), setModal(true);
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
                      onClick={(e) => deleteRow(vehicle.id)}>
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

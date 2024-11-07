'use client'
import Link from 'next/link';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { DeleteIcon, EditIcon, PreviewIcon } from '@/app/icons';
import 'flatpickr/dist/flatpickr.css';
import useDeleteToasts from '@/hooks/useDeleteToasts';
import Flatpickr from 'react-flatpickr';
import { deliveryStatuses } from '@/app/constraints/roles&status';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllDeliveryAsync, selectdeliveries, selectdeliveryState, updateDelivery } from '@/lib/features/delivery/deliverySlice';
import { selectIsDarkMode } from '@/lib/features/themeConfig/themeConfigSlice';
import { deleteDelivery, deleteMultiDelivery, updateDeliveryStatus } from '@/lib/features/delivery/deliveryActions';
import Dropdown from '@/app/components/Layout/Dropdown';
import { coloredToast } from '@/utils/sweetAlerts';
import { formatDate } from '@/utils/helperFunctions';
import { useRouter, useSearchParams } from 'next/navigation';



const DeliveryTable = () => {
    const dispatch = useAppDispatch();
    const { deleteToast, multiDeleteToast } = useDeleteToasts();

    const deliveries = useAppSelector(selectdeliveries);
    const delivertStatus = useAppSelector(selectdeliveryState);
    const isDark = useAppSelector(selectIsDarkMode);
    const router = useRouter()

    // search params for pagination
    const searchParams = useSearchParams();
    const page = (searchParams.get('page') || 1) as string;
    const limit = (searchParams.get('limit') || 20) as string;

    useEffect(() => {
        dispatch(getAllDeliveryAsync({}));
    }, []);

    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [initialRecords, setInitialRecords] = useState(sortBy(deliveries.data, 'createdAt'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [date3, setDate3] = useState<any>(null);
    const [activeFilter, setActiveFilter] = useState<any>(false);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });


    useEffect(() => {
        setRecords(deliveries.data);
        setInitialRecords(deliveries.data);
    }, [deliveries]);

    // useEffect(() => {
    //     setPage(1);
    // }, [pageSize]);

    useEffect(() => {
        // const from = (page - 1) * pageSize;
        // const to = from + pageSize;
        // setRecords([...(Array.isArray(initialRecords) ? initialRecords.slice(from, to) : [])]);

        router.push(`?${new URLSearchParams({ page: page.toString(), limit: limit.toString() })}`, { scroll: false });
        dispatch(getAllDeliveryAsync({ page, limit }));
    }, [page, limit, router, dispatch]);


    useEffect(() => {
        const [startDate, endDate] = date3 ? date3.map((date: string | number | Date) => new Date(date)) : [null, null];
        setInitialRecords(() => {
            return deliveries.data.filter((delivery) => {
                const deliveryDate = delivery.Production.Sale.orderDate ? new Date(delivery.Production.Sale.orderDate) : null;
                const isInDateRange = startDate && endDate ? (deliveryDate && deliveryDate >= startDate && deliveryDate <= endDate) : true;
                const matchesSearch = (
                    delivery.id.toString().toLowerCase().includes(search.toLowerCase()) ||
                    delivery.createdAt.toString().toLowerCase().includes(search.toLowerCase()) ||
                    delivery.Vehicle.driver.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    delivery.Vehicle.driver.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    delivery.Vehicle.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
                    delivery.Production.Sale.location.toLowerCase().includes(search.toLowerCase()) ||
                    delivery.Production.Sale.sideContact.toLowerCase().includes(search.toLowerCase())
                );
                return isInDateRange && matchesSearch;

            });
        });
    }, [search, activeFilter]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        // setPage(1);
    }, [sortStatus]);

    const deleteRow = async (id: any = null) => {
        if (id) {
            const deletionSuccess = await deleteToast(id, deleteDelivery, updateDelivery);
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
            const deletionSuccess = await multiDeleteToast(ids, deleteMultiDelivery, updateDelivery);
            if (deletionSuccess) {
                setSelectedRecords([]);
                setSearch("");
                // setPage(1);
                router.push(`?${new URLSearchParams({ page: '1', limit: limit.toString() })}`, { scroll: false });
            }
        }

    };

    const handleStatusChange = async (productionId: number, statusId: number) => {
        const res = await updateDeliveryStatus(productionId, statusId);
        if (res.message) {
            coloredToast("success", res.message, "bottom-start");
            dispatch(getAllDeliveryAsync({}));
        } else {
            dispatch(getAllDeliveryAsync({}));
            coloredToast("danger", res.error, "bottom-start");
        }
    }

    if (delivertStatus.status === 'failed') coloredToast('danger', delivertStatus.error || 'Failed to fetch deliveries');

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
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b] mt-5">
            <div className="invoice-table">
                <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div className="flex flex-wrap items-center justify-around gap-2 pl-3">
                        {selectedRecords.length >= 1 && <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <DeleteIcon />
                            Delete
                        </button>}
                        {/* <button className="btn btn-primary gap-2" onClick={() => { dispatch(setDeliveryModal(true)), dispatch(updateDeliveryState(defaultParams)), dispatch(fetchAllCategoryAsync({})) }}>
                            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            New Ussue
                        </button> */}
                    </div>
                    <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
                        <Flatpickr
                            options={{
                                mode: 'range',
                                dateFormat: 'd-m-Y',
                                position: 'auto right',
                                onClose: (selectedDates, dateStr, instance) => {
                                    setDate3(selectedDates); // Assuming setDate3 is your state updater function
                                    setActiveFilter(!activeFilter)
                                },

                            }}
                            // defaultValue={''}
                            placeholder="Select a date range..."
                            className="form-input w-60"
                            onChange={(date3: any) => setDate3(date3)}
                        />
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />

                    </div>

                </div>
                <div className="pl-1 datatables pagination-padding">
                    <DataTable
                        className={`${isDark} table-hover whitespace-nowrap`}
                        records={records?.map((delivery, index) => ({
                            ...delivery,
                            serialNumber: index + 1,
                        }))}
                        columns={[
                            {
                                accessor: 'id',
                                render: ({ serialNumber, id }) => (
                                    <Link href={`/delivery/${id}`}>
                                        <div className="font-semibold text-primary underline hover:no-underline">{`#${serialNumber}`}</div>
                                    </Link>
                                ),
                            },
                            {
                                accessor: 'Driver Name',
                                title: 'Driver Name',
                                sortable: true,
                                render: ({ Vehicle, id }) => (
                                    <div className="flex items-center font-semibold">
                                        {/* <div className="w-max rounded-full bg-white-dark/30 p-0.5 ltr:mr-2 rtl:ml-2">
                                            <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                        </div> */}
                                        <div>{Vehicle?.driver.firstName} {Vehicle?.driver.lastName}</div>
                                    </div>
                                ),
                            },
                            {
                                title: 'Plate Number',
                                accessor: 'Plate Number',
                                sortable: true,
                                render: ({ Vehicle }) => <div >{Vehicle?.plateNumber}</div>
                            },
                            {
                                title: 'Product Name',
                                accessor: 'Product Name',
                                sortable: true,
                                render: ({ Production }) => <div >{Production?.Sale?.Product?.name}</div>
                            },
                            {
                                accessor: 'Delivery Location',
                                title: 'Delivery Location',
                                sortable: true,
                                render: ({ Production }) =>
                                    <div className=" font-medium  text-white-dark ">
                                        <span>{Production?.Sale?.location}</span>
                                    </div>,
                            },
                            {
                                accessor: 'Side Contact',
                                title: 'Side Contact',
                                sortable: true,
                                render: ({ Production }) =>
                                    <div className=" font-medium  text-white-dark ">
                                        <span>{Production?.Sale?.sideContact}</span>
                                    </div>,
                            },
                            {
                                accessor: 'Delivery Date',
                                title: 'Delivery Date',
                                sortable: true,
                                render: ({ Production }) => <span >{formatDate(Production?.Sale?.orderDate)}</span>,
                            },
                            // {
                            //     accessor: 'status',
                            //     sortable: true,
                            //     render: ({ status }) => <span className={`badge ${statusBadgeClasses[status]}`}>
                            //         {deliveryStatuses[status.toString()]}
                            //     </span>
                            // },
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
                                                    {deliveryStatuses[status.toString()]}
                                                </span>
                                            }
                                        >
                                            <ul className="!min-w-[170px]">
                                                {
                                                    Object.entries(deliveryStatuses).map(([key, value]) => {
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
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: (delivery) => (
                                    <div className="mx-auto flex w-max items-center gap-4">
                                        {/*
                                         <button
                                            type="button"
                                            className="flex hover:text-info"
                                            onClick={() => {
                                                dispatch(updateTicketState({ ...delivery, cat: delivery.cat.id })),
                                                    dispatch(setDeliveryModal(true))
                                            }}
                                        >
                                            <EditIcon />
                                        </button>
                                         
                                         */}

                                        {/*   <Link href={`/delivery/${delivery.id}`} className="flex hover:text-primary">
                                            <PreviewIcon />
                                        </Link> */}
                                        <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(delivery?.id)}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={deliveries.details.totalRecords}
                        recordsPerPage={Number(limit)}
                        page={Number(page)}
                        onPageChange={(p) => router.push(`?${new URLSearchParams({ page: p.toString(), limit: limit.toString() })}`, { scroll: false })}
                        onRecordsPerPageChange={(ps) => router.push(`?${new URLSearchParams({ page: page.toString(), limit: ps.toString() })}`, { scroll: false })}
                        recordsPerPageOptions={PAGE_SIZES}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeliveryTable;

'use client'
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { formatDate } from '@/utils/helperFunctions';
import { DeleteIcon, EditIcon } from '@/app/icons';
import { coloredToast } from "@/utils/sweetAlerts";
import MaterialModal from './MaterialModal';
import useDeleteToasts from '@/hooks/useDeleteToasts';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllMaterialAsync, selectMaterials, updateMaterial } from '@/lib/features/material/materialSlice';
import { selectIsDarkMode } from '@/lib/features/themeConfig/themeConfigSlice';
import { deleteMaterial, deleteMultiMaterial } from '@/lib/features/material/materialActions';
import { useRouter, useSearchParams } from 'next/navigation';

const MaterialsTable = () => {
    const dispatch = useAppDispatch();
    const { deleteToast, multiDeleteToast } = useDeleteToasts();
    const materials = useAppSelector(selectMaterials);
    const isDark = useAppSelector(selectIsDarkMode);

    const router = useRouter()

    // search params for pagination
    const searchParams = useSearchParams();
    const page = (searchParams.get('page') || 1) as string;
    const limit = (searchParams.get('limit') || 20) as string;

    useEffect(() => {
        dispatch(getAllMaterialAsync({ page, limit }));
    }, [page, limit, dispatch]);

    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const PAGE_SIZES = [5, 10, 15, 20, 25];
    const [initialRecords, setInitialRecords] = useState(sortBy(materials.data, 'id'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [modal, setModal] = useState(false);

    //@ts-ignore
    const [materialInitials, setMaterialInitials] = useState({
        name: "",
        unittype: "",
    });

    useEffect(() => {
        setRecords(materials.data);
        setInitialRecords(materials.data);
    }, [materials]);

    // useEffect(() => {
    //     setPage(1);
    // }, [pageSize]);

    useEffect(() => {
        // const from = (page - 1) * pageSize;
        // const to = from + pageSize;
        // setRecords([...(Array.isArray(initialRecords) ? initialRecords.slice(from, to) : [])]);

        router.push(`?${new URLSearchParams({ page: page.toString(), limit: limit.toString() })}`, { scroll: false });
        dispatch(getAllMaterialAsync({ page, limit }));
    }, [page, limit, router, dispatch]);

    useEffect(() => {
        setInitialRecords(() => {
            return materials?.data.filter((material) => {
                return (
                    material.name.toLowerCase().includes(search.toLowerCase()) ||
                    material.unitType.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [materials, search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        // setPage(1);
    }, [sortStatus, initialRecords]);


    const deleteRow = async (id: any = null) => {

        if (id) {
            const deletionSuccess = await deleteToast(id, deleteMaterial, updateMaterial);
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
            const deletionSuccess = await multiDeleteToast(ids, deleteMultiMaterial, updateMaterial);
            if (deletionSuccess) {
                setSelectedRecords([]);
                setSearch("");
                // setPage(1);
                router.push(`?${new URLSearchParams({ page: '1', limit: limit.toString() })}`, { scroll: false });
            }
        }

    };


    return (

        <>
            <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                    <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                        <DeleteIcon />
                        Delete
                    </button>
                    <MaterialModal
                        modal={modal}
                        setModal={setModal}
                        //@ts-ignore
                        materialInitials={materialInitials}
                        //@ts-ignore
                        setMaterialInitials={setMaterialInitials}
                    />

                </div>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="datatables pagination-padding">
                <DataTable
                    className={`${isDark} table-hover whitespace-nowrap`}
                    records={records?.map((material) => ({ ...material }))}
                    columns={[
                        {
                            accessor: 'id',
                            sortable: true,
                            render: ({ id }) => (
                                <div className="font-semibold text-primary underline hover:no-underline">{`#${id}`}</div>
                            ),
                        },
                        {
                            accessor: 'name',
                            sortable: true,
                            render: ({ name, id }) => (
                                <div className="flex items-center font-semibold">
                                    <div>{name as string}</div>
                                </div>
                            ),
                        },
                        {
                            accessor: 'unitType',
                            sortable: true,
                        },
                        {
                            accessor: 'quantity',
                            sortable: true,
                            render: ({ quantity, id }) => <div className=" font-semibold">{`${quantity}`}</div>,
                        },

                        {
                            accessor: 'createdAt',
                            sortable: true,
                            render: (materials) => <div>{formatDate(materials.createdAt)}</div>,
                        },

                        {
                            accessor: 'action',
                            title: 'Actions',
                            sortable: false,
                            textAlignment: 'center',
                            render: (material) => (
                                <div className="mx-auto flex w-max items-center gap-4">
                                    {/* <Link href="/apps/invoice/edit" className="flex hover:text-info"> */}
                                    <button
                                        onClick={() => {
                                            //@ts-ignore
                                            setMaterialInitials(material), setModal(true);
                                        }}
                                        className="flex hover:text-info"
                                    >
                                        <EditIcon />
                                    </button>
                                    {/* </Link>
                                        <Link href="/apps/invoice/preview" className="flex hover:text-primary">
                                           <PreviewIcon />
                                        </Link> */}
                                    <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(material.id)}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    highlightOnHover={true}
                    totalRecords={materials.details.totalRecords}
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
        </>

    );
};

export default MaterialsTable;

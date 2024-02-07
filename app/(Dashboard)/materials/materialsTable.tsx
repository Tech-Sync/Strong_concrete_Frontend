'use client'
import Link from 'next/link';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useSelector } from 'react-redux';
import { selectThemeConfig } from '@/lib/redux/slices/themeConfigSlice';
import { Material } from '@/types/types';
import { formatDate } from '@/utils/formatDate';
import { MaterialDeleteIcon, MaterialEditIcon, MaterialPlusIcon, MaterialPreviewIcon } from '@/app/icons';
interface MaterialsTableProps {
    materials: Material[]
}

const MaterialsTable = ({materials}:MaterialsTableProps) => {

    const isDark = useSelector(selectThemeConfig).isDarkMode ? "dark":"light"
   
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 15, 20, 25];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(materials, 'id'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
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
            return materials.filter((material) => {
                return (
                    material.name.toLowerCase().includes(search.toLowerCase()) ||
                    material.unitType.toLowerCase().includes(search.toLowerCase()) 
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);


    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(materials.filter((material) => material.id !== id));
                setInitialRecords(materials.filter((material) => material.id !== id));
                setSelectedRecords([]);
                setSearch('');
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = materials.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setSelectedRecords([]);
                setSearch('');
                setPage(1);
            }
        }
    };

    return (
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                        <MaterialDeleteIcon />
                            Delete
                        </button>
                        <Link href="/apps/invoice/add" className="btn btn-primary gap-2">
                           <MaterialPlusIcon />
                            Add New
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables pagination-padding">
                    <DataTable
                        className={`${isDark} table-hover whitespace-nowrap`}
                        records={records.map((material) => ({ ...material }))}
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
                                titleClassName: 'text-right',
                                render: ({ quantity, id }) => <div className="text-right font-semibold">{`${quantity}`}</div>,
                            },
                           
                            {
                                accessor: 'createdAt',
                                sortable: true,
                                titleClassName: 'text-right',
                                render: ({ createdAt, id }) => <div className="text-right">{formatDate(createdAt)}</div>,
                            },
                          
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="mx-auto flex w-max items-center gap-4">
                                        <Link href="/apps/invoice/edit" className="flex hover:text-info">
                                           <MaterialEditIcon />
                                        </Link>
                                        <Link href="/apps/invoice/preview" className="flex hover:text-primary">
                                           <MaterialPreviewIcon />
                                        </Link>
                                        <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                           <MaterialDeleteIcon />
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
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default MaterialsTable;

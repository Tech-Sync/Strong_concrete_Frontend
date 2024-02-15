'use client'
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { formatDate } from '@/utils/formatDate';
import { DeleteIcon, EditIcon } from '@/app/icons';
import { coloredToast } from "@/lib/sweetAlerts";
import { getAllMaterialAsync, selectIsDarkMode, selectMaterialStatus, selectMaterials, updateMaterial, useDispatch, useSelector } from '@/lib/redux';
import { deleteMaterial, deleteMultiMaterial } from '@/lib/redux/slices/materialSlice/materialActions';
import MaterialModal from './MaterialModal';
import useDeleteToasts from '@/hooks/useDeleteToasts';

const MaterialsTable = () => {
    const dispatch = useDispatch();
    const { deleteToast, multiDeleteToast } = useDeleteToasts();
    const materials = useSelector(selectMaterials);
    const materialStatus = useSelector(selectMaterialStatus);
    const isDark = useSelector(selectIsDarkMode);

   
    useEffect(() => {
        dispatch(getAllMaterialAsync());
      }, []);

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
    const [modal, setModal] = useState(false);

      //@ts-ignore
  const [materialInitials, setMaterialInitials] = useState({
    name: "",
    unittype: "",
  });

    useEffect(() => {
    setRecords(materials);
    setInitialRecords(materials);
    }, [materials]);
    
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
    }, [materials, search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);


    const deleteRow = async (id: any = null) => {
        const deletionSuccess = await deleteToast(id, deleteMaterial, updateMaterial);
            if (deletionSuccess) {
                setSelectedRecords([]);
                setSearch("");
            } else {
                let selectedRows = selectedRecords || [];
                if (selectedRows.length === 0) {
                  coloredToast("warning", "Select items to delete!");
                  return;
                }
                const ids = selectedRows.map((d: any) => {
                  return d.id;
                });
                const deletionSuccess = await multiDeleteToast(ids, deleteMultiMaterial, updateMaterial);
                if (deletionSuccess) {
                  setSelectedRecords([]);
                  setSearch("");
                  setPage(1);
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
                                render: (materials) => <div className="text-right">{formatDate(materials.createdAt)}</div>,
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
            </>
       
    );
};

export default MaterialsTable;

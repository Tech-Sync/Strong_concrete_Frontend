'use client'
import { Materials } from '@/types/types'
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { sortBy } from 'lodash';
import { useSelector } from 'react-redux';
import { selectThemeConfig } from '@/lib/redux/slices/themeConfigSlice';
interface MaterialsProps {
 materials: Materials
}

const MaterialsTable = ({ materials }: MaterialsProps) => {
 const [page, setPage] = useState(1);
 const [initialRecords, setInitialRecords] = useState(sortBy(materials, 'id'));
 const [recordsData, setRecordsData] = useState(initialRecords);
 const [selectedRecords, setSelectedRecords] = useState<any>([]);
 const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
  columnAccessor: 'id',
  direction: 'asc',
 })
 const PAGE_SIZES = [10, 20, 30, 50, 100];
 const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
 const router = useRouter()

 const themeConfig = useSelector(selectThemeConfig)


 useEffect(() => {
  const data = sortBy(initialRecords, sortStatus.columnAccessor);
  setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  setPage(1);
 }, [sortStatus]);

 useEffect(() => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  setRecordsData([...initialRecords.slice(from, to)]);
 }, [page, pageSize, initialRecords]);

 const formatDate = (date: any) => {
  if (date) {
   const dt = new Date(date);
   const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
   const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
   return day + '/' + month + '/' + dt.getFullYear();
  }
  return '';
 };

 console.log(recordsData)
 return (
  <div className="datatables pagination-padding">
   <DataTable
    striped
    highlightOnHover
    className="table-striped whitespace-nowrap"
    records={recordsData}
    // onDoubleClick={(a) => (console.log('duble click :', a))}
    onRowClick={(a) => (router.push(`/categories/${a.record.id}`))}
    columns={[
     {
      accessor: 'Name',
      sortable: true,
      render: ({ id, name }) => (
       <Link href={`/materials/${id}`} className="text-blue-500">
        {name}
       </Link>
      ),
     },
     {
      accessor: 'unitType',
      sortable: true,
      render: ({ unitType }) => (
       <div className="text-gray-500">{unitType}</div>
      ),
     },
     {
      accessor: 'quantity',
      sortable: true,
      render: ({ quantity }) => (
       <div className="text-gray-500">{quantity}</div>
      ),
     },
    ]}
    totalRecords={initialRecords.length}
    recordsPerPage={pageSize}
    page={page}
    onPageChange={(p) => setPage(p)}
    recordsPerPageOptions={PAGE_SIZES}
    onRecordsPerPageChange={setPageSize}
    sortStatus={sortStatus}
    onSortStatusChange={setSortStatus}
    minHeight={200}
    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
   /></div>
 )
}

export default MaterialsTable
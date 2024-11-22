"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState, useEffect } from "react";
import sortBy from "lodash/sortBy";
import { DeleteIcon, EditIcon } from "@/app/icons";
import { formatDate } from "@/utils/helperFunctions";
import { coloredToast } from "@/utils/sweetAlerts";

import useDeleteToasts from "@/hooks/useDeleteToasts";
import ProductModal from "./ProductModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllProductAsync, selectProducts, updateProductState } from "@/lib/features/product/productSlice";
import { selectIsDarkMode } from "@/lib/features/themeConfig/themeConfigSlice";
import { deleteMultiProduct, deleteProduct } from "@/lib/features/product/productActions";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const { deleteToast, multiDeleteToast } = useDeleteToasts();
  const products = useAppSelector(selectProducts);
  const isDark = useAppSelector(selectIsDarkMode);

  const router = useRouter()

  // search params for pagination
  const searchParams = useSearchParams();
  const page = (searchParams.get('page') || 1) as string;
  const limit = (searchParams.get('limit') || 20) as string;

  useEffect(() => {
    dispatch(getAllProductAsync({ page, limit }));
  }, [page, limit, dispatch]);

  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const PAGE_SIZES = [10, 20, 30, 40, 50];
  const [initialRecords, setInitialRecords] = useState(sortBy(products.data, "id"));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });
  const [modal, setModal] = useState(false);

  //@ts-ignore
  const [productInitials, setProductInitials] = useState({
    name: "",
    price: 0,
    materials: {}
  });

  useEffect(() => {
    setRecords(products.data);
    setInitialRecords(products.data);
  }, [products]);

  // useEffect(() => {
  //   setPage(1);
  // }, [pageSize]);

  useEffect(() => {
    // const from = (page - 1) * pageSize;
    // const to = from + pageSize;
    // setRecords([...(Array.isArray(initialRecords) ? initialRecords.slice(from, to) : [])]);

    router.push(`?${new URLSearchParams({ page: page.toString(), limit: limit.toString() })}`, { scroll: false });
    dispatch(getAllProductAsync({ page, limit }));
  }, [page, limit, router, dispatch]);

  useEffect(() => {
    setInitialRecords(() => {
      return products?.data.filter((product) => {
        const price = product.price.toString()
        return (
          price.toLowerCase().includes(search.toLowerCase()) ||
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [products, search]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data2.reverse() : data2);
    // setPage(1);
  }, [initialRecords, sortStatus]);

  const deleteRow = async (id: any = null) => {
    if (id) {
      const deletionSuccess = await deleteToast(id, deleteProduct, updateProductState);
      if (deletionSuccess) {
        setSelectedRecords([]);
        setSearch("");
      }
    } else {
      let selectedRows = selectedRecords || [];
      if (selectedRows.length === 0) {
        coloredToast("warning", "Select items to delete!");
        return;
      }
      const ids = selectedRows?.map((d: any) => {
        return d.id;
      });
      const deletionSuccess = await multiDeleteToast(ids, deleteMultiProduct, updateProductState);
      if (deletionSuccess) {
        setSelectedRecords([]);
        setSearch("");
        // setPage(1);
        router.push(`?${new URLSearchParams({ page: '1', limit: limit.toString() })}`, { scroll: false });
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
              onClick={() => deleteRow()}>
              <DeleteIcon />
              Delete
            </button>
            <ProductModal
              modal={modal}
              setModal={setModal}
              //@ts-ignore
              productInitials={productInitials}
              //@ts-ignore
              setProductInitials={setProductInitials}
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
            records={records?.map((product, index) => ({
              ...product,
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
                render: ({ name, id }) => (
                  <div className="flex items-center font-semibold">
                    <div>{name as string}</div>
                  </div>
                ),
              },
              {
                accessor: "materials",
                sortable: true,
                render: ({ materials, id }) => (
                  <div className="flex flex-col">
                    {Object.entries(materials)?.map(([key, value]) => {
                      let unit = 'kg';
                      if (key === 'STONE' || key === 'SAND') {
                        unit = 'ton';
                      } else if (key === 'WATER') {
                        unit = 'lt';
                      }
                      return <span key={key}>{`${key.toLowerCase()}: ${value} ${unit}`}</span>;
                    })}
                  </div>
                ),
              },
              {
                accessor: "price",
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
                accessor: "action",
                title: "Actions",
                sortable: false,
                textAlignment: "center",
                render: (product) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    <button
                      onClick={() => {
                        setProductInitials(product), setModal(true);
                      }}
                      className="flex hover:text-info">
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      className="flex hover:text-danger"
                      onClick={(e) => deleteRow(product.id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                ),
              },
            ]}
            highlightOnHover={true}
            totalRecords={products.details.totalRecords}
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

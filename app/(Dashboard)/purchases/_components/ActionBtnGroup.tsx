'use client'
import { DownloadIcon, EditIcon, PlusIcon, PrintIcon, SendInvoiceIcon } from '@/app/icons'
import { updateSaleState } from '@/lib/features/sale/saleSlice';
import { useAppDispatch } from '@/lib/hooks';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ActionBtnGroup({ sale }: { sale: any }) {

    const exportTable = () => {
        window.print();
    };

    const dispatch = useAppDispatch();
    const router = useRouter();

    function downloadFile() {
        const fileUrl = "http://localhost:3000/purchases/preview";

        const link = document.createElement("a");
        link.href = fileUrl;
        const fileName = "file.pdf";

        if (fileName) {
            link.setAttribute("download", fileName);
        }

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    }
    return (
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
            <button
                type="button"
                className="btn btn-info gap-2"
                onClick={() => (window.location.href = `mailto:'company@gmail.com'`)}
            >
                <SendInvoiceIcon />
                Send Invoice
            </button>

            <button
                type="button"
                className="btn btn-primary gap-2"
                onClick={() => exportTable()}
            >
                <PrintIcon />
                Print
            </button>

            {/* <button
                type="button"
                className="btn btn-success gap-2"
                onClick={downloadFile}
            >
                <DownloadIcon />
                Download
            </button> */}

            <button onClick={() => { router.push(`/sales/add`), dispatch(updateSaleState(null)) }} className="btn btn-secondary gap-2">
                <PlusIcon />
                Create
            </button>


            <button onClick={() => { dispatch(updateSaleState(sale)); router.push(`/sales/add`) }} className="btn btn-warning gap-2">
                <EditIcon />
                Edit
            </button>
        </div>
    )
}

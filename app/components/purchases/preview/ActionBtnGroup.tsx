'use client'
import { DownloadIcon, EditIcon, PlusIcon, PrintIcon, SendInvoiceIcon } from '@/app/icons'
import Link from 'next/link'
import React from 'react'

export default function ActionBtnGroup() {

    const exportTable = () => {
        window.print();
    };

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
                onClick={() => (window.location.href = "mailto:destek@example.com")}
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

            <button
                type="button"
                className="btn btn-success gap-2"
                onClick={downloadFile}
            >
                <DownloadIcon />
                Download
            </button>

            <Link href="/purchases/add" className="btn btn-secondary gap-2">
                <PlusIcon />
                Create
            </Link>

            <Link href="/purchases/edit" className="btn btn-warning gap-2">
                <EditIcon />
                Edit
            </Link>
        </div>
    )
}

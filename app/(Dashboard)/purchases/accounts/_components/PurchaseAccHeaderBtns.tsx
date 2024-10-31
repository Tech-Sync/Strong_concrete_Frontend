'use client'
import React, { useState } from 'react'

export default function PurchaseAccHeaderBtns() {
    const [search, setSearch] = useState('');

    return (
        <div className="mt-5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
                <button type="button" className="btn btn-danger gap-2">
                    {/* <DeleteIcon /> */}
                    Delete
                </button>
                

            </div>
            <div className="ltr:ml-auto rtl:mr-auto">
                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
        </div>
    )
}

import React from 'react'
import PurchaseAccHeaderBtns from './_components/PurchaseAccHeaderBtns'
import PurchaseAccCard from './_components/PurchaseAccCard'
import BreadCrumb from '@/app/components/common/BreadCrumb'

export default function PurchaseAccountPage() {

    return (
        <>
            <BreadCrumb />
            <PurchaseAccHeaderBtns />
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                {
                    Array.from({ length: 6 }).map((_, i) => (
                        <PurchaseAccCard key={i} />
                    ))
                }
                <PurchaseAccCard />
            </div>
        </>

    )
}

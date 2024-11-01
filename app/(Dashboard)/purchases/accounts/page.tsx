import React from 'react'
import PurchaseAccHeaderBtns from './_components/PurchaseAccHeaderBtns'
import PurchaseAccCard from './_components/PurchaseAccCard'
import BreadCrumb from '@/app/components/common/BreadCrumb'
import { getAllPurchaseAccAccs } from '@/lib/features/purchaseAccount/purchaseAccActions'
import { PurchaseAccountList } from '@/types/types'

export default async function PurchaseAccountPage() {
    const purchaseAccInfo: PurchaseAccountList[] = await getAllPurchaseAccAccs()
    return (
        <>
            <BreadCrumb />
            <PurchaseAccHeaderBtns />
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {
                    purchaseAccInfo.map((firmInfo, i) => (
                        <PurchaseAccCard firmInfo={firmInfo} key={i} />
                    ))
                }
            </div>
        </>

    )
}

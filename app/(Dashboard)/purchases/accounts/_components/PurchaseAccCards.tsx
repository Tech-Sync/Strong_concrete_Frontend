'use client'
import { PurchaseAccountList } from '@/types/types'
import React, { useState } from 'react'
import PurchaseAccCard from './PurchaseAccCard'
import { useSearchParams } from 'next/navigation'

export default function PurchaseAccCards({ purchaseAccInfo }: { purchaseAccInfo: PurchaseAccountList[] }) {

    const searchParams = useSearchParams();

    const firmName = searchParams.get('firmName') || ''

    const [purchaseAccList, setPurchaseAccList] = useState<PurchaseAccountList[]>(purchaseAccInfo)
    console.log(purchaseAccList);

    return (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {
                purchaseAccList.filter(firm => firm.firmName.toLocaleLowerCase().includes(firmName)).map((firmInfo, i) => (
                    <PurchaseAccCard
                        firmInfo={firmInfo} key={i}
                        updatePurchaseList={setPurchaseAccList} />
                ))
            }
        </div>
    )
}

import React from 'react'
import PurchaseAccFirmInfoInfoTable from './_components/PurchaseAccFirmInfoTable'
import BreadCrumb from '@/app/components/common/BreadCrumb'
import { getAllPurchases } from '@/lib/features/purchase/purchaseActions'

export default async function PurchaseAccFirmPage({ params }: { params: { firmId: string } }) {


    const rowData = await getAllPurchases(params.firmId)


    return (
        <>
            <BreadCrumb />
            <PurchaseAccFirmInfoInfoTable rowData={rowData.data} />
        </>
    )
}

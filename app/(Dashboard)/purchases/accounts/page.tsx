import React from 'react'
import PurchaseAccHeaderBtns from './_components/PurchaseAccHeaderBtns'
import BreadCrumb from '@/app/components/common/BreadCrumb'
import { getAllPurchaseAccAccs } from '@/lib/features/purchaseAccount/purchaseAccActions'
import { PurchaseAccountList } from '@/types/types'
import PurchaseAccCards from './_components/PurchaseAccCards'

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function PurchaseAccountPage({ searchParams }: { searchParams: SearchParams }) {

    const purchaseAccInfo: PurchaseAccountList[] = await getAllPurchaseAccAccs()

    // const firmName = (searchParams.firmName) as string || ''
    // console.log(firmName);


    return (
        <>
            <BreadCrumb />
            <PurchaseAccHeaderBtns />
            <PurchaseAccCards purchaseAccInfo={purchaseAccInfo} />
        </>

    )
}

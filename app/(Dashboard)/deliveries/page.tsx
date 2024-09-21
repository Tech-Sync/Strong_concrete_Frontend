import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'
import DeliveryTable from './_components/DeliveryTable';
import BreadCrumb from '@/app/components/common/BreadCrumb';

export const metadata: Metadata = { title: "Deliveries", description: "Deliveries" };

const DeliveryPage = () => {
  return (
    <>
      <BreadCrumb />

      <DeliveryTable />
    </>

  )
}

export default DeliveryPage
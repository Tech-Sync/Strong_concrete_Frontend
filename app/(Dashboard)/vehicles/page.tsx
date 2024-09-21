import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'
import VehicleTable from './_components/VehicleTable';
import BreadCrumb from '@/app/components/common/BreadCrumb';

export const metadata: Metadata = { title: "Vehicles", description: "Vehicles" };


const VehiclesPage = () => {
  return (
    <div className="flex flex-col space-y-5">
      <BreadCrumb />

      <VehicleTable />
    </div>
  )
}

export default VehiclesPage
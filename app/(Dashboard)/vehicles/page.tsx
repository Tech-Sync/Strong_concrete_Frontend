import VehicleTable from '@/app/components/vehicles/VehicleTable'
import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = { title: "Vehicles", description: "Vehicles"};


const VehiclesPage = () => {
  return (
    <div className="flex flex-col space-y-5">
    <ul className="flex space-x-2 rtl:space-x-reverse ">
      <li>
        <Link href="/" className="text-primary hover:underline">
          Dashboard
        </Link>
      </li>
      <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
        <span>Vehicles</span>
      </li>
    </ul>
    <VehicleTable/>
  </div>
  )
}

export default VehiclesPage
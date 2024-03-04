import SaleTable from '@/app/components/sales/SaleTable'
import Link from 'next/link'
import React from 'react'

const SalePage = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Purchases</span>
        </li>
      </ul>
      <SaleTable/>
    </div>
  )
}

export default SalePage


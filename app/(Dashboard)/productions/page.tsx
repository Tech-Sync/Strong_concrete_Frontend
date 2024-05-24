import ProductionTable from '@/app/components/productions/ProductionTable'
import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = { title: "Productions", description: "Productions"};

const ProductionPage = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse ">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Productions</span>
        </li>
      </ul>
      <ProductionTable />
    </div>
  )
}

export default ProductionPage
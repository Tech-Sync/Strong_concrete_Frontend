import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'
import ProductionTable from './_components/ProductionTable';
import BreadCrumb from '@/app/components/common/BreadCrumb';

export const metadata: Metadata = { title: "Productions", description: "Productions" };

const ProductionPage = () => {
  return (
    <>
      <BreadCrumb />

      <ProductionTable />
    </>
  )
}

export default ProductionPage
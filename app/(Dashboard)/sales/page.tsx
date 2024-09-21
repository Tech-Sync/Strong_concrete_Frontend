import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'
import SaleTabs from './_components/SaleTabs';
import BreadCrumb from '@/app/components/common/BreadCrumb';

export const metadata: Metadata = { title: "Sales", description: "Sales" };


const SalePage = () => {
  return (
    <div className="flex flex-col space-y-5">
      <BreadCrumb />
      
      <SaleTabs />
    </div>
  )
}

export default SalePage


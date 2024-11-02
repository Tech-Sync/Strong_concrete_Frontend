'use client'
import Image from 'next/image'
import PerfectScrollbar from 'react-perfect-scrollbar';
import React from 'react'
import Link from 'next/link';
import { PurchaseAccountList } from '@/types/types';
import { formatDate } from '@/utils/helperFunctions';
import PurchaseAccPayModal from './PurchaseAccPayModal';

export default function PurchaseAccCard({ firmInfo }: { firmInfo: PurchaseAccountList }) {
    return (
        <div className="panel h-full overflow-hidden border-0 p-0">
            <div className="min-h-[190px] bg-gradient-to-r from-[#4361ee] to-[#160f6b] p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center rounded-full bg-black/50 p-1 font-semibold text-white ltr:px-3 ">
                        {/* <Image
                            className="block h-8 w-8 rounded-full border-2 border-white/50 object-cover ltr:mr-1 rtl:ml-1"
                            width={32}
                            height={32}
                            src="/assets/images/profile-34.jpeg"
                            alt="avatar" /> */}
                        {firmInfo.firmName}
                    </div>
                    <button type="button" className="flex h-9 w-9 items-center justify-between rounded-md bg-black text-white hover:opacity-80 ltr:ml-auto rtl:mr-auto">
                        <svg className="m-auto h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
                <div className="flex items-center justify-between text-white">
                    <p className="text-xl">Purchase Balance</p>
                    <h5 className="text-2xl ltr:ml-auto rtl:mr-auto">
                        <span className="text-white-light">K</span>{firmInfo.totalDebit - firmInfo.totalCredit}
                    </h5>
                </div>
            </div>
            <div className="-mt-12 grid grid-cols-2 gap-2 px-8">
                <div className="rounded-md bg-white px-4 py-2.5 shadow dark:bg-[#060818]">
                    <span className="mb-4 flex items-center justify-between dark:text-white">
                        Debit
                        <svg className="h-4 w-4 text-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 15L12 9L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <div className="btn w-full  border-0 bg-[#ebedf2] py-1 text-base text-[#515365] shadow-none dark:bg-black dark:text-[#bfc9d4]">K{firmInfo.totalDebit}</div>
                </div>
                <div className="rounded-md bg-white px-4 py-2.5 shadow dark:bg-[#060818]">
                    <span className="mb-4 flex items-center justify-between dark:text-white">
                        Credit
                        <svg className="h-4 w-4 text-danger" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <div className="btn w-full  border-0 bg-[#ebedf2] py-1 text-base text-[#515365] shadow-none dark:bg-black dark:text-[#bfc9d4]">K{firmInfo.totalCredit}</div>
                </div>
            </div>
            <div className="p-5">
                <div className="mb-5">
                    <span className="rounded-full bg-[#1b2e4b] px-4 py-1.5 text-xs text-white before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-white ltr:before:mr-2 rtl:before:ml-2">
                        Pending
                    </span>
                </div>
                <PerfectScrollbar className="relative -mr-3 mb-4 h-[100px] pr-3">
                    <div className="cursor-pointer text-sm">

                        {
                            firmInfo.transactions.map(transaction => (
                                <div className="group relative flex items-center py-1.5" key={transaction.id}>
                                    <div className={`h-1.5 w-1.5 rounded-full ${transaction.balance > 0 ? 'bg-warning' : 'bg-success'} ltr:mr-1 `}></div>
                                    <div className="flex-1">{transaction.Purchase.Material.name}</div>
                                    <div className="text-xs text-white-dark ltr:ml-auto  dark:text-gray-500">{formatDate(transaction.createdAt)}</div>

                                    <span className={`badge ${transaction.balance > 0 ? 'badge-outline-warning bg-warning-light' : 'badge-outline-success bg-success-light'} absolute text-xs opacity-0 group-hover:opacity-100 ltr:right-0 dark:bg-black px-5`}>
                                        Balance : K{transaction.balance}
                                    </span>

                                    {
                                        transaction.balance > 0 && (
                                            <PurchaseAccPayModal purchaseAccInfo={transaction} />
                                        )
                                    }
                                   

                                </div>
                            ))
                        }


                        {/* <div className="group relative flex items-center py-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary ltr:mr-1 "></div>
                            <div className="flex-1">Send Mail to HR and Admin</div>
                            <div className="text-xs text-white-dark ltr:ml-auto  dark:text-gray-500">2 min ago</div>

                            <span className="badge badge-outline-success absolute bg-success-light text-xs opacity-0 group-hover:opacity-100 ltr:right-0 rtl:left-0 dark:bg-black">
                                Completed
                            </span>
                        </div>
                        <div className="group relative flex items-center py-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-warning ltr:mr-1 "></div>
                            <div className="flex-1">Conference call with Marketing Manager.</div>
                            <div className="text-xs text-white-dark ltr:ml-auto  dark:text-gray-500">17:00</div>

                            <span className="badge badge-outline-warning absolute bg-warning-light text-xs opacity-0 group-hover:opacity-100 ltr:right-0 rtl:left-0 dark:bg-black">
                                In progress
                            </span>
                        </div> */}

                    </div>
                </PerfectScrollbar>
                <div className=" border-t border-white-light dark:border-white/10 flex justify-around px-2 pt-4 text-center">
                    <Link href={'/purchases/accounts/1'} type="button" className="btn btn-secondary ltr:mr-2 rtl:ml-2">
                        View Details
                    </Link>
                    {/* <PurchaseAccPayModal purchaseAccInfo={firmInfo.transactions[0]} /> */}
                </div>
            </div>
        </div>
    )
}

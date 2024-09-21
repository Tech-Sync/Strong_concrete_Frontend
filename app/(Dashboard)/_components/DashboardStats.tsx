'use client'
import { Stats } from '@/types/types';
import React from 'react'
import CountUp from 'react-countup';

const DashboardStats = ({ stats }: { stats: Stats }) => {
    return (
        <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
            <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                <div className="flex justify-between">
                    <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Profit</div>
                </div>
                <div className="mt-5 flex items-center">
                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> K
                        <CountUp start={0} end={stats?.profit.totalProfit} duration={7}></CountUp>
                    </div>
                    <div className="badge bg-white/30"> {stats?.profit.profitPercentageChange.toFixed(2)}% </div>
                </div>
                <div className="mt-5 flex items-center font-semibold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                        <path
                            opacity="0.5"
                            d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Last Week 
                    <span className='pl-2'>
                        <CountUp start={0} end={stats?.profit.totalProfitLastWeek} duration={7}></CountUp>
                    </span>
                </div>
            </div>

            {/* Sessions */}
            <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                <div className="flex justify-between">
                    <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Sale</div>

                </div>
                <div className="mt-5 flex items-center">
                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                        K<CountUp start={0} end={stats?.sale?.totalSale} duration={7}></CountUp>
                    </div>
                    <div className="badge bg-white/30">{stats?.sale?.salePerChange.toFixed(2)}% </div>
                </div>
                <div className="mt-5 flex items-center font-semibold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                        <path
                            opacity="0.5"
                            d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    
                    Last Week
                    <span className='pl-2'>
                        <CountUp start={0} end={stats?.sale?.totalSaleLastWeek} duration={7}></CountUp>
                    </span>
                    
                </div>
            </div>

            {/*  Time On-Site */}
            <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                <div className="flex justify-between">
                    <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Purchase</div>
                </div>
                <div className="mt-5 flex items-center">
                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                        K<CountUp start={0} end={stats?.purchase?.totalPurchase} duration={7}></CountUp>
                    </div>
                    <div className="badge bg-white/30">{stats?.purchase?.purchasePercChange.toFixed(2)}% </div>
                </div>
                <div className="mt-5 flex items-center font-semibold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                        <path
                            opacity="0.5"
                            d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Last Week 
                    <span className='pl-2'>
                        <CountUp start={0} end={stats?.purchase?.totalPurchaseLastWeek} duration={7}></CountUp>
                    </span>
                </div>
            </div>

            {/* Bounce Rate */}
            <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                <div className="flex justify-between">
                    <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Bounce Rate</div>

                </div>
                <div className="mt-5 flex items-center">
                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 49.10% </div>
                    <div className="badge bg-white/30">- 0.35% </div>
                </div>
                <div className="mt-5 flex items-center font-semibold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                        <path
                            opacity="0.5"
                            d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Last Week 50.01%
                </div>
            </div>
        </div>
    )
}

export default DashboardStats
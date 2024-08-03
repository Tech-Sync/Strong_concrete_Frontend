'use client'
import React, { Suspense, useEffect, useState } from 'react'
import BarAreaCharts from './BarAreaCharts'
import AreaDonutCharts from './AreaDonutCharts'
import DashboardStats from './DashboardStats'
import { selectIsDarkMode, selectRtlClass, useSelector } from '@/lib/redux'
import { getAllStatistics } from './dashboardAPI'
import { DashboardData } from '@/types/types'

const DashboardMain = () => {

    const isDark = useSelector(selectIsDarkMode)
    const isRtl = useSelector(selectRtlClass) === 'rtl' ? true : false;

    const defalutlData = {
        "error": false,
        "statistics": {
            "stats": {
                "sale": {
                    "totalSale": 0,
                    "totalSaleLastWeek": 0,
                    "salePerChange": 0,
                    "SaleCount": 0
                },
                "purchase": {
                    "totalPurchase": 0,
                    "totalPurchaseLastWeek": 0,
                    "purchasePercChange": 0,
                    "purchaseCount": 0
                },
                "profit": {
                    "totalProfit": 0,
                    "totalProfitLastWeek": 0,
                    "profitPercentageChange": 0
                }
            },
            "revenueChart": {
                "monthlySales": [],
                "monthlyPurchases": []
            },
            "salesByCategory": {
                "productName": [],
                "productQuantity": []
            }
        }
    }

    const [isMounted, setIsMounted] = useState(false);
    const [dashboardData, setDashboardData] = useState<DashboardData | any>(defalutlData)


    const fetchData = async () => {
        const data = await getAllStatistics()
        setDashboardData(data?.statistics)
    }

    useEffect(() => {
        fetchData()
        setIsMounted(true);
    }, []);

    return (
        <>
            <DashboardStats stats={dashboardData?.stats} />
            <AreaDonutCharts isDark={isDark} isRtl={isRtl} isMounted={isMounted} revenueChartData={dashboardData?.revenueChart} salesByCategoryData={dashboardData?.salesByCategory} />
            <BarAreaCharts isDark={isDark} isRtl={isRtl} isMounted={isMounted} />
        </>
    )
}

export default DashboardMain





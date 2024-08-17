'use client'
import React, { Suspense, useEffect, useState } from 'react'
import BarAreaCharts from './BarAreaCharts'
import AreaDonutCharts from './AreaDonutCharts'
import DashboardStats from './DashboardStats'
import { selectIsDarkMode, selectRtlClass, useSelector } from '@/lib/redux'
import { getAllStatistics } from './dashboardAPI'
import { DashboardData } from '@/types/types'

const DashboardMain = ({ data }: { data: DashboardData }) => {

    const isDark = useSelector(selectIsDarkMode)
    const isRtl = useSelector(selectRtlClass) === 'rtl' ? true : false;

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <DashboardStats stats={data?.stats} />
            <AreaDonutCharts isDark={isDark} isRtl={isRtl} isMounted={isMounted} revenueChartData={data?.revenueChart} salesByCategoryData={data?.salesByCategory} />
            <BarAreaCharts isDark={isDark} isRtl={isRtl} isMounted={isMounted} data={data} />
        </>
    )
}

export default DashboardMain





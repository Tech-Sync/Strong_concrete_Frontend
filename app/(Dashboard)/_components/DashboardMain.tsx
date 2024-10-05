'use client'
import React, { Suspense, useEffect, useState } from 'react'
import BarAreaCharts from './BarAreaCharts'
import AreaDonutCharts from './AreaDonutCharts'
import DashboardStats from './DashboardStats'
import { getAllStatistics } from './dashboardAPI'
import { DashboardData } from '@/types/types'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { selectIsDarkMode, selectRtlClass } from '@/lib/features/themeConfig/themeConfigSlice'
import { initializeSocket, selectIsConnected, selectSocket, setActiveUsersState } from '@/lib/features/socket/socketSlice'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL || 'http://localhost:3000'


const DashboardMain = ({ data }: { data: DashboardData }) => {



    const isDark = useAppSelector(selectIsDarkMode)
    const isRtl = useAppSelector(selectRtlClass) === 'rtl' ? true : false;

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





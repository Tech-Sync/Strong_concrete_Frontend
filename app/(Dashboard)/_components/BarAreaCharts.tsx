'use client'
import Dropdown from '@/app/components/Layout/Dropdown';
import { DashboardData } from '@/types/types';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});


interface BarAreaChartsProps {
    isDark: boolean;
    isMounted: boolean;
    isRtl: boolean;
    data: DashboardData
}


const BarAreaCharts = ({ isDark, isMounted, isRtl, data }: BarAreaChartsProps) => {


    //Daily Sales
    const dailySales: any = {
        series: [
            {
                name: 'Sales',
                data: [ 4, 3, 5, 2, 6, 3],
            },
            {
                name: 'Last Week',
                data: [ 4, 6, 3, 5, 4, 4],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

    //Total Orders
    const totalOrders: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };

    return (
        <>
            <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <div className="panel h-full sm:col-span-2 xl:col-span-1">
                    <div className="mb-5 flex items-center">
                        <h5 className="text-lg font-semibold dark:text-white-light">
                            Daily Sales
                            <span className="block text-sm font-normal text-white-dark">Go to columns for details.</span>
                        </h5>
                        <div className="relative ltr:ml-auto rtl:mr-auto">
                            <div className="grid h-11 w-11 place-content-center rounded-full bg-[#ffeccb] text-warning dark:bg-warning dark:text-[#ffeccb]">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path
                                        d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="rounded-lg bg-white dark:bg-black">
                            {isMounted ? (
                                <ReactApexChart series={dailySales.series} options={dailySales.options} type="bar" height={160} width={'100%'} />
                            ) : (
                                <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                    <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="panel h-full">
                    <div className="mb-5 flex items-center justify-between dark:text-white-light">
                        <h5 className="text-lg font-semibold">Summary</h5>
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                button={
                                    <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                }
                            >
                                <ul>
                                    <li>
                                        <button type="button">View Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Edit Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Mark as Done</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="space-y-9">
                        <div className="flex items-center">
                            <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                <div className="grid h-9 w-9 place-content-center  rounded-full bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.74157 18.5545C4.94119 20 7.17389 20 11.6393 20H12.3605C16.8259 20 19.0586 20 20.2582 18.5545M3.74157 18.5545C2.54194 17.1091 2.9534 14.9146 3.77633 10.5257C4.36155 7.40452 4.65416 5.84393 5.76506 4.92196M3.74157 18.5545C3.74156 18.5545 3.74157 18.5545 3.74157 18.5545ZM20.2582 18.5545C21.4578 17.1091 21.0464 14.9146 20.2235 10.5257C19.6382 7.40452 19.3456 5.84393 18.2347 4.92196M20.2582 18.5545C20.2582 18.5545 20.2582 18.5545 20.2582 18.5545ZM18.2347 4.92196C17.1238 4 15.5361 4 12.3605 4H11.6393C8.46374 4 6.87596 4 5.76506 4.92196M18.2347 4.92196C18.2347 4.92196 18.2347 4.92196 18.2347 4.92196ZM5.76506 4.92196C5.76506 4.92196 5.76506 4.92196 5.76506 4.92196Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M9.1709 8C9.58273 9.16519 10.694 10 12.0002 10C13.3064 10 14.4177 9.16519 14.8295 8"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex font-semibold text-white-dark">
                                    <h6>Income</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto">K {data?.stats?.sale?.totalSale}</p>
                                </div>
                                <div className="h-2 rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                    <div className="h-full w-11/12 rounded-full bg-gradient-to-r from-[#7579ff] to-[#b224ef]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                <div className="grid h-9 w-9 place-content-center rounded-full bg-success-light text-success dark:bg-success dark:text-success-light">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.72848 16.1369C3.18295 14.5914 2.41018 13.8186 2.12264 12.816C1.83509 11.8134 2.08083 10.7485 2.57231 8.61875L2.85574 7.39057C3.26922 5.59881 3.47597 4.70292 4.08944 4.08944C4.70292 3.47597 5.59881 3.26922 7.39057 2.85574L8.61875 2.57231C10.7485 2.08083 11.8134 1.83509 12.816 2.12264C13.8186 2.41018 14.5914 3.18295 16.1369 4.72848L17.9665 6.55812C20.6555 9.24711 22 10.5916 22 12.2623C22 13.933 20.6555 15.2775 17.9665 17.9665C15.2775 20.6555 13.933 22 12.2623 22C10.5916 22 9.24711 20.6555 6.55812 17.9665L4.72848 16.1369Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <circle opacity="0.5" cx="8.60699" cy="8.87891" r="2" transform="rotate(-45 8.60699 8.87891)" stroke="currentColor" strokeWidth="1.5" />
                                        <path opacity="0.5" d="M11.5417 18.5L18.5208 11.5208" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex font-semibold text-white-dark">
                                    <h6>Profit</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto">$ {data?.stats?.profit?.totalProfit}</p>
                                </div>
                                <div className="h-2 w-full rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#3cba92] to-[#0ba360]" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                <div className="grid h-9 w-9 place-content-center rounded-full bg-warning-light text-warning dark:bg-warning dark:text-warning-light">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path opacity="0.5" d="M10 16H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M14 16H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M2 10L22 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex font-semibold text-white-dark">
                                    <h6>Expenses</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto">$ {data?.stats?.purchase?.totalPurchase}</p>
                                </div>
                                <div className="h-2 w-full rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#f09819] to-[#ff5858]" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="panel h-full p-0">
                    <div className="absolute flex w-full items-center justify-between p-5">
                        <div className="relative">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-success-light text-success dark:bg-success dark:text-success-light">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        opacity="0.5"
                                        d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        opacity="0.5"
                                        d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path opacity="0.5" d="M11 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path
                                        d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h5 className="text-2xl font-semibold ltr:text-right rtl:text-left dark:text-white-light">
                            {data?.stats?.sale?.SaleCount}
                            <span className="block text-sm font-normal">Total Orders</span>
                        </h5>
                    </div>
                    <div className="rounded-lg bg-transparent">
                        {/* loader */}
                        {isMounted ? (
                            <ReactApexChart series={totalOrders.series} options={totalOrders.options} type="area" height={290} width={'100%'} />
                        ) : (
                            <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BarAreaCharts;

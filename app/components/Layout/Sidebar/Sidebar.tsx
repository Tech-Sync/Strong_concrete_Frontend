'use client'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { selectThemeConfig, themeConfigSlice } from '@/lib/redux/slices/themeConfigSlice';
import { DashboardIcon,DoubleArrowIcon} from '@/app/icons'


const Sidebar = () => {
    const pathname: string = usePathname()
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector(selectThemeConfig)
    const semidark = themeConfig.semidark
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(themeConfigSlice.actions.toggleSidebar());
        }
    }, [pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();


    const routes = [
        {
            name: "Overview",
            path: '/',
            icon: <DashboardIcon />,
        },
        {
            name: "Order",
            path: '/order',
            icon: <DashboardIcon />,
        },
        {
            name: "Production",
            path: '/production',
            icon: <DashboardIcon />,
        },
        {
            name: "Delivery",
            path: '/delivery',
            icon: <DashboardIcon />,
        },
        {
            name: "Accounts",
            path: '/accounts',
            icon: <DashboardIcon />,
        },
        {
            name: "Vehicles",
            path: '/vehicles',
            icon: <DashboardIcon />,
        },
        {
            name: "Stocks",
            path: '/stocks',
            icon: <DashboardIcon />,
        },
        {
            name: "Users",
            path: '/users',
            icon: <DashboardIcon />,
        },
        {
            name: "Settings",
            path: '/settings',
            icon: <DashboardIcon />,
        },
        {
            name: "Purchases",
            path: '/purchases',
            icon: <DashboardIcon />,
        }



    ]


    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <Image className="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="logo" width={32} height={28} />
                            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">SC</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(themeConfigSlice.actions.toggleSidebar())}
                        >
                            <DoubleArrowIcon />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">


                            <li className="nav-item">
                                <ul>
                                    {routes.map(route => (

                                        <li className="nav-item" key={route.name}>
                                            <Link href={route.path} className="group">
                                                <div className="flex items-center">
                                                    {route.icon}
                                                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{route.name}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}

                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;

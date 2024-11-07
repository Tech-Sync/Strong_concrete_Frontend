'use client'
import PerfectScrollbar from 'react-perfect-scrollbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';
import { SideBarDoubleArrowIcon, SidebarFaqIcon, SidebarNotesIcon, SidebarTaskIcon, SiderbarDashboardIcon, SiderbarDeliveryIcon, SiderbarEmailIcon, SiderbarFirmIcon, SiderbarMaterialIcon, SiderbarProductIcon, SiderbarProductionIcon, SiderbarPurchaseIcon, SiderbarSaleIcon, SiderbarUserIcon, SiderbarVehicleIcon } from '@/app/icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectThemeConfig, toggleSidebar } from '@/lib/features/themeConfig/themeConfigSlice';



const Sidebar = () => {
    const pathname: string = usePathname()
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useAppSelector(selectThemeConfig)
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
            dispatch(toggleSidebar());
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

    const dispatch = useAppDispatch();


    const dashboardRoute = {
        name: "Overview",
        icon: <SiderbarDashboardIcon />,
        subMenu: [
            { name: 'Owerview', path: '/' },
            { name: 'Analytics', path: '/analytics' },
            { name: 'Finance', path: '/finance' },

        ]
    }

    const moduleRoutes = [

        {
            name: "Sales",
            icon: <SiderbarSaleIcon />,
            subMenu: [
                { name: 'Sale List', path: '/sales' },
                // { name: 'Sale Accounts', path: '/sales/accounts' },
            ]
        },
        {
            name: "Productions",
            path: '/productions',
            icon: <SiderbarProductionIcon />,
            subMenu: null

        },
        {
            name: "Deliveries",
            path: '/deliveries',
            icon: <SiderbarDeliveryIcon />,
            subMenu: null

        },
        {
            name: "Purchases",
            icon: <SiderbarPurchaseIcon />,
            subMenu: [
                { name: 'Purchase List', path: '/purchases' },
                { name: 'Purchase Accounts', path: '/purchases/accounts' },
            ]
        },
        {
            name: "Materials",
            path: '/materials',
            icon: <SiderbarMaterialIcon />,
            subMenu: null

        },
        {
            name: "Firms",
            path: '/firms',
            icon: <SiderbarFirmIcon />,
            subMenu: null

        },
        {
            name: "Products",
            path: '/products',
            icon: <SiderbarProductIcon />,
            subMenu: null

        },
        {
            name: "Vehicles",
            path: '/vehicles',
            icon: <SiderbarVehicleIcon />,
            subMenu: null
        },
        {
            name: "Users",
            path: '/users',
            icon: <SiderbarUserIcon />,
            subMenu: null

        },
    ]

    const appRoutes = [
        {
            name: "Inbox",
            icon: <SiderbarEmailIcon />,
            subMenu: [
                { name: 'Emails', path: '/emails' },
                { name: 'Chats', path: '/chats' },
                { name: 'Facebook', path: '/facebook' },
                { name: 'Instagram', path: '/instagram' },

            ]
        },
        {
            name: "Tasks",
            path: '/tasks',
            icon: <SidebarTaskIcon />,
            subMenu: null
        },
        {
            name: "Notes",
            path: '/notes',
            icon: <SidebarNotesIcon />,
            subMenu: null
        },
        {
            name: "FAQ",
            path: '/faq',
            icon: <SidebarFaqIcon />,
            subMenu: null
        },
        // {
        //     name: "Settings",
        //     path: '/settings',
        //     icon: <SiderbarDashboardIcon />,
        //     subMenu: null
        // },
    ]


    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <Image className="ml-[5px] w-8 flex-none" src="/assets/images/logo.png" alt="logo" width={32} height={28} />
                            <span className="align-middle text-xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">Strong Concrete</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <SideBarDoubleArrowIcon />
                        </button>
                    </div>
                    {/* SIDEBAR LINKS */}
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">

                            <li className="nav-item">
                                <ul>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === dashboardRoute.name ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu(dashboardRoute.name)}>
                                            <div className="flex items-center">
                                                {dashboardRoute.icon}
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light ">{dashboardRoute.name}</span>
                                            </div>

                                            <div className={currentMenu === dashboardRoute.name ? 'rotate-90' : 'rtl:rotate-180'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === dashboardRoute.name ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                {
                                                    dashboardRoute.subMenu.map((subRoute, i) => (
                                                        <li key={i}>
                                                            <Link href={subRoute.path}>{subRoute.name}</Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                        <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        <span>Modules</span>
                                    </h2>
                                    {moduleRoutes.map((route, i) => {
                                        return (
                                            route?.subMenu ?
                                                (<li className="menu nav-item" key={i}>
                                                    <button type="button" className={`${currentMenu === route.name ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu(route.name)}>
                                                        <div className="flex items-center">
                                                            {route.icon}
                                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light ">{route.name}</span>
                                                        </div>

                                                        <div className={currentMenu === route.name ? 'rotate-90' : 'rtl:rotate-180'}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </button>

                                                    <AnimateHeight duration={300} height={currentMenu === route.name ? 'auto' : 0}>
                                                        <ul className="sub-menu text-gray-500">
                                                            {
                                                                route.subMenu.map((subRoute, i) => (
                                                                    <li key={i}>
                                                                        <Link href={subRoute.path}>{subRoute.name}</Link>
                                                                    </li>
                                                                ))
                                                            }


                                                        </ul>
                                                    </AnimateHeight>
                                                </li>)
                                                :
                                                (<li className="nav-item" key={i}>
                                                    <Link href={route.path} className="group">
                                                        <div className="flex items-center">
                                                            {route.icon}
                                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{route.name}</span>
                                                        </div>
                                                    </Link>
                                                </li>)
                                        )
                                    })}
                                    <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                        <svg className="hidden h-5 w-4 flex-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                        <span>Apps</span>
                                    </h2>
                                    {appRoutes.map((route, i) => {
                                        return (
                                            route?.subMenu ?
                                                (<li className="menu nav-item" key={i}>
                                                    <button type="button" className={`${currentMenu === route.name ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu(route.name)}>
                                                        <div className="flex items-center">
                                                            {route.icon}
                                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-primary-light ">{route.name}</span>
                                                        </div>

                                                        <div className={currentMenu === route.name ? 'rotate-90' : 'rtl:rotate-180'}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </button>

                                                    <AnimateHeight duration={300} height={currentMenu === route.name ? 'auto' : 0}>
                                                        <ul className="sub-menu text-gray-500">
                                                            {
                                                                route.subMenu.map((subRoute, i) => (
                                                                    <li key={i}>
                                                                        <Link href={subRoute.path}>{subRoute.name}</Link>
                                                                    </li>
                                                                ))
                                                            }


                                                        </ul>
                                                    </AnimateHeight>
                                                </li>)
                                                :
                                                (<li className="nav-item" key={i}>
                                                    <Link href={route.path} className="group">
                                                        <div className="flex items-center">
                                                            {route.icon}
                                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{route.name}</span>
                                                        </div>
                                                    </Link>
                                                </li>)
                                        )
                                    })}

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

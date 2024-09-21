'use client'
// import { headers } from 'next/headers';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'

// interface BreadCrumbProps {
//     main: { title: string, url: string },
//     subTitle: { title: string, url: string },
//     miniTitle?: { title: string }
// }

// const BreadCrumb = ({ main, subTitle, miniTitle }: BreadCrumbProps) => {
const BreadCrumb = () => {

    const pathName = usePathname()

    const subbTitle = useMemo(() => pathName.split('/')[1] || '', [pathName]);
    const minititle = useMemo(() => pathName.split('/')[2] || '', [pathName]);

    return (
        <ol className="flex pl-1 text-gray-500 font-semibold dark:text-white-dark ">
            <li>
                <Link href='/' className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Dashboard</Link>
            </li>
            {
                subbTitle &&
                <li className="before:content-['/'] before:px-1.5 before:inline-block before:relative ">
                    <Link href={`/${subbTitle}`} className={`hover:text-gray-500/70 dark:hover:text-white-dark/70 ${!minititle && 'text-primary'}`}>{subbTitle.charAt(0).toUpperCase() + subbTitle.slice(1)}</Link>
                </li>
            }
            {
                minititle &&
                <li className="before:content-['/'] before:px-1.5 before:inline-block before:relative ">
                    <button className="text-primary  truncate ">{minititle.slice(0, 90)}</button>
                </li>
            }

        </ol>
    )
}

export default BreadCrumb
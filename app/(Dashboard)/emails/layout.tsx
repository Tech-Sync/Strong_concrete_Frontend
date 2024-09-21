import React, { ReactNode } from 'react'
import MailMain from './_components/MailMain';
import BreadCrumb from '@/app/components/common/BreadCrumb';

interface Props {
    readonly children: ReactNode;
}

export default function MailLayout({ children }: Props) {
    return (
        <div>
            <BreadCrumb />
            <MailMain>
                {children}
            </MailMain>
        </div>
    )
}

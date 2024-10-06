import Image from 'next/image'
import React from 'react'

export default function TasksPage() {
    return (
        <div className='w-full h-[calc(100vh-110px)]'>
            <Image src="/assets/images/undercons.jpg" alt="working on it" className="object-cover h-full w-full" width={500} height={500} />
        </div>
    )
}

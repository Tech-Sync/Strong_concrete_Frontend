import BreadCrumb from '@/app/components/common/BreadCrumb'
import React from 'react'
import ChatMain from './_components/ChatMain'
import { getAllChats } from '@/lib/features/chat/chatActions'
import { PhoneChatIcon, StartChatIcon } from './_components/ChatIcons'

export default async function ChatPage() {

    const chats = await getAllChats()

    return (
        <>
            {/* <BreadCrumb /> */}

            <div className="relative flex h-full items-center justify-center p-4">
                {/* <button type="button" onClick={() => setIsShowChatMenu(!isShowChatMenu)} className="absolute top-4 hover:text-primary ltr:left-4 rtl:right-4 xl:hidden">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button> */}
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="mb-8 h-[calc(100vh_-_320px)] min-h-[120px] w-[280px] text-white dark:text-black md:w-[430px]">
                        <PhoneChatIcon />
                    </div>
                    <p className="mx-auto flex max-w-[190px] justify-center rounded-md bg-white-dark/20 p-2 font-semibold">
                        <StartChatIcon />
                        Click User To Chat
                    </p>
                </div>
            </div>


        </>
    )
}

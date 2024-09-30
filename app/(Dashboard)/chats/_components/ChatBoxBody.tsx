'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ChatBoxSmileIcon } from './ChatIcons';
import ChatBoxBottom from './ChatBoxBottom';
import { Message } from '@/types/types';


const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;


export default function ChatBoxBody({ chatboxData, receiver }: { chatboxData: any, receiver: any }) {

    const { messages, selectedChat } = chatboxData
    const [chatMessages, setChatMessages] = useState<Message[]>(messages)
    const { userInfo } = useCurrentUser()


    return (
        <>
            <PerfectScrollbar className="chat-conversation-box relative h-full sm:h-[calc(100vh_-_300px)]">
                <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                    <div className="m-6 mt-0 block">
                        <h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
                            <span className="relative top-2 bg-white px-3 dark:bg-black">{'Today, ' + selectedChat?.updatedAt}</span>
                        </h4>
                    </div>
                    {chatMessages && chatMessages?.length > 0 ? (
                        <>
                            {chatMessages?.map((message: any) => {
                                return (
                                    <div key={message.id}>
                                        <div className={`flex items-start gap-3 ${userInfo?.id === message.senderId ? 'justify-end' : ''}`}>
                                            <div className={`flex-none ${userInfo?.id === message.senderId ? 'order-2' : ''}`}>
                                                {userInfo?.id === message.senderId ? (<Image height={40} width={40} src={`${BASE_URL}/image/${userInfo?.profilePic}`} className="rounded-full object-cover" alt="" />) : ('')}
                                                {userInfo?.id !== message.senderId ? (<Image width={40} height={40} src={`${BASE_URL}/image/${receiver?.profilePic}`} className="rounded-full object-cover" alt="" />) : ('')}
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${message.senderId === userInfo?.id ? '!bg-primary text-white rounded-br-none' : 'rounded-bl-none '}`}>
                                                        {message.content}
                                                    </div>
                                                    <div className={`${userInfo?.id === message.senderId ? 'hidden' : ''}`}>
                                                        <ChatBoxSmileIcon />
                                                    </div>
                                                </div>
                                                <div className={`text-xs text-white-dark ${userInfo?.id === message.senderId ? 'ltr:text-right rtl:text-left' : ''}`}>
                                                    {message.createdAt ? message.createdAt.toString() : '5h ago'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : ('')}
                </div>
            </PerfectScrollbar>
            <div className="absolute bottom-0 left-0 w-full p-4">
                <ChatBoxBottom receiver={receiver} selectedChat={selectedChat} setChatMessages={(msg: Message) => setChatMessages([...chatMessages, msg])} />
            </div>
        </>

    )
}

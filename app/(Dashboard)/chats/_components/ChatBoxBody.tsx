'use client'
import React from 'react'
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ChatBoxSmileIcon } from './ChatIcons';


const selectedChat = {
    "id": 2,
    "latestMessageId": 1,
    "chatName": null,
    "chatPicture": null,
    "isGroupChat": false,
    "createdAt": "2024-09-27T16:02:08.591Z",
    "updatedAt": "2024-09-27T16:02:08.599Z",
    "deletedAt": null,
    "groupAdminId": null,
    "chatUsers": [
        {
            "id": 1,
            "firstName": "Admin",
            "lastName": "Admin",
            "email": "admin@gmail.com",
            "profilePic": "profile-1.jpeg",
            "phoneNo": "0971234567",
            "role": 5
        },
        {
            "id": 2,
            "firstName": "Kabwe",
            "lastName": "Mumba",
            "email": "kabwe.mumba1@gmail.com",
            "profilePic": "profile-2.jpeg",
            "phoneNo": "0971234562",
            "role": 1
        }
    ],
    "latestMessage": {
        "id": 1,
        "content": "hi",
        "createdAt": "2024-09-27T16:02:08.596Z",
        "updatedAt": "2024-09-27T16:02:08.596Z",
        "deletedAt": null,
        "chatId": 2,
        "senderId": 1
    },
    "groupAdmin": null
}

const messages = [
    {
        "id": 1,
        "content": "hi",
        "createdAt": "2024-09-27T16:02:08.596Z",
        "updatedAt": "2024-09-27T16:02:08.596Z",
        "deletedAt": null,
        "chatId": 2,
        "senderId": 1
    }
]

export default function ChatBoxBody() {
    const { userInfo } = useCurrentUser()
    return (
        <PerfectScrollbar className="chat-conversation-box relative h-full sm:h-[calc(100vh_-_300px)]">
            <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                <div className="m-6 mt-0 block">
                    <h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
                        <span className="relative top-2 bg-white px-3 dark:bg-black">{'Today, ' + selectedChat.updatedAt}</span>
                    </h4>
                </div>
                {messages && messages.length ? (
                    <>
                        {messages.map((message) => {
                            return (
                                <div key={message.id}>
                                    <div className={`flex items-start gap-3 ${userInfo?.id === message.senderId ? 'justify-end' : ''}`}>
                                        <div className={`flex-none ${userInfo?.id === message.senderId ? 'order-2' : ''}`}>
                                            {userInfo?.id === message.senderId ? (<Image height={40} width={40} src="/assets/images/onelife-logo.png" className="rounded-full object-cover" alt="" />) : ('')}
                                            {/* {userInfo?.id !== message.senderId ? (<Image width={40} height={40} src={`/assets/images/${receiver?.profilePic}`} className="rounded-full object-cover" alt="" />) : ('')} */}
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
    )
}

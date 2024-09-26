'use client'
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Chat } from '@/types/types';
import { formatDate } from '@/utils/helperFunctions';
import Image from 'next/image';
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';

interface ChatListProps {
    filteredItems: Chat[];
    selectUser: (chat: any) => void;
    selectedChat: any;

}

const ChatList = ({ filteredItems, selectUser, selectedChat }: ChatListProps) => {
    const { userInfo } = useCurrentUser()

    return (
        <div className="!mt-0">
            <PerfectScrollbar className="chat-users relative -mr-3.5 h-full min-h-[100px] space-y-0.5 pr-3.5 sm:h-[calc(100vh_-_357px)]">
                {filteredItems.map((chat: Chat, i: number) => {
                    // @ts-ignore
                    const member = chat.chatUsers.filter((member: any) => member.id !== userInfo?.user_id);
                    return (
                        <div key={chat.id}>
                            <button
                                type="button"
                                className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${selectedChat && selectedChat.id === chat.id ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''
                                    }`}
                                onClick={() => { selectUser(chat) }}
                            >

                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <div className="relative flex-shrink-0">
                                            <Image width={48} height={48} src={`/assets/images/${member[0].profilePic}`} className="h-12 w-12 rounded-full object-cover" alt="" />
                                            <div>
                                                <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                                    <div className="h-4 w-4 rounded-full bg-success"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mx-3 ltr:text-left rtl:text-right">
                                            {
                                                chat.isGroupChat
                                                    ? <p className="mb-1 font-semibold">{chat.chatName}</p>
                                                    : <p className="mb-1 font-semibold">{member[0].firstName} {member[0].lastName}</p>

                                            }
                                            <p className="max-w-[185px] truncate text-xs text-white-dark">{chat.latestMessage?.content}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="whitespace-nowrap text-xs font-semibold">
                                    <p>{chat.latestMessage && formatDate(chat?.latestMessage.createdAt)}</p>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </PerfectScrollbar >
        </div >
    )
}

export default ChatList
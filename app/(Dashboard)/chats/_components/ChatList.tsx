'use client'
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Chat } from '@/types/types';
import { formatDate } from '@/utils/helperFunctions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useParams } from 'next/navigation';
import GroupModal from './GroupModal';
import { useAppSelector } from '@/lib/hooks';
import { selectActiveUsers } from '@/lib/features/user/userSlice';

interface ChatListProps {
    filteredItems: Chat[];
    selectUser: (chat: any) => void;
    // activeUsers: any[]
}

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const ChatList = ({ filteredItems, selectUser }: ChatListProps) => {

    const { userInfo } = useCurrentUser()
    const navigate = useRouter()
    const params = useParams();
    
    const activeUsers = useAppSelector(selectActiveUsers)
    const [searchQuery, setSearchQuery] = useState('')
    const [groupModal, setGroupModal] = useState(false);


    return (
        <PerfectScrollbar className="chat-users relative -mr-3.5 h-full min-h-[100px] space-y-0.5 pb-5 pr-3.5 sm:h-[calc(100vh_-_357px)]">
            {
                filteredItems.length === 0 ? (
                    <div className=" relative flex items-center justify-center h-full">
                        <p className="text-gray-400 dark:text-gray-500">No Chat found</p>
                        <button className='btn btn-primary btn-sm text-base absolute bottom-0 right-0' onClick={() => setGroupModal(!groupModal)}>+</button>
                    </div>
                ) : (
                    <div className='flex gap-x-2 mb-3'>
                        <div className="relative flex-1">
                            <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                    <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                </svg>
                            </div>
                        </div>
                        {filteredItems[0].isGroupChat && (<button className='btn btn-primary btn-sm text-base' onClick={() => setGroupModal(!groupModal)}>+</button>)}
                    </div>

                )
            }
            {filteredItems.map((chat: Chat, i: number) => {
                const member = chat.chatUsers.find((member: any) => member.id !== userInfo?.id);
                return (
                    <button
                        onClick={() => { selectUser(chat); navigate.push(`/chats/${chat.id}`) }}
                        className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${params?.chatId && Number(params?.chatId) === chat.id ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''}`}
                        key={chat.id}
                        type="button"
                    >
                        <div className="flex-1">
                            <div className="flex items-center">
                                <div className="relative flex-shrink-0">
                                    <Image className="rounded-full object-cover" width={48} height={48}
                                        src={`${chat.isGroupChat ? `${BASE_URL}/image/${chat.chatPicture}` : `${BASE_URL}/image/${member?.profilePic || '/assets/images/profile.png'}`}`} alt="" />
                                    {
                                        !chat.isGroupChat && activeUsers.some(user => user.userId === member?.id) && (
                                            <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                                <div className="size-3 rounded-full bg-success"></div>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="mx-3 ltr:text-left rtl:text-right">
                                    {
                                        chat.isGroupChat
                                            ? <p className="mb-1 font-semibold">{chat.chatName}</p>
                                            : <p className="mb-1 font-semibold">{member?.firstName} {member?.lastName}</p>

                                    }
                                    <p className="max-w-[185px] truncate text-xs text-white-dark">{chat.latestMessage?.content}</p>
                                </div>
                            </div>
                        </div>
                        <div className="whitespace-nowrap text-xs ">
                            <p>{chat.latestMessage && formatDate(chat?.latestMessage.createdAt)}</p>
                        </div>
                    </button>
                );
            })}
            <GroupModal isOpen={groupModal} onClose={() => setGroupModal(false)} />
        </PerfectScrollbar >
    )
}

export default ChatList
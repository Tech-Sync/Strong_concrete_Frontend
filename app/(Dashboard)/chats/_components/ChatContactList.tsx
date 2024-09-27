'use client'
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { getAllUserAsync, selectUsers } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Chat, User } from '@/types/types';
import { formatDate } from '@/utils/helperFunctions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';

interface ChatListProps {
    selectUser: (user: any) => void;
    selectedChat: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;


const ChatContactList = ({ selectUser, selectedChat }: ChatListProps) => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectUsers)

    useEffect(() => {
        dispatch(getAllUserAsync({}))
    }, [dispatch])



    const [filteredItems, setfilteredItems] = useState(users)




    return (
        <>
            {
                filteredItems.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 dark:text-gray-500">No user found</p>
                    </div>
                )
            }
            {
                filteredItems[0]?.role ? (
                    <PerfectScrollbar className="user-users relative -mr-3.5 h-full min-h-[100px] space-y-0.5 pb-5 pr-3.5 sm:h-[calc(100vh_-_357px)]">
                        {/* <div className="relative">
                            <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." />
                            <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                    <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                </svg>
                            </div>
                        </div> */}
                        {filteredItems.map((user: User, i: number) => {
                            return (
                                <button
                                    key={user.id}
                                    className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${selectedChat && selectedChat.id === user.id ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''}`}
                                    type="button"
                                // onClick={() => { selectUser(user) }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0">
                                            <Image
                                                alt='userProfile'
                                                width={48} height={48}
                                                className="rounded-full object-cover"
                                                src={`${BASE_URL}/image/${user?.profilePic || '/assets/images/profile.png'}`} />
                                        </div>
                                        <div className="mx-3 ltr:text-left rtl:text-right">
                                            <p className="mb-1 font-semibold">{user?.firstName} {user?.lastName}</p>

                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </PerfectScrollbar >
                ) : ('')
            }
        </>

    )
}

export default ChatContactList
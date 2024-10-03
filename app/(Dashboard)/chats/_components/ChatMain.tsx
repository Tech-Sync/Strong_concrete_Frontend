'use client'
import { useState, useEffect } from 'react';
import Dropdown from '@/app/components/Layout/Dropdown';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import ChatList from './ChatList';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AllChatsIcon, ContactIcon, GroupChatIcon, HelpIcon, SettingIcon, SignOutIcon, SingleChatIcon } from './ChatIcons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchAllChatsAsync, selectChats, selectChatStates, setIsShowChatMenu, } from '@/lib/features/chat/chatSlice';
import { Chat } from '@/types/types';
import { coloredToast } from '@/utils/sweetAlerts';
import ChatContactList from './ChatContactList';
import { getAllUserAsync } from '@/lib/features/user/userSlice';

const Tabs = [
    { name: 'All', icon: <AllChatsIcon /> },
    { name: 'Chats', icon: <SingleChatIcon /> },
    { name: 'Groups', icon: <GroupChatIcon /> },
    { name: 'Contacts', icon: <ContactIcon /> },
]

const ChatMain = ({ children }: { children: React.ReactNode; }) => {
    
    const dispatch = useAppDispatch()
    const { userInfo } = useCurrentUser()
    const chats = useAppSelector(selectChats)
    const { status, error, isShowChatMenu } = useAppSelector(selectChatStates)


    const [searchUser, setSearchUser] = useState('');
    const [filteredItems, setFilteredItems] = useState<Chat[] | any>([]);

    //? CUSTOM HOOK
    const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;


    useEffect(() => {
        dispatch(fetchAllChatsAsync({}))
        dispatch(getAllUserAsync({}))
    }, [dispatch])

    useEffect(() => {
        if (error) {
            coloredToast('danger', error);
        }
    }, [error]);


    useEffect(() => {
        setFilteredItems(chats);
    }, [chats]);


    useEffect(() => {
        setFilteredItems(() => {
            return chats.filter((chat: any) => {

                const searchTerm = searchUser.toLowerCase();

                let isChatNameMatch;
                if (chat.chatName) {
                    isChatNameMatch = chat.chatName ? chat.chatName.toLowerCase().includes(searchTerm) : false;
                }

                const isMemberMatch = chat.chatUsers?.some((member: any) => {
                    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
                    const email = member.email ? member.email.toLowerCase() : '';

                    return fullName.includes(searchTerm) || email.includes(searchTerm);
                });

                return isChatNameMatch || isMemberMatch;
            });
        });

    }, [searchUser, chats]);



    const selectUser = (chat: Chat) => {
        // setSelectedChat(chat);
        // setIsShowUserChat(true);
        dispatch(setIsShowChatMenu(false))
    };

    const handleTab = (type: string) => {
        switch (type) {
            case 'All':
                setFilteredItems(chats);
                break;
            case 'Chats':
                setFilteredItems(chats.filter((chat) => chat.isGroupChat === false));
                break;
            case 'Groups':
                setFilteredItems(chats.filter((chat) => chat.isGroupChat === true));
                break;
            default:
                break;
        }
    };

    return (
        <div className={`mt-5 relative flex h-full gap-5 sm:h-[calc(100vh_-_160px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
            <div className={`panel absolute z-10 hidden w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block xl:h-full ${isShowChatMenu ? '!block' : ''}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-none">
                            <Image width={48} height={48}
                                src={`${BASE_URL}/image/${userInfo?.profilePic || '/assets/images/profile.png'}`}
                                className="rounded-full object-cover" alt="" />
                        </div>
                        <div className="mx-3">
                            <p className="mb-1 font-semibold">{userInfo?.firstName} {userInfo?.lastName}</p>
                            <p className="text-xs text-white-dark">--------------</p>
                        </div>
                    </div>
                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement={'bottom-end'}
                            btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center hover:text-primary"
                            button={<svg className="opacity-70" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>}>
                            <ul className="whitespace-nowrap">
                                <li>
                                    <button type="button">
                                        <SettingIcon />
                                        Settings
                                    </button>
                                </li>
                                <li>
                                    <button type="button">
                                        <HelpIcon />
                                        Help & feedback
                                    </button>
                                </li>
                                {/* <li>
                                    <button type="button">
                                        <SignOutIcon />
                                        Sign Out
                                    </button>
                                </li> */}
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />
                <Tab.Group>
                    <Tab.List className="flex items-center justify-between text-xs">
                        {Tabs.map((tab, i) => (
                            <Tab as={Fragment} key={i}>
                                {({ selected }) => (
                                    <button onClick={() => handleTab(tab.name)} type="button" className={`${selected ? 'text-primary' : 'hover:text-primary'}`}>
                                        {tab.icon}
                                        {tab.name}
                                    </button>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>
                    {filteredItems.length === 0 && (<div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />)}
                    <Tab.Panels>
                        <Tab.Panel>
                            <ChatList selectUser={selectUser} filteredItems={filteredItems} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ChatList selectUser={selectUser} filteredItems={filteredItems} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ChatList selectUser={selectUser} filteredItems={filteredItems} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ChatContactList selectUser={selectUser} />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

            </div>
            <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/10 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => dispatch(setIsShowChatMenu(!isShowChatMenu))}></div>

            <div className="panel flex-1 p-0">
                {children}
            </div>
        </div>

    );
};

export default ChatMain;
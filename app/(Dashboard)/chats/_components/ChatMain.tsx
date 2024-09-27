'use client'
import { useState, useEffect, Children } from 'react';
import Dropdown from '@/app/components/Layout/Dropdown';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { CallsIcon, ChatsIcon, ContactIcon, HelpIcon, NotiIcon, PhoneChatIcon, SettingIcon, SignOutIcon, StartChatIcon } from './ChatIcons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchAllChatsAsync, selectChats, selectChatStates, setChats } from '@/lib/features/chat/chatSlice';
import { Chat } from '@/types/types';
import { coloredToast } from '@/utils/sweetAlerts';
import { useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { selectIsDarkMode } from '@/lib/features/themeConfig/themeConfigSlice';
import ChatContactList from './ChatContactList';
import { getAllUserAsync, selectUsers } from '@/lib/features/user/userSlice';


type ChatMainProps = {
    chatTitle: string;
    image: string;
    chats: Chat[];
};

const Tabs = [
    { name: 'All', icon: <ChatsIcon /> },
    { name: 'Chats', icon: <CallsIcon /> },
    { name: 'Groups', icon: <NotiIcon /> },
    { name: 'Contacts', icon: <ContactIcon /> },
]

const ChatMain = ({ children }: { children: React.ReactNode; }) => {
    const dispatch = useAppDispatch()

    const { userInfo } = useCurrentUser()
    const { status, error } = useAppSelector(selectChatStates)
    const chats = useAppSelector(selectChats)

    const [isShowChatMenu, setIsShowChatMenu] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [isShowUserChat, setIsShowUserChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [filteredItems, setFilteredItems] = useState<Chat[] | any>([]);

    useEffect(() => {
        dispatch(fetchAllChatsAsync({}))
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


                // if (chat.role) {
                //     const isUserMatch = chat.firstName.toLowerCase().includes(searchTerm) || chat.lastName.toLowerCase().includes(searchTerm);
                //     console.log(isUserMatch);
                //     return isUserMatch;
                // }

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

    const scrollToBottom = () => {
        if (isShowUserChat) {
            setTimeout(() => {
                const element: any = document.querySelector('.chat-conversation-box');
                element.behavior = 'smooth';
                element.scrollTop = element.scrollHeight;
            });
        }
    };

    const selectUser = (chat: Chat) => {
        setSelectedChat(chat);
        setIsShowUserChat(true);
        scrollToBottom();
        setIsShowChatMenu(false);
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
                            <Image width={48} height={48} src="/assets/images/profile-1.jpeg" className="rounded-full object-cover" alt="" />
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
                            button={
                                <svg className="opacity-70" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            }
                        >
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
                                <li>
                                    <button type="button">
                                        <SignOutIcon />
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                {/* <div className="relative">
                    <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
                    <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </div>
                </div> */}
                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />

                <Tab.Group>
                    <Tab.List className="flex items-center justify-between text-xs">
                        {
                            Tabs.map((tab, i) => (
                                <Tab as={Fragment} key={i}>
                                    {({ selected }) => (
                                        <button onClick={() => handleTab(tab.name)} type="button" className={`${selected ? 'text-primary' : 'hover:text-primary'}`}>
                                            {tab.icon}
                                            {tab.name}
                                        </button>
                                    )}
                                </Tab>
                            ))
                        }
                    </Tab.List>
                    {filteredItems.length === 0 && (<div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />)}

                    <Tab.Panels>
                        <Tab.Panel>
                            <ChatList selectUser={selectUser} selectedChat={selectedChat} filteredItems={filteredItems} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ChatList selectUser={selectUser} selectedChat={selectedChat} filteredItems={filteredItems} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ChatList selectUser={selectUser} selectedChat={selectedChat} filteredItems={filteredItems} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ChatContactList selectUser={selectUser} selectedChat={selectedChat} />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

            </div>
            <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/10 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)}></div>

            {/* <div className="panel flex-1 p-0">
                {!isShowUserChat && (
                    <div className="relative flex h-full items-center justify-center p-4">
                        <button type="button" onClick={() => setIsShowChatMenu(!isShowChatMenu)} className="absolute top-4 hover:text-primary ltr:left-4 rtl:right-4 xl:hidden">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="mb-8 h-[calc(100vh_-_320px)] min-h-[120px] w-[280px] text-white dark:text-black md:w-[430px]">
                                <PhoneChatIcon isDark={isDark} />
                            </div>
                            <p className="mx-auto flex max-w-[190px] justify-center rounded-md bg-white-dark/20 p-2 font-semibold">
                                <StartChatIcon />
                                Click User To Chat
                            </p>
                        </div>
                    </div>
                )}
                {isShowUserChat && selectedChat ? (
                    <ChatBox
                        setIsShowChatMenu={setIsShowChatMenu}
                        isShowChatMenu={isShowChatMenu}
                        selectedChat={selectedChat}
                        scrollToBottom={scrollToBottom}
                        setFilteredItems={setFilteredItems}
                        chats={chats} />
                ) : (
                    ''
                )}
            </div> */}

            <div className="panel flex-1 p-0">
                {children}
            </div>
        </div>

    );
};

export default ChatMain;
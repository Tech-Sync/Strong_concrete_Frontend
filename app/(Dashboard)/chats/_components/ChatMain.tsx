'use client'
import { useState, useEffect, Children } from 'react';
import Dropdown from '@/app/components/Layout/Dropdown';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import WpChatList from './ChatList';
import WpChatBox from './ChatBox';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { CallsIcon, ChatsIcon, ContactIcon, NotiIcon, PhoneChatIcon, SettingIcon, SignOutIcon, StartChatIcon } from './ChatIcons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchAllChatsAsync, selectChats, selectChatStates, setChats } from '@/lib/features/chat/chatSlice';
import { Chat } from '@/types/types';
import { coloredToast } from '@/utils/sweetAlerts';
import { useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { selectIsDarkMode } from '@/lib/features/themeConfig/themeConfigSlice';


type ChatMainProps = {
    chatTitle: string;
    image: string;
    chats: Chat[];
};

const ChatMain = ({ chatTitle, image, chats }: ChatMainProps) => {
    const { userInfo } = useCurrentUser()
    const dispatch = useAppDispatch()
    const { status, error } = useAppSelector(selectChatStates)

    const [isShowChatMenu, setIsShowChatMenu] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [isShowUserChat, setIsShowUserChat] = useState(false);
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [filteredItems, setFilteredItems] = useState<Chat[]>(chats);
    const isDark = useAppSelector(selectIsDarkMode)

    useEffect(() => {
        dispatch(setChats(chats))
    }, [])

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
                    // Check if chatName matches the search term
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
    const selectUser = (user: any) => {
        setSelectedChat(user);
        setIsShowUserChat(true);
        scrollToBottom();
        setIsShowChatMenu(false);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className={`mt-5 relative flex h-full gap-5 sm:h-[calc(100vh_-_160px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
            <div className={`panel absolute z-10 hidden w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block xl:h-full ${isShowChatMenu ? '!block' : ''}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-none">
                            <img src="/assets/images/profile-34.jpeg" className="h-12 w-12 rounded-full object-cover" alt="" />
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
                                        <svg className="ltr:mr-1 rtl:ml-1" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                            <path
                                                d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                            <circle cx="12" cy="16" r="1" fill="currentColor" />
                                        </svg>
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
                <div className="relative">
                    <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
                    <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </div>
                </div>
                <Tab.Group>
                    <Tab.List className="flex items-center justify-between text-xs">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button type="button" className={`${selected ? 'text-primary' : 'hover:text-primary'}`}>
                                    <ChatsIcon />
                                    Chats
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button type="button" className={`${selected ? 'text-primary' : 'hover:text-primary'}`}>
                                    <CallsIcon />
                                    Calls
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button type="button" className={`${selected ? 'text-primary' : 'hover:text-primary'}`}>
                                    <ContactIcon />
                                    Contacts
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button type="button" className={`${selected ? 'text-primary' : 'hover:text-primary'}`}>
                                    <NotiIcon />
                                    Notification
                                </button>
                            )}
                        </Tab>
                        {/* <Tab className="pointer-events-none -mb-[1px] block p-3.5 py-2 text-white-light outline-none dark:text-dark">Disabled</Tab> */}
                    </Tab.List>
                    <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                    <Tab.Panels>
                        <Tab.Panel>
                            <WpChatList selectUser={selectUser} selectedChat={selectedChat} filteredItems={filteredItems} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>1</div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>2</div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

            </div>
            <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/10 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)}></div>
            <div className="panel flex-1 p-0">
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
                    <WpChatBox
                        setIsShowChatMenu={setIsShowChatMenu}
                        isShowChatMenu={isShowChatMenu}
                        selectedChat={selectedChat}
                        scrollToBottom={scrollToBottom}
                        setFilteredItems={setFilteredItems}
                        chatRooms={chats} />
                ) : (
                    ''
                )}
            </div>
        </div>
    
    );
};

export default ChatMain;
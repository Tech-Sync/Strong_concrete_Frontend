import { MessageNoDataAvaibleIcon, MessagesCloseIcon, MessagesIcon, NotificationCongratulationsIcon, NotificationInfo, NotificationSomeThingWrong, NotificationWarning, ViewAllActivityIcon } from '@/app/icons';
import React, { useState } from 'react'
import Dropdown from '../Dropdown';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { removeFromMessageState, selectMessages } from '@/lib/features/notification/notificationSlice';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/helperFunctions';
import { MessageNotification } from '@/types/types';
import { Span } from 'next/dist/trace';

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;


const NavbarMessagesDrop = () => {

  // const [messages, setMessages] = useState([
  //   {
  //     id: 1,
  //     image: <NotificationCongratulationsIcon />,
  //     title: 'Congratulations!',
  //     message: 'Your OS has been updated.',
  //     time: '1hr',
  //   },
  //   {
  //     id: 2,
  //     image: <NotificationInfo />,
  //     title: 'Did you know?',
  //     message: 'You can switch between artboards.',
  //     time: '2hr',
  //   },
  //   {
  //     id: 3,
  //     image: <NotificationSomeThingWrong />,
  //     title: 'Something went wrong!',
  //     message: 'Send Reposrt',
  //     time: '2days',
  //   },
  //   {
  //     id: 4,
  //     image: <NotificationWarning />,
  //     title: 'Warning',
  //     message: 'Your password strength is low.',
  //     time: '5days',
  //   },
  // ]);

  const navigate = useRouter()
  const dispatch = useAppDispatch()
  const messages = useAppSelector(selectMessages)

  const handleRemoveMsg = (e: any, msgId: number) => {
    e.stopPropagation()
    dispatch(removeFromMessageState(msgId))
  };

  const handleNavigateMsg = (e: any, message: MessageNotification) => {
    navigate.push(`/chats/${message.chatId}`)
    dispatch(removeFromMessageState(message.id))
  }


  return (
    <div className="dropdown shrink-0">
      <Dropdown
        offset={[0, 8]}
        placement='bottom-end'
        btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
        button={
          <>
            <MessagesIcon />
            {messages.length > 0 && <span className="badge absolute ltr:right-0 rtl:left-0 -top-3 bg-success px-1 py-0   rounded-full ">{messages.length}</span>}

          </>

        }
      >
        <ul className="w-[300px] !py-0 text-xs text-dark dark:text-white-dark sm:w-[375px]">
          <li className="mb-5" onClick={(e) => e.stopPropagation()}>
            <div className="relative !h-[68px] w-full overflow-hidden rounded-t-md p-5 text-white hover:!bg-transparent">
              <div className="bg- absolute inset-0 h-full w-full bg-[url(/assets/images/menu-heade.jpg)] bg-cover bg-center bg-no-repeat"></div>
              <h4 className="relative z-10 text-lg font-semibold">Messages</h4>
            </div>
          </li>
          {messages.length > 0 ? (
            <>
              {messages?.map((message) => {
                return (
                  <li key={message.id} className="dark:text-white-light/90 cursor-pointer" onClick={(e) => handleNavigateMsg(e, message)}>
                    <div className="group flex items-center px-4 py-2">
                      <div className="grid place-content-center rounded">
                        <div className="relative h-12 w-12">
                          <Image
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full object-cover"
                            alt="profile"
                            src={`${message.isGroupChat ? `${BASE_URL}/image/${message.chatPicture}` : `${BASE_URL}/image/${message?.sender.profilePic || '/assets/images/profile.png'}`}`} />
                        </div>
                      </div>
                      <div className="flex flex-auto ltr:pl-3 rtl:pr-3">
                        <div className="ltr:pr-3 rtl:pl-3">
                          <h6>
                            <strong className="text-sm mr-1">{message.isGroupChat ? message.chatName : message.sender.firstName + ' ' + message.sender.lastName}</strong>texted <strong>{message.content}</strong>
                          </h6>
                          <span className="block text-xs font-normal dark:text-gray-500">{formatDate(message.createdAt)}</span>
                        </div>
                        <button
                          type="button"
                          className="text-neutral-300 opacity-0 hover:text-danger group-hover:opacity-100 ltr:ml-auto rtl:mr-auto"
                          onClick={(e) => { handleRemoveMsg(e, message.id) }}
                        >
                          <MessagesCloseIcon />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="mt-5 border-t border-white-light text-center dark:border-white/10">
                <button type="button" className="group !h-[48px] justify-center !py-4 font-semibold text-primary dark:text-gray-400">
                  <span className="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL MESSAGES</span>
                  <ViewAllActivityIcon />
                </button>
              </li>
            </>
          ) : (
            <li className="mb-5" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent">
                <div className="mx-auto mb-4 rounded-full text-white ring-4 ring-primary/30">
                  <MessageNoDataAvaibleIcon />
                </div>
                No message available.
              </button>
            </li>
          )}
        </ul>
      </Dropdown>
    </div>
  )
}

export default NavbarMessagesDrop
import BreadCrumb from '@/app/components/common/BreadCrumb'
import React from 'react'
import ChatMain from './_components/ChatMain'
import { getAllChats } from '@/lib/features/chat/chatActions'

export default async function ChatPage() {

    const chats = await getAllChats()

    return (
        <>
            <BreadCrumb />
            <ChatMain
                chatTitle={'WhatsApp'}
                image={'whatsapp'}
                chats={chats}
            />
        </>
    )
}

import ChatMain from "./_components/ChatMain";

export default async function ChatLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <ChatMain>
            {children}
        </ChatMain>
    );
}

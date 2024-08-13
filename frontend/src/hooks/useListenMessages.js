import { useEffect } from "react";
import useGetMessages from "./useGetConversation";
import { useSocketContext } from "@/context/SocketContext";


const useListenMessages = () => {
    const {socket} = useSocketContext();

    const {messages, setMessages} = useGetMessages();

    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage])
        })

        return () => socket.off("new Message")
    }, [socket, setMessages, messages])


}

export default useListenMessages
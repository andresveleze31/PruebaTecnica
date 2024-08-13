import { useEffect, useState } from "react";

const useGetMessages = () => {
  const roomId = "66bb86eb2ec33e5ae2838e9d";
  const [messages, setMessages] = useState([]);
  const getMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${roomId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        toast({
          title: "No existe room",
          description: data.error,
        });
        return;
      }

      setMessages(data);
    } catch (error) {}
    setTimeout(() => {
        getMessages();
    }, 2000)
  };
  useEffect(() => {
    
    getMessages();
  }, []);

  return {messages, setMessages, getMessages}
};

export default useGetMessages;

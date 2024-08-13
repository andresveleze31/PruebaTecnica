import LogoutButton from "@/components/LogoutButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthContext } from "@/context/AuthContext";
import useGetMessages from "@/hooks/useGetConversation";
import useListenMessages from "@/hooks/useListenMessages";
import useSendMessage from "@/hooks/useSendMessage";
import { Send } from "lucide-react";
import React, { useState } from "react";

const Home = () => {
  const { messages, getMessages } = useGetMessages();
  const { authUser } = useAuthContext();
  const [message, setMessage] = useState("");
 const {sendmessage} = useSendMessage();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!message) return;

    await sendmessage(message);
    setMessage("");
    getMessages();
  }
  return (
    <main className="">
      <div className="container flex justify-between py-5 border-b ">
        <LogoutButton />
      </div>

      <div className="container grid md:grid-cols-[2fr,1fr] gap-32 md:gap-0 ">
        <div className="h-[calc(100vh - 100px)] border-r pt-5 pr-5 ">
          <h2 className="text-2xl font-bold">
            Sesion 5 - Clase: Programacion Avanzada
          </h2>

          <AspectRatio ratio={16 / 9} className="bg-muted pt-5">
            <iframe
              src={`https://www.youtube.com/embed/watch?v=PIHZRj99nHU&list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&index=5`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[calc(100vh-180px)] "
              title="YouTube video"
            />
          </AspectRatio>
        </div>

        <div className="h-[calc(100vh - 100px)] pt-5 pl-5 ">
          <div className="flex gap-3 items-center">
            <h3 className="font-bold text-lg">Chat en vivo</h3>
            <div className="p-2 bg-green-600 rounded-full animate-pulse"></div>
          </div>

          <div>
            <ScrollArea className="h-[400px] w-full py-4 pr-4 ">
              {messages &&
                messages.map((message) => {
                  return message.senderId._id == authUser._id ? (
                    <div
                      className="flex items-start justify-end gap-4 mt-5"
                      key={message._id}
                    >
                      <div className="p-2 bg-orange-200 rounded-xl text-end">
                        <p className="text-md font-bold">
                          {message.senderId.name} | {message.senderId.userType}{" "}
                        </p>
                        <p>{message.message}</p>
                      </div>
                      <div className="p-4 bg-orange-600 rounded-full"></div>
                    </div>
                  ) : (
                    <div
                      className="flex items-start gap-4 mt-5"
                      key={message._id}
                    >
                      <div className="p-4 bg-blue-600 rounded-full"></div>
                      <div className="p-2 bg-slate-200 rounded-xl ">
                        <p className="text-md font-bold">
                          {message.senderId.name} | {message.senderId.userType}{" "}
                        </p>
                        <p>{message.message}</p>
                      </div>
                    </div>
                  );
                })}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex gap-4 mt-5">
              <Input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Escribe un mensaje o pregunta" />
              <Button className="flex gap-2" type="submit">
                Enviar
                <Send className="w-4 " />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

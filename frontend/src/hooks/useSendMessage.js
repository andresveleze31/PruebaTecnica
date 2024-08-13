import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";

const useSendMessage = () => {
  const { setAuthUser } = useAuthContext();
  const { toast } = useToast();

  const sendmessage = async (message) => {
    try {
      const res = await fetch("/api/messages/send/66bb86eb2ec33e5ae2838e9d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast({
          title: "Mensaje fallido",
          description: data.error,
        });
        return;
      }
     
    } catch (error) {}
    console.log(error.message);
    toast({
      title: "Error al enviar mensaje",
      description: "Ocurrio un error a la hora del registro",
    });
  };

  return { sendmessage };
};

export default useSendMessage

import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

const useSignUp = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
  const signup = async ({
    name,
    username,
    password,
    confirmPassword,
    userType,
  }) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          password,
          confirmPassword,
          userType,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast({
          title: "Creacion usuario fallida",
          description: data.error,
        });
        return;
      }

      localStorage.setItem("chat-user", JSON.stringify(data))
      setAuthUser(data)

      toast({
        title: "Creacion usuario",
        description: "El usuario fue creado correctamente",
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error al Registrarse",
        description: "Ocurrio un error a la hora del registro",
      });
    }
  };

  return { signup };
};

export default useSignUp;

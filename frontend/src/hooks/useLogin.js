import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";

const useLogin = () => {
  
    const {setAuthUser} = useAuthContext();
    const { toast } = useToast();

    const login = async ({ username, password }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast({
          title: "Login fallido",
          description: data.error,
        });
        return;
      }

      localStorage.setItem("chat-user", JSON.stringify(data))
      setAuthUser(data);

    } catch (error) {}
    console.log(error.message);
      toast({
        title: "Error al Registrarse",
        description: "Ocurrio un error a la hora del registro",
      });
  };

  return {login}
};

export default useLogin;

import { useAuthContext } from "@/context/AuthContext";

const useLogout = () => {
  
    const {setAuthUser} = useAuthContext();
  
    const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        toast({
          title: "Logout Fallido",
          description: data.error,
        });
        return;
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null)
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};
export default useLogout;

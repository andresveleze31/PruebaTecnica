import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";

function App() {

  const {authUser} = useAuthContext();

  return (
    <Routes>
      <Route path="/home" element={authUser ? <Home /> : <Navigate to={"/"} />} />
      <Route path="/" element={authUser ? <Navigate to={"/home"} /> : <Login />} />
      <Route path="/registrarse" element={authUser ? <Navigate to={"/home"} /> : <SignUp />} />
    </Routes>
  );
}

export default App;

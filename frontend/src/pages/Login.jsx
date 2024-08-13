import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster";
import useLogin from "@/hooks/useLogin";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useLogin();

  const loginForm = async (data) => {
    await login(data);
  };

  return (
    <div className="h-screen w-full">
      <div className="h-screen w-full grid grid-cols-[2fr,3fr] ">
        <div className="border-r bg-slate-900 flex flex-col justify-between">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="h-screen w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center items-center px-32">
          <h1 className="text-3xl font-bold">Inicia Sesion</h1>
          <p className="text-gray-400 mt-3">
            Ingresa usuario, contraseña y tipo de usuario
          </p>

          <form
            onSubmit={handleSubmit(loginForm)}
            className="w-full flex flex-col gap-5 mt-7"
          >
            <Input
              id="username"
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
              })}
            />
            {errors.username && (
              <p className="text-red-600 text-sm">
                {errors.username?.message?.toString()}{" "}
              </p>
            )}
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />

            {errors.password && (
              <p className="text-red-600 text-sm">
                {errors.password?.message?.toString()}{" "}
              </p>
            )}

            <Button type="submit">Iniciar Sesion</Button>
          </form>
          <Link className="w-full" to={"/registrarse"}>
            <Button variant="ghost" className="w-full mt-5">
              Crea una cuenta
            </Button>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;

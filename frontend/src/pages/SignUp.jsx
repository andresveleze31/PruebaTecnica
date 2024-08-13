import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster";
import useSignUp from "@/hooks/useSignUp";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userType, setUserType] = useState("estudiante");

  const {signup} = useSignUp();
  

  const registerUser = async(data) => {
    const newUser = {
        ...data, userType
    }

    console.log(newUser)

    await signup(newUser);


    
  };

  return (
    <div className="h-screen w-full">
      <div className="h-screen w-full grid md:grid-cols-[2fr,3fr] ">
        <div className="hidden md:block border-r bg-slate-900 flex flex-col justify-between">
        <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="h-screen w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center items-center px-32">
          <h1 className="text-3xl font-bold">Crea una cuenta</h1>
          <p className="text-gray-400 mt-3">
            Ingresa usuario, contraseña y tipo de usuario
          </p>

          <form
            onSubmit={handleSubmit(registerUser)}
            className="w-full flex flex-col gap-5 mt-7"
          >
            <Input
              id="name"
              type="text"
              placeholder="Ingresa tu nombre"
              {...register("name", {
                required: "El nombre es obligatorio",
              })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">
                {errors.name?.message?.toString()}{" "}
              </p>
            )}
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
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Ingresa nuevamente tu contraseña"
              {...register("confirmPassword", {
                required: "La contraseña es obligatoria",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword?.message?.toString()}{" "}
              </p>
            )}
            <Select
              value={userType}
              onValueChange={(value) => {
                setUserType(value);
              }}
              defaultValue="estudiante"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo Usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estudiante">Estudiante</SelectItem>
                <SelectItem value="moderador">Moderador</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Crear cuenta</Button>
          </form>
          <Link className="w-full" to={"/"}>
            <Button variant="ghost" className="w-full mt-5">
              Ir al Login
            </Button>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;

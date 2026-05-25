'use client'

import { useState } from "react";
import Link from "next/link";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useRegisterForm } from "../hooks/forms/useFormRegister";
import AuthHero from "@/src/features/auth/components/authHero";
import { ROUTES_PATH } from "@/src/core/routes/routes";

export default function RegisterView() {
    const { form, onRegisterSubmit, loadingAccess } = useRegisterForm();
    const { register, handleSubmit, formState: { errors } } = form;

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const inputClasses = {
        label: "text-zinc-700 font-medium text-sm",
        inputWrapper: "bg-white border-zinc-200 hover:border-zinc-400 focus-within:!border-zinc-900 focus-within:!ring-1 focus-within:!ring-zinc-900 shadow-sm transition-all rounded-lg",
        input: "text-zinc-900",
    };

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <AuthHero />
            <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white custom-scrollbar">
                <div className="min-h-full flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24">
                    
                    <div className="w-full max-w-sm">
                        <div className="mb-8 mt-4 lg:mt-0">
                            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                <UserPlus className="text-white w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Crear Cuenta</h1>
                            <p className="text-zinc-500 mt-2 text-sm">Registra un nuevo usuario en el sistema.</p>
                        </div>
                        
                        <form onSubmit={handleSubmit(onRegisterSubmit)} className="flex flex-col gap-4">
                            
                            <Input
                                {...register("name")}
                                type="text"
                                label="Nombre Completo"
                                placeholder="Ej. Juan Pérez"
                                variant="bordered"
                                labelPlacement="outside"
                                isInvalid={!!errors.name}
                                errorMessage={errors.name?.message}
                                classNames={inputClasses}
                            />

                            <Input
                                {...register("email")}
                                type="email"
                                label="Correo Electrónico"
                                placeholder="usuario@empresa.com"
                                variant="bordered"
                                labelPlacement="outside"
                                isInvalid={!!errors.email}
                                errorMessage={errors.email?.message}
                                classNames={inputClasses}
                            />

                            <Select
                                {...register("role")}
                                label="Rol del Usuario"
                                placeholder="Selecciona un rol"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultSelectedKeys={["CASHIER"]}
                                isInvalid={!!errors.role}
                                errorMessage={errors.role?.message}
                                classNames={{
                                    label: "text-zinc-700 font-medium text-sm",
                                    trigger: "bg-white border-zinc-200 hover:border-zinc-400 focus-within:!border-zinc-900 focus-within:!ring-1 focus-within:!ring-zinc-900 shadow-sm transition-all rounded-lg",
                                    value: "text-zinc-900",
                                }}
                            >
                                <SelectItem key="ADMIN">Administrador</SelectItem>
                                <SelectItem key="MANAGER">Gerente</SelectItem>
                                <SelectItem key="CASHIER">Cajero</SelectItem>
                            </Select>

                            <Input
                                {...register("password")}
                                type={isVisible ? "text" : "password"}
                                label="Contraseña"
                                placeholder="••••••••"
                                variant="bordered"
                                labelPlacement="outside"
                                isInvalid={!!errors.password}
                                errorMessage={errors.password?.message}
                                classNames={inputClasses}
                                endContent={
                                    <button 
                                        className="focus:outline-none flex items-center justify-center h-full" 
                                        type="button" 
                                        onClick={toggleVisibility} 
                                        aria-label="Mostrar contraseña"
                                    >
                                        {isVisible ? (
                                            <EyeOff className="text-zinc-400 hover:text-zinc-600 transition-colors w-5 h-5" strokeWidth={1.5} />
                                        ) : (
                                            <Eye className="text-zinc-400 hover:text-zinc-600 transition-colors w-5 h-5" strokeWidth={1.5} />
                                        )}
                                    </button>
                                }
                            />

                            {errors.root && (
                                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center font-medium border border-red-100 mt-2">
                                    {errors.root.message}
                                </div>
                            )}

                            <Button 
                                type="submit" 
                                isLoading={loadingAccess}
                                className="w-full font-medium text-white bg-zinc-900 hover:bg-zinc-800 shadow-md rounded-lg mt-2 h-12 shrink-0"
                            >
                                {loadingAccess ? "Creando cuenta..." : "Registrar Usuario"}
                            </Button>
                            
                            <div className="text-center mt-4 mb-8 lg:mb-0 text-sm text-zinc-500 shrink-0">
                                ¿Ya tienes una cuenta?{" "}
                                <Link 
                                    href={ROUTES_PATH.signin}
                                    className="font-medium text-zinc-900 hover:underline hover:text-zinc-700 transition-colors"
                                >
                                    Inicia sesión aquí
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
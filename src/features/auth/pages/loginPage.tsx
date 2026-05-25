'use client'

import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { Coffee, Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "@/src/features/auth/hooks/forms/useFormLogin";
import AuthHero from "@/src/features/auth/components/authHero";
import Link from "next/link";
import { ROUTES_PATH } from "@/src/core/routes/routes";

export default function LoginView() {

    const { form, onAccessSubmit, loadingAccess } = useLoginForm();
    const { register, handleSubmit, formState: { errors } } = form;

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex min-h-screen w-full bg-white">
            <AuthHero />

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
                <div className="w-full max-w-sm">

                    <div className="mb-10">
                        <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                            <Coffee className="text-white w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Iniciar Sesión</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Ingresa al panel de administración.</p>
                    </div>

                    <form onSubmit={handleSubmit(onAccessSubmit)} className="flex flex-col gap-5">

                        <Input
                            {...register("email")}
                            type="email"
                            label="Correo Electrónico"
                            placeholder="usuario@empresa.com"
                            variant="bordered"
                            labelPlacement="outside"
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                            classNames={{
                                label: "text-zinc-700 font-medium text-sm",
                                inputWrapper: "bg-white border-zinc-200 hover:border-zinc-400 focus-within:!border-zinc-900 focus-within:!ring-1 focus-within:!ring-zinc-900 shadow-sm transition-all rounded-lg",
                                input: "text-zinc-900",
                            }}
                        />

                        <Input
                            {...register("password")}
                            type={isVisible ? "text" : "password"}
                            label="Contraseña"
                            placeholder="••••••••"
                            variant="bordered"
                            labelPlacement="outside"
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            classNames={{
                                label: "text-zinc-700 font-medium text-sm mt-2",
                                inputWrapper: "bg-white border-zinc-200 hover:border-zinc-400 focus-within:!border-zinc-900 focus-within:!ring-1 focus-within:!ring-zinc-900 shadow-sm transition-all rounded-lg",
                                input: "text-zinc-900",
                            }}
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
                            className="w-full font-medium text-white bg-zinc-900 hover:bg-zinc-800 shadow-md rounded-lg mt-4 h-12"
                        >
                            {loadingAccess ? "Verificando..." : "Entrar"}
                        </Button>

                        <div className="text-center mt-4 mb-8 lg:mb-0 text-sm text-zinc-500 shrink-0">
                            ¿No tienes una cuenta todavía?{" "}
                            <Link
                                href={ROUTES_PATH.signup}
                                className="font-medium text-zinc-900 hover:underline hover:text-zinc-700 transition-colors"
                            >
                                Regístrate aquí
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
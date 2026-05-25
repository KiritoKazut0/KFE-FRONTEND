'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { ROUTES_PATH } from "@/src/core/routes/routes";
import { RegisterSchema, RegisterFormData } from "../../validations/registerSchema";
import { useAuthRegister } from "../useAuth";
import { useAuthStore } from "@/src/core/auth/authStorage";

export const useRegisterForm = () => {
    const router = useRouter();
    const { mutateAsync, isPending: loadingAccess } = useAuthRegister();
    const registerGlobal = useAuthStore((state) => state.register);


       const form = useForm<RegisterFormData>({
            resolver: yupResolver(RegisterSchema),
            mode: "onChange",
            defaultValues: {
                name: "",
                email: "",
                password: "",
                role: "CASHIER"
            }
        });

      const onRegisterSubmit = async (data: RegisterFormData) => {
        try {
            const authResponse = await mutateAsync({
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role
            });

            Cookies.set('jwt', authResponse.token, { expires: 7, path: '/' });
            registerGlobal(authResponse.user);
            router.push(ROUTES_PATH.dashboard);

        } catch (error) {
            if (error instanceof Error) {
                form.setError("root", { type: "manual", message: error.message });
            } else {
                form.setError("root", { type: "manual", message: "Hubo un problema al registrarse" });
            }


        }
    }; 
    
     return {
        form,
        onRegisterSubmit,
        loadingAccess
    };

}
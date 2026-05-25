'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { ROUTES_PATH } from "@/src/core/routes/routes";
import { LoginFormData, loginSchema } from "../../validations/loginSchema";
import { useAuthAccess } from "../useAuth";
import { useAuthStore } from "@/src/core/auth/authStorage";

export const useLoginForm = () => {

    const router = useRouter();
    const { mutateAsync, isPending: loadingAccess } = useAuthAccess();
    const loginGlobal = useAuthStore((state) => state.login);

    const form = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onAccessSubmit = async (data: LoginFormData) => {
        try {
            const authResponse = await mutateAsync({
                email: data.email,
                password: data.password
            });

            Cookies.set('jwt', authResponse.token, { expires: 7, path: '/' });
            loginGlobal(authResponse.user);
            form.reset({ email: "", password: "" });
            router.push(ROUTES_PATH.dashboard);

        } catch (error) {
            if (error instanceof Error) {
                form.setError("root", { type: "manual", message: error.message });
            } else {
                form.setError("root", { type: "manual", message: "Hubo un problema al iniciar sesión" });
            }


        }
    };

    return {
        form,
        onAccessSubmit,
        loadingAccess
    };
};
'use client'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createOrderSchema, createOrderFormData } from "../validation/orderSchema";
import { usePost } from "./usePost";
import { useAuthStore } from "@/src/core/auth/authStorage";
import { showToast } from "@/src/common/utils/toast";


export const useFormCreateOrder = () => {
    const { mutateAsync, isPending: loadingCreate } = usePost();
    const userId = useAuthStore((state) => state.user?.id);

    const form = useForm<createOrderFormData>({
        resolver: yupResolver(createOrderSchema),
        mode: "onChange",
        defaultValues: {
            items: [],
            methodPayment: "CASH"
        }
    });


    const onCreateOrderSubmit = async (data: createOrderFormData) => {
        try {
            if (!userId) return;
            await mutateAsync({
                userId,
                methodPayment: data.methodPayment,
                items: data.items.map((item) => ({
                     productId: item.productId,
                     quantity: item.quantity
                }))
            });

            showToast({type: "success", message: "Se ah generado correctamente la orden"})
        } catch (error) {
            if (error instanceof Error) {
                showToast({type: "error", message: error.message})
            };
        }
    }


    return {
        form,
        onCreateOrderSubmit,
        loadingCreate
    }

}
'use client'
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema, CategoryFormData } from "../../validations/categorySchema";
import { useCreateNewCategory } from "../useProducts";
import { showToast } from "@/src/common/utils/toast";


export const useFormCategory = () => {
    const { mutateAsync, isPending: isLoadingCreateCategory, error: errorCategory } = useCreateNewCategory();

    const form = useForm<CategoryFormData>({
        resolver: yupResolver(categorySchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: ""
        }
    });


    const onCreateCategorySubtmit = async (data: CategoryFormData) => {
        try {
            const result = await mutateAsync({
                name: data.name,
                description: data.description
            });

            showToast({ type: "success", message: "Se ha creado correctamente la categoria" })

            return result;
        } catch (error) {
            if (error instanceof Error) {
                showToast({ type: "error", message: error.message })
            }
            showToast({ type: "error", message: "Hubo un problema al crear la categoria" })
        }
    }


    return {
        onCreateCategorySubtmit,
        isLoadingCreateCategory,
        errorCategory,
        formCategory: form
    }


}
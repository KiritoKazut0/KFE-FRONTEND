'use client'
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema, ProductFormData } from "../../validations/productSchema";
import { useCreateNewProduct } from "../useProducts";
import { showToast } from "@/src/common/utils/toast";

export const useFormProduct = () => {
    const { mutateAsync, isPending: isLoadingCreateProduct, error: erroProduct } = useCreateNewProduct();

    const form = useForm<ProductFormData>({
        resolver: yupResolver(productSchema) as Resolver<ProductFormData>,
        mode: "onChange",
        defaultValues: {
            categoryId: "",
            name: "",
            price: 0,
            stock: 0,
            file: undefined,
            typeProduct: "STANDARD"
        }
    });

    const onCreateProductSubtmit = async (data: ProductFormData) => {
        try {
            const result = await mutateAsync({
                categoryId: data.categoryId,
                name: data.name,
                price: data.price,
                stock: data.stock,
                typeProduct: data.typeProduct,
                file: data.file,
                isActive: true
            });
            
            showToast({type: "success", message: "El producto se ha creado correctamente."})
            form.reset();

            return result;
        } catch (error) {
            if (error instanceof Error){
                showToast({type: "error", message: error.message})
            }
            showToast({type: "error", message: "Hubo un problema al crear el producto"})
        }
    }

    return {
        formProduct: form ,
        onCreateProductSubtmit,
        isLoadingCreateProduct,
        erroProduct
    };
}
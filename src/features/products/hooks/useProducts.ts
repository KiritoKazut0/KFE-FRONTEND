
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createNewCategory,
    createNewProduct,
    deleteProducts,
    listCategory,
    listProducts
} from "../services/productsService";
import { CreateProductDto } from "../interfaces/dtos/createProduct.dto";
import { createCategoryDto } from "../interfaces/dtos/createCategory.dto";
import { showToast } from "@/src/common/utils/toast";


export const useCreateNewProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => createNewProduct(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useListProducts = (categoryId?: string, page = 1) =>
  useQuery({
    queryKey: ["products", categoryId ?? "all", page],
    queryFn: () => listProducts(categoryId, page),
  });

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProducts(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      showToast({
        type: "success",
        message: "Producto eliminado correctamente",
      });

    },

    onError: () => {
       showToast({
        type: "error",
        message: "No se pudo eliminar el producto",
      });
    }

  });
};

export const useListCategory = (enabled: boolean) => useQuery({
    queryKey: ["category"],
    queryFn: () => listCategory(),
    enabled: enabled
})

export const useCreateNewCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: createCategoryDto) =>
      createNewCategory(category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },
  });
};
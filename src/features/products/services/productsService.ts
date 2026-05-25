import api from "@/src/core/http/api";
import { ProductMapper } from "../interfaces/mappers/productMapper";
import { ProductResponse } from "../interfaces/models/productResponse.model";
import { createCategoryDto } from "../interfaces/dtos/createCategory.dto";
import { CategoryMapper } from "../interfaces/mappers/categoryMapper";
import { handleApiError } from "@/src/core/http/handleApiErros";
import { CreateProductDto } from "../interfaces/dtos/createProduct.dto";

export const createNewProduct = async (newProduct: CreateProductDto) => {
    try {
        const formData = ProductMapper.toProductFormData(newProduct);
        const result = await api.post('/products', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return ProductMapper.toModel(result.data.data);
    } catch (error) {
        throw new Error(handleApiError(error, "Ya existe un producto con el mismo nombre"));
    }
}

export const listCategory = async () => {
    try {
        const result = await api.get('/categories');
        const dto = result.data.data
        return CategoryMapper.toModelList(dto)
    } catch (error) {
        throw new Error(handleApiError(error, "Error al cargar categorías"));
    }

}

export const createNewCategory = async (category: createCategoryDto) => {
    try {
        const result = await api.post('categories', category);
        const dto = result.data.data;
        return CategoryMapper.toModel(dto);
    } catch (error) {
        throw new Error(handleApiError(error, "La categoría ya existe"));
    }
}

export const listProducts = async (categoryId?: string, page?: number): Promise<ProductResponse> => {
    try {
        const result = await api.get('/products', {
            params: { categoryId, page }
        });

        const dto = result.data;
        return ProductMapper.toModelList(dto)

    } catch (error) {
        throw new Error(handleApiError(error, "Error al cargar productos"));
    }
}


export const deleteProducts = async (productId: string) => {
    try {
        await api.delete(`/products/${productId}`);
    } catch (error) {
        throw new Error(handleApiError(error, "Error al eliminar producto"));
    }
}


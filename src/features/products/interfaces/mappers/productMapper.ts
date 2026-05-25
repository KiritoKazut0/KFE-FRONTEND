import { CreateProductDto } from "../dtos/createProduct.dto";
import { ProductDto, ProductTypeDto } from "../dtos/product.dto";
import { ProductResponseDto } from "../dtos/productsResponse.dto";
import { Product, ProductType } from "../models/product.model";
import { ProductResponse } from "../models/productResponse.model";

export class ProductMapper {

    static toModel(product: ProductDto): Product {
        return {
            id: product.id,
            categoryId: product.categoryId,
            name: product.name,
            typeProduct: this.toTypeProductModel(product.typeProduct),
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl
        }
    }


    static toModelList(dto: ProductResponseDto): ProductResponse {
        return {
            products: (dto.data ?? []).map(product => this.toModel(product)),
            meta: {
                page: dto.meta.page,
                totalPage: dto.meta.totalPages
            }
        }
    }

    static toProductFormData(data: CreateProductDto): FormData {
        const formData = new FormData();

        formData.append("categoryId", data.categoryId);
        formData.append("name", data.name);
        formData.append("typeProduct", data.typeProduct);
        formData.append("price", String(data.price));
        formData.append("isActive", String(data.isActive));

        if (data.stock !== undefined) {
            formData.append("stock", String(data.stock));
        }

        formData.append("file", data.file);

        return formData;
    };


    static toTypeProductModel(type: ProductTypeDto): ProductType {
        switch (type) {
            case "STANDARD": return "Estándar";
            case "PREPARED": return "Preparado";
            case "KIT": return "Kit";
            default: throw new Error(`Unknown type: ${type}`)
        }
    }
}
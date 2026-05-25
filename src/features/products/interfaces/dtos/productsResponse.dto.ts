import { ProductDto } from "./product.dto";

export interface ProductResponseDto {
    data: ProductDto[];
    meta: {
        page: number;
        totalPages: number;
    }
}
import { Product } from "./product.model";

export interface ProductResponse {
    products: Product[];
    meta: {
        page: number;
        totalPage: number;
    }
}
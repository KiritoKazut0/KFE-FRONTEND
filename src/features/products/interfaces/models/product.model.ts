
export type ProductType = "Estándar" | "Preparado" | "Kit"

export interface Product {
    id: string;
    categoryId: string;
    name: string;
    typeProduct: ProductType;
    price: number;
    stock: number | null;
    imageUrl: string;
}
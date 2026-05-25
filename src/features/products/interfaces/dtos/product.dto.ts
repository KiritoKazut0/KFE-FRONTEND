
export type ProductTypeDto = 'STANDARD' | 'PREPARED' | 'KIT'

export interface ProductDto {
    id: string;
    categoryId: string;
    name: string;
    typeProduct: ProductTypeDto;
    price: number;
    stock: number | null;
    imageUrl: string;
    
}
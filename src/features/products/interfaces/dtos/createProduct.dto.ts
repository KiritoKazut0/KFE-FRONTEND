export interface CreateProductDto {
  categoryId: string;
  name: string;
  typeProduct: string;
  price: number;
  stock?: number;
  isActive: boolean;
  file: File;
}
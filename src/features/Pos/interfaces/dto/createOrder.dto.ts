import { PaymentMethodDto } from "./oder.dto";


export interface CreateOrderDto {
    userId: string;
    methodPayment: PaymentMethodDto
    items: ItemsDto[]
}

export interface ItemsDto {
    productId: string;
    quantity: number;
}
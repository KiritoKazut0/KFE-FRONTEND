
export type PaymentMethodDto = 'CASH' | 'CARD' | 'TRANSFER';
export type OrderStatusDto = 'PAID' | 'CANCELED';

export interface OrderDto {
    id: string;
    total: string;
    methodPayment: PaymentMethodDto;
    status: OrderStatusDto;
    createdAt: string;
}


 interface Items {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
 }


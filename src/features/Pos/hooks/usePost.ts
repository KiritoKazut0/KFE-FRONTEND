import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../service/orderService"
import { CreateOrderDto } from "../interfaces/dto/createOrder.dto"


export const usePost = () => {
    return useMutation({
        mutationFn: (orderData: CreateOrderDto) => createOrder(orderData)
    })
}
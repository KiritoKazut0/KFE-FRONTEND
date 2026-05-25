import api from "@/src/core/http/api"
import { CreateOrderDto } from "../interfaces/dto/createOrder.dto"
import { handleApiError } from "@/src/core/http/handleApiErros";


export const createOrder = async (newOrder: CreateOrderDto) => {
    try {
        await api.post('/orders', newOrder);
    } catch (error) {
        throw new Error(handleApiError(error, "Hubo un problema al crear la orden"))
    }
}

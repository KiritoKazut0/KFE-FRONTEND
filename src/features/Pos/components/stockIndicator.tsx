import { ChefHat, CircleAlert, CircleCheck, XCircle } from "lucide-react";
import { ProductType } from "../../products/interfaces/models/product.model";

interface Props {
    typeProduct: ProductType;
    stock: number | null;
}


export default function StockIndicator({ typeProduct, stock }: Props) {

    if (typeProduct === "Preparado" || typeProduct === "Kit") {
        return (
            <div className="flex items-center gap-1 mt-0.5 text-zinc-400">
                <ChefHat size={10} />
                <span className="text-[10px] font-medium tracking-wide">A pedido</span>
            </div>
        );
    }

    if (stock === 0) {
        return (
            <div className="flex items-center gap-1 mt-0.5 text-danger-500">
                <XCircle size={10} />
                <span className="text-[10px] font-bold tracking-wide">Agotado</span>
            </div>
        );
    }
    if (stock !== null && stock <= 5) {
        return (
            <div className="flex items-center gap-1 mt-0.5 text-warning-600">
                <CircleAlert size={10} />
                <span className="text-[10px] font-bold tracking-wide">¡Solo quedan {stock}!</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1 mt-0.5 text-success-600">
            <CircleCheck size={10} />
            <span className="text-[10px] font-medium tracking-wide">{stock} disp.</span>
        </div>
    );
}
import { Card, Image } from "@heroui/react";
import { Product } from "../../products/interfaces/models/product.model";
import StockIndicator from "./stockIndicator";
import { Plus } from "lucide-react";

interface Props {
    product: Product;
    onAdd: (product: Product) => void;
    availableStock: number | null;
}

export default function ProductCard({ onAdd, product, availableStock }: Props) {

    const type = product.typeProduct
    const isOutOfStock = type === "Estándar" && availableStock !== null && availableStock <= 0;

    return (
        <Card
            key={product.id}
            isPressable={!isOutOfStock}
            onPress={() => { onAdd(product) }}
            shadow="none"
            className={`bg-white p-2.5 rounded-2xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] transition-all flex flex-col gap-2 
                ${isOutOfStock
                    ? "opacity-60 grayscale cursor-not-allowed border-danger-100"
                    : "hover:border-zinc-300 hover:shadow-md active:scale-95"}`
            }
        >
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    classNames={{
                        wrapper: "w-full h-full",
                        img: "w-full h-full object-cover"
                    }}
                    radius="none"
                />
            </div>

            <div className="flex flex-col flex-1 justify-start px-0.5 text-left w-full">
                <span className="font-bold text-zinc-900 text-xs leading-tight line-clamp-2 min-h-7.5">
                    {product.name}
                </span>

                <StockIndicator typeProduct={product.typeProduct} stock={availableStock} />

                <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-zinc-900 text-sm tabular-nums">
                        ${product.price.toFixed(2)}
                    </span>
                    {!isOutOfStock && (
                        <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                            <Plus size={12} strokeWidth={3} />
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
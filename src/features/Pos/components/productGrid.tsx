import { Pagination, Spinner } from "@heroui/react";
import { Product } from "../../products/interfaces/models/product.model";
import { PackageOpen } from "lucide-react";
import ProductCard from "./productCard";
import { useCartStore } from "../store/cartStore";

interface Props {
    products: Product[];
    loading: boolean;
    error: any;
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    addItem: (product: Product) => void;
}

export default function ProductGrid({
    addItem,
    error,
    loading,
    page,
    products,
    setPage,
    totalPages
}: Props) {

    const cartItems = useCartStore((state) => state.cartItems);

    return (
        <div className="min-h-96 relative pb-10">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-30 rounded-2xl">
                    <Spinner color="default" label="Cargando productos..." />
                </div>
            )}
            {products.length === 0 && !loading && !error && (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center text-zinc-500 border border-dashed border-zinc-200 rounded-2xl bg-white/50">
                    <PackageOpen size={48} className="text-zinc-300" />
                    <p>No se encontraron productos en esta categoría.</p>
                </div>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 items-start">
                {products.map((product) => {

                    const cartItem = cartItems.find(item => item.id === product.id);
                    const cartQuantity = cartItem?.quantity || 0;
                    const isStandard = product.typeProduct === "Estándar";
                    const availableStock = (isStandard && product.stock !== null) 
                        ? product.stock - cartQuantity 
                        : product.stock;

                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={addItem}
                            availableStock={availableStock}
                        />
                    );
                })}
            </div>

            {totalPages > 1 && !loading && (
                <div className="flex w-full justify-center mt-10">
                    <Pagination
                        isCompact
                        showControls
                        page={page}
                        total={totalPages}
                        onChange={(newPage) => setPage(newPage)}
                        classNames={{
                            wrapper: "gap-1 overflow-visible h-9 rounded-xl",
                            item: "w-9 h-9 text-sm rounded-xl bg-transparent text-zinc-600 hover:bg-zinc-100",
                            cursor: "bg-zinc-900 text-white font-bold rounded-xl shadow-md",
                            prev: "bg-transparent hover:bg-zinc-100 rounded-xl",
                            next: "bg-transparent hover:bg-zinc-100 rounded-xl",
                        }}
                    />
                </div>
            )}
        </div>
    );
}
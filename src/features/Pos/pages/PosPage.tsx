'use client'
import { useState, useMemo } from "react";
import { useListCategory, useListProducts } from "../../products/hooks/useProducts";
import { useFormCreateOrder } from "../hooks/useFormCreateOrder";
import { useCartStore } from "../store/cartStore";
import PosHeader from "../components/posHeader";
import CategoryTabs from "../components/categoryTabs";
import ProductGrid from "../components/productGrid";
import { PaymentMethodDto } from "../interfaces/dto/oder.dto";
import CartDrawer from "../components/cartDrawer";


export default function PosPage() {

    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethodDto | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data: listProducts, isLoading: loadingProducts, error: errorLoadingProducts } = useListProducts(selectedCategory, page);
    const { data: listCategory } = useListCategory(true);
    const { form, loadingCreate, onCreateOrderSubmit } = useFormCreateOrder();

    const cartItems = useCartStore((state) => state.cartItems);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const incrementQuantity = useCartStore((state) => state.incrementQuantity);
    const decrementQuantity = useCartStore((state) => state.decrementQuantity);
    const clearCart = useCartStore((state) => state.clearCart);

    const totalItems = useMemo(() => cartItems.reduce((s, i) => s + i.quantity, 0), [cartItems]);
    const cartTotal = useMemo(() => cartItems.reduce((s, i) => s + i.price * i.quantity, 0), [cartItems]);

    const handleCheckout = async () => {

        if (!selectedPayment || cartItems.length === 0) return;
        form.setValue("methodPayment", selectedPayment);
        form.setValue(
            "items",
            cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            }))
        );

        await form.handleSubmit(async (data) => {
            await onCreateOrderSubmit(data);

            clearCart();
            setSelectedPayment(null);
            setIsDrawerOpen(false);
        })();
    };

    const handleCategoryChange = (key: string) => {
        setSelectedCategory(key);
        setPage(1);
    };

    return (
        <div className="relative min-h-screen">

            <CartDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                cartItems={cartItems}
                totalItems={totalItems}
                cartTotal={cartTotal}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeItem={removeItem}
                handleCheckout={handleCheckout}
                loadingCreate={loadingCreate}

            />

            <div className="space-y-6 animate-in fade-in duration-500 px-4 sm:px-10 md:px-20 pb-16 mt-10">
                <PosHeader totalItems={totalItems} onOpenCart={setIsDrawerOpen} />
                <CategoryTabs
                    categories={listCategory ?? []}
                    onCategoryChange={handleCategoryChange}
                    selectedCategory={selectedCategory}
                />

                <ProductGrid
                    addItem={addItem}
                    error={errorLoadingProducts}
                    loading={loadingProducts}
                    page={listProducts?.meta.page ?? 1}
                    products={listProducts?.products ?? []}
                    setPage={setPage}
                    totalPages={listProducts?.meta.totalPage ?? 1
                    } />

            </div>
        </div>
    );
}
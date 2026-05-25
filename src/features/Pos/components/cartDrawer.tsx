import { PackageOpen, Receipt, X } from "lucide-react";
import { PaymentMethodDto } from "../interfaces/dto/oder.dto";
import { CartItem as Item } from "../store/cartStore";
import { Button, Divider, ScrollShadow } from "@heroui/react";
import CartItem from "./cartItem";
import PaymentSelector from "./paymentSelector";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    cartItems: Item[];
    totalItems: number;
    cartTotal: number;

    selectedPayment: PaymentMethodDto | null;
    setSelectedPayment: (value: PaymentMethodDto | null) => void;

    incrementQuantity: (productId: string) => void;
    decrementQuantity: (productId: string) => void;
    removeItem: (productId: string) => void;

    handleCheckout: () => void;
    loadingCreate: boolean;
}

export default function CartDrawer({
    isOpen,
    onClose,
    cartItems,
    totalItems,
    cartTotal,
    selectedPayment,
    setSelectedPayment,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    handleCheckout,
    loadingCreate,
}: Props) {
    return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300
                    ${isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"}`}
            />

            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] 
                    ${isOpen 
                        ? "translate-x-0"
                        : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-zinc-100">
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <Receipt size={16} className="text-zinc-400" />
                            <h2 className="text-base font-bold text-zinc-900">Orden actual</h2>
                        </div>
                        <p className="text-xs text-zinc-400 pl-6 tabular-nums">
                            {totalItems} producto{totalItems !== 1 ? "s" : ""} · ${cartTotal.toFixed(2)}
                        </p>
                    </div>
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        size="sm"
                        onPress={() => onClose}
                        className="text-zinc-500 hover:bg-zinc-100"
                    >
                        <X size={16} />
                    </Button>
                </div>

                <ScrollShadow className="flex-1 px-4 py-3 space-y-2 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 gap-3">
                            <PackageOpen size={40} strokeWidth={1.2} className="text-zinc-300" />
                            <p className="text-sm text-zinc-400">Sin productos aún</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                incrementQuantity={incrementQuantity}
                                decrementQuantity={decrementQuantity}
                                removeItem={removeItem}
                            />

                        ))
                    )}
                </ScrollShadow>

                {cartItems.length > 0 && (
                    <div className="border-t border-zinc-100 px-5 pt-4 pb-6 space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-zinc-400"><span>Subtotal</span><span className="tabular-nums">${cartTotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm text-zinc-400"><span>Descuento</span><span className="text-success-600 tabular-nums">—$0.00</span></div>
                            <Divider className="my-1" />
                            <div className="flex justify-between items-baseline"><span className="font-bold text-zinc-900">Total</span><span className="text-xl font-black text-zinc-900 tabular-nums">${cartTotal.toFixed(2)}</span></div>
                        </div>

                        <PaymentSelector
                            selectedPayment={selectedPayment}
                            setSelectedPayment={setSelectedPayment}
                        />

                        <Button
                            fullWidth
                            isLoading={loadingCreate}
                            isDisabled={!selectedPayment || cartItems.length === 0}
                            onPress={handleCheckout}
                            className="bg-zinc-900 text-white font-bold text-sm tracking-wide disabled:opacity-35 h-12 rounded-2xl shadow-sm"
                            size="lg"
                        >
                            {selectedPayment ? `Cobrar $${cartTotal.toFixed(2)}` : "Selecciona método de pago"}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
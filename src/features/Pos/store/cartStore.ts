import { create } from "zustand";
import { showToast } from "@/src/common/utils/toast";
import { Product } from "../../products/interfaces/models/product.model";


export interface CartItem extends Product {
    quantity: number;
}

export interface CartStore {
    cartItems: CartItem[];
    addItem: (product: Product) => void; 
    removeItem: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    clearCart: () => void;
    
}

export const useCartStore = create<CartStore>((set) => ({
    cartItems: [],
    
    addItem: (product) => set((state) => {
        const existingItem = state.cartItems.find((item) => item.id === product.id);
        const isStandard = product.typeProduct === "Estándar";
        const hasStockLimit = isStandard && product.stock !== null;

        if (existingItem) {
            if (hasStockLimit && existingItem.quantity >= product.stock!) {
                showToast({ type: "warning", message: "Stock máximo alcanzado" });
                return state; 
            }

            return {
                cartItems: state.cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }

        if (hasStockLimit && product.stock === 0) return state; 

        return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        };
    }),

    removeItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

    incrementQuantity: (id) => set((state) => {
        
        const existingItem = state.cartItems.find(item => item.id === id);
        if (!existingItem) return state;

        const isStandard = existingItem.typeProduct === "Estándar";
        const hasStockLimit = isStandard && existingItem.stock !== null;

        if (hasStockLimit && existingItem.quantity >= existingItem.stock!) {
            showToast({ type: "warning", message: "Stock máximo alcanzado" });
            return state; 
        }

        return {
            cartItems: state.cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ),
        };
    }),

    decrementQuantity: (id) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ),
    })),

    clearCart: () => set({ cartItems: [] }),
}));
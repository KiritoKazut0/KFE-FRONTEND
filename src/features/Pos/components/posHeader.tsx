'use client'; 

import { Button } from "@heroui/react";
import { ShoppingCart, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/core/auth/authStorage";
import { ROUTES_PATH } from "@/src/core/routes/routes";

interface Props {
    totalItems: number;
    onOpenCart: (active: boolean) => void;
}

export default function PosHeader({ totalItems, onOpenCart }: Props) {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            if (logout) logout();
            router.push(ROUTES_PATH.signin); 
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Punto de Venta</h1>
                <p className="text-zinc-500 text-sm mt-1">Registra nuevas órdenes y gestiona el cobro.</p>
            </div>
            

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
                <Button onPress={() => onOpenCart(true)} variant="bordered" className="border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 font-semibold h-11 px-4 rounded-xl gap-3 shadow-sm">
                    <div className="relative">
                        <ShoppingCart size={19} strokeWidth={2} className="text-zinc-600" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-zinc-900 text-white text-[10px] font-black rounded-full leading-none tabular-nums">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <span className="text-sm">Orden actual</span>
                </Button>


                <Button 
                    isIconOnly 
                    onPress={handleLogout} 
                    variant="bordered" 
                    title="Cerrar sesión"
                    className="border-zinc-200 bg-white hover:bg-red-50 hover:border-red-200 text-zinc-500 hover:text-red-600 h-11 w-11 rounded-xl shadow-sm transition-colors"
                >
                    <LogOut size={19} strokeWidth={2} />
                </Button>
            </div>
        </div>
    );
}
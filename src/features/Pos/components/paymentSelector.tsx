import { Banknote, CreditCard, Smartphone } from "lucide-react";
import { PaymentMethodDto } from "../interfaces/dto/oder.dto";
import { Button } from "@heroui/react";

interface Props {
    selectedPayment: PaymentMethodDto | null;
    setSelectedPayment: (payment: PaymentMethodDto) => void;
}

const PAYMENT_OPTIONS: { key: PaymentMethodDto; label: string; Icon: React.ElementType }[] = [
    { key: "CASH", label: "Efectivo", Icon: Banknote },
    { key: "CARD", label: "Tarjeta", Icon: CreditCard },
    { key: "TRANSFER", label: "Transfer.", Icon: Smartphone },
];

export default function PaymentSelector({ selectedPayment, setSelectedPayment }: Props) {
    return (
        <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5">Forma de pago</p>
            <div className="grid grid-cols-3 gap-2">
                {PAYMENT_OPTIONS.map(({ key, label, Icon }) => {
                    const selected = selectedPayment === key;
                    return (
                        <Button key={key} variant={selected ? "solid" : "bordered"} onPress={() => setSelectedPayment(key)} className={`flex flex-col h-auto py-2.5 gap-1 text-xs font-semibold border-zinc-200 ${selected ? "bg-zinc-900 text-white border-zinc-900" : "text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"}`} radius="lg">
                            <Icon size={16} />{label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
import { Button, Image } from "@heroui/react";
import { CartItem as item } from "../store/cartStore";
import { Minus, Plus, Trash2 } from "lucide-react";

interface Props {
  item: item;
  decrementQuantity: (id: string) => void;
  incrementQuantity: (id: string) => void;
  removeItem: (id: string) => void;
}

export default function CartItem({
  item,
  decrementQuantity,
  incrementQuantity,
  removeItem
}: Props) {
  return (
    <div
      key={item.id}
      className="group flex items-center gap-3 bg-white hover:bg-zinc-50 rounded-2xl p-2.5 border border-zinc-100 hover:border-zinc-200 transition-all"
    >
      <div
        className="w-11 h-11 shrink-0 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100"
      >
        <Image
          src={item.imageUrl}
          alt={item.name}
          classNames={{ wrapper: "w-full h-full", img: "w-full h-full object-cover" }}
          radius="none"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-800 truncate leading-tight">
          {item.name}
        </p>
        <p className="text-xs text-zinc-400 mt-0.5 tabular-nums">
          ${item.price.toFixed(2)} c/u
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Button
          isIconOnly
          size="sm"
          variant="bordered"
          radius="sm"
          onPress={() => decrementQuantity(item.id)}
          className="w-7 h-7 min-w-0 border-zinc-200 text-zinc-500 hover:border-zinc-400"
        >
          <Minus size={11} />
        </Button>
        <span
          className="w-6 text-center text-sm font-bold text-zinc-900 tabular-nums"
        >{item.quantity}
        </span>
        <Button
          isIconOnly
          size="sm"
          variant="solid"
          radius="sm"
          onPress={() => incrementQuantity(item.id)}
          className="w-7 h-7 min-w-0 bg-zinc-900 text-white">
          <Plus size={11} />
        </Button>
      </div>
      <p className="text-sm font-bold text-zinc-900 min-w-13.5 text-right tabular-nums shrink-0">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        radius="sm"
        onPress={() => removeItem(item.id)}
        className="w-7 h-7 min-w-0 opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-danger hover:bg-danger-50 shrink-0 transition-opacity">
        <Trash2 size={13} />
      </Button>
    </div>
  );
}
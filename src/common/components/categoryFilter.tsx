import { Tab, Tabs } from "@heroui/react";
import { Category } from "@/src/features/products/interfaces/models/category.model";


interface Props {
   readonly categories: Category[]
}

export default function CategoryFilter({categories}: Props) {
    return (
        <div className="w-full border-b border-zinc-200">
            <Tabs
                aria-label="Filtros por categoría"
                variant="underlined"
                classNames={{
                    tabList: "gap-4 sm:gap-6 relative w-full overflow-x-auto",
                    cursor: "w-full bg-zinc-900 h-0.5",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-zinc-900 text-zinc-500 font-medium text-sm transition-colors whitespace-nowrap",
                }}
            >
                <Tab key="all" title= "Todos los productos"/>
                {categories.map((cat) => (
                    <Tab key={cat.id} title={cat.name} />
                ))}
            </Tabs>
        </div>
    );
}
import { Tab, Tabs } from "@heroui/react";

export default function ProductFilterTabs() {
    return (
        <div className="w-full border-b border-zinc-200">
            <Tabs
                aria-label="Filtros por tipo"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 relative w-full",
                    cursor: "w-full bg-zinc-900 h-0.5",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-zinc-900 text-zinc-500 font-medium text-sm transition-colors"
                }}
            >
                <Tab key="all" title="Todos los productos" />
                <Tab key="standard" title="Estándar" />
                <Tab key="prepared" title="Preparados" />
                <Tab key="kits" title="Kits / Combos" />
            </Tabs>
        </div>
    );
}
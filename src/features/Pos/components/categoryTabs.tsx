import { Tab, Tabs } from "@heroui/react";

interface Props {
    categories: { id: string; name: string }[];
    selectedCategory: string;
    onCategoryChange: (key: string) => void;
}


export default function CategoryTabs({ categories, onCategoryChange, selectedCategory }: Props) {
    return (
        <div className="w-full border-b border-zinc-200">
            <Tabs
                aria-label="Filtros"
                variant="underlined"
                selectedKey={selectedCategory}
                onSelectionChange={(key) => onCategoryChange(key as string)}
                classNames={{
                    tabList: "gap-4 sm:gap-6 relative w-full overflow-x-auto",
                    cursor: "w-full bg-zinc-900 h-0.5", tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-zinc-900 text-zinc-500 font-medium text-sm transition-colors whitespace-nowrap"
                }}>
                <Tab key="" title="Todas las categorías" />
                {categories.map((cat) => <Tab key={cat.id} title={cat.name} />)}
            </Tabs>
        </div>
    );
}
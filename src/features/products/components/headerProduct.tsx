import { Button, useDisclosure } from "@heroui/react";
import { FolderPlus, Plus } from "lucide-react";
import CreateProductModal from "./createProductModal";
import CreateCategoryModal from "./createCategoryModal";




export default function HeaderProduct() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenCategory, onOpen: onOpenCategory, onOpenChange: onOpenChangeCategory } = useDisclosure();
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Catálogo de Productos</h1>
                <p className="text-zinc-500 text-sm mt-1">Gestiona tu inventario, precios y categorías.</p>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="bordered"
                    className="bg-white border-zinc-200 text-zinc-700 font-medium shadow-sm"
                    startContent={<FolderPlus size={16} className="text-zinc-500" />}
                    onPress={onOpenCategory}
                >
                    Nueva Categoría
                </Button>
                <Button
                    color="primary"
                    className="bg-zinc-900 text-white font-medium shadow-sm"
                    startContent={<Plus size={16} />}
                    onPress={onOpen}
                >
                    Nuevo Producto
                </Button>

            </div>

            <CreateProductModal isOpen={isOpen} onOpenChange={onOpenChange} />
            <CreateCategoryModal isOpen={isOpenCategory} onOpenChange={onOpenChangeCategory}  />
        </div>
    );
}
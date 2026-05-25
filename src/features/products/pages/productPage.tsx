'use client'
import { useState } from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Chip, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@heroui/react";
import { MoreVertical, Edit2, Trash2, Package, Infinity } from "lucide-react";
import HeaderProduct from "../components/headerProduct";
import ProductFilterTabs from "../components/productFilterTabs";
import { useDeleteProduct, useListProducts } from "../hooks/useProducts";
import { Product } from "../interfaces/models/product.model";
import TablePagination from "@/src/common/components/tablePagination";
import ModalConfirmDelete from "@/src/common/components/modalConfirmDelete";

const renderTypeChip = (type: string) => {
    const styles: Record<string, { color: "default" | "warning" | "secondary", label: string }> = {
        "STANDARD": { color: "default", label: "Estándar" },
        "PREPARED": { color: "warning", label: "Preparado" },
        "KIT": { color: "secondary", label: "Kit" }
    };
    const config = styles[type] || { color: "default", label: type };

    return (
        <Chip size="sm" variant="flat" color={config.color} className="font-medium">
            {config.label}
        </Chip>
    );
};

export default function ProductsPage() {
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { data, isLoading } = useListProducts(category, page);
    const { mutateAsync, isPending } = useDeleteProduct();
    const totalPages = data?.meta.totalPage || 1;
    const products: Product[] = data?.products ?? [];

    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedProduct) return;

        await mutateAsync(selectedProduct.id);

        setIsDeleteOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 px-10 pb-10">

            <HeaderProduct />
            <ProductFilterTabs />

            <div className="bg-white border border-zinc-200 rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] overflow-hidden">
                <Table
                    aria-label="Catálogo de productos"
                    removeWrapper
                    className="w-full"
                    classNames={{
                        th: "bg-zinc-50 text-zinc-500 font-semibold px-6 py-4",
                        td: "px-6 py-4"
                    }}
                    bottomContent={
                        <TablePagination
                            page={page}
                            totalPages={totalPages}
                            isLoading={isLoading}
                            onChange={setPage}
                        />
                    }
                >
                    <TableHeader>
                        <TableColumn>PRODUCTO</TableColumn>
                        <TableColumn>TIPO</TableColumn>
                        <TableColumn>PRECIO</TableColumn>
                        <TableColumn>INVENTARIO</TableColumn>
                        <TableColumn>ESTADO</TableColumn>
                        <TableColumn align="center">ACCIONES</TableColumn>
                    </TableHeader>

                    <TableBody
                        emptyContent={"No se encontraron productos."}
                        isLoading={isLoading}
                    >
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/50 transition-colors"
                            >
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar
                                            src={product.imageUrl}
                                            radius="md"
                                            className="w-12 h-12 border border-zinc-200 shrink-0"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-bold text-zinc-900">{product.name}</span>
                                            <span className="text-sm text-zinc-500 truncate">{product.categoryId}</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {renderTypeChip(product.typeProduct)}
                                </TableCell>

                                <TableCell>
                                    <span className="font-bold text-emerald-600">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    {product.stock !== null ? (
                                        <div className="flex items-center gap-2">
                                            <Package
                                                size={16}
                                                className={product.stock < 10 ? "text-red-500" : "text-zinc-400"}
                                            />
                                            <span className="font-medium text-zinc-700">{product.stock} uds</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Infinity size={16} className="text-zinc-400" />
                                            <span className="text-zinc-500 italic">Bajo demanda</span>
                                        </div>
                                    )}
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span className="font-medium text-zinc-700 capitalize">activo</span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-end">
                                        <Dropdown placement="bottom-end">
                                            <DropdownTrigger>
                                                <Button isIconOnly variant="light" className="text-zinc-400">
                                                    <MoreVertical size={18} />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Acciones de producto">
                                                <DropdownItem key="edit" startContent={<Edit2 size={16} />}>
                                                    Editar producto
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="delete"
                                                    className="text-danger"
                                                    color="danger"
                                                    startContent={<Trash2 size={16} />}
                                                    onPress={() => openDeleteModal(product)}
                                                >
                                                    Eliminar
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ModalConfirmDelete
                isOpen={isDeleteOpen}
                onOpenChange={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                isLoading={isPending}
                type="producto"
                name={selectedProduct?.name ?? ""}
                action="eliminar"
                message="Esta acción no se puede deshacer."
            />
        </div>
    );
}
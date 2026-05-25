'use client'
import { useState, useEffect, useRef } from "react";
import { useFormProduct } from "../hooks/forms/useFormProduct"; 
import { useListCategory } from "../hooks/useProducts";       
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input, 
  Select, 
  SelectItem,
  Avatar
} from "@heroui/react";
import { Image as ImageIcon, UploadCloud } from "lucide-react"; 

interface CreateProductModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function CreateProductModal({ isOpen, onOpenChange }: CreateProductModalProps) {
    const [loadCategories, setLoadCategories] = useState(false);
    const { data: categoriesData, isLoading: isLoadingCategories } = useListCategory(loadCategories);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { formProduct, onCreateProductSubtmit, isLoadingCreateProduct } = useFormProduct();
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = formProduct;

    const watchFile = watch("file");
    const watchTypeProduct = watch("typeProduct");


    useEffect(() => {
        if (watchFile && watchFile instanceof File) {
            const objectUrl = URL.createObjectURL(watchFile);
            setImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [watchFile]);


    const handleClose = () => {
        reset();
        setImagePreview(null);
        onOpenChange(false);
    };

    return (
       <Modal 
            isOpen={isOpen} 
            onOpenChange={handleClose} 
            size="2xl" 
            scrollBehavior="inside"   // ← inside para scroll interno
            backdrop="opaque"
            classNames={{
                base: "bg-white rounded-xl",
                header: "border-b border-zinc-100/80 px-7 py-7",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <> 
                        <ModalHeader>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                                    Nuevo Producto
                                </h2>
                                <p className="text-zinc-500 text-sm font-normal">
                                    Agrega un nuevo artículo a tu catálogo.
                                </p>
                            </div>
                        </ModalHeader>

                        <ModalBody>
                            <form
                                id="create-product-form"
                                onSubmit={handleSubmit(async (data) => {
                                    await onCreateProductSubtmit(data);
                                    onClose();
                                })}
                                className="flex flex-col gap-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 items-start w-full">
                                    <Input 
                                        label="Nombre"
                                        labelPlacement="outside"
                                        placeholder="Nombre del producto"
                                        variant="bordered"
                                        {...register("name")}
                                        isInvalid={!!errors.name}
                                        errorMessage={errors.name?.message}
                                        classNames={{ label: "text-zinc-700 font-medium" }}
                                    />
                                    <Select
                                        label="Categoría"
                                        labelPlacement="outside"
                                        placeholder="Selecciona categoría"
                                        variant="bordered"
                                        {...register("categoryId")}
                                        
                                        onOpenChange={(open) => open && setLoadCategories(true)}
                                        isInvalid={!!errors.categoryId}
                                        
                                        classNames={{ label: "text-zinc-700 font-medium" }}
                                    >
                                        {(categoriesData ?? []).map((cat) => (
                                            <SelectItem key={cat.id} textValue={cat.name}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        label="Tipo de producto"
                                        labelPlacement="outside"
                                        placeholder="Selecciona tipo"
                                        variant="bordered"
                                        {...register("typeProduct")}
                                        isInvalid={!!errors.typeProduct}
                                        errorMessage={errors.typeProduct?.message}
                                        classNames={{ label: "text-zinc-700 font-medium" }}
                                    >
                                        <SelectItem key="STANDARD">Estándar</SelectItem>
                                        <SelectItem key="PREPARED">Preparado</SelectItem>
                                        <SelectItem key="KIT">Kit / Combo</SelectItem>
                                    </Select>
                                    <Input 
                                        type="number"
                                        label="Precio"
                                        labelPlacement="outside"
                                        placeholder="0.00"
                                        variant="bordered"
                                        startContent={<span className="text-zinc-400">$</span>}
                                        {...register("price")}
                                        isInvalid={!!errors.price}
                                        errorMessage={errors.price?.message}
                                        classNames={{ label: "text-zinc-700 font-medium" }}
                                    />
                                    {watchTypeProduct === "STANDARD" && (
                                        <Input 
                                            type="number"
                                            label="Inventario inicial"
                                            labelPlacement="outside"
                                            placeholder="0"
                                            variant="bordered"
                                            {...register("stock")}
                                            isInvalid={!!errors.stock}
                                            errorMessage={errors.stock?.message}
                                            classNames={{ label: "text-zinc-700 font-medium" }}
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-sm font-medium text-zinc-700 block mb-2">
                                        Imagen del producto
                                    </label>
                                    <div className="flex items-center gap-6 p-6 border border-dashed border-zinc-300 rounded-xl bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                                        <Avatar
                                            src={imagePreview || ""}
                                            icon={<ImageIcon size={32} className="text-zinc-400" />}
                                            className="w-24 h-24 text-large rounded-lg bg-white border border-zinc-200"
                                        />
                                        <div className="flex-1">
                                            <p className="text-xs text-zinc-500 mb-4">
                                                Formatos sugeridos: JPG, PNG o WEBP. Máx 5MB.
                                            </p>
                                            <Button 
                                                size="sm" 
                                                variant="flat" 
                                                className="bg-zinc-200/50 text-zinc-700 font-medium hover:bg-zinc-200"
                                                startContent={<UploadCloud size={18}/>}
                                                onPress={() => fileInputRef.current?.click()}
                                            >
                                                Subir imagen
                                            </Button>
                                            <input 
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                accept="image/jpg,image/jpeg,image/png,image/webp"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) setValue("file", file, { shouldValidate: true });
                                                }}
                                            />
                                            {errors.file && (
                                                <p className="text-tiny text-danger mt-3">
                                                    {errors.file.message as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <Button 
                                variant="light" 
                                onPress={handleClose} 
                                className="font-medium text-zinc-600 hover:bg-zinc-100"
                            >
                                Cancelar
                            </Button>
                            <Button 
                                type="submit"
                                form="create-product-form"  
                                isLoading={isLoadingCreateProduct}
                                className="bg-zinc-900 text-white font-medium shadow-sm hover:bg-zinc-800"
                            >
                                Guardar Producto
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
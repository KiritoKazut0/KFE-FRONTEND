'use client'
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input, 
  Textarea
} from "@heroui/react";
import { useFormCategory } from "../hooks/forms/useFormCategory"; 

interface CreateCategoryModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function CreateCategoryModal({ isOpen, onOpenChange }: CreateCategoryModalProps) {
    const { formCategory, onCreateCategorySubtmit, isLoadingCreateCategory } = useFormCategory();
    const { register, handleSubmit, formState: { errors }, reset } = formCategory;

    const handleClose = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={handleClose} 
            size="lg" 
            backdrop="opaque"
            classNames={{
                base: "bg-white rounded-2xl",
                header: "border-b border-zinc-100/80 px-6 py-5",
                body: "px-6 py-6",
                footer: "border-t border-zinc-100/80 bg-zinc-50/50 px-6 py-4",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(async (data) => {
                        const result = await onCreateCategorySubtmit(data);
                        if (result) {
                            handleClose();
                        }
                    })} className="flex flex-col h-full">
                        
                        <ModalHeader>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Nueva Categoría</h2>
                                <p className="text-zinc-500 text-sm font-normal">Organiza tu catálogo agrupando productos similares.</p>
                            </div>
                        </ModalHeader>
                        
                        <ModalBody>
                            <div className="flex flex-col gap-y-8">
                                
                                <Input 
                                    label="Nombre de la categoría"
                                    labelPlacement="outside"
                                    placeholder="Ej. Bebidas Calientes"
                                    variant="bordered"
                                    {...register("name")}
                                    isInvalid={!!errors.name}
                                    errorMessage={errors.name?.message}
                                    classNames={{ label: "text-zinc-700 font-medium" }}
                                />

                                <Textarea
                                    label="Descripción (Opcional)"
                                    labelPlacement="outside"
                                    placeholder="Breve descripción de los productos que irán aquí..."
                                    variant="bordered"
                                    minRows={3}
                                    {...register("description")}
                                    isInvalid={!!errors.description}
                                    errorMessage={errors.description?.message}
                                    classNames={{ label: "text-zinc-700 font-medium" }}
                                />

                            </div>
                        </ModalBody>
                        
                        <ModalFooter>
                            <Button variant="light" onPress={handleClose} className="font-medium text-zinc-600">
                                Cancelar
                            </Button>
                            <Button 
                                type="submit" 
                                isLoading={isLoadingCreateCategory}
                                className="bg-zinc-900 text-white font-medium shadow-sm hover:bg-zinc-800 px-6"
                            >
                                Crear Categoría
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}
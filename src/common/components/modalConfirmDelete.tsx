import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDraggable,
} from "@heroui/react";
import FooterModalActions from "./footerModalActions";

interface Props {
    message: string;
    name: string;
    type: string;
    isOpen: boolean;
    onOpenChange: () => void;
    onConfirm: () => void;
    isLoading: boolean;
    action: string
}

export default function ModalConfirmDelete({
    isOpen,
    name,
    onConfirm,
    onOpenChange,
    message,
    type,
    isLoading,
    action
}: Readonly<Props>) {

    const targetRef = React.useRef<HTMLElement | null>(null) as React.RefObject<HTMLElement>;
    const { moveProps } = useDraggable({
        targetRef,
        isDisabled: !isOpen,
    });

    return (
        <Modal

            ref={targetRef}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            backdrop="opaque"
            size="lg"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader
                            {...moveProps}
                            className="font-semibold text-lg pt-6 pb-1"
                        >
                            Eliminar {type}
                        </ModalHeader>

                        <ModalBody>
                            <p className="text-sm">
                                ¿Estás seguro de que deseas {action} el producto {" "}
                                <span className="font-semibold text-gray-700">
                                    "{name}"
                                </span>
                                ? {message}
                            </p>
                        </ModalBody>

                        <ModalFooter className="flex justify-end gap-3 pb-6">
                            <FooterModalActions
                                actionName={"Si, aceptar"}
                                loading={isLoading}
                                onClose={onClose}
                                onSubmit={onConfirm}
                                isDelete = {false}
                            />
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}


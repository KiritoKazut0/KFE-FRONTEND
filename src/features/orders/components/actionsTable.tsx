import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Eye, MoreVertical, XCircle } from "lucide-react";

interface Props {
    status: string
}

export default function ActionsTable({ status }: Props) {
    return (
        <div className="flex justify-end">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Button isIconOnly variant="light" className="text-zinc-400">
                        <MoreVertical size={18} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Acciones de la orden">
                    <DropdownItem key="view" startContent={<Eye size={16} />}>
                        Ver detalles
                    </DropdownItem>
                    <DropdownItem
                        key="cancel"
                        className={`text-danger ${status === 'CANCELLED' ? 'hidden' : ''}`}
                        color="danger"
                        startContent={<XCircle size={16} />}
                    >
                        Cancelar orden
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
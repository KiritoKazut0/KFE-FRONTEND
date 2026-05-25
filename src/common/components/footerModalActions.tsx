import { Button } from "@heroui/react";
import { CheckCircleIcon, Trash2 } from "lucide-react";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  actionName: string;
  isDelete?: boolean;

}

export default function FooterModalActions({ onClose, onSubmit, loading, actionName, isDelete }: Readonly<Props>) {
  return (
    <>
      <Button
        type="button"
        radius="sm"
        variant="bordered"
        onPress={onClose}
        className="font-medium text-xs"
        isDisabled={loading}
      >
        Cerrar
      </Button>

      <Button
        type="submit"
        radius="sm"
        className={
           isDelete
            ? "bg-red-600 text-white font-medium text-xs"
            : "bg-black text-white font-medium text-xs"
        }
        startContent={ 
          isDelete ? <Trash2 className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />
        }
        onPress={onSubmit}
        isLoading={loading}
        isDisabled={loading}
      >
        {actionName}
      </Button>
    </>
  );
}
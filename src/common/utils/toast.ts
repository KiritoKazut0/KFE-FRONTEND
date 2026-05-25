import { addToast } from "@heroui/react";

type ToastType = "success" | "error" | "warning" | "default";

interface Args {
  message: string,
  type: ToastType
}

export function showToast({message, type}: Args ) {

  const config = {
    success: {
      title: "Success",
      color: "success",
    },
    error: {
      title: "Error",
      color: "danger",
    },
    warning: {
      title: "Warning",
      color: "warning",
    },
    default: {
      title: "Info",
      color: "default",
    }
  };

  const toast = config[type];

  addToast({
    title: toast.title,
    description: message,
    color: toast.color as any,
    variant: "flat"
  });
}
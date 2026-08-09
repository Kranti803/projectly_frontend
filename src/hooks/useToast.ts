import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

export const useToast = () => {
  const showToast = (message: string, type: ToastType = "info") => {
    switch (type) {
      case "success":
        return toast.success(message);
      case "error":
        return toast.error(message);
      case "warning":
        return toast.warning(message);
      case "info":
      default:
        return toast(message);
    }
  };

  return {
    toast: showToast,
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast(message),
    warning: (message: string) => toast.warning(message),
  };
};

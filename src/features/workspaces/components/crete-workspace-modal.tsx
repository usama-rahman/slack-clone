import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateWorkSpaceModal } from "../store/use-create-workspace-modal";

export const CreateWorkSpaceModal = () => {
  const [open, setOpen] = useCreateWorkSpaceModal();

  const handleClose = () => {
    setOpen(false);
  };

  return <Dialog open={open} onOpenChange={handleClose}></Dialog>;
};

// Workspace creation 13:37

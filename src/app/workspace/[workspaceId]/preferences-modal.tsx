import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkSpace } from "@/features/workspaces/api/use-update-workspace";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

/**
 * PreferencesModal Component
 *
 * This component renders a modal for managing workspace preferences.
 * It allows users to edit the workspace name and delete the workspace.
 */
export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  // Custom hook for confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action is irreversible.",
  );

  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  // Hooks for updating and removing workspaces
  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkSpace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  /**
   * Handles the removal of the workspace
   * Confirms with the user before proceeding
   */
  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success("Workspace removed");
        },
        onError: () => {
          toast.error("Failed to remove workspace");
        },
      },
    );
  };

  /**
   * Handles the editing of the workspace name
   */
  const handleEdit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess: () => {
          toast.success("Workspace updated");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      },
    );
  };

  return (
    <>
      <ConfirmDialog />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden bg-gray-50 p-0">
          <DialogHeader className="border-b bg-white p-4">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-y-2 px-4 pb-4">
            {/* Nested Dialog for editing workspace name */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Workspace name</p>

                    <p className="text-sm font-semibold text-[#1264a3] hover:underline">
                      Edit
                    </p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Remove This Workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="workspace name e.g. 'Work', 'Personal', 'Home' "
                  />

                  <DialogFooter>
                    <DialogClose asChild>
                      <div>
                        <Button
                          variant="outline"
                          disabled={isUpdatingWorkspace}
                        >
                          Cancel
                        </Button>

                        <Button disabled={isUpdatingWorkspace}>Save</Button>
                      </div>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Delete workspace button */}
            <button
              disabled={isRemovingWorkspace}
              onClick={handleRemove}
              className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-white px-5 text-rose-600 hover:bg-gray-50"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

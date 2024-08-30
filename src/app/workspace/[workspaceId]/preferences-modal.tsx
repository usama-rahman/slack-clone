import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useRemoveWorkspace } from '@/features/workspaces/api/use-remove-workspace';
import { useUpdateWorkSpace } from '@/features/workspaces/api/use-update-workspace';

import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkSpace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden bg-gray-50 p-0">
        <DialogHeader className="border-b bg-white p-4">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-2 px-4 pb-4">
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
              <form className="space-y-4" onSubmit={() => {}}>
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
                    <Button variant="outline" disabled={isUpdatingWorkspace}>
                      Cancel
                    </Button>

                    <Button disabled={isUpdatingWorkspace}>Save</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <button
            disabled={false}
            onClick={() => {}}
            className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-white px-5 text-rose-600 hover:bg-gray-50"
          >
            <TrashIcon className="size-4" />

            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateWorkSpaceModal } from '../store/use-create-workspace-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkSpace } from '../api/use-create-workspace';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const CreateWorkSpaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkSpaceModal();
  const [name, setName] = useState('');

  const { mutate, isPending } = useCreateWorkSpace();

  const handleClose = () => {
    setOpen(false);
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(id) {
          toast.success('Workspace created');
          router.push(`/workspace/${id}`);
          handleClose();
        },
      },
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={handleChange}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="workspace name e.g. 'Work', 'Personal', 'Home' "
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

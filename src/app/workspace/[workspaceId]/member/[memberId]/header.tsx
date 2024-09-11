import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { TrashIcon } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";

import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { useRemoveChannel } from "@/features/channels/api/use-remove-channel";
import { useCurrentMember } from "@/features/members/api/use-current-member";

import { useChannelId } from "@/hooks/use-channel-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  memberName?: string;
  memberImage?: string;
  onClick?: () => void;
}

export const Header = ({ memberName, memberImage, onClick }: HeaderProps) => {
  const avaterFallback = memberName?.charAt(0).toUpperCase();

  return (
    <div className="flex h-[49px] items-center overflow-hidden border bg-white px-4">
      <Button
        variant="ghost"
        className="w-auto overflow-hidden px-2 text-lg font-semibold"
        size="sm"
        onClick={onClick}
      >
        <Avatar className="mr-2 size-6">
          <AvatarImage src={memberImage} />
          <AvatarFallback>{avaterFallback}</AvatarFallback>
        </Avatar>

        <span className="truncate"> # {memberName} </span>

        <FaChevronDown className="ml-2 size-2.5" />
      </Button>
    </div>
  );
};

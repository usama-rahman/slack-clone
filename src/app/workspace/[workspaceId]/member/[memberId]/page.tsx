"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader } from "lucide-react";
import { toast } from "sonner";

import { Id } from "../../../../../../convex/_generated/dataModel";

import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useMemberId } from "@/hooks/use-member-id";

import { Conversation } from "./conversation";

const MemberIdPage = () => {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();

  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const { mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    mutate(
      { workspaceId, memberId },
      {
        onSuccess: (data) => {
          setConversationId(data);
        },
        onError: (error) => {
          toast.error("Failed to create or get conversation");
        },
      },
    );
  }, [mutate, workspaceId, memberId]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!conversationId) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <AlertTriangle className="size-6 text-muted-foreground" />

        <span className="text-sm text-muted-foreground">
          Failed to get conversation
        </span>
      </div>
    );
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;

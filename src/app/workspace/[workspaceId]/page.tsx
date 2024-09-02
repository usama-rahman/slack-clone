"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [open, setOpen] = useCreateChannelModal();

  // Fetch current member data
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });

  // Fetch workspace data
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  // Fetch channels data
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  // Get the ID of the first channel (if any)
  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  // Check if the current member is an admin
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    // Skip if still loading or no member data
    if (
      workspaceLoading ||
      channelsLoading ||
      memberLoading ||
      !member ||
      workspace
    )
      return;

    // If there's a channel, redirect to it
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      // If no channel and user is admin, open create channel modal
      setOpen(true);
    }
  }, [
    channelId,
    isAdmin,
    workspaceLoading,
    channelsLoading,
    workspace,
    open,
    setOpen,
    router,
    workspaceId,
    member,
    memberLoading,
  ]);

  // Show loading state
  if (workspaceLoading || channelsLoading) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Show error if workspace not found
  if (!workspace) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }

  // Show message if no channels found
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">No Channel found</span>
    </div>
  );
};

export default WorkspaceIdPage;

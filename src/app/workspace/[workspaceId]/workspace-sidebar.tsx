import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useChannelId } from "@/hooks/use-channel-id";

import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceSection } from "./workspace-section";
import { UserItem } from "./user-item";

export const WorkspaceSidebar = () => {
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelIsLoding } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  // Render loading state while fetching workspace and member data
  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#5E2C5f]">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  // Render error state if workspace or member data is not available
  if (!workspace || !member) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2 bg-[#5E2C5f]">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-sm text-white">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#5E2C5f]">
      {/* Workspace header component */}
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />

      {/* Fixed sidebar items */}
      <div className="mt-3 flex flex-col px-2">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />

        <SidebarItem label="Draft & sent" icon={SendHorizonal} id="drafts" />
      </div>

      {/* Channels section */}
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={
          member.role === "admin"
            ? () => {
                setOpen(true);
              }
            : undefined
        }
      >
        {/* Render channel list */}
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>

      {/* Direct Messages section */}
      <WorkspaceSection
        label="Direct Messages"
        hint="New channel"
        onNew={() => {}}
      >
        {/* Render member list */}
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};

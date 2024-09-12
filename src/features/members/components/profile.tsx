import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertTriangle,
  ChevronDownIcon,
  Loader,
  MailIcon,
  XIcon,
} from "lucide-react";

import { Id } from "../../../../convex/_generated/dataModel";

import { useGetMember } from "../api/use-get-member";
import { useUpdateMember } from "../api/use-update-member";
import { useRemoveMember } from "../api/use-remove-member";
import { useCurrentMember } from "../api/use-current-member";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileProps {
  memberId: Id<"members">;
  onClose: () => void;
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [LeaveDialog, confirmLeave] = useConfirm(
    "Leave workspace",
    "Are you sure you want to leave the workspace?",
  );

  const [RemoveDialog, confirmRemove] = useConfirm(
    "Remove member",
    "Are you sure you want to remove this member?",
  );

  const [UpdateDialog, confirmUpdate] = useConfirm(
    "Update member",
    "Are you sure you want to update this member?",
  );

  const { data: member, isLoading: isMemberLoading } = useGetMember({
    id: memberId,
  });

  const { data: currentMember, isLoading: isLoadingCurrentMember } =
    useCurrentMember({ workspaceId });
  const { mutate: updateMember, isPending: isUpdateingMember } =
    useUpdateMember();
  const { mutate: removeMember, isPending: isRemovingMember } =
    useRemoveMember();

  const onRemove = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          toast.success("Member removed");
          onClose();
        },
        onError: () => {
          toast.error("Failed to remove member");
        },
      },
    );
  };

  const onLeave = async () => {
    const ok = await confirmLeave();

    if (!ok) return;

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          router.push(`/`);
          toast.success("You left the workspace");
          onClose();
        },
        onError: () => {
          toast.error("Failed to leave the workspace");
        },
      },
    );
  };

  const onUpdate = async (role: "admin" | "member") => {
    const ok = await confirmUpdate();

    if (!ok) return;

    updateMember(
      { id: memberId, role },
      {
        onSuccess: () => {
          toast.success("Role changed");
          onClose();
        },
        onError: () => {
          toast.error("Failed to change role");
        },
      },
    );
  };

  if (isMemberLoading || isLoadingCurrentMember) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="text-lg font-bold"> Profile</p>

          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        <div className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="text-lg font-bold"> Profile</p>

          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        <div className="flex h-full flex-col items-center justify-center gap-y-2">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground"> Profile not found</p>
        </div>
      </div>
    );
  }

  const avatarFallback = member.user.name?.[0]?.toUpperCase() ?? "M";

  return (
    <>
      <LeaveDialog />
      <RemoveDialog />
      <UpdateDialog />

      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="text-lg font-bold"> Profile</p>

          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="size-full max-h-[256px] max-w-[256px]">
            <AvatarImage src={member.user.image} />

            <AvatarFallback className="aspect-square text-6xl">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col p-4">
          <p className="text-lg font-bold">{member.user.name}</p>

          {currentMember?.role === "admin" &&
          currentMember?._id === memberId ? (
            <div className="mt-4 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="w-full capitalize" variant="outline">
                    {member.role} <ChevronDownIcon className="ml-2 size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={member.role}
                    onValueChange={(role) =>
                      onUpdate(role as "admin" | "member")
                    }
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>

                    <DropdownMenuRadioItem value="member">
                      Member
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={onRemove} variant="outline" className="w-full">
                Remove
              </Button>
            </div>
          ) : currentMember?._id === memberId &&
            currentMember?.role === "admin" ? (
            <div className="mt-4">
              <Button onClick={onLeave} variant="outline" className="w-full">
                Leave
              </Button>
            </div>
          ) : null}
        </div>

        <Separator />

        <div className="flex flex-col p-4">
          <p className="mb-4 text-sm font-bold">Contact information</p>

          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-md bg-muted">
              <MailIcon className="size-4" />
            </div>

            <div className="flex flex-col">
              <p className="text-[13px] font-semibold text-muted-foreground">
                Email Address
              </p>

              <Link
                className="text-sm font-medium text-[#1264a3] hover:underline"
                href={`mailto:${member.user.email}`}
              >
                {member.user.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import Link from "next/link";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";
import { Id } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const userItemVarients = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVarients>["variant"];
}

export const UserItem = ({
  id,
  label = "Member",
  image,
  variant,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avaterFallback = label.charAt(0).toUpperCase();

  return (
    <Button
      variant="transparent"
      className={cn(userItemVarients({ variant: variant }))}
    >
      <Link className="flex" href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="mr-1 size-5 rounded-md">
          <AvatarImage className="rounded-md" src={image} />

          <AvatarFallback className="rounded-md bg-sky-500 text-sm text-white">
            {avaterFallback}
          </AvatarFallback>
        </Avatar>

        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};

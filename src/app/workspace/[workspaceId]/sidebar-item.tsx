import { LucideIcon } from "lucide-react";
import Link from "next/link";

import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

// Define variants for sidebar item styling
const sidebarItemVarients = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
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

// Props interface for SidebarItem component
interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVarients>["variant"];
}

// SidebarItem component for rendering individual sidebar items
export const SidebarItem = ({
  label,
  id,
  icon: Icon,
  variant,
}: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      asChild
      variant="transparent"
      className={cn(sidebarItemVarients({ variant }))}
      size="sm"
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="mr-1 size-3.5 shrink-0" />
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};

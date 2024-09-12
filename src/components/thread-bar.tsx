import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

interface ThreadBarProps {
  threadCount?: number;
  threadImage?: string;
  timestamp?: number;
  threadName?: string;
  onClick?: () => void;
}

export const ThreadBar = ({
  threadCount,
  threadImage,
  timestamp,
  threadName = "Member",
  onClick,
}: ThreadBarProps) => {
  if (!threadCount && !timestamp) return null;

  const avatarFallback = threadName.charAt(0).toUpperCase();

  return (
    <button
      onClick={onClick}
      className="group/thread-bar flex max-w-[600px] items-center justify-start rounded-md border border-transparent p-1 transition hover:border-border hover:bg-white"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar>
          <AvatarImage src={threadImage} />

          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <span className="truncate text-xs font-bold text-sky-700 hover:underline">
          {threadName}
        </span>

        <span className="block truncate text-xs text-muted-foreground group-hover/thread-bar:hidden">
          Last reply
          {timestamp &&
            formatDistanceToNow(timestamp, {
              addSuffix: true,
            })}
        </span>

        <span className="hidden text-xs text-muted-foreground group-hover/thread-bar:block">
          view thread
        </span>
      </div>

      <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground opacity-0 transition group-hover/thread-bar:opacity-100" />
    </button>
  );
};

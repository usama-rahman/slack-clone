import { MdOutlineAddReaction } from "react-icons/md";
import { Doc, Id } from "../../convex/_generated/dataModel";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

import { cn } from "@/lib/utils";

import { Hint } from "./hint";
import { EmojiPopover } from "./emoji-popover";

interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;

  onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionsProps) => {
  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });

  const currentMemberId = currentMember?._id;

  if (data.length === 0 || !currentMemberId) {
    return null;
  }

  return (
    <div className="mb-1 mt-1 flex items-center gap-1">
      {data.map((reaction) => (
        <Hint
          label={`${reaction.count} ${reaction.count === 1 ? "person" : "people"} reacted with ${reaction.value}`}
          key={reaction._id}
        >
          <button
            onClick={() => onChange(reaction.value)}
            className={cn(
              "flex h-6 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 text-slate-800",
              reaction.memberIds.includes(currentMemberId) &&
                "border-blue-500 bg-blue-100/70 text-white",
            )}
          >
            {reaction.value}
            <span
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                reaction.memberIds.includes(currentMemberId) && "text-blue-500",
              )}
            >
              {reaction.count}
            </span>
          </button>
        </Hint>
      ))}

      <EmojiPopover
        hint="Add reaction"
        onEmojiSelect={(emoji) => onChange(emoji.native)}
      >
        <button className="flex h-7 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 px-3 text-slate-800 hover:border-slate-500">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};

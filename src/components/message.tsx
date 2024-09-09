import dynamic from "next/dynamic";
import { format, isToday, isYesterday } from "date-fns";
import { toast } from "sonner";

import { Doc, Id } from "../../convex/_generated/dataModel";

import { useUpdateMessage } from "@/features/messages/api/use-update-message";
import { useRemoveMessage } from "@/features/messages/api/use-remove-message";
import { useToggleReaction } from "@/features/reactions/api/use-toggle-reaction";

import { useConfirm } from "@/hooks/use-confirm";

import { cn } from "@/lib/utils";

import { Hint } from "./hint";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Thumbnail } from "./thumbnail";
import { Toolbar } from "./toolbar";
import { Reactions } from "./reactions";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface MessageProps {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage?: string;
  authorName: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  body: Doc<"messages">["body"];
  images: string | null | undefined;
  createdAt: Doc<"messages">["_creationTime"];
  updatedAt: Doc<"messages">["updatedAt"];
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
}

const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`;
};

export const Message = ({
  id,
  isAuthor,
  authorName = "Member",
  authorImage,
  memberId,
  reactions,
  body,
  images,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadCount,
  threadImage,
  threadTimestamp,
}: MessageProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete message",
    "Are you sure uou want to delete this message? This cannot be undone. ",
  );

  const { mutate: updateMessage, isPending: isUpdatingMessage } =
    useUpdateMessage();
  const { mutate: removeMessage, isPending: isRemovingMessage } =
    useRemoveMessage();
  const { mutate: toggleReaction, isPending: isToggleReaction } =
    useToggleReaction();

  const isPending = isUpdatingMessage;

  const handleReaction = (value: string) => {
    toggleReaction(
      { messageId: id, value },
      {
        onError: () => {
          toast.error("Failed to toggle reaction");
        },
      },
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();

    if (!ok) return;

    removeMessage(
      { id },
      {
        onSuccess: () => {
          toast.success("Message deleted");
        },
        onError: () => {
          toast.error("Failed to delete message");
        },
      },
    );
  };

  const handleUpdate = ({ body }: { body: string }) => {
    updateMessage(
      { id, body },
      {
        onSuccess: () => {
          toast.success("Message updated");
          setEditingId(null);
        },
        onError: () => {
          toast.error("Failed to update message");
          return; // Add this line
        },
      },
    );
  };

  if (isCompact) {
    return (
      <>
        <ConfirmDialog />

        <div
          className={cn(
            "group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60",
            isEditing && "bg-[#f2c74433]",
            isRemovingMessage &&
              "origin-bottom scale-y-0 transform bg-rose-500/50 transition-all duration-200",
          )}
        >
          <div className="flex items-start gap-2">
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="w-[40px] text-center text-xs leading-[22px] text-muted-foreground opacity-0 hover:underline group-hover:opacity-100">
                {format(new Date(createdAt), "hh:mm")}
              </button>
            </Hint>

            {isEditing ? (
              <div className="h-full w-full">
                <Editor
                  onSubmit={handleUpdate}
                  disable={isUpdatingMessage}
                  defaultValue={JSON.parse(body)}
                  onCancel={() => setEditingId(null)}
                  variant="update"
                />
              </div>
            ) : (
              <div className="flex w-full flex-col">
                <Renderer value={body} />
                <Thumbnail url={images} />

                {updatedAt && updatedAt !== createdAt ? (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                ) : null}

                <Reactions data={reactions} onChange={handleReaction} />
              </div>
            )}
          </div>

          {!isEditing && (
            <Toolbar
              isAuthor={isAuthor}
              isPending={isPending}
              handleEdit={() => setEditingId(id)}
              handleThread={() => {}}
              handleDelete={handleRemove}
              handleReaction={handleReaction}
              hideThreadButton={hideThreadButton}
            />
          )}
        </div>
      </>
    );
  }
  const avaterFallback = authorName.charAt(0).toUpperCase();

  return (
    <>
      <ConfirmDialog />

      <div
        className={cn(
          "group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60",
          isEditing && "bg-[#f2c74433]",
          isRemovingMessage &&
            "origin-bottom scale-y-0 transform bg-rose-500/50 transition-all duration-200",
        )}
      >
        <div className="flex items-start gap-2">
          <button>
            <Avatar className="mr-1 size-5">
              <AvatarImage src={authorImage} />

              <AvatarFallback>{avaterFallback}</AvatarFallback>
            </Avatar>
          </button>

          {isEditing ? (
            <div className="h-full w-full">
              <Editor
                onSubmit={handleUpdate}
                disable={isUpdatingMessage}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
                variant="update"
              />
            </div>
          ) : (
            <div className="flex w-full flex-col overflow-hidden">
              <div className="text-sm">
                <button
                  onClick={() => {}}
                  className="font-bold text-primary hover:underline"
                >
                  {authorName}
                </button>

                <span> &nbsp; &nbsp; </span>

                <Hint label={formatFullTime(new Date(createdAt))}>
                  <button className="text-xs text-muted-foreground hover:underline">
                    {format(new Date(createdAt), "h:mm a")}
                  </button>
                </Hint>
              </div>

              <Renderer value={body} />

              {updatedAt && updatedAt !== createdAt ? (
                <span className="text-xs text-muted-foreground">(edited)</span>
              ) : null}

              <Reactions data={reactions} onChange={handleReaction} />
            </div>
          )}
        </div>

        {!isEditing && (
          <Toolbar
            isAuthor={isAuthor}
            isPending={isPending}
            handleEdit={() => setEditingId(id)}
            handleThread={() => {}}
            handleDelete={handleRemove}
            handleReaction={handleReaction}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
    </>
  );
};

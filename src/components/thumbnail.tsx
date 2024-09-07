/* eslint-disable @next/next/no-img-element */

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface ThumbnailProps {
  url: string | null | undefined;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-ld relative my-2 max-w-[360px] cursor-zoom-in overflow-hidden border">
          <img
            src={url}
            alt="Message image"
            className="size-full rounded-md object-cover"
          />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="Message image"
          className="size-full rounded-md object-cover"
        />
      </DialogContent>
    </Dialog>
  );
};

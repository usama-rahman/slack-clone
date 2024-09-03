import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex h-[49px] items-center overflow-hidden border bg-white px-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-auto overflow-hidden px-2 text-lg font-semibold"
            size="sm"
          >
            <span className="truncate"> # {title} </span>
            <FaChevronDown className="ml-2 size-2.5" />
          </Button>
        </DialogTrigger>

        <DialogContent className="overflow-hidden bg-gray-50 p-0">
          <DialogHeader>
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-y-2 px-4 pb-4">
            <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Channel name</p>
                <p className="text-sm font-semibold text-[#1264a3] hover:underline">
                  Edit
                </p>
              </div>

              <p className="text-sm"> # {title} </p>
            </div>

            <button>
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold"> Delete channel </p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

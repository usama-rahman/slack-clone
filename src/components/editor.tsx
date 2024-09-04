import { useEffect, useRef } from "react";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";

import "quill/dist/quill.snow.css";
import Quill, { QuillOptions } from "quill";
import { Button } from "./ui/button";
import { ImageIcon, Smile } from "lucide-react";

export const Editor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );

    const options: QuillOptions = { theme: "snow" };

    const quill = new Quill(editorContainer, options);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm">
        <div ref={containerRef} className="ql-custom h-full" />

        <div className="z-[5] flex px-2 pb-2">
          <Button
            disabled={false}
            size="iconSm"
            variant="ghost"
            onClick={() => {}}
          >
            <PiTextAa className="size-4" />
          </Button>

          <Button
            disabled={false}
            size="iconSm"
            variant="ghost"
            onClick={() => {}}
          >
            <Smile className="size-4" />
          </Button>

          <Button
            disabled={false}
            size="iconSm"
            variant="ghost"
            onClick={() => {}}
          >
            <ImageIcon className="size-4" />
          </Button>
          <Button>
            <MdSend />
          </Button>
        </div>
      </div>
    </div>
  );
};

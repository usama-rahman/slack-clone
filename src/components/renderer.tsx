import Quill from "quill";
import { useEffect, useRef } from "react";

interface RendererProps {
  value: string;
}

const Renderer = ({ value }: RendererProps) => {
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererRef.current) return;

    const container = rendererRef.current;

    const quill = new Quill(document.createElement("div"), {
      theme: "snow",
    });

    quill.enable(false);

    const contents = JSON.parse(value);
    quill.setContents(contents);

    // Remove empty paragraphs
    const cleanHtml = quill.root.innerHTML.replace(/<p><br><\/p>$/g, "");
    container.innerHTML = cleanHtml;

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [value]);

  return <div className="ql-editor ql-renderer" ref={rendererRef}></div>;
};

export default Renderer;

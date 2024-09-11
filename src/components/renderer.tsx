// V-2

import Quill from "quill";
import { useEffect, useRef, useState } from "react";

interface RendererProps {
  value: string;
}

const Renderer = ({ value }: RendererProps) => {
  const [isEmpty, setIsEmpty] = useState(false);
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

    const isEmpty =
      quill
        .getText()
        .replace(/<(.|\n)*?>/g, "")
        .trim().length === 0;

    setIsEmpty(isEmpty);

    container.innerHTML = quill.root.innerHTML;

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [value]);

  if (isEmpty) return null;

  return <div className="ql-editor ql-renderer" ref={rendererRef}></div>;
};

export default Renderer;

// V-1

// import Quill from "quill";
// import { useEffect, useRef } from "react";

// interface RendererProps {
//   value: string;
// }

// const Renderer = ({ value }: RendererProps) => {
//   const rendererRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!rendererRef.current) return;

//     const container = rendererRef.current;

//     const quill = new Quill(document.createElement("div"), {
//       theme: "snow",
//     });

//     quill.enable(false);

//     const contents = JSON.parse(value);
//     quill.setContents(contents);

//     const cleanHtml = quill.root.innerHTML.replace(/<p><br><\/p>$/g, "");
//     container.innerHTML = cleanHtml;

//     return () => {
//       if (container) {
//         container.innerHTML = "";
//       }
//     };
//   }, [value]);

//   return <div className="ql-editor ql-renderer" ref={rendererRef}></div>;
// };

// export default Renderer;

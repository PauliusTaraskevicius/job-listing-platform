"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import ToolBar from "./toolbar";
import { cn } from "@/lib/utils";

type Props = {
  description?: string;
  className?: string;
};

const RichTextRenderer = ({ description, className }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
      Document,
      Paragraph,
      Text,
      Blockquote,
      Underline,
      Placeholder.configure({
        placeholder: "Darbo vietos aprašymas",
      }),
    ],
    editable: false,
    content: !description ? Placeholder : description,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "p-4 xl:p-0 min-h-[150px] leading-8 border-input bg-background focus:ring-offset-2 disabled:cursor-not-allows disabled:opacity-50 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:px-6 [&_ul]:px-6",
          className
        ),
      },
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextRenderer;

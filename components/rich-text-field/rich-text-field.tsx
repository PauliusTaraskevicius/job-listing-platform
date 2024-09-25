"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import ToolBar from "./toolbar";
import { cn } from "@/lib/utils";

type Props = {
  description: string;
  onChange: (richText: string) => void;
  className?: string;
};

const RichTextField = ({ description, onChange, className }: Props) => {
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
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Document,
      Paragraph,
      Text,
      Blockquote,
      Underline,
    ],
    content: "Darbo vietos aprašymas",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "rounded-md border min-h-[150px] border-input bg-background focus:ring-offset-2 disabled:cursor-not-allows disabled:opacity-50 p-6 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
          className
        ),
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextField;

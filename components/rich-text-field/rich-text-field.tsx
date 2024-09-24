"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Heading from "@tiptap/extension-heading";
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
          levels: [2],
        },
      }),
    ],
    content: "Darbo vietos aprašymas",
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

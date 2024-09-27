"use client";

import { type Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import {
  Bold,
  Heading,
  Heading2,
  Heading3,
  Italic,
  Link,
  List,
  ListOrdered,
  StrikethroughIcon,
  Underline,
} from "lucide-react";
import { useCallback } from "react";

type Props = {
  editor: Editor | null;
};

function ToolBar({ editor }: Props) {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // UPDATE LINK
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-3 border border-input rounded-lg p-1 my-2">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        // onPressedChange={() =>
        //   editor.chain().focus().toggleHeading({ level: 1 }).run()
        // }
      >
        <Heading className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        // onPressedChange={() =>
        //   editor.chain().focus().toggleHeading({ level: 2 }).run()
        // }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        // onPressedChange={() =>
        //   editor.chain().focus().toggleHeading({ level: 3 }).run()
        // }
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <Link className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export default ToolBar;

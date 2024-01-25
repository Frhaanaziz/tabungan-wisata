"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@repo/utils";
import { useState, useEffect } from "react";
import { Skeleton } from "@ui/components/shadcn/skeleton";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import TiptapToolbar from "./TiptapToolbar";

const RichTextEditor = ({
  value,
  onChange,
  isLoading,
  isDirty,
  isSubmitted,
}: {
  value: string;
  onChange: (richText: string) => void;
  isLoading: boolean;
  isDirty: boolean;
  isSubmitted: boolean;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
        },
        orderedList: {
          keepMarks: true,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          "prose dark:prose-invert max-w-none",
        ),
      },
    },
    onUpdate({ editor }: any) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    // this is a way to listen for the form reset() function call
    if (!isSubmitted && !isDirty) {
      // clear value when form is reset
      editor?.commands.setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, isDirty]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Skeleton className="h-[72px]" />;

  return (
    <>
      <div
        className={`justify-strech flex flex-col ${
          isLoading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <TiptapToolbar editor={editor} />
        <EditorContent editor={editor} disabled={isLoading} />
      </div>
    </>
  );
};

export default RichTextEditor;

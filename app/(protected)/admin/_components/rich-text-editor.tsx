"use client";

import { Editor, mergeAttributes } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
  FaListOl,
  FaListUl,
  FaItalic,
  FaUnderline,
  FaImage,
  FaAlignLeft,
  FaAlignRight,
  FaHighlighter,
  FaStrikethrough,
} from "react-icons/fa";
import { BsParagraph } from "react-icons/bs";
import { MdFormatBold } from "react-icons/md";
import { FaAlignJustify, FaAlignCenter, FaQuoteRight } from "react-icons/fa6";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { Button } from "@nextui-org/button";
import BaseHeading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import { uploadImage } from "@/utils/upload-image";

import { useState } from "react";

type Levels = 1 | 2 | 3;

const classes: Record<Levels, string> = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
};

export const Heading = BaseHeading.configure({ levels: [1, 2, 3] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${classes[level]}`,
      }),
      0,
    ];
  },
});

const MenuBar = ({ editor }: { editor: Editor }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false); // Loading state
  if (!editor) {
    return null;
  }

  // Function to handle file upload and insertion
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsUploading(true); // Set loading to true when the upload starts
      try {
        // Upload the image to Cloudinary and get the URL
        const imageUrl = await uploadImage(file);

        // Insert the image URL into the editor
        editor?.chain().focus().setImage({ src: imageUrl.url }).run();
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false); // Set loading to false when the upload completes
      }
    }
  };
  return (
    <div className="flex flex-wrap gap-3 items-center p-5 border-b">
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("heading", { level: 1 }) ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <LuHeading1 size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("heading", { level: 2 }) ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <LuHeading2 size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("heading", { level: 3 }) ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <LuHeading3 size={16} />
      </Button>
      <div>
        <Button
          size="sm"
          isIconOnly
          variant="light"
          isLoading={isUploading}
          isDisabled={isUploading}
          onClick={() => document.getElementById("imageUploadInput")?.click()}
        >
          <FaImage size={16} />
        </Button>

        {/* Hidden File Input for Image Selection */}
        <input
          id="imageUploadInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("paragraph") ? "solid" : "light"}
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <BsParagraph size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("bold") ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <MdFormatBold size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("italic") ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FaItalic size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("strike") ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <FaStrikethrough size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("highlight") ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <FaHighlighter size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("underline") ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <FaUnderline size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("orderedList") ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <FaListOl size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("bulletList") ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <FaListUl size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive("blockquote") ? "solid" : "light"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <FaQuoteRight size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive({ textAlign: "left" }) ? "solid" : "light"}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <FaAlignLeft size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive({ textAlign: "center" }) ? "solid" : "light"}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <FaAlignCenter size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive({ textAlign: "right" }) ? "solid" : "light"}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <FaAlignRight size={16} />
      </Button>
      <Button
        size="sm"
        isIconOnly
        variant={editor.isActive({ textAlign: "justify" }) ? "solid" : "light"}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <FaAlignJustify size={16} />
      </Button>
    </div>
  );
};

interface TiptapProps {
  pageContent?: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ pageContent, onChange }: TiptapProps) => {
  const [content, setContent] = useState(pageContent);

  const editor = useEditor({
    editable: true,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Underline,
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      Heading,
      Image.configure({
        inline: true, // This makes the image inline, set to false for block images
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      setTimeout(() => {
        setContent(editor.getHTML());
        onChange(editor.getHTML());
      }, 1000);
    },
  });

  if (editor)
    return (
      <div className="border rounded-md m-5">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="p-5 !outline-none" />
      </div>
    );
};

export default RichTextEditor;

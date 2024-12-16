import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Link as NUI_Link } from "@nextui-org/link";

import AddLinkModal from "./add-link-modal";

import { FcAddImage } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineTextFields } from "react-icons/md";

import { uploadImage } from "@/utils/upload-image";

const QuestionForm = ({ onSubmit, onUpdate, selectedItem, mode, pages }) => {
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  useEffect(() => {
    if (selectedItem && mode === "update") {
      setTitle(selectedItem.title || selectedItem.label || "");
      setAnswer(selectedItem.answer || []);
    } else {
      setTitle("");
      setAnswer([]);
    }
  }, [selectedItem, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      onUpdate(selectedItem.id, title, answer);
    } else {
      onSubmit(title, answer);
    }
    setTitle("");
    setAnswer([]);
  };

  const handleAddText = () => {
    setAnswer((prevAnswer) => [
      ...prevAnswer,
      { id: uuidv4(), type: "text", value: "" },
    ]);
  };

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingImage(true);
      const { url } = await uploadImage(file);
      setAnswer((prevAnswer) => [
        ...prevAnswer,
        { id: uuidv4(), type: "img", value: url },
      ]);
      setIsUploadingImage(false);
    }
  };

  const handleAddLink = (pageId, title) => {
    setAnswer((prevAnswer) => [
      ...prevAnswer,
      { id: uuidv4(), type: "link", value: title, pageId },
    ]);
  };

  const handleTextChange = (id, newValue) => {
    setAnswer((prevAnswer) =>
      prevAnswer.map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  const handleDelete = (id) => {
    setAnswer((prevAnswer) => prevAnswer.filter((item) => item.id !== id));
  };
  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2>
        {mode === "update"
          ? "Update Item"
          : mode === "addChild"
          ? "Add Child"
          : "Add Question"}
      </h2>
      <Input
        value={title}
        type="text"
        variant="bordered"
        onValueChange={setTitle}
        className="bg-white rounded-lg"
        label={
          mode === "addChild"
            ? "Enter option label"
            : "Enter question/option title"
        }
        isRequired
        required
      />
      {answer.map((item) => (
        <div key={item.id} className="my-2 flex items-center">
          {item.type === "text" && (
            <Textarea
              size="sm"
              value={item.value}
              variant="bordered"
              onValueChange={(newValue) => handleTextChange(item.id, newValue)}
              className="bg-white rounded-lg flex-grow"
            />
          )}
          {item.type === "img" && (
            <img
              src={item.value}
              alt="Uploaded"
              className="rounded-lg w-[95%]"
            />
          )}
          {item.type === "link" && (
            <NUI_Link
              className="w-full"
              as={Link}
              isExternal
              showAnchorIcon
              href={`/pages/${item.pageId}`}
            >
              {item.value}
            </NUI_Link>
          )}
          <Button
            size="sm"
            isIconOnly
            type="button"
            variant="light"
            className=" text-red-500"
            onClick={() => handleDelete(item.id)}
          >
            <MdDeleteForever size={20} />
          </Button>
        </div>
      ))}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-x-2">
          <Button
            size="sm"
            isIconOnly
            type="button"
            color="primary"
            onClick={handleAddText}
          >
            <MdOutlineTextFields size={20} />
          </Button>
          <Button
            size="sm"
            isIconOnly
            type="button"
            color="primary"
            isLoading={isUploadingImage}
            onClick={() => document.getElementById("file-picker").click()}
          >
            <FcAddImage size={20} />
          </Button>
          <AddLinkModal pages={pages} onAdd={handleAddLink} />
        </div>
        <input
          id="file-picker"
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          style={{ display: "none" }}
        />
        <Button type="submit" color="primary">
          {mode === "update" ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;

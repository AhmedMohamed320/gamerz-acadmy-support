"use client";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { Page, Question } from "@prisma/client";
import { Button } from "@nextui-org/button";

import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "@/app/actions/questions";
import TreeBuilder from "./TreeBuilder";

import { FaPlus } from "react-icons/fa6";

interface QuestionModalProps {
  question_?: Question;
  pages: Page[];
}
export default function QuestionModal({
  question_,
  pages,
}: QuestionModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [question, setQuestion] = useState<any>(question_);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const data = {
        title: question?.title || "",
        answer: question?.answer || "",
        children: question?.children || [],
      };
      console.log({ data });
      question_
        ? await updateQuestion({ where: { id: question_.id }, data })
        : await createQuestion({ data });
      toast.success(
        question_
          ? "Question updated successfully"
          : "Question created successfully"
      );
      onOpenChange();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!question_) return;
      setIsDeleting(true);
      await deleteQuestion({ where: { id: question_.id } });
      toast.success("Question deleted successfully");
      onOpenChange();
      setIsDeleting(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button
        variant={question ? "bordered" : "solid"}
        color="success"
        onPress={onOpen}
        startContent={question_ ? null : <FaPlus className="mr-1" size={14} />}
        className={question_ ? "border-gray-400" : ""}
      >
        {question_ ? question_.title : "اضافه"}
      </Button>
      <Modal
        size="full"
        className="max-w-7xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Question
              </ModalHeader>
              <ModalBody>
                <TreeBuilder
                  setQuestion={setQuestion}
                  question={question}
                  pages={pages}
                />
              </ModalBody>
              <ModalFooter className="justify-between">
                {question_ ? (
                  <Button
                    color="danger"
                    variant="solid"
                    onPress={handleDelete}
                    isLoading={isDeleting}
                  >
                    Delete
                  </Button>
                ) : (
                  <div></div>
                )}
                <div className="flex">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSave}
                    isLoading={isLoading}
                  >
                    Save
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

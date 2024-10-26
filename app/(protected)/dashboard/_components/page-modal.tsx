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

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import RichTextEditor from "./rich-text-editor";
import { FaPlus } from "react-icons/fa6";
import { Page } from "@prisma/client";
import { createPage, updatePage, deletePage } from "@/app/actions/pages"; // تأكد من استيراد deletePage
type Props = { page?: Page };
const PageModal = ({ page }: Props) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [title, setTitle] = useState(page?.title || "");
    const [content, setContent] = useState(page?.content || "");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSave = async () => {
        if (!title || !content) {
            return toast.error("Please fill all fields");
        }

        const newPage = { title, content };

        if (page) {
            setIsLoading(true);
            const updatedPage = await updatePage({
                where: { id: page.id },
                data: newPage,
            });
            if (updatedPage) {
                toast.success("Page updated successfully");
            }
            setIsLoading(false);
        } else {
            setIsLoading(true);
            const createdPage = await createPage({ data: newPage });
            if (createdPage) {
                toast.success("Page created successfully");
            }
            setIsLoading(false);
        }

        onOpenChange();
    };

    // دالة handleDelete لحذف الصفحة
    const handleDelete = async () => {
        if (!page) return;

        setIsDeleting(true);
        const deleted = await deletePage({ where: { id: page.id } });
        if (deleted) {
            toast.success("Page deleted successfully");
        }
        setIsDeleting(false);
        onOpenChange(); // إغلاق المودال بعد الحذف
    };

    return (
        <>
            <Button
                variant={page ? "bordered" : "solid"}
                color="primary"
                onPress={onOpen}
                startContent={
                    page ? null : <FaPlus className="mr-1" size={14} />
                }
                className={page ? "border-gray-400" : ""}
            >
                {page ? page.title : "اضافه"}
            </Button>
            <Modal
                size="5xl"
                scrollBehavior="inside"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {page ? "Edit Page" : "New Page"}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Page Title"
                                    variant="bordered"
                                    defaultValue={title}
                                    onValueChange={setTitle}
                                />
                                <RichTextEditor
                                    pageContent={page?.content}
                                    onChange={setContent}
                                />
                            </ModalBody>
                            <ModalFooter className="justify-between">
                                {page ? (
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
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
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
};

export default PageModal;

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
import { Page } from "@prisma/client";
import { Button } from "@nextui-org/button";
import { FaLink } from "react-icons/fa6";
import { Select, SelectItem } from "@nextui-org/select";

type Props = { pages: Page[]; onAdd: (pageId: string, title: string) => void };

const AddLinkModal = ({ pages, onAdd }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pageId, setPageId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handlePageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPageId = e.target.value;
    const selectedPage = pages.find((page) => page.id === selectedPageId);
    if (selectedPage) {
      setPageId(selectedPage.id);
      setTitle(selectedPage.title);
    }
  };

  const handleSave = () => {
    if (pageId && title) {
      onAdd(pageId, title);
      onOpenChange(); // Close the modal
      toast.success("Link added successfully");
    } else {
      toast.error("Please select a page");
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen} isIconOnly size="sm">
        <FaLink />
      </Button>
      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add Link</ModalHeader>
          <ModalBody>
            <Select
              label="Page"
              variant="bordered"
              placeholder="Select a page"
              onChange={handlePageSelect}
              // selectedKeys={selectedKeys}
            >
              {pages.map((page) => (
                <SelectItem key={page.id}>{page.title}</SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onOpenChange} color="danger">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLinkModal;

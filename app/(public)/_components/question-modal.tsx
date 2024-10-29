"use client";

import { useState, useRef, useEffect } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { useDisclosure } from "@nextui-org/modal";
import Link from "next/link";
import styles from "../questionsTree/QuestionsTree.module.css";
import { TbExternalLink } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

interface AnswerItem {
    id: string;
    type: "text" | "img" | "link";
    value: string;
    pageId?: string;
}

interface QuestionNode {
    id?: string;
    title?: string;
    label?: string;
    answer?: AnswerItem[];
    children?: QuestionNode[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface QuestionModalProps {
    question: QuestionNode;
    fullWidth?: boolean;
}

export default function QuestionModal({
    question,
    fullWidth = false,
}: QuestionModalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentNode, setCurrentNode] = useState<QuestionNode>(question);
    const [history, setHistory] = useState<QuestionNode[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: string;
    }>({});
    const activeCardRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleChildClick = (child: QuestionNode, questionId: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: child.id || "",
        }));
        setHistory((prevHistory) => [...prevHistory, currentNode]);
        setCurrentNode(child);
    };

    const handleBackToNode = (nodeIndex: number) => {
        const selectedNode = history[nodeIndex];
        setCurrentNode(selectedNode);
        setHistory(history.slice(0, nodeIndex)); // إزالة العناصر بعد العنصر المحدد
    };

    const resetScrollToActiveCard = () => {
        if (activeCardRef.current) {
            activeCardRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    useEffect(() => {
        resetScrollToActiveCard();
    }, [currentNode]);

    const renderAnswerItems = (answerItems?: AnswerItem[]) =>
        answerItems?.map((item) => (
            <div key={item.id}>
                {item.type === "text" && (
                    <p className="text-3xl">{item.value}</p>
                )}
                {item.type === "img" && (
                    <img src={item.value} alt="Answer" className="rounded-lg" />
                )}
                {item.type === "link" && (
                    <button>
                        <a href={`/pages/${item.pageId}`} target="_blank" className="flex items-center gap-3">
                            <p className="text-xl">{item.value}</p>
                            <TbExternalLink className="text-2xl" />
                        </a>
                    </button>
                )}
            </div>
        ));

    return (
        <div className="relative z-10">
            <img src="/Sayjn.gif" alt="" className="headerImg" />
            <div className={styles.upperDivQuestions}>
                {[...history, currentNode].map((node, index) => (
                    <div
                        key={node.id}
                        ref={index === history.length ? activeCardRef : null}
                        className={`${styles.card} ${
                            index === history.length ? styles.active : ""
                        }`}
                        onClick={() =>
                            index < history.length && handleBackToNode(index)
                        } // إضافة هذه السطر
                    >
                        {history.length > 0 && index === history.length && (
                            <div
                                className={styles.backHistory}
                                onClick={() =>
                                    handleBackToNode(history.length - 1)
                                }
                            >
                                <TiArrowUpThick />
                            </div>
                        )}
                        <p className="leading-loose font-medium">
                            {node.title || node.label}
                        </p>
                        <div className="flex flex-col text-center gap-4">
                            {renderAnswerItems(node.answer)}
                        </div>
                        {node.children && node.children.length > 0 && (
                            <div className="w-full">
                                <div className="grid grid-cols-2 gap-2">
                                    {node.children.map((child) => (
                                        <button
                                            key={child.id}
                                            onClick={() =>
                                                handleChildClick(
                                                    child,
                                                    node.id!
                                                )
                                            }
                                            className={`col-span-1 ${
                                                selectedOptions[node.id!] ===
                                                child.id
                                                    ? styles.selectedOption
                                                    : ""
                                            }`}
                                        >
                                            {child.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {history.length > 0 && index !== history.length && (
                            <div className="absolute -bottom-12 mx-auto flex items-center justify-center gap-4 w-full">
                                <IoIosArrowDown />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

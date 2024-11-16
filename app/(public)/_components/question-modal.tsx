"use client";

import { useState, useRef, useEffect } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { useDisclosure } from "@nextui-org/modal";
import styles from "../questionsTree/QuestionsTree.module.css";
import { TbExternalLink } from "react-icons/tb";
import { LuCheckCircle } from "react-icons/lu";

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
        setHistory((prevHistory) => prevHistory.slice(0, nodeIndex));
        setCurrentNode(selectedNode);
        setSelectedOptions((prev) => {
            const newOptions = { ...prev };
            history.slice(nodeIndex).forEach((node) => {
                delete newOptions[node.id!];
            });
            return newOptions;
        });
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
            <div key={item.id} className="p-4" >
                {item.type === "text" && (
                    <p
                        className={`leading-normal`}
                    >
                        {item.value
                            ?.split(/(https?:\/\/[^\s]+)/g)
                            .map((part, index) =>
                                /https?:\/\/[^\s]+/.test(part) ? (
                                    <div
                                        key={index}
                                        className="text-blue-500 underline mx-1"
                                    >
                                        <a
                                            href={part}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            من هنا
                                        </a>
                                    </div>
                                ) : (
                                    part
                                )
                            )}
                    </p>
                )}
                {item.type === "img" && (
                    <img src={item.value} alt="Answer" className="rounded-lg" />
                )}
                {item.type === "link" && (
                    <button>
                        <a
                            href={`/pages/${item.pageId}`}
                            target="_blank"
                            className="flex items-center gap-3"
                        >
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
                        } text-custom-light `}
                        onClick={() =>
                            index < history.length && handleBackToNode(index)
                        }
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
                                            className={`col-span-1 relative ${
                                                selectedOptions[node.id!] ===
                                                child.id
                                                    ? styles.selectedOption
                                                    : ""
                                            }`}
                                        >
                                            {selectedOptions[node.id!] ===
                                                child.id && (
                                                <div className="absolute left-2 top-2 text-white ">
                                                    <LuCheckCircle className="w-6" />
                                                </div>
                                            )}
                                            {child.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

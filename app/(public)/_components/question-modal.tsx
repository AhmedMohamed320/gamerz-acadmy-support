"use client";

import { useState } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Question } from "@prisma/client";
import Link from "next/link";
import { Link as NUI_Link } from "@nextui-org/link";
import styles from "../questionsTree/QuestionsTree.module.css";

interface AnswerItem {
    id: string;
    type: "text" | "img" | "link";
    value: string;
    pageId?: string;
}

interface QuestionNode extends Partial<Question> {
    children?: QuestionNode[];
    answer?: AnswerItem[];
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

    const handleChildClick = (child: QuestionNode) => {
        setHistory((prevHistory) => [...prevHistory, currentNode]);
        setCurrentNode(child);
    };

    const handleBack = () => {
        if (history.length > 0) {
            const previousNode = history[history.length - 1];
            setCurrentNode(previousNode);
            setHistory((prevHistory) => prevHistory.slice(0, -1));
        }
    };

    const renderAnswerItems = (answerItems?: AnswerItem[]) =>
        answerItems?.map((item) => (
            <div key={item.id} className="mb-4">
                {item.type === "text" && <p>{item.value}</p>}
                {item.type === "img" && (
                    <img src={item.value} alt="Answer" className="rounded-lg" />
                )}
                {item.type === "link" && (
                    <NUI_Link
                        as={Link}
                        isExternal
                        showAnchorIcon
                        href={`/pages/${item.pageId}`}
                    >
                        {item.value}
                    </NUI_Link>
                )}
            </div>
        ));

    return (
        <>
            <div className={styles.upperDivQuestions}>
                {[...history, currentNode].map((node, index) => (
                    <div
                        key={node.id}
                        className={`${styles.card} ${
                            index === history.length ? styles.active : ""
                        }`}
                    >
                        {history.length > 0 && index === history.length && (
                            <div
                                className={styles.backHistory}
                                onClick={handleBack}
                            >
                                <TiArrowUpThick />
                            </div>
                        )}
                        <p className="leading-loose font-medium">
                            {node.title || node.label}
                        </p>
                        {renderAnswerItems(node.answer)}
                        {node.children && node.children.length > 0 && (
                            <hr className="bg-slate-500 w-3/5" />
                        )}
                        {node.children && node.children.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 w-full">
                                {node.children.map((child) => (
                                    <button
                                        key={child.id}
                                        onClick={() => handleChildClick(child)}
                                        className="col-span-1"
                                    >
                                        {child.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

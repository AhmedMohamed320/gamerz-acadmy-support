"use client";

import { useState } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { useDisclosure } from "@nextui-org/modal";
import Link from "next/link";
import { Link as NUI_Link } from "@nextui-org/link";
import styles from "../questionsTree/QuestionsTree.module.css";
import { TbExternalLink } from "react-icons/tb";

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
            <div key={item.id}>
                {item.type === "text" && (
                    <p className="text-3xl">{item.value}</p>
                )}
                {item.type === "img" && (
                    <img src={item.value} alt="Answer" className="rounded-lg" />
                )}
                {item.type === "link" && (
                    <NUI_Link
                        as={Link}
                        isExternal
                        href={`/pages/${item.pageId}`}
                    >
                        <p className="text-xl">{item.value}</p>
                        <TbExternalLink className="text-2xl"/>
                    </NUI_Link>
                )}
            </div>
        ));

    return (
        <div className="relative z-10">
            <img src="/Sayjn.gif" alt="" className="headerImg" />
            <img src="/image (1).png" alt="" className="headerImg2" />
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
                        {node.children &&
                            node.answer &&
                            (node.children.length > 0 ||
                                node.answer.length > 0) && (
                                <hr className="bg-slate-500 w-3/5" />
                            )}
                        <div className="flex flex-col text-center">
                            {renderAnswerItems(node.answer)}
                        </div>
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
        </div>
    );
}

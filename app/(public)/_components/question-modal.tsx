"use client";

import { useState, useRef, useEffect } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import { useDisclosure } from "@nextui-org/modal";
import styles from "../start/QuestionsTree.module.css";
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
    const [showModal, setShowModal] = useState(false); // State for the modal
    const [timeRemaining, setTimeRemaining] = useState<number>(0); // State for the remaining time

    // Function to check if the current time is outside of 9 AM to 9 PM
    const isOutsideBusinessHours = () => {
        const now = new Date();
        const hours = now.getHours();
        return hours < 9 || hours >= 21;
    };

    // Function to calculate the remaining time until the next available time (9 AM or 9 PM)
    const calculateRemainingTime = () => {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();

        let nextAvailableTime = new Date(now);
        if (currentHours < 15) {
            // Next 3 PM (15:00)
            nextAvailableTime.setHours(15, 0, 0, 0);
        } else if (currentHours >= 15 && currentHours < 21) {
            // Between 3 PM and 9 PM
            nextAvailableTime.setHours(21, 0, 0, 0);
        } else {
            // After 9 PM, set to next day 3 PM
            nextAvailableTime.setDate(now.getDate() + 1);
            nextAvailableTime.setHours(15, 0, 0, 0);
        }

        return nextAvailableTime.getTime() - now.getTime();
    };
    // Function to start the countdown timer
    const startCountdown = () => {
        const interval = setInterval(() => {
            const remainingTime = calculateRemainingTime();
            setTimeRemaining(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

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
            <div key={item.id} className={`px-6 ${styles.titleDiv}`}>
                {item.type === "text" && (
                    <>
                        {item.value
                            ?.split(/(https?:\/\/[^\s]+)/g)
                            .map((part, index) =>
                                /https?:\/\/[^\s]+/.test(part) ? (
                                    <a
                                        key={index}
                                        href={part}
                                        className="mx-1 text-blue-500 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            if (
                                                !part.includes(
                                                    "ما%20وصلي%20الطلب"
                                                )
                                            ) {
                                                return; // تجاهل عرض الـ modal وعمل redirect عادي
                                            } else if (
                                                isOutsideBusinessHours()
                                            ) {
                                                e.preventDefault(); // Prevent redirect
                                                setShowModal(true); // Show the modal
                                                startCountdown(); // Start the countdown
                                            }
                                        }}
                                    >
                                        من هنا
                                    </a>
                                ) : (
                                    <p
                                        key={index}
                                        className={`leading-normal ${
                                            index === 0
                                                ? "font-medium leading-loose"
                                                : ""
                                        }`}
                                    >
                                        {part}
                                    </p>
                                )
                            )}
                    </>
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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Convert the remaining time from milliseconds to a readable format
    const formatRemainingTime = (timeInMs: number) => {
        const hours = Math.floor(timeInMs / 1000 / 60 / 60);
        const minutes = Math.floor((timeInMs / 1000 / 60) % 60);
        const seconds = Math.floor((timeInMs / 1000) % 60);
        return `${hours}   ساعة : ${minutes} دقيقة : ${seconds} ثانية`;
    };

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
                        } bg-gray-100 dark:bg-custom-dark-2`}
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
                        {/* <p className="font-medium leading-loose">
                            {node.title || node.label}
                        </p> */}

                        <div className="flex flex-col gap-4 text-center">
                            {renderAnswerItems(node.answer)}
                        </div>
                        {node.children && node.children.length > 0 && (
                            <div className="w-full">
                                <div className="grid grid-cols-2 gap-4">
                                    {node.children.map((child) => (
                                        <button
                                            key={child.id}
                                            onClick={() =>
                                                handleChildClick(
                                                    child,
                                                    node.id!
                                                )
                                            }
                                            className={`col-span-1 flex flex-col gap-1 justify-center items-center relative ${
                                                selectedOptions[node.id!] ===
                                                child.id
                                                    ? styles.selectedOption
                                                    : ""
                                            }`}
                                        >
                                            {selectedOptions[node.id!] ===
                                                child.id && (
                                                <div className="absolute text-white left-2 top-2 ">
                                                    <LuCheckCircle className="w-6" />
                                                </div>
                                            )}

                                            {child.answer &&
                                                child.answer.length > 0 &&
                                                child.answer[0].type ==
                                                    "img" && (
                                                    <div
                                                        className={
                                                            styles.imgButton
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                child.answer[0]
                                                                    .value
                                                            }
                                                            alt="Answer"
                                                            className="w-16 rounded-lg"
                                                        />
                                                    </div>
                                                )}

                                            <p>{child.label}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal to inform the user */}
            {showModal && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-90">
                    <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-8 p-8 text-center bg-white rounded-lg dark:bg-custom-dark-2">
                        <h2 className="text-4xl ">غير متاحين للتواصل الان</h2>
                        <p className="text-2xl font-medium ">
                            يمكنك التواصل معانا من الساعة 3 عصرا وحتى الساعة 9
                            مساءً.
                        </p>
                        <p className="mt-4 text-2xl leading-relaxed">
                            سنكون متاحين بعد : <br />
                            {formatRemainingTime(timeRemaining)}
                        </p>
                        <button
                            onClick={handleCloseModal}
                            className={styles.customButton}
                        >
                            حسنًا
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

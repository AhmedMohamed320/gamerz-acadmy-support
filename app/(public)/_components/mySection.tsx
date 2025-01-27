"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

const MySection = () => {
    const [visibleSections, setVisibleSections] = useState<{
        [key: string]: boolean;
    }>({});
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const toggleSection = (section: string) => {
        setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleProductClick = (product: string) => {
        setSelectedProduct(product);
        setShowPopup(true);
    };

    const handleClosePopup = () => setShowPopup(false);

    const handleWhatsAppClick = () => {
        const message = `مرحبًا، أريد المساعدة بخصوص: ${selectedProduct}`;
        const whatsappUrl = `https://wa.me/201280626320?text=${encodeURIComponent(
            message
        )}`;
        window.open(whatsappUrl, "_blank");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                handleClosePopup();
            }
        };

        if (showPopup)
            document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showPopup]);

    const sections = [
        {
            title: "🎮 شحن وخدمات الألعاب 🎮",
            key: "section1",
            products: [
                { name: "فورتنايت" },
                { name: "قراند" },
                { name: "اوفرواتش" },
                { name: "قنشن" },
                { name: "روبلوكس" },
                { name: "ليق اوف لجندز" },
            ],
        },
        {
            title: "🕹️ اشتري العابك 🕹️",
            key: "section2",
            products: [{ name: "لعبة ماينكرافت" }],
        },
        {
            title: "📦 اشتري تطبيقاتك 📦",
            key: "section3",
            products: [
                { name: "كاسبرسكي بريميوم" },
                { name: "ويندوز10 + ويندوز11" },
                { name: "منتجات اوفيس" },
                { name: "برامج الحماية" },
                { name: "ادوبي" },
                { name: "كانفا" },
            ],
        },
        {
            title: "🎞️ اشتري اشتراكاتك 🎞️",
            key: "section4",
            products: [
                { name: "نتفلكس" },
                { name: "شاهد" },
                {
                    name: "يوتيوب بريميوم",
                    children: [{ name: "السعوديه" }, { name: "دوله اخرى" }],
                },
                { name: "دسكورد نيترو" },
                { name: "قيم باس ألتمت" },
            ],
        },
    ];

    const renderProducts = (products: any[]) => {
        return products.map((product, idx) => (
            <li
                key={idx}
                onClick={(e) =>
                    !product.children && handleProductClick(product.name)
                }
            >
                <div
                    className="flex justify-between items-center w-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(`nested-${product.name}`);
                    }}
                >
                    {product.name}
                    {product.children && (
                        <div className="arrowIcon">
                            <IoIosArrowDown />
                        </div>
                    )}
                    {!product.children && (
                        <div className="arrowIcon">
                            <FaWhatsapp />
                        </div>
                    )}
                </div>
                {product.children && (
                    <ul
                        className={
                            visibleSections[`nested-${product.name}`]
                                ? "visible"
                                : ""
                        }
                    >
                        {product.children.map(
                            (child: any, childIdx: number) => (
                                <li
                                    key={childIdx}
                                    onClick={(e) => {
                                        handleProductClick(child.name);
                                    }}
                                >
                                    {child.name}
                                    <div className="arrowIcon">
                                        <FaWhatsapp />
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                )}
            </li>
        ));
    };

    return (
        <div className="flex flex-col gap-4 mt-4">
            {sections.map((section, index) => (
                <div key={index} className="parentOfListSection">
                    <div onClick={() => toggleSection(section.key)}>
                        <p>{section.title}</p>
                        <div className="arrowIcon">
                            <IoIosArrowDown />
                        </div>
                    </div>
                    <ul
                        className={
                            visibleSections[section.key] ? "visible" : ""
                        }
                    >
                        {renderProducts(section.products)}
                    </ul>
                </div>
            ))}

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
                    <div
                        ref={popupRef}
                        className="flex flex-col items-center justify-center w-full max-w-xl gap-6 p-8 text-center bg-white rounded-lg dark:bg-custom-dark-2"
                    >
                        <h2 className="text-3xl font-semibold">
                            تواصل معانا لحل مشكلتك بخصوص:
                        </h2>
                        <p className="text-2xl">{selectedProduct}</p>
                        <div
                            onClick={handleWhatsAppClick}
                            className="customButton"
                        >
                            تواصل عبر واتساب
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MySection;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

const MySection = () => {
    const [visibleSection, setVisibleSection] = useState<string | null>(null);
    const [visibleSection2, setVisibleSection2] = useState<string | null>(null);

    const [selectedProduct, setSelectedProduct] = useState<string | null>(null); // لتخزين المنتج المحدد
    const [showPopup, setShowPopup] = useState(false); // حالة إظهار الـ popup
    const popupRef = useRef<HTMLDivElement>(null); // Ref للـ popup

    const toggleSection = (section: string) => {
        if (visibleSection === section) {
            setVisibleSection(null); // إخفاء القائمة إذا كانت مفتوحة بالفعل
        } else {
            setVisibleSection(section); // إظهار القائمة المحددة
        }
    };
    const toggleSection2 = (section: string) => {
        if (visibleSection2 === section) {
            setVisibleSection2(null); // إخفاء القائمة إذا كانت مفتوحة بالفعل
        } else {
            setVisibleSection2(section); // إظهار القائمة المحددة
        }
    };

    const handleProductClick = (product: string) => {
        setSelectedProduct(product); // تعيين المنتج المحدد
        setShowPopup(true); // إظهار الـ popup
    };

    const handleClosePopup = () => {
        setShowPopup(false); // إخفاء الـ popup
    };

    const handleWhatsAppClick = () => {
        const message = `مرحبًا، أريد المساعدة بخصوص: ${selectedProduct}`;
        const whatsappUrl = `https://wa.me/201280626320?text=${encodeURIComponent(
            message
        )}`;
        window.open(whatsappUrl, "_blank"); // فتح واتساب في نافذة جديدة
    };

    // إغلاق الـ popup عند النقر خارج النافذة
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                handleClosePopup();
            }
        };

        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopup]);

    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* الأقسام */}
            <div className="parentOfListSection">
                <div onClick={() => toggleSection("section1")}>
                    <p>🎮 شحن وخدمات الألعاب 🎮</p>
                    <div className="arrowIcon">
                        <IoIosArrowDown />
                    </div>
                </div>
                <ul className={visibleSection === "section1" ? "visible" : ""}>
                    {[
                        "فورتنايت",
                        "قراند",
                        "اوفرواتش",
                        "قنشن",
                        "روبلوكس",
                        "ليق اوف لجندز",
                    ].map((product, index) => (
                        <li
                            key={index}
                            onClick={() => handleProductClick(product)}
                        >
                            {product}
                            <div className="arrowIcon">
                                <FaWhatsapp />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="parentOfListSection">
                <div onClick={() => toggleSection("section2")}>
                    <p>🕹️ اشتري العابك 🕹️</p>
                    <div className="arrowIcon">
                        <IoIosArrowDown />
                    </div>
                </div>

                <ul className={visibleSection === "section2" ? "visible" : ""}>
                    {["لعبة ماينكرافت"].map((product, index) => (
                        <li
                            key={index}
                            onClick={() => handleProductClick(product)}
                        >
                            {product}
                            <div className="arrowIcon">
                                <FaWhatsapp />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="parentOfListSection">
                <div onClick={() => toggleSection("section3")}>
                    <p>📦 اشتري تطبيقاتك 📦</p>
                    <div className="arrowIcon">
                        <IoIosArrowDown />
                    </div>
                </div>
                <ul className={visibleSection === "section3" ? "visible" : ""}>
                    {[
                        "كاسبرسكي بريميوم",
                        "ويندوز10 + ويندوز11",
                        "منتجات اوفيس",
                        "برامج الحماية",
                        "ادوبي",
                        "كانفا",
                    ].map((product, index) => (
                        <li
                            key={index}
                            onClick={() => handleProductClick(product)}
                        >
                            {product}
                            <div className="arrowIcon">
                                <FaWhatsapp />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="parentOfListSection">
                <div onClick={() => toggleSection("section4")}>
                    <p>🎞️ اشتري اشتراكاتك 🎞️</p>
                    <div className="arrowIcon">
                        <IoIosArrowDown />
                    </div>
                </div>
                <ul className={visibleSection === "section4" ? "visible" : ""}>
                    {[
                        "نتفلكس",
                        "شاهد",
                        "يوتيوب بريميوم",
                        "دسكورد نيترو",
                        "قيم باس ألتمت",
                    ].map((product, index) => (
                        <>
                            {product === "يوتيوب بريميوم" ? (
                                <>
                                    <li
                                        key={index}
                                        className="exceptionLi"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSection2("section4-nested");
                                        }}
                                    >
                                        <div className="w-full">
                                            <div className="flex justify-between items-center">
                                                {product}
                                                <div className="arrowIcon">
                                                    <IoIosArrowDown />
                                                </div>
                                            </div>
                                            <div
                                                className={`${
                                                    visibleSection2 ===
                                                    "section4-nested"
                                                        ? "visible"
                                                        : ""
                                                } nestedChild overflow-hidden`}
                                            >
                                              <p>
                                                اين تقيم ؟
                                              </p>
                                                <section className="flex gap-4 w-full mt-5">
                                                    <div
                                                        onClick={() =>
                                                            handleProductClick(
                                                                "السعوديه"
                                                            )
                                                        }
                                                    >
                                                        السعوديه
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            handleProductClick(
                                                                "دوله اخرى"
                                                            )
                                                        }
                                                    >
                                                        دوله اخرى
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li
                                        key={index}
                                        onClick={() =>
                                            handleProductClick(product)
                                        }
                                    >
                                        {product}
                                        <div className="arrowIcon">
                                            <FaWhatsapp />
                                        </div>
                                    </li>
                                </>
                            )}
                        </>
                    ))}
                </ul>
            </div>

            {/* الـ Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
                    <div
                        ref={popupRef}
                        className="flex flex-col items-center justify-center w-full max-w-xl gap-6 p-8 text-center bg-white rounded-lg dark:bg-custom-dark-2"
                    >
                        <h2 className="text-3xl font-semibold ">
                            تواصل معانا لحل مشكلتك بخصوص:
                        </h2>
                        <p className="text-2xl ">{selectedProduct}</p>
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

"use client";
import React, { useState, useEffect, useRef } from "react";

const MySection = () => {
    const [visibleSection, setVisibleSection] = useState<string | null>(null);
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

    const handleProductClick = (product: string) => {
        setSelectedProduct(product); // تعيين المنتج المحدد
        setShowPopup(true); // إظهار الـ popup
    };

    const handleClosePopup = () => {
        setShowPopup(false); // إخفاء الـ popup
    };

    const handleWhatsAppClick = () => {
        const message = `مرحبًا، أريد المساعدة بخصوص: ${selectedProduct}`;
        const whatsappUrl = `https://wa.me/201280626320?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank"); // فتح واتساب في نافذة جديدة
    };

    // إغلاق الـ popup عند النقر خارج النافذة
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
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
                <p onClick={() => toggleSection("section1")}>
                    🎮 شحن وخدمات الألعاب 🎮
                </p>
                <ul className={visibleSection === "section1" ? "visible" : ""}>
                    {["فورتنايت", "قراند", "اوفرواتش", "قنشن", "روبلوكس", "ليق اوف لجندز"].map(
                        (product, index) => (
                            <li key={index} onClick={() => handleProductClick(product)}>
                                {product}
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className="parentOfListSection">
                <p onClick={() => toggleSection("section2")}>
                    🕹️ اشتري العابك 🕹️
                </p>
                <ul className={visibleSection === "section2" ? "visible" : ""}>
                    {["لعبة ماينكرافت"].map((product, index) => (
                        <li key={index} onClick={() => handleProductClick(product)}>
                            {product}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="parentOfListSection">
                <p onClick={() => toggleSection("section3")}>
                    📦 اشتري تطبيقاتك 📦
                </p>
                <ul className={visibleSection === "section3" ? "visible" : ""}>
                    {["كاسبرسكي بريميوم", "ويندوز10 + ويندوز11", "منتجات اوفيس", "برامج الحماية", "ادوبي", "كانفا"].map(
                        (product, index) => (
                            <li key={index} onClick={() => handleProductClick(product)}>
                                {product}
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className="parentOfListSection">
                <p onClick={() => toggleSection("section4")}>
                    🎞️ اشتري اشتراكاتك 🎞️
                </p>
                <ul className={visibleSection === "section4" ? "visible" : ""}>
                    {["نتفلكس", "شاهد", "يوتيوب بريميوم", "دسكورد نيترو", "قيم باس ألتمت"].map(
                        (product, index) => (
                            <li key={index} onClick={() => handleProductClick(product)}>
                                {product}
                            </li>
                        )
                    )}
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
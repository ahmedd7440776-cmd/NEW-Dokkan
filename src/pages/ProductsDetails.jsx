import { useState } from "react";
import { useCartStore } from "../store/useCartStore"; // افترضنا وجود متجر السلة

export default function ProductDetailsModal({ product, isOpen, onClose }) {
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart); // أو دالة السلة الخاصة بك

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        // إضافة المنتج مع الكمية المحددة إلى السلة
        addToCart({ ...product, quantity });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full p-6 relative overflow-hidden shadow-2xl animate-fade-in">

                {/* زر الإغلاق */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition"
                >
                    ✕
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* صورة المنتج */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 flex items-center justify-center h-64 md:h-80">
                        <img
                            src={product.image || product.img}
                            alt={product.title || product.name}
                            className="max-h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* معلومات المنتج */}
                    <div className="flex flex-col justify-between h-full space-y-4">
                        <div>
                            {/* القسم / التصنيف */}
                            {product.category && (
                                <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-50 dark:bg-green-950/40 px-2.5 py-1 rounded-full">
                                    {product.category}
                                </span>
                            )}

                            {/* عنوان المنتج */}
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                                {product.title || product.name}
                            </h2>

                            {/* السعر */}
                            <div className="flex items-center gap-3 mt-3">
                                <span className="text-2xl font-black text-green-600 dark:text-green-400">
                                    {product.price} ج.م
                                </span>
                                {product.oldPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                        {product.oldPrice} ج.م
                                    </span>
                                )}
                            </div>

                            {/* الوصف */}
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                                {product.description || "لا يوجد وصف إضافي متوفر لهذا المنتج حالياً."}
                            </p>
                        </div>

                        {/* التحكم في الكمية والإضافة للسلة */}
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    الكمية:
                                </span>
                                <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                        className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-100 font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 font-semibold text-gray-800 dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity((prev) => prev + 1)}
                                        className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-100 font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-green-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <span>إضافة إلى السلة</span>
                                <span className="text-sm opacity-80">({product.price * quantity} ج.م)</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}





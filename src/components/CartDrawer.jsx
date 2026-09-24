import { X, Plus, Minus, ShoppingBag, Trash2, Trash2Icon } from "lucide-react"

import { useCartStore } from "../store/useCartStore"
import ChechOutModel from "./ChechOutModel";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";


export default function CartDrawer({ isOpen, onClose, onOpenAuth }) {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updataQuantity = useCartStore((state) => state.updataQuantity);
    const getTotalPrice = useCartStore((state) => state.getTotalItems);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

    const handleCheckOut = () => {
        if (!isAuthenticated) {
            onClose(); // close the cart
            onOpenAuth(); //open login modal
        } else {
            setIsCheckOutOpen(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden ">
            {/*dark bg once youy open the cart*/}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-y-0 left-0 max-w-full flex pl-10">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-screen max-w-md bg-white dark:bg-gray-800 shadow-2xl flex flex-col justify-between z-10"
                >
                    {/*cart's headers*/}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">سلة التسوق</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 p-2 dark:text-red-500 dark:hover:text-red-800 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* cart's content*/}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>السلة فارغة حالياً</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 p-3 dark:bg-gray-800 dark:border-gray-600 border-gray-200 border bg-gray-50 rounded-xl items-center"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-contain dark:bg-gray-600 dark:border-gray-500 dark:border bg-white p-2 rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm line-clamp-1 dark:text-white text-gray-800">
                                            {item.title}
                                        </h4>
                                        <span className="text-xs font-bold text-green-600">
                                            ${item.price}
                                        </span>
                                        {/* plus or miuns buttons */}

                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updataQuantity(item.id, item.quantity - 1)}
                                                className="p-1 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:hover:bg-black hover:bg-gray-200"
                                            >
                                                <Minus className="w-3 h-3 dark:text-white" />
                                            </button>
                                            <span className="text-xs font-bold w-4 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updataQuantity(item.id, item.quantity + 1)}
                                                className="p-1 bg-white  dark:bg-gray-700 rounded-md border border-gray-300  dark:hover:bg-black hover:bg-gray-200"
                                            >
                                                <Plus className="w-3 h-3 dark:text-white" />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-600 p-2"
                                    >
                                        <Trash2 className=" w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    {/* check and the buttom of the cart */}

                    {cart.length > 0 && (
                        <div className="p-6 border-t border-gray-200 dark:bg-gray-800 bg-gray-50 space-y-4">
                            <div className="flex justify-between items-center text-lg font-extrabold">
                                <span className="dark:text-white text-gray-800">الإجمالي</span>
                                <span className="text-green-600">
                                    ${(Number(getTotalPrice()) || 0).toFixed(1)}
                                </span>
                            </div>
                            <button
                                onClick={handleCheckOut}
                                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition-colors cursor-pointer"
                            >
                                متابعة الشراء
                            </button>
                            <ChechOutModel
                                isOpen={isCheckOutOpen}
                                onClose={() => {
                                    setIsCheckOutOpen(false);
                                    onClose();
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}










// import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
// import { useCartStore } from "../store/useCartStore";

// export default function CartDrawer({ isOpen, onClose, onOpenAuth }) {
//     const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

//     const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
//             <div
//                 className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
//                 onClick={onClose}
//             />

//             <div className="fixed inset-y-0 left-0 max-w-full flex pl-10">
//                 <div className="w-screen max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-2xl flex flex-col justify-between z-10 transition-colors duration-300 border-r border-gray-100 dark:border-gray-800">

//                     {/* الهيدر */}
//                     <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <ShoppingBag className="w-5 h-5 text-green-700 dark:text-green-400" />
//                             <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//                                 سلة التسوق ({cart.length})
//                             </h2>
//                         </div>
//                         <button
//                             onClick={onClose}
//                             className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
//                         >
//                             <X className="w-5 h-5" />
//                         </button>
//                     </div>

//                     {/* القائمة */}
//                     <div className="flex-1 overflow-y-auto p-5 space-y-4">
//                         {cart.length === 0 ? (
//                             <div className="text-center py-16 text-gray-400 dark:text-gray-500">
//                                 <ShoppingBag className="w-16 h-16 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
//                                 <p className="font-semibold text-gray-700 dark:text-gray-300">السلة فارغة حالياً</p>
//                                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">ابدأ بإضافة المنتجات لملء السلة</p>
//                             </div>
//                         ) : (
//                             cart.map((item) => (
//                                 <div
//                                     key={item.id}
//                                     className="flex gap-4 p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl items-center border border-gray-100 dark:border-gray-800 transition-colors"
//                                 >
//                                     <img
//                                         src={item.image}
//                                         alt={item.title}
//                                         className="w-16 h-16 object-contain bg-white p-2 rounded-xl border border-gray-100 dark:border-gray-700 shrink-0"
//                                     />
//                                     <div className="flex-1 min-w-0">
//                                         <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 truncate">
//                                             {item.title}
//                                         </h4>
//                                         <p className="text-xs font-black text-green-700 dark:text-green-400 mt-1">
//                                             {item.price} ج.م
//                                         </p>

//                                         {/* التحكم بالكمية */}
//                                         <div className="flex items-center gap-2 mt-2">
//                                             <button
//                                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                                 className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//                                             >
//                                                 <Minus className="w-3 h-3" />
//                                             </button>
//                                             <span className="text-xs font-bold px-1">{item.quantity}</span>
//                                             <button
//                                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                                 className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//                                             >
//                                                 <Plus className="w-3 h-3" />
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <button
//                                         onClick={() => removeFromCart(item.id)}
//                                         className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition shrink-0"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     {/* الفوتر مع المجموع الإجمالي */}
//                     {cart.length > 0 && (
//                         <div className="p-5 border-t border-gray-100 dark:border-gray-800 space-y-3">
//                             <div className="flex items-center justify-between text-sm">
//                                 <span className="text-gray-500 dark:text-gray-400">الإجمالي:</span>
//                                 <span className="text-lg font-black text-green-700 dark:text-green-400">
//                                     {totalPrice.toFixed(2)} ج.م
//                                 </span>
//                             </div>

//                             <button className="w-full py-3 bg-green-800 dark:bg-green-600 hover:bg-green-900 dark:hover:bg-green-500 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer">
//                                 <span>إتمام الشراء</span>
//                                 <ArrowRight className="w-4 h-4 rotate-180" />
//                             </button>

//                             <button
//                                 onClick={clearCart}
//                                 className="w-full py-2 text-xs text-red-500 dark:text-red-400 hover:underline transition text-center"
//                             >
//                                 تفريغ السلة
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
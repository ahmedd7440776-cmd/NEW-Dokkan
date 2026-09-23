// import { X, Heart, Trash2, ShoppingBag } from "lucide-react";
// import { useWishListStore } from "../store/useWishListStore";
// import { useCartStore } from "../store/useCartStore";

// export default function WishListDrawer({ isOpen, onClose }) {
//     const wishList = useWishListStore((state) => state.wishList);
//     const toggleWishList = useWishListStore((state) => state.toggleWishList);
//     const clearWishList = useWishListStore((state) => state.clearWishList);
//     const addToCart = useCartStore((state) => state.addToCart);

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
//             {/* خلفية معتمة عند الفتح */}
//             <div
//                 className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//                 onClick={onClose}
//             />

//             <div className="fixed inset-y-0 left-0 max-w-full flex pl-10">
//                 <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between z-10">

//                     {/* الهيدر */}
//                     <div className="p-5 border-b border-gray-100 flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <Heart className="w-5 h-5 text-red-500 fill-red-500" />
//                             <h2 className="text-lg font-bold text-gray-900">المفضلة ({wishList.length})</h2>
//                         </div>
//                         <button
//                             onClick={onClose}
//                             className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
//                         >
//                             <X className="w-5 h-5" />
//                         </button>
//                     </div>

//                     {/* قائمة المنتجات */}
//                     <div className="flex-1 overflow-y-auto p-5 space-y-4">
//                         {wishList.length === 0 ? (
//                             <div className="text-center py-16 text-gray-400">
//                                 <Heart className="w-16 h-16 mx-auto mb-3 text-gray-300" />
//                                 <p className="font-semibold">قائمة المفضلة فارغة حالياً</p>
//                                 <p className="text-xs text-gray-400 mt-1">تصفح المنتجات واضغط على القلب لإضافتها هنا</p>
//                             </div>
//                         ) : (
//                             wishList.map((product) => (
//                                 <div key={product.id} className="flex gap-4 p-3 bg-gray-50/80 rounded-2xl items-center border border-gray-100">
//                                     <img
//                                         src={product.image}
//                                         alt={product.title}
//                                         className="w-16 h-16 object-contain bg-white p-2 rounded-xl border border-gray-100"
//                                     />
//                                     <div className="flex-1 min-w-0">
//                                         <h4 className="font-bold text-sm text-gray-800 truncate">
//                                             {product.title}
//                                         </h4>
//                                         <p className="text-xs font-black text-green-700 mt-1">
//                                             {product.price} ج.م
//                                         </p>
//                                     </div>

//                                     <div className="flex items-center gap-1">
//                                         {/* نقل للسلة */}
//                                         <button
//                                             onClick={() => {
//                                                 addToCart(product);
//                                                 toggleWishList(product);
//                                             }}
//                                             title="نقل إلى السلة"
//                                             className="p-2 text-green-700 hover:bg-green-100 rounded-xl transition"
//                                         >
//                                             <ShoppingBag className="w-4 h-4" />
//                                         </button>

//                                         {/* حذف من المفضلة */}
//                                         <button
//                                             onClick={() => toggleWishList(product)}
//                                             title="حذف من المفضلة"
//                                             className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"
//                                         >
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     {/* الفوتر عند وجود منتجات */}
//                     {wishList.length > 0 && (
//                         <div className="p-5 border-t border-gray-100">
//                             <button
//                                 onClick={clearWishList}
//                                 className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2"
//                             >
//                                 <Trash2 className="w-4 h-4" />
//                                 <span>مسح كل المفضلة</span>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }





















import { X, Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishListStore } from "../store/useWishListStore";
import { useCartStore } from "../store/useCartStore";

export default function WishListDrawer({ isOpen, onClose }) {
    const wishList = useWishListStore((state) => state.wishList);
    const toggleWishList = useWishListStore((state) => state.toggleWishList);
    const clearWishList = useWishListStore((state) => state.clearWishList);
    const addToCart = useCartStore((state) => state.addToCart);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
            {/* خلفية معتمة عند الفتح */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="fixed inset-y-0 left-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-2xl flex flex-col justify-between z-10 transition-colors duration-300 border-r border-gray-100 dark:border-gray-800">

                    {/* الهيدر */}
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                المفضلة ({wishList.length})
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* قائمة المنتجات */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {wishList.length === 0 ? (
                            <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                                <Heart className="w-16 h-16 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
                                <p className="font-semibold text-gray-700 dark:text-gray-300">قائمة المفضلة فارغة حالياً</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">تصفح المنتجات واضغط على القلب لإضافتها هنا</p>
                            </div>
                        ) : (
                            wishList.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex gap-4 p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl items-center border border-gray-100 dark:border-gray-800 transition-colors"
                                >
                                    {/* صورة المنتج مع خلفية بيضاء ثابتة لضمان وضوح صور المنتجات الشفافة */}
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-16 h-16 object-contain bg-white p-2 rounded-xl border border-gray-100 dark:border-gray-700 shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 truncate">
                                            {product.title}
                                        </h4>
                                        <p className="text-xs font-black text-green-700 dark:text-green-400 mt-1">
                                            {product.price} ج.م
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0">
                                        {/* نقل للسلة */}
                                        <button
                                            onClick={() => {
                                                addToCart(product);
                                                toggleWishList(product);
                                            }}
                                            title="نقل إلى السلة"
                                            className="p-2 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/50 rounded-xl transition cursor-pointer"
                                        >
                                            <ShoppingBag className="w-4 h-4" />
                                        </button>

                                        {/* حذف من المفضلة */}
                                        <button
                                            onClick={() => toggleWishList(product)}
                                            title="حذف من المفضلة"
                                            className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* الفوتر عند وجود منتجات */}
                    {wishList.length > 0 && (
                        <div className="p-5 border-t border-gray-100 dark:border-gray-800">
                            <button
                                onClick={clearWishList}
                                className="w-full py-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>مسح كل المفضلة</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
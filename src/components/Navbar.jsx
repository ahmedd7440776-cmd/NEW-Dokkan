
// import { ShoppingBag, Search, Store, Heart, HeartIcon, Settings, X, User, LogOut, LogOutIcon, Sun, Moon } from 'lucide-react';
// import { useCartStore } from '../store/useCartStore';
// import { useFilterStore } from '../store/useFilterStore';
// import { useAuthStore } from '../store/useAuthStore';
// import { useEffect, useState } from 'react';
// import AuthModle from './AuthModle';
// import { useWishListStore } from '../store/useWishListStore';
// import { createPortal } from 'react-dom'
// import { useThemeStore } from '../store/useThemeStore';


// export default function Navbar({ onOpenCart, onOpenWishList }) {

//     // dark mood extruact
//     const { isDarkMode, toggleDarkMode } = useThemeStore();
//     useEffect(() => {
// if(isDarkMode){
//     document.documentElement.classList.add('dark')
// }else{
//     document.documentElement.classList.remove('dark')

// }


// }, [isDarkMode])

//     const wishlist = useWishListStore((state) => state.wishList);
//     const { user, isAuthenticated, logout } = useAuthStore();
//     const [isAuthOpen, setIsAuthOpen] = useState(false);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const totalItems = useCartStore((state) =>
//         state.cart.reduce((total, item) => total + item.quantity, 0)
//     );

//     const searchQuery = useFilterStore((state) => state.searchQuery);
//     const setSearchQuery = useFilterStore((state) => state.setSearchQuery);

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <header className="sticky top-0 z-50 bg-white/80     dark:bg-gray-950 dark:text-white transition-colors duration-300   backdrop-blur-md border-b border-gray-100 shadow-sm">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">

//                 {/* 1. اللوجو (ظاهر في جميع الشاشات) */}
//                 <div className="flex items-center gap-2 cursor-pointer shrink-0">
//                     <div className="bg-green-900/90 text-white    dark:bg-green7400 dark:text-gray-100 transition-colors duration-300  p-2 rounded-xl shadow-md shadow-green-200">
//                         <Store className="w-5 h-5 sm:w-6 sm:h-6" />
//                     </div>
//                     <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
//                         دُكّان<span className="text-green-900/90">.</span>
//                     </span>
//                 </div>




//                 {/* darkmode and lightmode */}
//                 <div>
//                     <button
//                         onClick={toggleDarkMode}
//                         title={isDarkMode ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع المضي'}
//                         type='button'
//                         className='p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-800 rounded-full transition-colors cursor-pointer'
//                     >
//                         {isDarkMode ?
//                             (
//                                 <Sun className='w-5 h-5 text-yellow-400' />
//                             ) :
//                             (
//                                 <Moon className='w-5 h-5 text-gray-400' />
//                             )
//                         }
//                     </button>
//                 </div>




//                 {/* 2. شريط البحث (مستقل وظاهر في الموبايل والكمبيوتر) */}
//                 <form onSubmit={handleSearchSubmit} className="relative flex flex-1 items-center max-w-xs sm:max-w-md mx-2">
//                     <input
//                         type="text"
//                         placeholder="ابحث عن منتج..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 pr-8 pl-3 sm:py-2 sm:pr-10 sm:pl-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition-all"
//                     />
//                     <button
//                         type="submit"
//                         title="بحث"
//                         className="absolute left-1 top-1/2 -translate-y-1/2 bg-green-700 hover:bg-green-900 text-white p-1 sm:p-1.5 rounded-full transition-colors cursor-pointer"
//                     >
//                         <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     </button>
//                 </form>

//                 {/* 3. عناصر الشاشات الكبيرة فقط (تختفي في الموبايل) */}
//                 <div className="hidden md:flex items-center gap-3">
//                     {isAuthenticated ? (
//                         <div className="flex items-center gap-2">
//                             <span className="text-sm font-semibold text-gray-700">
//                                 مرحباً {user?.name}
//                             </span>
//                             <button
//                                 type="button"
//                                 onClick={logout}
//                                 title="تسجيل الخروج"
//                                 className="p-2 text-gray-500 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
//                             >
//                                 <LogOut className="w-4 h-4" />
//                             </button>
//                         </div>
//                     ) : (
//                         <button
//                             type="button"
//                             onClick={() => setIsAuthOpen(true)}
//                             className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-all"
//                         >
//                             <User className="w-4 h-4" />
//                             <span>تسجيل الدخول</span>
//                         </button>
//                     )}

//                     {/* زر المفضلة للكمبيوتر */}
//                     <button
//                         type="button"
//                         onClick={onOpenWishList}
//                         className="relative p-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
//                         aria-label="قائمة المفضلة"
//                     >
//                         <HeartIcon className={`w-6 h-6 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
//                         {wishlist.length > 0 && (
//                             <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 font-bold flex items-center justify-center animate-pulse">
//                                 {wishlist.length}
//                             </span>
//                         )}
//                     </button>
//                 </div>

//                 {/* 4. الأزرار الظاهرة في كل الشاشات (السلة + الترس للموبايل) */}
//                 <div className="flex items-center gap-1 sm:gap-2">
//                     {/* زر السلة */}
//                     <button
//                         type="button"
//                         onClick={onOpenCart}
//                         className="relative p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors cursor-pointer"
//                         aria-label="سلة التسوق"
//                     >
//                         <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-green-800" />
//                         {totalItems > 0 && (
//                             <span className="absolute top-0 right-0 bg-green-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
//                                 {totalItems}
//                             </span>
//                         )}
//                     </button>

//                     {/* زر الترس (يظهر فقط في الموبايل md:hidden) */}
//                     <button
//                         type="button"
//                         onClick={() => setIsMobileMenuOpen(true)}
//                         className="md:hidden p-2 text-gray-700 hover:text-green-700  hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
//                         aria-label="الإعدادات والقائمة"
//                         title="الإعدادات"
//                     >
//                         <Settings className="w-5 h-5 text-gray-700" />
//                     </button>
//                 </div>
//             </div>

//             {/* 5. القائمة الجانبية للموبايل (مستقلة تماماً في أصل المكون) */}
//             {isMobileMenuOpen &&
//                 createPortal(
//                     <div className="fixed inset-0 z-9999 md:hidden" dir="rtl">
//                         {/* خلفية سوداء معتمة */}
//                         <div
//                             onClick={() => setIsMobileMenuOpen(false)}
//                             className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
//                         />

//                         {/* القائمة الجانبية */}
//                         <aside className="fixed inset-y-0 right-0 w-72 max-w-full bg-white/80 shadow-2xl flex flex-col justify-between z-10000 p-6 h-100">
//                             <div>
//                                 {/* الهيدر */}
//                                 <div className="flex items-center justify-between pb-4 border-b border-gray-500">
//                                     <div className="flex items-center gap-2">
//                                         <Settings className="w-5 h-5 text-green-700" />
//                                         <h3 className="font-bold text-gray-900 text-base">الإعدادات والقائمة</h3>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         onClick={() => setIsMobileMenuOpen(false)}
//                                         className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition cursor-pointer"
//                                     >
//                                         <X className="w-5 h-5" />
//                                     </button>
//                                 </div>

//                                 {/* معلومات الحساب */}
//                                 {isAuthenticated && (
//                                     <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-3">
//                                         <div className="w-10 h-10 rounded-full bg-green-800 text-white font-bold flex items-center justify-center">
//                                             {user?.name?.charAt(0).toUpperCase()}
//                                         </div>
//                                         <div>
//                                             <p className="text-sm font-bold text-gray-900">{user?.name}</p>
//                                             <p className="text-xs text-green-700 font-medium">حساب نشط</p>
//                                         </div>
//                                     </div>
//                                 )}



//                                 {/*  dark and light mode */}

//                                 <button
//                                     className='w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition cursor-pointer'
//                                     type='button'
//                                     onClick={toggleDarkMode}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         {isDarkMode ? (
//                                             <Sun className='w-5 h-5 text-yellow-400' />
//                                         ) : (
//                                             <Moon className='w-5 h-5 text-gray-600 dark:text-gray-300' />
//                                         )}
//                                         <span className='text-sm font-semibold'>
//                                             {isDarkMode ? 'الوضع الداكن' : "الوضع المضي"}
//                                         </span>
//                                     </div>
//                                 </button>


//                                 {/* خيار المفضلة */}
//                                 <div className="mt-6 space-y-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             setIsMobileMenuOpen(false);
//                                             onOpenWishList();
//                                         }}
//                                         className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition cursor-pointer"
//                                     >
//                                         <div className="flex items-center gap-3">
//                                             <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
//                                             <span className="text-sm font-semibold">المفضلة</span>
//                                         </div>
//                                         {wishlist.length > 0 && (
//                                             <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
//                                                 {wishlist.length}
//                                             </span>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* زر التسجيل أو الخروج في أسفل القائمة */}
//                             <div className="pt-4 border-t border-gray-500">
//                                 {isAuthenticated ? (
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             logout();
//                                             setIsMobileMenuOpen(false);
//                                         }}
//                                         className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-sm transition cursor-pointer"
//                                     >
//                                         <LogOutIcon className="w-4 h-4" />
//                                         <span>تسجيل الخروج</span>
//                                     </button>
//                                 ) : (
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             setIsMobileMenuOpen(false);
//                                             setIsAuthOpen(true);
//                                         }}
//                                         className="w-full flex items-center justify-center gap-2 p-3 bg-gray-900 text-white hover:bg-green-900 rounded-xl font-bold text-sm transition cursor-pointer shadow-md shadow-green-100"
//                                     >
//                                         <User className="w-4 h-4" />
//                                         <span>تسجيل الدخول</span>
//                                     </button>
//                                 )}
//                             </div>
//                         </aside>
//                     </div>, document.body
//                 )}

//             <AuthModle isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
//         </header>
//     );
// }





import { ShoppingBag, Search, Store, Heart, HeartIcon, Settings, X, User, LogOut, LogOutIcon, Sun, Moon } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useFilterStore } from '../store/useFilterStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useState } from 'react';
import AuthModle from './AuthModle';
import { useWishListStore } from '../store/useWishListStore';
import { createPortal } from 'react-dom';
import { useThemeStore } from '../store/useThemeStore';
import PriceFilter from '../store/PriceFilter';

export default function Navbar({ onOpenCart, onOpenWishList }) {
    const { isDarkMode, toggleDarkMode } = useThemeStore();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const wishlist = useWishListStore((state) => state.wishList);
    const { user, isAuthenticated, logout } = useAuthStore();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const totalItems = useCartStore((state) =>
        state.cart.reduce((total, item) => total + item.quantity, 0)
    );

    const searchQuery = useFilterStore((state) => state.searchQuery);
    const setSearchQuery = useFilterStore((state) => state.setSearchQuery);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 dark:text-white transition-colors duration-300 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">

                {/* 1. اللوجو */}
                <div className="flex items-center gap-2 cursor-pointer shrink-0">
                    <div className="bg-green-700 text-white dark:bg-green-600 p-2 rounded-xl shadow-md transition-colors">
                        <Store className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white transition-colors">
                        دُكّان<span className="text-green-600 dark:text-green-500">.</span>
                    </span>
                </div>

                {/* Dark mode Toggle Button */}
                <div>
                    <button
                        onClick={toggleDarkMode}
                        title={isDarkMode ? 'تفعيل الوضع المضيء' : 'تفعيل الوضع الداكن'}
                        type='button'
                        className='p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer'
                    >
                        {isDarkMode ? (
                            <Sun className='w-5 h-5 text-yellow-400' />
                        ) : (
                            <Moon className='w-5 h-5 text-gray-600' />
                        )}
                    </button>
                </div>


                {/* 2. شريط البحث */}
                <form onSubmit={handleSearchSubmit} className="relative flex flex-1 items-center max-w-xs sm:max-w-md mx-2">
                    <input
                        type="text"
                        placeholder="ابحث عن منتج..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-full py-1.5 pr-8 pl-3 sm:py-2 sm:pr-10 sm:pl-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                    <button
                        type="submit"
                        title="بحث"
                        className="absolute left-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white p-1 sm:p-1.5 rounded-full transition-colors cursor-pointer"
                    >
                        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                </form>

                {/* 3. عناصر الشاشات الكبيرة */}
                <div className="hidden md:flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                مرحباً {user?.name}
                            </span>
                            <button
                                type="button"
                                onClick={logout}
                                title="تسجيل الخروج"
                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsAuthOpen(true)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all"
                        >
                            <User className="w-4 h-4" />
                            <span>تسجيل الدخول</span>
                        </button>
                    )}

                    {/* زر المفضلة */}
                    <button
                        type="button"
                        onClick={onOpenWishList}
                        className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors cursor-pointer"
                        aria-label="قائمة المفضلة"
                    >
                        <HeartIcon className={`w-6 h-6 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                        {wishlist.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 font-bold flex items-center justify-center animate-pulse">
                                {wishlist.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* 4. الأزرار الظاهرة في كل الشاشات */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* زر السلة */}
                    <button
                        type="button"
                        onClick={onOpenCart}
                        className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-full transition-colors cursor-pointer"
                        aria-label="سلة التسوق"
                    >
                        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-green-700 dark:text-green-500" />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* زر الإعدادات للموبايل */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
                        aria-label="الإعدادات والقائمة"
                        title="الإعدادات"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* 5. القائمة الجانبية للموبايل */}
            {isMobileMenuOpen &&
                createPortal(
                    <div className="fixed inset-0 z-9999 md:hidden" dir="rtl">
                        <div
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        />

                        <aside className="fixed inset-y-0 right-0 w-72 max-w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-2xl flex flex-col justify-between z-[10000] p-6 border-l border-gray-100 dark:border-gray-800 transition-colors">
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-green-600 dark:text-green-500" />
                                        <h3 className="font-bold text-gray-900 dark:text-white text-base">الإعدادات والقائمة</h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {isAuthenticated && (
                                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/40 rounded-xl flex items-center gap-3 border border-green-100 dark:border-green-900/30">
                                        <div className="w-10 h-10 rounded-full bg-green-700 text-white font-bold flex items-center justify-center shrink-0">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                                            <p className="text-xs text-green-600 dark:text-green-400 font-medium">حساب نشط</p>
                                        </div>
                                    </div>
                                )}

                                {/* زر تغيير المود في القائمة الجانبية */}
                                <div className="mt-4 space-y-2">
                                    <button
                                        className='w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition cursor-pointer'
                                        type='button'
                                        onClick={toggleDarkMode}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isDarkMode ? (
                                                <Sun className='w-5 h-5 text-yellow-400' />
                                            ) : (
                                                <Moon className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                                            )}
                                            <span className='text-sm font-semibold'>
                                                {isDarkMode ? 'الوضع المضيء' : 'الوضع الداكن'}
                                            </span>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            onOpenWishList();
                                        }}
                                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                                            <span className="text-sm font-semibold">المفضلة</span>
                                        </div>
                                        {wishlist.length > 0 && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                                {wishlist.length}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                {isAuthenticated ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-xl font-bold text-sm transition cursor-pointer"
                                    >
                                        <LogOutIcon className="w-4 h-4" />
                                        <span>تسجيل الخروج</span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setIsAuthOpen(true);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 p-3 bg-gray-900 dark:bg-green-600 text-white hover:bg-gray-800 dark:hover:bg-green-700 rounded-xl font-bold text-sm transition cursor-pointer shadow-md"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>تسجيل الدخول</span>
                                    </button>
                                )}
                            </div>
                        </aside>
                    </div>,
                    document.body
                )}

            <AuthModle isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </header>
    );
}

import { Heart, ShoppingCart, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import ProductsDetails from '../pages/ProductsDetails';
import { useWishListStore } from '../store/useWishListStore';
import PriceFilter from '../store/PriceFilter';


export default function ProductCard({ product, onOpenAuth, onOpenDetails }) {

    const togglewishList = useWishListStore((state) => state.toggleWishList);
    const isInWishList = useWishListStore((state) => state.isInWishList(product.id))
    const addToCart = useCartStore((state) => state.addToCart);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const [isDeatailsOpn, setIsDeatailsOpn] = useState()

    const handleAddToCart = () => {
        //  if its not Authenticated open login modal
        if (!isAuthenticated) {
            onOpenAuth();

        } else {
            // if its  Authenticated add to cart and showe message
            addToCart(product);
            toast.success(`تمت إضافة ${product.title.slice(0, 20)}... للسلة!`);
        }
    };


    const handleWishListClick = (e) => {
        e.stopPropagation()
        togglewishList(product)
    }



    return (
        <div className="bg-white dark:bg-gray-800 dark:border-gray-500 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">

            {/* pro image  */}
            <div
                onClick={() => setIsDeatailsOpn(true)}
                className="relative p-6 dark:bg-gray-700 dark:border-gray-500 dark:border-b bg-green-50 flex items-center justify-center h-64 overflow-hidden">

                {/* add to favevoret */}
                <button
                    onClick={handleWishListClick}
                    title={isInWishList ? 'اضافه للمفضله' : 'ازاله من المفضله'}
                    className='absolute top-3 left-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:bg-white text-gray-500 transition-colors cursor-pointer'>

                    <Heart
                        className={`w-5 h-5 transition-transform active:scale-125 ${isInWishList ? 'fill-red-500 text-red-500'
                            : ''
                            }`}


                    />
                </button>


                <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full object-contain md:group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-green-600 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-white  dark:text-gray-800 shadow-sm border dark:border-gray-300 border-gray-100">
                    {product.category}
                </span>
            </div>

            {/*  pro details */}
            <div className="p-5 flex flex-col flex-1 justify-between ">
                <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold ">{product.rating?.rate || 4.5}</span>
                        <span className="text-xs dark:text-white text-gray-400">({product.rating?.count || 100})</span>
                    </div>

                    <h3
                        onClick={() => setIsDeatailsOpn(true)}
                        className="font-bold dark:text-green-300 text-gray-800 text-base line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                        {product.title}
                    </h3>
                    <span className="text-xs dark:text-gray-200 text-gray-400 block">السعر</span>
                    <span className=" text-xl font-extrabold dark:text-green-600 text-green-900">{product.price}  ج.م</span>

                </div>

                {/*   price an dadding button */}
                <div className=" md:pt-4 border-t dark:border-gray-600 border-gray-100 flex items-center justify-between mt-auto  md:gap-2 md:text-4xl">
                    <div>
                        <button
                            onClick={() => setIsDeatailsOpn(true)}
                            className="bg-green-600 hover:bg-green-700 active:scale-95 text-white p-3 md:p-1.5 lg:p-3 rounded-xl dark:shadow-none shadow-md shadow-green-100 transition-all flex items-center gap-2 font-medium  md:text-[12px] text-sm"

                        >
                            اظهر التفاصيل
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-green-600 hover:bg-green-700 active:scale-95 text-white p-3 md:p-1.5 lg:p-3 rounded-xl dark:shadow-none shadow-md shadow-green-100 transition-all flex items-center gap-2 md:text-[12px] font-medium text-sm"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>أضف للسلة</span>
                    </button>
                </div>
            </div>
            <ProductsDetails
                product={product}
                isOpen={isDeatailsOpn}
                onClose={() => setIsDeatailsOpn(false)}
            />
        </div>
    );
}
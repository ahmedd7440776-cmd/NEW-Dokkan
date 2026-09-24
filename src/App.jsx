import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import ProductCard from "./components/ProductCard";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import WishListDrawer from "./components/WishListDrawer";
import AuthModle from "./components/AuthModle";
import { useState } from "react";
import { useFilterStore } from "./store/useFilterStore";
import CategoryFilter from "./store/CategoryFilter";
import ProductSkelton from "./components/ProductSkelton";

const queryClient = new QueryClient();

const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('تعذر جلب البيانات');
  return res.json();
};

function Strorefront({ onOpenAuth }) {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const searchQuery = useFilterStore((state) => state.searchQuery);
  const selectedCategory = useFilterStore((state) => state.selectedCategory) || 'all';
  const maxPrice = useFilterStore((state) => state.maxPrice)

  const filteredProducts = products?.filter((product) => {
    if (!product || !product.title) return false;

    const productCat = (product.category || '').toString().toLowerCase().trim();
    const selectedCat = (selectedCategory || 'all').toString().toLowerCase().trim();

    const matchesCategory = selectedCat === 'all' || productCat === selectedCat;

    const query = (searchQuery || '').trim().toLowerCase();
    const title = (product.title || '').toLowerCase();
    const matchesSearch =
      !query ||
      title.startsWith(query) ||
      title.split(' ').some((word) => word.startsWith(query));

    const matechesPrice = Number(product.price) <= maxPrice;

    return matchesCategory && matchesSearch && matechesPrice;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 transition-colors">
          أحدث المنتجات المتوفرة
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
          تسوق من تشكيلاتنا المميزة بأفضل الأسعار
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-6">
        <CategoryFilter />

        {/* Loading Skeletons - يدعم الدارك مود */}

        {/* {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 dark:bg-gray-800/60 h-80 rounded-2xl animate-pulse border border-gray-100 dark:border-gray-800"
              ></div>
            ))}
          </div>
        )} */}

        {/* anthor way uesing skelton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkelton key={i} />
            ))}
          </div>
        )}



        {isError && (
          <div className="text-center py-10 text-red-500 dark:text-red-400 font-bold bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
            حدث خطأ أثناء تحميل المنتجات. حاول مرة أخرى!
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredProducts?.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
                لا توجد منتجات تطابق البحث أو التصنيف المحدد
              </p>
            ) : (
              filteredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenAuth={onOpenAuth}
                />
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWishListOpen, setIsWishListOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300" dir="rtl">
        <Toaster position="top-center" />

        <Navbar
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenWishList={() => setIsWishListOpen(true)}
        />

        <Strorefront onOpenAuth={() => setIsAuthOpen(true)} />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        <WishListDrawer
          isOpen={isWishListOpen}
          onClose={() => setIsWishListOpen(false)}
        />

        <AuthModle
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      </div>
    </QueryClientProvider>
  );
}
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useWishListStore = create(
//   persist((set, get) => ({
//     wishList: [],

//     // add or delete pro from favoret

//     toggleWishList: (product) => {
//       const { wishList } = get();
//       const exists = wishList.some((item) => item.id === product.id);

//       if (exists) {
//         set({ wishList: wishList.filter((item) => item.id !== product.id) });
//       } else {
//         set({ wishList: [...wishList, product] });
//       }
//     },

//     // checking if the product exists in favoret or not
//     isInWishList : (product) => {
//         return get().wishList.some((item)=> item.id === product.id)
//     },

// // clear wishlist
// clearWishList: ()=> set({wishList: []}),

// name: 'wishList-storage'

// })),
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishListStore = create(
  persist(
    (set, get) => ({
      wishList: [],

      // إضافة أو إزالة المنتج من المفضلة
      toggleWishList: (product) => {
        const { wishList } = get();
        const exists = wishList.some((item) => item.id === product.id);

        if (exists) {
          set({ wishList: wishList.filter((item) => item.id !== product.id) });
        } else {
          set({ wishList: [...wishList, product] });
        }
      },

      // التحقق مما إذا كان المنتج موجوداً في المفضلة
      isInWishList: (productId) => {
        return get().wishList.some((item) => item.id === productId);
      },

      // تفريغ قائمة المفضلة
      clearWishList: () => set({ wishList: [] }),
    }),
    {
      name: "wishList-storage", // المكان الصحيح لاسم الـ LocalStorage
    },
  ),
);
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
// adding or removing pro from the fav
      toggleWishList: (product) => {
        const { wishList } = get();
        const exists = wishList.some((item) => item.id === product.id);

        if (exists) {
          set({ wishList: wishList.filter((item) => item.id !== product.id) });
        } else {
          set({ wishList: [...wishList, product] });
        }
      },
// checking if the pro in the fav
      isInWishList: (productId) => {
        return get().wishList.some((item) => item.id === productId);
      },
//  empty the fav
      clearWishList: () => set({ wishList: [] }),
    }),
    {
      name: "wishList-storage", // here where we store the name in the localstroge
    },
  ),
);
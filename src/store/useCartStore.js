import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist((set, get) => ({
    cart: [],

    // Add product to the cart
    addToCart: (product) => {
      const currentCart = get().cart;
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        set({
          cart: currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        });
      } else {
        set({
          cart: [...currentCart, { ...product, quantity: 1 }],
        });
      }
    },

    // remove from the cart
    removeFromCart: (productId) => {
      set({ cart: get().cart.filter((item) => item.id !== productId) });
    },

    // updata or modify product quantaity in cart
    updataQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeFromCart(productId);
        return;
      }
      set({
        cart: get().cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      });
    },

    // clear cart
    clearCart: () => set({ cart: [] }),

    //  get total items
    // (((((this is a fun that been send to navbar)))))
    getTotalItems: () => {
      return get().cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    
    // to save it in localstorage
    name: "dukkan_cart_storage",
  })),
);

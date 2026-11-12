import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), "index.html"),
        shop: resolve(process.cwd(), "shop-left-sidebar.html"),
        productDetails: resolve(process.cwd(), "product-details.html"),
        cart: resolve(process.cwd(), "cart.html"),
        wishlist: resolve(process.cwd(), "wishlist.html"),
        checkout: resolve(process.cwd(), "checkout.html"),
        login: resolve(process.cwd(), "login.html"),
        register: resolve(process.cwd(), "register.html"),
        account: resolve(process.cwd(), "account.html"),
      },
    },
  },
});
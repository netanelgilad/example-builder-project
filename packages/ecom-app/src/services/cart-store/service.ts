import { currentCart } from "@wix/ecom";
import { provide } from "@wix/sdk-runtime-extended";
import { atom } from "@wix/our-state-manager";
import { cartStore } from "./definition";

const $currentCart = atom<currentCart.Cart | null>(null);

export default provide(cartStore, (client) => {
  return {
    reloadCart: async () => {
      const cart = await client.use(currentCart).getCurrentCart();
      $currentCart.set(cart);
    },
    $currentCart,
  };
});

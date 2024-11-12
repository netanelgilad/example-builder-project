import { currentCart } from "@wix/ecom";
import { WixClient } from "@wix/sdk";
import { atom } from "nanostores";

const $currentCart = atom<currentCart.Cart | null>(null);

export default function cartStore(client: WixClient) {
  return {
    reloadCart: async () => {
      const cart = await client.use(currentCart).getCurrentCart();
      $currentCart.set(cart);
    },
    $currentCart,
  };
}

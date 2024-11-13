import { currentCart } from "@wix/ecom";
import { provide } from "@wix/sdk-runtime-extended";
import { atom } from "@wix/our-state-manager";
import { cartStore } from "./definition";
import debounce from "p-debounce";

const $currentCart = atom<currentCart.Cart | null>(null);

export default provide(cartStore, (config, client) => {
  const reloadCart = async () => {
    const cart = await client.use(currentCart).getCurrentCart();
    $currentCart.set(cart);
  };

  return {
    reloadCart: config.reloadDebouceTime
      ? debounce(reloadCart, config.reloadDebouceTime)
      : reloadCart,
    $currentCart,
  };
});

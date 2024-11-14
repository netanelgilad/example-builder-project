import { currentCart } from "@wix/ecom";
import { provide } from "@wix/sdk-runtime-extended";
import debounce from "p-debounce";
import { cartStore } from "./definition";

export default provide(cartStore, (config, { client, signals }) => {
  const $currentCart = signals.atom<currentCart.Cart | null>(null);

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

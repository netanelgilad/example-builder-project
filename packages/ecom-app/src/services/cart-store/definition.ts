import { currentCart } from "@wix/ecom";
import { defineService, atom } from "@wix/sdk-runtime-extended";
import serviceJson from "./service.json";

export type CartStore = {
  reloadCart: () => Promise<void>;
  $currentCart: ReturnType<typeof atom<currentCart.Cart | null>>;
};

export type Config = {
  reloadDebouceTime?: number;
};

export const cartStore = defineService<CartStore, Config>(serviceJson.id);

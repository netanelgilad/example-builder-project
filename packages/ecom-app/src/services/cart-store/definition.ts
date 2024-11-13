import { currentCart } from "@wix/ecom";
import { defineService } from "@wix/sdk-runtime-extended";
import { atom } from "@wix/our-state-manager";
import serviceJson from "./service.json";

export type CartStore = {
  reloadCart: () => Promise<void>;
  $currentCart: ReturnType<typeof atom<currentCart.Cart | null>>;
};

export const cartStore = defineService<CartStore>(serviceJson.id);

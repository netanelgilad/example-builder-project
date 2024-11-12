import { BuilderHost } from "@wix/builder-host";
import { currentCart } from "@wix/ecom";
import { HostModule } from "@wix/sdk";
import { atom } from "nanostores";

export type CartStore = {
  reloadCart: () => Promise<void>;
  $currentCart: ReturnType<typeof atom<currentCart.Cart | null>>;
};

export const cartStore: HostModule<CartStore, BuilderHost> = {
  __type: "host",
  create(host) {
    return host.getService(cartStore);
  },
};

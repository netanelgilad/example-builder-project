import { atom } from "nanostores";
import { currentCart } from "@wix/ecom";
import { BuilderHost } from "@wix/builder-host";
import { HostModule } from "@wix/sdk";
import serviceJson from "./service.json";

export type CartStore = {
  reloadCart: () => Promise<void>;
  $currentCart: ReturnType<typeof atom<currentCart.Cart | null>>;
};

export const id = serviceJson.id;

export const cartStore: HostModule<CartStore, BuilderHost> = {
  __type: "host",
  create(host) {
    return host.getService(id);
  },
};

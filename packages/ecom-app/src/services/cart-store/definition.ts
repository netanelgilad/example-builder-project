import { BuilderHost } from "@wix/builder-host";
import { currentCart } from "@wix/ecom";
import { HostModule } from "@wix/sdk";
import { atom } from "nanostores";
import serviceJson from "./service.json";

export type CartStore = {
  reloadCart: () => Promise<void>;
  $currentCart: ReturnType<typeof atom<currentCart.Cart | null>>;
};

export const cartStore: HostModule<CartStore, BuilderHost> & { id: string } = {
  __type: "host",
  create(host) {
    return host.getService(serviceJson.id) as CartStore;
  },
  id: serviceJson.id,
};

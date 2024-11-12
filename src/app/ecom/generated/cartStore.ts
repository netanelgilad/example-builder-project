import { BuilderHost } from "@/app/builder-host";
import { HostModule } from "@wix/sdk-runtime/context";
import cartStoreType from "../services/cartStore";

export const CART_STORE_SERVICE_COMP_ID = "cartStore";

export const cartStore: HostModule<
  ReturnType<typeof cartStoreType>,
  BuilderHost
> = {
  __type: "host",
  create(host) {
    return host.getService(CART_STORE_SERVICE_COMP_ID);
  },
};

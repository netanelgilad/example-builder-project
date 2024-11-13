import { BuilderHost } from "@wix/builder-host";
import { WixClient } from "@wix/sdk";
import { HostModule } from "@wix/sdk-runtime/host-modules";

export function provide<T>(
  _: HostModule<T, BuilderHost>,
  factory: (client: WixClient) => T
) {
  return factory;
}

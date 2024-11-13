import {
  AuthenticationStrategy,
  createClient,
  Host,
  WixClient,
} from "@wix/sdk";
import { HostModule } from "@wix/sdk-runtime/host-modules";

export function provide<T>(
  _: HostModule<T, BuilderHost>,
  factory: (client: WixClient) => T
) {
  return factory;
}

export function defineService<T>(
  id: string
): HostModule<T, BuilderHost> & { id: string } {
  return {
    __type: "host",
    create(host) {
      return host.getService(id) as T;
    },
    id,
  };
}

export type BuilderHost = Host & {
  getService<T>(extensionId: string): T;
};

export function createBuilderHost(
  servicesMap: Map<
    string, // extension id
    (client: WixClient) => unknown
  >,
  auth: AuthenticationStrategy
): BuilderHost {
  const initializedServices = new Map<
    string, // extension id
    unknown
  >();
  return {
    getService<T>(extensionId: string): T {
      if (!initializedServices.has(extensionId)) {
        initializedServices.set(
          extensionId,
          servicesMap.get(extensionId)!(createClient({ auth, host: this }))
        );
      }
      return initializedServices.get(extensionId) as T;
    },
    channel: {
      observeState(callback) {
        callback({}, {});
        return {
          disconnect() {},
        };
      },
    },
  };
}

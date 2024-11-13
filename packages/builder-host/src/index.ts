import {
  AuthenticationStrategy,
  createClient,
  Host,
  HostModule,
  WixClient,
} from "@wix/sdk";

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

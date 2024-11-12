import {
  AuthenticationStrategy,
  createClient,
  Host,
  WixClient,
} from "@wix/sdk";

export type BuilderHost = Host & {
  getService<T>(compId: string): T;
};

export function createBuilderHost(
  servicesMap: {
    [compId: string]: (client: WixClient) => unknown;
  },
  auth: AuthenticationStrategy
): BuilderHost {
  const initializedServices = {} as Record<string, unknown>;
  return {
    getService<T>(compId: string): T {
      if (!initializedServices[compId]) {
        initializedServices[compId] = servicesMap[compId](
          createClient({ auth, host: this })
        );
      }
      return initializedServices[compId] as T;
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

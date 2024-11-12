import {
  AuthenticationStrategy,
  createClient,
  Host,
  HostModule,
  WixClient,
} from "@wix/sdk";

export type BuilderHost = Host & {
  getService<T>(definition: HostModule<T, BuilderHost>): T;
  withClient<T>(callback: (client: WixClient) => T): T;
};

export function createBuilderHost(
  servicesMap: Map<
    HostModule<unknown, BuilderHost>,
    (client: WixClient) => unknown
  >,
  auth: AuthenticationStrategy
): BuilderHost {
  const initializedServices = new Map<
    HostModule<unknown, BuilderHost>,
    unknown
  >();
  return {
    withClient<T>(callback: (client: WixClient) => T) {
      return callback(createClient({ auth, host: this }));
    },

    getService<T>(definition: HostModule<T, BuilderHost>): T {
      if (!initializedServices.has(definition)) {
        initializedServices.set(
          definition,
          servicesMap.get(definition)!(createClient({ auth, host: this }))
        );
      }
      return initializedServices.get(definition) as T;
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

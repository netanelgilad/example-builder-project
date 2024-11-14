import {
  AuthenticationStrategy,
  createClient,
  Host,
  WixClient,
} from "@wix/sdk";
import { HostModule } from "@wix/sdk-runtime/host-modules";
import * as nanostores from "nanostores";

export * from "nanostores";
export * from "@nanostores/react";

type ServiceDefinition<TAPI, TConfig> = HostModule<TAPI, BuilderHost> & {
  id: string;
} & { __config?: TConfig };
type ServiceConfig<T extends ServiceDefinition<any, any>> =
  T extends ServiceDefinition<any, infer TConfig> ? TConfig : never;
type ServiceAPI<T extends ServiceDefinition<any, any>> =
  T extends ServiceDefinition<infer TAPI, any> ? TAPI : never;
type ServiceFactory<T extends ServiceDefinition<any, any>> = (
  config: ServiceConfig<T>,
  opts: {
    client: WixClient;
    signals: typeof import("nanostores");
  }
) => ServiceAPI<T>;

export function provide<T extends ServiceDefinition<any, any>>(
  _: T,
  factory: ServiceFactory<T>
) {
  return factory;
}

export function defineService<TAPI, TConfig>(
  id: string
): HostModule<TAPI, BuilderHost> & { id: string } & { __config?: TConfig } {
  return {
    __type: "host",
    create(host) {
      return host.getService(id) as TAPI;
    },
    id,
  };
}

export type BuilderHost = Host & {
  getService<T>(extensionId: string): T;
};

type ConfiguredService<T extends ServiceDefinition<any, any>> = {
  config: ServiceConfig<T>;
  impl: ServiceFactory<T>;
};

export function createBuilderHost(
  servicesMap: Record<
    string /* extension id */,
    ConfiguredService<ServiceDefinition<any, any>>
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
        const service = servicesMap[extensionId];
        if (!service) {
          throw new Error(`Service ${extensionId} is not provided`);
        }

        initializedServices.set(
          extensionId,
          service.impl(service.config, {
            client: createClient({ auth, host: this }),
            signals: nanostores,
          })
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

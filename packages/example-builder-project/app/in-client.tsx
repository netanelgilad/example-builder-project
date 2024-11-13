'use client';
import { OAuthStrategy } from "@wix/sdk";
import { WixProvider } from "@wix/sdk-react";
import { createBuilderHost } from "@wix/sdk-runtime-extended";
import { CartIcon } from "@wix/ecom-app/components";
import { cartStore } from "@wix/ecom-app/services-definitions";
import { cartStore as cartStoreService } from "@wix/ecom-app/services";
import { ProductPage } from "@wix/stores-app/components";
import { VisualWrapper } from "./VisualWrapper";

const auth = OAuthStrategy({
  clientId: "2fb39349-3744-4242-920d-9ccd74af3229"
});

const host = createBuilderHost(new Map([
  [cartStore.id, cartStoreService]
]), auth);

export function Home() {
  return (
    <WixProvider host={host} auth={auth}>
      <VisualWrapper>
        <CartIcon />
        <ProductPage />
      </VisualWrapper>
    </WixProvider>
  );
}

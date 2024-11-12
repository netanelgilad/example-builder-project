'use client';
import { OAuthStrategy } from "@wix/sdk";
import { WixProvider } from "@wix/sdk-react";
import { createBuilderHost } from "./builder-host";
import CartIcon from "./ecom/components/CartIcon";
import { CART_STORE_SERVICE_COMP_ID } from "./ecom/generated/cartStore";
import cartStore from "./ecom/services/cartStore";
import { ProductPage } from "./stores/components/ProductPage";

const auth = OAuthStrategy({
    clientId: "2fb39349-3744-4242-920d-9ccd74af3229"
});

const host = createBuilderHost({
    [CART_STORE_SERVICE_COMP_ID]: cartStore
}, auth);

export function Home() {
    return (
        <WixProvider host={host} auth={auth}>
            <CartIcon />
            <ProductPage />
        </WixProvider>
    );
}

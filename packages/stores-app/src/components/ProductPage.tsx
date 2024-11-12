import { currentCart } from "@wix/ecom";
import { useWixModules } from "@wix/sdk-react";
import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import { cartStore } from "@wix/ecom-app/services-definitions";

export function ProductPage() {
  const { products: {
    queryProducts
  }, currentCart: {
    addToCurrentCart
  }, cartStore: {
    reloadCart
  } } =
    useWixModules({ products, currentCart, cartStore: cartStore });

  const [acmeMug, setAcmeMug] = useState<products.Product | null>(null);

  useEffect(() => {
    queryProducts().eq("slug", "acme-mug").find().then((result) => {
      setAcmeMug(result.items[0] ?? null);
    });
  }, [queryProducts]);

  if (!acmeMug) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{acmeMug.name}</h1>
      <p>{acmeMug.description}</p>
      <button onClick={async () => {
        await addToCurrentCart({
          lineItems: [{
            catalogReference: {
              catalogItemId: acmeMug._id,
              appId: "1380b703-ce81-ff05-f115-39571d94dfcd",
            },
            quantity: 1,
          }]
        });
        await reloadCart();
      }}>Add to Cart</button>
    </div>
  );
}

ProductPage.displayName = "ProductPage";

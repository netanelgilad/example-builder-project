import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { cartStore } from "@wix/ecom-app/services-definitions";
import { useWixModules } from "@wix/sdk-react";
import { products } from "@wix/stores";

const queryClient = new QueryClient();

export function ProductPageInner() {
  const { queryProducts } = useWixModules(products);
  const { addToCurrentCart } = useWixModules(currentCart);
  const { reloadCart } = useWixModules(cartStore);

  const { data: acmeMug, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => queryProducts().eq("slug", "acme-mug")
      .find().then((result) => result.items[0] ?? null),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!acmeMug) {
    return <div>Product not found</div>;
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

export function ProductPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPageInner />
    </QueryClientProvider>
  );
}

ProductPage.displayName = "ProductPage";

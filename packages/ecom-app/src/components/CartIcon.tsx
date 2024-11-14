
import { useWixModules } from '@wix/sdk-react';
import { useStore } from '@wix/sdk-runtime-extended';
import { cartStore } from '../services/cart-store/definition';
import React from 'react';

export function CartIcon() {
  const { reloadCart, $currentCart } = useWixModules(cartStore);
  const cart = useStore($currentCart);
  const [reloadedCount, setReloadedCount] = React.useState(0);

  return (
    <div>
      <button onClick={async () => {
        await reloadCart();
        setReloadedCount(reloadedCount => reloadedCount + 1);
      }}>Reload Cart</button>
      <pre>Number of Items: {(cart?.lineItems ?? [])
        .reduce((acc, item) => acc + (item.quantity ?? 0), 0)}
      </pre>
      <pre>Reloaded Count: {reloadedCount}</pre>
    </div>
  );
}

CartIcon.displayName = 'CartIcon';

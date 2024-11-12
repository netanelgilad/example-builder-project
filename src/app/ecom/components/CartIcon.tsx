
import { useWixModules } from '@wix/sdk-react';
import { cartStore } from '../generated/cartStore';
import { useStore } from '@nanostores/react';

export default function CartIcon() {
    const { reloadCart, $currentCart } = useWixModules(cartStore);
    const cart = useStore($currentCart);

    return (
        <div>
            <button onClick={reloadCart}>Reload Cart</button>
            <pre>Number of Items: {(cart?.lineItems ?? []).reduce((acc, item) => acc + (item.quantity ?? 0), 0)}</pre>
        </div>
    );
}

CartIcon.displayName = 'CartIcon'; 
(function(){
  const STORAGE_KEY = "bakery_cart_v1";

  const readCart = () => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return {};
      const obj = JSON.parse(raw);
      return obj && typeof obj === "object" ? obj : {};
    }catch{ return {}; }
  };

  const writeCart = (cart) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart:changed"));
  };

  const getCount = (cart) => Object.values(cart).reduce((sum, qty) => sum + (Number(qty) || 0), 0);

  const add = (productId, qty=1) => {
    const cart = readCart();
    cart[productId] = (Number(cart[productId]) || 0) + Number(qty);
    if(cart[productId] <= 0) delete cart[productId];
    writeCart(cart);
  };

  const setQty = (productId, qty) => {
    const cart = readCart();
    const n = Math.max(0, Math.floor(Number(qty) || 0));
    if(n === 0) delete cart[productId];
    else cart[productId] = n;
    writeCart(cart);
  };

  const clear = () => writeCart({});

  const getItems = () => {
    const cart = readCart();
    const products = (window.BAKERY_SITE && window.BAKERY_SITE.products) || [];
    const byId = new Map(products.map(p => [p.id, p]));
    return Object.entries(cart)
      .map(([id, qty]) => ({ product: byId.get(id), qty: Number(qty) || 0 }))
      .filter(x => x.product && x.qty > 0);
  };

  const calcSubtotal = () => getItems().reduce((sum, it) => sum + it.qty * it.product.price.value, 0);

  window.BAKERY_CART = { readCart, add, setQty, clear, getItems, calcSubtotal, getCount };
})();

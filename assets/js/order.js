(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const formatEUR = (v) => (window.BAKERY_UI ? window.BAKERY_UI.formatEUR(v) : `${v.toFixed(2)} €`);

  const deliveryFeeEstimate = (fulfillment) => {
    // Placeholder: set to 0 for pickup, and a small estimate for delivery.
    if(fulfillment === 'delivery') return 7;
    return 0;
  };

  const renderCart = () => {
    const cartEl = $('[data-cart]');
    if(!cartEl) return;

    const items = window.BAKERY_CART.getItems();
    if(items.length === 0){
      cartEl.innerHTML = `<div class="panel"><p class="muted" style="margin:0">Your cart is empty. Add items from the menu pages.</p><div class="row" style="margin-top:12px"><a class="btn btn-primary" href="cakes.html">Browse Cakes</a><a class="btn btn-ghost" href="platters.html">Browse Platters</a></div></div>`;
      updateTotals();
      return;
    }

    cartEl.innerHTML = "";

    items.forEach(({product, qty}) => {
      const row = document.createElement('div');
      row.className = 'cart-item';

      const left = document.createElement('div');
      left.className = 'cart-item-left';

      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.style.setProperty('--img', `url('${product.image}')`);

      const info = document.createElement('div');
      const h3 = document.createElement('h3');
      h3.textContent = product.name;
      const meta = document.createElement('div');
      meta.className = 'muted';
      meta.textContent = `${product.price.display} • ${product.unit}`;
      info.append(h3, meta);

      left.append(thumb, info);

      const right = document.createElement('div');
      right.className = 'cart-item-right';

      const qtyWrap = document.createElement('div');
      qtyWrap.className = 'qty';

      const minus = document.createElement('button');
      minus.type = 'button';
      minus.textContent = '−';

      const input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.step = '1';
      input.value = String(qty);

      const plus = document.createElement('button');
      plus.type = 'button';
      plus.textContent = '+';

      const set = (n) => {
        const val = Math.max(0, Math.floor(Number(n) || 0));
        input.value = String(val);
        window.BAKERY_CART.setQty(product.id, val);
      };

      minus.addEventListener('click', () => set((Number(input.value)||0) - 1));
      plus.addEventListener('click', () => set((Number(input.value)||0) + 1));
      input.addEventListener('change', () => set(input.value));

      qtyWrap.append(minus, input, plus);

      const lineTotal = document.createElement('div');
      lineTotal.style.minWidth = '96px';
      lineTotal.style.textAlign = 'right';
      lineTotal.innerHTML = `<strong>${formatEUR(qty * product.price.value)}</strong>`;

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'btn btn-danger';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => set(0));

      right.append(qtyWrap, lineTotal, remove);
      row.append(left, right);
      cartEl.append(row);
    });

    updateTotals();
  };

  const updateTotals = () => {
    const subtotal = window.BAKERY_CART.calcSubtotal();
    const fulfillment = ($('input[name="fulfillment"]:checked') || {}).value || 'pickup';
    const fee = deliveryFeeEstimate(fulfillment);
    const total = subtotal + fee;

    const subtotalEl = $('[data-subtotal]');
    const feeEl = $('[data-delivery-fee]');
    const totalEl = $('[data-total]');

    if(subtotalEl) subtotalEl.textContent = formatEUR(subtotal);
    if(feeEl) feeEl.textContent = fulfillment === 'delivery' ? formatEUR(fee) : '—';
    if(totalEl) totalEl.textContent = formatEUR(total);
  };

  const cartToLines = () => {
    const items = window.BAKERY_CART.getItems();
    if(items.length === 0) return "(Cart is empty)";
    return items.map(({product, qty}) => `- ${product.name} x ${qty} = ${formatEUR(qty * product.price.value)}`).join("\n");
  };

  const buildOrderSummary = (formData) => {
    const fulfillment = formData.get('fulfillment') || 'pickup';
    const fee = deliveryFeeEstimate(fulfillment);
    const subtotal = window.BAKERY_CART.calcSubtotal();
    const total = subtotal + fee;

    return [
      `ORDER REQUEST — Family Bakery Studio`,
      ``,
      `Customer: ${formData.get('name') || ''}`,
      `Phone: ${formData.get('phone') || ''}`,
      `Email: ${formData.get('email') || ''}`,
      `Event date: ${formData.get('eventDate') || ''}`,
      `Fulfillment: ${fulfillment}`,
      fulfillment === 'delivery' ? `Delivery address: ${formData.get('address') || ''}` : `Pickup`,
      ``,
      `Items:`,
      cartToLines(),
      ``,
      `Notes: ${formData.get('notes') || '-'}`,
      ``,
      `Subtotal: ${formatEUR(subtotal)}`,
      fulfillment === 'delivery' ? `Estimated delivery fee: ${formatEUR(fee)} (to be confirmed)` : `Delivery fee: —`,
      `Total: ${formatEUR(total)}`
    ].join("\n");
  };

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  const initCheckout = () => {
    const form = $('[data-checkout-form]');
    if(!form) return;

    const addressWrap = $('[data-delivery-address]');

    const refreshAddressVisibility = () => {
      const fulfillment = (form.querySelector('input[name="fulfillment"]:checked') || {}).value;
      if(!addressWrap) return;
      if(fulfillment === 'delivery') addressWrap.hidden = false;
      else addressWrap.hidden = true;
      updateTotals();
    };

    form.addEventListener('change', (e) => {
      if(e.target && e.target.name === 'fulfillment') refreshAddressVisibility();
    });
    refreshAddressVisibility();

    const resultPanel = $('[data-order-result]');
    const summaryEl = $('[data-order-summary]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const summary = buildOrderSummary(fd);
      if(summaryEl) summaryEl.textContent = summary;
      if(resultPanel) resultPanel.hidden = false;
      resultPanel && resultPanel.scrollIntoView({behavior:'smooth', block:'start'});
    });

    const copyBtn = $('[data-copy-order]');
    copyBtn && copyBtn.addEventListener('click', async () => {
      const fd = new FormData(form);
      const summary = buildOrderSummary(fd);
      await copyText(summary);
    });

    const sendWA = $('[data-send-whatsapp]');
    sendWA && sendWA.addEventListener('click', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const summary = buildOrderSummary(fd);
      const phoneE164 = "+3720000000";
      const url = `https://wa.me/${phoneE164.replace(/\D/g,'')}?text=${encodeURIComponent(summary)}`;
      window.open(url, '_blank', 'noopener');
    });

    const sendEmail = $('[data-send-email]');
    sendEmail && sendEmail.addEventListener('click', (e) => {
      // keep mailto, but add subject/body
      const fd = new FormData(form);
      const summary = buildOrderSummary(fd);
      sendEmail.setAttribute('href', `mailto:hello@familybakerystudio.ee?subject=${encodeURIComponent('Order request')}&body=${encodeURIComponent(summary)}`);
    });

    const clearBtn = $('[data-clear-cart]');
    clearBtn && clearBtn.addEventListener('click', () => {
      window.BAKERY_CART.clear();
    });
  };

  const initCustomForm = () => {
    const form = $('[data-custom-form]');
    if(!form) return;

    const images = $('#images');
    const preview = $('[data-upload-preview]');
    const summaryEl = $('[data-custom-summary]');

    const renderPreview = () => {
      if(!preview || !images) return;
      preview.innerHTML = '';
      const files = Array.from(images.files || []).slice(0, 8);
      files.forEach(file => {
        const img = document.createElement('img');
        img.alt = file.name;
        img.loading = 'lazy';
        const url = URL.createObjectURL(file);
        img.src = url;
        img.addEventListener('load', () => URL.revokeObjectURL(url));
        preview.append(img);
      });
    };

    images && images.addEventListener('change', renderPreview);

    const buildCustomSummary = (fd) => {
      const fileNames = Array.from(images.files || []).map(f => f.name);
      return [
        `CUSTOM CAKE REQUEST — Family Bakery Studio`,
        ``,
        `Name: ${fd.get('name') || ''}`,
        `Phone: ${fd.get('phone') || ''}`,
        `Email: ${fd.get('email') || ''}`,
        `Event date: ${fd.get('eventDate') || ''}`,
        `Size/servings: ${fd.get('size') || ''}`,
        `Flavor: ${fd.get('flavor') || ''}`,
        ``,
        `Details:`,
        `${fd.get('details') || ''}`,
        ``,
        `Images: ${fileNames.length ? fileNames.join(', ') : '(none attached in demo)'}`
      ].join("\n");
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const text = buildCustomSummary(fd);
      if(summaryEl) summaryEl.textContent = text;
    });

    const copyBtn = $('[data-copy-custom]');
    copyBtn && copyBtn.addEventListener('click', async () => {
      const fd = new FormData(form);
      const text = buildCustomSummary(fd);
      await navigator.clipboard.writeText(text);
    });
  };

  const init = () => {
    renderCart();
    initCheckout();
    initCustomForm();

    window.addEventListener('cart:changed', () => {
      renderCart();
    });

    // Set min date for event inputs
    const min = new Date();
    const yyyy = min.getFullYear();
    const mm = String(min.getMonth()+1).padStart(2,'0');
    const dd = String(min.getDate()).padStart(2,'0');
    const minStr = `${yyyy}-${mm}-${dd}`;
    $$('input[type="date"]').forEach(d => d.setAttribute('min', minStr));

    updateTotals();
  };

  document.addEventListener('DOMContentLoaded', init);
})();

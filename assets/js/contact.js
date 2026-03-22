(function(){
  const $ = (sel, root=document) => root.querySelector(sel);

  const initContact = () => {
    const form = $('[data-contact-form]');
    if(!form) return;

    const out = $('[data-contact-summary]');

    const build = (fd) => [
      `MESSAGE — Family Bakery Studio`,
      ``,
      `Name: ${fd.get('name') || ''}`,
      `Email: ${fd.get('email') || ''}`,
      ``,
      `${fd.get('message') || ''}`
    ].join("\n");

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      if(out) out.textContent = build(fd);
    });

    const copyBtn = $('[data-copy-contact]');
    copyBtn && copyBtn.addEventListener('click', async () => {
      const fd = new FormData(form);
      await navigator.clipboard.writeText(build(fd));
    });
  };

  document.addEventListener('DOMContentLoaded', initContact);
})();

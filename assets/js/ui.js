(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const STORAGE_LANG = "bakery_lang_v1";

  // Replace with real business info
  const BUSINESS = {
    phoneE164: "+3720000000",
    instagramUrl: "https://www.instagram.com/juliaklein_ou?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  };

  const I18N = {
    en: {
      "a.skip": "Skip to content",
      "nav.menu": "Menu",
      "nav.home": "Home",
      "nav.cakes": "Cakes",
      "nav.pastries": "Pastries & Snacks",
      "nav.platters": "Catering Platters",
      "nav.contact": "Contact",
      "cta.call": "Call",
      "cta.callNow": "Call to order",
      "cta.contact": "Contact / Order",
      "cta.browse": "Browse Menu",
      "prices.eur": "Prices in €",
      "search.label": "Search",
      "search.placeholder": "Search…",
      "brand.name": "Family Bakery Studio",
      "brand.tag": "Cakes • Pastries • Catering",
      "home.pill": "Family owned • Handmade • Fresh to order",
      "home.headline": "Handmade Cakes and Catering for Your Special Moments",
      "home.subheadline": "Order fresh cakes, pastries, and party platters for birthdays, Christmas, and celebrations.",
      "home.menu.title": "Menu",
      "home.menu.desc": "See what we make. For orders and questions, call.",
      "home.tiles.cakes": "Classic and celebration cakes",
      "home.tiles.pastries": "Perfect for coffee breaks & parties",
      "home.tiles.platters": "Platters and catering dishes",
      "home.reviews.title": "Reviews",
      "home.reviews.desc": "Warm words from happy customers.",
      "home.banner.title": "Ready to order?",
      "home.banner.desc": "Call us — we’ll confirm details and timing.",
      "home.trust.1.t": "Warm & friendly",
      "home.trust.1.d": "Professional family service",
      "home.trust.2.t": "Pickup or delivery",
      "home.trust.2.d": "Ask for availability",
      "home.trust.3.t": "Custom requests",
      "home.trust.3.d": "Tell us your idea",
      "cakes.lead": "Browse our cake menu with prices. To order, call.",
      "pastries.lead": "Browse pastries and snacks with prices. To order, call.",
      "platters.lead": "Platters and catering dishes with prices. To order, call.",
      "platters.section.catering": "Catering & Meat Dishes",
      "platters.section.cateringDesc": "Items priced per piece unless stated otherwise.",
      "platters.section.platters": "Platters",
      "platters.section.plattersDesc": "Platter prices are shown per kg where noted.",
      "contact.lead": "To order for birthdays, Christmas, or any event — call. We’ll confirm details and timing.",
      "contact.quick": "Quick contact",
      "contact.phone": "Phone",
      "contact.phoneDesc": "Call to order or ask a question.",
      "contact.number": "Phone number",
      "contact.instagram": "Instagram",
      "contact.instagramDesc": "See the latest photos and seasonal offers.",
      "contact.hours": "Hours",
      "contact.custom": "Custom requests",
      "contact.customDesc": "For custom cakes or catering, call us and we’ll discuss the details.",
      "contact.tip": "Tip: tell us the date, number of guests, and which items you want.",
      "contact.email": "Email",
      "contact.emailDesc": "If you prefer email:",
      "footer.about": "Warm, trustworthy, family-owned cakes and catering made fresh to order.",
      "footer.contact": "Contact",
      "footer.location": "Tallinn, Estonia",
      "footer.hours": "Hours",
      "footer.social": "Social",
      "footer.h1": "Mon–Fri: 10:00–18:00",
      "footer.h2": "Sat: 10:00–15:00",
      "footer.h3": "Sun: by pre-order",
      "reviews.1": "“Beautiful presentation and so fresh. The cake was the highlight of our birthday party.”",
      "reviews.2": "“Friendly service, easy pickup, and the pastries disappeared in minutes.”",
      "reviews.3": "“We ordered platters for a family gathering—everything looked elegant and tasted amazing.”",
      "meta.title.home": "Family Bakery Studio — Handmade Cakes & Catering",
      "meta.desc.home": "Handmade cakes, pastries, and catering platters for birthdays, Christmas, and celebrations.",
      "meta.title.cakes": "Cakes — Family Bakery Studio",
      "meta.desc.cakes": "Browse handmade cakes with prices and photos.",
      "meta.title.pastries": "Pastries & Snacks — Family Bakery Studio",
      "meta.desc.pastries": "Browse pastries and snacks with prices and photos.",
      "meta.title.platters": "Catering Platters — Family Bakery Studio",
      "meta.desc.platters": "Browse catering platters and dishes with prices and photos.",
      "meta.title.contact": "Contact — Family Bakery Studio",
      "meta.desc.contact": "Call our family-owned home bakery studio to order."
    },

    et: {
      "a.skip": "Mine sisuni",
      "nav.menu": "Menüü",
      "nav.home": "Avaleht",
      "nav.cakes": "Koogid",
      "nav.pastries": "Küpsetised ja snäkid",
      "nav.platters": "Suupistevaagnad",
      "nav.contact": "Kontakt",
      "cta.call": "Helista",
      "cta.callNow": "Helista tellimiseks",
      "cta.contact": "Kontakt / Telli",
      "cta.browse": "Vaata menüüd",
      "prices.eur": "Hinnad eurodes",
      "search.label": "Otsi",
      "search.placeholder": "Otsi…",
      "brand.name": "Pere pagariäri",
      "brand.tag": "Koogid • Küpsetised • Catering",
      "home.pill": "Pereettevõte • Käsitöö • Värskelt tellimisel",
      "home.headline": "Käsitöökoogid ja catering teie erilisteks hetkedeks",
      "home.subheadline": "Telli värsked koogid, küpsetised ja vaagnad sünnipäevadeks, jõuludeks ja pidudeks.",
      "home.menu.title": "Menüü",
      "home.menu.desc": "Vaata, mida valmistame. Tellimiseks helista.",
      "home.tiles.cakes": "Klassikalised ja peokoogid",
      "home.tiles.pastries": "Ideaalne kohvipausiks ja peoks",
      "home.tiles.platters": "Vaagnad ja catering toidud",
      "home.reviews.title": "Tagasiside",
      "home.reviews.desc": "Soojad sõnad klientidelt.",
      "home.banner.title": "Soovid tellida?",
      "home.banner.desc": "Helista — kinnitame detailid ja aja.",
      "home.trust.1.t": "Soe ja sõbralik",
      "home.trust.1.d": "Usaldusväärne pere teenindus",
      "home.trust.2.t": "Tule järele või telli kohale",
      "home.trust.2.d": "Küsi võimalusi",
      "home.trust.3.t": "Eritellimused",
      "home.trust.3.d": "Kirjelda oma ideed",
      "cakes.lead": "Vaata koogimenüüd koos hindadega. Tellimiseks helista.",
      "pastries.lead": "Vaata küpsetisi ja snäkke koos hindadega. Tellimiseks helista.",
      "platters.lead": "Vaagnad ja catering toidud koos hindadega. Tellimiseks helista.",
      "platters.section.catering": "Catering ja lihatoidud",
      "platters.section.cateringDesc": "Hind tk kaupa, kui pole teisiti märgitud.",
      "platters.section.platters": "Vaagnad",
      "platters.section.plattersDesc": "Vaagnahinnad on €/kg, kui märgitud.",
      "contact.lead": "Tellimiseks sünnipäevaks, jõuludeks või ürituseks — helista. Kinnitame detailid ja aja.",
      "contact.quick": "Kiirkontakt",
      "contact.phone": "Telefon",
      "contact.phoneDesc": "Helista tellimiseks või küsimuseks.",
      "contact.number": "Telefon",
      "contact.instagram": "Instagram",
      "contact.instagramDesc": "Vaata värskeid pilte ja hooaja pakkumisi.",
      "contact.hours": "Lahtiolekuajad",
      "contact.custom": "Eritellimused",
      "contact.customDesc": "Eritellimuse (kook/catering) jaoks helista ja lepime detailid kokku.",
      "contact.tip": "Nipp: ütle kuupäev, külaliste arv ja mida soovid.",
      "contact.email": "E-post",
      "contact.emailDesc": "Kui eelistad e-posti:",
      "footer.about": "Soe ja usaldusväärne pereettevõte — värskelt tellimisel valmistatud koogid ja catering.",
      "footer.contact": "Kontakt",
      "footer.location": "Tallinn, Eesti",
      "footer.hours": "Aeg",
      "footer.social": "Sotsiaal",
      "footer.h1": "E–R: 10:00–18:00",
      "footer.h2": "L: 10:00–15:00",
      "footer.h3": "P: ettetellimisel",
      "reviews.1": "“Väga ilus ja värske. Kook oli sünnipäeva tipphetk.”",
      "reviews.2": "“Sõbralik teenindus ja küpsetised kadusid minutitega.”",
      "reviews.3": "“Tellisime vaagnad pereürituseks — kõik nägi elegantne välja ja maitses suurepäraselt.”",
      "meta.title.home": "Pere pagariäri — Käsitöökoogid ja catering",
      "meta.desc.home": "Käsitöökoogid, küpsetised ja vaagnad sünnipäevadeks, jõuludeks ja pidudeks.",
      "meta.title.cakes": "Koogid — Pere pagariäri",
      "meta.desc.cakes": "Vaata käsitöökoogid koos hindade ja fotodega.",
      "meta.title.pastries": "Küpsetised ja snäkid — Pere pagariäri",
      "meta.desc.pastries": "Vaata küpsetised ja snäkid koos hindade ja fotodega.",
      "meta.title.platters": "Suupistevaagnad — Pere pagariäri",
      "meta.desc.platters": "Vaata vaagnad ja catering toidud koos hindade ja fotodega.",
      "meta.title.contact": "Kontakt — Pere pagariäri",
      "meta.desc.contact": "Helista meie pere pagariärile tellimiseks."
    },

    ru: {
      "a.skip": "Перейти к содержимому",
      "nav.menu": "Меню",
      "nav.home": "Главная",
      "nav.cakes": "Торты",
      "nav.pastries": "Выпечка и закуски",
      "nav.platters": "Фуршетные наб��ры",
      "nav.contact": "Контакты",
      "cta.call": "Позвонить",
      "cta.callNow": "Позвонить для заказа",
      "cta.contact": "Контакт / Заказ",
      "cta.browse": "Смотреть меню",
      "prices.eur": "Цены в €",
      "search.label": "Поиск",
      "search.placeholder": "Поиск…",
      "brand.name": "Семейная домашняя выпечка",
      "brand.tag": "Торты • Выпечка • Кейтеринг",
      "home.pill": "Семейное дело • Ручная работа • Свежие заказы",
      "home.headline": "Домашние торты и кейтеринг для ваших особенных моментов",
      "home.subheadline": "Заказывайте свежие торты, выпечку и фуршетные наборы на дни рождения, Рождество и праздники.",
      "home.menu.title": "Меню",
      "home.menu.desc": "Посмотрите, что мы готовим. Для заказа — позвоните.",
      "home.tiles.cakes": "Классические и праздничные торты",
      "home.tiles.pastries": "Идеально к кофе и для вечеринок",
      "home.tiles.platters": "Наборы и кейтеринг блюда",
      "home.reviews.title": "Отзывы",
      "home.reviews.desc": "Тёплые слова от наших клиентов.",
      "home.banner.title": "Готовы заказа��ь?",
      "home.banner.desc": "Позвоните — уточним детали и время.",
      "home.trust.1.t": "Тепло и по‑домашнему",
      "home.trust.1.d": "Надёжный семейный сервис",
      "home.trust.2.t": "Самовывоз или доставка",
      "home.trust.2.d": "Уточняйте возможность",
      "home.trust.3.t": "Индивидуальные заказы",
      "home.trust.3.d": "Расскажите вашу идею",
      "cakes.lead": "Смотрите меню тортов с ценами. Для заказа — позвоните.",
      "pastries.lead": "Смотрите выпечку и закуски с ценами. Для заказа — позвоните.",
      "platters.lead": "Фуршетные наборы и блюда с ценами. Для заказа — позвоните.",
      "platters.section.catering": "Кейтеринг и мясные блюда",
      "platters.section.cateringDesc": "Цена за штуку, если не указано иначе.",
      "platters.section.platters": "Наборы",
      "platters.section.plattersDesc": "Для наборов цена указана за кг, где отмечено.",
      "contact.lead": "Зака�� на день рождения, Рождество или любое событие — позвоните. Уточним детали и время.",
      "contact.quick": "Быстрый контакт",
      "contact.phone": "Телефон",
      "contact.phoneDesc": "Позвоните, чтобы заказать или задать вопрос.",
      "contact.number": "Телефон",
      "contact.instagram": "Instagram",
      "contact.instagramDesc": "Смотрите свежие фото и сезонные предложения.",
      "contact.hours": "Часы работы",
      "contact.custom": "Индивидуальные заказы",
      "contact.customDesc": "Для индивидуального торта или кейтеринга позвоните, и мы обсудим детали.",
      "contact.tip": "Совет: укажите дату, количество гостей и что хотите заказать.",
      "contact.email": "Email",
      "contact.emailDesc": "Если удобнее по почте:",
      "footer.about": "Тёплая и надёжная семейная студия — свежие торты и кейтеринг под заказ.",
      "footer.contact": "Контакты",
      "footer.location": "Таллинн, Эстония",
      "footer.hours": "Время",
      "footer.social": "Соцсети",
      "footer.h1": "Пн–Пт: 10:00–18:00",
      "footer.h2": "Сб: 10:00–15:00",
      "footer.h3": "Вс: по предзаказу",
      "reviews.1": "“Очень красиво и свежо. Торт стал главным украшением дня рождения.”",
      "reviews.2": "“Дружелюбно, удобно забрать, и выпечка исчезла за минуты.”",
      "reviews.3": "“Заказывали наборы на семейное мероприятие — всё выглядело элегантно и было очень вкусно.”",
      "meta.title.home": "Семейная домашняя выпечка — Торты и кейтеринг",
      "meta.desc.home": "Домашние торты, выпечка и фуршетные наборы на праздники и собы��ия.",
      "meta.title.cakes": "Торты — Семейная домашняя выпечка",
      "meta.desc.cakes": "Смотрите торты с ценами и фотографиями.",
      "meta.title.pastries": "Выпечка и закуски — Семейная домашняя выпечка",
      "meta.desc.pastries": "Смотрите выпечку и закуски с ценами и фотографиями.",
      "meta.title.platters": "Фуршетные наборы — Семейная домашняя выпечка",
      "meta.desc.platters": "Смотрите наборы и блюда с ценами и фотографиями.",
      "meta.title.contact": "Контакты — Семейная домашняя выпечка",
      "meta.desc.contact": "Позвоните, чтобы сделать заказ."
    }
  };

  const getLang = () => {
    const saved = localStorage.getItem(STORAGE_LANG);
    if(saved && I18N[saved]) return saved;
    const nav = (navigator.language || 'en').toLowerCase();
    if(nav.startsWith('et')) return 'et';
    if(nav.startsWith('ru')) return 'ru';
    return 'en';
  };

  const setLang = (lang) => {
    if(!I18N[lang]) return;
    localStorage.setItem(STORAGE_LANG, lang);
    applyLang(lang);
  };

  const applyLang = (lang) => {
    const dict = I18N[lang] || I18N.en;

    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('data-lang', lang);

    // Translate text nodes
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if(typeof val === 'string') el.textContent = val;
    });

    // Translate attributes
    $$('[data-i18n-attr][data-i18n]').forEach(el => {
      const attr = el.getAttribute('data-i18n-attr');
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if(attr && typeof val === 'string') el.setAttribute(attr, val);
    });

    // Update language buttons UI
    $$('[data-lang-btn]').forEach(btn => {
      const v = btn.getAttribute('data-lang-value');
      btn.classList.toggle('is-active', v === lang);
    });

    // Render products in current language
    renderProducts(lang);

    // Update contact links
    initLinks(lang);
  };

  const initNav = () => {
    const toggle = $("[data-nav-toggle]");
    const menu = $("[data-nav-menu]");
    if(!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      if(!menu.classList.contains("is-open")) return;
      if(menu.contains(e.target) || toggle.contains(e.target)) return;
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  };

  const setYear = () => {
    const el = document.querySelector("[data-year]");
    if(el) el.textContent = String(new Date().getFullYear());
  };

  const initLangButtons = () => {
    $$('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = btn.getAttribute('data-lang-value');
        setLang(v);
      });
    });
  };

  const initLinks = () => {
    const phoneE164 = BUSINESS.phoneE164;

    $$('[data-instagram]').forEach(a => {
      a.setAttribute('href', BUSINESS.instagramUrl);
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener');
    });

    $$('[data-call]').forEach(a => {
      a.setAttribute('href', `tel:${phoneE164}`);
    });
  };

  const createProductCard = (p, lang) => {
    const card = document.createElement('article');
    card.className = 'card';

    const media = document.createElement('div');
    media.className = 'card-media';
    media.style.setProperty('--img', `url('${p.image}')`);

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('div');
    title.className = 'card-title';

    const h3 = document.createElement('h3');
    h3.textContent = (p.name && p.name[lang]) || (p.name && p.name.en) || String(p.name);

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = p.price.display;

    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = (p.desc && p.desc[lang]) || (p.desc && p.desc.en) || String(p.desc || '');

    title.append(h3, price);
    body.append(title, desc);

    const meta = document.createElement('div');
    meta.style.padding = '0 14px 14px';
    const unit = document.createElement('span');
    unit.className = 'pill small';
    unit.textContent = p.unit;
    meta.append(unit);

    card.append(media, body, meta);
    return card;
  };

  const renderProducts = (lang) => {
    const products = (window.BAKERY_SITE && window.BAKERY_SITE.products) || [];

    $$('[data-products]').forEach(grid => {
      const category = grid.getAttribute('data-category');
      const list = products.filter(p => p.category === category);
      grid.innerHTML = '';
      list.forEach(p => grid.append(createProductCard(p, lang)));
    });

    // Search support
    $$('[data-search]').forEach(input => {
      const scope = input.getAttribute('data-search-scope');
      const q = String(input.value || '').trim().toLowerCase();
      if(!q) return;

      const filterFn = (p) => {
        const name = ((p.name && (p.name[lang] || p.name.en)) || '').toLowerCase();
        const desc = ((p.desc && (p.desc[lang] || p.desc.en)) || '').toLowerCase();
        return name.includes(q) || desc.includes(q);
      };

      if(scope){
        const grid = $(`[data-products][data-category="${scope}"]`);
        if(!grid) return;
        const list = products.filter(p => p.category === scope).filter(filterFn);
        grid.innerHTML = '';
        list.forEach(p => grid.append(createProductCard(p, lang)));
        return;
      }

      $$('[data-products]').forEach(grid => {
        const category = grid.getAttribute('data-category');
        const list = products.filter(p => p.category === category).filter(filterFn);
        grid.innerHTML = '';
        list.forEach(p => grid.append(createProductCard(p, lang)));
      });
    });
  };

  const initSearch = () => {
    $$('[data-search]').forEach(input => {
      input.addEventListener('input', () => applyLang(getLang()));
    });
  };

  const init = () => {
    setYear();
    initNav();
    initLangButtons();
    initSearch();
    applyLang(getLang());
  };

  document.addEventListener('DOMContentLoaded', init);
})();

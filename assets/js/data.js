/* Product catalog with multilingual text.
   Structure: products[] with name/desc in et/ru/en.
*/

(function(){
  const placeholderImages = {
    cakes: [
      "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1541781286675-41d7b5a8d0cc?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=1400&q=70"
    ],
    pastries: [
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1486428261073-1f4e9a1a2f0a?auto=format&fit=crop&w=1400&q=70"
    ],
    platters: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1543332164-6e82f355bad4?auto=format&fit=crop&w=1400&q=70"
    ],
    catering: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1400&q=70"
    ]
  };

  const money = (value) => ({
    currency: "EUR",
    value: Number(value),
    display: new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(Number(value))
  });

  const products = [
    // CAKES
    { id: "cake-napoleon", category: "cakes", name: {et:"Napoleon", ru:"Наполеон", en:"Napoleon"}, price: money(17), unit: "each", desc: {et:"Klassikaline kihiline kook õrna kreemiga.", ru:"Классический слоёный торт с нежным кремом.", en:"Classic layered cake with delicate cream."} },
    { id: "cake-moonikook", category: "cakes", name: {et:"Moonikook võise vahukreemiga", ru:"Маковый торт со сливочным кремом", en:"Poppy seed cake with buttery whipped cream"}, price: money(25), unit: "each", desc: {et:"Mooniseemnetega kook võise vahukreemiga.", ru:"Маковый торт со сливочным кремом.", en:"Poppy seed cake with rich buttery whipped cream."} },
    { id: "cake-biskviit", category: "cakes", name: {et:"Biskviitkook koorekreemiga", ru:"Бисквитный торт со сливочным кремом", en:"Sponge cake with cream"}, price: money(20), unit: "each", desc: {et:"Õhuline biskviit ja pehme koorekreem.", ru:"Нежный бисквит и мягкий сливочный крем.", en:"Light sponge with smooth cream."} },
    { id: "cake-cheesecake-vanilla", category: "cakes", name: {et:"Vanillimaitseline juustukook", ru:"Ванильный чизкейк", en:"Vanilla cheesecake"}, price: money(18), unit: "each", desc: {et:"Kreemjas vanilline juustukook.", ru:"Нежный ванильный чизкейк.", en:"Creamy vanilla cheesecake."} },
    { id: "cake-cheesecake-choco", category: "cakes", name: {et:"Šokolaadijuustukook", ru:"Шоколадный чизкейк", en:"Chocolate cheesecake"}, price: money(20), unit: "each", desc: {et:"Rikkalik šokolaadine juustukook.", ru:"Насыщенный шоколадный чизкейк.", en:"Rich chocolate cheesecake."} },
    { id: "cake-tiramisu", category: "cakes", name: {et:"Tiramisu", ru:"Тирамису", en:"Tiramisu"}, price: money(20), unit: "each", desc: {et:"Kohvine ja kreemjas klassika.", ru:"Кофейная нежная классика.", en:"A creamy coffee classic."} },
    { id: "cake-red-velvet", category: "cakes", name: {et:"Punane vilvetkook", ru:"Красный бархат", en:"Red velvet cake"}, price: money(20), unit: "each", desc: {et:"Klassikaline punane vilvet.", ru:"Классический красный бархат.", en:"Classic red velvet."} },
    { id: "cake-red-velvet-cherry", category: "cakes", name: {et:"Punane vilvetkook kirssidega", ru:"Красный бархат с вишней", en:"Red velvet with cherries"}, price: money(22), unit: "each", desc: {et:"Punane vilvet koos kirssidega.", ru:"Красный бархат с вишней.", en:"Red velvet paired with cherries."} },
    { id: "cake-red-velvet-raspberry", category: "cakes", name: {et:"Punane vilvetkook vaarikatega", ru:"Красный бархат с малиной", en:"Red velvet with raspberries"}, price: money(25), unit: "each", desc: {et:"Punane vilvet koos vaarikatega.", ru:"Красный бархат с малиной.", en:"Red velvet with raspberries."} },
    { id: "cake-spinach", category: "cakes", name: {et:"Spinatikook", ru:"Шпинатный торт", en:"Spinach cake"}, price: money(25), unit: "each", desc: {et:"Populaarne mahe kook.", ru:"Популярный нежный торт.", en:"A modern, light favorite."} },
    { id: "cake-honey", category: "cakes", name: {et:"Meekook", ru:"Медовик", en:"Honey cake"}, price: money(18), unit: "each", desc: {et:"Meekook õrnade kihtidega.", ru:"Медовик с нежными слоями.", en:"Honey cake with cozy layers."} },
    { id: "cake-meringue-roll", category: "cakes", name: {et:"Bezee rull kuivatatud ploomidega", ru:"Безе-рулет с черносливом", en:"Meringue roll with dried plums"}, price: money(20), unit: "each", desc: {et:"Õhuline bezee rull ploomidega.", ru:"Воздушный рулет безе с черносливом.", en:"Light meringue roll with dried plums."} },
    { id: "cake-jaconda", category: "cakes", name: {et:"Jaconda tort mandlibiskviidiga", ru:"Торт Жоконда с миндальным бисквитом", en:"Jaconda cake with almond sponge"}, price: money(25), unit: "each", desc: {et:"Mandlibiskviidiga elegantne tort.", ru:"Элегантный торт с миндальным бисквитом.", en:"Elegant cake with almond sponge."} },
    { id: "cake-kringel-marzipan", category: "cakes", name: {et:"Kringel martsipaniga", ru:"Крингель с марципаном", en:"Kringel with marzipan"}, price: money(15), unit: "each", desc: {et:"Pehme kringel martsipaniga.", ru:"Нежный крингель с марципаном.", en:"Soft kringel with marzipan."} },
    { id: "cake-honey-walnut", category: "cakes", name: {et:"Kreeka pähklitega meekook", ru:"Медовик с грецкими орехами", en:"Honey cake with walnuts"}, price: money(22), unit: "each", desc: {et:"Meekook kreeka pähklitega.", ru:"Медовик с грецкими орехами.", en:"Honey cake with walnuts."} },
    { id: "cake-red-velvet-cherry-portion", category: "cakes", name: {et:"Punase vilveti kook kirssidega portion", ru:"Порция красного бархата с вишней", en:"Red velvet with cherries (portion)"}, price: money(4.5), unit: "portion", desc: {et:"Üks portsjon punast vilvetit.", ru:"Одна порция красного бархата.", en:"Single portion — perfect to try."} },
    { id: "cake-choco", category: "cakes", name: {et:"Šokolaadikook", ru:"Шоколадны�� торт", en:"Chocolate cake"}, price: money(25), unit: "each", desc: {et:"Rikkalik šokolaadikook.", ru:"Насыщенный шоколадный торт.", en:"Rich, classic chocolate."} },
    { id: "cake-choco-orange", category: "cakes", name: {et:"Šokolaadikook apelsinikreemiga", ru:"Шоколадный торт с апельсиновым кремом", en:"Chocolate cake with orange cream"}, price: money(30), unit: "each", desc: {et:"Šokolaad ja apelsinikreem.", ru:"Шоколад и апельсиновый крем.", en:"Chocolate with bright orange cream."} },
    { id: "cake-hollandia", category: "cakes", name: {et:"Tort Hollandia 1 kg", ru:"Торт Hollandia 1 кг", en:"Hollandia cake 1 kg"}, price: money(25), unit: "1 kg", desc: {et:"Hollandia tort (1 kg).", ru:"Торт Hollandia (1 кг).", en:"Hollandia cake (1 kg)."} },

    // PASTRIES & SNACKS
    { id: "pastry-spinach-pie", category: "pastries", name: {et:"Špinaadipirukas", ru:"Шпинатный пирог", en:"Spinach pie"}, price: money(2.5), unit: "each", desc: {et:"Soolane pirukas.", ru:"Сытная закуска.", en:"Savory, flaky snack."} },
    { id: "pastry-focaccia", category: "pastries", name: {et:"Focaccia", ru:"Фокачча", en:"Focaccia"}, price: money(7), unit: "each", desc: {et:"Pehme focaccia.", ru:"Мягкая фокачча.", en:"Soft focaccia, great for sharing."} },
    { id: "pastry-khachapuri-small", category: "pastries", name: {et:"Väike hatšapuri", ru:"Хачапури (мал.)", en:"Khachapuri (small)"}, price: money(10), unit: "each", desc: {et:"Juustune ja soe.", ru:"Сырный и тёплый.", en:"Cheesy and comforting."} },
    { id: "pastry-khachapuri-large", category: "pastries", name: {et:"Suur hatšapuri", ru:"Хачапури (бол.)", en:"Khachapuri (large)"}, price: money(15), unit: "each", desc: {et:"Suurem variant.", ru:"Большой вариант.", en:"Perfect for bigger events."} },
    { id: "pastry-khachapuri-veg", category: "pastries", name: {et:"Hatšapuri köögiviljadega", ru:"Хачапури с овощами", en:"Khachapuri with vegetables"}, price: money(18), unit: "each", desc: {et:"Rikkalik ja toitev.", ru:"Сытно и вкусно.", en:"Hearty and flavorful."} },
    { id: "pastry-mini-burger-sausage", category: "pastries", name: {et:"Mini burger vorstikesega", ru:"Мини-бургер с сосиской", en:"Mini burger with sausage"}, price: money(2), unit: "each", desc: {et:"Peo lemmik.", ru:"Любимая закуска.", en:"A party favorite."} },
    { id: "pastry-mini-pizza", category: "pastries", name: {et:"Mini pitsa", ru:"Мини-пицца", en:"Mini pizza"}, price: money(0.8), unit: "each", desc: {et:"Bite-size suupiste.", ru:"Удобная закуска.", en:"Easy finger food."} },
    { id: "pastry-salmon-grissini", category: "pastries", name: {et:"Lõhe grisini pulgaga", ru:"Лосось с гриссини", en:"Salmon with grissini"}, price: money(1.5), unit: "each", desc: {et:"Elegantne suupiste.", ru:"Элегантная закуска.", en:"Elegant and light."} },
    { id: "pastry-burger-chicken", category: "pastries", name: {et:"Burger kanakotletiga", ru:"Бургер с куриной котлетой", en:"Burger with chicken patty"}, price: money(2.5), unit: "each", desc: {et:"Õrn ja maitsev.", ru:"Нежно и вкусно.", en:"Tender and tasty."} },
    { id: "pastry-lavash", category: "pastries", name: {et:"Lavašš", ru:"Лаваш", en:"Lavash"}, price: money(0.8), unit: "each", desc: {et:"Sobib suupisteteks.", ru:"Подходит для закусок.", en:"Great for snacks/rolls."} },
    { id: "pastry-macarons", category: "pastries", name: {et:"Makaronid", ru:"Макароны", en:"Macarons"}, price: money(1.8), unit: "each", desc: {et:"Õrnad makaronid.", ru:"Нежные макароны.", en:"Delicate French-style macarons."} },

    // CATERING & MEAT DISHES
    { id: "cat-stuffed-eggs", category: "catering", name: {et:"Täidetud munad", ru:"Фаршированные яйца", en:"Stuffed eggs"}, price: money(1.2), unit: "each", desc: {et:"Klassikaline suupiste.", ru:"Классическая закуска.", en:"Classic catering bite."} },
    { id: "cat-mushroom-baskets", category: "catering", name: {et:"Korvikesed seentega", ru:"Корзиночки с грибами", en:"Mushroom baskets"}, price: money(1), unit: "each", desc: {et:"Maitsev soolane amps.", ru:"Вкусная солёная закуска.", en:"Savory and elegant."} },
    { id: "cat-herring-bread", category: "catering", name: {et:"Leib heeringaga", ru:"Хлеб с селёдкой", en:"Black bread with herring"}, price: money(1), unit: "each", desc: {et:"Traditsiooniline leib.", ru:"Традиционная закуска.", en:"Traditional and flavorful."} },
    { id: "cat-chicken-sesame-1kg", category: "catering", name: {et:"Kana seesamiseemnetega 1 kg", ru:"Курица с кунжутом 1 кг", en:"Chicken with sesame 1 kg"}, price: money(20), unit: "1 kg", desc: {et:"Suuremale seltskonnale.", ru:"Для компании.", en:"Great for sharing."} },
    { id: "cat-pork-roast-1kg", category: "catering", name: {et:"Praad sealiha 1 kg", ru:"Жаркое из свинины 1 кг", en:"Roast pork 1 kg"}, price: money(18), unit: "1 kg", desc: {et:"Toitev liha roog.", ru:"Сытное блюдо.", en:"Hearty catering option."} },
    { id: "cat-chicken-roll", category: "catering", name: {et:"Kana rull", ru:"Куриный рулет", en:"Chicken roll"}, price: money(25), unit: "each", desc: {et:"Sobib vaagnatele.", ru:"Отлично для нарезки.", en:"Perfect for platters."} },

    // PLATTERS
    { id: "plat-fruit-veg", category: "platters", name: {et:"Viljavaagen", ru:"Овощная/фруктовая тарелка", en:"Veg/Fruit platter"}, price: money(30), unit: "kg", desc: {et:"Värske vaagen (€/kg).", ru:"Свежая тарелка (€/кг).", en:"Fresh platter (€/kg)."} },
    { id: "plat-fruit", category: "platters", name: {et:"Puuviljavaagen", ru:"Фруктовая тарелка", en:"Fruit platter"}, price: money(32), unit: "kg", desc: {et:"Puuviljad (€/kg).", ru:"Фрукты (€/кг).", en:"Fruit selection (€/kg)."} },
    { id: "plat-cheese", category: "platters", name: {et:"Suistuvaagen", ru:"Сырная тарелка", en:"Cheese platter"}, price: money(27), unit: "kg", desc: {et:"Juustud (€/kg).", ru:"Сыры (€/кг).", en:"Cheese selection (€/kg)."} },
    { id: "plat-meat", category: "platters", name: {et:"Lihavaagen", ru:"Мясная тарелка", en:"Meat platter"}, price: money(30), unit: "kg", desc: {et:"Lihavaagen (€/kg).", ru:"Мясная тарелка (€/кг).", en:"Meat platter (€/kg)."} },
    { id: "plat-fish", category: "platters", name: {et:"Kalavaagen", ru:"Рыбная тарелка", en:"Fish platter"}, price: money(32), unit: "kg", desc: {et:"Kalavalik (€/kg).", ru:"Рыбная тарелка (€/кг).", en:"Fish selection (€/kg)."} },
    { id: "plat-snacks", category: "platters", name: {et:"Suupistevaagen", ru:"Закусочная тарелка", en:"Snack platter"}, price: money(25), unit: "kg", desc: {et:"Suupisted (€/kg).", ru:"Закуски (€/кг).", en:"Assorted snacks (€/kg)."} },
    { id: "plat-ham-rolls-bread", category: "platters", name: {et:"Singirullid mustal leival", ru:"Рулетики с ветчиной на чёрном хлебе", en:"Ham rolls on black bread"}, price: money(16), unit: "kg", desc: {et:"Klassika (€/kg).", ru:"Классика (€/кг).", en:"A classic (€/kg)."} },
    { id: "plat-mini-buns", category: "platters", name: {et:"Minisaia suitsuräime ja porgandiga", ru:"Мини-булочки со шпротами и морковью", en:"Mini buns with smoked sprat & carrot"}, price: money(25), unit: "kg", desc: {et:"Huvitav ja maitsev (€/kg).", ru:"Интересно и вкусно (€/кг).", en:"Unique and tasty (€/kg)."} }
  ].map((p, idx) => {
    const imgList = placeholderImages[p.category] || placeholderImages.cakes;
    return {
      ...p,
      image: imgList[idx % imgList.length]
    };
  });

  window.BAKERY_SITE = window.BAKERY_SITE || {};
  window.BAKERY_SITE.products = products;
})();

// Zerenelle Artisan Chenille Bouquets - Core Application Logic
// Optimized for Kerala Craft Atelier: INR (₹) Pricing, All-Kerala Delivery, No COD, WhatsApp Integration & Admin Studio

// 1. DEFAULT DATA STORAGE & PERSISTENCE
const DEFAULT_PRODUCTS = [
  {
    id: 'zr-sig-pastel',
    title: 'The Zerenelle Signature Pastel',
    subtitle: '100% Hand-Sculpted Everlasting Bouquet',
    category: 'pastel',
    price: 1699,
    originalPrice: 1999,
    rating: 4.95,
    reviewsCount: 142,
    badge: 'Atelier Bestseller',
    image: 'assets/images/hero-bouquet.jpg',
    description: 'Our crown jewel arrangement. Over 14 hand-sculpted stems featuring velvet blush roses, sunny cream chamomile daisies, and plush peach tulips. Wrapped in signature Korean translucent frosted wrap with a double blush satin bow.',
    stems: '5x Blush Velvet Roses, 4x Peach Chenille Tulips, 5x Cream Daisies, 6x Fuzzy Sage Foliage',
    dimensions: '38 cm H × 30 cm W',
    fragrance: 'Delicate Madagascar Vanilla (Optional)',
    scentNotes: 'Warm vanilla, sweet almond, gentle floral musk',
    inStock: true
  },
  {
    id: 'zr-rose-romance',
    title: 'Velvet Rose Romance',
    subtitle: 'Deep Crimson & Blush Velvet Stems',
    category: 'romance',
    price: 1899,
    originalPrice: 2199,
    rating: 5.0,
    reviewsCount: 98,
    badge: 'Anniversary Favorite',
    image: 'assets/images/rose-romance.jpg',
    description: 'An ode to everlasting devotion. Rich, high-density chenille wire sculpted into 15 velvety deep crimson and soft blush roses, nestled with delicate white pipe cleaner baby’s breath. Layered in luxury champagne gold-trimmed paper with organza ribbon.',
    stems: '8x Crimson Velvet Roses, 7x Powder Blush Roses, 8x Baby’s Breath Stems',
    dimensions: '40 cm H × 32 cm W',
    fragrance: 'Wild English Rose Scented',
    scentNotes: 'Fresh cut rosewater, dewy peony petals',
    inStock: true
  },
  {
    id: 'zr-sunshine-joy',
    title: 'Sunshine & Daisy Joyride',
    subtitle: 'Golden Sunflowers & Chamomile Stems',
    category: 'cheer',
    price: 1399,
    originalPrice: 1599,
    rating: 4.92,
    reviewsCount: 87,
    badge: 'Mood Lifter',
    image: 'assets/images/sunshine-bloom.jpg',
    description: 'Pure radiant joy wrapped in rustic kraft. Multi-layered golden-yellow chenille sunflowers with fuzzy chocolate seed centers, paired with cheerful white daisies and emerald chenille leaflets. Finished with a yellow gingham bow.',
    stems: '4x Giant Sunflowers, 6x Cheerful Daisies, 4x Velvet Fern Stems',
    dimensions: '36 cm H × 28 cm W',
    fragrance: 'Honey Blossom & Citrus Spritz',
    scentNotes: 'Sweet honey, wild clover, sunny lemon zest',
    inStock: true
  },
  {
    id: 'zr-lavender-serenade',
    title: 'Lilac & Sky Tulip Serenade',
    subtitle: 'Provence Lavender & Baby Blue Tulips',
    category: 'pastel',
    price: 1499,
    originalPrice: 1749,
    rating: 4.88,
    reviewsCount: 64,
    badge: 'Calming Aesthetic',
    image: 'assets/images/lavender-tulips.jpg',
    description: 'Dreamy French cottagecore aesthetic. Tall textured chenille lavender sprigs paired with sculpted baby-blue tulips and soft pink carnations. Elegantly cradled in pleated lilac wrap with pearl pins.',
    stems: '5x Provence Lavender Wands, 4x Sky Blue Tulips, 3x Pink Carnations',
    dimensions: '38 cm H × 26 cm W',
    fragrance: 'French Lavender Essential Infusion',
    scentNotes: 'True French lavender, chamomile, powdery sage',
    inStock: true
  },
  {
    id: 'zr-cottage-desk-pot',
    title: 'The Cozy Desk Petal Pot',
    subtitle: 'Potted Chenille Daisies & Sweet Strawberries',
    category: 'pots',
    price: 749,
    originalPrice: 899,
    rating: 4.96,
    reviewsCount: 112,
    badge: 'Desk Companion',
    image: 'assets/images/hero-bouquet.jpg',
    description: 'A charming mini desktop arrangement that never requires water. Features miniature smiling white daisies and fuzzy 3D chenille strawberries rooted in a soft ceramic pastel pot. Perfect for study spaces and office desks.',
    stems: '5x Mini Daisies, 3x Plush Chenille Strawberries, Ceramic Clay Pot included',
    dimensions: '18 cm H × 14 cm W',
    fragrance: 'Sweet Strawberry Cream',
    scentNotes: 'Fresh strawberries, sweet cream, vanilla sugar',
    inStock: true
  },
  {
    id: 'zr-grad-triumph',
    title: 'Academic Glory & Teddy Keepsake',
    subtitle: 'Graduation Special with Mini Bear & Scroll',
    category: 'cheer',
    price: 1999,
    originalPrice: 2299,
    rating: 5.0,
    reviewsCount: 79,
    badge: 'Graduation Special',
    image: 'assets/images/sunshine-bloom.jpg',
    description: 'Celebrate monumental milestones with a bouquet they can keep forever. Features golden victory sunflowers, an adorable handmade chenille graduate teddy with mortarboard cap, and a miniature rolled diploma tied in gold ribbon.',
    stems: '1x Handcrafted Graduate Chenille Teddy, 3x Golden Sunflowers, 4x Ivory Tulips',
    dimensions: '42 cm H × 30 cm W',
    fragrance: 'Victory Pear & Freesia',
    scentNotes: 'Crisp English pear, white freesia, amber',
    inStock: true
  }
];

const DEFAULT_SETTINGS = {
  adminPin: '1234',
  whatsappNumber: '919876543210',
  upiId: 'zerenelle@okhdfcbank',
  bannerOffer: '✨ Everlasting Handcrafted Chenille Bouquets • All Kerala Delivery Only (Prepaid / No COD) • Code: WELCOME10 for 10% Off ✨',
  coupons: {
    'KERALA10': 0.10,
    'WELCOME10': 0.10,
    'ZERENELLE': 0.15
  }
};

// Flower Language data
const FLOWER_MEANINGS = [
  { name: 'Chenille Rose (Blush)', meaning: 'Grace, gratitude, sweetness & budding affection', icon: '🌹', color: '#E8A5A9' },
  { name: 'Velvet Rose (Crimson)', meaning: 'Deep passion, eternal love & timeless devotion', icon: '🥀', color: '#B23A48' },
  { name: 'Fluffy Sunflower', meaning: 'Adoration, loyalty, warm sunshine & unwavering happiness', icon: '🌻', color: '#F4B942' },
  { name: 'French Tulip (Blue/Pink)', meaning: 'Care, gentle trust, rebirth & heartfelt confession', icon: '🌷', color: '#88A2BF' },
  { name: 'Provence Lavender', meaning: 'Peace of mind, serenity, devotion & graceful healing', icon: '🪻', color: '#A088BF' },
  { name: 'Chamomile Daisy', meaning: 'Innocence, fresh beginnings, cheerfulness & patience', icon: '🌼', color: '#F7E7A9' },
  { name: 'Baby’s Breath', meaning: 'Everlasting sincerity, purity & enduring friendship', icon: '✨', color: '#E5E0DA' }
];

// DEFAULT BUILDER STEMS & WRAPPING STYLES (WITH IMAGES)
const DEFAULT_BUILDER_STEMS = [
  {
    id: 'rose',
    name: 'Velvet Peony Rose',
    price: 120,
    description: 'Multi-petal velvet spiral bloom',
    image: 'assets/images/rose-romance.jpg',
    colors: [
      { name: 'Blush', hex: '#E58A92' },
      { name: 'Crimson', hex: '#B22234' },
      { name: 'Cream', hex: '#F7EBDD' }
    ],
    defaultCount: 3,
    inStock: true
  },
  {
    id: 'tulip',
    name: 'French Velvet Tulip',
    price: 95,
    description: 'Smooth bell cup sculpted bloom',
    image: 'assets/images/lavender-tulips.jpg',
    colors: [
      { name: 'Peach', hex: '#F4A261' },
      { name: 'Baby Blue', hex: '#7FA8D0' },
      { name: 'Lilac', hex: '#A088BF' }
    ],
    defaultCount: 2,
    inStock: true
  },
  {
    id: 'sunflower',
    name: 'Fluffy Golden Sunflower',
    price: 140,
    description: 'Golden petals with fuzzy chocolate center',
    image: 'assets/images/sunshine-bloom.jpg',
    colors: [
      { name: 'Golden Yellow', hex: '#F4B942' }
    ],
    defaultCount: 1,
    inStock: true
  },
  {
    id: 'lavender',
    name: 'Provence Lavender Wand',
    price: 80,
    description: 'Textured beaded plush fragrant wand',
    image: 'assets/images/lavender-tulips.jpg',
    colors: [
      { name: 'Lavender Lilac', hex: '#A088BF' }
    ],
    defaultCount: 2,
    inStock: true
  },
  {
    id: 'daisy',
    name: 'Chamomile Daisy',
    price: 80,
    description: '8-petal cheerful sunshine daisy',
    image: 'assets/images/hero-bouquet.jpg',
    colors: [
      { name: 'Sunny White', hex: '#FFFFFF' }
    ],
    defaultCount: 2,
    inStock: true
  },
  {
    id: 'babysbreath',
    name: 'Baby’s Breath Stems',
    price: 60,
    description: 'Delicate airy white cloud accents',
    image: 'assets/images/artisan-craft.jpg',
    colors: [
      { name: 'Airy White', hex: '#E5E0DA' }
    ],
    defaultCount: 2,
    inStock: true
  },
  {
    id: 'bear',
    name: 'Kawaii Chenille Bear / Bunny Topper',
    price: 190,
    description: '3D fuzzy plush centerpiece keepsake',
    image: 'assets/images/sunshine-bloom.jpg',
    colors: [
      { name: 'Honey Bear', hex: '#D4A373' }
    ],
    defaultCount: 0,
    inStock: true
  }
];

const DEFAULT_WRAPPING_STYLES = [
  {
    id: 'korean-frosted',
    name: 'Korean Frosted',
    description: 'Translucent blush matte',
    price: 0,
    image: 'assets/images/hero-bouquet.jpg',
    colorHex: '#F7CDD2',
    inStock: true
  },
  {
    id: 'kraft-lace',
    name: 'Parisian Kraft & Lace',
    description: 'Rustic vintage brown with white lace',
    price: 0,
    image: 'assets/images/sunshine-bloom.jpg',
    colorHex: '#D4A373',
    inStock: true
  },
  {
    id: 'midnight-noir',
    name: 'Midnight Charcoal',
    description: 'Deep black with gold foil trim',
    price: 60,
    image: 'assets/images/rose-romance.jpg',
    colorHex: '#2A2A2A',
    inStock: true
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Shimmer',
    description: 'Luxury metallic champagne sheen',
    price: 80,
    image: 'assets/images/hero-bouquet.jpg',
    colorHex: '#E6D5B8',
    inStock: true
  }
];

// 2. STATE INITIALIZATION (Local Storage Aware)
let storedProducts = JSON.parse(localStorage.getItem('zerenelle_products'));
let products = storedProducts && storedProducts.length > 0 ? storedProducts : DEFAULT_PRODUCTS;

let storedSettings = JSON.parse(localStorage.getItem('zerenelle_settings'));
let settings = storedSettings ? { ...DEFAULT_SETTINGS, ...storedSettings } : DEFAULT_SETTINGS;

let storedStems = JSON.parse(localStorage.getItem('zerenelle_builder_stems'));
let builderStems = storedStems && storedStems.length > 0 ? storedStems : DEFAULT_BUILDER_STEMS;

let storedWraps = JSON.parse(localStorage.getItem('zerenelle_wrapping_styles'));
let wrappingStyles = storedWraps && storedWraps.length > 0 ? storedWraps : DEFAULT_WRAPPING_STYLES;

const state = {
  cart: JSON.parse(localStorage.getItem('zerenelle_cart')) || [],
  discountPercent: 0,
  activeFilter: 'all',
  
  // Custom Bouquet Builder State (INR Pricing)
  customBouquet: {
    stems: {
      rose: { count: 3, name: 'Velvet Peony Rose', price: 120, color: 'blush' },
      tulip: { count: 2, name: 'French Velvet Tulip', price: 95, color: 'peach' },
      sunflower: { count: 1, name: 'Golden Sunflower', price: 140, color: 'golden yellow' },
      lavender: { count: 2, name: 'Provence Lavender', price: 80, color: 'lavender lilac' },
      daisy: { count: 2, name: 'Chamomile Daisy', price: 80, color: 'sunny white' },
      babysbreath: { count: 2, name: 'Baby’s Breath Stems', price: 60, color: 'airy white' },
      bear: { count: 0, name: 'Kawaii Chenille Bear / Bunny Topper', price: 190, color: 'honey bear' }
    },
    customFlower: {
      name: '',
      color: '',
      count: 0,
      price: 150
    },
    wrapping: 'korean-frosted',
    ribbon: 'satin-blush',
    fairyLights: true,
    fragrance: 'Madagascar Vanilla',
    recipientName: '',
    cardNote: 'You bloom with grace and light every single day.'
  }
};

const WRAP_OPTIONS = {
  'korean-frosted': { name: 'Korean Frosted Translucent (Pastel Blush)', price: 0 },
  'kraft-lace': { name: 'Rustic Parisian Kraft & White Lace', price: 0 },
  'midnight-noir': { name: 'Midnight Charcoal & Gold Foil Trim', price: 60 },
  'champagne-gold': { name: 'Luxury Champagne Shimmer Wrap', price: 80 }
};

// Currency Formatter Utility
function formatINR(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

// 3. PERSISTENCE HELPERS
function saveProducts() {
  localStorage.setItem('zerenelle_products', JSON.stringify(products));
  renderCatalog(state.activeFilter);
}

function saveSettings() {
  localStorage.setItem('zerenelle_settings', JSON.stringify(settings));
  applySiteSettings();
}

function applySiteSettings() {
  const bannerEl = document.getElementById('top-announcement-text');
  if (bannerEl && settings.bannerOffer) {
    bannerEl.textContent = settings.bannerOffer;
  }
  const upiDisplay = document.getElementById('checkout-upi-display');
  if (upiDisplay && settings.upiId) {
    upiDisplay.textContent = settings.upiId;
  }
}

// 4. CART OPERATIONS
function saveCart() {
  localStorage.setItem('zerenelle_cart', JSON.stringify(state.cart));
  updateCartUI();
}

function addToCart(item) {
  const existing = state.cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    state.cart.push({
      ...item,
      quantity: item.quantity || 1
    });
  }
  saveCart();
  showToast(`Added "${item.title}" to gift bag! 🌸`);
  openCartDrawer();
}

function updateCartQuantity(id, change) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
    showToast('Item removed from gift bag');
  }
  saveCart();
}

function clearCart() {
  state.cart = [];
  saveCart();
}

function getCartSubtotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartUI() {
  const countBadges = document.querySelectorAll('.cart-count-badge');
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  
  countBadges.forEach(b => {
    b.textContent = totalItems;
    b.classList.toggle('hidden', totalItems === 0);
  });

  const cartItemsList = document.getElementById('cart-items-container');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartSubtotalEl = document.getElementById('cart-subtotal-val');
  const cartDiscountRow = document.getElementById('cart-discount-row');
  const cartDiscountVal = document.getElementById('cart-discount-val');
  const cartTotalEl = document.getElementById('cart-total-val');
  const freeShippingBar = document.getElementById('free-shipping-progress');
  const freeShippingText = document.getElementById('free-shipping-msg');

  if (!cartItemsList) return;

  const subtotal = getCartSubtotal();
  const discountAmount = subtotal * state.discountPercent;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Free shipping across Kerala for orders ₹1,999+
  const freeShippingThreshold = 1999;
  const neededForFree = freeShippingThreshold - subtotal;
  const progressPct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (freeShippingBar && freeShippingText) {
    freeShippingBar.style.width = `${progressPct}%`;
    if (neededForFree <= 0) {
      freeShippingText.innerHTML = `<span class="text-emerald-700 font-semibold">✨ Congratulations! You unlocked FREE Delivery!</span>`;
      freeShippingBar.classList.remove('bg-rosebrand-600');
      freeShippingBar.classList.add('bg-emerald-500');
    } else {
      freeShippingText.innerHTML = `Add <span class="font-bold text-rosebrand-700">${formatINR(neededForFree)}</span> more for <strong>FREE Delivery</strong>`;
      freeShippingBar.classList.add('bg-rosebrand-600');
      freeShippingBar.classList.remove('bg-emerald-500');
    }
  }

  if (state.cart.length === 0) {
    cartItemsList.innerHTML = '';
    cartEmptyState.classList.remove('hidden');
    document.getElementById('cart-footer-checkout').classList.add('opacity-50', 'pointer-events-none');
    cartSubtotalEl.textContent = '₹0';
    cartTotalEl.textContent = '₹0';
    if (cartDiscountRow) cartDiscountRow.classList.add('hidden');
    return;
  }

  cartEmptyState.classList.add('hidden');
  document.getElementById('cart-footer-checkout').classList.remove('opacity-50', 'pointer-events-none');

  cartSubtotalEl.textContent = formatINR(subtotal);
  
  if (state.discountPercent > 0 && cartDiscountRow) {
    cartDiscountRow.classList.remove('hidden');
    cartDiscountVal.textContent = `-${formatINR(discountAmount)}`;
  } else if (cartDiscountRow) {
    cartDiscountRow.classList.add('hidden');
  }

  cartTotalEl.textContent = formatINR(finalTotal);

  cartItemsList.innerHTML = state.cart.map(item => `
    <div class="flex items-center gap-4 py-4 border-b border-stone-100 last:border-0">
      <div class="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200 shadow-sm relative">
        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
      </div>
      <div class="flex-grow min-w-0">
        <h4 class="font-medium text-stone-900 text-sm truncate">${item.title}</h4>
        <p class="text-xs text-stone-500 mt-0.5 truncate">${item.details || 'Handcrafted Chenille Arrangement'}</p>
        <div class="text-xs font-semibold text-rosebrand-700 mt-1">${formatINR(item.price * item.quantity)}</div>
      </div>
      <div class="flex items-center gap-2 border border-stone-200 rounded-lg px-2 py-1 bg-stone-50">
        <button onclick="updateCartQuantity('${item.id}', -1)" class="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-stone-900 font-bold text-sm">−</button>
        <span class="text-xs font-semibold px-1 text-stone-800">${item.quantity}</span>
        <button onclick="updateCartQuantity('${item.id}', 1)" class="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-stone-900 font-bold text-sm">+</button>
      </div>
      <button onclick="updateCartQuantity('${item.id}', -999)" class="text-stone-400 hover:text-rosebrand-700 transition-colors p-1" title="Remove item">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </div>
  `).join('');
}

// 5. BOUQUET BUILDER LOGIC (INR Pricing & Real Photo Previews)
function calculateCustomBouquetPrice() {
  const b = state.customBouquet;
  let stemTotal = 0;
  let totalStems = 0;

  for (const key in b.stems) {
    const s = b.stems[key];
    const stemDef = builderStems.find(item => item.id === key);
    const unitPrice = (stemDef ? stemDef.price : s.price) || 0;
    const count = s.count || 0;
    stemTotal += count * unitPrice;
    totalStems += count;
  }

  // Custom flower request
  if (b.customFlower && b.customFlower.count > 0) {
    const customCount = b.customFlower.count || 0;
    const customPrice = b.customFlower.price || 150;
    stemTotal += customCount * customPrice;
    totalStems += customCount;
  }

  const baseAssembly = 399; // Base master florist assembly, stem tape & framing in INR
  const wrapItem = wrappingStyles.find(w => w.id === b.wrapping) || WRAP_OPTIONS[b.wrapping];
  const wrapCost = wrapItem ? wrapItem.price : 0;
  const lightsCost = b.fairyLights ? 90 : 0;
  
  return {
    total: baseAssembly + stemTotal + wrapCost + lightsCost,
    totalStems,
    stemTotal,
    wrapCost,
    lightsCost
  };
}

function updateBuilderStem(type, delta) {
  if (!state.customBouquet.stems[type]) {
    const def = builderStems.find(s => s.id === type);
    state.customBouquet.stems[type] = {
      count: 0,
      name: def ? def.name : type,
      price: def ? def.price : 100,
      color: (def && def.colors && def.colors[0]?.name?.toLowerCase()) || 'default'
    };
  }

  const stem = state.customBouquet.stems[type];
  const newCount = Math.max(0, Math.min(20, (stem.count || 0) + delta));
  stem.count = newCount;
  renderBouquetBuilderUI();
}

function updateBuilderColor(type, colorKey) {
  if (!state.customBouquet.stems[type]) {
    const def = builderStems.find(s => s.id === type);
    state.customBouquet.stems[type] = {
      count: def ? (def.defaultCount || 0) : 0,
      name: def ? def.name : type,
      price: def ? def.price : 100,
      color: colorKey
    };
  } else {
    state.customBouquet.stems[type].color = colorKey;
  }
  renderBouquetBuilderUI();
}

function setBuilderOption(key, value) {
  state.customBouquet[key] = value;
  renderBouquetBuilderUI();
}

function updateCustomFlowerCount(delta) {
  if (!state.customBouquet.customFlower) {
    state.customBouquet.customFlower = { name: '', color: '', count: 0, price: 150 };
  }
  const cf = state.customBouquet.customFlower;
  cf.count = Math.max(0, Math.min(15, (cf.count || 0) + delta));
  renderBouquetBuilderUI();
}

function handleCustomFlowerInput() {
  const nameInput = document.getElementById('custom-flower-name');
  const colorInput = document.getElementById('custom-flower-color');
  if (!state.customBouquet.customFlower) {
    state.customBouquet.customFlower = { name: '', color: '', count: 0, price: 150 };
  }
  const cf = state.customBouquet.customFlower;
  if (nameInput) cf.name = nameInput.value.trim();
  if (colorInput) cf.color = colorInput.value.trim();
  renderBouquetVisualCanvas();
}

let canvasViewMode = 'visual';

function setBouquetViewMode(mode) {
  canvasViewMode = mode;
  renderBouquetVisualCanvas();
}

function renderBouquetVisualCanvas() {
  const stage = document.getElementById('builder-canvas-stage');
  if (!stage) return;

  const { stems, customFlower, wrapping, fairyLights, cardNote, recipientName, fragrance } = state.customBouquet;

  // Calculate total stems including custom requested flower
  let totalCount = Object.values(stems).reduce((acc, s) => acc + (s.count || 0), 0);
  if (customFlower && customFlower.count > 0) {
    totalCount += customFlower.count;
  }

  // 1. REAL ATELIER PHOTOGRAPHY MODE (Customer can see the real physical handcrafted bouquet)
  if (canvasViewMode === 'photo') {
    // Choose reference photo matching highest count or theme
    let referenceImage = 'assets/images/hero-bouquet.jpg';
    let referenceTitle = 'The Zerenelle Signature Pastel Handcrafted Bouquet';
    if (stems.rose && stems.rose.count >= 4) {
      referenceImage = 'assets/images/rose-romance.jpg';
      referenceTitle = 'Velvet Peony Rose Romance Arrangement';
    } else if (stems.sunflower && stems.sunflower.count >= 2) {
      referenceImage = 'assets/images/sunshine-bloom.jpg';
      referenceTitle = 'Sunshine Golden Meadow Bouquet';
    } else if (stems.tulip && stems.tulip.count >= 3) {
      referenceImage = 'assets/images/lavender-tulips.jpg';
      referenceTitle = 'French Velvet Tulip & Lavender Harmony';
    }

    stage.innerHTML = `
      <div class="relative w-full h-[520px] rounded-3xl overflow-hidden bg-stone-900 group">
        <img src="${referenceImage}" alt="${referenceTitle}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>

        <!-- Top Header Navigation -->
        <div class="absolute top-4 inset-x-4 z-40 flex items-center justify-between">
          <div class="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-white flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-rosebrand-400 animate-ping"></span>
            <span class="text-rosebrand-300 font-bold">🌸 Scent:</span>
            <span>${fragrance || 'Madagascar Vanilla'}</span>
          </div>

          <!-- Switcher Pill -->
          <div class="bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 flex items-center gap-1 text-[11px] font-semibold text-white/80">
            <button type="button" onclick="setBouquetViewMode('visual')" class="px-3.5 py-1 rounded-full transition-all hover:text-white">
              ✨ 3D Composer
            </button>
            <button type="button" onclick="setBouquetViewMode('photo')" class="px-3.5 py-1 rounded-full transition-all bg-rosebrand-700 text-white shadow-xs font-bold">
              📷 Real Atelier Photo
            </button>
          </div>

          <div class="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-rosebrand-300">
            ${totalCount} Stems Selected
          </div>
        </div>

        <!-- Real Product Info Badge -->
        <div class="absolute bottom-6 inset-x-6 z-30 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full bg-rosebrand-100 text-rosebrand-800 text-[10px] font-bold uppercase tracking-wider">Authentic Handcrafted Sample</span>
              <span class="text-xs text-stone-400">• Kerala Atelier</span>
            </div>
            <h4 class="font-serif text-lg font-bold text-stone-900 mt-0.5">${referenceTitle}</h4>
            <p class="text-xs text-stone-600">100% sculpted from premium velvet chenille stems with signature Korean wrap.</p>
          </div>
          <button type="button" onclick="setBouquetViewMode('visual')" class="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs flex-shrink-0 transition-colors">
            Back to 3D Customizer ↺
          </button>
        </div>
      </div>
    `;
    return;
  }

  // 2. ULTRA-LUXURY 3D VISUAL COMPOSER MODE
  function getColorPalettes(colorKey, stemType) {
    const defaultBlush = {
      light: '#FCE7EB',
      mid: '#E58A92',
      base: '#C86D74',
      shadow: '#882230',
      stroke: '#FFFFFF'
    };

    const palettes = {
      blush: defaultBlush,
      crimson: { light: '#FCA5A5', mid: '#DC2626', base: '#991B1B', shadow: '#5B0C12', stroke: '#FFE4E6' },
      peach: { light: '#FFEDD5', mid: '#FB923C', base: '#EA580C', shadow: '#9A3412', stroke: '#FFF7ED' },
      gold: { light: '#FEF08A', mid: '#F59E0B', base: '#D97706', shadow: '#78350F', stroke: '#FEF9C3' },
      lilac: { light: '#F3E8FF', mid: '#C084FC', base: '#9333EA', shadow: '#581C87', stroke: '#FAF5FF' },
      lavender: { light: '#EDE9FE', mid: '#A78BFA', base: '#7C3AED', shadow: '#4C1D95', stroke: '#F5F3FF' },
      sky: { light: '#E0F2FE', mid: '#60A5FA', base: '#2563EB', shadow: '#1E3A8A', stroke: '#F0F9FF' },
      cream: { light: '#FFFDF9', mid: '#F7EBDD', base: '#DFC8B2', shadow: '#9B7B5E', stroke: '#FFFFFF' },
      white: { light: '#FFFFFF', mid: '#F3ECE7', base: '#DED3CB', shadow: '#8B7B71', stroke: '#FFFFFF' }
    };

    const clean = (colorKey || '').toLowerCase();
    for (const key in palettes) {
      if (clean.includes(key)) return palettes[key];
    }
    return defaultBlush;
  }

  // High-Definition Illustrated Vector Floral Artworks
  const flowerVisuals = {
    rose: {
      tier: 'mid',
      svg: (color, id) => {
        const pal = getColorPalettes(color, 'rose');
        return `
          <svg viewBox="0 0 120 150" class="w-20 h-26 filter drop-shadow-md">
            <defs>
              <radialGradient id="roseVelvet-${id}" cx="45%" cy="38%" r="55%">
                <stop offset="0%" stop-color="${pal.light}"/>
                <stop offset="40%" stop-color="${pal.mid}"/>
                <stop offset="85%" stop-color="${pal.base}"/>
                <stop offset="100%" stop-color="${pal.shadow}"/>
              </radialGradient>
              <linearGradient id="roseStem-${id}" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#263D2B"/>
                <stop offset="50%" stop-color="#4E7C57"/>
                <stop offset="100%" stop-color="#203524"/>
              </linearGradient>
            </defs>
            <!-- Velvet Stalk -->
            <path d="M60 88 Q60 120 60 150" stroke="url(#roseStem-${id})" stroke-width="5" stroke-linecap="round"/>
            <!-- Velvet Leaves -->
            <path d="M60 114 Q36 104 30 118 Q46 128 60 118" fill="#3D5A40" stroke="#263D2B" stroke-width="1.2"/>
            <path d="M60 124 Q84 114 90 128 Q74 138 60 128" fill="#4B6E4E" stroke="#2D4A32" stroke-width="1.2"/>
            <!-- Calyx Sepals -->
            <path d="M44 86 Q60 100 52 108 M76 86 Q60 100 68 108" stroke="#2D4A32" stroke-width="3" stroke-linecap="round" fill="none"/>
            <!-- Outer Velvet Petals -->
            <ellipse cx="60" cy="54" rx="42" ry="36" fill="url(#roseVelvet-${id})" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.12))"/>
            <path d="M26 48 C22 28 46 18 60 24 C74 18 98 28 94 48 C90 68 76 82 60 82 C44 82 30 68 26 48 Z" fill="url(#roseVelvet-${id})" opacity="0.95"/>
            <!-- Inner Velvet Rosette Petals -->
            <path d="M36 44 C34 30 54 24 60 32 C66 24 86 30 84 44 C82 60 72 70 60 70 C48 70 38 60 36 44 Z" fill="${pal.mid}" stroke="${pal.light}" stroke-width="1.5"/>
            <!-- Swirling Velvet Rosette Core -->
            <path d="M48 40 C44 32 76 32 72 40 C68 50 50 54 48 44 C46 38 64 36 66 42 C68 46 56 48 54 44" fill="none" stroke="${pal.stroke}" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="60" cy="44" r="6" fill="${pal.shadow}"/>
          </svg>
        `;
      }
    },
    tulip: {
      tier: 'tall',
      svg: (color, id) => {
        const pal = getColorPalettes(color, 'tulip');
        return `
          <svg viewBox="0 0 110 150" class="w-16 h-26 filter drop-shadow-md">
            <defs>
              <linearGradient id="tulipPetal-${id}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${pal.light}"/>
                <stop offset="55%" stop-color="${pal.mid}"/>
                <stop offset="100%" stop-color="${pal.shadow}"/>
              </linearGradient>
            </defs>
            <!-- Tall Stalk -->
            <path d="M55 75 Q54 110 55 150" stroke="#3D5A40" stroke-width="4.5" stroke-linecap="round"/>
            <!-- Broad Sculpted Leaf -->
            <path d="M55 132 Q82 112 86 76 Q70 102 55 122" fill="#4B6E4E" stroke="#263D2B" stroke-width="1.2"/>
            <!-- Back Cup Petal -->
            <path d="M35 48 C35 22 75 22 75 48 C75 74 35 74 35 48 Z" fill="${pal.shadow}" opacity="0.8"/>
            <!-- Left Wing Petal -->
            <path d="M30 46 C30 18 58 18 62 52 C60 74 32 72 30 46 Z" fill="url(#tulipPetal-${id})" stroke="${pal.stroke}" stroke-width="1.2"/>
            <!-- Right Wing Petal -->
            <path d="M80 46 C80 18 52 18 48 52 C50 74 78 72 80 46 Z" fill="url(#tulipPetal-${id})" stroke="${pal.stroke}" stroke-width="1.2"/>
            <!-- Central Fluted Cup Petal -->
            <path d="M42 42 C45 22 65 22 68 42 C68 68 42 68 42 42 Z" fill="url(#tulipPetal-${id})" stroke="#FFFFFF" stroke-width="1" opacity="0.95"/>
          </svg>
        `;
      }
    },
    sunflower: {
      tier: 'front',
      svg: (color, id) => `
        <svg viewBox="0 0 130 150" class="w-24 h-28 filter drop-shadow-lg">
          <defs>
            <linearGradient id="sunPetalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FCD34D"/>
              <stop offset="60%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#D97706"/>
            </linearGradient>
            <radialGradient id="sunCenterGrad" cx="45%" cy="45%" r="50%">
              <stop offset="0%" stop-color="#78350F"/>
              <stop offset="70%" stop-color="#451A03"/>
              <stop offset="100%" stop-color="#291002"/>
            </radialGradient>
          </defs>
          <path d="M65 85 L65 150" stroke="#3D5A40" stroke-width="5" stroke-linecap="round"/>
          <path d="M65 110 Q40 100 32 118 Q50 124 65 114" fill="#3D5A40"/>
          <!-- Radiating Double Velvet Petals -->
          <g fill="url(#sunPetalGrad)" stroke="#B45309" stroke-width="0.8">
            <path d="M65 10 Q60 30 65 45 Q70 30 65 10 Z"/>
            <path d="M65 80 Q60 60 65 45 Q70 60 65 80 Z"/>
            <path d="M30 45 Q50 40 65 45 Q50 50 30 45 Z"/>
            <path d="M100 45 Q80 40 65 45 Q80 50 100 45 Z"/>
            <path d="M40 20 Q52 35 65 45 Q48 42 40 20 Z"/>
            <path d="M90 20 Q78 35 65 45 Q82 42 90 20 Z"/>
            <path d="M40 70 Q52 55 65 45 Q48 48 40 70 Z"/>
            <path d="M90 70 Q78 55 65 45 Q82 48 90 70 Z"/>
            <path d="M52 14 Q58 32 65 45 Q64 28 52 14 Z"/>
            <path d="M78 14 Q72 32 65 45 Q66 28 78 14 Z"/>
            <path d="M34 32 Q50 38 65 45 Q44 48 34 32 Z"/>
            <path d="M96 32 Q80 38 65 45 Q86 48 96 32 Z"/>
            <path d="M34 58 Q50 52 65 45 Q44 42 34 58 Z"/>
            <path d="M96 58 Q80 52 65 45 Q86 42 96 58 Z"/>
            <path d="M52 76 Q58 58 65 45 Q64 62 52 76 Z"/>
            <path d="M78 76 Q72 58 65 45 Q66 62 78 76 Z"/>
          </g>
          <!-- Rich Chenille Seed Core -->
          <circle cx="65" cy="45" r="22" fill="url(#sunCenterGrad)" stroke="#92400E" stroke-width="2"/>
          <circle cx="65" cy="45" r="17" fill="none" stroke="#FDE68A" stroke-width="2.5" stroke-dasharray="2 3.5"/>
          <circle cx="65" cy="45" r="11" fill="none" stroke="#FBBF24" stroke-width="2" stroke-dasharray="2 3"/>
          <circle cx="65" cy="45" r="4" fill="#FDE68A" opacity="0.8"/>
        </svg>
      `
    },
    lavender: {
      tier: 'tall',
      svg: (color, id) => `
        <svg viewBox="0 0 70 160" class="w-10 h-28 filter drop-shadow-md">
          <defs>
            <radialGradient id="lavFloret" cx="40%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#E9D5FF"/>
              <stop offset="60%" stop-color="#A855F7"/>
              <stop offset="100%" stop-color="#6B21A8"/>
            </radialGradient>
          </defs>
          <path d="M35 30 L35 160" stroke="#3D5A40" stroke-width="3.5" stroke-linecap="round"/>
          <g fill="url(#lavFloret)" stroke="#581C87" stroke-width="0.8">
            <ellipse cx="35" cy="18" rx="6" ry="8"/>
            <circle cx="28" cy="28" r="6"/>
            <circle cx="42" cy="28" r="6"/>
            <circle cx="35" cy="34" r="6.5"/>
            <circle cx="26" cy="42" r="6.5"/>
            <circle cx="44" cy="42" r="6.5"/>
            <circle cx="35" cy="50" r="7"/>
            <circle cx="25" cy="58" r="7"/>
            <circle cx="45" cy="58" r="7"/>
            <circle cx="35" cy="66" r="7"/>
            <circle cx="26" cy="76" r="6.5"/>
            <circle cx="44" cy="76" r="6.5"/>
            <circle cx="35" cy="85" r="6"/>
            <circle cx="35" cy="94" r="5"/>
          </g>
        </svg>
      `
    },
    daisy: {
      tier: 'mid',
      svg: (color, id) => `
        <svg viewBox="0 0 110 150" class="w-16 h-24 filter drop-shadow-md">
          <defs>
            <linearGradient id="daisyPetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FFFFFF"/>
              <stop offset="80%" stop-color="#F5EFE9"/>
              <stop offset="100%" stop-color="#DFD4CB"/>
            </linearGradient>
            <radialGradient id="daisyDisc" cx="40%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#FDE047"/>
              <stop offset="70%" stop-color="#EAB308"/>
              <stop offset="100%" stop-color="#CA8A04"/>
            </radialGradient>
          </defs>
          <path d="M55 60 L55 150" stroke="#3D5A40" stroke-width="3.5" stroke-linecap="round"/>
          <g fill="url(#daisyPetal)" stroke="#D6C7BE" stroke-width="1">
            <ellipse cx="55" cy="22" rx="7" ry="16"/>
            <ellipse cx="55" cy="68" rx="7" ry="16"/>
            <ellipse cx="32" cy="45" rx="16" ry="7"/>
            <ellipse cx="78" cy="45" rx="16" ry="7"/>
            <ellipse cx="38" cy="28" rx="8" ry="15" transform="rotate(-45 38 28)"/>
            <ellipse cx="72" cy="28" rx="8" ry="15" transform="rotate(45 72 28)"/>
            <ellipse cx="38" cy="62" rx="8" ry="15" transform="rotate(45 38 62)"/>
            <ellipse cx="72" cy="62" rx="8" ry="15" transform="rotate(-45 72 62)"/>
          </g>
          <circle cx="55" cy="45" r="14" fill="url(#daisyDisc)" stroke="#A16207" stroke-width="1.5"/>
          <circle cx="55" cy="45" r="10" fill="none" stroke="#FEF08A" stroke-width="1.5" stroke-dasharray="2 2"/>
        </svg>
      `
    },
    babysbreath: {
      tier: 'tall',
      svg: () => `
        <svg viewBox="0 0 110 150" class="w-18 h-26 filter drop-shadow-sm opacity-95">
          <path d="M55 80 L55 150 M55 105 Q35 85 28 65 M55 95 Q75 80 82 58 M28 65 Q18 50 14 35 M28 65 Q38 48 42 32 M82 58 Q72 42 68 28 M82 58 Q95 45 100 30" stroke="#4B6E4E" stroke-width="2.2" stroke-linecap="round" fill="none"/>
          <g fill="#FFFFFF" stroke="#E2D9D2" stroke-width="1">
            <circle cx="14" cy="35" r="5"/>
            <circle cx="22" cy="42" r="4.5"/>
            <circle cx="42" cy="32" r="5"/>
            <circle cx="34" cy="24" r="4"/>
            <circle cx="68" cy="28" r="5.5"/>
            <circle cx="58" cy="18" r="4.5"/>
            <circle cx="100" cy="30" r="5"/>
            <circle cx="90" cy="20" r="4"/>
            <circle cx="55" cy="48" r="4.5"/>
            <circle cx="75" cy="45" r="4.5"/>
          </g>
          <g fill="#FEF3C7">
            <circle cx="14" cy="35" r="1.5"/>
            <circle cx="42" cy="32" r="1.5"/>
            <circle cx="68" cy="28" r="1.5"/>
            <circle cx="100" cy="30" r="1.5"/>
          </g>
        </svg>
      `
    },
    bear: {
      tier: 'front',
      svg: () => `
        <svg viewBox="0 0 120 150" class="w-24 h-28 filter drop-shadow-xl">
          <path d="M60 95 L60 150" stroke="#3D5A40" stroke-width="4.5" stroke-linecap="round"/>
          <circle cx="36" cy="38" r="16" fill="#D99B6A" stroke="#B47243" stroke-width="2"/>
          <circle cx="36" cy="38" r="9" fill="#FAD4C0"/>
          <circle cx="84" cy="38" r="16" fill="#D99B6A" stroke="#B47243" stroke-width="2"/>
          <circle cx="84" cy="38" r="9" fill="#FAD4C0"/>
          <ellipse cx="60" cy="62" rx="38" ry="34" fill="#E2AC7E" stroke="#B47243" stroke-width="2.5"/>
          <ellipse cx="60" cy="72" rx="18" ry="13" fill="#FFF6EE"/>
          <ellipse cx="60" cy="68" rx="6" ry="4.5" fill="#3E200C"/>
          <path d="M60 72 L60 77 M55 77 Q60 81 65 77" stroke="#3E200C" stroke-width="2" stroke-linecap="round" fill="none"/>
          <ellipse cx="46" cy="58" rx="4.5" ry="5.5" fill="#1C1008"/>
          <circle cx="44.5" cy="56" r="1.8" fill="#FFFFFF"/>
          <ellipse cx="74" cy="58" rx="4.5" ry="5.5" fill="#1C1008"/>
          <circle cx="72.5" cy="56" r="1.8" fill="#FFFFFF"/>
          <circle cx="38" cy="70" r="6" fill="#F87171" opacity="0.45"/>
          <circle cx="82" cy="70" r="6" fill="#F87171" opacity="0.45"/>
          <g fill="#E11D48">
            <path d="M52 92 L40 86 L40 98 Z"/>
            <path d="M68 92 L80 86 L80 98 Z"/>
            <circle cx="60" cy="92" r="4.5" fill="#BE123C"/>
          </g>
        </svg>
      `
    },
    custom: {
      tier: 'mid',
      svg: (color, id, name) => {
        const pal = getColorPalettes(color, 'custom');
        return `
          <svg viewBox="0 0 120 150" class="w-20 h-26 filter drop-shadow-md">
            <defs>
              <radialGradient id="customFlowerGrad-${id}" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="50%" stop-color="${pal.mid}"/>
                <stop offset="100%" stop-color="${pal.shadow}"/>
              </radialGradient>
            </defs>
            <path d="M60 85 L60 150" stroke="#3D5A40" stroke-width="4.5" stroke-linecap="round"/>
            <g fill="url(#customFlowerGrad-${id})" stroke="#FFFFFF" stroke-width="1.2">
              <path d="M60 16 Q42 38 60 56 Q78 38 60 16 Z"/>
              <path d="M38 28 Q30 50 55 60 Q45 38 38 28 Z"/>
              <path d="M82 28 Q90 50 65 60 Q75 38 82 28 Z"/>
              <path d="M22 46 Q24 70 54 66 Q30 56 22 46 Z"/>
              <path d="M98 46 Q96 70 66 66 Q90 56 98 46 Z"/>
              <path d="M48 38 Q45 56 60 64 Q56 46 48 38 Z" fill="#FFFFFF" opacity="0.9"/>
              <path d="M72 38 Q75 56 60 64 Q64 46 72 38 Z" fill="#FFFFFF" opacity="0.9"/>
              <circle cx="60" cy="58" r="7" fill="#FDE047" stroke="#CA8A04" stroke-width="1"/>
            </g>
          </svg>
        `;
      }
    }
  };

  // Compile stems list into three botanical tiers
  const tierTall = [];
  const tierMid = [];
  const tierFront = [];

  let stemIndex = 0;
  for (const flowerType in stems) {
    const sInfo = stems[flowerType];
    const visualDef = flowerVisuals[flowerType] || flowerVisuals.rose;
    const tier = visualDef.tier || 'mid';

    for (let c = 0; c < (sInfo.count || 0); c++) {
      const stemObj = {
        type: flowerType,
        color: sInfo.color || 'blush',
        name: sInfo.name || 'Handcrafted Stem',
        id: `s-${stemIndex++}`,
        svg: visualDef.svg(sInfo.color, `stem-${stemIndex}`)
      };
      if (tier === 'tall') tierTall.push(stemObj);
      else if (tier === 'front') tierFront.push(stemObj);
      else tierMid.push(stemObj);
    }
  }

  // Handle custom bespoke requested flower
  if (customFlower && customFlower.count > 0) {
    for (let c = 0; c < customFlower.count; c++) {
      tierMid.push({
        type: 'custom',
        color: customFlower.color || 'pink',
        name: customFlower.name || 'Bespoke Sculpted Flower',
        id: `custom-stem-${c}`,
        svg: flowerVisuals.custom.svg(customFlower.color, `cf-${c}`, customFlower.name)
      });
    }
  }

  // Render tiered stems positioned into an abundant floral dome
  function renderTierGroup(stemList, baseBottom, maxSpreadDeg, zIndexBase) {
    const count = stemList.length;
    if (count === 0) return '';

    return stemList.map((item, i) => {
      // Natural arc positioning
      const norm = count === 1 ? 0 : (i / (count - 1)) - 0.5; // -0.5 to +0.5
      const angle = norm * maxSpreadDeg;
      const xOffset = norm * (Math.min(260, count * 36)) + (Math.sin(i * 3) * 8);
      const yOffset = Math.cos(norm * Math.PI) * 26 + (i % 2 === 0 ? 0 : 12);
      const finalBottom = baseBottom + yOffset;
      const zIndex = zIndexBase + Math.round((1 - Math.abs(norm)) * 5);

      return `
        <div class="bouquet-flower-stem"
             title="${item.name} (${item.color})"
             style="bottom: ${finalBottom}px; left: calc(50% + ${xOffset}px); transform: translateX(-50%) rotate(${angle}deg); z-index: ${zIndex};">
          ${item.svg}
        </div>
      `;
    }).join('');
  }

  const tallStemsHtml = renderTierGroup(tierTall, 220, 48, 12);
  const midStemsHtml = renderTierGroup(tierMid, 185, 38, 20);
  const frontStemsHtml = renderTierGroup(tierFront, 155, 24, 28);

  // Fairy lights weaving through stems
  let fairyLightsHtml = '';
  if (fairyLights) {
    const lightCoords = [
      { b: 290, x: -35 }, { b: 310, x: 25 }, { b: 275, x: 60 },
      { b: 245, x: -65 }, { b: 260, x: 0 }, { b: 240, x: 45 },
      { b: 215, x: -40 }, { b: 210, x: 15 }, { b: 195, x: -15 },
      { b: 180, x: 50 }, { b: 175, x: -70 }, { b: 165, x: 30 }
    ];
    fairyLightsHtml = lightCoords.map((coord, idx) => `
      <div class="twinkle-dot" style="bottom: ${coord.b}px; left: calc(50% + ${coord.x}px); animation-delay: ${idx * 0.22}s;"></div>
    `).join('');
  }

  // Floating gentle aroma shimmer particles
  let aromaHtml = '';
  for (let a = 0; a < 6; a++) {
    const left = 35 + ((a * 23) % 40);
    const bottom = 260 + (a * 25);
    aromaHtml += `
      <div class="scent-aura-particle w-2 h-2 bg-amber-300/40 blur-[1px]" 
           style="bottom: ${bottom}px; left: ${left}%; animation-delay: ${a * 0.7}s;"></div>
    `;
  }

  // 3. MULTI-LAYER KOREAN / PARISIAN WRAPPING & SATIN SILK RIBBON
  // Dynamic wrapping gradients & styling
  let wrapGradients = {
    backWingGrad: 'linear-gradient(135deg, rgba(254, 226, 226, 0.92) 0%, rgba(251, 207, 232, 0.88) 100%)',
    frontConeGrad: 'linear-gradient(160deg, #FDE8E8 0%, #FBCFE8 55%, #F472B6 100%)',
    ribbonColor: '#BE185D',
    ribbonTail: '#9D174D',
    creaseColor: '#F472B6',
    sealText: '#831843'
  };

  if (wrapping === 'kraft-lace') {
    wrapGradients = {
      backWingGrad: 'linear-gradient(135deg, rgba(222, 204, 166, 0.95) 0%, rgba(199, 167, 116, 0.90) 100%)',
      frontConeGrad: 'linear-gradient(160deg, #E6D7B9 0%, #CDB38B 55%, #A68759 100%)',
      ribbonColor: '#78350F',
      ribbonTail: '#572607',
      creaseColor: '#92400E',
      sealText: '#451A03'
    };
  } else if (wrapping === 'midnight-noir') {
    wrapGradients = {
      backWingGrad: 'linear-gradient(135deg, rgba(45, 43, 42, 0.98) 0%, rgba(24, 23, 22, 0.95) 100%)',
      frontConeGrad: 'linear-gradient(160deg, #383533 0%, #242220 55%, #121110 100%)',
      ribbonColor: '#CA8A04',
      ribbonTail: '#A16207',
      creaseColor: '#CA8A04',
      sealText: '#FEF08A'
    };
  } else if (wrapping === 'champagne-gold') {
    wrapGradients = {
      backWingGrad: 'linear-gradient(135deg, rgba(250, 243, 224, 0.95) 0%, rgba(232, 213, 163, 0.90) 100%)',
      frontConeGrad: 'linear-gradient(160deg, #FFFBEB 0%, #FDE68A 55%, #D97706 100%)',
      ribbonColor: '#B45309',
      ribbonTail: '#92400E',
      creaseColor: '#D97706',
      sealText: '#78350F'
    };
  }

  stage.innerHTML = `
    <!-- Top Interactive Control Bar -->
    <div class="absolute top-4 inset-x-4 z-40 flex items-center justify-between pointer-events-auto">
      <!-- Scent Capsule -->
      <div class="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-xs flex items-center gap-2 text-xs text-stone-700">
        <span class="w-2 h-2 rounded-full bg-rosebrand-500 animate-ping"></span>
        <span class="text-rosebrand-600 font-bold">🌸 Scent:</span>
        <span class="font-medium">${fragrance || 'Madagascar Vanilla'}</span>
      </div>

      <!-- Mode Switcher Pill -->
      <div class="bg-white/95 backdrop-blur-md p-1 rounded-full border border-stone-200/80 shadow-xs flex items-center gap-1 text-[11px] font-semibold text-stone-600">
        <button type="button" onclick="setBouquetViewMode('visual')" class="px-3.5 py-1 rounded-full transition-all bg-rosebrand-700 text-white shadow-2xs font-bold">
          ✨ 3D Composer
        </button>
        <button type="button" onclick="setBouquetViewMode('photo')" class="px-3.5 py-1 rounded-full transition-all hover:text-stone-900">
          📷 Real Atelier Photo
        </button>
      </div>

      <!-- Live Stem Count -->
      <div class="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-xs text-xs font-bold text-rosebrand-800">
        ${totalCount} Stems Selected
      </div>
    </div>

    <!-- 3D Interactive Perspective Wrapper (Responds to Mouse Hover) -->
    <div id="bouquet-3d-stage-wrapper" class="bouquet-3d-wrapper">
      
      <!-- LAYER 1: BACK FLIGHT WINGS (Translucent Korean Wrapping Backdrop behind flowers) -->
      <div class="absolute bottom-0 w-[420px] h-[340px] pointer-events-none z-10 opacity-95 transition-all duration-500">
        <svg viewBox="0 0 420 340" class="w-full h-full filter drop-shadow-lg">
          <defs>
            <linearGradient id="backWrapWingGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#FCE7EB" stop-opacity="0.80"/>
            </linearGradient>
          </defs>
          <!-- Left Wing Fan -->
          <path d="M70 300 Q10 180 20 80 Q120 120 180 220 Z" fill="${wrapGradients.backWingGrad}" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
          <!-- Right Wing Fan -->
          <path d="M350 300 Q410 180 400 80 Q300 120 240 220 Z" fill="${wrapGradients.backWingGrad}" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
          <!-- Central Accordion Pleat Collar -->
          <path d="M120 250 Q210 200 300 250 L270 320 Q210 300 150 320 Z" fill="rgba(255,255,255,0.6)" opacity="0.75"/>
        </svg>
      </div>

      <!-- LAYER 2: BOTANICAL CHENILLE STEMS (Lush Floral Dome) -->
      ${totalCount > 0 ? `
        ${tallStemsHtml}
        ${midStemsHtml}
        ${frontStemsHtml}
        ${fairyLightsHtml}
        ${aromaHtml}
      ` : `
        <div class="text-center p-8 text-stone-400 z-20">
          <svg class="w-16 h-16 mx-auto mb-2 text-rosebrand-300 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <p class="font-serif text-2xl font-bold text-stone-700">Your Custom Bouquet is Empty</p>
          <p class="text-xs text-stone-400 mt-1">Pick stems in Step 1 to watch your bouquet bloom live!</p>
        </div>
      `}

      <!-- LAYER 3: FRONT SCULPTED KOREAN WRAPPING PAPER & PLEATED FOLDS -->
      <div class="absolute bottom-0 w-[340px] h-[240px] pointer-events-none z-35 transition-all duration-500">
        <svg viewBox="0 0 340 240" class="w-full h-full filter drop-shadow-2xl">
          <defs>
            <linearGradient id="frontPaperGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#000000" stop-opacity="0.12"/>
            </linearGradient>
            <radialGradient id="goldSealGrad" cx="40%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#FEF08A"/>
              <stop offset="60%" stop-color="#EAB308"/>
              <stop offset="100%" stop-color="#A16207"/>
            </radialGradient>
          </defs>

          <!-- Outer Left Wrap Fold -->
          <path d="M40 30 Q170 65 300 30 L225 240 Q170 245 115 240 Z" fill="${wrapGradients.frontConeGrad}"/>
          
          <!-- Translucent Inner Fold Edge Overlay -->
          <path d="M30 45 Q120 75 170 55 L135 240 Q100 240 70 230 Z" fill="white" opacity="0.22"/>
          <path d="M310 45 Q220 75 170 55 L205 240 Q240 240 270 230 Z" fill="white" opacity="0.15"/>

          <!-- Soft Fold Shadows -->
          <path d="M110 50 Q170 70 230 50 L195 240 L145 240 Z" fill="url(#frontPaperGrad)"/>

          <!-- Embossed Metallic Atelier Gold Seal -->
          <g transform="translate(170, 115)">
            <ellipse cx="0" cy="0" rx="22" ry="16" fill="url(#goldSealGrad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
            <ellipse cx="0" cy="0" rx="19" ry="13" fill="none" stroke="#FEF9C3" stroke-width="1" stroke-dasharray="2 2"/>
            <text x="0" y="2" text-anchor="middle" font-size="6.5" font-weight="bold" fill="${wrapGradients.sealText}" font-family="serif" letter-spacing="1">ZERENELLE</text>
            <text x="0" y="8" text-anchor="middle" font-size="4" font-weight="bold" fill="${wrapGradients.sealText}" letter-spacing="0.5">KERALA</text>
          </g>

          <!-- LAYER 4: SILK SATIN DOUBLE BOW & FLOWING RIBBONS -->
          <!-- Left Looped Ear -->
          <path d="M170 120 C110 90 90 125 135 135 C155 138 165 128 170 120 Z" fill="${wrapGradients.ribbonColor}" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))"/>
          <path d="M165 120 C125 100 110 122 140 128" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4"/>
          <!-- Right Looped Ear -->
          <path d="M170 120 C230 90 250 125 205 135 C185 138 175 128 170 120 Z" fill="${wrapGradients.ribbonColor}" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))"/>
          <path d="M175 120 C215 100 230 122 200 128" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4"/>
          <!-- Knot Button -->
          <circle cx="170" cy="122" r="10" fill="${wrapGradients.ribbonTail}" stroke="#FEF08A" stroke-width="1.2"/>
          <circle cx="168" cy="120" r="3" fill="white" opacity="0.5"/>

          <!-- Cascading Satin Ribbon Tails -->
          <!-- Left Tail -->
          <path d="M166 128 Q140 180 125 235 Q140 238 148 220 Q160 175 168 132 Z" fill="${wrapGradients.ribbonTail}" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.18))"/>
          <!-- Right Tail -->
          <path d="M174 128 Q200 180 215 235 Q200 238 192 220 Q180 175 172 132 Z" fill="${wrapGradients.ribbonTail}" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.18))"/>
        </svg>
      </div>

      <!-- LAYER 4: ELEGANT EMBOSSED CALLIGRAPHY GIFT CARD -->
      ${cardNote ? `
        <div class="atelier-gift-card absolute bottom-6 right-5 max-w-[215px] p-3.5 rounded-2xl border border-stone-300/80 shadow-2xl z-40 transform rotate-2 backdrop-blur-md transition-all hover:scale-105 hover:rotate-0">
          <div class="flex items-center justify-between pb-1 mb-1.5 border-b border-stone-200/80 text-[10px] uppercase font-bold tracking-widest text-rosebrand-800">
            <span>💌 To: ${recipientName || 'Someone Special'}</span>
            <span class="text-[9px] text-stone-400">Atelier Note</span>
          </div>
          <p class="font-serif italic text-xs text-stone-800 leading-snug line-clamp-3">"${cardNote}"</p>
          <div class="text-[9px] text-stone-400 mt-2 text-right font-medium font-sans flex items-center justify-end gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-rosebrand-500 inline-block"></span>
            Handcrafted with Love
          </div>
        </div>
      ` : ''}

    </div>
  `;

  // Attach interactive 3D perspective mousemove listeners
  if (!stage.dataset.tiltAttached) {
    stage.dataset.tiltAttached = 'true';
    stage.addEventListener('mousemove', (e) => {
      if (canvasViewMode !== 'visual') return;
      const rect = stage.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;
      const wrapper = document.getElementById('bouquet-3d-stage-wrapper');
      if (wrapper) {
        wrapper.style.transform = `perspective(1000px) rotateY(${xNorm * 16}deg) rotateX(${-yNorm * 14}deg) translateY(-4px)`;
      }
    });

    stage.addEventListener('mouseleave', () => {
      const wrapper = document.getElementById('bouquet-3d-stage-wrapper');
      if (wrapper) {
        wrapper.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
      }
    });
  }
}

function renderBouquetBuilderUI() {
  const stemsContainer = document.getElementById('builder-stems-container');
  const wrappingContainer = document.getElementById('builder-wrapping-container');
  const pricing = calculateCustomBouquetPrice();

  const priceDisplay = document.getElementById('builder-total-price');
  const stemCountDisplay = document.getElementById('builder-stem-count');
  if (priceDisplay) priceDisplay.textContent = formatINR(pricing.total);
  if (stemCountDisplay) stemCountDisplay.textContent = `${pricing.totalStems} stems selected`;

  // 1. Render Flower Stems with Real Photos & Color Dots
  if (stemsContainer) {
    stemsContainer.innerHTML = builderStems.map(stem => {
      const currentStem = state.customBouquet.stems[stem.id] || { count: stem.defaultCount || 0, color: (stem.colors && stem.colors[0]?.name?.toLowerCase()) || 'default' };
      const count = currentStem.count || 0;
      const isOutOfStock = stem.inStock === false;

      return `
        <div class="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between shadow-2xs transition-all hover:border-stone-300 ${isOutOfStock ? 'opacity-60' : ''}">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-14 h-14 rounded-2xl overflow-hidden border border-stone-200 flex-shrink-0 bg-stone-50 shadow-2xs relative">
              <img src="${stem.image || 'assets/images/hero-bouquet.jpg'}" alt="${stem.name}" class="w-full h-full object-cover">
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-sm text-stone-900 truncate">${stem.name}</h4>
                ${isOutOfStock ? '<span class="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">Out of stock</span>' : ''}
              </div>
              <p class="text-xs text-stone-500">${formatINR(stem.price)} / stem • ${stem.description || 'Artisan chenille bloom'}</p>
              
              ${stem.colors && stem.colors.length > 0 ? `
                <div class="flex items-center gap-1.5 mt-1.5">
                  <span class="text-[10px] text-stone-400 mr-0.5">Colors:</span>
                  ${stem.colors.map(c => `
                    <button type="button" 
                            onclick="updateBuilderColor('${stem.id}', '${c.name.toLowerCase()}')" 
                            class="w-4 h-4 rounded-full border transition-transform ${currentStem.color === c.name.toLowerCase() ? 'ring-2 ring-rosebrand-500 scale-125' : 'border-stone-300 hover:scale-110'}" 
                            style="background-color: ${c.hex};" 
                            title="${c.name}"></button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>

          <div class="flex items-center gap-2 flex-shrink-0">
            <button type="button" onclick="updateBuilderStem('${stem.id}', -1)" ${isOutOfStock ? 'disabled' : ''} class="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors">−</button>
            <span class="w-6 text-center font-bold text-stone-900 text-sm">${count}</span>
            <button type="button" onclick="updateBuilderStem('${stem.id}', 1)" ${isOutOfStock ? 'disabled' : ''} class="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors">+</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // 2. Render Wrapping Options with Real Photo / Texture Swatches
  if (wrappingContainer) {
    const selectedWrap = state.customBouquet.wrapping || 'korean-frosted';
    wrappingContainer.innerHTML = wrappingStyles.map(wrap => {
      const isSelected = selectedWrap === wrap.id;
      return `
        <label class="cursor-pointer p-3 rounded-2xl bg-white border ${isSelected ? 'border-rosebrand-700 ring-2 ring-rosebrand-200 shadow-sm' : 'border-stone-200 hover:border-stone-300'} transition-all block relative overflow-hidden group">
          <input type="radio" name="wrap" value="${wrap.id}" ${isSelected ? 'checked' : ''} onchange="setBuilderOption('wrapping', this.value)" class="sr-only">
          
          <div class="h-20 w-full rounded-xl overflow-hidden mb-2 relative border border-stone-100 bg-stone-100">
            <img src="${wrap.image || 'assets/images/hero-bouquet.jpg'}" alt="${wrap.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-1.5 left-2 text-[10px] text-white font-bold drop-shadow">${wrap.name}</div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-[11px] text-stone-500 truncate">${wrap.description || 'Luxury Wrap'}</div>
            <div class="text-[11px] font-bold ${wrap.price === 0 ? 'text-emerald-700' : 'text-rosebrand-700'}">
              ${wrap.price === 0 ? 'Included' : `+${formatINR(wrap.price)}`}
            </div>
          </div>
        </label>
      `;
    }).join('');
  }

  // 3. Update Custom Flower Counter
  const customCountEl = document.getElementById('custom-flower-count-display');
  if (customCountEl && state.customBouquet.customFlower) {
    customCountEl.textContent = state.customBouquet.customFlower.count || 0;
  }

  renderBouquetVisualCanvas();
}

function addCustomBouquetToCart() {
  const pricing = calculateCustomBouquetPrice();
  if (pricing.totalStems === 0) {
    showToast('Please add at least 1 flower stem to your bouquet! 💐');
    return;
  }

  const { stems, customFlower, wrapping, fragrance, recipientName, cardNote } = state.customBouquet;
  
  let stemParts = [];
  for (const key in stems) {
    const s = stems[key];
    if (s.count > 0) {
      const stemDef = builderStems.find(item => item.id === key);
      const name = stemDef ? stemDef.name : s.name;
      stemParts.push(`${s.count}x ${name} (${s.color || 'Classic'})`);
    }
  }

  if (customFlower && customFlower.count > 0) {
    const cName = customFlower.name || 'Bespoke Sculpted Bloom';
    const cColor = customFlower.color ? ` in ${customFlower.color}` : '';
    stemParts.push(`Custom Request: ${customFlower.count}x ${cName}${cColor}`);
  }

  const wrapItem = wrappingStyles.find(w => w.id === wrapping) || WRAP_OPTIONS[wrapping];
  const wrapName = wrapItem ? wrapItem.name : 'Korean Frosted';

  const customItem = {
    id: `custom-bouquet-${Date.now()}`,
    title: `Custom Atelier Bouquet (${pricing.totalStems} Stems)`,
    price: pricing.total,
    image: 'assets/images/hero-bouquet.jpg',
    details: `${stemParts.join(', ')} | Wrap: ${wrapName} | Scent: ${fragrance}`,
    quantity: 1,
    isCustom: true,
    recipientName,
    cardNote
  };

  addToCart(customItem);
}

// 6. CATALOG RENDERING & FILTERING
function renderCatalog(filter = 'all') {
  const grid = document.getElementById('catalog-products-grid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-400">
        <p class="font-serif text-2xl text-stone-600">No bouquets in this collection yet.</p>
        <p class="text-xs mt-1">Use the Atelier Admin Studio to add new creations!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div class="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer" onclick="openQuickView('${p.id}')">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        
        <div class="absolute top-3 left-3 flex flex-col gap-1 z-10">
          ${p.badge ? `
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-stone-900 border border-stone-200 shadow-sm">
              ${p.badge}
            </span>
          ` : ''}
          <span class="px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rosebrand-800 border border-rose-200/80">
            100% Everlasting
          </span>
        </div>

        <div class="absolute inset-0 bg-stone-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="px-4 py-2 bg-white text-stone-900 text-xs font-semibold rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            Quick Inspect & Details
          </span>
        </div>
      </div>

      <div class="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-1.5 mb-2">
            <div class="flex text-amber-400 text-xs">
              ${'★'.repeat(Math.floor(p.rating || 5))}
            </div>
            <span class="text-xs font-bold text-stone-800">${(p.rating || 5.0).toFixed(1)}</span>
            <span class="text-xs text-stone-400">(${p.reviewsCount || 10} reviews)</span>
          </div>

          <h3 class="font-serif text-xl font-bold text-stone-900 group-hover:text-rosebrand-700 transition-colors">
            ${p.title}
          </h3>
          <p class="text-xs text-stone-500 mt-1 line-clamp-2">${p.description}</p>
          
          <div class="mt-3 flex items-center gap-2 text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg">
            <span>🌿</span>
            <span class="truncate">${p.stems}</span>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div class="flex items-baseline gap-2">
              <span class="text-xl font-bold text-stone-900">${formatINR(p.price)}</span>
              ${p.originalPrice ? `<span class="text-xs text-stone-400 line-through">${formatINR(p.originalPrice)}</span>` : ''}
            </div>
            <span class="text-[10px] text-emerald-700 font-medium">In Stock • Gift Ready</span>
          </div>

          <button onclick="addToCart(products.find(item => item.id === '${p.id}'))" class="px-4 py-2.5 bg-rosebrand-700 hover:bg-rosebrand-800 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// 7. QUICK VIEW MODAL
function openQuickView(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  const modal = document.getElementById('quick-view-modal');
  const content = document.getElementById('quick-view-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="relative rounded-2xl overflow-hidden bg-stone-100 aspect-square border border-stone-200 shadow-sm">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">
        <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-bold px-3 py-1 rounded-full border border-stone-200">
          ${p.badge || 'Artisan Collection'}
        </div>
      </div>

      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-amber-400 text-sm">★★★★★</span>
            <span class="text-xs font-bold text-stone-800">${p.rating || 5.0} / 5.0</span>
            <span class="text-xs text-stone-400">(${p.reviewsCount || 20} customer stories)</span>
          </div>

          <h2 class="font-serif text-3xl font-bold text-stone-900">${p.title}</h2>
          <p class="text-xs uppercase tracking-widest text-rosebrand-700 font-semibold mt-1">${p.subtitle || 'Custom Artisan Creation'}</p>

          <div class="flex items-baseline gap-3 my-4">
            <span class="text-3xl font-bold text-stone-900">${formatINR(p.price)}</span>
            ${p.originalPrice ? `<span class="text-sm text-stone-400 line-through">${formatINR(p.originalPrice)}</span>` : ''}
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800">Special Atelier Offer</span>
          </div>

          <p class="text-sm text-stone-600 leading-relaxed">${p.description}</p>

          <div class="my-6 space-y-2.5 text-xs border-y border-stone-200 py-4">
            <div class="flex justify-between">
              <span class="text-stone-500 font-medium">Stems & Composition:</span>
              <span class="text-stone-900 font-semibold text-right max-w-[200px]">${p.stems}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500 font-medium">Delivery Coverage:</span>
              <span class="text-emerald-800 font-semibold">All 14 Kerala Districts (Prepaid Only)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500 font-medium">Signature Scent:</span>
              <span class="text-rosebrand-700 font-semibold">${p.fragrance || 'French Lavender'}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-stone-500 font-medium">Keepsake Guarantee:</span>
              <span class="text-emerald-700 font-semibold">100% Everlasting (Never Wilts)</span>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <button onclick="addToCart(products.find(item => item.id === '${p.id}')); closeQuickView();" class="w-full py-3.5 bg-rosebrand-700 hover:bg-rosebrand-800 text-white font-semibold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2">
            <span>Add to Bag • ${formatINR(p.price)}</span>
          </button>
          <button onclick="orderSingleProductWhatsApp('${p.id}')" class="w-full py-3 bg-[#25D366] hover:bg-[#20BE5B] text-white font-semibold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs">
            <span>Direct WhatsApp Inquiry for this item</span>
          </button>
          <p class="text-center text-[11px] text-stone-400">
            🔒 Shipped in rigid cylinder gift packaging across Kerala (No COD)
          </p>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) modal.classList.add('hidden');
}

// 8. WHATSAPP ENGINE (KERALA-SPECIFIC FORMATTING)
function checkoutViaWhatsApp() {
  if (state.lastBooking) {
    const booking = state.lastBooking;
    let msg = `🌸 *Booking Confirmation - Ref: ${booking.orderId}* 🌸\n\n`;
    msg += `Hello Zerenelle Atelier! I have submitted my booking on the website.\n\n`;
    msg += `👤 *Customer:* ${booking.name} (${booking.phone})\n`;
    msg += `📍 *Delivery Address:* ${booking.address ? `${booking.address}, ` : ''}${booking.district} - ${booking.pincode}\n`;
    msg += `🎉 *Occasion:* ${booking.occasion}\n`;
    if (booking.deliveryDate) {
      const dt = new Date(booking.deliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      msg += `🎯 *Target Delivery Date:* ${dt}\n`;
    }
    msg += `\n*Bouquet Selection:*\n`;
    booking.items.forEach((item, index) => {
      msg += `${index + 1}. *${item.title}* (Qty: ${item.quantity}) - ${formatINR(item.price * item.quantity)}\n`;
      if (item.details) msg += `   Custom Details: ${item.details}\n`;
      if (item.cardNote) msg += `   Calligraphy Note: "${item.cardNote}" (For: ${item.recipientName || 'Someone Special'})\n`;
    });
    msg += `\n*Payable Total:* ${formatINR(booking.total)} (Prepaid UPI)\n\n`;
    msg += `I am sharing my UPI payment confirmation to book my crafting slot. Thank you! ✨`;

    const phone = settings.whatsappNumber || '919876543210';
    const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    return;
  }

  if (state.cart.length === 0) {
    showToast('Your gift bag is empty!');
    return;
  }

  const subtotal = getCartSubtotal();
  const discountAmount = subtotal * state.discountPercent;
  const deliveryCharge = subtotal >= 1999 ? 0 : 120;
  const total = Math.max(0, subtotal - discountAmount + deliveryCharge);

  let msg = `🌸 *New Order Request - Zerenelle Atelier* 🌸\n\n`;
  msg += `Hello Zerenelle! I would love to place a prepaid order for the following everlasting bouquet(s):\n\n`;

  state.cart.forEach((item, index) => {
    msg += `${index + 1}. *${item.title}* (Qty: ${item.quantity})\n`;
    msg += `   Price: ${formatINR(item.price * item.quantity)}\n`;
    if (item.details) msg += `   Custom Details: ${item.details}\n`;
    if (item.cardNote) msg += `   Calligraphy Note: "${item.cardNote}" (For: ${item.recipientName || 'Someone Special'})\n`;
    msg += `\n`;
  });

  if (state.discountPercent > 0) {
    msg += `Discount Applied: -${formatINR(discountAmount)}\n`;
  }
  msg += `Delivery Charge: ${deliveryCharge === 0 ? 'FREE (Orders ₹1,999+)' : formatINR(deliveryCharge)}\n`;
  msg += `*Total Order Value: ${formatINR(total)}*\n\n`;
  msg += `*Delivery Terms Accepted:* All Kerala Delivery Only • 100% Prepaid (GPay/PhonePe) • No COD\n\n`;
  msg += `Please send UPI / GPay details to confirm this booking! Thank you! ✨`;

  const phone = settings.whatsappNumber || '919876543210';
  const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
  
  // Also register in central orders database so owner sees it in Admin Orders Hub
  const orderId = `ZR-WA-${Math.floor(100000 + Math.random() * 900000)}`;
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: orderId,
      customerName: 'WhatsApp Inquiry Client',
      phone: '',
      district: 'Kerala',
      items: state.cart,
      subtotal,
      deliveryCharge,
      total,
      source: 'WhatsApp Chat Direct'
    })
  }).catch(() => {});

  window.open(waUrl, '_blank');
}

function orderSingleProductWhatsApp(productId) {
  const p = products.find(item => item.id === productId);
  if (!p) return;

  const phone = settings.whatsappNumber || '919876543210';
  let msg = `🌸 *Inquiry for ${p.title} - Zerenelle Atelier* 🌸\n\n`;
  msg += `Hello! I am interested in ordering *${p.title}* (${formatINR(p.price)}).\n`;
  msg += `Please let me know customization options and lead time for crafting. Thank you!`;

  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`, '_blank');
}

// 9. CHECKOUT MODAL (PREPAID UPI ONLY / NO COD)
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your gift bag is empty!');
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  const subtotal = getCartSubtotal();
  const discountAmount = subtotal * state.discountPercent;
  const deliveryCharge = subtotal >= 1999 ? 0 : 120;
  const total = Math.max(0, subtotal - discountAmount + deliveryCharge);

  document.getElementById('checkout-modal-subtotal').textContent = formatINR(subtotal);
  document.getElementById('checkout-modal-delivery').textContent = deliveryCharge === 0 ? 'FREE' : formatINR(deliveryCharge);
  document.getElementById('checkout-modal-total').textContent = formatINR(total);
  
  // Set default minimum date (allow 3 days for artisan crafting)
  const deliveryDateInput = document.getElementById('co-delivery-date');
  if (deliveryDateInput && !deliveryDateInput.value) {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    const dateStr = target.toISOString().split('T')[0];
    deliveryDateInput.min = dateStr;
    deliveryDateInput.value = dateStr;
  }

  modal.classList.remove('hidden');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('hidden');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('co-name')?.value || 'Valued Customer';
  const phone = document.getElementById('co-phone')?.value || '';
  const district = document.getElementById('co-district')?.value || 'Kerala';
  const pincode = document.getElementById('co-pincode')?.value || '';
  const address = document.getElementById('co-address')?.value || '';
  const occasion = document.getElementById('co-occasion')?.value || 'Birthday';
  const deliveryDate = document.getElementById('co-delivery-date')?.value || '';
  const orderId = `ZR-KL-${Math.floor(100000 + Math.random() * 900000)}`;

  const subtotal = getCartSubtotal();
  const discountAmount = subtotal * state.discountPercent;
  const deliveryCharge = subtotal >= 1999 ? 0 : 120;
  const total = Math.max(0, subtotal - discountAmount + deliveryCharge);

  // Cache order details for 1-click WhatsApp verification message
  state.lastBooking = {
    orderId,
    name,
    phone,
    district,
    pincode,
    address,
    occasion,
    deliveryDate,
    items: [...state.cart],
    subtotal,
    deliveryCharge,
    total
  };

  // Send Order to Central Database
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: orderId,
      customerName: name,
      phone,
      district,
      pincode,
      address,
      occasion,
      deliveryDate,
      items: state.cart,
      subtotal,
      deliveryCharge,
      total,
      source: 'Online Booking (Prepaid UPI)'
    })
  }).catch(() => {});

  closeCheckoutModal();

  const confModal = document.getElementById('confirmation-modal');
  if (confModal) {
    document.getElementById('conf-order-id').textContent = orderId;
    document.getElementById('conf-customer-name').textContent = name;
    document.getElementById('conf-customer-district').textContent = district;
    const confOccasion = document.getElementById('conf-occasion-date');
    if (confOccasion) {
      const formattedDate = deliveryDate ? new Date(deliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible';
      confOccasion.textContent = `${occasion} (${formattedDate})`;
    }
    confModal.classList.remove('hidden');
  }

  clearCart();
}

function closeConfirmationModal() {
  const modal = document.getElementById('confirmation-modal');
  if (modal) modal.classList.add('hidden');
  state.lastBooking = null;
}

// 10. PROMO CODE ENGINE
function applyPromoCode() {
  const input = document.getElementById('promo-code-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (settings.coupons && settings.coupons[code]) {
    state.discountPercent = settings.coupons[code];
    saveCart();
    showToast(`🎉 Coupon "${code}" applied! ${(state.discountPercent * 100)}% discount deducted.`);
    input.value = '';
  } else {
    showToast('Invalid coupon code. Try "KERALA10" ✨');
  }
}

// 11. TOAST NOTIFICATIONS
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg glass-panel px-4 py-3 rounded-2xl shadow-xl border border-rose-200/80 flex items-center gap-3 text-sm text-stone-900 bg-white/95';
  toast.innerHTML = `
    <span class="text-rosebrand-600 text-lg">🌸</span>
    <span class="font-medium">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 12. DRAWER TOGGLERS
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  }
}

// 13. FLOWER MEANINGS
function renderFlowerMeanings() {
  const container = document.getElementById('floriography-grid');
  if (!container) return;

  container.innerHTML = FLOWER_MEANINGS.map(f => `
    <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
      <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style="background-color: ${f.color}25; border: 1px solid ${f.color}60;">
        ${f.icon}
      </div>
      <div>
        <h4 class="font-serif font-bold text-stone-900 text-lg">${f.name}</h4>
        <p class="text-xs text-stone-600 mt-1 leading-relaxed">${f.meaning}</p>
      </div>
    </div>
  `).join('');
}

// 14. ADMIN ATELIER STUDIO ROUTING
function openAdminModal() {
  window.location.href = 'admin.html';
}

function closeAdminModal() {
  // Retained for backward compatibility
}

function renderAdminProductList() {
  const listEl = document.getElementById('admin-products-list');
  if (!listEl) return;

  listEl.innerHTML = products.map((p, idx) => `
    <div class="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <img src="${p.image}" class="w-14 h-14 rounded-xl object-cover border border-stone-200 flex-shrink-0 shadow-xs">
        <div>
          <div class="font-bold text-stone-900 text-sm">${p.title}</div>
          <div class="text-[11px] text-stone-500">Category: <span class="capitalize">${p.category}</span> • Badge: <span class="text-rosebrand-700 font-semibold">${p.badge || 'None'}</span></div>
          <div class="text-xs font-bold text-stone-800 mt-0.5">${formatINR(p.price)} ${p.originalPrice ? `<span class="text-stone-400 line-through text-[11px] font-normal">${formatINR(p.originalPrice)}</span>` : ''}</div>
        </div>
      </div>
      <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
        <div class="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-300">
          <span class="text-xs font-bold text-stone-500 pl-1">₹</span>
          <input type="number" value="${p.price}" onchange="updateProductPrice('${p.id}', this.value)" class="w-20 p-1 text-xs font-bold text-stone-800 border-0 focus:ring-0" title="Quick change price">
        </div>
        <button onclick="openEditProductModal('${p.id}')" class="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1">
          <span>✏️ Edit</span>
        </button>
        <button onclick="deleteProduct('${p.id}')" class="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1">
          <span>🗑️ Delete</span>
        </button>
      </div>
    </div>
  `).join('');
}


// 11. CENTRAL SERVER & DATABASE SYNCHRONIZATION (LIKE FLIPKART / SHOPIFY)
async function loadServerData() {
  try {
    const [prodRes, setRes, stemRes, wrapRes] = await Promise.all([
      fetch('/api/products').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/settings').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/builder-stems').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/wrapping-options').then(r => r.ok ? r.json() : null).catch(() => null)
    ]);

    if (prodRes && prodRes.success && Array.isArray(prodRes.products) && prodRes.products.length > 0) {
      products = prodRes.products;
      localStorage.setItem('zerenelle_products', JSON.stringify(products));
      renderCatalog(state.activeFilter);
      if (typeof renderAdminProductList === 'function') renderAdminProductList();
    }

    if (setRes && setRes.success && setRes.settings) {
      settings = { ...DEFAULT_SETTINGS, ...setRes.settings };
      localStorage.setItem('zerenelle_settings', JSON.stringify(settings));
      applySiteSettings();
    }

    if (stemRes && stemRes.success && Array.isArray(stemRes.stems) && stemRes.stems.length > 0) {
      builderStems = stemRes.stems;
      localStorage.setItem('zerenelle_builder_stems', JSON.stringify(builderStems));
      renderBouquetBuilderUI();
      if (typeof renderAdminBuilderStemsList === 'function') renderAdminBuilderStemsList();
    }

    if (wrapRes && wrapRes.success && Array.isArray(wrapRes.styles) && wrapRes.styles.length > 0) {
      wrappingStyles = wrapRes.styles;
      localStorage.setItem('zerenelle_wrapping_styles', JSON.stringify(wrappingStyles));
      renderBouquetBuilderUI();
      if (typeof renderAdminWrappingStylesList === 'function') renderAdminWrappingStylesList();
    }
  } catch (err) {
    console.log('Central server not detected or offline. Utilizing local storage state.');
  }
}

// Security Authentication Token Helper
function getAdminAuthPin() {
  return sessionStorage.getItem('zerenelle_admin_pin') || (typeof settings !== 'undefined' && settings && settings.adminPin) || '1234';
}

function getAdminFetchHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json',
    'x-admin-pin': getAdminAuthPin(),
    ...extra
  };
}

// Full Edit Product Logic
let editingProductId = null;

function openEditProductModal(productId) {
  const p = products.find(item => item.id === productId);
  if (!p) return;
  editingProductId = productId;

  const modal = document.getElementById('edit-product-modal');
  if (!modal) return;

  document.getElementById('edit-prod-title').value = p.title || '';
  document.getElementById('edit-prod-subtitle').value = p.subtitle || '';
  document.getElementById('edit-prod-price').value = p.price || '';
  document.getElementById('edit-prod-original-price').value = p.originalPrice || '';
  document.getElementById('edit-prod-category').value = p.category || 'romance';
  document.getElementById('edit-prod-badge').value = p.badge || '';
  document.getElementById('edit-prod-image').value = p.image || '';
  document.getElementById('edit-prod-image-preview').src = p.image || 'assets/images/hero-bouquet.jpg';
  document.getElementById('edit-prod-stems').value = p.stems || '';
  document.getElementById('edit-prod-desc').value = p.description || '';
  document.getElementById('edit-prod-fragrance').value = p.fragrance || 'French Lavender';

  modal.classList.remove('hidden');
}

function closeEditProductModal() {
  const modal = document.getElementById('edit-product-modal');
  if (modal) modal.classList.add('hidden');
  editingProductId = null;
}

async function handleSaveEditedProduct(e) {
  e.preventDefault();
  if (!editingProductId) return;

  const p = products.find(item => item.id === editingProductId);
  if (!p) return;

  p.title = document.getElementById('edit-prod-title').value.trim();
  p.subtitle = document.getElementById('edit-prod-subtitle').value.trim();
  p.price = parseInt(document.getElementById('edit-prod-price').value) || p.price;
  p.originalPrice = parseInt(document.getElementById('edit-prod-original-price').value) || null;
  p.category = document.getElementById('edit-prod-category').value;
  p.badge = document.getElementById('edit-prod-badge').value.trim();
  p.image = document.getElementById('edit-prod-image').value.trim() || p.image;
  p.stems = document.getElementById('edit-prod-stems').value.trim() || p.stems;
  p.description = document.getElementById('edit-prod-desc').value.trim() || p.description;
  p.fragrance = document.getElementById('edit-prod-fragrance').value.trim() || p.fragrance;

  saveProducts();
  renderAdminProductList();
  closeEditProductModal();
  showToast(`✅ Updated "${p.title}" successfully!`);

  // Persist to central database server
  try {
    await fetch(`/api/products/${editingProductId}`, {
      method: 'PUT',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify(p)
    });
  } catch (err) {}
}

// Real Photo Upload Engine (Saves directly to server /uploads folder or base64 fallback)
async function handleImageFileUpload(inputElement, targetInputId, targetPreviewId) {
  const file = inputElement.files[0];
  if (!file) return;

  // Immediate visual feedback
  const localPreviewUrl = URL.createObjectURL(file);
  const targetPreview = document.getElementById(targetPreviewId);
  if (targetPreview) targetPreview.src = localPreviewUrl;

  // Attempt server upload
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'x-admin-pin': getAdminAuthPin() },
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        const targetInput = document.getElementById(targetInputId);
        if (targetInput) targetInput.value = data.url;
        showToast('Photo uploaded & stored to atelier server! 📷');
        return;
      }
    }
  } catch (err) {
    console.log('Server upload unavailable, falling back to local file reader.');
  }

  // Fallback to FileReader DataURL
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    const targetInput = document.getElementById(targetInputId);
    if (targetInput) targetInput.value = dataUrl;
    showToast('Photo loaded from your device! 📷');
  };
  reader.readAsDataURL(file);
}

// Export / Backup Catalog
function exportCatalogBackup() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `zerenelle_catalog_backup_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('📦 Catalog backup downloaded to your computer!');
}

function importCatalogBackup(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        products = imported;
        saveProducts();
        renderAdminProductList();
        showToast('🎉 Catalog successfully restored from backup!');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (err) {
      alert('Error parsing JSON backup file.');
    }
  };
  reader.readAsText(file);
}

async function updateProductPrice(id, newPrice) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  p.price = Math.max(1, parseInt(newPrice) || p.price);
  saveProducts();
  showToast(`Updated price for ${p.title} to ${formatINR(p.price)}`);

  try {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify({ price: p.price })
    });
  } catch (err) {}
}

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to remove this bouquet item?')) return;
  products = products.filter(item => item.id !== id);
  saveProducts();
  renderAdminProductList();
  showToast('Bouquet removed from catalog');

  try {
    await fetch(`/api/products/${id}`, { 
      method: 'DELETE',
      headers: getAdminFetchHeaders()
    });
  } catch (err) {}
}

async function handleAddProduct(e) {
  e.preventDefault();
  const title = document.getElementById('new-prod-title').value.trim();
  const price = parseInt(document.getElementById('new-prod-price').value) || 1299;
  const category = document.getElementById('new-prod-category').value;
  const badge = document.getElementById('new-prod-badge').value.trim();
  const image = document.getElementById('new-prod-image').value.trim() || 'assets/images/hero-bouquet.jpg';
  const stems = document.getElementById('new-prod-stems').value.trim() || 'Hand-sculpted velvet chenille stems';
  const fragrance = document.getElementById('new-prod-fragrance')?.value.trim() || 'French Lavender';
  const desc = document.getElementById('new-prod-desc').value.trim() || 'Custom handcrafted everlasting velvet bouquet.';

  const newProd = {
    id: `zr-custom-${Date.now()}`,
    title,
    subtitle: 'Artisan Everlasting Bouquet',
    category,
    price,
    originalPrice: Math.round(price * 1.2),
    rating: 5.0,
    reviewsCount: 1,
    badge,
    image,
    description: desc,
    stems,
    dimensions: '35 cm H × 25 cm W',
    fragrance,
    inStock: true
  };

  products.unshift(newProd);
  saveProducts();
  renderAdminProductList();
  e.target.reset();
  showToast(`✨ Added "${title}" to your live catalog!`);

  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify(newProd)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.product && data.product.id) {
        newProd.id = data.product.id;
        saveProducts();
      }
    }
  } catch (err) {}
}

async function saveAdminGlobalSettings() {
  const banner = document.getElementById('admin-banner-input').value.trim();
  const wa = document.getElementById('admin-whatsapp-input').value.trim();
  const upi = document.getElementById('admin-upi-input').value.trim();
  const pin = document.getElementById('admin-pin-new')?.value.trim();

  if (banner) settings.bannerOffer = banner;
  if (wa) settings.whatsappNumber = wa;
  if (upi) settings.upiId = upi;
  if (pin) settings.adminPin = pin;

  saveSettings();
  showToast('Admin settings & banner offer updated successfully! 🌴');

  try {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify(settings)
    });
  } catch (err) {}
}

function resetToDefaultStore() {
  if (!confirm('Reset all products and settings to factory defaults?')) return;
  products = [...DEFAULT_PRODUCTS];
  settings = { ...DEFAULT_SETTINGS };
  localStorage.removeItem('zerenelle_products');
  localStorage.removeItem('zerenelle_settings');
  saveProducts();
  saveSettings();
  renderAdminProductList();
  showToast('Catalog restored to default settings');
}

// 12. ORDERS HUB ENGINE (LIKE FLIPKART / AMAZON SELLER PORTAL)
async function loadAdminOrders() {
  const container = document.getElementById('admin-orders-list');
  if (!container) return;

  try {
    const res = await fetch('/api/orders');
    if (res.ok) {
      const data = await res.json();
      renderAdminOrdersList(data.orders || []);
      return;
    }
  } catch (err) {}

  const localOrders = JSON.parse(localStorage.getItem('zerenelle_orders')) || [];
  renderAdminOrdersList(localOrders);
}

function renderAdminOrdersList(orders) {
  const container = document.getElementById('admin-orders-list');
  const countEl = document.getElementById('admin-orders-count');
  if (!container) return;

  if (countEl) countEl.textContent = `${orders.length} Orders`;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300">
        <span class="text-3xl">📦</span>
        <h4 class="font-bold text-stone-700 text-sm mt-2">No Orders Received Yet</h4>
        <p class="text-xs text-stone-400 mt-1">When customers place orders via the website or WhatsApp, they will appear here in real-time.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const statusColors = {
      'Received': 'bg-amber-100 text-amber-800 border-amber-300',
      'Crafting': 'bg-blue-100 text-blue-800 border-blue-300',
      'Dispatched': 'bg-purple-100 text-purple-800 border-purple-300',
      'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };
    const badgeClass = statusColors[order.status] || 'bg-stone-100 text-stone-800 border-stone-300';
    const itemsSummary = (order.items || []).map(i => `${i.title} (${i.quantity}x)`).join(', ') || 'Custom Bouquet';

    return `
      <div class="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-bold text-sm text-stone-900">${order.id}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold border ${badgeClass}">${order.status}</span>
              <span class="text-[10px] text-stone-400">${order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recent'}</span>
            </div>
            <div class="text-xs text-stone-600 mt-0.5">
              Source: <span class="font-medium text-stone-800">${order.source || 'Website'}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-rosebrand-700">${formatINR(order.total || 0)}</div>
            <div class="text-[10px] text-stone-400">${order.paymentMode || 'Prepaid UPI'}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span class="text-stone-400 block text-[10px] uppercase font-bold">Customer Details</span>
            <div class="font-bold text-stone-900">${order.customerName}</div>
            <div class="text-stone-600 font-mono text-[11px]">${order.phone || 'Phone via WhatsApp'}</div>
            <div class="text-stone-500 text-[11px] mt-0.5">${order.address ? `${order.address}, ` : ''}${order.district} ${order.pincode ? `- ${order.pincode}` : ''}</div>
            ${(order.occasion || order.deliveryDate) ? `
              <div class="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rosebrand-50 border border-rosebrand-200 text-rosebrand-900 text-[11px] font-semibold">
                <span>🎉 ${order.occasion || 'Celebration'}</span>
                ${order.deliveryDate ? `<span>• 🎯 Target: <strong>${new Date(order.deliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</strong></span>` : ''}
              </div>
            ` : ''}
          </div>
          <div>
            <span class="text-stone-400 block text-[10px] uppercase font-bold">Ordered Bouquet Items</span>
            <div class="text-stone-800 text-[11px] leading-relaxed">${itemsSummary}</div>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-stone-600 text-[11px]">Update Status:</span>
            <select onchange="updateOrderStatus('${order.id}', this.value)" class="p-1.5 rounded-lg border border-stone-300 text-xs bg-stone-50 font-medium">
              <option value="Received" ${order.status === 'Received' ? 'selected' : ''}>⏳ Received</option>
              <option value="Crafting" ${order.status === 'Crafting' ? 'selected' : ''}>✂️ Crafting Bouquet</option>
              <option value="Dispatched" ${order.status === 'Dispatched' ? 'selected' : ''}>🚚 Dispatched (Speed Post/Courier)</option>
              <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
            </select>
          </div>

          ${order.phone ? `
            <a href="https://api.whatsapp.com/send?phone=91${order.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(`Hi ${order.customerName}! 🌸 This is Zerenelle Atelier regarding your bespoke bouquet order #${order.id}.`)}" target="_blank" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <span>💬 Message Customer on WhatsApp</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

async function updateOrderStatus(orderId, newStatus) {
  try {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      showToast(`Order #${orderId} marked as ${newStatus} ✨`);
      loadAdminOrders();
    }
  } catch (err) {
    showToast('Failed to update status on server');
  }
}

// ==========================================
// 12B. ADMIN BOUQUET BAR & STEMS MANAGEMENT (OWNER FULL CONTROL)
// ==========================================

function renderAdminBuilderStemsList() {
  const container = document.getElementById('admin-builder-stems-list');
  if (!container) return;

  if (!builderStems || builderStems.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
        <p class="text-xs">No flowers found in the Bouquet Bar.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = builderStems.map(stem => {
    const isOutOfStock = stem.inStock === false;
    return `
      <div class="p-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${isOutOfStock ? 'opacity-60 bg-stone-50' : ''}">
        <div class="flex items-center gap-3.5 min-w-0">
          <div class="relative w-16 h-16 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 flex-shrink-0 group">
            <img src="${stem.image || 'assets/images/hero-bouquet.jpg'}" alt="${stem.name}" class="w-full h-full object-cover">
            <label class="absolute inset-0 bg-black/60 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer font-semibold text-center p-1">
              Change Photo
              <input type="file" accept="image/*" class="hidden" onchange="handleStemPhotoUpload('${stem.id}', this)">
            </label>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-sm text-stone-900 truncate">${stem.name}</h4>
              ${isOutOfStock ? '<span class="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">Out of stock</span>' : '<span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">In stock</span>'}
            </div>
            <p class="text-xs text-stone-500 mt-0.5">${stem.description || 'Velvet chenille sculpted bloom'}</p>
            <div class="flex items-center gap-2 mt-1.5 text-[11px] text-stone-400">
              <span>ID: <code class="font-mono text-stone-600">${stem.id}</code></span>
              <span>•</span>
              <span>Colors: ${stem.colors && stem.colors.length > 0 ? stem.colors.map(c => c.name).join(', ') : 'Default'}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2.5 flex-wrap md:flex-nowrap justify-end flex-shrink-0">
          <div class="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5">
            <span class="text-xs font-bold text-stone-600">₹</span>
            <input type="number" 
                   value="${stem.price}" 
                   onchange="updateStemPrice('${stem.id}', this.value)" 
                   class="w-16 bg-transparent text-xs font-bold font-mono text-stone-900 focus:outline-none text-right"
                   title="Edit price and press Enter">
            <span class="text-[10px] text-stone-400">/stem</span>
          </div>

          <label class="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors border border-stone-200 flex items-center gap-1">
            <span>📷 Change</span>
            <input type="file" accept="image/*" class="hidden" onchange="handleStemPhotoUpload('${stem.id}', this)">
          </label>

          <button type="button" onclick="toggleStemStock('${stem.id}')" class="px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${isOutOfStock ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200' : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'}">
            ${isOutOfStock ? 'Mark In-Stock' : 'Out-of-Stock'}
          </button>

          <button type="button" onclick="deleteBuilderStem('${stem.id}')" class="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold transition-colors border border-rose-200" title="Delete flower from customizer">
            🗑️ Delete
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderAdminWrappingStylesList() {
  const container = document.getElementById('admin-wrapping-styles-list');
  if (!container) return;

  container.innerHTML = wrappingStyles.map(wrap => {
    return `
      <div class="p-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all shadow-2xs flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-12 h-12 rounded-xl border border-stone-200 overflow-hidden flex-shrink-0" style="background-color: ${wrap.colorHex || '#F7CDD2'};">
            ${wrap.image ? `<img src="${wrap.image}" alt="${wrap.name}" class="w-full h-full object-cover opacity-80">` : ''}
          </div>
          <div class="min-w-0">
            <h4 class="font-bold text-xs text-stone-900 truncate">${wrap.name}</h4>
            <p class="text-[11px] text-stone-500 truncate">${wrap.description || 'Artisan wrap style'}</p>
          </div>
        </div>

        <div class="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 flex-shrink-0">
          <span class="text-xs font-bold text-stone-600">+₹</span>
          <input type="number" 
                 value="${wrap.price || 0}" 
                 onchange="updateWrappingPrice('${wrap.id}', this.value)" 
                 class="w-14 bg-transparent text-xs font-bold font-mono text-stone-900 focus:outline-none text-right">
        </div>
      </div>
    `;
  }).join('');
}

async function handleAddBuilderStem(e) {
  if (e && e.preventDefault) e.preventDefault();
  const nameInput = document.getElementById('admin-stem-name');
  const priceInput = document.getElementById('admin-stem-price');
  const descInput = document.getElementById('admin-stem-desc');
  const photoInput = document.getElementById('admin-stem-photo-url');
  const colorsInput = document.getElementById('admin-stem-colors');

  const name = nameInput?.value.trim();
  const price = parseInt(priceInput?.value) || 120;
  const desc = descInput?.value.trim() || 'Artisan handcrafted flower stem';
  const photo = photoInput?.value.trim() || 'assets/images/hero-bouquet.jpg';
  const colorsRaw = colorsInput?.value.trim() || 'Blush, Cream';

  if (!name) {
    showToast('Please enter flower name');
    return;
  }

  const colorList = colorsRaw.split(',').map(c => {
    const trimmed = c.trim();
    let hex = '#E58A92';
    const lower = trimmed.toLowerCase();
    if (lower.includes('blue')) hex = '#93C5FD';
    else if (lower.includes('white') || lower.includes('cream')) hex = '#F7EBDD';
    else if (lower.includes('yellow') || lower.includes('gold')) hex = '#FDE047';
    else if (lower.includes('lavender') || lower.includes('purple')) hex = '#D8B4E2';
    else if (lower.includes('peach') || lower.includes('orange')) hex = '#FDBA74';
    else if (lower.includes('red') || lower.includes('crimson')) hex = '#B22234';
    return { name: trimmed, hex };
  }).filter(c => c.name.length > 0);

  const newStem = {
    id: `stem-${Date.now()}`,
    name,
    price,
    description: desc,
    image: photo,
    colors: colorList.length > 0 ? colorList : [{ name: 'Default', hex: '#E58A92' }],
    defaultCount: 0,
    inStock: true
  };

  try {
    const res = await fetch('/api/builder-stems', {
      method: 'POST',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify(newStem)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.stem) {
        builderStems.push(data.stem);
      } else {
        builderStems.push(newStem);
      }
    } else {
      builderStems.push(newStem);
    }
  } catch (err) {
    builderStems.push(newStem);
  }

  localStorage.setItem('zerenelle_builder_stems', JSON.stringify(builderStems));
  renderAdminBuilderStemsList();
  renderBouquetBuilderUI();
  
  if (nameInput) nameInput.value = '';
  if (priceInput) priceInput.value = '';
  if (descInput) descInput.value = '';
  
  showToast(`"${name}" added to Bouquet Bar! 🌸`);
}

async function updateStemPrice(id, newPrice) {
  const p = parseInt(newPrice);
  if (isNaN(p) || p < 0) return;

  const stem = builderStems.find(s => s.id === id);
  if (!stem) return;
  stem.price = p;

  localStorage.setItem('zerenelle_builder_stems', JSON.stringify(builderStems));
  renderBouquetBuilderUI();

  try {
    await fetch(`/api/builder-stems/${id}`, {
      method: 'PUT',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify({ price: p })
    });
  } catch (err) {}

  showToast(`${stem.name} price updated to ₹${p}! 💰`);
}

async function toggleStemStock(id) {
  const stem = builderStems.find(s => s.id === id);
  if (!stem) return;
  stem.inStock = stem.inStock === false ? true : false;

  localStorage.setItem('zerenelle_builder_stems', JSON.stringify(builderStems));
  renderAdminBuilderStemsList();
  renderBouquetBuilderUI();

  try {
    await fetch(`/api/builder-stems/${id}`, {
      method: 'PUT',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify({ inStock: stem.inStock })
    });
  } catch (err) {}

  showToast(`${stem.name} is now ${stem.inStock ? 'In Stock' : 'Out of Stock'}`);
}

async function deleteBuilderStem(id) {
  const stem = builderStems.find(s => s.id === id);
  if (!stem) return;

  if (!confirm(`Are you sure you want to remove "${stem.name}" from the Bouquet Bar?`)) {
    return;
  }

  builderStems = builderStems.filter(s => s.id !== id);
  localStorage.setItem('zerenelle_builder_stems', JSON.stringify(builderStems));
  renderAdminBuilderStemsList();
  renderBouquetBuilderUI();

  try {
    await fetch(`/api/builder-stems/${id}`, {
      method: 'DELETE',
      headers: getAdminFetchHeaders()
    });
  } catch (err) {}

  showToast(`"${stem.name}" removed from Bouquet Bar`);
}

async function handleStemPhotoUpload(stemId, inputElement) {
  const file = inputElement.files[0];
  if (!file) return;

  const stem = builderStems.find(s => s.id === stemId);
  if (!stem) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'x-admin-pin': getAdminAuthPin() },
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        stem.image = data.url;
        localStorage.setItem('zerenelle_builder_stems', JSON.stringify(builderStems));
        renderAdminBuilderStemsList();
        renderBouquetBuilderUI();

        await fetch(`/api/builder-stems/${stemId}`, {
          method: 'PUT',
          headers: getAdminFetchHeaders(),
          body: JSON.stringify({ image: data.url })
        });

        showToast(`Photo updated for ${stem.name}! 📷`);
        return;
      }
    }
  } catch (err) {}

  // Fallback to FileReader
  const reader = new FileReader();
  reader.onload = async function(e) {
    stem.image = e.target.result;
    localStorage.setItem('zerenelle_builder_stems', JSON.stringify(builderStems));
    renderAdminBuilderStemsList();
    renderBouquetBuilderUI();
    showToast(`Photo updated for ${stem.name}! 📷`);
  };
  reader.readAsDataURL(file);
}

async function updateWrappingPrice(id, newPrice) {
  const p = parseInt(newPrice);
  if (isNaN(p) || p < 0) return;

  const wrap = wrappingStyles.find(w => w.id === id);
  if (!wrap) return;
  wrap.price = p;

  localStorage.setItem('zerenelle_wrapping_styles', JSON.stringify(wrappingStyles));
  renderBouquetBuilderUI();

  try {
    await fetch(`/api/wrapping-options/${id}`, {
      method: 'PUT',
      headers: getAdminFetchHeaders(),
      body: JSON.stringify({ price: p })
    });
  } catch (err) {}

  showToast(`${wrap.name} surcharge set to ₹${p}`);
}

// ==========================================
// 12C. PATRON REVIEWS & SOCIAL PROOF SYSTEM
// ==========================================
let storeReviews = [];

async function loadReviews() {
  try {
    const res = await fetch('/api/reviews');
    if (res.ok) {
      const data = await res.json();
      storeReviews = data.reviews || [];
      renderReviews();
    }
  } catch (err) {
    console.error('Failed to load store reviews', err);
  }
}

function renderReviews() {
  const container = document.getElementById('reviews-cards-container');
  if (!container) return;

  if (storeReviews.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 text-stone-400 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
        <p class="text-sm">Be the first to share your Zerenelle flower experience!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = storeReviews.map(rev => {
    const stars = '★'.repeat(rev.rating || 5) + '☆'.repeat(Math.max(0, 5 - (rev.rating || 5)));
    return `
      <div class="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EDE4DC] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-amber-500 text-sm tracking-wider font-bold">${stars}</span>
            <span class="text-[10px] px-2.5 py-1 rounded-full bg-rosebrand-100 text-rosebrand-800 font-semibold">
              ${rev.occasion || 'Artisan Gift'}
            </span>
          </div>
          <p class="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
            "${rev.comment}"
          </p>
        </div>

        <div class="pt-4 border-t border-stone-200/80 flex items-center justify-between">
          <div>
            <div class="font-bold text-stone-900 text-xs sm:text-sm">${rev.name}</div>
            <div class="text-[11px] text-stone-500">${rev.location}</div>
          </div>
          <div class="text-right">
            <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              <span>Verified Patron</span>
            </span>
            <div class="text-[10px] text-stone-400 mt-0.5">${rev.date || 'Recent'}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openWriteReviewModal() {
  const modal = document.getElementById('write-review-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeWriteReviewModal() {
  const modal = document.getElementById('write-review-modal');
  if (modal) modal.classList.add('hidden');
}

async function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('rev-user-name')?.value || '';
  const location = document.getElementById('rev-user-location')?.value || 'Kerala';
  const occasion = document.getElementById('rev-user-occasion')?.value || 'Bespoke Bouquet';
  const rating = parseInt(document.getElementById('rev-user-rating')?.value) || 5;
  const comment = document.getElementById('rev-user-comment')?.value || '';

  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location, occasion, rating, comment })
    });
    if (res.ok) {
      closeWriteReviewModal();
      showToast('🌸 Thank you for your review! It is now live on our atelier.');
      document.getElementById('rev-user-name').value = '';
      document.getElementById('rev-user-location').value = '';
      document.getElementById('rev-user-occasion').value = '';
      document.getElementById('rev-user-comment').value = '';
      await loadReviews();
    }
  } catch (err) {
    showToast('Failed to submit review. Please try again.');
  }
}

// ==========================================
// 12D. ADMIN REVIEWS MANAGEMENT (OWNER CONTROL)
// ==========================================
let adminReviews = [];

async function loadAdminReviews() {
  const container = document.getElementById('admin-reviews-list');
  if (!container) return;

  try {
    const res = await fetch('/api/reviews', {
      headers: getAdminFetchHeaders()
    });
    if (res.ok) {
      const data = await res.json();
      adminReviews = data.reviews || [];
      renderAdminReviewsList();
    }
  } catch (err) {
    console.error('Failed to load admin reviews', err);
  }
}

function renderAdminReviewsList() {
  const container = document.getElementById('admin-reviews-list');
  const countBadge = document.getElementById('admin-reviews-count-badge');
  const statBadge = document.getElementById('admin-reviews-stat-badge');
  if (!container) return;

  if (countBadge) countBadge.textContent = `${adminReviews.length}`;
  if (statBadge) statBadge.textContent = `${adminReviews.length} Reviews`;

  if (adminReviews.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-stone-400 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
        <p class="text-xs">No reviews published yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = adminReviews.map(rev => {
    const stars = '★'.repeat(rev.rating || 5);
    return `
      <div class="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm text-stone-900">${rev.name}</span>
            <span class="text-amber-500 font-bold text-xs">${stars}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium">${rev.location}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-rosebrand-50 text-rosebrand-700 font-semibold">${rev.occasion || 'Gift'}</span>
          </div>
          <p class="text-xs text-stone-600 italic">"${rev.comment}"</p>
          <div class="text-[10px] text-stone-400">${rev.date || 'Recent'}</div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <button onclick="adminDeleteReview('${rev.id}')" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

async function handleAdminAddReview(e) {
  e.preventDefault();
  const name = document.getElementById('admin-rev-name')?.value || '';
  const location = document.getElementById('admin-rev-location')?.value || 'Kerala';
  const occasion = document.getElementById('admin-rev-occasion')?.value || 'Bespoke Gift';
  const rating = parseInt(document.getElementById('admin-rev-rating')?.value) || 5;
  const date = document.getElementById('admin-rev-date')?.value || new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  const comment = document.getElementById('admin-rev-comment')?.value || '';

  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminFetchHeaders()
      },
      body: JSON.stringify({ name, location, occasion, rating, date, comment })
    });
    if (res.ok) {
      showToast('⭐ New review published to storefront!');
      document.getElementById('admin-rev-name').value = '';
      document.getElementById('admin-rev-location').value = '';
      document.getElementById('admin-rev-occasion').value = '';
      document.getElementById('admin-rev-comment').value = '';
      await loadAdminReviews();
    }
  } catch (err) {
    showToast('Failed to add review');
  }
}

async function adminDeleteReview(id) {
  if (!confirm('Are you sure you want to remove this review from the storefront?')) return;
  try {
    const res = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      headers: getAdminFetchHeaders()
    });
    if (res.ok) {
      showToast('Review removed');
      await loadAdminReviews();
    }
  } catch (err) {
    showToast('Failed to delete review');
  }
}

// Admin Tab Switcher Logic
function switchAdminTab(tabName) {
  const tabs = ['products', 'orders', 'settings', 'builder-stems', 'reviews'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const panel = document.getElementById(`tab-panel-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.classList.add('bg-rosebrand-700', 'text-white', 'shadow-xs');
        btn.classList.remove('bg-stone-100', 'text-stone-700');
      } else {
        btn.classList.remove('bg-rosebrand-700', 'text-white', 'shadow-xs');
        btn.classList.add('bg-stone-100', 'text-stone-700');
      }
    }
    if (panel) {
      if (t === tabName) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });

  if (tabName === 'orders') {
    loadAdminOrders();
  } else if (tabName === 'builder-stems') {
    renderAdminBuilderStemsList();
    renderAdminWrappingStylesList();
  } else if (tabName === 'reviews') {
    loadAdminReviews();
  }
}

// Mobile Navigation Toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const hIcon = document.getElementById('hamburger-icon');
  const cIcon = document.getElementById('close-menu-icon');
  if (!menu) return;
  const isHidden = menu.classList.contains('hidden');
  menu.classList.toggle('hidden', !isHidden);
  if (hIcon) hIcon.classList.toggle('hidden', isHidden);
  if (cIcon) cIcon.classList.toggle('hidden', !isHidden);
}

// 13. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  loadServerData();
  applySiteSettings();
  renderCatalog('all');
  renderBouquetBuilderUI();
  renderFlowerMeanings();
  loadReviews();
  updateCartUI();

  // Category filter tabs
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab-btn').forEach(b => {
        b.classList.remove('bg-rosebrand-700', 'text-white');
        b.classList.add('bg-stone-100', 'text-stone-700');
      });
      btn.classList.add('bg-rosebrand-700', 'text-white');
      btn.classList.remove('bg-stone-100', 'text-stone-700');
      state.activeFilter = btn.dataset.category;
      renderCatalog(state.activeFilter);
    });
  });

  // Builder Input Listeners
  const recipientInput = document.getElementById('builder-recipient');
  const cardNoteInput = document.getElementById('builder-card-note');
  
  if (recipientInput) {
    recipientInput.addEventListener('input', (e) => {
      state.customBouquet.recipientName = e.target.value;
      renderBouquetVisualCanvas();
    });
  }

  if (cardNoteInput) {
    cardNoteInput.addEventListener('input', (e) => {
      state.customBouquet.cardNote = e.target.value;
      renderBouquetVisualCanvas();
    });
  }

  // Stealth Owner Shortcut: Press Ctrl + Shift + A to open private admin portal
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      window.location.href = 'admin.html';
    }
  });
});

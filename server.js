const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Defense Layer 1: Hide Server Engine & Apply OWASP Hardened HTTP Headers
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Content Security Policy permitting local assets, Tailwind CDN, and web fonts
  res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'self'; object-src 'none';");
  next();
});

// Security Defense Layer 2: Sensitive File Shielding & Anti-Path Traversal (Blocks Information Disclosure)
app.use((req, res, next) => {
  const p = req.path.toLowerCase();
  if (
    p.startsWith('/data') ||
    p.includes('database.json') ||
    p.startsWith('/.git') ||
    p.endsWith('.json') ||
    p === '/server.js' ||
    p === '/package.json' ||
    p === '/package-lock.json' ||
    p.endsWith('.md') ||
    p.startsWith('/.')
  ) {
    return res.status(403).json({ error: 'Access Denied: Protected atelier asset.' });
  }
  next();
});

// Security Defense Layer 3: Global Rate Limiting & DoS Defense (Max 120 req/min per IP)
const ipRateLimits = new Map();
const orderRateLimits = new Map();
const reviewRateLimits = new Map();
const failedPinAttempts = new Map();

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || '127.0.0.1';
}

app.use((req, res, next) => {
  const ip = getClientIP(req);
  const now = Date.now();
  let record = ipRateLimits.get(ip);
  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + 60 * 1000 };
    ipRateLimits.set(ip, record);
  } else {
    record.count++;
    if (record.count > 120) {
      return res.status(429).json({ error: 'Too Many Requests: Network rate limit exceeded. Please wait a minute.' });
    }
  }
  next();
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'database.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Serve static frontend and uploads
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Hardened Multer for Real Image Uploads (Security Restraints: Images Only, 10MB Max)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = 'bouquet-' + Date.now() + '-' + Math.round(Math.random() * 1e5) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
  fileFilter: function (req, file, cb) {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Security Error: Only image files (JPG, PNG, WebP) are allowed.'));
  }
});

// Database Initialization (Seed data if empty)
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
    description: 'Translucent blush matte Korean wrap',
    price: 0,
    image: 'assets/images/hero-bouquet.jpg',
    colorHex: '#F7CDD2',
    inStock: true
  },
  {
    id: 'kraft-lace',
    name: 'Parisian Kraft & Lace',
    description: 'Rustic vintage brown with white lace trim',
    price: 0,
    image: 'assets/images/sunshine-bloom.jpg',
    colorHex: '#D4A373',
    inStock: true
  },
  {
    id: 'midnight-noir',
    name: 'Midnight Charcoal',
    description: 'Deep black with luxury gold foil edge',
    price: 60,
    image: 'assets/images/rose-romance.jpg',
    colorHex: '#2A2A2A',
    inStock: true
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Shimmer',
    description: 'Luxury metallic champagne shimmer wrap',
    price: 80,
    image: 'assets/images/hero-bouquet.jpg',
    colorHex: '#E6D5B8',
    inStock: true
  }
];

const DEFAULT_SETTINGS = {
  adminPin: '1234',
  whatsappNumber: '919876543210',
  upiId: 'zerenelle@okhdfcbank',
  bannerOffer: '✨ Everlasting Handcrafted Chenille Bouquets • All Kerala Delivery Only (Prepaid / No COD) • Code: WELCOME10 for 10% Off ✨',
  coupons: {
    'WELCOME10': 0.10,
    'KERALA10': 0.10,
    'ZERENELLE': 0.15
  }
};

function readDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialDb = {
        products: DEFAULT_PRODUCTS,
        settings: DEFAULT_SETTINGS,
        builderStems: DEFAULT_BUILDER_STEMS,
        wrappingStyles: DEFAULT_WRAPPING_STYLES,
        orders: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const db = JSON.parse(data);
    let updated = false;

    if (!db.builderStems || db.builderStems.length === 0) {
      db.builderStems = DEFAULT_BUILDER_STEMS;
      updated = true;
    }
    if (!db.wrappingStyles || db.wrappingStyles.length === 0) {
      db.wrappingStyles = DEFAULT_WRAPPING_STYLES;
      updated = true;
    }

    if (updated) {
      writeDatabase(db);
    }
    return db;
  } catch (err) {
    console.error('Database read error:', err);
    return {
      products: DEFAULT_PRODUCTS,
      settings: DEFAULT_SETTINGS,
      builderStems: DEFAULT_BUILDER_STEMS,
      wrappingStyles: DEFAULT_WRAPPING_STYLES,
      orders: []
    };
  }
}

function writeDatabase(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Database write error:', err);
    return false;
  }
}

// Ensure database file exists on startup
readDatabase();

// Helper for constant-time comparison to defeat timing attacks on secret PINs
function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Input sanitizer helper to prevent Stored XSS & script injection
function sanitizeString(str, maxLen = 255) {
  if (!str || typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '').slice(0, maxLen);
}

// IP-based endpoint rate limit check
function checkRateLimit(map, ip, maxRequests, windowMs) {
  const now = Date.now();
  let record = map.get(ip);
  if (!record || now > record.resetTime) {
    map.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) {
    return false;
  }
  record.count++;
  return true;
}

// ==========================================
// SECURITY AUTHORIZATION MIDDLEWARE
// Defeats brute-force attacks with IP lockout (5 fails = 15m lockout) & timing attacks
// ==========================================
function requireAdminAuth(req, res, next) {
  const ip = getClientIP(req);
  const now = Date.now();
  const attempt = failedPinAttempts.get(ip);
  if (attempt && attempt.lockedUntil > now) {
    const waitMin = Math.ceil((attempt.lockedUntil - now) / 60000);
    return res.status(429).json({
      success: false,
      error: `Security Lockout: Too many failed PIN attempts. Admin access locked for ${waitMin} minute(s).`
    });
  }

  const pinHeader = req.headers['x-admin-pin'] || req.query.admin_pin;
  const db = readDatabase();
  const currentPin = (db.settings && db.settings.adminPin) ? String(db.settings.adminPin).trim() : '1234';
  const candidatePin = pinHeader ? String(pinHeader).trim() : '';

  if (candidatePin && safeCompare(candidatePin, currentPin)) {
    failedPinAttempts.delete(ip); // reset upon successful authentication
    return next();
  }

  // Failed PIN attempt tracking
  const count = (attempt ? attempt.count : 0) + 1;
  let lockedUntil = 0;
  if (count >= 5) {
    lockedUntil = now + 15 * 60 * 1000; // 15-minute lockout after 5 consecutive failures
  }
  failedPinAttempts.set(ip, { count, lockedUntil });

  return res.status(401).json({
    success: false,
    error: count >= 5
      ? 'Security Alert: Maximum attempts exceeded. Admin access locked for 15 minutes.'
      : `Unauthorized: Invalid Atelier Admin PIN. (${5 - count} attempt(s) remaining)`
  });
}

// ========================
// API ROUTES
// ========================

// 1. PRODUCTS API
app.get('/api/products', (req, res) => {
  const db = readDatabase();
  res.json({ success: true, products: db.products || [] });
});

app.post('/api/products', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  const newProduct = {
    id: `zr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: req.body.title || 'Custom Atelier Bouquet',
    subtitle: req.body.subtitle || '100% Handcrafted Chenille Bouquet',
    category: req.body.category || 'romance',
    price: parseInt(req.body.price) || 1499,
    originalPrice: req.body.originalPrice ? parseInt(req.body.originalPrice) : null,
    badge: req.body.badge || '',
    image: req.body.image || 'assets/images/hero-bouquet.jpg',
    description: req.body.description || 'Handcrafted velvet chenille arrangement.',
    stems: req.body.stems || 'Sculpted plush chenille stems',
    dimensions: req.body.dimensions || '38 cm H × 30 cm W',
    fragrance: req.body.fragrance || 'French Lavender',
    rating: 5.0,
    reviewsCount: 1,
    inStock: true,
    createdAt: new Date().toISOString()
  };

  db.products.unshift(newProduct);
  writeDatabase(db);
  res.json({ success: true, product: newProduct });
});

app.put('/api/products/:id', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  db.products[index] = {
    ...db.products[index],
    ...req.body,
    price: req.body.price !== undefined ? parseInt(req.body.price) : db.products[index].price,
    originalPrice: req.body.originalPrice !== undefined ? (req.body.originalPrice ? parseInt(req.body.originalPrice) : null) : db.products[index].originalPrice
  };

  writeDatabase(db);
  res.json({ success: true, product: db.products[index] });
});

app.delete('/api/products/:id', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  const beforeCount = db.products.length;
  db.products = db.products.filter(p => p.id !== req.params.id);
  
  if (db.products.length === beforeCount) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  writeDatabase(db);
  res.json({ success: true, message: 'Product deleted' });
});

// 2. IMAGE UPLOAD API (Protected)
app.post('/api/upload', requireAdminAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No image file provided' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl, filename: req.file.filename });
});

// 3. SETTINGS API
app.get('/api/settings', (req, res) => {
  const db = readDatabase();
  res.json({ success: true, settings: db.settings || DEFAULT_SETTINGS });
});

app.put('/api/settings', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  if (!db.settings) db.settings = { ...DEFAULT_SETTINGS };
  const update = req.body || {};

  // Protect Admin PIN: only update if a non-empty string is explicitly submitted; NEVER reset or overwrite with blank
  if (update.adminPin !== undefined) {
    const cleanPin = String(update.adminPin).trim();
    if (cleanPin.length > 0) {
      db.settings.adminPin = cleanPin;
    }
  }

  // Update only provided fields, preserving all other existing settings
  if (update.whatsappNumber !== undefined && String(update.whatsappNumber).trim() !== '') {
    db.settings.whatsappNumber = String(update.whatsappNumber).trim();
  }
  if (update.bannerOffer !== undefined) {
    db.settings.bannerOffer = String(update.bannerOffer).trim();
  }
  if (update.upiId !== undefined && String(update.upiId).trim() !== '') {
    db.settings.upiId = String(update.upiId).trim();
  }
  if (update.instagramHandle !== undefined) {
    db.settings.instagramHandle = String(update.instagramHandle).trim().replace(/^@/, '');
  }
  if (update.coupons !== undefined && typeof update.coupons === 'object') {
    db.settings.coupons = update.coupons;
  }

  writeDatabase(db);
  res.json({ success: true, settings: db.settings });
});

// 3.5 BOUQUET BAR STEMS & WRAPPING API (OWNER FULL CONTROL)
app.get('/api/builder-stems', (req, res) => {
  const db = readDatabase();
  res.json({ success: true, stems: db.builderStems || DEFAULT_BUILDER_STEMS });
});

app.post('/api/builder-stems', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  if (!db.builderStems) db.builderStems = [...DEFAULT_BUILDER_STEMS];

  const newStem = {
    id: req.body.id || `stem-${Date.now()}`,
    name: req.body.name || 'Custom Handcrafted Bloom',
    price: parseInt(req.body.price) || 110,
    description: req.body.description || 'Velvet chenille sculpted floral stem',
    image: req.body.image || 'assets/images/hero-bouquet.jpg',
    colors: req.body.colors || [{ name: 'Blush', hex: '#E58A92' }],
    defaultCount: 0,
    inStock: req.body.inStock !== undefined ? req.body.inStock : true,
    isCustomizable: req.body.isCustomizable || false
  };

  db.builderStems.push(newStem);
  writeDatabase(db);
  res.json({ success: true, stem: newStem });
});

app.put('/api/builder-stems/:id', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  if (!db.builderStems) db.builderStems = [...DEFAULT_BUILDER_STEMS];
  const idx = db.builderStems.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Flower stem not found' });
  }

  db.builderStems[idx] = {
    ...db.builderStems[idx],
    ...req.body,
    price: req.body.price !== undefined ? parseInt(req.body.price) : db.builderStems[idx].price
  };
  writeDatabase(db);
  res.json({ success: true, stem: db.builderStems[idx] });
});

app.delete('/api/builder-stems/:id', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  if (!db.builderStems) db.builderStems = [...DEFAULT_BUILDER_STEMS];
  const beforeCount = db.builderStems.length;
  db.builderStems = db.builderStems.filter(s => s.id !== req.params.id);

  if (db.builderStems.length === beforeCount) {
    return res.status(404).json({ success: false, error: 'Flower stem not found' });
  }
  writeDatabase(db);
  res.json({ success: true, message: 'Stem removed from Bouquet Bar' });
});

app.get('/api/wrapping-options', (req, res) => {
  const db = readDatabase();
  res.json({ success: true, styles: db.wrappingStyles || DEFAULT_WRAPPING_STYLES });
});

app.put('/api/wrapping-options/:id', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  if (!db.wrappingStyles) db.wrappingStyles = [...DEFAULT_WRAPPING_STYLES];
  const idx = db.wrappingStyles.findIndex(w => w.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Wrapping option not found' });
  }

  db.wrappingStyles[idx] = {
    ...db.wrappingStyles[idx],
    ...req.body,
    price: req.body.price !== undefined ? parseInt(req.body.price) : db.wrappingStyles[idx].price
  };
  writeDatabase(db);
  res.json({ success: true, style: db.wrappingStyles[idx] });
});

// 4. ORDERS API (Like Flipkart / Amazon Order Hub)
app.get('/api/orders', (req, res) => {
  const db = readDatabase();
  res.json({ success: true, orders: db.orders || [] });
});

app.post('/api/orders', (req, res) => {
  const ip = getClientIP(req);
  if (!checkRateLimit(orderRateLimits, ip, 10, 15 * 60 * 1000)) {
    return res.status(429).json({
      success: false,
      error: 'Security Rate Limit: Maximum 10 orders per 15 minutes per IP. Please contact atelier WhatsApp for large or urgent orders.'
    });
  }

  const db = readDatabase();
  const raw = req.body || {};

  const customerName = sanitizeString(raw.customerName, 80) || 'Valued Patron';
  const phone = sanitizeString(raw.phone, 25).replace(/[^0-9+\s-]/g, '');
  const district = sanitizeString(raw.district, 60) || 'Kerala';
  const pincode = sanitizeString(raw.pincode, 10).replace(/[^0-9]/g, '');
  const address = sanitizeString(raw.address, 250);
  const occasion = sanitizeString(raw.occasion, 80) || 'Special Celebration';
  const deliveryDate = sanitizeString(raw.deliveryDate, 30);
  const source = sanitizeString(raw.source, 50) || 'Website / WhatsApp';

  // Sanitize and constrain order items
  const sanitizedItems = Array.isArray(raw.items)
    ? raw.items.slice(0, 30).map(item => ({
        id: sanitizeString(item.id, 50),
        title: sanitizeString(item.title, 120),
        price: Math.max(0, parseInt(item.price) || 0),
        quantity: Math.max(1, Math.min(99, parseInt(item.quantity) || 1)),
        image: sanitizeString(item.image, 250)
      }))
    : [];

  const subtotal = Math.max(0, parseInt(raw.subtotal) || 0);
  const deliveryCharge = Math.max(0, parseInt(raw.deliveryCharge) || 0);
  const total = Math.max(0, parseInt(raw.total) || (subtotal + deliveryCharge));

  const newOrder = {
    id: `ZR-KL-${Math.floor(100000 + Math.random() * 900000)}`,
    customerName,
    phone,
    district,
    pincode,
    address,
    occasion,
    deliveryDate,
    items: sanitizedItems,
    subtotal,
    deliveryCharge,
    total,
    paymentMode: 'Prepaid UPI (No COD)',
    status: 'Received', // 'Received' -> 'Crafting' -> 'Dispatched' -> 'Delivered'
    source,
    createdAt: new Date().toISOString()
  };

  if (!db.orders) db.orders = [];
  db.orders.unshift(newOrder);
  writeDatabase(db);
  res.json({ success: true, order: newOrder });
});

app.put('/api/orders/:id/status', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  if (!db.orders) db.orders = [];
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  order.status = req.body.status || order.status;
  writeDatabase(db);
  res.json({ success: true, order });
});

// 4B. REVIEWS API (PATRON TESTIMONIALS & RATINGS)
app.get('/api/reviews', (req, res) => {
  const db = readDatabase();
  const reviews = db.reviews || [];
  const pinHeader = req.headers['x-admin-pin'] || req.query.admin_pin;
  const currentPin = (db.settings && db.settings.adminPin) ? String(db.settings.adminPin).trim() : '1234';
  const isAdmin = pinHeader && safeCompare(String(pinHeader).trim(), currentPin);

  if (isAdmin) {
    res.json({ reviews });
  } else {
    res.json({ reviews: reviews.filter(r => r.approved !== false) });
  }
});

app.post('/api/reviews', (req, res) => {
  const ip = getClientIP(req);
  if (!checkRateLimit(reviewRateLimits, ip, 5, 15 * 60 * 1000)) {
    return res.status(429).json({
      success: false,
      error: 'Security Rate Limit: Maximum 5 reviews per 15 minutes per IP.'
    });
  }

  const raw = req.body || {};
  const name = sanitizeString(raw.name, 80) || 'Valued Patron';
  const location = sanitizeString(raw.location, 60) || 'Kerala';
  const occasion = sanitizeString(raw.occasion, 80) || 'Bespoke Floral Gift';
  const rawRating = parseInt(raw.rating) || 5;
  const rating = Math.max(1, Math.min(5, rawRating));
  const comment = sanitizeString(raw.comment, 500);

  if (!comment) {
    return res.status(400).json({ success: false, error: 'Review text cannot be empty.' });
  }

  const db = readDatabase();
  if (!db.reviews) db.reviews = [];
  const newReview = {
    id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name,
    location,
    rating,
    occasion,
    comment,
    verified: true,
    date: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    approved: true
  };
  db.reviews.unshift(newReview);
  writeDatabase(db);
  res.json({ success: true, review: newReview });
});

app.put('/api/reviews/:id', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  if (!db.reviews) db.reviews = [];
  const idx = db.reviews.findIndex(r => r.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Review not found' });
  }
  db.reviews[idx] = { ...db.reviews[idx], ...req.body };
  writeDatabase(db);
  res.json({ success: true, review: db.reviews[idx] });
});

app.delete('/api/reviews/:id', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  if (!db.reviews) db.reviews = [];
  const initialLength = db.reviews.length;
  db.reviews = db.reviews.filter(r => r.id !== req.params.id);
  if (db.reviews.length === initialLength) {
    return res.status(404).json({ success: false, error: 'Review not found' });
  }
  writeDatabase(db);
  res.json({ success: true, message: 'Review deleted successfully' });
});

// 5. BACKUP & RESTORE API
app.get('/api/backup', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  res.setHeader('Content-disposition', 'attachment; filename=zerenelle_database_backup.json');
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify(db, null, 2));
});

app.post('/api/restore', requireAdminAuth, (req, res) => {
  if (req.body && req.body.products) {
    writeDatabase(req.body);
    res.json({ success: true, message: 'Database restored successfully' });
  } else {
    res.status(400).json({ success: false, error: 'Invalid database payload' });
  }
});

// Clean URL routing for Admin & Storefront
app.get('/admin', (req, res) => {
  res.sendFile('admin.html', { root: __dirname });
});
app.get('/owner', (req, res) => {
  res.sendFile('admin.html', { root: __dirname });
});
app.get('/seller', (req, res) => {
  res.sendFile('admin.html', { root: __dirname });
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Security Defense Layer 4: Centralized Error Handler (Suppresses Stack Traces & Debug Leaks)
app.use((err, req, res, next) => {
  console.error('[Atelier Security Guard] Unhandled Server Exception:', err.message);
  if (res.headersSent) return next(err);
  res.status(500).json({ success: false, error: 'An unexpected atelier server error occurred. Please try again later.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🌸 ZERENELLE ATELIER E-COMMERCE SERVER RUNNING`);
  console.log(`======================================================`);
  console.log(`🛍️ Customer Storefront: http://localhost:${PORT}`);
  console.log(`🔐 Owner Admin Portal:   http://localhost:${PORT}/admin.html (or /admin)`);
  console.log(`📁 Database Location:    ${DB_FILE}`);
  console.log(`📷 Uploads Directory:   ${UPLOADS_DIR}`);
  console.log(`======================================================\n`);
});

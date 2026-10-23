# Zerenelle | Artisan Floral Atelier 🌸
> **Everlasting Handcrafted Chenille Flower Bouquets — Fullstack E-Commerce & Interactive 3D Bouquet Customizer**

![Zerenelle Atelier](assets/images/hero-bouquet.jpg)

## 🌿 Overview
**Zerenelle** is a bespoke floral atelier based in **Kerala, India**, crafting heirloom bouquets using ultra-plush velvet chenille pipe-cleaner wire. Unlike fresh flowers that wilt within days, Zerenelle bouquets are 100% everlasting, hypoallergenic, hand-scented with botanical essential oil mists, and packaged in rigid cylinder presentation boxes.

---

## ✨ Key Features

### 🌸 1. Interactive 3D Bouquet Bar (Customizer)
- **Real-Time 3D Parallax Canvas**: Dynamic botanical illustration rendering with realistic wrapping paper architecture (Korean/Parisian flared layers, gold seals, cascading satin ribbons).
- **Dual Perspective**: Toggle instantly between `[✨ 3D Composer]` and `[📷 Real Atelier Photo]`.
- **Custom Stem Selection**: Choose from velvet roses, pastel tulips, sunflowers, French lavender, daisies, and baby's breath accents — or request custom sculpted flowers.
- **Botanical Scent Infusion**: French Lavender, Wild English Rose, or Madagascar Vanilla mists with visual scent aura particles.
- **Wax-Sealed Calligraphy Note**: Real-time cursive calligraphy gift card preview.

### 🛍️ 2. High-Converting D2C Storefront
- **Curated Catalog**: Filter by Romance & Roses, Pastel Meadow, Sunflowers & Cheer, or Mini Desk Pots.
- **Floriography Guide**: Meaning & symbolism of flowers in victorian floriography.
- **Frictionless Guest Checkout**: No forced password/signup barriers.
- **Occasion & Delivery Target Date**: Allows buyers to select celebration types (Birthdays, Anniversaries, Graduations) with automatic 2–4 day crafting buffers.
- **Kerala Localization**: All 14 Kerala districts supported with rigid cylinder delivery guarantee.
- **100% Prepaid UPI Protocol**: Integrated GPay, PhonePe, Paytm, and BHIM payment flow (Strictly No COD for bespoke goods).
- **1-Click WhatsApp Order Generation**: Generates pre-formatted WhatsApp order messages with full order details, addresses, and reference codes.

### ⭐ 3. "Loved Across Kerala" Patron Reviews
- Dynamic verified patron review cards with 5-star ratings and Kerala town tags.
- Interactive modal for customers to submit genuine reviews and feedback.

### 🔐 4. Private Owner Management Portal (`/admin`)
- Protected by Master PIN security (`x-admin-pin` authentication middleware).
- Full live control over bouquet catalog, pricing, banner announcements, UPI ID, and WhatsApp numbers.
- Live Bouquet Bar stem prices and wrapping styles management.
- Real-time customer orders fulfillment status (`Received` ➔ `Crafting` ➔ `Dispatched` ➔ `Delivered`).
- One-click backup and database restore.

---

## 🛠️ Tech Stack & Architecture
- **Backend**: Node.js & Express 4
- **Database**: Centralized JSON Datastore (`data/database.json`) with atomic persistence
- **File Uploads**: Multer with strict image MIME validation (`jpeg|jpg|png|webp|gif`) and 10MB limits
- **Frontend**: Vanilla ES6+ JavaScript, HTML5, Tailwind CSS
- **Security**: Express security defense headers (`nosniff`, `SAMEORIGIN`, `x-xss-protection`, disabled `x-powered-by`), PIN-authenticated mutation endpoints

---

## 🚀 Getting Started Locally

```bash
# 1. Clone repository
git clone https://github.com/mhdzulal007/zerenelle.git
cd zerenelle

# 2. Install dependencies
npm install

# 3. Start local development server
npm start
```
Open **`http://localhost:3000`** in your browser.
To access the private owner portal, visit **`http://localhost:3000/admin`** (Default Master PIN: `1234`).

---

## ☁️ Deployment
Ready to deploy on **Render**, **Railway**, or **Vercel**:
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Port**: Automatic via `process.env.PORT`

---

© 2026 Zerenelle Artisan Floral Atelier. All rights reserved. Handcrafted with love in Kerala.

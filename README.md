# ☕ Naidu Café — Full Stack Website

A premium, cinematic, fully animated café website built with Next.js, MongoDB, GSAP, and Framer Motion.

## 🚀 Features

- **Cinematic Hero** — Morphing letter reveal animation with floating fruits & particles
- **3D Drink Showcase** — Scroll-triggered rotating drink display with liquid effects
- **Today's Specials** — Dynamic cards fetched from MongoDB with hover animations
- **Interactive Menu** — Hover-preview menu system with cursor effects
- **Combo Offers** — Animated deal cards with discount badges
- **Instagram Gallery** — Masonry grid with lightbox slider
- **AI Mood Recommender** — Select your mood, get drink suggestions
- **Floating Order Button** — Quick-order popup with popular drinks
- **Contact Form** — Stored in MongoDB with success feedback
- **Admin Dashboard** — JWT-protected panel at `/admin`
- **Custom Cursor** — Glowing cursor with liquid ripple on drink hover
- **Wave Dividers** — Liquid transitions between sections

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18 |
| Styling | Tailwind CSS |
| Animation | Framer Motion, GSAP |
| 3D | Three.js |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT (jsonwebtoken) |
| Deploy | Vercel |

## 🛠️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` with your MongoDB Atlas URI and JWT secret.

### 3. Run development server
```bash
npm run dev
```
Visit `http://localhost:3000`

### 4. Admin Panel
Visit `http://localhost:3000/admin`
- Username: `admin`
- Password: `naidu123`

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# MONGODB_URI = your Atlas connection string
# JWT_SECRET = your secret key
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Fetch all menu items |
| POST | `/api/menu` | Add new menu item |
| GET | `/api/specials` | Get today's specials |
| POST | `/api/specials` | Add new special |
| GET | `/api/offers` | Get combo offers |
| GET | `/api/popular` | Get popular items |
| POST | `/api/recommend` | AI mood recommendation |
| POST | `/api/contact` | Submit contact message |
| POST | `/api/admin/login` | Admin JWT login |

## 🗄️ MongoDB Collections

### Menu
```json
{ "name": "Chocolate Overload", "category": "Milkshakes", "price": 149, "description": "...", "emoji": "🍫", "popular": true }
```

### Specials
```json
{ "name": "Strawberry Cream", "description": "...", "price": 149, "badge": "Chef's Pick", "emoji": "🍓" }
```

### Offers
```json
{ "name": "Couple Combo", "drinks": ["2 Milkshakes", "1 Mocktail"], "discount": 20, "originalPrice": 349, "offerPrice": 279, "badge": "20% OFF", "emoji": "💑" }
```

### Messages
```json
{ "name": "John", "email": "john@example.com", "message": "...", "timestamp": "2024-01-01T00:00:00Z" }
```

## 📱 Mobile Responsive
All sections are fully responsive. Custom cursor is disabled on touch devices.

## 🎨 Design System
- **Font Display**: Cormorant Garamond (elegant serif)
- **Font Body**: DM Sans (clean readable)
- **Font Mono**: Fira Code (technical elements)
- **Primary Color**: Caramel `#c8732a`
- **Background**: Deep coffee black `#0a0705`
- **Accent**: Golden `#f59e0b`

## 📞 Contact
- Phone: 9949592477
- Email: naidu@gmail.com

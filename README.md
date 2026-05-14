# 🏍️ Vrooom — Bike Rental App

A full-stack bike rental platform built with **React 19**, **TypeScript**, and **Tailwind CSS 4**. Users can explore, filter, and view bikes while hosts manage their fleet from a dedicated protected dashboard. Ships as a fully installable **PWA** with offline support.

> **Live App:** `https://bike-rental-app-nine.vercel.app`  
> **Live Backend API:** `https://bike-rental-server-srsy.onrender.com`

---

## 📑 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [PWA & Offline Support](#-pwa--offline-support)
- [Performance Optimisations](#-performance-optimisations)
- [Architecture Patterns](#-architecture-patterns)
- [Routing Architecture](#-routing-architecture)
- [Reusable UI Components](#-reusable-ui-components)
- [Shimmer / Loading Skeletons](#-shimmer--loading-skeletons)
- [API Layer](#-api-layer)
- [Authentication System](#-authentication-system)
- [Error Handling](#-error-handling)
- [Design System](#-design-system)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)

---

## 🛠 Tech Stack

| Layer              | Technology                          |
| ------------------ | ----------------------------------- |
| Framework          | React 19.2                          |
| Language           | TypeScript 6.0                      |
| Build Tool         | Vite 8                              |
| Styling            | Tailwind CSS 4.2                    |
| Routing            | React Router 7.14                   |
| Icons              | Lucide React                        |
| Charts             | Recharts 3                          |
| Utilities          | clsx + tailwind-merge (`cn`)        |
| Linting            | ESLint + eslint-plugin-react-hooks  |
| Authentication     | Firebase Auth 12                    |
| PWA                | vite-plugin-pwa (Workbox)           |
| Deployment         | Vercel                              |

---

## 📁 Project Structure

```
src/
├── App.tsx                          # Root component — route definitions (all lazy)
├── main.tsx                         # Entry: ErrorBoundary → AuthProvider → App
├── index.css                        # Global styles
│
├── api/                             # Centralised API layer
│   ├── client.ts                    # Generic typed fetch client (auth-aware)
│   ├── bikes.ts                     # Bike-specific API functions
│   └── type.ts                      # Shared TypeScript types (Bike, etc.)
│
├── components/                      # Shared layout & utility components
│   ├── Header.tsx                   # Responsive nav with auth-aware Login/Logout
│   ├── Footer.tsx                   # Site-wide footer
│   ├── Layout.tsx                   # Persistent layout (Header + Outlet + Footer)
│   ├── ProtectedRoute.tsx           # Auth guard for /host tree
│   └── ErrorBoundary.tsx            # React class-based error boundary
│
├── config/
│   └── firebase.ts                  # Firebase app + auth initialisation
│
├── context/
│   └── AuthContext.tsx              # Global auth state (user, loading, error, methods)
│
├── service/
│   └── auth.service.ts              # Firebase auth wrappers (login/signup/logout)
│
├── pages/                           # Route-level page components
│   ├── Home.tsx                     # Rich landing page with scroll animations
│   ├── About.tsx                    # About page with mission & team sections
│   ├── Bikes.tsx                    # Bike catalogue with type / price filtering
│   ├── BikeDetail.tsx               # Individual bike detail page
│   ├── Login.tsx                    # Login page (redirect-aware)
│   ├── SignUp.tsx                   # Multi-step registration (role-based)
│   ├── NotFound.tsx                 # 404 catch-all page
│   ├── Host.tsx                     # Host shell with nested nav
│   └── host/
│       ├── Dashboard.tsx            # Income summary, reviews, bike list
│       ├── HostBikes.tsx            # Full list of host's bikes
│       ├── HostDetailBikes.tsx      # Bike detail shell (Outlet + context)
│       ├── HostBikeDetail.tsx       # Description tab
│       ├── HostBikePricing.tsx      # Pricing tab
│       ├── HostBikePhotos.tsx       # Photos tab
│       ├── Income.tsx               # Host income with Recharts charts
│       └── Reviews.tsx              # Host reviews page
│
├── ui/                              # Design system primitives
│   ├── sharedUiComponents/
│   │   ├── Button.tsx               # Configurable button component
│   │   └── Chip.tsx                 # Type-badge chip (simple / luxury / rugged)
│   ├── typography/
│   │   ├── H2.tsx                   # Reusable heading
│   │   └── PTag.tsx                 # Reusable paragraph
│   └── ShimmerUI/
│       ├── ShimBikesListing.tsx     # Skeleton for bike catalogue grid
│       ├── ShimBikeDetail.tsx       # Skeleton for bike detail
│       ├── ShimHostBikesUI.tsx      # Skeleton for host bike list
│       └── ShimHostBikeDetailUI.tsx # Skeleton for host bike detail
│
└── utility/
    ├── cn.tsx                       # twMerge + clsx utility
    └── errorHandlers.ts             # Firebase error code → human message parser
```

---

## ✨ Features

### User-Facing
- **Full-Screen Hero** — Cinematic landing page with a real background photo, animated floating orbs, gradient overlay, and trust-bar indicators (insured, 60-sec booking, 4.9★ rating)
- **Stats Bar** — Animated counter strip: 5,000+ riders, 120+ bikes, 50+ cities, 4.9★ rating
- **Feature Cards** — Scroll-triggered fade-in cards for Insured / Instant Booking / Drop-off / Serviced Daily
- **How It Works** — 3-step process section on a dark gradient background with decorative blur blobs
- **Bike Category Cards** — Clickable gradient cards (Simple / Luxury / Rugged) that deep-link to `/bikes?type=<type>`
- **Testimonials** — User review cards with star ratings and avatar initials, scroll-triggered
- **Host CTA Section** — "Turn your bike into income" promotional panel
- **Bike Catalogue** — Responsive 1–4 column grid with all available bikes
- **Type Filtering** — URL-driven filter buttons (`?type=simple|luxury|rugged`) with active state and clear-filter option
- **Price Filtering** — Filter bikes by maximum price (API-powered)
- **Bike Detail** — Individual page with image, type chip, price, description, and booking CTA
- **About Page** — Mission, team, and brand story sections

### Authentication & Accounts
- **Sign Up** — Multi-field registration form with role selection (Renter / Host), inline validation, show/hide password toggle, and conditional city field for hosts
- **Role-Based Redirect** — After sign-up: hosts → `/host`, renters → `/bikes`
- **Login** — Email/password login with Firebase, redirect-aware (returns to attempted page post-login)
- **Logout** — One-click logout from the header with auth state sync
- **Protected Routes** — `/host` tree is guarded; unauthenticated users are redirected to `/login` with `location.state` preserved

### Host Dashboard
- **Dashboard Overview** — Income summary (last 30 days), review score, and bike list preview
- **Host Bike List** — All bikes owned by the authenticated host (token-gated API call)
- **Bike Detail Tabs** — Nested routes for Details / Pricing / Photos using `<Outlet>` + `useOutletContext`
- **Active Sub-Navigation** — Wavy/solid underline for active host sub-routes
- **Income Page** — Revenue charts powered by Recharts

---

## 📲 PWA & Offline Support

Vrooom is a fully installable **Progressive Web App** powered by `vite-plugin-pwa` (Workbox).

### Manifest
```json
{
  "name": "Vrooom — Bike Rental",
  "short_name": "Vrooom",
  "display": "standalone",
  "theme_color": "#FF8C38",
  "background_color": "#FF8C38",
  "start_url": "/"
}
```

### Icon Set (all in `/public`)
| File | Size | Purpose |
|------|------|---------|
| `manifest-icon-192.maskable.png` | 192×192 | Manifest — `any` + `maskable` |
| `manifest-icon-512.maskable.png` | 512×512 | Manifest — `any` + `maskable` |
| `apple-touch-icon.png` | 180×180 | iOS home-screen icon |
| `favicon-196.png` | 196×196 | High-res PNG favicon |
| `favicon.ico` | — | Legacy browser fallback |
| `logo.png` | 1024×1024 | Source logo |

> Icons were generated from the source logo using **pwa-asset-generator** and named following the Web App Manifest spec. Separating `any` and `maskable` into individual entries is required for a Lighthouse PWA score — the deprecated `"purpose": "any maskable"` shorthand was intentionally avoided.

### Service Worker Strategy (Workbox)

| Cache | Strategy | Scope | TTL |
|-------|----------|-------|-----|
| App Shell | `generateSW` precache | All JS, CSS, HTML, fonts, icons | Versioned |
| API responses | `NetworkFirst` | `*.onrender.com/api/**` | 24 hours / 50 entries |
| Images | `CacheFirst` | `*.png, *.jpg, *.svg, *.webp` | 30 days / 60 entries |

- **`autoUpdate`** — Service worker silently updates in the background (`registerType: 'autoUpdate'`)
- **`devOptions.enabled: true`** — SW active in development for local PWA testing
- **Network timeout** — API `NetworkFirst` falls back to cache after **10 seconds**, so the app works offline or on flaky connections

---

## ⚡ Performance Optimisations

### Code Splitting (Route-Level Lazy Loading)
Every route-level component is dynamically imported with `React.lazy` + `Suspense`:
```tsx
const Bikes = lazy(() => import('./pages/Bikes').then(m => ({ default: m.Bikes })))
```
This keeps the initial JS bundle minimal — only `Layout`, `AuthProvider`, and the landing page load on first visit. All host pages, auth pages, and bike details are separate chunks fetched on demand.

### Suspense Page Loader
A branded spinner (`#FF8C38` border, transparent top) is shown during any lazy-chunk fetch, preventing blank screens:
```tsx
<Suspense fallback={<PageLoader />}>
  <Routes>…</Routes>
</Suspense>
```

### Scroll-Triggered Animations (IntersectionObserver)
The Home page uses a custom `useInView` hook backed by `IntersectionObserver` to animate sections only when they enter the viewport — no layout thrashing and no animation library dependency:
```ts
const useInView = (threshold = 0.15) => {
  // fires once, then disconnects observer
}
```
Cards animate in with `opacity-0 translate-y-8 → opacity-100 translate-y-0` (CSS transitions, GPU-accelerated).

### Asset Precaching (Workbox `globPatterns`)
```js
globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
```
All static assets are precached at install time so repeat visits load instantly from cache.

### Centralised API Client (no fetch duplication)
A single generic `apiClient<T>()` function handles all HTTP, auth token injection, error normalisation, and status-code guards — preventing N copies of `fetch + .ok check` scattered across components.

### Firebase Auth Token Reuse
`getIdToken()` is called only for protected endpoints (flag `requiresAuth: true`). Public bike listing endpoints skip token fetch entirely, saving a round-trip to Firebase.

### TypeScript Strict Mode
Full strict typing across all files catches shape mismatches at compile time, eliminating an entire class of runtime `undefined is not an object` bugs.

---

## 🏗 Architecture Patterns

### Service Layer Separation
```
Component → API module (bikes.ts) → apiClient (client.ts) → fetch
                                          ↑
                              auth.service.ts → Firebase
```
Business logic lives in `api/` and `service/` — components only call named functions and render data.

### Context + Custom Hook
`AuthContext` exposes state and actions; `useAuth()` throws a helpful error if used outside the provider — prevents silent no-ops during development.

### Error Normalisation (`parseFirebaseError`)
Firebase error codes like `auth/email-already-in-use` are mapped to plain English messages before reaching the UI. Auth context stores the friendly string in `authError` state.

### Outlet Context (Nested Route Data Sharing)
`HostDetailBikes` fetches the bike detail once and passes it to child tab routes via `<Outlet context={{ bikeDetail }}>` + `useOutletContext<T>()` — no prop drilling, no redundant fetches.

### Class-Based Error Boundary
`ErrorBoundary` is implemented as a React class component (the only way to catch render errors) and wraps the entire tree in `main.tsx`. It provides:
- A custom `fallback` prop for targeted UI
- A global fallback in `main.tsx` for catastrophic crashes ("Vrooom hit a bump")
- A `componentDidCatch` logger for debugging

---

## 🗺 Routing Architecture

```
/                           → Layout
├── (index)                 → Home
├── about                   → About
├── bikes                   → Bikes (?type= / ?price= search params)
├── bikes/:id               → BikeDetail
├── login                   → Login (redirect-aware)
├── signup                  → SignUp (role-based)
├── *                       → NotFound
└── host                    → ProtectedRoute
    └── ""                  → Host (nested layout)
        ├── (index)         → Dashboard
        ├── income          → Income (Recharts)
        ├── reviews         → Reviews
        ├── bikes           → HostBikes
        └── bikes/:id       → HostDetailBikes (nested layout)
            ├── (index)     → HostBikeDetail (description tab)
            ├── pricing     → HostBikePricing
            └── photos      → HostBikePhotos
```

**Key patterns:**
- **Layout route** (`Layout.tsx`) wraps all pages with `Header` + `Footer`
- **`ProtectedRoute`** guards `/host`, redirecting to `/login` if unauthenticated, preserving destination in `location.state`
- **Nested layouts** — `Host.tsx` and `HostDetailBikes.tsx` use `<Outlet />` for child route injection
- **Shared context** — `HostDetailBikes` passes `bikeDetail` to child tabs via `<Outlet context={{ bikeDetail }} />`
- **Search params** — `Bikes.tsx` uses `useSearchParams` for URL-native type and price filtering

---

## 🧩 Reusable UI Components

### `Button`
Extends `React.ButtonHTMLAttributes<HTMLButtonElement>` — supports all native button props plus:
| Prop | Description |
|------|-------------|
| `bgBtnColor` | Background color (Tailwind arbitrary value) |
| `btnTextColor` | Text color |
| `btnTextSize` | Font size |
| `btnFontWeight` | Font weight |
| `btnWidth` | Width |
| `btnBorder` | Border color (adds `border border-{value}`) |

### `Chip`
Type badge with variant-driven colors:
| Variant | Color |
|---------|-------|
| `simple` | `#E17654` (coral) |
| `luxury` | `#161616` (black) |
| `rugged` | `#115E59` (teal) |

### `H2` / `PTag`
Typography components extending native HTML attributes with dynamic Tailwind class composition via `cn()`. `PTag` additionally supports an `underLine` prop.

### `cn()` Utility
```ts
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
```
Combines `clsx` for conditional classes with `tailwind-merge` for conflict resolution without duplicate style overrides.

---

## 💀 Shimmer / Loading Skeletons

Dedicated skeleton components replace inline loading spinners:

| Component | Used In | Purpose |
|-----------|---------|---------|
| `ShimBikesListing` | `Bikes.tsx` | 10-item grid skeleton for bike catalogue |
| `ShimBikeDetail` | `BikeDetail.tsx` | Full-page single bike detail skeleton |
| `ShimHostBikesUI` | `Dashboard.tsx`, `HostBikes.tsx` | 10-item list skeleton for host bikes |
| `ShimHostBikeDetailUI` | `HostDetailBikes.tsx` | Host bike detail skeleton |

All skeletons use Tailwind's `animate-pulse` on individual elements for smooth perceived-performance.

---

## 🔌 API Layer

### `apiClient<T>` — Generic Typed Fetch
Located at `src/api/client.ts`. All HTTP requests go through this single function:
- Reads `VITE_API_BASE_URL` from environment (falls back to production URL)
- Conditionally fetches a fresh Firebase ID token and attaches `Authorization: Bearer <token>`
- Checks `response.ok` and maps `401` to a clear error message
- Returns typed `Promise<T>`

```ts
export const apiClient = async <T>(
    endpoint: string,
    requiresAuth: boolean = false
): Promise<T>
```

### Bike API Functions (`src/api/bikes.ts`)
| Function | Auth | Endpoint | Description |
|----------|------|----------|-------------|
| `getAllBikes(type?)` | ❌ | `GET /api[?type=]` | All bikes, optional type filter |
| `getBikeById(id)` | ❌ | `GET /api/:id` | Single bike by ID |
| `getBikesByType(type)` | ❌ | `GET /api/type/:type` | Bikes by type (path param) |
| `getBikesByPrice(price)` | ❌ | `GET /api/price/:price` | Bikes under price |
| `getHostBikes()` | ✅ | `GET /api/host/bikes` | Authenticated host's bikes |

### Sign-Up API Flow (multi-step)
```
1. Firebase createUserWithEmailAndPassword()
2. Wait 500ms for currentUser propagation
3. getIdToken() → Bearer token
4. POST /api/users → { role, fullName, phone, city }
5. Navigate: host → /host | renter → /bikes
```

### Data Fetching Pattern
```tsx
const [data, setData] = useState<Type[]>([])
const [isLoading, setIsLoading] = useState(false)

const fetchData = async () => {
    try {
        setIsLoading(true)
        const data = await getAllBikes(type)
        setData(data)
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error))
    } finally {
        setIsLoading(false)
    }
}
```

---

## 🔐 Authentication System

| Layer | File | Responsibility |
|-------|------|----------------|
| Firebase SDK | `config/firebase.ts` | App + Auth initialisation |
| Service | `service/auth.service.ts` | Raw Firebase calls → `AuthResult` |
| Error parser | `utility/errorHandlers.ts` | Firebase codes → English messages |
| Context | `context/AuthContext.tsx` | Global state + `useAuth()` hook |
| Guard | `components/ProtectedRoute.tsx` | Route-level auth check |

**Auth state lifecycle:**
1. `onAuthStateChanged` listener sets `user` and clears `loading: true` on mount
2. `AuthProvider` renders `null` (via `!loading && children`) until Firebase resolves — prevents flash of unauthenticated content
3. `login`, `signup`, `logout` return `boolean` success so callers can react without try/catch
4. `authError` string is stored in context and cleared with `clearAuthError()` on any new input

### SignUp Form Features
- 7-field form: name, email, phone, password, confirm password, role, city (conditional)
- Per-field inline validation with error clearing on keystroke
- Show/hide password toggle on both password fields
- Role selector (Renter / Host) as button group — city field appears only for hosts
- Disabled state + spinner on submit button during network calls

---

## 🛡 Error Handling

### React Error Boundary (`ErrorBoundary.tsx`)
Class component that catches any render-phase JavaScript error:
- `getDerivedStateFromError` — sets `hasError: true` and stores the `Error` object
- `componentDidCatch` — logs error message and component stack to console
- Default fallback UI — orange "Try again" button that resets boundary state
- Custom `fallback` prop — used in `main.tsx` for the root-level crash screen ("Vrooom hit a bump" + page reload button)

### API Error Handling
- HTTP non-2xx → throws with status code message
- `401 Unauthorized` → specific message "Please login again"
- Network failures → propagate naturally; shimmer stays visible until finally block

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Primary Orange | `#FF8C38` | Buttons, CTAs, brand accents |
| Light Orange BG | `#FFEAD0` | Card backgrounds, host UI |
| Medium Orange | `#FFCC8D` | Active filter buttons, about CTA |
| Page Background | `#FFFBF5` / `#FFF7ED` | Warm off-white base |
| Dark Text | `#161616` | Headings, primary text |
| Secondary Text | `#4D4D4D` | Navigation, subtitles |
| Muted Text | `#848383` | Footer, placeholders |
| Active Nav | `red-300` | NavLink active underline |

### Typography
- **Google Font:** Inter (300, 400, 500, 600, 700, 800) via preconnect links
- Headings: extrabold, `#161616`, via reusable `H2` component
- Body: medium weight, via reusable `PTag` component

### Micro-Animations
- Hero orbs: `animate-pulse` with staggered `animationDelay` and `animationDuration`
- Scroll-cue: `animate-bounce` chevron in hero
- Feature/step/testimonial cards: `IntersectionObserver` + CSS `transition-all duration-700` + staggered `transitionDelay`
- CTA buttons: `hover:-translate-y-0.5`, `hover:shadow-*` lift effect + `group-hover:translate-x-1` on arrow icons
- Category cards: `hover:-translate-y-1`, `group-hover:scale-110` emoji watermark, `group-hover:opacity-100` reveal

### Active Link Style
```
underline decoration-red-300 decoration-solid underline-offset-4 text-red-300 decoration-2 text-lg font-bold
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- A Firebase project with **Authentication** (email/password) enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/abhay0480-eng/Bike_rental_App.git
cd Bike_rental_App/Bike_Rental_App

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Fill in your VITE_API_BASE_URL and Firebase config values

# Start development server
npm run dev
```

App runs at `http://localhost:5173`. The PWA service worker is active in dev (`devOptions.enabled: true`).

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server with HMR + SW |
| `build` | `npm run build` | TypeScript type-check + Vite production build |
| `preview` | `npm run preview` | Preview production build at `:4173` |
| `lint` | `npm run lint` | Run ESLint across the project |

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend base URL (e.g. `https://bike-rental-server-srsy.onrender.com`) |
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

---

## 🌐 Deployment

The frontend is deployed on **Vercel** with automatic deploys from `main`.

**Build command:** `tsc -b && vite build`  
**Output directory:** `dist`  
**`vercel.json`** — Configures SPA fallback rewrites so all routes resolve to `index.html`.

The backend is deployed on **Render** (Node.js/Express).  
CORS is configured to allow `localhost:5173`, `localhost:4173` (Vite preview), and the production Vercel domain.

---

## 📝 License

This project is private and not licensed for distribution.

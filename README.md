# 🏍️ Vrooom — Bike Rental App (Frontend)

A modern bike rental platform built with **React 19**, **TypeScript**, and **Tailwind CSS 4**. Users can explore, filter, and rent bikes while hosts can manage their listed bikes from a dedicated dashboard.

> **Live Backend API:** `https://bike-rental-server-srsy.onrender.com`

---

## 📑 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Routing Architecture](#-routing-architecture)
- [Reusable UI Components](#-reusable-ui-components)
- [Shimmer / Loading Skeletons](#-shimmer--loading-skeletons)
- [API Integration](#-api-integration)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)

---

## 🛠 Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| Framework     | React 19.2                        |
| Language      | TypeScript 6.0                    |
| Build Tool    | Vite 8                            |
| Styling       | Tailwind CSS 4.2                  |
| Routing       | React Router 7.14                 |
| Icons         | Lucide React                      |
| Utilities     | clsx + tailwind-merge (`cn`)      |
| Linting       | ESLint + eslint-plugin-react-hooks|
| Deployment    | Vercel                            |

---

## 📁 Project Structure

```
src/
├── App.tsx                          # Root component — route definitions
├── main.tsx                         # React entry point
├── index.css                        # Global styles
├── App.css                          # App-level styles
│
├── components/                      # Shared layout components
│   ├── Header.tsx                   # Top nav bar with NavLink active states
│   ├── Footer.tsx                   # Site-wide footer
│   └── Layout.tsx                   # Persistent layout (Header + Outlet + Footer)
│
├── pages/                           # Route-level page components
│   ├── Home.tsx                     # Hero landing page with CTA
│   ├── About.tsx                    # About page with mission statement
│   ├── Bikes.tsx                    # Bike catalogue with type filtering
│   ├── BikeDetail.tsx               # Individual bike detail page
│   ├── Host.tsx                     # Host layout with nested nav
│   └── host/                        # Host-specific sub-pages
│       ├── Dashboard.tsx            # Host dashboard (income, reviews, listed bikes)
│       ├── HostBikes.tsx            # Full list of host's bikes
│       ├── HostDetailBikes.tsx      # Single bike detail (host view) — nested outlet
│       ├── HostBikeDetail.tsx       # Bike description tab
│       ├── HostBikePricing.tsx      # Bike pricing tab
│       ├── HostBikePhotos.tsx       # Bike photos tab
│       ├── Income.tsx               # Host income page (placeholder)
│       └── Reviews.tsx              # Host reviews page (placeholder)
│
├── ui/                              # Design system components
│   ├── sharedUiComponents/
│   │   ├── Button.tsx               # Configurable button (color, size, border, etc.)
│   │   └── Chip.tsx                 # Type badge chip (simple / luxury / rugged)
│   ├── typography/
│   │   ├── H2.tsx                   # Reusable heading component
│   │   └── PTag.tsx                 # Reusable paragraph component
│   └── ShimmerUI/                   # Loading skeleton components
│       ├── ShimBikesListing.tsx     # Skeleton for bike catalogue grid
│       ├── ShimBikeDetail.tsx       # Skeleton for bike detail page
│       ├── ShimHostBikesUI.tsx      # Skeleton for host bike list
│       └── ShimHostBikeDetailUI.tsx # Skeleton for host bike detail
│
├── utility/
│   └── cn.tsx                       # Tailwind class merge utility (clsx + twMerge)
│
└── assets/                          # Static assets
```

---

## ✨ Features

### User-Facing
- **Hero Landing Page** — Full-screen background image with CTA to explore bikes
- **Bike Catalogue** — Responsive grid (1–4 columns) displaying all available bikes
- **Type Filtering** — URL-driven filter buttons (`?type=simple|luxury|rugged`) with active state highlighting and clear filter option
- **Bike Detail** — Individual bike page with image, name, type chip, price, description, and "Rent this Bike" button
- **Active Nav Links** — `NavLink` with red underline decoration on active routes

### Host Dashboard
- **Dashboard Overview** — Income summary (last 30 days), review score, and listed bikes preview
- **Host Bike List** — All bikes owned by the host with edit navigation
- **Bike Detail Tabs** — Nested routes for Details / Pricing / Photos using `Outlet` + `useOutletContext`
- **Active Sub-Navigation** — Wavy/solid underline decoration for active host sub-routes

### UX
- **Shimmer Loading Skeletons** — Dedicated, reusable skeleton components with `animate-pulse` shown during API calls
- **Loading State Management** — `isLoading` state with `try/catch/finally` pattern across all data fetchers
- **Responsive Layout** — Tailwind breakpoints for mobile-first responsive grids

---

## 🗺 Routing Architecture

```
/                           → Layout
├── (index)                 → Home
├── about                   → About
├── bikes                   → Bikes (with ?type= search params)
├── bikes/:id               → BikeDetail
└── host                    → Host (nested layout with sub-nav)
    ├── (index)             → Dashboard
    ├── income              → Income
    ├── reviews             → Reviews
    ├── bikes               → HostBikes
    └── bikes/:id           → HostDetailBikes (nested layout)
        ├── (index)         → HostBikeDetail (description)
        ├── pricing         → HostBikePricing
        └── photos          → HostBikePhotos
```

**Key patterns:**
- **Layout route** (`Layout.tsx`) wraps all pages with `Header` + `Footer`
- **Nested layouts** — `Host.tsx` and `HostDetailBikes.tsx` use `<Outlet />` for nested child routes
- **Shared context** — `HostDetailBikes` passes `bikeDetail` to child tabs via `<Outlet context={{ bikeDetail }} />`
- **Search params** — `Bikes.tsx` uses `useSearchParams` for URL-based type filtering

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

### `H2` / `Ptag`
Typography components extending native HTML attributes with dynamic Tailwind class composition via the `cn()` utility. `Ptag` additionally supports an `underLine` prop.

### `cn()` Utility
```ts
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
```
Combines `clsx` for conditional classes with `tailwind-merge` for conflict resolution.

---

## 💀 Shimmer / Loading Skeletons

Dedicated skeleton components replace inline loading UI for better maintainability:

| Component | Used In | Purpose |
|-----------|---------|---------|
| `ShimBikesListing` | `Bikes.tsx` | 10-item grid skeleton for bike catalogue |
| `ShimBikeDetail` | `BikeDetail.tsx` | Single bike detail skeleton |
| `ShimHostBikesUI` | `Dashboard.tsx`, `HostBikes.tsx` | 10-item list skeleton for host bikes |
| `ShimHostBikeDetailUI` | `HostDetailBikes.tsx` | Host bike detail skeleton |

All skeletons use Tailwind's `animate-pulse` on individual elements for smooth loading animations.

---

## 🔌 API Integration

All data is fetched from the live backend deployed on Render:

| Endpoint | Method | Used In | Description |
|----------|--------|---------|-------------|
| `/api` | GET | `Bikes.tsx` | Get all bikes |
| `/api?type={type}` | GET | `Bikes.tsx` | Get bikes filtered by type |
| `/api/{id}` | GET | `BikeDetail.tsx`, `HostDetailBikes.tsx` | Get single bike by ID |
| `/api/host/bikes/123` | GET | `Dashboard.tsx`, `HostBikes.tsx` | Get bikes for host ID 123 |

**Data fetching pattern:**
```tsx
const [data, setData] = useState<Type[]>([])
const [isLoading, setIsLoading] = useState(false)

const fetchData = async () => {
    try {
        setIsLoading(true)
        const req = await fetch(url)
        const res = await req.json()
        setData(res)
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error))
    } finally {
        setIsLoading(false)
    }
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/abhay0480-eng/Bike_rental_App.git
cd Bike_rental_App

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server with HMR |
| `build` | `npm run build` | TypeScript type-check + Vite production build |
| `lint` | `npm run lint` | Run ESLint across the project |
| `preview` | `npm run preview` | Preview the production build locally |

---

## 🌐 Deployment

The app is deployed on **Vercel** with automatic deploys from the `main` branch on GitHub.

**Build command:** `tsc -b && vite build`  
**Output directory:** `dist`

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Primary Orange | `#FF8C38` | Buttons, CTAs |
| Light Orange | `#FFEAD0` | Card backgrounds, host UI |
| Medium Orange | `#FFCC8D` | Active filter buttons, about CTA |
| Dark Text | `#161616` | Headings, primary text |
| Secondary Text | `#4D4D4D` | Navigation, subtitles |
| Muted Text | `#848383` | Footer |
| Active Indicator | `red-300` | NavLink active underline |

### Typography
- Headings: Bold, `#161616`, configurable size via `H2` component
- Body: Medium weight, base size, `#161616` via `Ptag` component

### Active Link Style
```
underline decoration-red-300 decoration-solid underline-offset-4 text-red-300 decoration-2 text-lg font-bold
```

---

## 📝 License

This project is private and not licensed for distribution.

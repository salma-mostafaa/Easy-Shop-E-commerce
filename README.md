# 🛒 EasyShop — React E-Commerce App

A fully functional e-commerce single-page application built with **React 19** and **Vite**. Users can browse products, manage their cart, and complete purchases through an online checkout session — all backed by the [Route Misr E-Commerce API](https://ecommerce.routemisr.com).

---

## 🚀 Live Demo

> *(Add your GitHub Pages or deployment URL here)*

---

## ✨ Features

-  **Authentication** — Register & Login with JWT token stored in `localStorage`
-  **Product Listing** — Browse all products with category filters and a category slider
-  **Product Details** — View full details for any product
-  **Brands** — Browse available brands
-  **Cart Management** — Add, update quantity, and remove items in real time
-  **Checkout** — Stripe-powered online checkout session with shipping address form
-  **Order History** — View all past orders
-  **Protected Routes** — Authenticated pages redirect unauthenticated users to Login
-  **Toast Notifications** — Real-time success/error feedback via `react-hot-toast`
-  **Responsive Design** — Mobile-friendly layout using Bootstrap 5

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests |
| Formik + Yup | Form handling & validation |
| Bootstrap 5 | Responsive styling |
| Swiper | Category/image sliders |
| React Hot Toast | Notifications |
| React Loader Spinner | Loading states |
| Font Awesome 7 | Icons |
| gh-pages | GitHub Pages deployment |

---

## 📁 Project Structure

```
src/
├── assets/images/        # Static image assets
├── components/
│   ├── Navbar/           # Top navigation with cart count badge
│   ├── Home/             # Landing page
│   ├── Products/         # Product grid listing
│   ├── ProductDetails/   # Single product page
│   ├── CategorySlider/   # Horizontal category scroller
│   ├── Brands/           # Brands listing page
│   ├── Carts/            # Cart page (view, update, delete items)
│   ├── Checkout/         # Checkout form → Stripe session redirect
│   ├── allorders/        # Order history page
│   ├── Login/            # Login form
│   ├── Register/         # Registration form
│   ├── ProtectedRoutes/  # Auth guard wrapper
│   ├── Layout/           # Shared page layout (Navbar + Footer + Outlet)
│   ├── Footer/           # Page footer
│   ├── Loader/           # Loading spinner
│   └── NotFound/         # 404 page
├── context/
│   ├── userContext.jsx   # Auth state (token)
│   └── cartContext.jsx   # Cart operations (add, get, update, delete)
├── App.jsx               # Route definitions
└── main.jsx              # App entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## 🌐 API

This project consumes the **Route Misr E-Commerce REST API**:

```
Base URL: https://ecommerce.routemisr.com/api/v1
```

Key endpoints used:

| Endpoint | Method | Description |
|---|---|---|
| `/auth/signup` | POST | Register a new user |
| `/auth/signin` | POST | Login and receive JWT |
| `/products` | GET | Fetch all products |
| `/categories` | GET | Fetch all categories |
| `/brands` | GET | Fetch all brands |
| `/cart` | GET / POST / DELETE / PUT | Cart CRUD operations |
| `/orders/checkout-session/:cartId` | POST | Create Stripe checkout session |
| `/orders/user/:userId` | GET | Fetch user's order history |

> Authentication is handled via a `token` header on all protected requests.

---

## 🚢 Deployment (GitHub Pages)

The project includes `gh-pages` for easy deployment.

1. In `vite.config.js`, make sure `base` is set to your repo name:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

2. In `Checkout.jsx`, update the `url` param to your live domain instead of `localhost:5173`.

3. Run:
   ```bash
   npm run deploy
   ```

---

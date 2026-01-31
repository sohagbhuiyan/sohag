# Sohag Bhuiyan — Portfolio

A modern, AI-themed portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **Three.js** (3D Earth), and **Framer Motion** (animations).

---

## ✨ Features

- 🌍 **3D Rotating Earth** — Three.js sphere with particle cloud & orbit ring
- 🎭 **Framer Motion Animations** — Every section has scroll-triggered, staggered reveals
- 🌑 **Dark / Light Mode** — AI-inspired color palette, persisted in localStorage
- 📱 **Fully Responsive** — Mobile hamburger menu, adaptive layouts
- 📧 **Contact Form** — React Hook Form + Web3Forms API → emails land in your inbox
- 📄 **CV Download** — One-click PDF download from the navbar
- ⚡ **Fast** — Next.js App Router, lazy-loaded 3D canvas, optimized bundle

---

## 🛠 Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 11 |
| 3D | Three.js + React Three Fiber + Drei |
| Forms | React Hook Form |
| Icons | Lucide React |

---

## 📁 Project Structure

```
sohagportfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          ← contact form API (POST)
│   ├── globals.css               ← CSS variables (dark/light), base styles
│   ├── layout.tsx                ← root layout, ThemeProvider, metadata
│   └── page.tsx                  ← home page — mounts every section
│
├── components/
│   ├── ThemeProvider.tsx         ← dark/light context + localStorage
│   ├── Navbar.tsx                ← sticky nav, mobile drawer, CV download
│   ├── Hero.tsx                  ← hero section, rotating text, 3D canvas
│   ├── Earth.tsx                 ← Three.js sphere + particles + glow
│   ├── SectionHeader.tsx         ← reusable animated heading
│   ├── Experience.tsx            ← timeline cards
│   ├── Projects.tsx              ← project cards with links
│   ├── Skills.tsx                ← skill category cards
│   ├── About.tsx                 ← education + contact form
│   └── Footer.tsx                ← social links + quick nav
│
├── lib/
│   └── data.ts                   ← ALL portfolio content (typed)
│
├── types/
│   └── index.ts                  ← TypeScript interfaces
│
├── public/
│   └── cv/
│       └── Sohag_Bhuiyan_CV.pdf  ← your CV (add this file manually)
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.js
└── .env.local                    ← secret keys (create yourself)
```

---

## 🚀 Installation & Run

### 1. Prerequisites

Make sure you have **Node.js 18+** installed:

```bash
node --version
# v18.x or higher
```

### 2. Clone / copy the project

```bash
cd sohagportfolio
```

### 3. Install all dependencies

```bash
npm install
```

This downloads everything in one go:

| Package | What it does |
|---|---|
| `next` | Framework |
| `react` / `react-dom` | UI runtime |
| `framer-motion` | All page & section animations |
| `three` | 3D rendering engine |
| `@react-three/fiber` | React bindings for Three.js |
| `@react-three/drei` | Three.js helpers |
| `lucide-react` | Icon set |
| `react-hook-form` | Contact form validation |
| `tailwindcss` v4 | Utility-first CSS |
| `typescript` | Type safety |

### 4. Run the development server

```bash
npm run dev
```

### 5. Open in browser

```
http://localhost:3000
```

---

## 📧 Contact Form Setup (Web3Forms — FREE)

The contact form sends emails to `sohagbhuiyan778@gmail.com` via **Web3Forms**.

### Step 1 — Get a free access key

1. Go to **https://web3forms.com**
2. Sign up (free)
3. Create a new form
4. Copy your **Access Key**

### Step 2 — Create `.env.local`

Create this file in the **project root** (same level as `package.json`):

```env
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

> ⚠️ Never commit `.env.local` to Git. It is already in `.gitignore`.

### Step 3 — Done

The API route `app/api/contact/route.ts` reads that key and forwards your form data to Web3Forms, which emails you.

---

## 🎨 Customization

### Update your info

Edit **`lib/data.ts`** — all experiences, projects, skills, education and hero texts live there. Every piece is typed.

### Add your CV

Place your CV PDF at:

```
public/cv/Sohag_Bhuiyan_CV.pdf
```

If you rename it, update the `href` in `components/Navbar.tsx`.

### Change colors

Edit the CSS variables at the top of **`app/globals.css`**:

```css
:root {                          /* dark mode */
  --primary: #6366f1;            /* main accent */
  --accent-cyan: #06b6d4;        /* secondary accent */
  --accent-purple: #a855f7;      /* tertiary accent */
}

.light {                         /* light mode */
  --primary: #4f46e5;
  --accent-cyan: #0891b2;
  --accent-purple: #9333ea;
}
```

---

## 📦 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |

---

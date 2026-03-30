# Reverend Peter Olaleye Charity Foundation

A clean, modern charity website built with React, Tailwind CSS, Framer Motion, and React Router.

## 🌍 About

Website for the **Reverend Peter Olaleye Charity Foundation**, based in Ogbomoso, Oyo State, Nigeria.

**Focus Areas:** Scholarships · Free Healthcare · Youth & Market Women Empowerment · Human Rights & Governance

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
rpo-charity-foundation/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx          ← React entry point
    ├── index.css         ← Tailwind base styles
    ├── App.jsx           ← Main app with all sections + routing
    └── pages/
        ├── Volunteer.jsx ← /volunteer page
        └── Partner.jsx   ← /partner page
```

---

## 🗺️ Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `App.jsx` (Home) | Full landing page |
| `/volunteer` | `Volunteer.jsx` | Volunteer application form |
| `/partner` | `Partner.jsx` | Partnership request form |

---

## 🖼️ Adding Real Images

Replace `<ImgPlaceholder />` and `<ImgPlaceholderLight />` components with real `<img>` tags:

1. Add your images to `public/images/`
2. Replace placeholders like this:
```jsx
// Before
<ImgPlaceholderLight label="Founder Image" className="w-full h-96" />

// After
<img src="/images/founder.jpg" alt="Rev. Peter Olaleye" className="w-full h-96 object-cover rounded-2xl" />
```

Image placeholders in the site:
- **Community Image** → Hero section (right side)
- **Founder Image** → About section
- **Healthcare Image** → Stories section (card 1)
- **Scholarship Image** → Stories section (card 2)

---

## 📬 Contact

Reverend Peter Olaleye Charity Foundation
New Estate Baptist Church, Ogbomoso, Oyo State, Nigeria

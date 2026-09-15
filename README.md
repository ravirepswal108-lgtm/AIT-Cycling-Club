# 🚴 AIT Cycling Club — Unmatch Cyclothon 2026

Official website for the **AIT Cycling Club** at Army Institute of Technology, Pune and the **Unmatch Cyclothon 2026** — an annual endurance cycling event through the Sahyadri mountains.

## ✨ Features

- **Homepage** — Club introduction, mission, team, and photo gallery
- **Cyclothon Page** — Event details, countdown timer, route categories, and registration
- **Google Form Registration** — Direct link to the official registration form
- **Google Auth** — Firebase-powered authentication
- **Glassmorphism UI** — Premium dark theme with animated glass-effect components
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Vite 8** — Build tool & dev server
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Animations & transitions
- **GSAP** — Advanced scroll-based animations
- **Firebase** — Authentication
- **Lucide React** — Icon library
- **React Router 7** — Client-side routing

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.tsx                    # Root app with routing
├── main.tsx                   # Entry point
├── index.css                  # Global styles
├── config/
│   └── constants.ts           # Event details, URLs, contact info
├── context/
│   ├── AuthContext.tsx         # Firebase auth context provider
│   └── useAuth.ts             # Auth hook
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── Footer.tsx          # Site footer
│   └── ui/
│       ├── CountdownTimer.tsx  # Event countdown
│       ├── GlassButton.tsx     # Glassmorphism button
│       ├── TiltGlassCard.tsx   # 3D tilt card effect
│       ├── DraggableGlassCard.tsx # Draggable card
│       └── SahyadriContourScene.tsx # Topographic background
├── pages/
│   ├── HomePage.tsx            # Club landing page
│   └── CyclothonPage.tsx       # Cyclothon event page
└── services/
    └── firebase.ts             # Firebase configuration
```

## 📋 Event Details

- **Event**: Unmatch Cyclothon 2026 — Annual Sahyadri Edition
- **Date**: 30 December 2026, 06:00 AM IST
- **Location**: AIT Campus, Dighi Hills, Pune
- **Registration**: [Google Form](https://forms.gle/iKD8gDboz6bSB3KD8)

## 📱 Contact

- **Instagram**: [@ait_cycling_club](https://instagram.com/ait_cycling_club)
- **Email**: ravirepswal108@gmail.com

---

Made with ❤️ by AIT Cycling Club, Army Institute of Technology, Pune

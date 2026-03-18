# PI Front (Frontend)

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![License](https://img.shields.io/badge/license-UNLICENSED-red)
![React](https://img.shields.io/badge/react-19.1.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-7.0.0-646cff?logo=vite)

## 📌 Présentation

Ce dépôt contient le frontend de l'application **PI** (Gestion d'équipement / réclamations / affectations) développé avec **React + Vite**. Il fournit une interface utilisateur moderne, une gestion de l'état avec **Redux Toolkit**, et une navigation protégée (routes publiques/privées).

## 🚀 Prérequis

- Node.js (v18+ recommandé)
- npm (ou yarn/pnpm selon votre préférence)

## 🛠️ Installation

```bash
npm install
```

## ▶️ Scripts utiles

- `npm run dev` - démarre le serveur de développement (HMR)
- `npm run build` - génère le build de production dans `dist/`
- `npm run preview` - prévisualise le build de production
- `npm run lint` - analyse le code avec ESLint

## 📁 Structure du projet

- `src/` – code source React
  - `components/` – composants réutilisables (boutons, modales, navbar, etc.)
  - `views/` – pages et écrans (login, list, détails, formulaires, etc.)
  - `routerUtils/` – routes publiques/privées et utilitaires d'authentification
  - `service/` – services d'accès API
  - `store/` – configuration Redux (slice + store)
  - `utils/` – helpers et données statiques
  - `layout/` – composants de layout (Sidebar, Navbar, etc.)

## 🔐 Authentification et routes

Le projet utilise une couche de protection des routes (public/private) basée sur un token JWT stocké (par ex. `localStorage`). Les utilitaires d'authentification se trouvent dans `src/routerUtils/authUtils.js`.

## 🧩 Technologies principales

- React 19
- Vite 7
- Redux Toolkit
- React Router DOM 7
- ESLint (avec règles de base pour React)

## 💡 Conseils

- Si vous utilisez un proxy ou une API distante, adaptez `src/service/fetchClient.js` pour gérer l'URL de base et l'ajout du token JWT.
- Ajoutez des tests unitaires / d'intégration si vous souhaitez renforcer la couverture avant de pousser en production.

---

### 📝 Licence

Ce projet est **UNLICENSED**. Pour un usage personnel / en interne uniquement.

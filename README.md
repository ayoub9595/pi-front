# PI Front — Interface de Gestion d'Équipements

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![License](https://img.shields.io/badge/license-UNLICENSED-red)
![React](https://img.shields.io/badge/react-19.1.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-7.0.0-646CFF?logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/redux--toolkit-latest-764ABC?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/react--router--dom-7-CA4245?logo=reactrouter&logoColor=white)

---

## 👤 Informations du stage

| Champ | Détail |
|-------|--------|
| **Stagiaire** | Badia Mohamed Aymane |
| **Entreprise** | [Norsys Africa](https://www.norsys.fr/) |
| **Projet** | PI — Gestion d'équipements, réclamations et affectations |
| **Dépôt Backend** | [pi-back](https://github.com/ayoub9595/pi-back) |

---

## 📌 Présentation

**PI Front** est le frontend de l'application **PI**, développé dans le cadre d'un stage chez **Norsys Africa**. Cette plateforme permet la gestion d'équipements, de réclamations et d'affectations. Développé avec **React 19** et **Vite 7**, il offre :

- Une interface utilisateur moderne et réactive
- Une gestion d'état centralisée via **Redux Toolkit**
- Un système de navigation protégée (routes publiques / privées) basé sur JWT
- Une architecture modulaire et évolutive

> 🔗 **Backend associé** : [pi-back](https://github.com/ayoub9595/pi-back) — API REST consommée par ce frontend.

---

## 🚀 Prérequis

| Outil | Version minimale |
|-------|-----------------|
| Node.js | v18+ |
| npm | v9+ (ou yarn / pnpm) |

> ⚠️ Assurez-vous que le backend [pi-back](https://github.com/ayoub9595/pi-back) est démarré et accessible avant de lancer le frontend.

---

## 🛠️ Installation

```bash
# Cloner le dépôt
git clone https://github.com/ayoub9595/pi-back
cd pi-front

# Installer les dépendances
npm install
```

Créez ensuite un fichier `.env.local` à la racine pour configurer l'URL du backend :

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## ▶️ Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur de développement avec HMR |
| `npm run build` | Génère le build de production dans `dist/` |
| `npm run preview` | Prévisualise le build de production en local |
| `npm run lint` | Analyse le code source avec ESLint |

---

## 📁 Structure du projet

```
pi-front/
├── public/                  # Fichiers statiques publics
├── src/
│   ├── assets/              # Images, icônes, polices
│   ├── components/          # Composants réutilisables (boutons, modales, navbar…)
│   ├── layout/              # Composants de mise en page (Sidebar, Navbar…)
│   ├── routerUtils/         # Routes publiques/privées + utilitaires d'auth
│   │   └── authUtils.js     # Helpers JWT (lecture token, vérification expiration…)
│   ├── service/             # Couche d'accès API
│   │   └── fetchClient.js   # Client HTTP centralisé (baseURL, headers JWT)
│   ├── store/               # Configuration Redux
│   │   ├── store.js         # Configuration du store Redux
│   │   └── slices/          # Slices Redux Toolkit (auth, équipements, etc.)
│   ├── utils/               # Helpers, constantes et données statiques
│   ├── views/               # Pages et écrans (Login, Liste, Détails, Formulaires…)
│   ├── App.jsx              # Composant racine et définition des routes
│   └── main.jsx             # Point d'entrée de l'application
├── .env.local               # Variables d'environnement locales (non versionné)
├── .eslintrc.cjs            # Configuration ESLint
├── vite.config.js           # Configuration Vite
├── package.json
└── README.md
```

---

## 🔗 Architecture Fullstack

```
[ PI Front — React / Vite ]
         │
         │  HTTP / REST (JWT)
         ▼
[ PI Back — API REST ]
https://github.com/ayoub9595/pi-back
         │
         ▼
    [ Base de données ]
```

Le frontend communique exclusivement avec le backend via des appels REST sécurisés par token JWT.

---

## 🔐 Authentification & Routes protégées

La navigation est protégée via un **token JWT** stocké dans le `localStorage`.

- Les **routes publiques** (ex. `/login`) sont accessibles sans authentification.
- Les **routes privées** redirigent automatiquement vers `/login` si aucun token valide n'est présent.
- Les utilitaires d'authentification se trouvent dans `src/routerUtils/authUtils.js`.

```
Utilisateur → Route privée → authUtils.isAuthenticated() → ✅ Accès / 🔒 Redirection /login
```

---

## 🌐 Configuration du client API

Le client HTTP centralisé se trouve dans `src/service/fetchClient.js` :

```js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const fetchClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return response.json();
};
```

---

## 🧩 Technologies principales

| Technologie | Rôle |
|-------------|------|
| [React 19](https://react.dev/) | Bibliothèque UI |
| [Vite 7](https://vitejs.dev/) | Bundler & serveur de développement |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Gestion d'état global |
| [React Router DOM 7](https://reactrouter.com/) | Navigation & routes protégées |
| [ESLint](https://eslint.org/) | Analyse statique du code |

---

## 📝 Licence

Ce projet a été réalisé dans le cadre d'un stage chez **Norsys Africa**. Il est **UNLICENSED** — usage interne uniquement.

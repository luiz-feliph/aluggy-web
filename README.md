# aluggy-web

React frontend for [Aluggy](https://aluggyapp.com.br) — a classifieds platform connecting students to rental properties near university campuses.

## Overview

Aluggy is a web platform focused on university students looking for housing close to their campus. This repository contains the frontend, built with React and consuming the [aluggy-api](https://github.com/luiz-feliph/aluggy-api).

## Tech Stack

- **Framework:** React 19
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP client:** Axios
- **Routing:** React Router

## Getting Started

### Prerequisites

- Node.js 20+

### Running locally

git clone https://github.com/luiz-feliph/aluggy-web.git
cd aluggy-web
npm install
npm run dev

The app will be available at http://localhost:5173.
## Folder Convention (bulletproof-react)

The structure follows the [bulletproof-react](https://github.com/alan2207/bulletproof-react) pattern. The core idea is to **isolate each business domain into a feature** and share only generic code at the root level.

### Root `src/` Structure

    src/
    ├── app/                 # Application composition: providers, routes, and pages
    │   ├── app.tsx          # Root component
    │   ├── provider.tsx     # Global providers
    │   ├── router.tsx       # Centralized route definitions
    │   └── routes/          # One page per route (e.g., routes/auth/register.tsx)
    ├── assets/              # Global static media (images, fonts)
    ├── components/          # Reusable UI components shared across features
    ├── config/              # Configuration (e.g., env.ts with environment variables)
    ├── features/            # Domain modules (auth, properties, posts, ...)
    ├── hooks/               # Generic reusable hooks
    ├── lib/                 # Infrastructure libraries/config 
    ├── stores/              # Global state stores
    ├── testing/             # Testing utilities
    ├── types/               # Shared global types
    └── utils/               # Pure utility functions

### Anatomy of a Feature

Each feature under `features/<name>/` contains only the layers that make sense for that domain:

    features/auth/
    ├── api/          # HTTP calls (consume the api-client from lib/)
    ├── assets/       # Feature-specific media (icons, placeholders)
    ├── components/   # Feature UI components (e.g., RegisterForm)
    ├── hooks/        # Hooks that encapsulate logic (e.g., useRegister)
    ├── stores/       # Feature-local state when necessary
    ├── types/        # Feature types/DTOs (mirror the API contracts)
    └── utils/        # Domain-specific helpers

## Related

- [aluggy-api](https://github.com/luiz-feliph/aluggy-api) — Spring Boot backend
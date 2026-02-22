# Martí Academy OS

| Stage: Omega | Environment: Development | Status: Active |
| :----------- | :----------------------- | :------------- |

[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Engine-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

## Technical Documentation and System Overview

Martí Academy OS is an integrated institutional platform designed to unify academic management, advanced gamification, and educational community interaction within a modern and scalable ecosystem. The system follows the **Martí OS** design philosophy, emphasizing a high-performance, immersive experience.

> [!IMPORTANT]
> **The Omega Cycle**: This development phase focuses on **Data Flow Orchestration** (Centralized Hooks) and **Immersive Navigation Infrastructure** (Glassmorphic Subject Modals and Drawers).

---

## 1. Project Vision

The core objective of Martí Academy OS is to provide a seamless digital environment for educational institutions. It leverages the **Deep Dark Aesthetic** to reduce cognitive load and enhance focus, integrating gamification as a primary driver for student engagement and recognition.

---

## 2. Tech Stack

The platform is built on modern industry standards to ensure scalability and performance:

- **Frontend**: Next.js 15+ (App Router) using React 19 features.
- **Styling**: Tailwind CSS 4.0 with custom glassmorphism utilities.
- **Backend-as-a-Service**: Supabase (PostgreSQL, Auth, Storage, and Realtime).
- **Communication**: Lucide React and shadcn/ui primitives.

---

## 3. Architecture

The codebase follows a **Feature-First** modular architecture, prioritizing domain encapsulation.

### 3.1 Directory Structure

```bash
marti-academy-os/
├── src/
│   ├── app/                # Next.js Routing and layout orchestration
│   ├── core/               # Domain-driven rules and role constants
│   ├── config/             # Environment and external provider setup
│   ├── features/           # Domain-driven modules (Auth, Dashboard, etc.)
│   │   ├── [feature]/      # Self-contained domain context
│   │   │   ├── components/ # Presentation-layer components
│   │   │   ├── hooks/      # Centralized data orchestration hooks
│   │   │   └── services/   # Direct data-provider communication logic
│   ├── shared/             # Reusable UI primitives and utilities
│   └── docs/               # Technical architectural blueprints
└── supabase/               # SQL migrations and backend logic
```

### 3.2 Data Flow Orchestration

The system utilizes **Centralized Hooks** (e.g., `src/features/dashboard/hooks/useStudentData.js`) to orchestrate data retrieval from multiple Supabase services, providing a clean, semantic interface for presentational components.

---

## 4. Current Progress: Omega Cycle

The system is currently in the **Omega Cycle**, focusing on Data Flow Excellence and Immersive UI.

- **Student Dashboard**: Refactored for high-fidelity performance using React 19 optimizations.
- **Subject Grid**: Implemented dynamic course mapping with **SubjectCard** and **SubjectDrawer**.
- **Gamification Engine**: Active synchronization of **XP**, **Daily Streaks**, and **Merit Wallet**.
- **Navigation**: Immersive side-panel infrastructure for subject details.

---

## 5. Security and Performance

- **Row Level Security (RLS)**: Mandatory on all PostgreSQL tables.
- **RBAC Middleware**: Role-based access control managed at the edge (`src/proxy.js`).
- **Optimization**: Role caching in cookies and strategic database indexing for sub-100ms response times.

---

## 6. Installation

### 6.1 Prerequisites

- Node.js 18+
- pnpm 8+
- Supabase project instance

### 6.2 Setup

1. Clone the repository: `git clone [repository-url]`
2. Install dependencies: `pnpm install`
3. Configure `.env.local` with Supabase credentials.
4. Apply SQL migrations located in `supabase/migrations/` in sequential order.
5. Launch dev server: `pnpm dev`

---

## 7. Project Metadata

- **Lead Developer**: Gabriel Alexander González
- **Institution**: Colegio José Martí
- **Year**: 2026
- **License**: MIT

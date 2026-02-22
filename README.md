# Martí Academy OS

## Technical Documentation and System Overview

Martí Academy OS is an integrated institutional platform designed to unify academic management, advanced gamification, and educational community interaction within a modern and scalable ecosystem. The system follows the **Martí OS** design philosophy, emphasizing a high-performance, immersive experience.

---

## 1. Project Vision

The core objective of Martí Academy OS is to provide a seamless digital environment for educational institutions. It leverages the **Deep Dark Aesthetic** to reduce cognitive load and enhance focus, integrating gamification as a primary driver for student engagement and recognition.

---

## 2. Tech Stack

The platform is built on modern industry standards to ensure scalability and performance:

- **Frontend**: **Next.js 15+ (App Router)** using React 19 features.
- **Styling**: **Tailwind CSS 4.0** with custom glassmorphism utilities.
- **Backend-as-a-Service**: **Supabase** (PostgreSQL, Auth, Storage, and Realtime).
- **Iconography**: **Lucide React**.
- **Animation**: Native CSS transitions and **shadcn/ui** primitives.

---

## 3. Architecture

The codebase follows a **Feature-First** modular architecture, prioritizing domain encapsulation.

### 3.1 Directory Structure

- `src/features/`: Contains domain-specific logic, components, and services.
- `src/app/`: Handles routing and layout orchestration through the Next.js App Router.
- `src/shared/`: Reusable UI components and utility functions.
- `src/core/`: Domain rules, roles, and permission constants.

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

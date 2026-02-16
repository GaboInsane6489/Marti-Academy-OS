# Martí Academy OS

> **Infraestructura Digital Institucional — Colegio José Martí**

Martí Academy OS es un ecosistema digital avanzado diseñado como el "sistema operativo" oficial del Colegio José Martí. Centraliza la gestión académica, potencia la comunidad institucional y motiva el rendimiento estudiantil mediante una arquitectura moderna, segura y altamente escalable.

---

## 🏛️ Visión y Propósito

El sistema trasciende la simple gestión de notas para convertirse en el núcleo de la identidad digital institucional:

- **Gestión Académica de Alto Rendimiento**: Operativa ágil para docentes y transparencia para alumnos.
- **Comunidad Educativa Segura**: Espacio social protegido con reglas de visibilidad estrictas.
- **Motivación Basada en Mérito**: Sistema de gamificación institucional (XP, Niveles, Rachas).
- **Seguridad Estructural**: Protección de datos de menores mediante RLS y cifrado de extremo a extremo.

---

## 🛠️ Stack Tecnológico

Seleccionado para garantizar una performance de **90-100 en Lighthouse** y una mantenibilidad a largo plazo.

- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router, Server Components por defecto).
- **Lenguaje**: JavaScript / React 19.
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/) (Arquitectura de variables OKLCH).
- **Backend as a Service**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime, Storage).
- **Gestión de Datos**: [TanStack Query v5](https://tanstack.com/query/latest) & [React Hook Form](https://react-hook-form.com/).
- **Validación**: [Zod](https://zod.dev/).
- **Optimización**: `@next/bundle-analyzer`, FFmpeg WASM (para procesamiento de video).

---

## 🧠 Filosofía y Pilares Técnicos

El desarrollo se rige por principios de ingeniería de software de alto nivel (Docs `02`, `05`, `06`):

- **Seguridad Estructural**: El Row Level Security (RLS) en Supabase es la única autoridad. El frontend no define permisos, solo los refleja.
- **Arquitectura Modular**: Sistema diseñado como un monolito modular orientado a dominios (Domain-Driven Design) para facilitar la transición futura a microservicios o SaaS.
- **Server-First Performance**: Uso intensivo de React Server Components (RSC) para minimizar el JavaScript en el cliente y garantizar una carga instantánea.
- **Documentación Viva**: Cada decisión arquitectónica está respaldada por documentos técnicos específicos en `src/docs/`.

---

## 🏗️ Arquitectura del Sistema

```bash
src/
├── app/          # Vistas y Entrypoints (App Router)
├── features/     # Dominios funcionales desacoplados (Auth, Academic, Gamification)
├── core/         # Reglas de negocio puras, roles y constantes
├── shared/       # Componentes UI (Design System) y utilidades transversales
├── config/       # Configuración de infraestructura (Supabase, variables de entorno)
└── docs/         # 13+ Documentos de diseño técnico y visión institucional
```

---

## 🛡️ Pilares de Seguridad y Performance

Basado en los estándares definidos en `src/docs/12-supabase-performance-standards.md`:

1. **Database-First Security**: El Row Level Security (RLS) es el único juez de la verdad. El frontend solo refleja los permisos.
2. **Optimización de Consultas**: Prohibición de `SELECT *`, uso de índices parciales/compuestos y paginación obligatoria.
3. **Institutional Tech Aesthetic**: Diseño minimalista, editorial y profesional (Azul Eléctrico / Cyan) con micro-interacciones de alta respuesta.

---

## 📅 Hoja de Ruta (Roadmap)

- **Fase 0 — Fundación (Actual)**: Setup, Blueprint técnico, Estándares de diseño y seguridad.
- **Fase 1 — Núcleo**: Auth institucional, Roles, Dashboards base y Perfiles.
- **Fase 2 — Operativa**: Asistencia "Smart", Gestión Académica y Recursos Pedagógicos.
- **Fase 3 — Ecosistema**: Feed social, Gamificación (XP/Tienda) y Ranking de Temporadas.

---

## 🚀 Instalación y Desarrollo

1. **Clonar**: `git clone https://github.com/GaboInsane6489/Marti-Academy-OS.git`
2. **Dependencias**: `pnpm install`
3. **Entorno**: Configura tu `.env.local` con las credenciales de Supabase.
4. **Dev**: `pnpm dev`
5. **Analizar**: `pnpm analyze` (para auditoría de bundle).

---

## ✍️ Autoría

Desarrollado con visión de excelencia para el **Colegio José Martí**.
**Autor**: Gabriel González (Full Stack Developer)

---

_Este proyecto es documentación-céntrica. Para cualquier implementación, consulte primero la carpeta `src/docs/`._

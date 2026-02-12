Martí Academy OS

Infraestructura Digital Institucional del Colegio José Martí.

Martí Academy OS es un sistema operativo educativo diseñado para centralizar la gestión académica, fortalecer la comunidad institucional y motivar el rendimiento estudiantil mediante una arquitectura moderna, segura y escalable.

No es solo una plataforma de notas.
Es el ecosistema digital oficial del colegio.

Visión

Convertirse en la infraestructura digital central del Colegio José Martí, integrando:

Gestión académica estructurada

Comunidad educativa segura

Identidad digital institucional

Sistema de gamificación basado en mérito

Métricas en tiempo real

Con una arquitectura preparada para escalar hacia un modelo replicable en otras instituciones.

Stack Tecnológico

Next.js (App Router)

React

Tailwind CSS

Supabase (Auth, Database, Realtime, Storage)

Vercel (Deploy)

pnpm (Package Manager)

ESLint + Prettier

Arquitectura del Proyecto

El proyecto sigue una arquitectura modular orientada a dominios:

src/
│
├── app/ # App Router y entrypoints
├── features/ # Dominios funcionales
├── core/ # Lógica central del sistema
├── shared/ # Código transversal reutilizable
├── config/ # Configuraciones externas
├── docs/ # Documentación viva del sistema
└── styles/ # Estilos globales

Principios arquitectónicos

Modularidad estricta

Separación de dominios

Seguridad desde la base de datos

Performance como estándar

Documentación como parte del sistema

Dominios Principales

Auth

Usuarios

Académico

Feed Institucional

Notificaciones

Gamificación

Ranking

Eventos

Dashboard por Rol

Seguridad

El sistema está diseñado considerando:

Protección de datos de menores

Control estricto por roles

Row Level Security (RLS) en Supabase

Validaciones tanto en cliente como en servidor

Filosofía del Sistema

Seguridad primero

Escalabilidad desde el diseño

Arquitectura modular

Performance optimizado

Documentación viva

Instalación

Clonar el repositorio:

git clone https://github.com/GaboInsane6489/marti-academy-os.git
cd marti-academy-os

Instalar dependencias:

pnpm install

Crear archivo de entorno:

.env.local

Agregar:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

Ejecutar entorno de desarrollo:

pnpm dev

Roadmap Inicial

Fase 0

Arquitectura base

Documentación fundacional

Setup del proyecto

Fase 1

Sistema de autenticación

Modelo de roles

Dashboard base

Fase 2

Módulo académico

Publicaciones institucionales

Notificaciones

Fase 3

Gamificación

Ranking

Métricas avanzadas

Estado del Proyecto

En fase de fundación arquitectónica.

Este proyecto está diseñado para evolucionar durante varios años y mantenerse escalable, mantenible y profesional.

Contribución

El sistema está diseñado para permitir colaboración estructurada.

Antes de contribuir:

Revisar documentación en src/docs

Seguir principios de arquitectura modular

Mantener consistencia con el dominio

Guías de contribución formales serán añadidas en futuras versiones.

Licencia

Pendiente de definir.

Autor

Gabriel González
Full Stack Developer

Proyecto fundacional con visión institucional y expansión futura.

Cuando lo pegues y hagas commit, el mensaje correcto sería:

git add .
git commit -m "docs: add foundational README for Martí Academy OS"
git push

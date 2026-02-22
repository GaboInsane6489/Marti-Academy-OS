# Architecture Blueprint

1. Enfoque Arquitectónico

Martí Academy OS utiliza una arquitectura modular basada en dominios dentro de un monolito estructurado.

Se apoya en:

Next.js App Router

Server Components por defecto

Supabase como backend (Auth + DB + Storage + Realtime)

RLS como núcleo de seguridad

2. Capas del Sistema
1. Presentation Layer

Ubicada en:

src/app
src/features/\*/components
src/shared/ui

Responsabilidades:

Renderizado de vistas

Interacciones del usuario

Layouts por rol

#### 2. Application Layer

Ubicada en:

- `src/features/*/services`
- `src/features/*/hooks`

Responsabilidades:

- **Centralized Hooks**: Orquestación de lógica compleja (ej. `useStudentData.js`) para simplificar el consumo de datos en la capa de presentación.
- Comunicación con Supabase y servicios externos.
- Gestión de estado local y validaciones de aplicación.

3. Domain Layer

Ubicada en:

src/core/domain
src/core/roles
src/core/permissions

Responsabilidades:

Definición de reglas

Constantes de roles

Reglas de negocio puras

4. Infrastructure Layer

Ubicada en:

src/config
src/shared/lib

Responsabilidades:

Cliente Supabase

Configuración externa

Integraciones

3. Autenticación

Supabase Auth

Roles almacenados en tabla profiles

Middleware para protección de rutas

Validación secundaria mediante RLS

4. Protección de Rutas

Se implementará:

Middleware de Next.js

Verificación de sesión

Redirección por rol

Ejemplo conceptual:

/dashboard/admin
/dashboard/docente
/dashboard/estudiante

5. Estrategia de Seguridad

Todas las tablas críticas con RLS activado

Policies basadas en:

role

relación contextual

ownership

El frontend nunca define permisos.

6. Estrategia de Performance

Server Components por defecto

Fetch en servidor cuando sea posible

Minimizar uso de client components

Optimización de queries

Indexación adecuada en base de datos

Uso futuro de caching selectivo

7. Escalabilidad

Diseñado para:

Crecimiento en número de estudiantes

Nuevos módulos

Integración futura multi-tenant

App móvil futura

8. Futuro Evolutivo

Posible transición a:

Arquitectura hexagonal

Separación backend independiente

Microservicios por dominio (si escala masivamente)

Actualmente: monolito modular profesional.

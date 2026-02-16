# Database Schema Design & RLS Policies

Este documento detalla la estructura de tablas y las políticas de seguridad (RLS) para soportar las funcionalidades de Estudiante, Comunidad y Notificaciones.

## 1. Tablas Nucleares

### `notifications`

| Columna      | Tipo        | Descripción                                                   |
| ------------ | ----------- | ------------------------------------------------------------- |
| `id`         | uuid (PK)   | Identificador único                                           |
| `user_id`    | uuid (FK)   | Referencia a `profiles.id`                                    |
| `type`       | text        | auth, event, grade, assignment, schedule_change, social, etc. |
| `content`    | jsonb       | Contenido rico: `{ text, image_url, icon, svg_type }`         |
| `read`       | boolean     | Estado de lectura (default: false)                            |
| `created_at` | timestamptz | Fecha de creación                                             |

**RLS**:

- `SELECT`: `auth.uid() = user_id` (Solo el dueño puede verlas)
- `UPDATE`: `auth.uid() = user_id` (Solo el dueño puede marcar como leída)
- `DELETE`: `auth.uid() = user_id` (Solo el dueño puede borrarlas)

### `schedules`

| Columna        | Tipo      | Descripción                  |
| -------------- | --------- | ---------------------------- |
| `id`           | uuid (PK) | Identificador único          |
| `classroom_id` | uuid (FK) | Referencia a `classrooms.id` |
| `subject_id`   | uuid (FK) | Referencia a `subjects.id`   |
| `day_of_week`  | int       | 1 (Lunes) a 5 (Viernes)      |
| `start_time`   | time      | Hora inicio                  |
| `end_time`     | time      | Hora fin                     |

**RLS**:

- `SELECT`: El estudiante debe pertenecer al `classroom_id`.
- `INSERT/UPDATE/DELETE`: Solo rol `admin`.

### `connections` (Amistad)

| Columna        | Tipo      | Descripción                 |
| -------------- | --------- | --------------------------- |
| `id`           | uuid (PK) | Identificador único         |
| `requester_id` | uuid (FK) | Quien envía                 |
| `receiver_id`  | uuid (FK) | Quien recibe                |
| `status`       | text      | pending, accepted, rejected |

**RLS**:

- `SELECT`: `auth.uid()` es `requester_id` o `receiver_id`.
- `INSERT`: `auth.uid() = requester_id`.
- `UPDATE`: `auth.uid() = receiver_id` (para aceptar/rechazar).

## 2. Lógica de Visibilidad de Perfiles

Para ver el perfil detallado, notas y logros de otro estudiante:

1. Si el perfil es público institucionalmente (Punto 6 del `03-domain-overview`).
2. Si `status` en `connections` es `accepted` entre ambos usuarios.

## 3. Optimización de Consultas

- Índice en `notifications(user_id, read)` para carga rápida del dashboard.
- Índice en `schedules(classroom_id)` para el calendario semanal.
- Índice en `connections(requester_id, receiver_id)` para búsqueda de amigos.

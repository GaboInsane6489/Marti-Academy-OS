# Security Foundation

Martí Academy OS maneja información académica y datos de menores de edad.
Por lo tanto, la seguridad no es un complemento, es un pilar estructural del sistema.

1. Principio Fundamental

El frontend no define permisos.
La base de datos es la autoridad final.

Toda validación crítica debe existir en:

Base de datos (RLS)

Lógica del servidor

Middleware de protección

Nunca únicamente en el cliente.

2. Autenticación

Se utiliza:

Supabase Auth

Sesiones seguras

Tokens firmados

Características:

Persistencia segura de sesión

Refresh automático de token

Protección contra manipulación en cliente

3. Autorización

Basada en:

Rol institucional

Relación contextual (materia, aula, ownership)

Estado del usuario

El rol se almacena en la tabla profiles, no en el frontend.

4. Row Level Security (RLS)

Todas las tablas críticas deben tener RLS activado.

Tablas críticas incluyen:

profiles

subjects

evaluations

grades

attendance

posts

notifications

points

badges

Las policies deben validar:

Que el usuario autenticado tenga permiso.

Que pertenezca al contexto correcto.

Que sea dueño del recurso cuando aplique.

5. Protección de Rutas

Se implementará:

Middleware en Next.js

Redirección automática por rol

Bloqueo de acceso directo a rutas restringidas

Ejemplo:

Un estudiante no puede acceder a:

/dashboard/admin
/dashboard/docente

Aunque intente escribir la URL manualmente.

6. Protección de Datos Sensibles

Nunca exponer claves privadas en cliente.

Variables sensibles solo en entorno servidor.

Uso exclusivo de NEXT_PUBLIC solo para claves públicas.

7. Protección de Contenido (Feed)

El feed institucional tendrá:

Moderación manual por administrador

Sistema de reporte

Posible integración futura de filtrado automático

8. Prevención de Abuso

Medidas futuras:

Rate limiting

Validación de tamaño de contenido

Prevención de spam

Registro de actividad crítica (auditoría)

9. Auditoría

Se implementará registro de:

Cambios en notas

Eliminación de contenido

Cambios de rol

Modificaciones académicas

El sistema debe permitir trazabilidad institucional.

10. Escalabilidad en Seguridad

Diseñado para evolucionar hacia:

Control granular por permisos

Multi-tenant seguro

Segmentación por institución

La seguridad en Martí Academy OS no es una funcionalidad.
Es una condición estructural del sistema.

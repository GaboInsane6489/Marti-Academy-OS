Roles and Permissions

1. Principio Fundamental

Martí Academy OS implementa un sistema de autorización basado en roles estrictos.

La autorización no depende del frontend.
La seguridad se aplica principalmente en la base de datos mediante Row Level Security (RLS).

2. Roles Principales

El sistema define tres roles institucionales primarios:

1. Administrador (Dirección)

Representa la autoridad institucional.

Permisos generales:

Crear, editar y desactivar usuarios

Asignar roles

Crear materias, aulas y secciones

Asignar docentes a materias

Publicar eventos oficiales

Acceder a métricas globales

Moderar publicaciones del feed

Visualizar todos los registros académicos

Acceso total dentro del sistema.

2. Docente

Representa al cuerpo académico.

Permisos generales:

Visualizar estudiantes asignados a sus materias

Registrar notas

Registrar asistencia

Crear tareas, exámenes y talleres

Publicar contenido académico en el feed

Ver estadísticas de sus cursos

Enviar notificaciones académicas

Restricciones:

No puede modificar estructura institucional

No puede acceder a datos de cursos no asignados

3. Estudiante

Representa al alumnado.

Permisos generales:

- Ver su perfil institucional y dashboard personalizado.
- Visualizar sus notas, tareas, exámenes, proyectos y quizzes.
- Consultar su horario académico (fechas y horas) en tiempo real.
- Recibir y gestionar notificaciones ricas (marcar como leídas, borrar).
- Acceder a recursos de clase (videos de YouTube, videos propios, documentos).
- Participar en el feed institucional.
- Interactuar con la comunidad educativa (ver perfiles, logros y notas habilitadas de otros).
- Sistema social: enviar, recibir y gestionar solicitudes de amistad.

Acciones específicas:

- Marcar notificaciones como leídas o eliminarlas tras lectura.
- Navegación doble: Navbar superior global + Sidebar lateral específico.
- Acceso a rutas: `/dashboard/eventos`, `/dashboard/notas`, `/dashboard/notificaciones`, `/dashboard/asignaciones`, `/dashboard/perfil`, `/dashboard/comunidad`, `/dashboard/clases`.

Restricciones:

- No puede modificar registros académicos.
- No puede subir recursos de clase (solo lectura).
- Solo puede ver información privada de otros estudiantes si hay una conexión aceptada.

3. Modelo de Permisos (Conceptual)

El sistema se basa en:

Rol principal

Contexto académico

Relación con el recurso

Ejemplo:

Un docente puede ver notas únicamente si:

Está asignado a la materia

El estudiante pertenece a su curso

Un estudiante puede ver publicaciones:

Si son públicas institucionalmente

Si pertenecen a su aula

Si son de usuarios conectados (según reglas futuras)

4. Permisos por Dominio
   Académico

Administrador:

CRUD completo

Docente:

Crear y modificar evaluaciones propias

Ver estudiantes asignados

Estudiante:

Solo lectura de su información académica

Feed Institucional

Administrador:

Moderación completa

Eliminación de contenido

Docente:

Publicar contenido académico

Comentar

Estudiante:

Publicar dentro de límites permitidos

Comentar

Reaccionar

Gamificación

Administrador:

Configurar sistema de puntos

Crear insignias

Docente:

Otorgar puntos académicos

Estudiante:

Visualizar logros y ranking

Notificaciones

Administrador:

Notificaciones masivas institucionales

Docente:

Notificaciones académicas

Estudiante:

Recepción y gestión de notificaciones personales

5. Estructura Técnica Prevista

La tabla profiles estará vinculada a auth.users de Supabase.

Ejemplo conceptual:

id

role

academic_year

section

status

El rol será almacenado en base de datos, no en localStorage ni en cliente.

6. Seguridad Crítica

Todas las tablas académicas tendrán RLS activado.

Las policies dependerán del rol y de la relación contextual.

El frontend solo reflejará permisos; nunca los definirá.

7. Escalabilidad Futura

El sistema permite agregar:

Rol "Padre / Representante"

Rol "Coordinador Académico"

Permisos granulares por capacidad

El diseño no está limitado a solo tres roles.

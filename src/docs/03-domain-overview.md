# Domain Model Overview

Martí Academy OS se basa en un modelo de dominio estructurado orientado a entidades académicas y sociales interconectadas.

Este documento define las entidades principales y sus relaciones conceptuales.

1. Usuario

Representa a cualquier persona dentro del sistema.

Fuente de autenticación

Supabase Auth (auth.users)

Perfil institucional (profiles)

Campos conceptuales:

id (UUID, referencia a auth.users.id)

role (admin | docente | estudiante)

first_name

last_name

avatar_url

cover_url

academic_year (1–5)

section (A–B)

status (active | inactive | suspended)

created_at

Relaciones:

Un estudiante pertenece a un aula.

Un docente puede estar asignado a múltiples materias.

Un administrador tiene acceso global.

2. Estructura Académica
   AcademicYear

id

name (1ro, 2do, 3ro, 4to, 5to)

Section

id

name (A, B)

academic_year_id

Classroom

Combinación de año + sección.

id

academic_year_id

section_id

Relaciones:

Un classroom tiene muchos estudiantes.

Un classroom tiene múltiples materias.

3. Materias
   Subject

id

name

description

classroom_id

Relaciones:

Una materia pertenece a un classroom.

Una materia tiene un docente asignado.

Una materia tiene muchas evaluaciones.

4. Evaluaciones
   Evaluation

id

subject_id

title

type (exam | workshop | task | presentation)

date

max_score

Grade

id

evaluation_id

student_id

score

Relaciones:

Una evaluación pertenece a una materia.

Una evaluación tiene muchas notas.

Un estudiante tiene muchas notas.

5. Asistencia
   Attendance

id

subject_id

student_id

date

status (present | absent | justified)

6. Feed Institucional
   Post

id

author_id

content

visibility (public | classroom | connections)

created_at

Comment

id

post_id

author_id

content

created_at

7. Sistema Social
   Connection

id

requester_id

receiver_id

status (pending | accepted | rejected)

8. Gamificación
   Points & XP

id

student_id

xp_value (acumulativo, define el nivel)

merits_balance (moneda para la tienda)

source (academic, attendance, event, social, streak)

awarded_at

Level

id

student_id

current_level (1-50)

unlocked_titles (json)

last_level_up

id

name

description

criteria

StudentBadge

id

student_id

badge_id

awarded_at

9. Notificaciones
   Notification

id

user_id

type (auth | event | grade | assignment | exam | project | quiz | task | investigation | teacher_change | schedule_change | social)

reference_id

content (text | image_url | icon_name | svg_animated)

read (boolean)

created_at

10. Horarios
    Schedule

id

classroom_id (referencia a Classroom)

subject_id (referencia a Subject)

day_of_week (monday-friday)

start_time

end_time

created_at

11. Recursos de Clase
    ClassResource

id

subject_id

title

description

type (video_url | video_file | document | link)

url

file_path (si es video_file, optimizado a <5MB)

checkpoints (json: [{ timestamp, question, options, answer }])

xp_reward (puntos por completar)

created_at

12. Progreso de Recursos (ResourceProgress)

id

student_id

resource_id

progress_percentage (0-100)

completed (boolean)

last_watched_at

13. Sistema Social (Conexiones)
    Connection

id

requester_id

receiver_id

status (pending | accepted | rejected)

created_at

updated_at

Modelo Conceptual Simplificado

Usuario
→ pertenece a Classroom
→ tiene Evaluaciones y Notas operadas por Docente
→ tiene Horarios semanales dinámicos
→ accede a Recursos de Clase (Videos con Checkpoints/XP)
→ participa en Feed con Reacciones Pedagógicas
→ recibe Notificaciones ricas (iconos/imágenes)
→ gestiona Conexiones sociales (Amistad)
→ acumula Puntos (vía Académica y Consumo de Recursos)
→ desbloquea Insignias y Niveles

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
   Points

id

student_id

source (academic | attendance | event | bonus)

value

Badge

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

type

reference_id

read

created_at

Modelo Conceptual Simplificado

Usuario
→ pertenece a Classroom
→ tiene Evaluaciones
→ tiene Asistencias
→ participa en Feed
→ recibe Notificaciones
→ acumula Puntos
→ desbloquea Insignias

Este modelo es la base para el diseño en Supabase.

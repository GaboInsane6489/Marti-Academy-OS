# Sistema de Gamificación Avanzado

Martí Academy OS utiliza la gamificación no solo como un juego, sino como un motor de motivación y reconocimiento institucional. Esta lógica expande el modelo básico definido originalmente.

## 1. Dualidad de Recompensas: XP y Méritos

Para separar el progreso a largo plazo de los beneficios inmediatos, el sistema maneja dos valores:

- **XP (Experiencia)**: Puntos acumulativos que nunca se pierden. Determinan el **Nivel** institucional del estudiante.
- **Méritos (Monedas)**: Divisa virtual que el estudiante puede acumular y gastar en la **Consola de Recompensas**.

## 2. Niveles y Títulos

El progreso se divide en niveles (Lvl 1 - Lvl 50). Cada 10 niveles se desbloquea un Rango Institucional:

- **Lvl 1-10**: Iniciado
- **Lvl 11-20**: Erudito
- **Lvl 21-30**: Mentor
- **Lvl 31-40**: Embajador Martiano
- **Lvl 41-50**: Leyenda José Martí

## 3. Sistema de Rachas (Streaks)

Las rachas incentivan la constancia. Se visualizan con iconos de llamas al lado del perfil:

- **Racha de Asistencia**: Puntos extra por 5, 10 o 20 días sin faltas.
- **Responsabilidad Impecable**: Bono de XP por entregar todas las tareas de una semana antes de la fecha límite.
- **Pionero de Comunidad**: Puntos por interacción positiva constante en el feed institucional.

## 4. Retos y Logros (Badges)

Los logros se dividen en categorías con colores distintivos:

- **Académico (Azul)**: Por promedios destacados o "Mejor de la clase" en materias específicas.
- **Social (Verde)**: Por ser un gran conector o recibir reacciones positivas en el feed.
- **Mérito (Dorado)**: Por conducta ejemplar, participación en eventos y nominaciones de docentes.

## 5. Tienda de Identidad (Consola de Recompensas)

Los estudiantes pueden gastar sus Méritos en:

- **Personalización de Perfil**: Bordes de avatar animados, fondos de perfil exclusivos.
- **Identidad Social**: Emojis personalizados para reacciones.
- **Reconocimiento Público**: "Pinear" un logro en el muro de honor de la comunidad.

## 6. Temporadas (Rankings Trimestrales)

El ranking global se reinicia cada trimestre escolar para dar oportunidad a todos los estudiantes de destacar. Al final de la temporada:

- Los **Top 10** reciben un "Trofeo de Temporada" permanente en su perfil.
- El **Top 3** recibe un bono de XP para su nivel global.

---

## Lógica Técnica (Supabase)

- **Tabla `gamification_logs`**: Registra cada punto ganado para auditoría.
- **Tabla `achievements`**: Catálogo de insignias disponibles.
- **Trigger `level_up_check`**: Automatiza el incremento de nivel cuando el XP alcanza umbrales predefinidos.

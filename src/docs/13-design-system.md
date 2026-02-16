# Martí Academy OS - Design System & Aesthetic Identity

Inspirado en la jerarquía editorial y el dinamismo de "Luz Interior", Martí Academy OS adopta una estética **"Institutional Tech"**. Combinamos la sobriedad académica con la modernidad de un sistema operativo avanzado.

## 1. Paleta de Colores (Adiós al Amber)

Sustituimos el tono cálido por una gama de **Azules Eléctricos y Grises Siderales** que inspiran confianza y tecnología.

| Rol                | Color                     | Aplicación                                 |
| ------------------ | ------------------------- | ------------------------------------------ |
| **Fondo Base**     | `zinc-950` / `white`      | Fondos de página y dashboards.             |
| **Primario**       | `blue-500` / `indigo-600` | Acciones principales, botones, enlaces.    |
| **Acento Digital** | `cyan-400`                | Brillos (glows), indicadores de nivel, XP. |
| **Bordes/Glass**   | `white/10` / `black/5`    | Glassmorphism y contenedores editoriales.  |
| **Texto Título**   | `zinc-100` / `zinc-900`   | Títulos Serif.                             |
| **Texto Cuerpo**   | `zinc-400` / `zinc-600`   | Lectura general.                           |

## 2. Tipografía Editorial

- **Títulos (`font-serif`)**: Usamos una fuente Serif elegante para headings (`h1`, `h2`, `h3`). Esto evoca la "Institución" y la "Academia".
- **Interfaz (`font-sans`)**: Una fuente sans-serif geométrica y legible (Inter/Outfit) para controles, botones y datos.
- **Datos/Código (`font-mono`)**: Para IDs de estudiantes, horas y métricas técnicas.

## 3. Patrones de Diseño (Tailwind Logic)

### Contenedores "Digital Glass"

```html
<div
  class="bg-zinc-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 transition-all hover:border-blue-500/50 shadow-xl"
>
  <!-- Contenido -->
</div>
```

### Animaciones de Sistema

Utilizamos `tailwind-animate` para que el sistema se sienta "vivo":

- **Entrada de página**: `animate-in fade-in slide-in-from-bottom-4 duration-700`.
- **Hovers dinámicos**: `hover:scale-[1.02] transition-transform duration-500`.

### Jerarquía Editorial (LooksMaxxing)

- **Bloques de Texto**: Grandes espacios en blanco, líneas de sección minimalistas (`h-[1px] w-12 bg-blue-500`).
- **Gifts visuales**: Uso de gradientes sutiles (`bg-gradient-to-br from-blue-500/10 via-transparent to-transparent`).

## 4. Componentes Clave

- **Sidebar de Dashboard**: Estructura minimalista, bordes ultra-finos, iconos activos con glow cian.
- **Card de Estudiante (Vanguardia)**: Imagen a sangre (full cover), degradado negro inferior, badge de nivel en la parte superior derecha.
- **Notificaciones**: Identificadores visuales por color (Azul: Académico, Cyan: Social, Rojo: Alerta).

---

## Directrices de Implementación

1. **Sin Placeholders**: Cada imagen o video debe tener una intención pedagógica o estética institucional.
2. **Micro-interacciones**: Cada botón debe tener un estado de hover que "brille" u ofrezca feedback visual inmediato.
3. **Alto Contraste**: El texto debe ser perfectamente legible, siguiendo las normas WCAG para asegurar que todos los alumnos puedan leer sus notas sin esfuerzo.

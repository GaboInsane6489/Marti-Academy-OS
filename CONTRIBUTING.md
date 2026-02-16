# Guía de Contribución

¡Gracias por tu interés en contribuir a **Martí Academy OS**! 🎓

Este documento proporciona pautas para contribuir al proyecto de manera efectiva y mantener la calidad del código.

---

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Puedo Contribuir?](#cómo-puedo-contribuir)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Estructura de Commits](#estructura-de-commits)
- [Pull Requests](#pull-requests)

---

## 🤝 Código de Conducta

Este proyecto se adhiere a un código de conducta profesional. Al participar, se espera que mantengas un ambiente respetuoso y colaborativo.

### Comportamientos Esperados

- Usar lenguaje inclusivo y respetuoso
- Aceptar críticas constructivas
- Enfocarse en lo mejor para la comunidad educativa
- Mostrar empatía hacia otros colaboradores

---

## 🚀 ¿Cómo Puedo Contribuir?

### Reportar Bugs

Si encuentras un bug, por favor abre un **Issue** con:

- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs. comportamiento actual
- Screenshots (si aplica)
- Información del entorno (navegador, OS, versión de Node.js)

### Sugerir Mejoras

Para proponer nuevas características:

- Abre un **Issue** con la etiqueta `enhancement`
- Describe el problema que resuelve
- Propón una solución técnica
- Considera el impacto en el rendimiento y la UX

### Contribuir con Código

1. Busca un Issue abierto o crea uno nuevo
2. Comenta en el Issue que trabajarás en él
3. Sigue el [Proceso de Desarrollo](#proceso-de-desarrollo)

---

## 🛠️ Proceso de Desarrollo

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/Marti-Academy-OS.git
cd Marti-Academy-OS
```

### 2. Configurar Upstream

```bash
git remote add upstream https://github.com/GaboInsane6489/Marti-Academy-OS.git
git fetch upstream
```

### 3. Crear una Rama

```bash
# Nomenclatura: tipo/descripcion-corta
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

**Tipos de ramas**:

- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `perf/` - Mejoras de rendimiento
- `test/` - Añadir o corregir tests

### 4. Desarrollar

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Ejecutar linter
pnpm lint
```

### 5. Commit

Sigue la [Estructura de Commits](#estructura-de-commits)

### 6. Push y Pull Request

```bash
git push origin feature/nueva-funcionalidad
```

Luego abre un Pull Request en GitHub.

---

## 📝 Estándares de Código

### JavaScript/React

- Usa **componentes funcionales** con hooks
- Prefiere **arrow functions** para componentes
- Usa **destructuring** para props
- Nombra componentes en **PascalCase**
- Nombra archivos de componentes con extensión `.jsx`

```javascript
// ✅ Bueno
export default function MiComponente({ nombre, edad }) {
  const [estado, setEstado] = useState(false);

  return (
    <div className="container">
      <h1>{nombre}</h1>
    </div>
  );
}

// ❌ Evitar
export default function MiComponente(props) {
  const [estado, setEstado] = useState(false);

  return (
    <div className="container">
      <h1>{props.nombre}</h1>
    </div>
  );
}
```

### Tailwind CSS

- Usa clases de utilidad en lugar de CSS custom
- Agrupa clases relacionadas (layout, spacing, colors)
- Usa el sistema de diseño definido (colores, espaciado)

```jsx
// ✅ Bueno
<div className="flex items-center gap-4 p-6 bg-zinc-900 rounded-2xl">

// ❌ Evitar
<div className="p-6 flex rounded-2xl gap-4 items-center bg-zinc-900">
```

### Supabase

- Usa **Row Level Security (RLS)** en todas las tablas
- Nombra políticas descriptivamente
- Documenta funciones SQL con comentarios
- Usa `SECURITY DEFINER` solo cuando sea necesario

---

## 📦 Estructura de Commits

Seguimos **Conventional Commits** para mantener un historial limpio:

```
tipo(alcance): descripción corta

[cuerpo opcional]

[footer opcional]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan la lógica)
- `refactor`: Refactorización de código
- `perf`: Mejoras de rendimiento
- `test`: Añadir o corregir tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
feat(gamification): add leaderboard component

fix(auth): resolve infinite redirect loop on login

docs(readme): update installation instructions

perf(middleware): implement role caching in cookies
```

---

## 🔍 Pull Requests

### Checklist antes de enviar

- [ ] El código sigue los estándares del proyecto
- [ ] Los commits siguen Conventional Commits
- [ ] La funcionalidad ha sido probada localmente
- [ ] No hay errores de linting (`pnpm lint`)
- [ ] La documentación ha sido actualizada (si aplica)
- [ ] Las migraciones SQL están incluidas (si aplica)

### Plantilla de PR

```markdown
## Descripción

Breve descripción de los cambios realizados.

## Tipo de Cambio

- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo se ha probado?

Describe las pruebas realizadas.

## Screenshots (si aplica)

Añade capturas de pantalla.

## Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado una auto-revisión
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
```

---

## 🧪 Testing

Actualmente el proyecto no tiene tests automatizados, pero se espera que:

- Pruebes manualmente todas las funcionalidades nuevas
- Verifiques que no rompas funcionalidades existentes
- Pruebes en diferentes navegadores (Chrome, Firefox, Safari)
- Pruebes en diferentes tamaños de pantalla (móvil, tablet, desktop)

---

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Tailwind CSS](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ ¿Necesitas Ayuda?

Si tienes dudas:

1. Revisa la [documentación técnica](src/docs/)
2. Busca en Issues cerrados
3. Abre un nuevo Issue con la etiqueta `question`

---

**¡Gracias por contribuir a Martí Academy OS!** 🎓✨

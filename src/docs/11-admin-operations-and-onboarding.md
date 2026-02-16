# Operaciones de Administración y Onboarding

El rol de la Dirección es el centro neurálgico del sistema. Su responsabilidad es garantizar la integridad de la comunidad educativa y supervisar el funcionamiento global.

## 1. Onboarding Institucional (Gestión de Usuarios)

### Creación de Docentes (Flujo Admin)

- **Carga Centralizada**: Los administradores crean las cuentas de los docentes (Nombre, Correo Institucional, Cargo).
- **Contraseñas Provisionales**: Generación de contraseñas seguras temporales.
- **Invitación Profesional**: Al ser creado, el docente recibe un correo con estética institucional dándole la bienvenida y las instrucciones de acceso.

### Registro de Estudiantes (Auto-gestión)

- **Registro Abierto**: Los estudiantes pueden registrarse por cuenta propia.
- **Validación de Identidad**: Proceso de confirmación por correo electrónico (OTP o Link) para verificar la autenticidad.
- **Asignación de Aula**: Tras el registro, el administrador debe "Aprobar" o "Vincular" al estudiante a su año y sección correspondiente antes de que este pueda acceder a los datos académicos.

## 2. Experiencia de Acceso (Auth UX)

### Portal de Identidad

El login no es solo un formulario; es la puerta de entrada al ecosistema. El diseño debe:

- **Claridad de Propósito**: Mensajes explicativos sobre las funcionalidades del sistema (Gestión, Comunidad, Gamificación).
- **Secciones Informativas**: Breve resumen de "Qué hay de nuevo" o "Misión del Colegio" en la pantalla de acceso.
- **Google OAuth**: Integración con "Iniciar sesión con Google" para facilidad y seguridad, especialmente útil para perfiles corporativos/docentes.

### Comunicaciones Profesionales

- **Emails Transaccionales**: Uso de plantillas HTML premium para confirmaciones, recuperaciones de contraseña y bienvenidas.
- **Seguridad**: Confirmación obligatoria de correo para activar cualquier cuenta.

## 3. Responsabilidades y Poderes Administrative

- **Control Total**: Edición de cualquier perfil, materia o registro asistencial en caso de error.
- **Configuración Global**: Ajuste de periodos académicos, escalas de notas y parámetros de gamificación.
- **Auditoría**: Visualización de quién hizo qué y cuándo (logs de actividad).
- **Mensajería Masiva**: Enviar notificaciones de alta prioridad a toda la institución o a grupos específicos.

---

## Estándares de Seguridad Supabase (Optimización RLS)

Siguiendo la investigación de optimización, aplicaremos:

- **Políticas RLS Simples**: Evitaremos subconsultas complejas dentro de las políticas para no penalizar el rendimiento.
- **Caché de Autoría**: Uso de funciones `SECURITY DEFINER` y `RPC` para validaciones pesadas, reduciendo la latencia en el cliente.

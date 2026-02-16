# Estándares de Optimización Supabase

Para alcanzar métricas de performance de 90-100, Martí Academy OS seguirá estos estándares técnicos en su integración con Supabase.

## 1. Eficiencia en PostgreSQL

- **Indexación Inteligente**:
  - Índices B-tree en todas las claves foráneas y columnas de filtro (`user_id`, `classroom_id`, `status`).
  - **Índices Parciales**: Para estados comunes (Ej: `CREATE INDEX idx_active_students ON profiles (id) WHERE status = 'active'`).
  - **Índices Compuestos**: Para consultas que filtran por varios campos a la vez (Ej: `classroom_id` + `day_of_week` en horarios).
- **Consultas Granulares**: Queda prohibido el uso de `SELECT *`. Cada consulta debe especificar sus columnas: `.select('id, name, avatar_url')`.
- **Vistas Materializadas**: Se usarán para el Ranking Global y estadísticas trimestrales, refrescándose mediante un cron job (pg_cron) para no impactar la lectura en tiempo real.

## 2. Gestión de Red y Carga

- **Paginación Obligatoria**: Todas las listas (Feed, Notificaciones, Comunidad) deben implementar `.range()` con un tamaño de página de 20-50 elementos.
- **Lógica en Servidor (RPC)**: Procesos complejos como el cálculo de nivel tras ganar XP se manejarán vía `Database Functions` (RPC) para reducir el tráfico de red.
- **Transformación de Imágenes**: Uso del servicio nativo de Supabase para servir avatares y covers en el tamaño exacto del contenedor y formato WebP.
- **Cache-Control**: Configuración de headers de caché agresivos para recursos estáticos y documentos en Storage.

## 3. Seguridad y RLS de Alto Rendimiento

- **RLS Optimizados**: Las políticas deben evitar subconsultas (`IN (SELECT...)`). Se preferirá el uso de `auth.uid()` directo o funciones simples que Postgres pueda cachear.
- **Índices de Autorización**: Asegurar que las columnas usadas en las validaciones de RLS estén indexadas para evitar "Sequential Scans" en cada petición.

## 4. Diagnóstico Continuo

- **EXPLAIN ANALYZE**: Obligatorio para cualquier query que tarde más de 100ms.
- **Query Performance Advisor**: Revisión semanal de las sugerencias del panel de Supabase para añadir o ajustar índices según el tráfico real.

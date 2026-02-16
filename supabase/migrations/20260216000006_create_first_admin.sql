-- =====================================================
-- GUÍA: Crear Primera Cuenta de Administrador
-- =====================================================
-- Usuario: Deglis García
-- Email: profe.deglisgarcia@gmail.com
-- Rol: Admin + Docente

-- ⚠️ IMPORTANTE: Este archivo NO es una migración ejecutable.
-- Es una GUÍA de instrucciones paso a paso.

-- =====================================================
-- INSTRUCCIONES PASO A PASO:
-- =====================================================

-- PASO 1: Crear usuario en Supabase Auth Dashboard
-- 1. Ve a: Authentication > Users > "Add User"
-- 2. Completa el formulario:
--    - Email: profe.deglisgarcia@gmail.com
--    - Password: CanGab020405
--    - ✅ Marca "Auto Confirm User"
-- 3. Haz clic en "Create User"
-- 4. COPIA el UUID del usuario creado (aparecerá en la lista)
--    Ejemplo: 12345678-1234-1234-1234-123456789abc

-- PASO 2: Ejecuta este query EN UNA NUEVA PESTAÑA del Editor SQL
-- ⚠️ NO ejecutes este archivo completo, solo copia el UPDATE de abajo
-- y reemplaza el UUID:

/*
UPDATE public.profiles
SET 
  role = 'admin',
  full_name = 'Deglis García',
  updated_at = now()
WHERE id = 'PEGA_AQUI_EL_UUID_COPIADO';
*/

-- PASO 3: Verificar que se actualizó correctamente
-- Ejecuta este query para confirmar:

/*
SELECT id, full_name, role, created_at
FROM public.profiles
WHERE full_name = 'Deglis García';
*/

-- =====================================================
-- Notas:
-- =====================================================
-- 1. La tabla 'profiles' NO tiene columna 'email', solo 'id'
-- 2. El 'id' es el UUID del usuario de auth.users
-- 3. Los usuarios con rol 'admin' tendrán acceso automático a:
--    - Panel de administración
--    - Vistas de docente (asistencia, evaluaciones, recursos)
--
-- 4. Las materias se asignarán después desde la UI:
--    - Historia (1ro-5to, A y B)
--    - Geografía (1ro-5to, A y B)
--    - Proyecto (5to, A y B)
--
-- 5. Para los otros 2 usuarios con doble rol, repetir el proceso.

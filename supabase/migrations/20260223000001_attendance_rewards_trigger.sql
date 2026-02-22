-- Migrate: Attendance XP Reward Trigger
-- Descripción: Otorga +5 XP automáticamente cuando un estudiante es marcado como 'presente'.
-- Blindaje: Usa una columna 'xp_awarded' para asegurar que el premio solo se entregue una vez por registro.

-- 1. Añadir columna de control a la tabla de registros
ALTER TABLE public.attendance_records ADD COLUMN IF NOT EXISTS xp_awarded boolean DEFAULT false;

-- 2. Función del Trigger con lógica quirúrgica
CREATE OR REPLACE FUNCTION public.handle_attendance_xp_reward()
RETURNS TRIGGER AS $$
BEGIN
    -- Lógica:
    -- - Solo si el nuevo estado es 'presente'
    -- - Solo si el estado anterior NO era 'presente' (o es un INSERT nuevo)
    -- - Solo si xp_awarded es false (Seguridad extra contra duplicidad)
    
    IF (NEW.status = 'presente' AND 
       (TG_OP = 'INSERT' OR OLD.status != 'presente') AND 
       NEW.xp_awarded = false) THEN
        
        -- Ejecutar la función de incremento de XP ya existente en el sistema
        PERFORM public.increment_student_xp(NEW.student_id, 5);
        
        -- Marcar como otorgado para que no se repita en futuras ediciones del mismo registro
        NEW.xp_awarded := true;
        
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Creación del Trigger (BEFORE para poder modificar NEW.xp_awarded quirúrgicamente)
DROP TRIGGER IF EXISTS tr_attendance_xp_reward ON public.attendance_records;
CREATE TRIGGER tr_attendance_xp_reward
    BEFORE INSERT OR UPDATE ON public.attendance_records
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_attendance_xp_reward();

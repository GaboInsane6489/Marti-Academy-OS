-- Seed Data for Rewards Store (Badges)

INSERT INTO public.badges (name, description, icon_url, criteria_json) VALUES
('Guerrero Constante', 'Asiste 5 días seguidos a clase.', 'streak_5', '{"type": "streak", "value": 5}'),
('Cerebro Maestro', 'Obtén 20 en la evaluación de una materia.', 'grade_20', '{"type": "grade", "value": 20}'),
('Explorador Curioso', 'Consume 10 contenidos de la biblioteca.', 'resource_10', '{"type": "resource", "value": 10}'),
('Líder de Identidad', 'Personaliza completamente tu perfil institucional.', 'profile_custom', '{"type": "profile", "value": 1}')
ON CONFLICT (name) DO NOTHING;

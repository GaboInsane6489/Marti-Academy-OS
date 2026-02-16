-- Migrate: Notifications & Connections

-- 1. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'academic', 'social', 'system'
  title text NOT NULL,
  content text,
  reference_id uuid, -- Optional link to another entity
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 2. Connections (Social Friendship)
CREATE TABLE IF NOT EXISTS public.connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(requester_id, receiver_id)
);

-- Security: Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Notifications Policies: Users only see their own notifications
CREATE POLICY "Users can only view their own notifications." ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Connections Policies: Users see connections where they are requester or receiver
CREATE POLICY "Users can see their own connections." ON public.connections
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can create connection requests." ON public.connections
  FOR INSERT WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their received connection requests." ON public.connections
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Add RLS policies to user_roles table for proper access control

-- Policy 1: Allow admins to manage all roles (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy 2: Allow users to view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Restrict avatar listing: replace broad public SELECT with owner-only listing.
DROP POLICY IF EXISTS "Avatars public read" ON storage.objects;

CREATE POLICY "Users list own avatar folder"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'avatars'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- Lock down SECURITY DEFINER trigger helpers from being called via the API.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

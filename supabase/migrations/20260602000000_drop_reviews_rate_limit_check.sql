-- Remove the table-level rate-limit CHECK constraint on reviews.
--
-- A CHECK constraint re-evaluates on UPDATE as well as INSERT. Because
-- can_submit_review(session_id) returns false once a review for that session
-- already exists (within 24h), it blocked the delete-review flow (which
-- UPDATEs status -> 'deleted') for the row's own session. Rate limiting is
-- enforced at the edge-function level via can_submit_review_by_ip before
-- insert, so this table constraint is redundant and is safe to remove.
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_rate_limit_check;

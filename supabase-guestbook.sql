create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 24),
  color text not null,
  date text not null,
  msg text not null check (char_length(msg) between 1 and 200),
  created_at timestamptz not null default now()
);

alter table public.guestbook_entries enable row level security;

drop policy if exists "guestbook entries are readable" on public.guestbook_entries;
create policy "guestbook entries are readable"
on public.guestbook_entries
for select
to anon
using (true);

drop policy if exists "visitors can sign guestbook" on public.guestbook_entries;
create policy "visitors can sign guestbook"
on public.guestbook_entries
for insert
to anon
with check (
  char_length(name) between 1 and 24
  and char_length(msg) between 1 and 200
);

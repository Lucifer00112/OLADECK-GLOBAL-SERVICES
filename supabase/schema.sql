create extension if not exists "pgcrypto";

create type public.app_role as enum ('admin', 'manager', 'staff', 'customer');
create type public.clearing_status as enum (
  'Received',
  'Pending',
  'Received by Customer'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  company text,
  created_at timestamptz not null default now()
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  tracking_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  status public.clearing_status not null default 'Received',
  customer_name text not null,
  phone text not null,
  email text not null,
  company text,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year integer not null,
  country_purchased text not null,
  vin text not null,
  vehicle_condition text not null,
  engine_size text not null,
  fuel_type text not null,
  transmission text not null,
  port_of_arrival text not null,
  shipping_line text,
  container_number text,
  bill_of_lading text not null,
  arrival_date date not null,
  estimated_completion date,
  quoted_price numeric(14,2),
  notes text,
  internal_notes text,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quote_documents (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  file_type text,
  created_at timestamptz not null default now()
);

create table public.tracking_events (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  status public.clearing_status not null,
  note text,
  visible_to_customer boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  invoice_number text not null unique,
  amount numeric(14,2) not null,
  status text not null default 'pending',
  file_path text,
  due_date date,
  created_at timestamptz not null default now()
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  vehicle text not null,
  vehicle_year integer not null,
  port text not null,
  completed_at date not null,
  category text not null,
  image_path text not null,
  sort_order integer not null default 0,
  published boolean not null default true
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  status text not null default 'draft',
  scheduled_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create table public.cms_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.port_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.vehicle_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  origin text not null,
  created_at timestamptz not null default now()
);

create table public.vehicle_models (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.vehicle_brands(id) on delete cascade,
  name text not null,
  body_type text not null,
  image_path text not null,
  created_at timestamptz not null default now(),
  unique (brand_id, name)
);

create table public.vehicle_generations (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references public.vehicle_models(id) on delete cascade,
  generation text not null,
  year_from integer not null,
  year_to integer,
  year_to_label text,
  fuel text not null,
  origin text not null,
  created_at timestamptz not null default now(),
  unique (model_id, generation, year_from)
);

create table public.service_prices (
  id text primary key,
  service text not null,
  base_price numeric(14,2) not null,
  unit text not null,
  description text not null,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger quotes_touch_updated_at
before update on public.quotes
for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_documents enable row level security;
alter table public.tracking_events enable row level security;
alter table public.invoices enable row level security;
alter table public.gallery_items enable row level security;
alter table public.blog_posts enable row level security;
alter table public.cms_content enable row level security;
alter table public.port_updates enable row level security;
alter table public.vehicle_brands enable row level security;
alter table public.vehicle_models enable row level security;
alter table public.vehicle_generations enable row level security;
alter table public.service_prices enable row level security;
alter table public.audit_logs enable row level security;

create policy "Public can create quotes" on public.quotes
for insert with check (true);

create policy "Published gallery is readable" on public.gallery_items
for select using (published = true);

create policy "Published posts are readable" on public.blog_posts
for select using (status = 'published' and published_at <= now());

create policy "Published port updates are readable" on public.port_updates
for select using (published = true);

create policy "Vehicle brands are readable" on public.vehicle_brands
for select using (true);

create policy "Vehicle models are readable" on public.vehicle_models
for select using (true);

create policy "Vehicle generations are readable" on public.vehicle_generations
for select using (true);

create policy "Public can read active service prices" on public.service_prices
for select using (active = true);

create policy "Staff can manage operational tables" on public.quotes
for all using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'manager', 'staff')
  )
);

create policy "Staff can manage documents" on public.quote_documents
for all using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'manager', 'staff')
  )
);

create policy "Staff can manage prices" on public.service_prices
for all using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'manager')
  )
);

create policy "Staff can manage vehicle catalog" on public.vehicle_brands
for all using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'manager')
  )
);

create policy "Staff can manage vehicle models" on public.vehicle_models
for all using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'manager')
  )
);

create policy "Staff can manage vehicle generations" on public.vehicle_generations
for all using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'manager')
  )
);

create index quotes_tracking_idx on public.quotes (tracking_number);
create index quotes_vin_idx on public.quotes (vin);
create index quotes_status_idx on public.quotes (status);

insert into public.service_prices (id, service, base_price, unit, description)
values
  ('customs-clearance', 'Vehicle Customs Clearance', 650000, 'per vehicle', 'Core customs processing, documentation review, and status management.'),
  ('duty-processing', 'Duty Processing Assistance', 250000, 'per assessment', 'Duty memo coordination and payment confirmation support.'),
  ('port-documentation', 'Port Documentation', 180000, 'per shipment', 'Terminal, shipping line, and release documentation support.'),
  ('delivery-coordination', 'Delivery Coordination', 320000, 'Lagos metro', 'Pickup scheduling, handover, and last-mile delivery coordination.'),
  ('fast-track', 'Emergency Fast Track Assistance', 450000, 'priority case', 'Priority desk attention for qualified urgent clearances.'),
  ('fleet', 'Fleet Clearance', 550000, 'per vehicle', 'Discountable base rate for multi-vehicle corporate shipments.');

insert into public.vehicle_brands (name, origin)
values
  ('Toyota', 'Japan'),
  ('Lexus', 'Japan'),
  ('Honda', 'Japan'),
  ('Nissan', 'Japan'),
  ('Mercedes-Benz', 'Germany'),
  ('BMW', 'Germany'),
  ('Ford', 'USA'),
  ('Hyundai', 'South Korea'),
  ('Kia', 'South Korea'),
  ('Peugeot', 'France'),
  ('BYD', 'China'),
  ('Tata', 'India')
on conflict (name) do nothing;

insert into public.vehicle_models (brand_id, name, body_type, image_path)
select id, model_name, body_type, image_path
from public.vehicle_brands
cross join lateral (
  values
    ('Corolla', 'Sedan', 'catalog/toyota-corolla.jpg'),
    ('Camry', 'Sedan', 'catalog/toyota-camry.jpg'),
    ('Sienna', 'Minivan', 'catalog/toyota-sienna.jpg'),
    ('RAV4', 'SUV', 'catalog/toyota-rav4.jpg'),
    ('Hilux', 'Pickup', 'catalog/toyota-hilux.jpg'),
    ('HiAce', 'Bus', 'catalog/toyota-hiace.jpg')
) as toyota_models(model_name, body_type, image_path)
where name = 'Toyota'
on conflict (brand_id, name) do nothing;

insert into public.vehicle_generations (model_id, generation, year_from, year_to, year_to_label, fuel, origin)
select vehicle_models.id, generation, year_from, year_to, year_to_label, fuel, 'Japan'
from public.vehicle_models
join public.vehicle_brands on vehicle_brands.id = vehicle_models.brand_id
cross join lateral (
  values
    ('E90', 1987, 1992, null, 'Petrol'),
    ('E100', 1991, 1998, null, 'Petrol'),
    ('E110', 1995, 2002, null, 'Petrol'),
    ('E120', 2000, 2007, null, 'Petrol'),
    ('E140', 2006, 2013, null, 'Petrol'),
    ('E170', 2013, 2019, null, 'Petrol'),
    ('E210', 2018, null, 'Present', 'Petrol/Hybrid')
) as corolla_generations(generation, year_from, year_to, year_to_label, fuel)
where vehicle_brands.name = 'Toyota' and vehicle_models.name = 'Corolla'
on conflict (model_id, generation, year_from) do nothing;

insert into public.gallery_items (vehicle, vehicle_year, port, completed_at, category, image_path, sort_order)
values
  ('Toyota Corolla', 2014, 'Tin Can Island', current_date, 'Sedans', 'gallery/toyota-corolla.jpg', 1),
  ('Toyota Camry', 2012, 'Apapa', current_date, 'Sedans', 'gallery/toyota-camry.jpg', 2),
  ('Honda Accord', 2010, 'PTML', current_date, 'Sedans', 'gallery/honda-accord.jpg', 3),
  ('Toyota Sienna', 2011, 'Tin Can Island', current_date, 'Commercial', 'gallery/toyota-sienna.jpg', 4),
  ('Toyota Hilux', 2014, 'Apapa', current_date, 'Commercial', 'gallery/toyota-hilux.jpg', 5),
  ('Toyota RAV4', 2015, 'Onne', current_date, 'SUVs', 'gallery/toyota-rav4.jpg', 6);

insert into public.blog_posts (slug, title, excerpt, body, status, seo_title, seo_description, published_at)
values
  (
    'documents-required-for-nigeria-vehicle-clearance',
    'Documents Required for Vehicle Clearance in Nigeria',
    'A practical list of customs, shipping, and ownership documents to prepare before your vehicle arrives.',
    'Prepare bill of lading, invoice, title, identification, and supporting shipment records before vessel arrival.',
    'published',
    'Documents Required for Nigeria Vehicle Clearance',
    'Prepare vehicle import documents for Nigerian customs clearance.',
    now()
  );

insert into public.port_updates (title, body)
values
  ('PTML weekend inspection window extended', 'Vehicle inspection teams are accepting pre-booked appointments through Saturday morning.'),
  ('Tin Can Island container release advisory', 'Clients with complete terminal payments should upload receipts before arrival confirmation.');

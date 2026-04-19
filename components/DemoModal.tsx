'use client';

import Link from 'next/link';
import {AnimatePresence, motion} from 'framer-motion';
import {CheckCircle2, Monitor, ShoppingBag, Smartphone, Star, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useEffect, useMemo, useState} from 'react';
import type {Site} from '@/data/sites';
import type {AppLocale} from '@/i18n/routing';
import {cn} from '@/lib/utils';

type DemoModalProps = {
  locale: AppLocale;
  open: boolean;
  site: Site | null;
  onClose?: () => void;
  standalone?: boolean;
};

type Viewport = 'mobile' | 'desktop';

function DemoShell({
  children,
  siteId,
  t,
  viewport,
  setViewport
}: {
  children: React.ReactNode;
  siteId: string;
  t: ReturnType<typeof useTranslations>;
  viewport: Viewport;
  setViewport: (value: Viewport) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1">
        {(['mobile', 'desktop'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setViewport(mode)}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold',
              viewport === mode ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
            )}
          >
            {mode === 'mobile' ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
            {t(mode)}
          </button>
        ))}
      </div>

      <div
        className={cn(
          'mx-auto overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d16] shadow-glow',
          viewport === 'mobile' ? 'max-w-[390px]' : 'max-w-5xl'
        )}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <div className="ml-4 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
            aytrix-preview.local/{siteId}
          </div>
        </div>
        <div className={cn('bg-slate-950', viewport === 'desktop' ? 'min-h-[620px]' : 'min-h-[680px]')}>
          {children}
        </div>
      </div>
    </div>
  );
}

function BrowserTabs<T extends string>({
  items,
  active,
  onChange
}: {
  items: {id: T; label: string}[];
  active: T;
  onChange: (tab: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={cn(
            'inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium',
            active === item.id
              ? 'border-cyan-400/40 bg-cyan-400/10 text-white'
              : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Stat({label, value}: {label: string; value: string}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function Panel({children}: {children: React.ReactNode}) {
  return <div className="rounded-3xl border border-white/10 bg-white/5 p-5">{children}</div>;
}

function Field({label}: {label: string}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-400">
      {label}
    </div>
  );
}

function CardGrid({
  viewport,
  children
}: {
  viewport: Viewport;
  children: React.ReactNode;
}) {
  return <div className={cn('grid gap-4', viewport === 'desktop' ? 'md:grid-cols-3' : 'grid-cols-1')}>{children}</div>;
}

function RestaurantDemo({viewport}: {viewport: Viewport}) {
  const t = useTranslations('demo.restaurant');
  const common = useTranslations('common');
  const [tab, setTab] = useState<'menu' | 'reservation' | 'reviews'>('menu');
  const [category, setCategory] = useState<'starters' | 'mains' | 'desserts'>('starters');
  const [cartCount, setCartCount] = useState(0);
  const menu = {
    starters: ['Briouates safran', 'Salade du jardin', 'Velouté du jour'],
    mains: ['Tajine signature', 'Pasta al forno', 'Sea bass grillé'],
    desserts: ['Tiramisu dattes', 'Cheesecake fleur d’oranger', 'Fruit bowl']
  } as const;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-orange-500/20 to-red-500/10 p-5">
        <div className={cn('grid gap-4', viewport === 'desktop' ? 'md:grid-cols-[1.2fr_0.8fr]' : 'grid-cols-1')}>
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-orange-200">Riad Atelier</p>
            <h3 className="mt-3 text-3xl font-bold text-white">Dining demo with live menu actions</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Stat label="Cart" value={`${cartCount} items`} />
            <Stat label="Tables" value="12 open" />
          </div>
        </div>
      </div>

      <BrowserTabs
        active={tab}
        onChange={setTab}
        items={[
          {id: 'menu', label: t('tabs.menu')},
          {id: 'reservation', label: t('tabs.reservation')},
          {id: 'reviews', label: t('tabs.reviews')}
        ]}
      />

      {tab === 'menu' ? (
        <>
          <BrowserTabs
            active={category}
            onChange={setCategory}
            items={[
              {id: 'starters', label: t('categories.starters')},
              {id: 'mains', label: t('categories.mains')},
              {id: 'desserts', label: t('categories.desserts')}
            ]}
          />
          <CardGrid viewport={viewport}>
            {menu[category].map((item, index) => (
              <Panel key={item}>
                <div className="h-32 rounded-3xl bg-gradient-to-br from-orange-500/30 to-red-500/15" />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{item}</h4>
                    <p className="mt-1 text-sm text-slate-400">Premium product card with CTA and quick details.</p>
                  </div>
                  <span className="text-sm font-semibold text-orange-200">{35 + index * 15} MAD</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCartCount((count) => count + 1)}
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-900"
                >
                  {common('addToCart')}
                </button>
              </Panel>
            ))}
          </CardGrid>
        </>
      ) : null}

      {tab === 'reservation' ? (
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel>
            <p className="text-sm text-slate-400">Available slots</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {['19:00', '20:30', '22:00', '23:00'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 text-sm font-medium text-slate-200"
                >
                  {slot}
                </button>
              ))}
            </div>
          </Panel>
          <Panel>
            <h4 className="text-lg font-semibold text-white">Reservation form</h4>
            <div className="mt-4 grid gap-3">
              {['Full name', 'Phone number', 'Guests', 'Special request'].map((field) => (
                <Field key={field} label={field} />
              ))}
            </div>
            <button
              type="button"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-orange-400 text-sm font-semibold text-slate-900"
            >
              {common('confirmed')}
            </button>
          </Panel>
        </div>
      ) : null}

      {tab === 'reviews' ? (
        <CardGrid viewport={viewport}>
          {['Elegant reservation flow.', 'Menu browsing feels premium.', 'Fast mobile conversion.'].map((quote) => (
            <Panel key={quote}>
              <div className="flex items-center gap-1 text-yellow-300">
                {Array.from({length: 5}).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{quote}</p>
            </Panel>
          ))}
        </CardGrid>
      ) : null}
    </div>
  );
}

function EcommerceDemo({viewport}: {viewport: Viewport}) {
  const t = useTranslations('demo.ecommerce');
  const common = useTranslations('common');
  const [tab, setTab] = useState<'shop' | 'cart' | 'collections'>('shop');
  const [cart, setCart] = useState<string[]>([]);
  const products = ['Leather Weekender', 'Minimal Watch', 'Studio Hoodie'];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/10 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-pink-200">Atelier Shop</p>
            <h3 className="mt-3 text-3xl font-bold text-white">Storefront with live cart preview</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            <ShoppingBag className="h-4 w-4" />
            {cart.length} items
          </div>
        </div>
      </div>

      <BrowserTabs
        active={tab}
        onChange={setTab}
        items={[
          {id: 'shop', label: t('tabs.shop')},
          {id: 'cart', label: t('tabs.cart')},
          {id: 'collections', label: t('tabs.collections')}
        ]}
      />

      {tab === 'shop' ? (
        <CardGrid viewport={viewport}>
          {products.map((product, index) => (
            <Panel key={product}>
              <div className="flex h-40 items-start justify-between rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/15 p-4">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  {index === 1 ? 'Best-seller' : 'New'}
                </span>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-white">{product}</h4>
              <p className="mt-1 text-sm text-slate-400">{280 + index * 140} MAD</p>
              <button
                type="button"
                onClick={() => setCart((items) => [...items, product])}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-900"
              >
                {common('addToCart')}
              </button>
            </Panel>
          ))}
        </CardGrid>
      ) : null}

      {tab === 'cart' ? (
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel>
            <h4 className="text-lg font-semibold text-white">Cart preview</h4>
            <div className="mt-4 space-y-3">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200"
                  >
                    <span>{item}</span>
                    <span>1x</span>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-slate-400">
                  Add products from the store tab to see them here.
                </div>
              )}
            </div>
          </Panel>
          <Panel>
            <h4 className="text-lg font-semibold text-white">Checkout block</h4>
            <div className="mt-4 grid gap-3">
              {['Express checkout', 'Secure payment', 'Order summary'].map((field) => (
                <Field key={field} label={field} />
              ))}
            </div>
          </Panel>
        </div>
      ) : null}

      {tab === 'collections' ? (
        <CardGrid viewport={viewport}>
          {['Spring edit', 'Gift sets', 'Office essentials'].map((item) => (
            <Panel key={item}>
              <div className="h-32 rounded-3xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/10" />
              <h4 className="mt-4 text-lg font-semibold text-white">{item}</h4>
            </Panel>
          ))}
        </CardGrid>
      ) : null}
    </div>
  );
}

function GenericDemo({
  viewport,
  theme,
  title,
  subtitle,
  tabs,
  overviewCards,
  formFields,
  stats,
  gallery
}: {
  viewport: Viewport;
  theme: string;
  title: string;
  subtitle: string;
  tabs: [string, string, string];
  overviewCards: string[];
  formFields: string[];
  stats: [string, string][];
  gallery: string[];
}) {
  const [tab, setTab] = useState<'one' | 'two' | 'three'>('one');

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className={cn('rounded-[28px] border border-white/10 p-5', theme)}>
        <h3 className="text-3xl font-bold text-white">{title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{subtitle}</p>
      </div>

      <BrowserTabs
        active={tab}
        onChange={setTab}
        items={[
          {id: 'one', label: tabs[0]},
          {id: 'two', label: tabs[1]},
          {id: 'three', label: tabs[2]}
        ]}
      />

      {tab === 'one' ? (
        <CardGrid viewport={viewport}>
          {overviewCards.map((item) => (
            <Panel key={item}>
              <div className={cn('h-36 rounded-3xl', theme)} />
              <h4 className="mt-4 text-lg font-semibold text-white">{item}</h4>
              <p className="mt-2 text-sm text-slate-400">Interactive section with focused CTA and content hierarchy.</p>
            </Panel>
          ))}
        </CardGrid>
      ) : null}

      {tab === 'two' ? (
        <div className={cn('grid gap-4', viewport === 'desktop' ? 'md:grid-cols-3' : 'grid-cols-1')}>
          {stats.map(([label, value]) => (
            <Stat key={label} label={label} value={value} />
          ))}
        </div>
      ) : null}

      {tab === 'three' ? (
        <div className={cn('grid gap-4', viewport === 'desktop' ? 'md:grid-cols-2' : 'grid-cols-1')}>
          <Panel>
            <div className="grid gap-3">
              {formFields.map((field) => (
                <Field key={field} label={field} />
              ))}
            </div>
          </Panel>
          <Panel>
            <div className={cn('grid gap-3', viewport === 'desktop' ? 'grid-cols-2' : 'grid-cols-2')}>
              {gallery.map((item) => (
                <div key={item} className={cn('h-24 rounded-2xl', theme)} />
              ))}
            </div>
          </Panel>
        </div>
      ) : null}
    </div>
  );
}

function SiteDemo({site, viewport}: {site: Site; viewport: Viewport}) {
  switch (site.id) {
    case 'restaurant':
      return <RestaurantDemo viewport={viewport} />;
    case 'ecommerce':
      return <EcommerceDemo viewport={viewport} />;
    case 'portfolio':
      return (
        <GenericDemo
          viewport={viewport}
          theme="bg-gradient-to-br from-blue-500/20 to-cyan-500/10"
          title="Portfolio demo with project switching"
          subtitle="Showcase work, process and lead capture in a layout built for freelancers and studios."
          tabs={['Projects', 'Metrics', 'Contact']}
          overviewCards={['Identity System', 'Launch Campaign', 'Editorial Direction']}
          formFields={['Full name', 'Email address', 'Project scope', 'Budget range']}
          stats={[
            ['Experience', '8 years'],
            ['Projects', '52 launches'],
            ['Availability', 'Open for Q2']
          ]}
          gallery={['one', 'two', 'three', 'four']}
        />
      );
    case 'clinic':
      return (
        <GenericDemo
          viewport={viewport}
          theme="bg-gradient-to-br from-green-500/20 to-teal-500/10"
          title="Clinic booking experience"
          subtitle="Patients can browse departments, compare doctors and request appointments from one interface."
          tabs={['Appointments', 'Departments', 'Doctors']}
          overviewCards={['Cardiology', 'Dermatology', 'Pediatrics']}
          formFields={['Patient name', 'Phone number', 'Doctor', 'Preferred slot']}
          stats={[
            ['Doctors', '12'],
            ['Slots open', '24'],
            ['Urgent line', '24/7']
          ]}
          gallery={['one', 'two', 'three', 'four']}
        />
      );
    case 'realestate':
      return (
        <GenericDemo
          viewport={viewport}
          theme="bg-gradient-to-br from-yellow-500/20 to-orange-500/10"
          title="Property discovery with filters and visits"
          subtitle="Built for brokers and agencies that need fast browsing, maps and visit requests."
          tabs={['Listings', 'Filters', 'Visit']}
          overviewCards={['Modern loft', 'Beach villa', 'City apartment']}
          formFields={['Preferred date', 'Preferred time', 'Agent note', 'WhatsApp number']}
          stats={[
            ['Properties', '84'],
            ['Cities', '6'],
            ['Leads', '+29%']
          ]}
          gallery={['one', 'two', 'three', 'four']}
        />
      );
    case 'gym':
      return (
        <GenericDemo
          viewport={viewport}
          theme="bg-gradient-to-br from-red-500/20 to-pink-500/10"
          title="Membership and coaching flow"
          subtitle="Display plans, class schedules and coach booking in a conversion-first mobile experience."
          tabs={['Plans', 'Schedule', 'Coaches']}
          overviewCards={['Start', 'Elite', 'Performance']}
          formFields={['Full name', 'Goal', 'Membership', 'Phone']}
          stats={[
            ['Members', '430'],
            ['Classes/week', '28'],
            ['Coach slots', '12']
          ]}
          gallery={['one', 'two', 'three', 'four']}
        />
      );
    case 'hotel':
      return (
        <GenericDemo
          viewport={viewport}
          theme="bg-gradient-to-br from-indigo-500/20 to-purple-500/10"
          title="Boutique hospitality booking experience"
          subtitle="Room selection, amenity storytelling and premium reservation blocks for riads and hotels."
          tabs={['Rooms', 'Amenities', 'Booking']}
          overviewCards={['Suite Riad', 'Patio Room', 'Panorama Loft']}
          formFields={['Check-in', 'Check-out', 'Guests', 'Special notes']}
          stats={[
            ['Rooms', '18'],
            ['Occupancy', '87%'],
            ['Reviews', '4.9/5']
          ]}
          gallery={['one', 'two', 'three', 'four']}
        />
      );
    case 'agency':
      return (
        <GenericDemo
          viewport={viewport}
          theme="bg-gradient-to-br from-slate-500/20 to-gray-700/10"
          title="Business website with sales storytelling"
          subtitle="Combine service detail pages, proof sections and proposal-ready forms in a modern agency layout."
          tabs={['Services', 'Cases', 'Brief']}
          overviewCards={['Brand strategy', 'Website design', 'Content systems']}
          formFields={['Company name', 'Service focus', 'Target clients', 'Project budget']}
          stats={[
            ['Lead lift', '+38%'],
            ['Delivery', '10 days'],
            ['Focus', 'B2B growth']
          ]}
          gallery={['one', 'two', 'three', 'four']}
        />
      );
    case 'school':
      return (
        <GenericDemo
          viewport={viewport}
          theme="bg-gradient-to-br from-cyan-500/20 to-blue-500/10"
          title="School and training enrollment demo"
          subtitle="Present programs, schedules and application flows in a structured and credible format."
          tabs={['Programs', 'Calendar', 'Apply']}
          overviewCards={['Digital marketing', 'Web design', 'Business English']}
          formFields={['Student name', 'Program choice', 'Email', 'Phone']}
          stats={[
            ['Programs', '16'],
            ['Students', '900+'],
            ['Certificates', 'ISO-ready']
          ]}
          gallery={['one', 'two', 'three', 'four']}
        />
      );
    case 'beauty':
      return (
        <GenericDemo
          viewport={viewport}
          theme="bg-gradient-to-br from-pink-500/20 to-rose-500/10"
          title="Beauty booking and transformation gallery"
          subtitle="Designed for spas and salons that need premium presentation with instant booking intent."
          tabs={['Treatments', 'Gallery', 'Booking']}
          overviewCards={['Glow facial', 'Hair ritual', 'Bridal package']}
          formFields={['Client name', 'Preferred date', 'Preferred stylist', 'WhatsApp']}
          stats={[
            ['Stylists', '8'],
            ['Bookings/day', '23'],
            ['Retention', '74%']
          ]}
          gallery={['one', 'two', 'three', 'four']}
        />
      );
    default:
      return null;
  }
}

export default function DemoModal({
  locale,
  open,
  site,
  onClose,
  standalone = false
}: DemoModalProps) {
  const t = useTranslations('showcase');
  const [viewport, setViewport] = useState<Viewport>('mobile');

  useEffect(() => {
    if (standalone || !open) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, standalone]);

  useEffect(() => {
    if (!open || standalone || !onClose) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open, standalone]);

  const content = useMemo(() => {
    if (!site) {
      return null;
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{t('modalTitle')}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                {site.icon}
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">{site.name[locale]}</h3>
                <p className="mt-1 text-sm text-slate-400">{t('startingFrom', {price: site.price.basic})}</p>
              </div>
            </div>
          </div>
          {!standalone && onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              aria-label={t('close')}
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {site.services[locale].map((service) => (
            <span
              key={`${site.id}-${service}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
            >
              <CheckCircle2 className="h-4 w-4 text-cyan-300" />
              {service}
            </span>
          ))}
        </div>

        <DemoShell
          siteId={site.id}
          t={t}
          viewport={viewport}
          setViewport={setViewport}
        >
          <SiteDemo site={site} viewport={viewport} />
        </DemoShell>

        <Link
          href="https://wa.me/212716271733?text=Bonjour%20Aytrix,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20un%20site%20web"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[52px] items-center rounded-full bg-aytrix-gradient px-6 text-sm font-semibold text-white shadow-glow"
        >
          {t('cta')}
        </Link>
      </div>
    );
  }, [locale, onClose, site, standalone, t, viewport]);

  if (standalone) {
    return <div className="glass-panel rounded-[32px] p-4 sm:p-6">{content}</div>;
  }

  return (
    <AnimatePresence>
      {open && site ? (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#05050a]/88 px-4 py-6 backdrop-blur-md sm:px-6 sm:py-8"
          onClick={onClose}
        >
          <motion.div
            initial={{opacity: 0, y: 40, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 24, scale: 0.98}}
            transition={{duration: 0.28, ease: 'easeOut'}}
            className="section-shell glass-panel rounded-[32px] p-4 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            {content}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

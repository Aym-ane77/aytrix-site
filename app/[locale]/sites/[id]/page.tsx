import Link from 'next/link';
import {unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import DemoModal from '@/components/DemoModal';
import {getSiteById, sites} from '@/data/sites';
import {routing, type AppLocale} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    sites.map((site) => ({locale, id: site.id}))
  );
}

export default async function SitePreviewPage({
  params
}: {
  params: Promise<{locale: string; id: string}>;
}) {
  const {locale, id} = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  const site = getSiteById(id);

  if (!site) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-aytrix-bg px-4 py-8 sm:px-6">
      <div className="section-shell space-y-6">
        <Link
          href={`/${locale}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white"
        >
          ← Aytrix
        </Link>
        <DemoModal locale={locale as AppLocale} onClose={undefined} open site={site} standalone />
      </div>
    </main>
  );
}

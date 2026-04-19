import type {Metadata} from 'next';
import Link from 'next/link';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import DemoModal from '@/components/DemoModal';
import {getSiteById, sites} from '@/data/sites';
import {routing, type AppLocale} from '@/i18n/routing';

const siteUrl = 'https://aytrix-site.vercel.app';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    sites.map((site) => ({locale, id: site.id}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; id: string}>;
}): Promise<Metadata> {
  const {locale, id} = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    return {};
  }

  const site = getSiteById(id);

  if (!site) {
    return {};
  }

  const typedLocale = locale as AppLocale;
  const isFrench = typedLocale === 'fr';
  const title = isFrench
    ? `${site.name.fr} | Exemple de création site web au Maroc`
    : `${site.name.en} | Website example for Morocco businesses`;
  const description = isFrench
    ? `Découvrez un exemple de ${site.name.fr.toLowerCase()} conçu par Aytrix pour les entreprises à Tanger et partout au Maroc, avec structure claire, SEO et conversion.`
    : `Explore an Aytrix ${site.name.en.toLowerCase()} example built for businesses in Tangier and across Morocco, with clear structure, SEO foundations and conversion-focused sections.`;
  const url = `${siteUrl}/${typedLocale}/sites/${site.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/sites/${site.id}`,
        en: `${siteUrl}/en/sites/${site.id}`,
        'x-default': `${siteUrl}/fr/sites/${site.id}`
      }
    },
    openGraph: {
      title,
      description,
      url
    },
    twitter: {
      title,
      description
    }
  };
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

  const typedLocale = locale as AppLocale;
  const pageT = await getTranslations({locale: typedLocale, namespace: 'sitePage'});
  const isFrench = typedLocale === 'fr';
  const pageUrl = `${siteUrl}/${typedLocale}/sites/${site.id}`;
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Aytrix',
        item: `${siteUrl}/${typedLocale}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: site.name[typedLocale],
        item: pageUrl
      }
    ]
  };
  const introTitle = isFrench
    ? `${site.name.fr} : exemple de site web pour Tanger et le Maroc`
    : `${site.name.en}: website example for Tangier and Morocco`;
  const introDescription = isFrench
    ? `Cette page présente une démo ${site.name.fr.toLowerCase()} pensée pour une entreprise qui veut un site clair, rapide et prêt à convertir au Maroc.`
    : `This page showcases a ${site.name.en.toLowerCase()} demo built for a business that needs a clear, fast website ready to convert in Morocco.`;

  return (
    <main className="min-h-screen bg-aytrix-bg px-4 py-8 sm:px-6">
      <div className="section-shell space-y-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}}
        />
        <Link
          href={`/${typedLocale}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white"
        >
          ← Aytrix
        </Link>

        <section className="glass-panel rounded-[32px] p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
            {pageT('eyebrow')}
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl">
            {introTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{introDescription}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${typedLocale}#pricing`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white"
            >
              {pageT('comparePricing')}
            </Link>
            <Link
              href={`/${typedLocale}#sites`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white"
            >
              {pageT('browseExamples')}
            </Link>
          </div>
        </section>

        <DemoModal locale={typedLocale} onClose={undefined} open site={site} standalone />

        <section className="glass-panel rounded-[32px] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">{pageT('includedTitle')}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {pageT('includedDescription')}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {site.services[typedLocale].map((service) => (
              <div
                key={`${site.id}-${service}`}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
              >
                {service}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

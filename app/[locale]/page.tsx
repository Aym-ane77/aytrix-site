import type {Metadata} from 'next';
import Link from 'next/link';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import PricingSection from '@/components/PricingSection';
import SiteShowcase from '@/components/SiteShowcase';
import WhatsAppButton from '@/components/WhatsAppButton';
import {routing, type AppLocale} from '@/i18n/routing';

const siteUrl = 'https://aytrix-site.vercel.app';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    return {};
  }

  const typedLocale = locale as AppLocale;
  const meta = await getTranslations({locale: typedLocale, namespace: 'meta.home'});
  const url = `${siteUrl}/${typedLocale}`;

  return {
    title: meta('title'),
    description: meta('description'),
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr`,
        en: `${siteUrl}/en`,
        'x-default': `${siteUrl}/fr`
      }
    },
    openGraph: {
      title: meta('title'),
      description: meta('description'),
      url
    },
    twitter: {
      title: meta('title'),
      description: meta('description')
    }
  };
}

export default async function LandingPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  const typedLocale = locale as AppLocale;
  const t = await getTranslations({locale: typedLocale, namespace: 'services'});
  const localSeo = await getTranslations({locale: typedLocale, namespace: 'localSeo'});
  const meta = await getTranslations({locale: typedLocale, namespace: 'meta.home'});
  const pageUrl = `${siteUrl}/${typedLocale}`;
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aytrix',
    url: pageUrl,
    logo: `${siteUrl}/icon.svg`,
    description: meta('description'),
    telephone: '+212716271733',
    email: 'contact@aytrix.ma',
    areaServed: [
      {
        '@type': 'City',
        name: 'Tangier'
      },
      {
        '@type': 'Country',
        name: 'Morocco'
      }
    ],
    availableLanguage: typedLocale === 'fr' ? ['French', 'English'] : ['English', 'French'],
    sameAs: [siteUrl]
  };

  return (
    <div className="relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema)}}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-[760px] bg-hero-grid" />
      <Navbar locale={typedLocale} />
      <main>
        <Hero locale={typedLocale} />

        <section id="services" className="section-shell py-20 sm:py-24">
          <div className="glass-panel relative overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 noise-mask opacity-20" />
            <div className="relative">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
                  Aytrix
                </p>
                <h2 className="section-title">{t('title')}</h2>
                <p className="section-subtitle">{t('subtitle')}</p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {(['strategy', 'delivery', 'growth'] as const).map((item, index) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-glow"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-lg text-white">
                      0{index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{t(`items.${item}.title`)}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {t(`items.${item}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-20 sm:py-24">
          <div className="glass-panel rounded-[32px] p-6 sm:p-8 lg:p-10">
            <div className="max-w-4xl space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-300">
                {localSeo('eyebrow')}
              </p>
              <h2 className="section-title">{localSeo('title')}</h2>
              <p className="section-subtitle">{localSeo('subtitle')}</p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {(['tangier', 'morocco', 'landingPages'] as const).map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-glow"
                >
                  <h3 className="text-xl font-semibold text-white">{localSeo(`cards.${item}.title`)}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {localSeo(`cards.${item}.description`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${typedLocale}#sites`}
                className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white"
              >
                {localSeo('links.seeExamples')}
              </Link>
              <Link
                href={`/${typedLocale}#pricing`}
                className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white"
              >
                {localSeo('links.comparePricing')}
              </Link>
              <Link
                href={`/${typedLocale}/sites/agency`}
                className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 hover:border-cyan-400/50 hover:text-white"
              >
                {localSeo('links.viewAgencyPage')}
              </Link>
            </div>
          </div>
        </section>

        <SiteShowcase locale={typedLocale} />
        <PricingSection locale={typedLocale} />
      </main>
      <Footer locale={typedLocale} />
      <WhatsAppButton />
    </div>
  );
}

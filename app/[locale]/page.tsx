import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import PricingSection from '@/components/PricingSection';
import SiteShowcase from '@/components/SiteShowcase';
import WhatsAppButton from '@/components/WhatsAppButton';
import {routing, type AppLocale} from '@/i18n/routing';

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

  return (
    <div className="relative overflow-x-hidden">
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

        <SiteShowcase locale={typedLocale} />
        <PricingSection locale={typedLocale} />
      </main>
      <Footer locale={typedLocale} />
      <WhatsAppButton />
    </div>
  );
}

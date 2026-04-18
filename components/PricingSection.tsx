'use client';

import {useMemo, useState} from 'react';
import {Check, Sparkles} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {sites, type PricingTier} from '@/data/sites';
import type {AppLocale} from '@/i18n/routing';
import {cn} from '@/lib/utils';

type PricingSectionProps = {
  locale: AppLocale;
};

const planOrder: PricingTier[] = ['basic', 'pro', 'premium'];

export default function PricingSection({locale}: PricingSectionProps) {
  const t = useTranslations('pricing');
  const [billing, setBilling] = useState<'monthly' | 'oneTime'>('oneTime');
  const [selectedSiteId, setSelectedSiteId] = useState(sites[0].id);

  const selectedSite = useMemo(
    () => sites.find((site) => site.id === selectedSiteId) ?? sites[0],
    [selectedSiteId]
  );

  const features: Record<PricingTier, string[]> = {
    basic: [t('features.basic1'), t('features.basic2'), t('features.basic3')],
    pro: [t('features.pro1'), t('features.pro2'), t('features.pro3')],
    premium: [t('features.premium1'), t('features.premium2'), t('features.premium3')]
  };

  return (
    <section id="pricing" className="section-shell py-20 sm:py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Aytrix pricing</p>
        <h2 className="section-title mt-3">{t('title')}</h2>
        <p className="section-subtitle mt-4">{t('subtitle')}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {(['oneTime', 'monthly'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setBilling(mode)}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold',
                billing === mode ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
              )}
            >
              {t(mode)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
        {sites.map((site) => (
          <button
            key={site.id}
            type="button"
            onClick={() => setSelectedSiteId(site.id)}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium',
              selectedSite.id === site.id
                ? 'border-cyan-400/40 bg-cyan-400/10 text-white'
                : 'border-white/10 bg-white/5 text-slate-300'
            )}
          >
            {site.name[locale]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-3">
        {planOrder.map((plan) => {
          const price =
            billing === 'oneTime'
              ? selectedSite.price[plan]
              : Math.max(150, Math.ceil(selectedSite.price[plan] / 12));

          const isPopular = plan === 'pro';

          return (
            <div
              key={plan}
              className={cn(
                'relative rounded-[28px] border p-6',
                isPopular
                  ? 'border-violet-400/40 bg-gradient-to-b from-violet-500/15 to-cyan-500/10 shadow-glow'
                  : 'border-white/10 bg-white/5'
              )}
            >
              {isPopular ? (
                <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t('mostPopular')}
                </div>
              ) : null}

              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{t(plan)}</p>
              <p className="mt-4 text-4xl font-black text-white">{price}</p>
              <p className="mt-2 text-sm text-slate-300">
                {billing === 'oneTime' ? t('oneTimeSuffix') : t('monthlySuffix')}
              </p>

              <div className="mt-6 space-y-3">
                {features[plan].map((feature) => (
                  <div key={`${plan}-${feature}`} className="flex items-start gap-3 text-sm text-slate-200">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/212716271733?text=Bonjour%20Aytrix,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20un%20site%20web"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'mt-8 inline-flex min-h-[52px] w-full items-center justify-center rounded-full text-sm font-semibold',
                  isPopular ? 'bg-white text-slate-900' : 'border border-white/10 bg-white/5 text-white'
                )}
              >
                {selectedSite.name[locale]}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

'use client';

import {motion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import type {Site} from '@/data/sites';
import type {AppLocale} from '@/i18n/routing';

type SiteCardProps = {
  locale: AppLocale;
  site: Site;
  index: number;
  onOpen: (site: Site) => void;
};

export default function SiteCard({locale, site, index, onOpen}: SiteCardProps) {
  const t = useTranslations('showcase');

  return (
    <motion.button
      type="button"
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.45, delay: index * 0.06}}
      whileHover={{scale: 1.02, y: -4}}
      whileTap={{scale: 0.99}}
      onClick={() => onOpen(site)}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-aytrix-surface p-[1px] text-left shadow-glow"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${site.color} opacity-75`} />
      <div className="relative h-full rounded-[27px] bg-[#101018]/95 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
            <span aria-hidden>{site.icon}</span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-slate-300">
            {t('livePreview')}
          </span>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-white">{site.name[locale]}</h3>
          <p className="mt-3 text-sm text-slate-300">
            {t('startingFrom', {price: site.price.basic})}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {site.services[locale].map((service) => (
            <span
              key={`${site.id}-${service}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">{t('browseDemo')}</span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-transform group-hover:translate-x-1">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg">
            {t('seeDemo')}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

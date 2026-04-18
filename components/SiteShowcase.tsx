'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import DemoModal from '@/components/DemoModal';
import SiteCard from '@/components/SiteCard';
import {sites, type Site} from '@/data/sites';
import type {AppLocale} from '@/i18n/routing';

type SiteShowcaseProps = {
  locale: AppLocale;
};

export default function SiteShowcase({locale}: SiteShowcaseProps) {
  const t = useTranslations('showcase');
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  return (
    <>
      <section id="sites" className="section-shell py-20 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-300">
            Aytrix demos
          </p>
          <h2 className="section-title mt-3">{t('title')}</h2>
          <p className="section-subtitle mt-4">{t('subtitle')}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sites.map((site, index) => (
            <SiteCard
              key={site.id}
              index={index}
              locale={locale}
              onOpen={setSelectedSite}
              site={site}
            />
          ))}
        </div>
      </section>

      <DemoModal
        locale={locale}
        onClose={() => setSelectedSite(null)}
        open={selectedSite !== null}
        site={selectedSite}
      />
    </>
  );
}

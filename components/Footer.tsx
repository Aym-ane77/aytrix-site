import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
import type {AppLocale} from '@/i18n/routing';

type FooterProps = {
  locale: AppLocale;
};

export default async function Footer({locale}: FooterProps) {
  const t = await getTranslations({locale, namespace: 'footer'});
  const nav = await getTranslations({locale, namespace: 'nav'});

  return (
    <footer id="contact" className="border-t border-white/10 bg-black/20 py-12">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Link href={`/${locale}`} className="text-3xl font-black tracking-tight text-white">
            <span className="bg-aytrix-gradient bg-clip-text text-transparent">Aytrix</span>
          </Link>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">{t('description')}</p>
          <a
            href="https://wa.me/212716271733?text=Bonjour%20Aytrix,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20un%20site%20web"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white"
          >
            {t('whatsapp')} · {t('phone')}
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Navigation</p>
            <Link href={`/${locale}#services`} className="block text-sm text-slate-200 hover:text-white">
              {nav('services')}
            </Link>
            <Link href={`/${locale}#sites`} className="block text-sm text-slate-200 hover:text-white">
              {nav('sites')}
            </Link>
            <Link href={`/${locale}#pricing`} className="block text-sm text-slate-200 hover:text-white">
              {nav('pricing')}
            </Link>
            <Link href={`/${locale}#contact`} className="block text-sm text-slate-200 hover:text-white">
              {nav('contact')}
            </Link>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contact</p>
            <p className="text-sm text-slate-200">{t('phone')}</p>
            <p className="text-sm text-slate-400">contact@aytrix.ma</p>
            <p className="text-sm text-slate-400">Casablanca, Morocco</p>
          </div>
        </div>
      </div>

      <div className="section-shell mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
        {t('rights')}
      </div>
    </footer>
  );
}

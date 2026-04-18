'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useEffect, useMemo, useState} from 'react';
import {Menu, X} from 'lucide-react';
import type {AppLocale} from '@/i18n/routing';
import {cn} from '@/lib/utils';

type NavbarProps = {
  locale: AppLocale;
};

const navItems = [
  {key: 'services', href: '#services'},
  {key: 'sites', href: '#sites'},
  {key: 'pricing', href: '#pricing'},
  {key: 'contact', href: '#contact'}
] as const;

export default function Navbar({locale}: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const localeSwitcher = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const rest = segments.slice(1).join('/');

    return {
      fr: rest ? `/fr/${rest}` : '/fr',
      en: rest ? `/en/${rest}` : '/en'
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090911]/70 backdrop-blur-xl">
      <nav className="section-shell flex min-h-[76px] items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="inline-flex min-h-11 items-center text-2xl font-black tracking-tight text-white"
        >
          <span className="bg-aytrix-gradient bg-clip-text text-transparent">Aytrix</span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {(['fr', 'en'] as const).map((targetLocale) => (
            <Link
              key={targetLocale}
              href={localeSwitcher[targetLocale]}
              className={cn(
                'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-semibold uppercase tracking-[0.2em]',
                locale === targetLocale
                  ? 'border-cyan-400/50 bg-white/10 text-white'
                  : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
              )}
              aria-label={`${t('language')}: ${targetLocale.toUpperCase()}`}
            >
              {targetLocale}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          aria-expanded={menuOpen}
          aria-label={t('menu')}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-[#090911]/95 lg:hidden">
          <div className="section-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="inline-flex min-h-11 items-center rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200"
              >
                {t(item.key)}
              </Link>
            ))}

            <div className="mt-2 flex gap-2">
              {(['fr', 'en'] as const).map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={localeSwitcher[targetLocale]}
                  className={cn(
                    'inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl border px-3 text-sm font-semibold uppercase tracking-[0.2em]',
                    locale === targetLocale
                      ? 'border-cyan-400/50 bg-white/10 text-white'
                      : 'border-white/10 text-slate-300'
                  )}
                >
                  {targetLocale}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

'use client';

import Link from 'next/link';
import {MessageCircle} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function WhatsAppButton() {
  const t = useTranslations('footer');
  const href =
    'https://wa.me/212716271733?text=Bonjour%20Aytrix,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20un%20site%20web';

  return (
    <div className="group fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <div className="pointer-events-none absolute inset-0 animate-pulseSoft rounded-full bg-green-500/30 blur-xl" />
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
        aria-label={t('whatsapp')}
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
      <div className="pointer-events-none absolute bottom-16 right-0 rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-2 text-sm text-white opacity-0 shadow-glow transition-opacity duration-200 group-hover:opacity-100">
        {t('phone')}
      </div>
    </div>
  );
}

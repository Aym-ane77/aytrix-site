'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {ArrowRight, MessageCircle} from 'lucide-react';
import {useTranslations} from 'next-intl';
import type {AppLocale} from '@/i18n/routing';

type HeroProps = {
  locale: AppLocale;
};

const trustAnimation = {
  hidden: {opacity: 0, y: 16},
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.35 + index * 0.12,
      duration: 0.5
    }
  })
};

export default function Hero({locale}: HeroProps) {
  const t = useTranslations('hero');
  const whatsappHref =
    'https://wa.me/212716271733?text=Bonjour%20Aytrix,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20un%20site%20web';
  const mockupCopy =
    locale === 'fr'
      ? {
          studio: 'Notre studio',
          launchReady: 'Sites prêts à lancer',
          conversionDriven: 'Pages conçues pour convertir',
          highImpact: 'Sections visuelles percutantes',
          salesReady: 'Structure pensée pour vendre',
          pricing: 'Tarifs qui convainquent',
          recentLaunches: 'Lancements récents',
          liveDemos: 'Démos en direct',
          launchTypes: ['Restaurant', 'Boutique', 'Clinique']
        }
      : {
          studio: 'Aytrix Studio',
          launchReady: 'Launch-ready websites',
          conversionDriven: 'Conversion-driven pages',
          highImpact: 'High-impact hero blocks',
          salesReady: 'Sales-ready structure',
          pricing: 'Pricing that closes deals',
          recentLaunches: 'Recent launches',
          liveDemos: 'Live demos',
          launchTypes: ['Restaurant', 'Store', 'Clinic']
        };

  return (
    <section className="section-shell relative py-20 sm:py-24 lg:py-28">
      <div className="absolute left-1/2 top-12 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute right-0 top-28 -z-10 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl sm:h-64 sm:w-64" />

      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <motion.p
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200"
          >
            {t('eyebrow')}
          </motion.p>

          <motion.h1
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.05}}
            className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.12}}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.18}}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href={`/${locale}#sites`}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-aytrix-gradient px-6 text-base font-semibold text-white shadow-glow"
            >
              {t('primaryCta')}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 text-base font-semibold text-white hover:border-cyan-400/40 hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              {t('secondaryCta')}
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[t('trust1'), t('trust2'), t('trust3')].map((item, index) => (
              <motion.div
                key={item}
                custom={index}
                variants={trustAnimation}
                initial="hidden"
                animate="visible"
                className="glass-panel rounded-2xl px-4 py-4 text-sm font-medium text-slate-100"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{opacity: 0, scale: 0.95, y: 20}}
          animate={{opacity: 1, scale: 1, y: 0}}
          transition={{duration: 0.65, delay: 0.18}}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="glass-panel relative overflow-hidden rounded-[32px] p-4 shadow-glow sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <div className="ml-3 h-9 flex-1 rounded-full border border-white/10 bg-black/20" />
            </div>
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5">
              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-300">{mockupCopy.studio}</p>
                  <p className="text-lg font-semibold text-white">{mockupCopy.launchReady}</p>
                </div>
                <div className="rounded-2xl bg-aytrix-gradient px-4 py-2 text-sm font-semibold text-white">
                  48h
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-4 h-28 rounded-3xl bg-gradient-to-br from-violet-500/30 to-cyan-500/20" />
                  <p className="text-sm text-slate-400">{mockupCopy.conversionDriven}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{mockupCopy.highImpact}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-4 flex h-28 items-end gap-2 rounded-3xl bg-slate-950/70 p-4">
                    <div className="h-16 flex-1 rounded-t-2xl bg-cyan-400/70" />
                    <div className="h-20 flex-1 rounded-t-2xl bg-violet-500/80" />
                    <div className="h-12 flex-1 rounded-t-2xl bg-white/30" />
                  </div>
                  <p className="text-sm text-slate-400">{mockupCopy.salesReady}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{mockupCopy.pricing}</p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-300">{mockupCopy.recentLaunches}</p>
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">{mockupCopy.liveDemos}</p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {mockupCopy.launchTypes.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-4 text-sm font-semibold text-white"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

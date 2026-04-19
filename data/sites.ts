import type {AppLocale} from '@/i18n/routing';

export type PricingTier = 'basic' | 'pro' | 'premium';

export type Site = {
  id:
    | 'restaurant'
    | 'ecommerce'
    | 'portfolio'
    | 'clinic'
    | 'realestate'
    | 'gym'
    | 'hotel'
    | 'agency'
    | 'school'
    | 'beauty';
  name: Record<AppLocale, string>;
  icon: string;
  price: Record<PricingTier, number>;
  services: Record<AppLocale, [string, string, string, string]>;
  color: string;
  demo:
    | 'interactive-menu'
    | 'interactive-shop'
    | 'interactive-portfolio'
    | 'interactive-clinic'
    | 'interactive-realestate'
    | 'interactive-gym'
    | 'interactive-hotel'
    | 'interactive-agency'
    | 'interactive-school'
    | 'interactive-beauty';
};

export const sites: Site[] = [
  {
    id: 'restaurant',
    name: {fr: 'Restaurant & Café', en: 'Restaurant & Café'},
    icon: '🍽️',
    price: {basic: 1500, pro: 2500, premium: 4000},
    services: {
      fr: ['Menu en ligne', 'Réservation', 'Galerie photos', 'Google Maps'],
      en: ['Online menu', 'Reservations', 'Photo gallery', 'Google Maps']
    },
    color: 'from-orange-500 to-red-500',
    demo: 'interactive-menu'
  },
  {
    id: 'ecommerce',
    name: {fr: 'Boutique en ligne', en: 'Online Store'},
    icon: '🛍️',
    price: {basic: 3000, pro: 5000, premium: 8000},
    services: {
      fr: ['Catalogue produits', 'Panier', 'Paiement sécurisé', 'Tableau de bord'],
      en: ['Product catalog', 'Cart', 'Secure checkout', 'Dashboard']
    },
    color: 'from-purple-500 to-pink-500',
    demo: 'interactive-shop'
  },
  {
    id: 'portfolio',
    name: {fr: 'Portfolio Pro', en: 'Pro Portfolio'},
    icon: '🎨',
    price: {basic: 1200, pro: 2000, premium: 3500},
    services: {
      fr: ['Galerie projets', 'CV en ligne', 'Formulaire de contact', 'Blog'],
      en: ['Project gallery', 'Online CV', 'Contact form', 'Blog']
    },
    color: 'from-blue-500 to-cyan-500',
    demo: 'interactive-portfolio'
  },
  {
    id: 'clinic',
    name: {fr: 'Clinique & Médecin', en: 'Clinic & Doctor'},
    icon: '🩺',
    price: {basic: 2000, pro: 3500, premium: 6000},
    services: {
      fr: ['Prise de RDV', 'Services médicaux', 'Équipe', 'Urgences'],
      en: ['Appointments', 'Medical services', 'Team', 'Emergency info']
    },
    color: 'from-green-500 to-teal-500',
    demo: 'interactive-clinic'
  },
  {
    id: 'realestate',
    name: {fr: 'Immobilier', en: 'Real Estate'},
    icon: '🏡',
    price: {basic: 2500, pro: 4000, premium: 7000},
    services: {
      fr: ['Annonces immobilières', 'Recherche filtrée', 'Visites virtuelles', 'CRM'],
      en: ['Property listings', 'Filtered search', 'Virtual tours', 'CRM']
    },
    color: 'from-yellow-500 to-orange-500',
    demo: 'interactive-realestate'
  },
  {
    id: 'gym',
    name: {fr: 'Salle de Sport', en: 'Gym & Fitness'},
    icon: '💪',
    price: {basic: 1500, pro: 2500, premium: 4500},
    services: {
      fr: ['Programmes', 'Abonnements', 'Coaching', 'Galerie'],
      en: ['Programs', 'Memberships', 'Coaching', 'Gallery']
    },
    color: 'from-red-500 to-pink-500',
    demo: 'interactive-gym'
  },
  {
    id: 'hotel',
    name: {fr: 'Hôtel & Riad', en: 'Hotel & Riad'},
    icon: '🛎️',
    price: {basic: 3000, pro: 5500, premium: 9000},
    services: {
      fr: ['Réservation chambres', 'Galerie', 'Services', 'Avis clients'],
      en: ['Room booking', 'Gallery', 'Amenities', 'Guest reviews']
    },
    color: 'from-indigo-500 to-purple-500',
    demo: 'interactive-hotel'
  },
  {
    id: 'agency',
    name: {fr: 'Agence & Entreprise', en: 'Agency & Business'},
    icon: '🏢',
    price: {basic: 2000, pro: 3500, premium: 6000},
    services: {
      fr: ['Présentation services', 'Équipe', 'Portfolio', 'Blog'],
      en: ['Service overview', 'Team', 'Portfolio', 'Blog']
    },
    color: 'from-slate-500 to-gray-700',
    demo: 'interactive-agency'
  },
  {
    id: 'school',
    name: {fr: 'École & Formation', en: 'School & Training'},
    icon: '🎓',
    price: {basic: 2000, pro: 3500, premium: 6500},
    services: {
      fr: ['Cours en ligne', 'Inscriptions', 'Emploi du temps', 'Certifications'],
      en: ['Online courses', 'Admissions', 'Timetables', 'Certifications']
    },
    color: 'from-cyan-500 to-blue-500',
    demo: 'interactive-school'
  },
  {
    id: 'beauty',
    name: {fr: 'Salon de Beauté', en: 'Beauty & Spa'},
    icon: '✨',
    price: {basic: 1500, pro: 2500, premium: 4000},
    services: {
      fr: ['Services & tarifs', 'Réservation', 'Galerie avant/après', 'Équipe'],
      en: ['Services & pricing', 'Booking', 'Before/after gallery', 'Team']
    },
    color: 'from-pink-500 to-rose-500',
    demo: 'interactive-beauty'
  }
];

export function getSiteById(id: string) {
  return sites.find((site) => site.id === id);
}

import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

const siteUrl = 'https://aytrix-site.vercel.app';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Aytrix',
  description: 'Aytrix creates premium websites and landing pages for businesses in Morocco.',
  applicationName: 'Aytrix',
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: 'website',
    siteName: 'Aytrix',
    url: siteUrl
  },
  twitter: {
    card: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  verification: {
    google: 'kVpb8xSxvnM_ZWd2xxg8glxIvxPmw48aePPqJtWcPT0'
  },
  icons: {
    icon: '/icon.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} bg-aytrix-bg font-sans text-aytrix-text antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Aytrix',
  description: 'Premium website creation and sales agency platform.',
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

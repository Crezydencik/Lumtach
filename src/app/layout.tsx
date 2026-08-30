'use client';

import './globals.css';
import './styles/basic.scss';

import '@/i18n';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@/components/landing/theme-provider';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();
  const pathname = usePathname() ?? '';
  const isAuthOrAdminRoute =
    pathname === '/login' || pathname.startsWith('/admin');

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {isAuthOrAdminRoute ? null : <Navbar />}
          <main>{children}</main>
          {isAuthOrAdminRoute ? null : <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}

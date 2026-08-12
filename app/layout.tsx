'use client';

import './globals.css';
import './styles/basic.scss';

import '../i18n';
import { ThemeProvider } from '@/components/landing/theme-provider';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import { useTranslation } from 'react-i18next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import './styles/globals.css';
import './styles/basic.scss';

import '../i18n'; // Подключение локализации
import { Inter, Oxanium } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useTranslation } from 'react-i18next';

const inter = Inter({ subsets: ['latin'] });
const oxanium = Oxanium({ subsets: ['latin'] });


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
      <body className={`${inter.className} ${oxanium.className} bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

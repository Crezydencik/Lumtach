import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Oxanium } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });
const oxanium = Oxanium({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lumtech - Empowering Business Through Technology',
  description: 'Transform your business with cutting-edge technology solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
import './globals.css';
import 'aos/dist/aos.css';
import type { Metadata } from 'next';
import Header from '@/components/(shared)/Header/Header';
import Footer from '@/components/(shared)/Footer/Footer';
import Providers from '@/providers/index';
import { Toaster } from 'react-hot-toast';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Learn Sharp  | Home',
  description: 'Learn Sharp  Home Page',
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className="h-[100dvh] flex flex-col justify-between">
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  )
}
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import FilmPreloader from '@/components/FilmPreloader';

export const metadata: Metadata = {
  metadataBase: new URL('https://rahul-editor.vercel.app'),
  title: 'Rahul Editor | Video Editor & Visual Storyteller',
  description:
    'Professional video editing and visual storytelling portfolio for Rahul Editor. Specializing in Crime Documentary Editing and Motion Graphics.',
  keywords: [
    'Rahul Editor',
    'Video Editor',
    'Professional Video Editor',
    'Documentary Video Editor',
    'Crime Documentary Editor',
    'YouTube Video Editor',
    'Motion Graphics Designer',
    'Visual Storyteller',
  ],
  authors: [{ name: 'Rahul Editor' }],
  creator: 'Rahul Editor',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rahul-editor.vercel.app',
    title: 'Rahul Editor | Video Editor & Visual Storyteller',
    description:
      'Crafting stories through cuts, sound, motion and visual rhythm. Specializing in Crime Documentary and Motion Graphics.',
    siteName: 'Rahul Editor',
    images: [
      {
        url: '/images/rahul.png',
        width: 1200,
        height: 630,
        alt: 'Rahul Editor - Professional Video Editor & Visual Storyteller',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Editor | Video Editor & Visual Storyteller',
    description: 'Crafting stories through cuts, sound, motion and visual rhythm.',
    images: ['/images/rahul.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#070708] text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-white selection:text-black">
        <FilmPreloader />
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

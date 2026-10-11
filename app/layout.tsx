import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Real Estate',
  description: 'A premium real estate platform for discovering and managing property listings with ease.',
  openGraph: {
    title: 'Real Estate',
    description: 'A premium real estate platform for discovering and managing property listings with ease.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate',
    description: 'A premium real estate platform for discovering and managing property listings with ease.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

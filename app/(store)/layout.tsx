import type { Metadata } from 'next';
import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/header';
import { SanityLive } from '@/sanity/lib/live';
import { draftMode } from 'next/headers';
import DisableDraftMode from '@/components/disable-draft-mode';
import { VisualEditing } from 'next-sanity';

export const metadata: Metadata = {
  title: 'Studio Commerce Build Demo',
  description: 'Build by Sonny Sangha',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`antialiased`}>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <main>
            <Header />
            {children}
          </main>

          {/* Higher order component for live settings when product is published */}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

const SITE_URL = 'https://ngadinhduong.com';
const TITLE = 'Tạ Thị Nga — Người đồng hành dinh dưỡng & sức khoẻ gia đình';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description:
    'Câu chuyện và hành trình của Tạ Thị Nga — người chị cả gác lại con chữ cho các em, nay dành cả đời gieo lại tri thức về dinh dưỡng và sức khoẻ cho các gia đình Việt.',
  authors: [{ name: 'Tạ Thị Nga' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Tạ Thị Nga',
    title: TITLE,
    description:
      'Người chị cả gác lại con chữ cho các em, nay dành cả đời gieo lại tri thức về sức khoẻ cho các gia đình Việt.',
    url: '/',
    images: ['/assets/img/og-image.svg'],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/assets/img/favicon.svg', apple: '/assets/img/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#14342A',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tạ Thị Nga',
  jobTitle: 'Chuyên gia đồng hành dinh dưỡng & sức khoẻ gia đình',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/assets/img/chan-dung-hero.svg`,
  description: 'Người đồng hành dinh dưỡng và sức khoẻ cho các gia đình Việt.',
  address: { '@type': 'PostalAddress', addressLocality: 'Hà Nội', addressCountry: 'VN' },
  sameAs: ['https://facebook.com/', 'https://zalo.me/'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/playfair-display-normal-400_900-vietnamese.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/be-vietnam-pro-normal-400-vietnamese.woff2" crossOrigin="" />
        <link rel="stylesheet" href="/assets/css/fonts.css" />
        <link rel="stylesheet" href="/assets/css/styles.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        {children}
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

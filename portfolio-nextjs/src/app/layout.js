// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'Abilash Kumar R | 3D Developer Portfolio',
  description:
    'Portfolio of Abilash Kumar R - Computer Science Student, Full Stack Developer, Generative AI & Workflow Automation Architect.',
  keywords:
    'Abilash Kumar, Portfolio, Full Stack Developer, React, Three.js, Generative AI, n8n, Python, Java',
  authors: [{ name: 'Abilash Kumar R' }],
  themeColor: '#000000',
  openGraph: {
    type: 'website',
    title: 'Abilash Kumar R | Portfolio',
    description:
      'Explore interactive 3D portfolio showcasing projects in Full Stack Development, Generative AI, and Workflow Automation.',
    images: [{ url: '/images/og-preview.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abilash Kumar R | Portfolio',
    description:
      'Explore interactive 3D portfolio showcasing projects in Full Stack Development, Generative AI, and Workflow Automation.',
  },
  verification: {
    google: '08V1akLFaXVb-Y-4ze-bCcvweCdWk2c3fcF9WSmzVm0',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abilash Kumar R',
              jobTitle: 'Full Stack Developer & Workflow Architect',
              url: 'https://github.com/Abilash-Kumar18',
              sameAs: [
                'https://github.com/Abilash-Kumar18',
                'https://www.linkedin.com/in/abilashkumar-',
              ],
            }),
          }}
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

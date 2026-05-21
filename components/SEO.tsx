import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article' | 'local.business';
}

export const SEO: React.FC<SEOProps> = ({
  title = 'AGS Stones and Pavers | Premium Hardscaping serving Your City',
  description = 'Transform your outdoor living space with AGS Stones. We specialize in driveway pavers, luxury patios, retaining walls, and custom masonry. Expert local craftsmen.',
  keywords = ['driveway pavers', 'outdoor patio builders', 'retaining wall installation', 'hardscaping', 'masonry fireplaces'],
  canonicalPath = '',
  image = 'https://i.imgur.com/G2N5Chsl.webp',
  type = 'website'
}) => {
  const siteUrl = 'https://agsstonesandpavers.com'; // Replace with actual domain when known
  const currentUrl = `${siteUrl}${canonicalPath}`;

  // Structured Data (JSON-LD) for LocalBusiness to boost Local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "AGS Stones and Pavers",
    "image": image,
    "description": description,
    "url": siteUrl,
    "telephone": "+16784287630",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Your City",
      "addressRegion": "Your State",
      "addressCountry": "US"
    },
    // Optional opening hours
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      // Links to social profiles go here
    ]
  };

  return (
    <Helmet>
      {/* Basic Title & Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph (Facebook/LinkedIn) */}
      <meta property="og:site_name" content="AGS Stones and Pavers" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

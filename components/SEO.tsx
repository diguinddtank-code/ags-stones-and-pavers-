import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  BUSINESS,
  BUSINESS_ID,
  WEBSITE_ID,
  Crumb,
  absoluteUrl,
  breadcrumbSchema,
  businessSchema,
  websiteSchema,
} from '../lib/business';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  /** Path used for the canonical URL. Defaults to the current route. */
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  /** Breadcrumb trail (Home is added automatically). */
  breadcrumbs?: Crumb[];
  /** Extra schema.org nodes merged into the page @graph. */
  schema?: Record<string, unknown>[];
  /** Extra article meta for blog posts. */
  article?: { publishedTime: string; modifiedTime: string; section?: string };
}

const DEFAULT_TITLE = 'Paver Installation, Retaining Walls & Patio Contractors | AGS Stones and Pavers';
const DEFAULT_DESCRIPTION =
  'Duluth-based hardscape contractor for driveway pavers, paver patios, retaining walls, pool decks and outdoor kitchens across Atlanta, Alpharetta, Johns Creek and Roswell. Free estimates.';

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonicalPath,
  image = BUSINESS.defaultImage,
  type = 'website',
  noindex = false,
  breadcrumbs,
  schema = [],
  article,
}) => {
  const location = useLocation();
  const url = absoluteUrl(canonicalPath ?? location.pathname);
  const imageUrl = absoluteUrl(image);

  const crumbs: Crumb[] | null = breadcrumbs ? [{ name: 'Home', path: '/' }, ...breadcrumbs] : null;

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl },
    ...(crumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(),
      businessSchema(),
      webPage,
      ...(crumbs ? [breadcrumbSchema(crumbs, url)] : []),
      ...schema,
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        <meta
          name="robots"
          content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
        />
        {!noindex && <link rel="canonical" href={url} />}

        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={BUSINESS.name} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        {article && <meta property="article:published_time" content={article.publishedTime} />}
        {article && <meta property="article:modified_time" content={article.modifiedTime} />}
        {article?.section && <meta property="article:section" content={article.section} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>
      {/* JSON-LD stays in the body: it is rendered identically on server and client. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { blogPosts, BlogPost, formatDate } from '../lib/blogData';
import { BUSINESS_ID, absoluteUrl } from '../lib/business';

const categories: ('All Guides' | BlogPost['category'])[] = ['All Guides', 'Cost Guides', 'Comparisons', 'Maintenance', 'Planning'];

const blogSchema = {
  '@type': 'Blog',
  '@id': `${absoluteUrl('/blog')}#blog`,
  name: 'AGS Stones and Pavers Homeowner Guides',
  description: 'Hardscape cost guides, material comparisons and maintenance how-tos for Metro Atlanta homeowners.',
  url: absoluteUrl('/blog'),
  publisher: { '@id': BUSINESS_ID },
  blogPost: blogPosts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: absoluteUrl(`/blog/${p.slug}`),
    datePublished: p.datePublished,
    image: p.image,
  })),
};

export const BlogIndexPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All Guides');
  const [query, setQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = blogPosts.filter(
    (p) =>
      (activeCategory === 'All Guides' || p.category === activeCategory) &&
      (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-brand-dark">
      <SEO
        title="Hardscape Guides & Blog | Pavers, Patios & Retaining Walls | AGS Stones"
        description="Cost guides, material comparisons and step-by-step maintenance tips for pavers, patios, retaining walls and pool decks from Metro Atlanta hardscape pros."
        breadcrumbs={[{ name: 'Blog', path: '/blog' }]}
        schema={[blogSchema]}
      />
      <Header forceSolid={true} />

      <main className="flex-grow pt-32 md:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Homeowner Knowledge Hub</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-brand-dark mb-6 leading-tight">
              Hardscape Guides & How-Tos
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Straight answers on pricing, materials and maintenance from the crews who build driveways, patios and retaining
              walls across North Metro Atlanta every week.
            </p>

            <div className="mt-8 relative max-w-xl mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides (e.g. cost, retaining wall, travertine)..."
                aria-label="Search guides"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-full text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-gold hover:text-brand-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <article
                key={post.slug}
                className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold/10 text-brand-goldHover border border-brand-gold/20">
                      {post.badge}
                    </span>
                    <time dateTime={post.datePublished} className="text-xs text-gray-400">
                      {formatDate(post.datePublished)}
                    </time>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-gold transition-colors leading-snug mb-3">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{post.excerpt}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-gold transition-colors"
                    >
                      Read Guide <ArrowRight size={14} className="text-brand-gold" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 max-w-xl mx-auto p-8 shadow-sm">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-2">No matching guides</h2>
              <p className="text-gray-500 text-sm mb-6">Try &quot;cost&quot;, &quot;driveway&quot; or &quot;retaining wall&quot;.</p>
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All Guides');
                }}
                className="bg-brand-dark text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-brand-gold transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          <div className="mt-20 bg-brand-dark text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2 block">Ready to Build?</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-3">Get a Free On-Site Estimate</h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                We measure, check drainage and give you a written, line-item quote for your driveway, patio, wall or pool deck.
              </p>
            </div>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-brand-gold text-white font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-white hover:text-brand-dark transition-colors shrink-0"
            >
              Request Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

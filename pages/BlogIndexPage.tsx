import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { CtaBand } from '../components/CtaBand';
import { blogPosts, BlogPost, formatDate } from '../lib/blogData';
import { BUSINESS_ID, absoluteUrl } from '../lib/business';
import { Img } from '../components/ui/Img';

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

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block rounded bg-[#1c2024] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-gold">
    {children}
  </span>
);

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
  // Unfiltered view leads with one featured guide.
  const showFeatured = activeCategory === 'All Guides' && !q && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const grid = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f2ec] font-sans text-brand-dark">
      <SEO
        title="Paver & Hardscape Guides for Atlanta Homeowners | AGS Stones"
        description="Cost guides, material comparisons and maintenance tips for pavers, patios, retaining walls and pool decks from a Duluth, GA paver contractor."
        breadcrumbs={[{ name: 'Blog', path: '/blog' }]}
        schema={[blogSchema]}
      />
      <Header forceSolid={true} />

      <main className="flex-grow">
        {/* Intro */}
        <section className="relative overflow-hidden bg-brand-dark pb-14 pt-28 text-white md:pb-20 md:pt-36 lg:pt-44">
          <div className="absolute inset-0" aria-hidden="true">
            <Img src="/images/fieldwork-paver-setting.jpg" alt="" sizes="100vw" loading="eager" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/85 to-brand-dark/60" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4 flex items-center gap-3 text-brand-gold">
                <span className="block h-0.5 w-8 bg-brand-gold" aria-hidden="true" /> Homeowner guides
              </p>
              <h1 className="font-display text-[2.6rem] font-bold uppercase leading-[0.95] tracking-[-0.01em] sm:text-6xl lg:text-7xl">
                Paver &amp; hardscape guides
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                Straight answers on pricing, materials and maintenance from the crews who build driveways, patios and retaining
                walls across North Metro Atlanta.
              </p>

              <div className="relative mt-8 max-w-xl">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search guides (cost, retaining wall, travertine...)"
                  aria-label="Search guides"
                  className="w-full rounded-lg border border-white/10 bg-white py-3.5 pl-11 pr-4 text-[15px] font-medium text-brand-dark placeholder-slate-400 outline-none transition-all focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/40"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Category filter: scrolls sideways on phones instead of wrapping into a wall of buttons */}
            <div className="-mx-4 mb-10 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Filter guides by category">
              <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`min-h-[44px] whitespace-nowrap rounded-md border-2 px-4 font-display text-[15px] font-bold uppercase tracking-wide transition-colors ${
                      activeCategory === cat
                        ? 'border-[#1c2024] bg-[#1c2024] text-white'
                        : 'border-[#1c2024]/15 bg-white text-[#1c2024] hover:border-[#1c2024]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {featured && (
              <article className="group mb-8 grid overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(15,17,21,0.45)] lg:grid-cols-[1.15fr_1fr]">
                <Link to={`/blog/${featured.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-200 lg:aspect-auto lg:min-h-[380px]" tabIndex={-1} aria-hidden="true">
                  <Img
                    src={featured.image}
                    alt={featured.alt}
                    loading="eager"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Badge>{featured.badge}</Badge>
                    <time dateTime={featured.datePublished} className="text-xs font-medium text-slate-500">
                      {formatDate(featured.datePublished)} · {featured.readTime}
                    </time>
                  </div>
                  <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] text-[#1c2024] transition-colors group-hover:text-[#a8661f] md:text-4xl">
                    <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p className="mt-4 leading-relaxed text-slate-600">{featured.excerpt}</p>
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start font-display text-base font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:text-[#a8661f]"
                  >
                    Read the guide <ArrowRight size={16} className="text-[#a8661f] transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {grid.map((post, i) => (
                <article
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,17,21,0.45)]"
                >
                  <Link to={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-200" tabIndex={-1} aria-hidden="true">
                    <Img
                      src={post.image}
                      alt={post.alt}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-grow flex-col p-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <Badge>{post.badge}</Badge>
                      <time dateTime={post.datePublished} className="text-xs font-medium text-slate-500">
                        {formatDate(post.datePublished)}
                      </time>
                    </div>
                    <h2 className="mb-3 font-display text-2xl font-bold uppercase leading-[0.98] text-[#1c2024] transition-colors group-hover:text-[#a8661f]">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mb-5 flex-grow text-[15px] leading-relaxed text-slate-600">{post.excerpt}</p>
                    <div className="border-t border-slate-100 pt-3">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex min-h-[44px] items-center gap-2 font-display text-base font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:text-[#a8661f]"
                      >
                        Read guide <ArrowRight size={16} className="text-[#a8661f] transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mx-auto max-w-xl rounded-xl bg-white p-8 py-16 text-center shadow-sm">
                <BookOpen size={44} className="mx-auto mb-4 text-slate-300" />
                <h2 className="mb-2 font-display text-3xl font-bold uppercase text-[#1c2024]">No matching guides</h2>
                <p className="mb-6 text-slate-600">Try &quot;cost&quot;, &quot;driveway&quot; or &quot;retaining wall&quot;.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setActiveCategory('All Guides');
                  }}
                  className="inline-flex min-h-[44px] items-center rounded-md border-2 border-[#1c2024] px-6 font-display text-base font-bold uppercase tracking-wide text-[#1c2024] transition-colors hover:bg-[#1c2024] hover:text-white"
                >
                  Reset filters
                </button>
              </div>
            )}

          </div>
        </section>

        <CtaBand
          title="Ready to build it?"
          text="We measure, check drainage and give you a written quote for your driveway, patio, retaining wall or pool deck. Free and no obligation."
          image="/images/service-hero-driveway.webp"
        />
      </main>

      <Footer />
    </div>
  );
};

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Calendar, Check, CheckCircle2, ChevronRight, Clock, HardHat, Layers, MapPin, Phone, ShieldCheck, ListChecks, BookOpen } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { CtaBand } from '../components/CtaBand';
import { NotFoundPage } from './NotFoundPage';
import { blogPosts, blogPostBySlug, formatDate } from '../lib/blogData';
import { cities } from '../lib/cities';
import { localPageUrl } from '../lib/localPages';
import { BUSINESS, BUSINESS_ID, absoluteUrl, faqSchema } from '../lib/business';
import { Img } from '../components/ui/Img';

const coreServices = [
  { name: 'Driveway Pavers', path: '/service/driveway-pavers' },
  { name: 'Outdoor Patio Builders', path: '/service/outdoor-patio-builders' },
  { name: 'Retaining Wall Installation', path: '/service/retaining-wall-installation' },
  { name: 'Pool Deck Pavers', path: '/service/pool-deck-pavers' },
  { name: 'Masonry & Fireplaces', path: '/service/masonry-fireplaces' },
  { name: '3D Landscape Design', path: '/service/landscape-design' },
];

const ESTIMATE_POINTS = ['We come out and measure', 'Written estimate', 'No obligation'];

/** "Planning a project?" box: sticky sidebar on desktop, inline card on phones. */
const EstimateBox: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`overflow-hidden rounded-xl border-t-4 border-brand-gold bg-[#1c2024] p-6 text-white shadow-[0_30px_60px_-30px_rgba(15,17,21,0.6)] ${className}`}>
    <p className="eyebrow mb-2 text-brand-gold">Planning a project?</p>
    <p className="font-display text-3xl font-bold uppercase leading-[0.95]">Free on-site estimate</p>
    <ul className="mt-4 space-y-2">
      {ESTIMATE_POINTS.map((p) => (
        <li key={p} className="flex items-center gap-2.5 text-[15px] font-medium text-white/85">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-dark">
            <Check size={12} strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
    <div className="mt-6 flex flex-col gap-3">
      <Link
        to="/quote"
        className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-6 py-4 font-display text-lg font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-brand-goldHover"
      >
        Get my free estimate <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </Link>
      <a
        href={BUSINESS.phoneHref}
        className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/30 px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
      >
        <Phone size={18} /> {BUSINESS.phoneDisplay}
      </a>
    </div>
    <div className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-xs font-medium text-white/60">
      <p className="flex items-center gap-2"><Clock size={13} className="text-brand-gold" /> {BUSINESS.hours.display}</p>
      <p className="flex items-center gap-2"><ShieldCheck size={13} className="text-brand-gold" /> Licensed &amp; insured · In-house crews</p>
    </div>
  </div>
);

export const BlogPostPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const post = blogPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFoundPage />;

  const url = absoluteUrl(`/blog/${post.slug}`);
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    articleSection: post.category,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: BUSINESS.name, url: absoluteUrl('/') },
    publisher: { '@id': BUSINESS_ID },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f2ec] font-sans text-brand-dark">
      <SEO
        title={`${post.title} | AGS Stones`}
        description={post.excerpt}
        image={post.image}
        type="article"
        article={{ publishedTime: post.datePublished, modifiedTime: post.dateModified, section: post.category }}
        breadcrumbs={[
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
        schema={[articleSchema, faqSchema(post.faqs, url)]}
      />
      <Header forceSolid={true} />

      <main className="flex-grow pt-24 md:pt-32 lg:pt-40">
        <article>
          {/* Article header */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <li><Link to="/" className="transition-colors hover:text-[#a8661f]">Home</Link></li>
                <li aria-hidden="true"><ChevronRight size={12} className="text-slate-400" /></li>
                <li><Link to="/blog" className="transition-colors hover:text-[#a8661f]">Blog</Link></li>
                <li aria-hidden="true"><ChevronRight size={12} className="text-slate-400" /></li>
                <li className="max-w-[220px] truncate font-semibold text-brand-dark sm:max-w-md" aria-current="page">{post.title}</li>
              </ol>
            </nav>

            <header className="mb-8 max-w-4xl">
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="rounded bg-[#1c2024] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-gold">
                  {post.badge}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Calendar size={13} /> <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Clock size={13} /> {post.readTime}
                </span>
              </div>
              <h1 className="font-display text-[2.3rem] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-[#1c2024] sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-col gap-3 border-y border-black/10 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1c2024] font-display text-sm font-bold text-brand-gold">AGS</div>
                  <div>
                    <p className="m-0 flex items-center gap-1.5 text-sm font-bold text-brand-dark">
                      Written by the AGS Stones Hardscape Team <CheckCircle2 size={15} className="text-[#a8661f]" />
                    </p>
                    <p className="m-0 text-xs text-slate-500">Hardscape installers based in {BUSINESS.address.city}, GA</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">
                  <ShieldCheck size={16} className="text-[#a8661f]" /> Licensed &amp; Insured
                </span>
              </div>
            </header>

            <div className="mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200 shadow-[0_30px_60px_-30px_rgba(15,17,21,0.5)] md:mb-14">
              <Img src={post.image} alt={post.alt} sizes="(min-width: 1152px) 1088px, 100vw" className="h-full w-full object-cover" fetchPriority="high" loading="eager" />
            </div>
          </div>

          {/* Body + sticky estimate sidebar */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
              <div className="min-w-0">
                <section className="mb-10 rounded-xl border-l-4 border-brand-gold bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] sm:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <ListChecks size={20} className="text-[#a8661f]" />
                    <h2 className="m-0 font-display text-2xl font-bold uppercase text-[#1c2024]">Key Takeaways</h2>
                  </div>
                  <ul className="space-y-3">
                    {post.keyTakeaways.map((t) => (
                      <li key={t} className="flex items-start gap-3 leading-relaxed text-slate-700">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-[#a8661f]" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Readable measure (~70ch); links in body copy use the darker amber for contrast on white */}
                <div className="mb-10 rounded-xl bg-white p-5 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] sm:p-10 [&_.bg-brand-dark_a]:text-brand-gold [&_.bg-brand-gold.text-white]:text-brand-dark [&_a]:text-[#a8661f]">
                  <div className="mx-auto max-w-[70ch]">{post.content}</div>
                </div>

                <EstimateBox className="mb-10 lg:hidden" />

                <section className="mb-10 rounded-xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] sm:p-10">
                  <p className="eyebrow mb-2 text-[#a8661f]">Frequently asked questions</p>
                  <h2 className="mb-6 font-display text-3xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-4xl">Common questions from homeowners</h2>
                  <div className="space-y-3">
                    {post.faqs.map((faq) => (
                      <details key={faq.q} className="group rounded-lg border border-slate-200 transition-colors open:border-brand-gold/50 open:bg-slate-50">
                        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                          <h3 className="m-0 text-base font-bold leading-snug text-brand-dark sm:text-lg">{faq.q}</h3>
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#1c2024] text-xl leading-none text-brand-gold transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mx-4 border-t border-slate-200 pb-5 pt-4 leading-relaxed text-slate-600 sm:mx-5">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </section>

                <section className="mb-12 rounded-xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] sm:p-10">
                  <h2 className="mb-8 font-display text-3xl font-bold uppercase leading-[0.95] text-[#1c2024]">Explore services &amp; local pages</h2>
                  <div className="grid grid-cols-1 gap-8 text-[15px] sm:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        <Layers size={14} className="text-[#a8661f]" /> Related services
                      </h3>
                      <ul className="space-y-1">
                        {[...post.relatedServices, ...coreServices.filter((s) => !post.relatedServices.some((r) => r.path === s.path))].slice(0, 6).map((s) => (
                          <li key={s.path}>
                            <Link to={s.path} className="block py-1 text-slate-700 transition-colors hover:text-[#a8661f]">→ {s.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        <MapPin size={14} className="text-[#a8661f]" /> Service areas
                      </h3>
                      <ul className="space-y-1">
                        {cities.slice(0, 7).map((c) => (
                          <li key={c.id}>
                            <Link to={localPageUrl('stone-patios', c.id)} className="block py-1 text-slate-700 transition-colors hover:text-[#a8661f]">
                              → Patios in {c.name}, GA
                            </Link>
                          </li>
                        ))}
                        <li><Link to="/service-areas" className="block py-1 font-bold text-brand-dark hover:text-[#a8661f]">All Service Areas</Link></li>
                      </ul>
                    </div>
                    <div className="sm:col-span-2 xl:col-span-1">
                      <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        <BookOpen size={14} className="text-[#a8661f]" /> More guides
                      </h3>
                      <ul className="space-y-1">
                        {blogPosts.filter((p) => p.slug !== post.slug).map((p) => (
                          <li key={p.slug}>
                            <Link to={`/blog/${p.slug}`} className="block py-1 text-slate-700 transition-colors hover:text-[#a8661f]">→ {p.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="hidden lg:block" aria-label="Free estimate">
                <div className="sticky top-28 space-y-5">
                  <EstimateBox />
                  {post.relatedServices.length > 0 && (
                  <div className="rounded-xl bg-white p-5 shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)]">
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      <HardHat size={14} className="text-[#a8661f]" /> Services in this guide
                    </p>
                    <ul className="space-y-0.5">
                      {post.relatedServices.slice(0, 4).map((s) => (
                        <li key={s.path}>
                          <Link to={s.path} className="flex items-center justify-between gap-2 py-1.5 text-[15px] font-semibold text-slate-700 transition-colors hover:text-[#a8661f]">
                            {s.name} <ArrowRight size={14} className="shrink-0 text-[#a8661f]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  )}
                </div>
              </aside>
            </div>

            <section className="border-t border-black/10 pb-16 pt-12 md:pb-20">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] text-[#1c2024] sm:text-4xl">Related guides</h2>
                <Link to="/blog" className="inline-flex min-h-[44px] shrink-0 items-center gap-1 font-display text-base font-bold uppercase tracking-wide text-brand-dark hover:text-[#a8661f]">
                  View all <ArrowRight size={16} className="text-[#a8661f]" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-30px_rgba(15,17,21,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,17,21,0.45)]">
                    <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                      <Img src={r.image} alt={r.alt} loading="lazy" decoding="async" sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5 sm:p-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a8661f]">{r.badge}</span>
                      <h3 className="mt-2 font-display text-xl font-bold uppercase leading-[1] text-[#1c2024] transition-colors group-hover:text-[#a8661f]">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>

        <CtaBand
          title="Planning a project like this?"
          text="Our in-house crews design and build driveways, patios, retaining walls and outdoor kitchens across North Metro Atlanta. We come out, measure and put a clear quote in writing."
        />
      </main>

      <Footer />
    </div>
  );
};

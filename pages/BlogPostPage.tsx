import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle2, ChevronRight, Clock, HelpCircle, Layers, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { NotFoundPage } from './NotFoundPage';
import { blogPosts, blogPostBySlug, formatDate } from '../lib/blogData';
import { cities } from '../lib/cities';
import { localPageUrl } from '../lib/localPages';
import { BUSINESS, BUSINESS_ID, absoluteUrl, faqSchema } from '../lib/business';

const coreServices = [
  { name: 'Driveway Pavers', path: '/service/driveway-pavers' },
  { name: 'Outdoor Patio Builders', path: '/service/outdoor-patio-builders' },
  { name: 'Retaining Wall Installation', path: '/service/retaining-wall-installation' },
  { name: 'Pool Deck Pavers', path: '/service/pool-deck-pavers' },
  { name: 'Masonry & Fireplaces', path: '/service/masonry-fireplaces' },
  { name: '3D Landscape Design', path: '/service/landscape-design' },
];

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
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-brand-dark">
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

      <main className="flex-grow pt-32 md:pt-40 pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-medium">
              <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={12} className="text-gray-400" /></li>
              <li><Link to="/blog" className="hover:text-brand-gold transition-colors">Blog</Link></li>
              <li aria-hidden="true"><ChevronRight size={12} className="text-gray-400" /></li>
              <li className="text-brand-dark font-semibold truncate max-w-[240px] sm:max-w-md" aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold/10 text-brand-goldHover border border-brand-gold/20">
                {post.badge}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar size={13} /> <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-6">{post.title}</h1>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-brand-dark text-brand-gold font-serif font-bold flex items-center justify-center">AGS</div>
                <div>
                  <p className="text-sm font-bold text-brand-dark flex items-center gap-1.5 m-0">
                    Written by the AGS Stones Hardscape Team <CheckCircle2 size={15} className="text-brand-gold" />
                  </p>
                  <p className="text-xs text-gray-500 m-0">Hardscape installers based in {BUSINESS.address.city}, GA</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-dark">
                <ShieldCheck size={16} className="text-brand-gold" /> Licensed & Insured
              </span>
            </div>
          </header>

          <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-10 shadow-xl bg-gray-100">
            <img src={post.image} alt={post.alt} className="w-full h-full object-cover" fetchPriority="high" />
          </div>

          <section className="bg-white border border-brand-gold/30 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-brand-gold" />
              <h2 className="font-serif text-xl font-bold text-brand-dark m-0">Key Takeaways</h2>
            </div>
            <ul className="space-y-3">
              {post.keyTakeaways.map((t) => (
                <li key={t} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                  <CheckCircle2 size={18} className="text-brand-gold mt-0.5 flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-100 shadow-sm mb-12">{post.content}</div>

          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm mb-12">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={20} className="text-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Frequently Asked Questions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mb-6">Common Questions from Homeowners</h2>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
                <details key={faq.q} className="group border border-gray-100 rounded-2xl p-5 open:bg-slate-50 open:border-brand-gold/40 transition-colors">
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-4 font-serif text-lg font-bold text-brand-dark">
                    <h3 className="m-0">{faq.q}</h3>
                    <span className="flex-shrink-0 text-brand-gold text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 pt-3 border-t border-gray-100 text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-brand-dark text-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-12">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] block mb-2">Free Estimates</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium mb-4 leading-tight">Ready to Start Your Project?</h2>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-2xl">
              Our in-house crews design and build driveways, patios, retaining walls and outdoor kitchens across North Metro Atlanta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/quote" className="inline-flex items-center justify-center gap-2 bg-brand-gold text-white font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-white hover:text-brand-dark transition-colors">
                Get Free Estimate <ArrowRight size={16} />
              </Link>
              <a href={BUSINESS.phoneHref} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-white/10 transition-colors">
                <Phone size={15} className="text-brand-gold" /> {BUSINESS.phoneDisplay}
              </a>
            </div>
            <p className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500 flex flex-wrap items-center gap-2">
              <MapPin size={14} className="text-brand-gold" /> {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode} • {BUSINESS.hours.display}
            </p>
          </section>

          <section className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm mb-14">
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-8">Explore Services & Local Pages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <Layers size={14} className="text-brand-gold" /> Related Services
                </h3>
                <ul className="space-y-2.5">
                  {[...post.relatedServices, ...coreServices.filter((s) => !post.relatedServices.some((r) => r.path === s.path))].slice(0, 6).map((s) => (
                    <li key={s.path}>
                      <Link to={s.path} className="text-gray-600 hover:text-brand-gold transition-colors">→ {s.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <MapPin size={14} className="text-brand-gold" /> Service Areas
                </h3>
                <ul className="space-y-2.5">
                  {cities.slice(0, 7).map((c) => (
                    <li key={c.id}>
                      <Link to={localPageUrl('stone-patios', c.id)} className="text-gray-600 hover:text-brand-gold transition-colors">
                        → Patios in {c.name}, GA
                      </Link>
                    </li>
                  ))}
                  <li><Link to="/service-areas" className="text-brand-dark font-bold hover:text-brand-gold">All Service Areas</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-gold" /> More Guides
                </h3>
                <ul className="space-y-2.5">
                  {blogPosts.filter((p) => p.slug !== post.slug).map((p) => (
                    <li key={p.slug}>
                      <Link to={`/blog/${p.slug}`} className="text-gray-600 hover:text-brand-gold transition-colors">→ {p.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-brand-dark">Related Guides</h2>
              <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-gold flex items-center gap-1">
                View All <ArrowRight size={14} className="text-brand-gold" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img src={r.image} alt={r.alt} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">{r.badge}</span>
                    <h3 className="font-serif font-bold text-brand-dark group-hover:text-brand-gold transition-colors mt-2 leading-snug">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

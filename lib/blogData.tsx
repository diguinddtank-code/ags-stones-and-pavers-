import React from 'react';
import { Link } from 'react-router-dom';

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  badge: string;
  category: 'Cost Guides' | 'Comparisons' | 'Maintenance' | 'Planning';
  datePublished: string; // ISO date for schema
  dateModified: string;
  readTime: string;
  excerpt: string;
  image: string;
  alt: string;
  keyTakeaways: string[];
  faqs: BlogFaq[];
  relatedServices: { name: string; path: string }[];
  content: React.ReactNode;
}

// --- Small typographic helpers so every article shares the site's type scale ---
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">{children}</p>
);
const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-serif text-2xl sm:text-3xl text-brand-dark font-bold mt-12 mb-5 pb-2 border-b border-gray-100">
    {children}
  </h2>
);
const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="font-serif text-xl text-brand-dark font-bold mt-8 mb-3">{children}</h3>
);
const L: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-brand-gold font-semibold hover:underline">
    {children}
  </Link>
);
const Steps: React.FC<{ items: { title: string; text: React.ReactNode }[] }> = ({ items }) => (
  <div className="space-y-5 my-8">
    {items.map((s, i) => (
      <div key={s.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold text-white font-bold font-serif flex items-center justify-center shadow-md">
          {i + 1}
        </span>
        <div>
          <h3 className="text-lg font-bold text-brand-dark mb-2">{s.title}</h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed m-0">{s.text}</p>
        </div>
      </div>
    ))}
  </div>
);
const Callout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="my-8 bg-brand-dark text-white rounded-2xl p-6 border-l-4 border-brand-gold">
    <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">{title}</p>
    <p className="text-gray-300 leading-relaxed m-0">{children}</p>
  </div>
);
const Table: React.FC<{ head: string[]; rows: string[][] }> = ({ head, rows }) => (
  <div className="my-8 overflow-x-auto rounded-2xl border border-gray-100">
    <table className="w-full text-sm text-left">
      <thead className="bg-slate-50 text-brand-dark">
        <tr>
          {head.map((h) => (
            <th key={h} className="px-4 py-3 font-bold uppercase tracking-wider text-xs">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]} className="border-t border-gray-100">
            {r.map((c, i) => (
              <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-semibold text-brand-dark' : 'text-gray-600'}`}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const UL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="my-6 space-y-3">
    {items.map((it, i) => (
      <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
        <span className="mt-2 w-2 h-2 rounded-full bg-brand-gold flex-shrink-0" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export const blogPosts: BlogPost[] = [
  {
    slug: 'paver-patio-and-driveway-cost-atlanta',
    title: 'How Much Do Pavers Cost in Atlanta? Patio, Driveway & Retaining Wall Pricing Guide',
    badge: 'Cost Guide',
    category: 'Cost Guides',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    readTime: '8 min read',
    image: 'https://i.imgur.com/SIBIdiFl.webp',
    alt: 'Finished backyard paver patio with outdoor seating in Metro Atlanta',
    excerpt:
      'What actually drives the price of a paver patio, driveway or retaining wall in Metro Atlanta — materials, base depth, demolition, access and drainage — and how to compare quotes the right way.',
    keyTakeaways: [
      'The biggest cost drivers are square footage, material, how much old concrete must be removed, base depth and site access.',
      'Driveways cost more per square foot than patios because they need a deeper, vehicle-rated base.',
      'Retaining walls are priced by wall face area and height; drainage and geogrid are what make them last.',
      'The cheapest quote usually saves money underground — thinner base, no geotextile, no drainage — which is where failures start.',
      'Always compare quotes line by line: excavation depth, base thickness, edge restraint, joint sand and cleanup.',
    ],
    faqs: [
      {
        q: 'Why do paver quotes in Atlanta vary so much?',
        a: 'Most of the difference is in what you cannot see: excavation depth, base thickness and compaction, geotextile fabric, drainage and edge restraints. Two patios can look identical on day one and perform very differently after a few Georgia winters.',
      },
      {
        q: 'Are pavers more expensive than concrete?',
        a: 'Pavers usually cost more to install than plain poured concrete, but they do not crack like a slab, individual pavers can be replaced, and they typically add more curb appeal. Over the life of the surface, many homeowners find pavers the better value.',
      },
      {
        q: 'Does AGS Stones offer free estimates?',
        a: 'Yes. We visit your property, measure, check grading and drainage and give you a written, line-item estimate at no cost.',
      },
      {
        q: 'Can I finance a hardscape project?',
        a: 'Ask about payment options during your estimate. We will walk you through the schedule and payment milestones for your project.',
      },
    ],
    relatedServices: [
      { name: 'Driveway Pavers', path: '/service/driveway-pavers' },
      { name: 'Outdoor Patio Builders', path: '/service/outdoor-patio-builders' },
      { name: 'Retaining Wall Installation', path: '/service/retaining-wall-installation' },
    ],
    content: (
      <>
        <P>
          &quot;How much will it cost?&quot; is the first question every homeowner asks — and the honest answer is that
          hardscape pricing depends on a handful of very specific factors. This guide breaks down what goes into the price of a
          paver patio, a paver driveway and a retaining wall in Metro Atlanta, so you can read a quote with confidence and spot
          the corners that cheap bids cut.
        </P>
        <P>
          If you already know what you want, the fastest way to get a real number is a{' '}
          <L to="/quote">free on-site estimate</L>. If you are still planning, keep reading.
        </P>

        <H2>The 6 Factors That Drive Paver Pricing</H2>
        <Steps
          items={[
            { title: 'Square footage', text: 'Larger areas cost more in total but often less per square foot, because mobilization and setup are spread over more area.' },
            { title: 'Material choice', text: 'Standard concrete pavers, premium architectural pavers, tumbled travertine and natural flagstone all sit at different price points.' },
            { title: 'Demolition', text: 'Removing an old concrete slab, asphalt or a failed wall adds labor, equipment and disposal fees.' },
            { title: 'Base depth', text: 'Patios need a solid compacted base; driveways need a deeper, vehicle-rated base. More excavation and more aggregate means more cost — and far more durability.' },
            { title: 'Site access & slope', text: 'Tight side yards, steep grades and long wheelbarrow runs slow a crew down. Sloped yards may also need steps or walls.' },
            { title: 'Drainage & extras', text: 'Drain pipes, seat walls, steps, borders, lighting and fire features are all line items that change the final number.' },
          ]}
        />

        <H2>Paver Patio Cost</H2>
        <P>
          A backyard patio is usually the most budget-friendly hardscape project per square foot, because it does not carry
          vehicle traffic. The price climbs with premium stone (like travertine or flagstone), curves and pattern borders, and
          any grading needed to make a sloped yard flat. See our{' '}
          <L to="/service/outdoor-patio-builders">outdoor patio builder services</L> and local pages such as{' '}
          <L to="/paver-patio-duluth-ga">paver patios in Duluth</L> and{' '}
          <L to="/stone-patio-contractors-alpharetta-ga">stone patios in Alpharetta</L> for examples of scope.
        </P>

        <H2>Paver Driveway Cost</H2>
        <P>
          Driveways cost more than patios because they carry the weight of vehicles every day. That means deeper excavation, a
          thicker compacted base, stronger edge restraints and often a thicker paver. Most driveway projects also include
          tearing out the old concrete. Learn why that base matters in our guide to{' '}
          <L to="/blog/pavers-vs-concrete-driveway-georgia">pavers vs. concrete driveways</L>, or see our{' '}
          <L to="/driveway-pavers-atlanta">Atlanta driveway paver</L> page.
        </P>

        <H2>Retaining Wall Cost</H2>
        <P>
          Retaining walls are priced mostly by the face area of the wall (length × height). Height is the big multiplier: taller
          walls need geogrid reinforcement, more excavation, more drainage stone and, in some cases, an engineered design and a
          permit. A wall that holds back a driveway or a structure costs more than a decorative garden wall.
          Our <L to="/service/retaining-wall-installation">retaining wall installation</L> page explains our drainage-first
          approach.
        </P>

        <Table
          head={['Project', 'What raises the price', 'What protects your investment']}
          rows={[
            ['Paver patio', 'Premium stone, curves, grading, steps', 'Compacted base, proper pitch for drainage'],
            ['Paver driveway', 'Concrete removal, size, thicker pavers', 'Deep vehicle-rated base, edge restraint'],
            ['Retaining wall', 'Height, length, access, engineering', 'Drain pipe, gravel zone, geogrid'],
            ['Pool deck', 'Coping replacement, travertine, demo', 'Drainage around the pool, stable base'],
          ]}
        />

        <Callout title="Watch for this in cheap quotes">
          If a quote does not list base depth, geotextile fabric, edge restraints and polymeric sand, ask. Those are the items
          most often cut to win a bid — and the reason pavers sink and walls lean a few years later.
        </Callout>

        <H2>How to Compare Hardscape Quotes</H2>
        <UL
          items={[
            'Ask each contractor for excavation depth and base thickness in writing.',
            'Confirm who does the work — in-house crews or subcontractors.',
            'Check that drainage is included where water will collect.',
            'Ask what the warranty covers and for how long.',
            'Make sure permits and HOA approvals are addressed for walls and driveways.',
          ]}
        />
        <P>
          We serve homeowners across <L to="/service-areas">North Metro Atlanta</L>, including{' '}
          <L to="/pavers-alpharetta-ga">Alpharetta</L>, <L to="/paver-patio-johns-creek-ga">Johns Creek</L>,{' '}
          <L to="/hardscape-roswell-ga">Roswell</L> and <L to="/driveway-pavers-marietta-ga">Marietta</L>. When you are ready,{' '}
          <L to="/quote">request your free estimate</L>.
        </P>
      </>
    ),
  },
  {
    slug: 'pavers-vs-concrete-driveway-georgia',
    title: 'Pavers vs. Concrete Driveways in Georgia: Which Lasts Longer on Red Clay?',
    badge: 'Comparison',
    category: 'Comparisons',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    readTime: '7 min read',
    image: 'https://i.imgur.com/by6FzIkl.webp',
    alt: 'Interlocking paver driveway leading to a two-car garage',
    excerpt:
      'Why poured concrete driveways crack in Georgia clay, how interlocking pavers handle soil movement, and a side-by-side comparison of cost, lifespan, repairs and curb appeal.',
    keyTakeaways: [
      'Georgia red clay expands when wet and shrinks when dry — rigid concrete slabs crack as the ground moves.',
      'Interlocking pavers sit on a flexible, compacted base and move slightly with the soil instead of cracking.',
      'A damaged paver can be lifted and replaced; a cracked slab has to be patched or replaced.',
      'Pavers cost more to install, but usually win on repairs, lifespan and curb appeal.',
      'The base — not the paver — determines whether a driveway stays level.',
    ],
    faqs: [
      {
        q: 'Do paver driveways sink over time?',
        a: 'Only when the base is too thin or poorly compacted. A properly excavated, compacted aggregate base with edge restraints keeps a paver driveway level under daily vehicle traffic.',
      },
      {
        q: 'Can pavers be installed over an existing concrete driveway?',
        a: 'In limited cases pavers can be installed over sound concrete, but a cracked or heaving slab should be removed. Installing over a failing slab simply transfers its problems to the new surface.',
      },
      {
        q: 'Do weeds grow between driveway pavers?',
        a: 'Polymeric sand in the joints hardens and dramatically reduces weeds and ant activity. Topping it up every few years keeps joints tight.',
      },
      {
        q: 'Are permeable pavers worth it?',
        a: 'Permeable pavers let rainwater soak through the surface into a stone reservoir below. They are a smart option for properties with runoff problems or impervious-surface limits.',
      },
    ],
    relatedServices: [
      { name: 'Driveway Pavers', path: '/service/driveway-pavers' },
      { name: 'Driveway Pavers Atlanta', path: '/driveway-pavers-atlanta' },
      { name: 'Driveway Pavers Alpharetta', path: '/driveways-pavers-alpharetta-ga' },
    ],
    content: (
      <>
        <P>
          Drive through any Metro Atlanta neighborhood and you will see it: concrete driveways with long diagonal cracks, sunken
          panels near the garage and stained, uneven edges. The culprit is usually not the concrete itself — it is the soil
          underneath. This guide explains why, and how interlocking pavers solve the problem.
        </P>

        <H2>Why Concrete Driveways Crack in Georgia</H2>
        <P>
          Much of the Atlanta area sits on dense red clay. Clay swells when it absorbs water and shrinks as it dries. A poured
          concrete driveway is one rigid slab, so when the ground below moves unevenly, the slab has nowhere to go — it cracks.
          Control joints help decide <em>where</em> it cracks, but they do not stop it.
        </P>

        <H2>How Interlocking Pavers Handle Soil Movement</H2>
        <P>
          A paver driveway is thousands of individual units locked together by joint sand and edge restraints, sitting on a
          compacted aggregate base. When the soil moves slightly, the system flexes instead of breaking. The base spreads vehicle
          loads over a wide area, and the joints let the surface move without visible cracking. This is why we invest so heavily
          in excavation and base work on every{' '}
          <L to="/service/driveway-pavers">driveway paver installation</L>.
        </P>

        <Table
          head={['', 'Poured concrete', 'Interlocking pavers']}
          rows={[
            ['Upfront cost', 'Lower', 'Higher'],
            ['Cracking on clay', 'Common', 'Rare with a proper base'],
            ['Repairs', 'Patch or replace the slab', 'Lift and replace individual pavers'],
            ['Curb appeal', 'Plain, stains show', 'Many colors, patterns and borders'],
            ['Ready to drive on', 'Needs curing time', 'Usually right after installation'],
          ]}
        />

        <H2>What Makes a Paver Driveway Last</H2>
        <Steps
          items={[
            { title: 'Excavate deep enough', text: 'Remove the old slab and soft topsoil down to stable subgrade.' },
            { title: 'Build a compacted base', text: 'Place graded aggregate in layers and compact each one with a plate compactor.' },
            { title: 'Separate soil and stone', text: 'Geotextile fabric keeps clay from pumping up into the base over time.' },
            { title: 'Lock the edges', text: 'Edge restraints stop pavers from spreading under tire loads.' },
            { title: 'Seal the joints', text: 'Polymeric sand hardens in the joints to lock pavers together and block weeds.' },
          ]}
        />

        <Callout title="Local tip">
          If your lot slopes toward the garage, drainage matters as much as the pavers. Ask your contractor how water will leave
          the driveway — a channel drain or re-grading may be part of the right solution.
        </Callout>

        <H2>The Verdict</H2>
        <P>
          If you want the lowest upfront price, concrete wins. If you want a driveway that handles Georgia clay, is easy to
          repair and adds curb appeal, pavers are the better long-term choice. See local examples in{' '}
          <L to="/driveway-pavers-atlanta">Atlanta</L>, <L to="/driveways-pavers-alpharetta-ga">Alpharetta</L>,{' '}
          <L to="/paving-stone-contractor-roswell">Roswell</L>, <L to="/driveway-pavers-johns-creek-ga">Johns Creek</L> and{' '}
          <L to="/driveway-pavers-duluth-ga">Duluth</L>, or read our{' '}
          <L to="/blog/paver-patio-and-driveway-cost-atlanta">Atlanta paver cost guide</L>.
        </P>
      </>
    ),
  },
  {
    slug: 'how-to-clean-and-seal-pavers',
    title: 'How to Clean and Seal Pavers: A Step-by-Step Maintenance Guide',
    badge: 'How-To Guide',
    category: 'Maintenance',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    readTime: '6 min read',
    image: 'https://i.imgur.com/h3NCvta.jpeg',
    alt: 'Clean, sealed paver patio with outdoor furniture',
    excerpt:
      'Keep your paver patio, driveway or pool deck looking new: routine cleaning, removing oil and rust stains, re-sanding joints with polymeric sand and when (and how) to seal.',
    keyTakeaways: [
      'Sweep regularly and rinse with a garden hose; most dirt never needs more than that.',
      'Use a pressure washer carefully — a wide fan tip held at an angle — to avoid blasting out joint sand.',
      'Treat oil, rust and organic stains with products made for concrete pavers, not harsh acids.',
      'Top up polymeric sand when joints drop below the chamfer of the paver.',
      'Sealing is optional but helps with stain resistance and color; reseal every few years.',
    ],
    faqs: [
      {
        q: 'How often should pavers be sealed?',
        a: 'Sealing is optional. If you choose to seal, most sealers are reapplied every few years depending on traffic, sun exposure and the product used. Always let new pavers cure before sealing — ask your installer for the right timing.',
      },
      {
        q: 'Can I pressure wash my pavers?',
        a: 'Yes, carefully. Use a wide fan tip, keep the wand moving at an angle and avoid aiming directly into the joints. Re-sand the joints afterwards if sand was removed.',
      },
      {
        q: 'What causes white haze on new pavers?',
        a: 'That is usually efflorescence — natural salts rising to the surface of concrete products. It typically fades over time and can be removed with an efflorescence cleaner.',
      },
      {
        q: 'Why are weeds growing between my pavers?',
        a: 'Joint sand has washed out or was never stabilized. Clean the joints, then refill them with polymeric sand and activate it with water to harden.',
      },
    ],
    relatedServices: [
      { name: 'Outdoor Patio Builders', path: '/service/outdoor-patio-builders' },
      { name: 'Pool Deck Pavers', path: '/service/pool-deck-pavers' },
      { name: 'Driveway Pavers', path: '/service/driveway-pavers' },
    ],
    content: (
      <>
        <P>
          Pavers are one of the lowest-maintenance surfaces you can put outside your home — but a little care every season keeps
          the color rich, the joints tight and the weeds out. Here is the routine we recommend to homeowners after we finish a{' '}
          <L to="/service/outdoor-patio-builders">patio</L>, <L to="/service/driveway-pavers">driveway</L> or{' '}
          <L to="/service/pool-deck-pavers">pool deck</L>.
        </P>

        <H2>Method 1: Routine Cleaning</H2>
        <Steps
          items={[
            { title: 'Sweep or blow off debris', text: 'Leaves, pine straw and dirt hold moisture and encourage moss. Clear them regularly, especially in fall.' },
            { title: 'Rinse with a hose', text: 'A normal garden hose removes most dust and pollen — and Atlanta pollen season will test you.' },
            { title: 'Scrub stubborn spots', text: 'Use a stiff nylon brush and a mild cleaner made for pavers. Avoid wire brushes, which leave marks.' },
          ]}
        />

        <H2>Method 2: Removing Common Stains</H2>
        <H3>Oil and grease</H3>
        <P>Blot fresh spills immediately, cover with an absorbent (like cat litter), then treat with a paver degreaser.</P>
        <H3>Rust</H3>
        <P>Rust from furniture or fertilizer needs a rust remover formulated for concrete pavers. Test in a hidden spot first.</P>
        <H3>Organic stains</H3>
        <P>Leaves, berries and algae usually respond to a paver cleaner and a brush; shaded areas may need a periodic treatment.</P>

        <Callout title="Avoid this">
          Do not use muriatic acid or other harsh acids on concrete pavers. They can etch the surface and change the color
          permanently.
        </Callout>

        <H2>Method 3: Re-Sanding Joints with Polymeric Sand</H2>
        <Steps
          items={[
            { title: 'Clean and dry the joints', text: 'Remove weeds and loose sand, then let the surface dry completely.' },
            { title: 'Sweep in polymeric sand', text: 'Fill joints to just below the paver chamfer and compact with a plate compactor or by tapping.' },
            { title: 'Blow off the surface', text: 'Remove every grain from the paver faces so it does not harden into a haze.' },
            { title: 'Activate with a light mist', text: 'Follow the product instructions for watering so the sand hardens in the joint.' },
          ]}
        />

        <H2>Method 4: Sealing (Optional)</H2>
        <P>
          A quality paver sealer can enhance color (a &quot;wet look&quot; or natural matte finish), make stains easier to clean
          and help stabilize joint sand. It is not required for structural performance. If you seal, clean thoroughly first, let
          the surface dry, and apply thin, even coats.
        </P>

        <H2>When to Call a Professional</H2>
        <UL
          items={[
            'Pavers are sinking or rocking — that is a base problem, not a cleaning problem.',
            'Water pools on the surface after rain.',
            'A retaining wall next to the patio is leaning or bulging.',
          ]}
        />
        <P>
          Those are signs of drainage or base issues. Our crews repair and rebuild hardscapes across{' '}
          <L to="/service-areas">North Metro Atlanta</L>. <L to="/quote">Request a free evaluation</L>.
        </P>
      </>
    ),
  },
  {
    slug: 'why-retaining-walls-fail-georgia',
    title: 'Why Retaining Walls Fail in Georgia (and How to Build One That Lasts)',
    badge: 'Expert Guide',
    category: 'Planning',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    readTime: '7 min read',
    image: 'https://i.imgur.com/dZstK86l.webp',
    alt: 'Segmental block retaining wall terracing a sloped backyard',
    excerpt:
      'Leaning, bulging or collapsing walls almost always come down to water. Learn the warning signs, what proper drainage and geogrid look like, and when a wall needs a permit or engineer.',
    keyTakeaways: [
      'Water pressure behind the wall (hydrostatic pressure) is the number one cause of retaining wall failure.',
      'A proper wall has a compacted base, a perforated drain pipe and a clean gravel drainage zone behind the blocks.',
      'Taller walls need geogrid reinforcement tied back into the soil.',
      'Warning signs: leaning, bulging, cracks, gaps between blocks and soil washing out at the base.',
      'Taller or load-bearing walls may require a permit and an engineered design — check local rules.',
    ],
    faqs: [
      {
        q: 'Can a leaning retaining wall be fixed?',
        a: 'Sometimes a short section can be rebuilt, but a wall that is leaning because of missing drainage or reinforcement usually needs to be taken down and rebuilt correctly.',
      },
      {
        q: 'What is the best material for a retaining wall in Georgia?',
        a: 'Segmental concrete block systems are the most common because they are engineered, consistent and pair with geogrid. Natural stone and boulder walls are beautiful options for the right site.',
      },
      {
        q: 'How tall can a retaining wall be without a permit?',
        a: 'It depends on your city and county. Many jurisdictions require permits and engineering above a certain height or when the wall supports a load. We check requirements for your address before we start.',
      },
      {
        q: 'Do retaining walls need drainage?',
        a: 'Yes. Every wall should have a way for water to escape: a gravel drainage zone and a perforated pipe at the base that outlets downhill.',
      },
    ],
    relatedServices: [
      { name: 'Retaining Wall Installation', path: '/service/retaining-wall-installation' },
      { name: 'Retaining Walls Atlanta', path: '/retaining-walls-atlanta' },
      { name: 'Hardscape Roswell GA', path: '/hardscape-roswell-ga' },
    ],
    content: (
      <>
        <P>
          Retaining walls do a hard job: they hold back tons of soil on sloped Georgia lots. When they are built correctly, they
          last for decades. When they are not, they lean, bulge and eventually collapse — often taking landscaping, fences or even
          driveways with them. Here is what goes wrong, and what a well-built wall looks like.
        </P>

        <H2>The #1 Cause: Water</H2>
        <P>
          After a heavy storm, the soil behind a wall fills with water. Wet soil is heavier, and trapped water pushes on the back
          of the wall. Without an exit path, that pressure keeps building until the wall moves. Georgia clay makes this worse
          because it holds water and drains slowly.
        </P>

        <H2>Warning Signs Your Wall Is Failing</H2>
        <UL
          items={[
            'The wall leans forward or the top is no longer straight.',
            'Blocks bulge out in the middle of the wall.',
            'Cracks, gaps or blocks shifting out of line.',
            'Soil or water seeping through the face or washing out at the base.',
            'Puddles or soggy soil at the top of the wall after rain.',
          ]}
        />

        <H2>How a Proper Retaining Wall Is Built</H2>
        <Steps
          items={[
            { title: 'Excavate and build a leveling pad', text: 'The first course sits partially buried on a compacted gravel pad so the wall starts dead level.' },
            { title: 'Install drainage', text: 'A perforated drain pipe runs along the base and outlets downhill; clean gravel fills the zone right behind the blocks.' },
            { title: 'Add geogrid on taller walls', text: 'Layers of geogrid extend back into the compacted soil, tying the wall to the hill it holds.' },
            { title: 'Compact backfill in lifts', text: 'Soil is placed and compacted in thin layers — never dumped all at once.' },
            { title: 'Cap and grade', text: 'Caps finish the wall, and the ground above is graded so surface water flows away from the wall.' },
          ]}
        />

        <Callout title="Permits & engineering">
          Wall height limits for permits and engineering vary by jurisdiction in Fulton, Gwinnett, Cobb and DeKalb counties.
          Walls that support driveways, structures or steep slopes may need an engineered design regardless of height.
        </Callout>

        <H2>Turning a Slope Into Usable Space</H2>
        <P>
          A well-built wall does more than stop erosion — it creates flat ground for a{' '}
          <L to="/service/outdoor-patio-builders">patio</L>, lawn or play area. Terraced walls with steps are one of the most
          popular projects we build in hilly areas like <L to="/hardscape-roswell-ga">Roswell</L>,{' '}
          <L to="/retaining-walls-sandy-springs-ga">Sandy Springs</L> and <L to="/retaining-walls-marietta-ga">Marietta</L>.
        </P>
        <P>
          Learn more about our <L to="/service/retaining-wall-installation">retaining wall installation</L> process or see our{' '}
          <L to="/retaining-walls-atlanta">Atlanta retaining wall</L> page, then{' '}
          <L to="/quote">schedule a free site evaluation</L>.
        </P>
      </>
    ),
  },
  {
    slug: 'travertine-vs-pavers-pool-deck',
    title: 'Travertine vs. Concrete Pavers for Pool Decks: Heat, Safety and Cost Compared',
    badge: 'Comparison',
    category: 'Comparisons',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    readTime: '6 min read',
    image: 'https://i.imgur.com/vEHS8LGl.webp',
    alt: 'Travertine pool deck with bullnose coping around a backyard pool',
    excerpt:
      'Choosing a pool deck surface for a Georgia summer? Compare travertine and concrete pavers on surface temperature, slip resistance, durability, maintenance and price.',
    keyTakeaways: [
      'Travertine stays noticeably cooler underfoot than concrete, making it the favorite for barefoot areas.',
      'Tumbled travertine and textured pavers are both slip-resistant when wet.',
      'Concrete pavers offer more colors and patterns and are usually more budget-friendly.',
      'Both install on a compacted base that lets the deck move without cracking like a slab.',
      'Coping (the edge around the pool) should be planned together with the deck.',
    ],
    faqs: [
      {
        q: 'Does travertine need to be sealed around a pool?',
        a: 'Sealing is recommended for many travertine pool decks, especially saltwater pools, to help resist staining and salt damage. Use a breathable sealer made for natural stone.',
      },
      {
        q: 'Is travertine good for saltwater pools?',
        a: 'It can be, with the right product and sealing. Denser, higher-grade travertine and a quality sealer help protect against salt.',
      },
      {
        q: 'Can you install pavers over an existing pool deck?',
        a: 'In some cases, if the existing concrete is sound and elevations allow. Cracked or heaving decks are better removed first.',
      },
      {
        q: 'How long does a pool deck project take?',
        a: 'Most pool deck renovations take about 1 to 2 weeks, depending on deck size, demolition and coping work.',
      },
    ],
    relatedServices: [
      { name: 'Pool Deck Pavers', path: '/service/pool-deck-pavers' },
      { name: 'Pool Deck Pavers Atlanta', path: '/pool-deck-pavers-atlanta' },
      { name: 'Outdoor Patio Builders', path: '/service/outdoor-patio-builders' },
    ],
    content: (
      <>
        <P>
          In an Atlanta summer, the wrong pool deck means hot feet, slippery corners and cracks within a few years. The two
          surfaces we install most often are natural travertine and concrete pavers. Here is how they compare.
        </P>

        <Table
          head={['', 'Travertine', 'Concrete pavers']}
          rows={[
            ['Surface temperature', 'Stays cooler in sun', 'Warmer; lighter colors help'],
            ['Slip resistance', 'Good (tumbled finish)', 'Good (textured finish)'],
            ['Look', 'Natural, high-end stone', 'Wide range of colors & patterns'],
            ['Budget', 'Higher', 'More budget-friendly'],
            ['Maintenance', 'Seal periodically', 'Re-sand joints, optional seal'],
          ]}
        />

        <H2>Why Travertine Feels Cooler</H2>
        <P>
          Travertine is a porous natural stone with a light color that reflects sunlight and releases heat quickly. On a July
          afternoon it is simply more comfortable to walk on than dark concrete — which is why it is the most requested
          material on our <L to="/pool-deck-pavers-atlanta">Atlanta pool deck</L> projects.
        </P>

        <H2>Why Concrete Pavers Are Still a Great Choice</H2>
        <P>
          Pavers come in dozens of colors and textures, are consistent in size and are usually easier on the budget. Choosing a
          lighter color and a textured finish keeps them comfortable and safe around the water.
        </P>

        <H2>Don&apos;t Forget the Coping</H2>
        <P>
          The coping is the edge that wraps the pool. Bullnose travertine or paver coping creates a smooth, rounded edge that is
          comfortable to sit on. Planning the coping and deck together gives the cleanest result.
        </P>

        <Steps
          items={[
            { title: 'Remove the old deck', text: 'Cracked concrete is removed and the area is re-graded so water drains away from the pool.' },
            { title: 'Set the coping', text: 'Coping is anchored to the pool beam with proper mortar and alignment.' },
            { title: 'Build the base', text: 'A compacted base or mortar bed is installed depending on the material and design.' },
            { title: 'Lay the deck', text: 'Travertine or pavers are laid, cut and finished with joint sand or grout.' },
          ]}
        />

        <P>
          Want to extend your pool area into a full outdoor living space? Pair it with an{' '}
          <L to="/outdoor-kitchen-johns-creek-ga">outdoor kitchen</L> or a{' '}
          <L to="/service/masonry-fireplaces">fire feature</L>. Explore our{' '}
          <L to="/service/pool-deck-pavers">pool deck paver services</L> or{' '}
          <L to="/quote">get a free estimate</L>.
        </P>
      </>
    ),
  },
  {
    slug: 'outdoor-kitchen-planning-guide',
    title: 'Planning an Outdoor Kitchen in Metro Atlanta: Layout, Materials and Budget',
    badge: 'Planning Guide',
    category: 'Planning',
    datePublished: '2026-09-26',
    dateModified: '2026-09-26',
    readTime: '7 min read',
    image: 'https://i.imgur.com/G2N5Chsl.webp',
    alt: 'Stone outdoor fireplace and seating area on a backyard patio',
    excerpt:
      'From choosing a layout and appliances to picking weather-proof countertops and planning gas, water and power — everything to decide before building an outdoor kitchen in Georgia.',
    keyTakeaways: [
      'Plan the kitchen and the patio together so footings, drainage and utilities line up.',
      'Choose UV-stable, dense countertops — granite and quartzite handle Georgia sun and freeze-thaw cycles.',
      'Decide early on gas, water and electrical; utility runs are a major part of the budget.',
      'Leave landing space on both sides of the grill and plan seating out of the smoke path.',
      'A stone island needs a reinforced concrete footing to prevent settling.',
    ],
    faqs: [
      {
        q: 'Do I need a permit for an outdoor kitchen?',
        a: 'Gas lines, electrical circuits and some structures typically require permits. We coordinate the required permits and inspections for your project.',
      },
      {
        q: 'Can I add an outdoor kitchen to my existing patio?',
        a: 'Sometimes. We evaluate whether the existing patio can support the island and how utilities will reach it. Often a new footing and a partial patio rebuild give the best result.',
      },
      {
        q: 'What appliances should an outdoor kitchen have?',
        a: 'Most start with a built-in grill and storage. Popular additions include a side burner, outdoor-rated refrigerator, sink, pizza oven and bar seating.',
      },
      {
        q: 'How long does it take to build an outdoor kitchen?',
        a: 'Most projects take 1 to 3 weeks depending on island size, utilities and whether a new patio is being built at the same time.',
      },
    ],
    relatedServices: [
      { name: 'Outdoor Kitchens Johns Creek', path: '/outdoor-kitchen-johns-creek-ga' },
      { name: 'Masonry & Fireplaces', path: '/service/masonry-fireplaces' },
      { name: 'Outdoor Patio Builders', path: '/service/outdoor-patio-builders' },
    ],
    content: (
      <>
        <P>
          An outdoor kitchen turns a backyard into the place everyone wants to be. The best ones feel effortless — but that
          comes from decisions made long before the first stone is set. Use this guide to plan yours.
        </P>

        <H2>Step 1: Pick a Layout</H2>
        <UL
          items={[
            <><strong>Straight island</strong> — a single run with the grill and counter space; ideal for smaller patios.</>,
            <><strong>L-shape</strong> — separates cooking and prep, with room for bar seating on the outside.</>,
            <><strong>U-shape</strong> — the full chef&apos;s setup with maximum counter and storage.</>,
            <><strong>Island + fire feature</strong> — pairs the kitchen with a <L to="/service/masonry-fireplaces">fireplace or fire pit</L> for year-round use.</>,
          ]}
        />

        <H2>Step 2: Choose Weather-Proof Materials</H2>
        <P>
          Georgia sun, humidity and occasional freezes are hard on outdoor surfaces. Dense natural stone such as granite or
          quartzite works well for countertops; many indoor quartz products can discolor under UV. Islands are typically built on
          a masonry or steel frame and clad in <L to="/service/stone-veneer">stone veneer</L>.
        </P>

        <H2>Step 3: Plan Utilities Early</H2>
        <Steps
          items={[
            { title: 'Gas', text: 'Natural gas line or propane — the location of your meter affects cost.' },
            { title: 'Electrical', text: 'Outdoor-rated circuits for refrigerators, lighting and outlets.' },
            { title: 'Water & drain', text: 'A sink needs a supply line and a way to drain; plan it before the patio is built.' },
          ]}
        />

        <Callout title="Build order matters">
          Footings and utility sleeves go in before the patio pavers. Building the kitchen and the{' '}
          patio as one project avoids cutting into a finished surface later.
        </Callout>

        <H2>Step 4: Think About Flow and Comfort</H2>
        <UL
          items={[
            'Keep seating out of the prevailing smoke path from the grill.',
            'Leave landing space on both sides of the grill.',
            'Add shade — a pergola or pavilion — for summer afternoons.',
            'Plan lighting for evening cooking and entertaining.',
          ]}
        />

        <H2>Ready to Plan Yours?</H2>
        <P>
          We design and build outdoor kitchens together with the <L to="/service/outdoor-patio-builders">patio</L> they sit on,
          across <L to="/outdoor-kitchen-johns-creek-ga">Johns Creek</L>,{' '}
          <L to="/outdoor-kitchens-alpharetta-ga">Alpharetta</L>, <L to="/outdoor-kitchens-duluth-ga">Duluth</L>,{' '}
          <L to="/outdoor-kitchens-suwanee-ga">Suwanee</L> and the rest of{' '}
          <L to="/service-areas">North Metro Atlanta</L>. Start with a{' '}
          <L to="/quote">free design consultation</L>, or read our{' '}
          <L to="/blog/paver-patio-and-driveway-cost-atlanta">hardscape cost guide</L>.
        </P>
      </>
    ),
  },
];

export const blogPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
};

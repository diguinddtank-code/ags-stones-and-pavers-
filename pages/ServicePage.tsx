import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ServiceDynamicContent, ServiceData } from '../components/ServiceDynamicContent';
import { SEO } from '../components/SEO';

const serviceDataDb: Record<string, ServiceData> = {
  'driveway-pavers': {
    id: 'driveway-pavers',
    name: 'Driveway Pavers',
    heroImage: 'https://i.imgur.com/by6FzIkl.webp',
    heroSubtitle: 'Luxury Hardscaping',
    overviewHeading: 'Elevate your home\'s curb appeal with a driveway built to outlast concrete.',
    overviewParagraphs: [
      "Your driveway is the first impression of your home. We replace cracked, shifting concrete with premium interlocking pavers that flex with the earth and stand the test of time.",
      "Most contractors cut corners on the base preparation, which is why their driveways sink and settle within a few years. At AGS Stones, we excavate deep, build a proper foundational base, and use high-density polymeric sand to ensure a structural finish that holds the weight of your vehicles effortlessly."
    ],
    parallaxImage: 'https://i.imgur.com/by6FzIkl.webp',
    parallaxQuote: "Quality craftsmanship that transforms your outdoor space.",
    process: [
      { title: 'Consultation', description: 'We evaluate your grading, soil, and drainage.' },
      { title: 'Excavation & Base', description: 'We establish a rock-solid foundation for maximum load bearing.' },
      { title: 'Precision Laying', description: 'Our craftsmen install premium interlocking pavers with exact leveling.' },
      { title: 'Polymeric Sealing', description: 'Joints are locked in with advanced polymeric sand to prevent weeds.' }
    ]
  },
  'outdoor-patio-builders': {
    id: 'outdoor-patio-builders',
    name: 'Outdoor Patio Builders',
    heroImage: 'https://i.imgur.com/SIBIdiFl.webp',
    heroSubtitle: 'Backyard Transformation',
    overviewHeading: 'Turn your backyard into your own private luxury resort.',
    overviewParagraphs: [
      "An outdoor patio isn't just a place to sit; it's an extension of your living room. We design and build custom stone patios for luxury outdoor living, giving you the perfect space to entertain family and friends.",
      "From sleek modern formats to rustic natural stone, we source only robust materials. Every project is engineered to manage water runoff perfectly, so your space stays dry, leveled, and beautiful year after year."
    ],
    parallaxImage: 'https://i.imgur.com/SIBIdiFl.webp',
    parallaxQuote: "Built to last. Designed to impress.",
    process: [
      { title: 'Design Layout', description: 'Custom footprint matching your lifestyle and home architecture.' },
      { title: 'Site Prep', description: 'Proper grading and aggregate base installation.' },
      { title: 'Hardscaping', description: 'Detailed installation of your chosen stone or pavers.' },
      { title: 'Final Polish', description: 'Sweeping, sanding, and site cleanup.' }
    ]
  },
  'retaining-wall-installation': {
    id: 'retaining-wall-installation',
    name: 'Retaining Wall Installation',
    heroImage: 'https://i.imgur.com/dZstK86l.webp',
    heroSubtitle: 'Structural Integrity',
    overviewHeading: 'Reclaim your yard with engineered stone walls that stop erosion in its tracks.',
    overviewParagraphs: [
      "Steep slopes and soil erosion can make large portions of your property unusable. We fix erosion and level yards with engineered stone walls that offer both structural stability and architectural beauty.",
      "A failing retaining wall is a massive liability. That's why we over-engineer our walls with proper geo-grid reinforcement, commercial-grade drainage gravel, and robust piping. We build it once, and we build it right."
    ],
    parallaxImage: 'https://i.imgur.com/dZstK86l.webp',
    parallaxQuote: "Engineering meets aesthetic mastery.",
    process: [
      { title: 'Site Engineering', description: 'Analyzing soil retention needs and water flow.' },
      { title: 'Trench & Base', description: 'Setting a solid footing beneath the frost/grade line.' },
      { title: 'Block & Grid', description: 'Installing modular blocks and structural geogrid.' },
      { title: 'Backfill & Drainage', description: 'Ensuring zero hydrostatic pressure buildup behind the wall.' }
    ]
  },
  'masonry-fireplaces': {
    id: 'masonry-fireplaces',
    name: 'Masonry & Fireplaces',
    heroImage: 'https://i.imgur.com/G2N5Chsl.webp',
    heroSubtitle: 'Warmth & Ambiance',
    overviewHeading: 'Create a stunning focal point with custom stone masonry fire features.',
    overviewParagraphs: [
      "A crackling fire naturally brings people together. We craft breathtaking outdoor fireplaces and fire pits that serve as the centerpiece of your outdoor living area.",
      "Our masons specialize in natural stone veneering and custom firebox construction, guaranteeing a safe, smokeless, and architecturally beautiful heating solution for those brisk evenings."
    ],
    parallaxImage: 'https://i.imgur.com/G2N5Chsl.webp',
    parallaxQuote: "Where memories are made and warmth is shared.",
    process: [
      { title: 'Vision', description: 'Selecting stone profiles and determining fire configurations.' },
      { title: 'Footing', description: 'Pouring structural concrete foundations for weight bearing.' },
      { title: 'Block Work', description: 'Laying the cinderblock structure and firebox.' },
      { title: 'Veneering', description: 'Hand-chiseling and setting the final stone facade.' }
    ]
  },
  'deck-builders': {
    id: 'deck-builders',
    name: 'Premium Deck Builders',
    heroImage: 'https://i.imgur.com/6f4H9fLl.webp',
    heroSubtitle: 'Elevated Outdoor Living',
    overviewHeading: 'Expand your home\'s footprint with masterfully engineered custom decking.',
    overviewParagraphs: [
      "Not every yard is flat enough for a simple patio. We design and build structural decks utilizing premium composite materials for a zero-maintenance finish.",
      "We often integrate our framing systems above custom stone hardscapes, bringing multi-level luxury to your home. Every post and joist is overbuilt to prevent swaying or sagging over the decades."
    ],
    parallaxImage: 'https://i.imgur.com/6f4H9fLl.webp',
    parallaxQuote: "Engineered for life, crafted for luxury.",
    process: [
      { title: 'Planning', description: 'Determining load requirements and railing styles.' },
      { title: 'Framing', description: 'Installing structural posts and treated lumber joists.' },
      { title: 'Decking', description: 'Laying premium composite boards with hidden fasteners.' },
      { title: 'Integration', description: 'Tying into existing stonework or hardscaping.' }
    ]
  },
  'pool-deck-pavers': {
    id: 'pool-deck-pavers',
    name: 'Pool Deck Pavers',
    heroImage: 'https://i.imgur.com/vEHS8LGl.webp',
    heroSubtitle: 'Resort-Style Oasis',
    overviewHeading: 'Surround your pool with slip-resistant, heat-deflecting stone pavers.',
    overviewParagraphs: [
      "Your pool is your sanctuary, but slippery or cracked concrete decking ruins the experience. We specialize in pool deck overlays and brand new installations featuring cool-touch travertine and premium pavers.",
      "By replacing traditional concrete with modular stones, we allow the earth to shift without cracking the surface. Plus, our textured finishes ensure maximum safety when the deck gets wet."
    ],
    parallaxImage: 'https://i.imgur.com/vEHS8LGl.webp',
    parallaxQuote: "Safety meets unmatched elegance.",
    process: [
      { title: 'Assessment', description: 'Evaluating drainage and existing concrete or soil.' },
      { title: 'Coping', description: 'Installing the rounded bullnose edge around the pool.' },
      { title: 'Paving', description: 'Laying the main deck area with precise grading.' },
      { title: 'Finishing', description: 'Applying polymeric sand and protective sealants.' }
    ]
  },
  'stone-veneer': {
    id: 'stone-veneer',
    name: 'Architectural Stone Veneer',
    heroImage: 'https://i.pinimg.com/474x/7b/78/34/7b783454796659d0078c289f3308445f.jpg',
    heroSubtitle: 'Distinctive Facades',
    overviewHeading: 'Transform your home\'s exterior with authentic stone masonry.',
    overviewParagraphs: [
      "A home faced with high-quality stone veneer immediately signals luxury and permanence. Our master masons intricately piece together natural and manufactured stone to create breathtaking facades.",
      "Using polymer-modified mortars and weather-resistant techniques, we guarantee your stone adheres perfectly and repels moisture for a lifetime of beautiful curb appeal."
    ],
    parallaxImage: 'https://i.pinimg.com/474x/7b/78/34/7b783454796659d0078c289f3308445f.jpg',
    parallaxQuote: "The hallmark of a truly distinguished home.",
    process: [
      { title: 'Selection', description: 'Choosing the perfect stone profile and grout color.' },
      { title: 'Preparation', description: 'Installing lath and protective moisture barriers.' },
      { title: 'Scratch Coat', description: 'Applying the base mortar layer for maximum adhesion.' },
      { title: 'Masonry', description: 'Hand-setting each stone to create a masterful mosaic.' }
    ]
  },
  'landscape-design': {
    id: 'landscape-design',
    name: '3D Landscape Design',
    heroImage: 'https://i.ytimg.com/vi/3QhK363_d4A/hq720.jpg',
    heroSubtitle: 'Visionary Planning',
    overviewHeading: 'See your backyard transformation in stunning 3D before we ever break ground.',
    overviewParagraphs: [
      "Taking on a major outdoor project can feel overwhelming. We remove the guesswork by rendering your home and the proposed hardscaping in photorealistic 3D, allowing you to walk through the space virtually.",
      "This process ensures that proportions, elevations, and material selections are perfectly aligned with your vision, saving time and preventing costly changes during construction."
    ],
    parallaxImage: 'https://i.ytimg.com/vi/3QhK363_d4A/hq720.jpg',
    parallaxQuote: "Visualizing perfection before breaking ground.",
    process: [
      { title: 'Site Survey', description: 'Taking precise measurements of your existing property.' },
      { title: 'Drafting', description: 'Creating the initial 2D layout and zoning.' },
      { title: 'Rendering', description: 'Building the photorealistic 3D model and fly-throughs.' },
      { title: 'Approval', description: 'Finalizing the design before construction begins.' }
    ]
  }
};

const fallbackData: ServiceData = {
  id: 'default',
  name: 'Premium Hardscaping',
  heroImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
  heroSubtitle: 'Expert Installations',
  overviewHeading: 'Masterful masonry and hardscaping for the most discerning homeowners.',
  overviewParagraphs: [
    "We construct beautiful, functional outdoor living spaces using the finest materials available. Locally sourced and built to last by dedicated in-house craftsmen.",
    "Our focus is on delivering a seamless client experience, from the initial 3D design to the final brush of polymeric sand."
  ],
  parallaxImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
  parallaxQuote: "We don't cut corners. We craft them.",
  process: [
    { title: 'Initial Call', description: 'Discussing your vision.' },
    { title: 'Design', description: 'Material selection and layout.' },
    { title: 'Installation', description: 'Execution with precision.' },
    { title: 'Walkthrough', description: 'Final inspection.' }
  ]
};

export const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [id]);

  const data = (id && serviceDataDb[id]) ? serviceDataDb[id] : fallbackData;

  const title = `${data.name} Contractors | Premium Hardscaping | AGS Stones`;
  const description = data.overviewParagraphs[0];
  const seoKeywords = [data.name.toLowerCase(), 'hardscaping contractors', 'outdoor living', 'AGS stones'];

  return (
    <div className="bg-white min-h-screen relative">
      <SEO 
        title={title}
        description={description}
        image={data.heroImage}
        canonicalPath={`/service/${id}`}
        keywords={seoKeywords}
      />
      <div className="absolute top-4 left-6 z-50">
         <Link to="/" className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black/50 transition-colors">
            <ArrowLeft size={16} /> Back
         </Link>
      </div>
      <ServiceDynamicContent data={data} />
    </div>
  );
};

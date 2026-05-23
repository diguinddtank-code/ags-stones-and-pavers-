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
      "Your driveway is the first impression of your home. We replace cracked, shifting concrete with premium interlocking pavers that flex with the earth and stand the test of time. Whether you need a prestigious estate entry or a robust suburban parkway, we serve the entire region with bespoke materials.",
      "Most contractors cut corners on base preparation, which is why their driveways sink. At AGS Stones, we excavate deep, build a proper aggregate base, and use high-density polymeric sand. If you are located in the north metro suburbs, explore our specialized [Driveway Pavers Alpharetta, GA](/driveways-pavers-alpharetta-ga) or our core municipal [Driveway Pavers Atlanta](/driveway-pavers-atlanta) services for regional engineering specifications."
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
  'driveways-pavers-alpharetta-ga': {
    id: 'driveways-pavers-alpharetta-ga',
    name: 'Driveway Pavers Alpharetta GA',
    heroImage: 'https://i.imgur.com/by6FzIkl.webp',
    heroSubtitle: 'ALPHARETTA\'S ULTRA-PREMIUM PAVER INSTALLERS',
    overviewHeading: 'Architectural Driveway Paver Installations in Alpharetta, GA — Built for Lifelong Structural Strength',
    overviewParagraphs: [
      "Alpharetta is renowned for its breathtaking estates, rich neighborhood standards, and demanding luxury home profiles. Standard poured concrete simply doesn't cut it—it cracks, stains, sinks, and compromises your home's luxury curb appeal. At AGS Stones, we design and install high-end interlocking paver driveways that elevate the elegance of Alpharetta's finest residences while delivering lifelong durability.",
      "Our industry-leading driveway installations are engineered with deep-compacted stone bases, stable commercial-grade geotextile underlayment, and premium joint stabilization. We manage the entire lifecycle—from securing neighborhood HOA approvals to integrating flawless, water-repelling transition grading. Looking for breathtaking backyard entertaining ideas? We also construct premium resort-grade [Outdoor Kitchens in Johns Creek, GA](/outdoor-kitchen-johns-creek-ga), and design sloped [Retaining Walls Atlanta](/retaining-walls-atlanta) systems for severe suburban terrains."
    ],
    parallaxImage: 'https://www.belgard.com/wp-content/uploads/2024/05/PearmeableCategoryPage_AltBox_Image1.webp',
    parallaxQuote: "Perfect precision engineering designed to match Alpharetta's highest architectural standards.",
    process: [
      { title: 'HOA & Structural Survey', description: 'Reviewing property lines, elevation limits, drainage paths, and specific subdivision standards.' },
      { title: 'Subgrade Clay Excavation', description: 'Removing heavy Georgia clay and establishing a thick base with dual-vibrated washed aggregate.' },
      { title: 'Artisanal Hand-Setting', description: 'Our in-house master masons hand-set premium stones in gorgeous custom alignments with exact tight gaps.' },
      { title: 'Joint Solidification & Seal', description: 'Applying next-gen polymeric security sand and premium hydrophobic sealants for long-term lock.' }
    ]
  },
  'outdoor-kitchen-johns-creek-ga': {
    id: 'outdoor-kitchen-johns-creek-ga',
    name: 'Outdoor Kitchens Johns Creek GA',
    heroImage: 'https://i.imgur.com/SIBIdiFl.webp',
    heroSubtitle: 'JOHNS CREEK\'S EXPERT RESORT BUILDERS',
    overviewHeading: 'Bespoke Outdoor Kitchens & Custom Patio Builders in Johns Creek, GA — Elevating Backyard Entertainment',
    overviewParagraphs: [
      "Transform your backyard into a luxury private resort. Premier homes in Johns Creek demand culinary-grade performance, high-performance outdoor kitchens, and gorgeous, master-crafted stonework. At AGS Stones, we design and build bespoke outdoor kitchens, custom bar counters, premium gas grills, fire features, and custom stone patios that act as flawless extensions of your living room.",
      "Our master hardscape designers utilize state-of-the-art 3D landscape modeling to render your setup in exact layout, proportions, and elevations before we ever break ground. Sourcing the finest Turkish Travertine, Brazilian Granite, and premium masonry blocks, we create resort-like entertainment centers that stand up to Georgia's seasonal shifts and remain pristine for decades. To complement your cooking zone, coordinate your home entrance with our high-end [Driveway Pavers Alpharetta, GA](/driveways-pavers-alpharetta-ga) or discover stunning slate tiles in our comprehensive [Outdoor Patios Atlanta](/outdoor-patios-atlanta) catalog."
    ],
    parallaxImage: 'https://i.imgur.com/h3NCvta.jpeg',
    parallaxQuote: "An exquisite outdoor sanctuary built for exquisite culinary moments.",
    process: [
      { title: '3D Resort Modeling', description: 'Simulating your precise backyard topography, seating arrangements, utilities, and line of sight.' },
      { title: 'Load-Bearing Concrete Footings', description: 'Digging deep and pouring steel-reinforced structural concrete pads to prevent any future settling or shifting.' },
      { title: 'Custom Stone & Countertop Framing', description: 'Building custom masonry counters clad in masterfully chiseled stone veneer, topped with premium quartzite or granite.' },
      { title: 'Utility Connection & Calibration', description: 'Surgical installation of lines, ventilation, ice makers, drawers, and professional-grade cooking appliances.' }
    ]
  },
  'driveway-pavers-atlanta': {
    id: 'driveway-pavers-atlanta',
    name: 'Driveway Pavers Atlanta',
    heroImage: 'https://i.imgur.com/by6FzIkl.webp',
    heroSubtitle: 'ATLANTA\'S PREMIER HARDSCAPE CONTRACTOR',
    overviewHeading: 'Atlanta\'s #1 Driveway Paver Installer — Zero Cracking, Engineered Base, 5-Year Lifetime Warranty',
    overviewParagraphs: [
      "Tired of dealing with ugly, sinking concrete that cracks under the scorching Georgia summer? In Atlanta's high-clay soils, standard poured concrete driveways are guaranteed to crack. Our interlocking driveway pavers are engineered to distribute heavy loads and flex with underground soil shifts, remaining flawless for decades.",
      "At AGS Stones, we follow a rigorous multi-step excavation process. We excavate down to pristine subgrade, compact a thick base of premium aggregate, lay down durable professional-grade geotextiles, and use advanced polymeric locking sand. Keep in mind that we also serve surrounding areas with premium services: check out our luxury [Driveway Pavers Alpharetta, GA](/driveways-pavers-alpharetta-ga) and secure your yard's steep sections with our dedicated [Retaining Walls Atlanta](/retaining-walls-atlanta) installations."
    ],
    parallaxImage: 'https://www.belgard.com/wp-content/uploads/2024/05/PearmeableCategoryPage_AltBox_Image1.webp',
    parallaxQuote: "We build the most durable pavements in Georgia. Done once, done right, backed by a 5-year structural warranty.",
    process: [
      { title: 'Atlanta Soil Analysis', description: 'We evaluate your driveway\'s unique runoff, clay density, and slope.' },
      { title: 'Deep Road-Base Prep', description: 'We compact premium gravel base with commercial-grade vibratory plates.' },
      { title: 'Precision Paver Setting', description: 'Our veteran in-house masons hand-set every single stone with absolute tight margins.' },
      { title: 'Polymeric Lock & Cure', description: 'Joints are locked with premium sand that solidifies into a barrier against weed and ants.' }
    ]
  },
  'retaining-walls-atlanta': {
    id: 'retaining-walls-atlanta',
    name: 'Retaining Walls Atlanta',
    heroImage: 'https://i.imgur.com/dZstK86l.webp',
    heroSubtitle: 'STRUCTURAL ENGINEERING & EROSION CONTROL',
    overviewHeading: 'Engineered Retaining Walls Built to Reclaim Hillside Yards & Prevent Land Loss in Atlanta',
    overviewParagraphs: [
      "Atlanta's hilly terrain combined with heavy seasonal rains can turn gorgeous yards into erosion disasters. We build commercial-grade, engineered retaining walls that hold back thousands of pounds of pressure, leveling your property to create stunning, usable flat tiers of green lawn.",
      "A collapsed retaining wall can cost tens of thousands in property damage. That's why we build walls that go beyond local code. Every wall features professional hydrostatic pressure relief drainage, dual-compacted backfill, and structural geogrid ties. Once your yard is leveled, it becomes the perfect site for our [Outdoor Patios Atlanta](/outdoor-patios-atlanta) designs or a robust interlocking setup constructed by our [Driveway Pavers Atlanta](/driveway-pavers-atlanta) specialists."
    ],
    parallaxImage: 'https://i.imgur.com/uDiqFSl.jpeg',
    parallaxQuote: "Taming Georgia slopes with structural mastery and pristine stone craftsmanship.",
    process: [
      { title: 'Slope & Weight Evaluation', description: 'Analyzing the height, lateral load, and water flow patterns of your slope.' },
      { title: 'Drainage Infrastructure', description: 'Installing commercial perforated pipes, geotextile wrap, and clean gravel beds.' },
      { title: 'Reinforced Block Laying', description: 'Using premium Allan Blocks or Segmental Masonry anchored with high-tensile geogrid.' },
      { title: 'Compacted Backfill', description: 'Backfilling with premium materials in 6-inch increments for permanent static load-bearing.' }
    ]
  },
  'outdoor-patios-atlanta': {
    id: 'outdoor-patios-atlanta',
    name: 'Outdoor Patios Atlanta',
    heroImage: 'https://i.imgur.com/SIBIdiFl.webp',
    heroSubtitle: 'RESORT-STYLE BACKYARD TRANSFORMATION',
    overviewHeading: 'Custom Patio Designers & Builders Transforming Backyard Living Across Metro Atlanta',
    overviewParagraphs: [
      "Don't settle for a basic, uninspired patio deck. Your backyard should be a private resort. We craft breathtaking, custom outdoor living spaces featuring premium flagstones, travertine, and architectural modular pavers.",
      "Each layout is custom-designed using advanced 3D visualizers, showing you exactly how your outdoor kitchen, fire feature, and dining areas flow together before we ever break ground. It is the perfect blend of high-end design and flawless durability. Build poolside beauty with our [Pool Deck Pavers Atlanta](/pool-deck-pavers-atlanta) team, or extend your culinary zone with our custom [Outdoor Kitchens in Johns Creek, GA](/outdoor-kitchen-johns-creek-ga) setups."
    ],
    parallaxImage: 'https://i.imgur.com/h3NCvta.jpeg',
    parallaxQuote: "Step out of your back door into an elegant, high-end paradise.",
    process: [
      { title: 'Resort-Style 3D Design', description: 'We render your entire property in 3D to visualize the optimal spatial layout.' },
      { title: 'Perfect Elevation Grading', description: 'Ensuring zero-pooling water slopes that guide rain away from your home\'s foundation.' },
      { title: 'Stone/Paver Crafting', description: 'Our master stone-setters organize a gorgeous mosaic layout with tight joints.' },
      { title: 'Sealing & Detail Handover', description: 'Applying top-tier sealers to protect against Georgia clays, fading, and spills.' }
    ]
  },
  'pool-deck-pavers-atlanta': {
    id: 'pool-deck-pavers-atlanta',
    name: 'Pool Deck Pavers Atlanta',
    heroImage: 'https://i.imgur.com/vEHS8LGl.webp',
    heroSubtitle: 'SLIP-RESISTANT COOL-TOUCH POOL DECKS',
    overviewHeading: 'Atlanta\'s Premier Cool-Touch Travertine & Paver Pool Deck Remodeling Experts',
    overviewParagraphs: [
      "Are you tired of scorching your feet on hot concrete or dealing with unsightly cracks around your pool? AGS Stones transforms outdated pool landscapes with gorgeous Turkish Travertine and luxury pavers that stay cool under the blistering Atlanta sun.",
      "Our specialized pool deck installation avoids cracking and shifting. By laying a permeable, self-draining bedding foundation, we manage splashed pool water perfectly, providing a slip-resistant, beautiful surface representing the absolute pinnacle of luxury hardscaping. For an integrated resort-feel, pair your new pool layout with luxury [Outdoor Kitchens in Johns Creek, GA](/outdoor-kitchen-johns-creek-ga) or transition smoothly into the yard with customized [Outdoor Patios Atlanta](/outdoor-patios-atlanta) flagstones."
    ],
    parallaxImage: 'https://i.imgur.com/uDiqFSl.jpeg',
    parallaxQuote: "Cool to the touch, beautiful to look at, and safe for your entire family.",
    process: [
      { title: 'Drainage & Coping Review', description: 'Inspecting pool water levels, skimmers, and structural deck requirements.' },
      { title: 'Bullnose Coping Setting', description: 'Anchoring thick travertine bullnose edging securely around your pool\'s concrete shell.' },
      { title: 'Modular Bedding Prep', description: 'Applying high-quality screenings and aggregate to allow natural, fast water drainage.' },
      { title: 'Perfect Leveling', description: 'Laying cool-touch travertine with microscopic leveling tolerance for a barefoot-safe surface.' }
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
  },
  'paver-patio-duluth-ga': {
    id: 'paver-patio-duluth-ga',
    name: 'Paver Patio Duluth GA',
    heroImage: 'https://i.imgur.com/SIBIdiFl.webp',
    heroSubtitle: 'DULUTH\'S PREMIER OUTDOOR LIVING BUILDERS',
    overviewHeading: 'Custom Paver Patios in Duluth, GA — Built for Year-Round Entertaining',
    overviewParagraphs: [
      "Duluth's vibrant outdoor lifestyle deserves a backyard built to match. A standard wood deck or basic concrete slab can't capture the luxury of a true hardscape. We design and install custom paver patios in Duluth, featuring slip-resistant modular stones, premium Turkish travertine, and elegant flagstone that transform empty grass into high-end entertainment hubs.",
      "Beyond aesthetics, Duluth yards often face drainage challenges. Our engineered patio bases include deep gravel compaction and advanced water runoff grading to ensure your new outdoor living space remains dry, level, and structurally sound for decades. Pair your new patio with a stunning [Retaining Wall in Atlanta](/retaining-walls-atlanta) for multi-level backyards or upgrade your entrance with our [Alpharetta Driveway Pavers](/driveways-pavers-alpharetta-ga) services."
    ],
    parallaxImage: 'https://i.imgur.com/h3NCvta.jpeg',
    parallaxQuote: "The centerpiece of your family's best memories.",
    process: [
      { title: 'Subsoil Grading Check', description: 'Assessing Duluth\'s specific soil composition for proper footing.' },
      { title: 'Structural Aggregates', description: 'Installing a heavy-duty gravel base to prevent future paver settling.' },
      { title: 'Patio Paving & Designing', description: 'Laying your chosen stone in breathtaking patterns with precise laser-leveling.' },
      { title: 'Weatherproof Jointing', description: 'Locking the gaps with high-grade, weed-blocking polymeric sand.' }
    ]
  },
  'paving-stone-contractor-roswell': {
    id: 'paving-stone-contractor-roswell',
    name: 'Paving Stone Contractor Roswell',
    heroImage: 'https://www.belgard.com/wp-content/uploads/2024/05/PearmeableCategoryPage_AltBox_Image1.webp',
    heroSubtitle: 'ROSWELL\'S TRUSTED MASTER MASONS',
    overviewHeading: 'Expert Paving Stone Contractors in Roswell — Elevate Your Curb Appeal & Backyard',
    overviewParagraphs: [
      "Roswell's historic elegance and modern luxury homes demand the very best in architectural hardscaping. As the premier paving stone contractor in Roswell, AGS Stones specializes in replacing failing concrete with elite interlocking pavers that flex, breathe, and endure without cracking under Georgia's intense weather cycles.",
      "From high-load driveway pavements to majestic backyard walking paths, our structural engineers ensure zero compromise. Our 5-year structural warranty backs every stone we set. Explore our [Atlanta Driveway Pavers](/driveway-pavers-atlanta) for more on our heavy-duty vehicle support, or see how we craft resort-style spaces via [Outdoor Kitchens Johns Creek](/outdoor-kitchen-johns-creek-ga)."
    ],
    parallaxImage: 'https://i.imgur.com/by6FzIkl.webp',
    parallaxQuote: "Heritage craftsmanship built to last in Roswell.",
    process: [
      { title: 'Roswell Permitting & HOA', description: 'Navigating local Roswell regulations and strict neighborhood aesthetic covenants.' },
      { title: 'Base Excavation', description: 'Complete removal of cracked concrete and organic topsoil layers.' },
      { title: 'Artisanal Paving', description: 'Setting paving stones utilizing tight-gap precision for maximum interlock.' },
      { title: 'Polishing & Sealing', description: 'Applying deep-penetrating sealants to enhance color and block oil stains.' }
    ]
  },
  'stone-patio-contractors-alpharetta-ga': {
    id: 'stone-patio-contractors-alpharetta-ga',
    name: 'Stone Patio Contractors Alpharetta GA',
    heroImage: 'https://i.imgur.com/SIBIdiFl.webp',
    heroSubtitle: 'ALPHARETTA\'S LUXURY PATIO ARCHITECTS',
    overviewHeading: 'Bespoke Stone Patios in Alpharetta, GA — Where Luxury Meets Outdoor Living',
    overviewParagraphs: [
      "When you live in Alpharetta, your backyard is a canvas for luxury. We are specialized stone patio contractors providing high-end property owners with exquisite Travertine, architectural Slate, and premium modular block patios. Forget the mundane; we build outdoor living rooms that command attention and provide ultimate comfort.",
      "Our Alpharetta patio projects are renowned for their flawless flat grading, invisible drainage networks, and jaw-dropping masonry finishes. We seamlessly tie our patios into [Alpharetta Driveway Pavers](/driveways-pavers-alpharetta-ga) for uniform property aesthetics, and we can elevate the space further with custom [Johns Creek Outdoor Kitchens](/outdoor-kitchen-johns-creek-ga)."
    ],
    parallaxImage: 'https://i.imgur.com/h3NCvta.jpeg',
    parallaxQuote: "Step outside into pure, uncompromised elegance.",
    process: [
      { title: '3D Backyard Rendering', description: 'Drafting your new Alpharetta stone patio in full 3D to visualize the masterpiece.' },
      { title: 'Hydrostatic Planning', description: 'Mapping out invisible water runoff vectors to keep your patio bone dry.' },
      { title: 'Premium Stone Cutting', description: 'Precision diamond-cutting natural stone to fit the custom contours of your yard.' },
      { title: 'Resort Verification', description: 'Final sweeping, sealing, and a walk-through to ensure absolute perfection.' }
    ]
  },
  'hardscape-installation-atlanta': {
    id: 'hardscape-installation-atlanta',
    name: 'Hardscape Installation Atlanta',
    heroImage: 'https://i.imgur.com/G2N5Chsl.webp',
    heroSubtitle: 'ATLANTA HARDSCAPE MASTERY',
    overviewHeading: 'Full-Scope Hardscape Installation in Atlanta — Retaining Walls, Patios, and Driveways',
    overviewParagraphs: [
      "Hardscaping is the backbone of any spectacular landscape. AGS Stones provides comprehensive hardscape installation in Atlanta, tackling everything from severe slope leveling and structural boulder walls to massive residential paver driveway overhauls. We specialize in the difficult projects that other contractors walk away from.",
      "Our structural approach means we focus heavily on what lies beneath the stone: geo-grids, deep trench footings, and perforated drainage pipelines. Whether you need heavy-duty [Atlanta Retaining Walls](/retaining-walls-atlanta) to stop a mudslide, or our signature [Atlanta Driveway Pavers](/driveway-pavers-atlanta) to boost curb appeal, we engineer it to last a lifetime."
    ],
    parallaxImage: 'https://i.imgur.com/vEHS8LGl.webp',
    parallaxQuote: "We bring structural engineering aesthetics to Metro Atlanta.",
    process: [
      { title: 'Site Engineering', description: 'Complete elevation topography and load-bearing soil tests.' },
      { title: 'Deep Structural Trenching', description: 'Digging below the frost line to pour heavy-duty concrete and gravel footings.' },
      { title: 'Hardscape Construction', description: 'Building the core masonry, whether it’s retaining blocks, fire pits, or paver fields.' },
      { title: 'Landscape Integration', description: 'Adding topsoil backfill, smoothing grades, and handing over a clean, finished site.' }
    ]
  },
  'hardscaping-smyrna': {
    id: 'hardscaping-smyrna',
    name: 'Hardscaping Smyrna',
    heroImage: 'https://i.imgur.com/dZstK86l.webp',
    heroSubtitle: 'SMYRNA\'S STRUCTURAL LANDSCAPE PROS',
    overviewHeading: 'Professional Hardscaping in Smyrna — Patios, Walkways, and Landscape Masonry',
    overviewParagraphs: [
      "Smyrna homeowners value beautiful, functional outdoor spaces. Our professional hardscaping services in Smyrna solve fundamental yard issues—like poor drainage, unusable sloped lawns, and cracking concrete—by installing gorgeous, permanent stone and paver structures.",
      "From terraced planter walls to smooth, barefoot-friendly poolside travertine, our hardscape designs redefine how you use your property. Combine our hardscaping expertise with our dedicated [Atlanta Pool Deck Pavers](/pool-deck-pavers-atlanta) or secure a brand new entrance via our [Roswell Paving Stone](/paving-stone-contractor-roswell) teams."
    ],
    parallaxImage: 'https://i.imgur.com/uDiqFSl.jpeg',
    parallaxQuote: "Bringing form, function, and forever-quality to Smyrna.",
    process: [
      { title: 'Smyrna Yard Diagnostics', description: 'Identifying erosion zones, dead turf spots, and spatial flow restrictions.' },
      { title: 'Earth Moving', description: 'Reshaping the yard\'s layout safely using compact machinery and expert operators.' },
      { title: 'Stone & Block Installation', description: 'Erecting the hardscape features with premium modular or natural blocks.' },
      { title: 'Detail Finishing', description: 'Applying edge restraints, capping walls, and pressure washing the new installation.' }
    ]
  },
  'paver-patio-johns-creek-ga': {
    id: 'paver-patio-johns-creek-ga',
    name: 'Paver Patio Johns Creek GA',
    heroImage: 'https://i.imgur.com/h3NCvta.jpeg',
    heroSubtitle: 'JOHNS CREEK LUXURY LIVING',
    overviewHeading: 'Exquisite Paver Patios in Johns Creek, GA — The Ultimate Backyard Upgrade',
    overviewParagraphs: [
      "In Johns Creek, your backyard is your private oasis. We design and install high-end paver patios that serve as the foundation for the ultimate outdoor lifestyle. By replacing standard decks with robust, beautifully patterned interlocking pavers, we create sweeping entertainment spaces that require zero maintenance.",
      "Our paver patios perfectly complement our top-tier [Johns Creek Outdoor Kitchens](/outdoor-kitchen-johns-creek-ga), providing a unified, resort-level experience. We engineer every patio with heavy-load aggregate bases to ensure absolute flatness. Consider pairing your new patio with elite [Alpharetta Stone Patios](/stone-patio-contractors-alpharetta-ga) design concepts for a sprawling, multi-zoned outdoor compound."
    ],
    parallaxImage: 'https://i.imgur.com/SIBIdiFl.webp',
    parallaxQuote: "The foundation of your private Johns Creek resort.",
    process: [
      { title: 'Architectural Zoning', description: 'Separating the patio into dining, lounging, and cooking zones.' },
      { title: 'Base Optimization', description: 'Compacting layers of crush-and-run gravel to prevent dipping and settling.' },
      { title: 'Seamless Paving', description: 'Installing thick, luxury pavers designed to withstand massive weights without cracking.' },
      { title: 'Polymeric Sanding', description: 'Filling the joints with activated polymer sand to repel insects and water.' }
    ]
  },
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

interface ServicePageProps {
  idOverride?: string;
}

export const ServicePage: React.FC<ServicePageProps> = ({ idOverride }) => {
  const { id } = useParams<{ id: string }>();
  const activeId = idOverride || id;
  
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [activeId]);

  const data = (activeId && serviceDataDb[activeId]) ? serviceDataDb[activeId] : fallbackData;

  const title = `${data.name} Contractors | Premium Hardscaping | AGS Stones`;
  const description = data.overviewParagraphs[0];
  const seoKeywords = [data.name.toLowerCase(), 'hardscaping contractors', 'outdoor living', 'AGS stones'];
  const canonicalPath = idOverride ? `/${idOverride}` : `/service/${id}`;

  return (
    <div className="bg-white min-h-screen relative">
      <SEO 
        title={title}
        description={description}
        image={data.heroImage}
        canonicalPath={canonicalPath}
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

// =============================================================================
// CBS PRODUCT CATALOGUE
// =============================================================================
// Edit this file to add, update, or remove products.
// Each product maps to a category and brand.
// Scraped and paraphrased from:
//   - acepolystyrene.com.au (Foam → ACE brand)
//   - euromix.com.au (Render → Euromix brand)
//   - novatexproducts.com.au (Render → Novatex brand)
//   - melbacrylic.com.au (Render → Melbacrylic brand)
//   - centralbuildingsupplies.com.au (Tools, Accessories, Mouldings)
//   - buildersemporium.com.au (Angles, Mesh, Accessories → Builders Emporium brand)
//   - unitex.com.au (Render, Texture → Unitex brand; base coat renders + textures and finishes only)
// =============================================================================

export type ProductCategory =
  | 'Foam'
  | 'Render'
  | 'Mouldings'
  | 'Paint'
  | 'Tiling'
  | 'Waterproofing'
  | 'Tools'
  | 'Accessories'
  | 'Texture'
  | 'Angles'
  | 'Mesh'

export type ProductBrand =
  | 'ACE'
  | 'Novatex'
  | 'Euromix'
  | 'Melbacrylic'
  | 'Astec'
  | 'Builders Emporium'
  | 'Unitex'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  brand: ProductBrand
  shortDescription: string
  features: string[]
  specs?: ProductSpec[]
  application?: string
  badges?: string[]
  externalLink?: string
  featured?: boolean
  imagePath?: string
  // Optional measurement diagram image (used for mouldings)
  diagramPath?: string
  // Downloadable resources linked to this product
  resources?: { name: string; filePath: string }[]
  // Optional factory colour range (tinted texture finishes) — rendered as a swatch grid in the product drawer
  colours?: { name: string; imagePath: string }[]
}

// =============================================================================
// FOAM – ACE Polystyrene (complete product list per client)
// =============================================================================

const ACE_RESOURCES = [
  { name: 'Information Booklet', filePath: 'https://www.acepolystyrene.com.au/downloads/information-booklet.html' },
  { name: 'Specification Booklet', filePath: 'https://www.acepolystyrene.com.au/downloads/specification-booklet.html' },
  { name: 'CodeMark Certification', filePath: 'https://www.acepolystyrene.com.au/downloads/codemark-certification.html' },
  { name: 'BAL-29 Certificate', filePath: 'https://www.acepolystyrene.com.au/downloads/bal-29-certificate.html' },
  { name: 'Thermal Rating Report', filePath: 'https://www.acepolystyrene.com.au/downloads/thermal-rating-report.html' },
  { name: 'Thermal Rating Results', filePath: 'https://www.acepolystyrene.com.au/downloads/thermal-rating-results.html' },
  { name: 'Compression Testing Results', filePath: 'https://www.acepolystyrene.com.au/downloads/compression-testing-results.html' },
  { name: 'Coating System Specifications', filePath: 'https://www.acepolystyrene.com.au/downloads/coating-system-specifications.html' },
]

type PanelVariant = 'standard' | 'grooved' | 'flexi'
const PANEL_IMAGE: Record<PanelVariant, string> = {
  standard: '/images/cbs-foam-panel.webp',
  grooved: '/images/products/ace-grooved-foam-panel.webp',
  // TODO(client): the "flexi panel" photo named in the 17 Nov email was not attached; standard panel image until it arrives.
  flexi: '/images/cbs-foam-panel.webp',
}

function acePanel(thickness: string, size: string, rValue: string, variant: PanelVariant = 'standard'): Product {
  const sizeLabel = size === '2500' ? '2500 × 1200mm' : '5000 × 1200mm'
  const grooved = variant === 'grooved'
  const flexi = variant === 'flexi'
  const slug = `ace-grey-foam${variant === 'standard' ? '' : `-${variant}`}-${thickness}-${size}`
  const label = grooved ? 'GROOVED ' : flexi ? 'FLEXI ' : ''
  return {
    id: slug,
    name: `ACE Grey ${label}Foam Panel – ${thickness}mm × 1200 × ${size}mm`,
    category: 'Foam',
    brand: 'ACE',
    shortDescription: `M Grade fire retardant graphite-infused EPS ${grooved ? 'grooved ' : flexi ? 'flexible ' : ''}foam panel. ${thickness}mm thickness, ${sizeLabel} sheet size. BAL-29 rated, CodeMark certified.`,
    features: [
      `${thickness}mm thickness | R-Value ${rValue}`,
      `Sheet size: ${sizeLabel}`,
      'M Grade density — fire retardant',
      'BAL-29 fire rated (AS1530.8.1-2007)',
      'CodeMark certified',
      ...(grooved ? ['Grooved surface for enhanced render adhesion'] : []),
      ...(flexi ? ['Suitable to wrap for curves'] : []),
      'Lightweight; no lifting equipment required',
    ],
    specs: [
      { label: 'Thickness', value: `${thickness}mm` },
      { label: 'Sheet size', value: sizeLabel },
      { label: 'R-Value', value: rValue },
      { label: 'Density grade', value: 'M Grade' },
      { label: 'Fire rating', value: 'BAL-29 (AS1530.8.1-2007)' },
      { label: 'Type', value: grooved ? 'Grooved' : flexi ? 'Flexible' : 'Standard' },
    ],
    application: 'Residential and commercial wall cladding (EWI/EIFS), cool room insulation, ceiling and underfloor insulation.',
    badges: ['Factory Direct', 'CodeMark Certified'],
    externalLink: 'https://www.acepolystyrene.com.au/ace-grey-foam-panels.html',
    featured: thickness === '75' && variant === 'standard' && size === '2500',
    imagePath: PANEL_IMAGE[variant],
    resources: ACE_RESOURCES,
  }
}

const foamProducts: Product[] = [
  // Standard panels — 2500mm length
  acePanel('10', '2500', '0.48'),
  acePanel('15', '2500', '0.72'),
  acePanel('20', '2500', '0.96'),
  acePanel('25', '2500', '1.20'),
  acePanel('30', '2500', '1.44'),
  acePanel('40', '2500', '1.92'),
  acePanel('50', '2500', '2.40'),
  acePanel('60', '2500', '2.88'),
  acePanel('75', '2500', '3.60'),
  acePanel('100', '2500', '4.80'),
  acePanel('150', '2500', '7.20'),
  // Standard panels — 5000mm length
  acePanel('50', '5000', '2.40'),
  acePanel('75', '5000', '3.60'),
  acePanel('100', '5000', '4.80'),
  // Grooved panels
  acePanel('50', '2500', '2.40', 'grooved'),
  acePanel('75', '2500', '3.60', 'grooved'),
  acePanel('100', '2500', '4.80', 'grooved'),
  acePanel('75', '5000', '3.60', 'grooved'),
  // Flexi panels (added per client email, 17 Nov 2026)
  acePanel('50', '2500', '2.40', 'flexi'),
  acePanel('75', '2500', '3.60', 'flexi'),
  acePanel('100', '2500', '4.80', 'flexi'),
  // Poly Battens
  {
    id: 'ace-poly-battens',
    name: 'ACE Poly Battens – 25×40×2500mm (Bundle of 50)',
    category: 'Foam',
    brand: 'ACE',
    shortDescription: 'Polystyrene battens for EWI/EIFS systems. Supplied in bundles of 50 pieces. 25mm × 40mm × 2500mm.',
    features: [
      '25mm × 40mm × 2500mm per batten',
      'Bundle of 50 pieces',
      'High-density polystyrene',
      'Used in EPS cladding systems',
      'Lightweight and easy to handle',
    ],
    specs: [
      { label: 'Dimensions', value: '25 × 40 × 2500mm' },
      { label: 'Pack size', value: 'Bundle of 50' },
    ],
    application: 'Batten strips for EWI/EIFS cladding systems, creating cavity for drainage and ventilation.',
    badges: ['Factory Direct'],
    externalLink: 'https://www.acepolystyrene.com.au/ace-grey-foam-panels.html',
    imagePath: '/images/products/ace-poly-battens.webp',
  },
  // Custom foam
  {
    id: 'ace-custom-foam',
    name: 'Custom Foam – Cut to Measure',
    category: 'Foam',
    brand: 'ACE',
    shortDescription: 'Custom foam panels cut to your exact measurements. Contact us with your specifications for a quote.',
    features: [
      'Cut to your exact dimensions',
      'Any thickness up to 600mm',
      'M Grade fire retardant graphite EPS',
      'BAL-29 rated, CodeMark certified',
      'Contact us for pricing',
    ],
    application: 'Custom insulation, architectural features, bespoke cladding panels, and specialist applications.',
    badges: ['Factory Direct', 'Custom Available'],
    externalLink: 'https://www.acepolystyrene.com.au/ace-grey-foam-panels.html',
    imagePath: '/images/products/ace-custom-foam.webp',
  },
  // Landscaping Blocks
  {
    id: 'ace-landscaping-blocks',
    name: 'ACE Landscaping Foam Blocks',
    category: 'Foam',
    brand: 'ACE',
    shortDescription: 'Cost-effective polystyrene void-fill blocks for landscaping and construction. Extremely lightweight — no heavy machinery needed.',
    features: [
      'Lightweight construction foam',
      'No heavy machinery required',
      'Suitable for difficult terrain and steep sites',
      'Cost-effective alternative to fill materials',
      'Custom block sizes available',
    ],
    application: 'Landscaping void fill, raised garden beds, retaining wall backfill, under-slab void fill.',
    badges: ['Factory Direct'],
    externalLink: 'https://www.acepolystyrene.com.au/ace-grey-foam-panels/landscaping-blocks.html',
    imagePath: '/images/products/ace-landscaping-block.webp',
  },
  // Expanding Foam
  {
    id: 'ace-expanding-foam',
    name: 'ACE Expanding Foam (PU Gap Filler)',
    category: 'Foam',
    brand: 'ACE',
    shortDescription: 'General-purpose polyurethane expanding foam for sealing gaps, noise, and moisture penetration. Bonds to concrete, brick, steel, aluminium, polystyrene, and timber.',
    features: [
      'Polyurethane formulation',
      'Excellent adhesion to most building substrates',
      'Seals noise and moisture ingress',
      'Suitable for: concrete, brick, steel, Al, EPS, timber',
      'Easy-to-use aerosol format',
    ],
    application: 'Gap filling around window frames, penetrations, fixings, and panel joints.',
    badges: ['CBS Stocked'],
    imagePath: '/images/products/ace-expanding-foam.webp',
    externalLink: 'https://www.acepolystyrene.com.au/products.html',
  },
  // Waffle Pods
  {
    id: 'ace-waffle-pods',
    name: 'ACE Waffle Pods',
    category: 'Foam',
    brand: 'ACE',
    shortDescription: 'EPS waffle pods for concrete slab construction. Lightweight void formers that replace traditional excavation methods for waffle slab foundations.',
    features: [
      'EPS polystyrene construction',
      'Lightweight — easy to handle and place',
      'Standard and custom sizes available',
      'Reduces excavation requirements',
      'Compatible with standard waffle slab designs',
    ],
    application: 'Void former for waffle raft concrete slab foundations in residential and commercial construction.',
    badges: ['Factory Direct'],
    externalLink: 'https://www.acepolystyrene.com.au/ace-grey-foam-panels.html',
    imagePath: '/images/products/ace-waffle-pod.webp',
  },
]

// =============================================================================
// RENDER – Euromix, Novatex, Melbacrylic
// =============================================================================

const renderProducts: Product[] = [
  // --- EUROMIX RENDERS (bags) ---
  {
    id: 'euromix-render',
    name: 'Euromix Render (Multi-Purpose)',
    category: 'Render',
    brand: 'Euromix',
    shortDescription:
      'Premium acrylic-modified cement render suitable as a base coat or finish coat. Provides excellent crack resistance and flexibility beyond traditional site-mixed renders.',
    features: [
      'Hand apply 4–8mm per coat; machine apply up to 12mm',
      'Coverage: ~2–4m² per 20kg bag',
      'Suitable for most substrates',
      'Non-combustible: AS1530.1 certified',
      'BCA compliant',
      'Blended mineral fillers for crack resistance',
    ],
    specs: [
      { label: 'Application thickness', value: '4–12mm per coat' },
      { label: 'Coverage', value: '2–4m² per 20kg' },
      { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' },
      { label: 'Application method', value: 'Hand or machine' },
    ],
    application: 'Base coat or finish coat on most masonry, brick, block, concrete, and EPS substrates.',
    badges: ['System Product'],
    externalLink: 'https://euromix.com.au/acrylic-render/euromix-render/',
    featured: true,
    imagePath: '/images/products/euromix-render.webp',
  },
  {
    id: 'euromix-1render',
    name: 'Euromix 1Render (Single-Coat)',
    category: 'Render',
    brand: 'Euromix',
    shortDescription:
      'Versatile pre-blended acrylic render that completes most applications in a single coat up to 12mm. Features a Silica-Free Sand formulation for reduced crystalline silica hazard.',
    features: [
      'Single-coat system up to 12mm thick',
      'Silica-Free Sand formulation (reduced health risk)',
      'Mixed with water only — no additives required',
      'Float or sponge finish; ready for texture or paint',
      'Non-combustible: AS1530.1 certified',
      'BCA compliant',
    ],
    specs: [
      { label: 'Max single-coat thickness', value: '12mm' },
      { label: 'Mix', value: 'Water only (no bond agent)' },
      { label: 'Finish', value: 'Float or sponge' },
      { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' },
    ],
    application: 'Residential and commercial walls; ideal where a single-coat system reduces labour time.',
    badges: ['System Product', 'Popular'],
    externalLink: 'https://euromix.com.au/acrylic-render/euromix-1render/',
    featured: false,
    imagePath: '/images/products/euromix-1render.webp',
  },
  {
    id: 'euromix-fp',
    name: 'Euromix FP Render (Full Polymer)',
    category: 'Render',
    brand: 'Euromix',
    shortDescription:
      'Full polymer, cement-based render engineered for sheet and panel substrates including EPS, AAC, and fibre cement. Applies up to 12mm without sagging on almost any surface.',
    features: [
      'Full polymer formulation — no added bond agent needed',
      'Up to 12mm without sagging on panel substrates',
      '3–4mm base coat thickness on masonry',
      'Substrates: AAC, EPS, fibre cement, plaster-based materials',
      'Non-combustible: AS1530.1 certified',
      'BCA compliant',
    ],
    specs: [
      { label: 'Max application thickness', value: 'Up to 12mm (panel substrates)' },
      { label: 'Mix', value: 'Water only' },
      { label: 'Key substrates', value: 'AAC, EPS, FC sheet' },
      { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' },
    ],
    application:
      'EPS cladding systems, AAC block walls, fibre cement sheeting. Ideal for EIFS / EWI base coat.',
    badges: ['System Product', 'EPS Compatible'],
    externalLink: 'https://euromix.com.au/acrylic-render/euromix-fp-render/',
    featured: true,
    imagePath: '/images/products/euromix-fp-render.webp',
  },
  {
    id: 'euromix-cream',
    name: 'Euromix Cream Render',
    category: 'Render',
    brand: 'Euromix',
    shortDescription:
      'Medium-to-high build cement-based render delivering a high-quality sponge finish. Suitable as a base or finish coat across a broad range of residential and commercial substrates.',
    features: [
      'Medium/high build — 4–8mm hand, up to 12mm machine',
      'Coverage: ~2–3m² per 20kg bag',
      'Suitable for high-quality sponge finish',
      'Broad substrate compatibility',
      'Non-combustible: AS1530.1 certified',
      'BCA compliant',
    ],
    specs: [
      { label: 'Application thickness', value: '4–12mm per coat' },
      { label: 'Coverage', value: '2–3m² per 20kg' },
      { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' },
    ],
    application: 'Premium residential and commercial renders where a refined sponge finish is required.',
    badges: ['System Product'],
    externalLink: 'https://euromix.com.au/acrylic-render/euromix-cream/',
    featured: false,
    imagePath: '/images/products/euromix-cream.webp',
  },
  {
    id: 'euromix-skim',
    name: 'Euromix Skim Coat',
    category: 'Render',
    brand: 'Euromix',
    shortDescription:
      'Acrylic-modified cement finishing render applied 2–3mm over cured base render or prepared masonry surfaces. Produces a smooth or finely textured finish ready for paint or topcoat.',
    features: [
      'Thin 2–3mm application over base or existing render',
      'Float to smooth or sponge for even texture',
      'Substrates: EPS, AAC, brick, concrete, calcil blocks',
      'Non-combustible: AS1530.1 certified',
      'BCA compliant',
      'Excellent surface for subsequent coatings',
    ],
    specs: [
      { label: 'Thickness', value: '2–3mm finishing coat' },
      { label: 'Substrates', value: 'EPS, AAC, brick, concrete, calcil, pre-cast' },
      { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' },
    ],
    application: 'Finishing layer over base renders on EWI/EIFS systems; remedial skim coat on existing render.',
    badges: ['System Product'],
    externalLink: 'https://euromix.com.au/acrylic-render/euromix-skim-coat/',
    featured: false,
    imagePath: '/images/products/euromix-skim-coat.webp',
  },
  {
    id: 'euromix-lwhb',
    name: 'Euromix LWHB (Lightweight High Build)',
    category: 'Render',
    brand: 'Euromix',
    shortDescription:
      'Lightweight, full polymer cement-based render for high-build applications on most masonry, AAC, EPS, and fibre cement substrates. Mixed with water only.',
    features: [
      'Lightweight formulation — reduced load on structure',
      'High build capability',
      'Substrates: masonry, AAC, EPS, FC board',
      'Mixed with water only (no bond agent)',
      'Full polymer formulation',
    ],
    application: 'High-build renders on lightweight framing systems; heavy-texture feature walls.',
    badges: ['System Product'],
    externalLink: 'https://euromix.com.au/acrylic-render/euromix-lwhb-render/',
    featured: false,
    imagePath: '/images/products/euromix-lwhb.webp',
  },
  {
    id: 'euromix-nps',
    name: 'Euromix NPS Keycoat',
    category: 'Render',
    brand: 'Euromix',
    shortDescription:
      'Polymer-modified adhesive base coat render delivering strong bond to smooth and non-porous surfaces. Ideal as a key coat before applying the main render system.',
    features: [
      'Strong adhesive bond to smooth/non-porous surfaces',
      'Substrates: masonry, EPS, FC board, AAC, plaster',
      'Mixed with water only (no bond agent)',
      'Polymer-modified for enhanced adhesion',
    ],
    application: 'Adhesive base coat on difficult substrates prior to EPS fixing and render application.',
    badges: ['System Product'],
    externalLink: 'https://euromix.com.au/acrylic-render/euromix-nps-render/',
    featured: false,
    imagePath: '/images/products/euromix-nps-keycoat.webp',
  },

  // --- NOVATEX RENDERS ---
  {
    id: 'novatex-ez101',
    name: 'Novatex EZ101 – Modified Cement Render',
    category: 'Render',
    brand: 'Novatex',
    shortDescription: 'Enhanced pre-blended acrylic-modified cement render with PFR Technology. Superior trowelability, up to 12mm single coat without sagging. Pump or hand application.',
    features: ['PFR Technology for superior workability', 'Up to 12mm per coat without sagging', 'Pump or hawk-and-trowel application', 'Substrates: AAC, AFS, brick, FC sheet, concrete, EPS', 'Non-combustible (CSIRO certified, AS1530.1)', 'Low VOC — Green Star IEQ-13 compliant'],
    specs: [{ label: 'Max coat thickness', value: '12mm' }, { label: 'Application', value: 'Pump or hawk and trowel' }, { label: 'Fire certification', value: 'AS1530.1 Non-Combustible (CSIRO)' }, { label: 'VOC compliance', value: 'Green Star IEQ-13' }],
    application: 'Base coat render on AAC, brick, EPS cladding, FC sheeting, and concrete walls.',
    badges: ['System Product', 'Popular', 'Low VOC'],
    externalLink: 'https://novatexproducts.com.au/products/ez101/',
    featured: true,
    imagePath: '/images/products/novatex-ez101.webp',
  },
  {
    id: 'novatex-er100',
    name: 'Novatex ER100 – Fast Cure Render',
    category: 'Render',
    brand: 'Novatex',
    shortDescription:
      'Fast-curing, high-strength acrylic render with PFR Technology. Achieves superior bond strength with up to 10mm per coat and fast cure times to accelerate project timelines.',
    features: [
      'PFR Technology for superior strength',
      'Fast curing — reduces project timelines',
      'Apply up to 10mm per coat without sagging',
      'Hawk-and-trowel application',
      'Substrates: AAC, AFS, brick, FC sheet, concrete, EPS',
      'Non-combustibility certificate available (AS1530.1)',
    ],
    specs: [
      { label: 'Max coat thickness', value: '10mm' },
      { label: 'Application', value: 'Hawk and trowel' },
      { label: 'Key feature', value: 'Fast cure' },
      { label: 'Fire certification', value: 'AS1530.1 (certificate available)' },
    ],
    application: 'Fast-turnaround renders where rapid cure and high strength are priority.',
    badges: ['System Product', 'Fast Cure'],
    externalLink: 'https://novatexproducts.com.au/products/er100/',
    featured: false,
    imagePath: '/images/products/novatex-er100.webp',
  },
  {
    id: 'novatex-spr',
    name: 'Novatex SPR Acrylic – Smooth Polymer Render',
    category: 'Render',
    brand: 'Novatex',
    shortDescription:
      'Smooth polymer render with excellent trowelability and a clean flat finish. Mix 20kg to 3.0–3.5L of water. Apply up to 10mm per coat. Touch dry in 2–4 hours.',
    features: [
      'Smooth acrylic finish; excellent trowelability',
      'Apply up to 10mm per coat without sagging',
      'Mix ratio: 20kg to 3.0–3.5L water',
      'Touch dry 2–4 hours; second coat after 6–8 hours',
      'Full cure: 7 days',
      'Pot life up to 1 hour at 23°C',
      'Substrates: AAC, brick, concrete walls',
    ],
    specs: [
      { label: 'Mix ratio', value: '20kg : 3.0–3.5L water' },
      { label: 'Max coat thickness', value: '10mm' },
      { label: 'Touch dry', value: '2–4 hours' },
      { label: 'Full cure', value: '7 days' },
      { label: 'Pot life', value: '~1 hour at 23°C' },
      { label: 'Temperature limits', value: '5°C – 35°C' },
    ],
    application: 'Smooth finish render on AAC, brick, and concrete. Traditional rendering method.',
    badges: ['System Product', 'CBS Stocked'],
    externalLink: 'https://novatexproducts.com.au/products/',
    featured: false,
    imagePath: '/images/products/novatex-spr-acrylic.webp',
  },
  {
    id: 'novatex-valencia',
    name: 'Novatex Valencia – Acrylic Texture Coating',
    category: 'Texture',
    brand: 'Novatex',
    shortDescription:
      'Ready-mixed flexible acrylic texture coating delivering a subtle granular finish for interior and exterior applications. Pre-blended with superior trowelability.',
    features: [
      'Ready-mixed — no site batching required',
      'Flexible acrylic formulation',
      'Subtle granular texture finish',
      'Interior and exterior application',
      'Tintable: light base and dark base options',
      'Superior trowelability',
    ],
    application: 'Decorative finish coat on fully cured render systems for residential and commercial facades.',
    badges: ['System Product'],
    externalLink: 'https://novatexproducts.com.au/products/valencia/',
    featured: false,
    imagePath: '/images/products/novatex-valencia.webp',
  },
  {
    id: 'novatex-saturn',
    name: 'Novatex Saturn – Acrylic Texture Coating',
    category: 'Texture',
    brand: 'Novatex',
    shortDescription:
      'Pre-blended flexible acrylic texture coating with a granular finish. Suitable for interior and exterior façades. Available in light and dark tint bases.',
    features: [
      'Ready-mixed — no site batching required',
      'Flexible acrylic formulation',
      'Granular texture finish',
      'Interior and exterior application',
      'Tintable: light base and dark base options',
    ],
    application: 'Decorative finish coat on cured render systems.',
    badges: ['System Product'],
    externalLink: 'https://novatexproducts.com.au/products/saturn/',
    featured: false,
    imagePath: '/images/products/novatex-saturn.webp',
  },
  {
    id: 'novatex-ezytex-base',
    name: 'Novatex Ezytex Base & Patch',
    category: 'Render',
    brand: 'Novatex',
    shortDescription:
      'High-polymer multipurpose base render for difficult and non-porous substrates. Also functions as an effective patching compound for repairs and remediation work.',
    features: [
      'High polymer content for difficult substrates',
      'Substrates: smooth masonry, clay blocks, tilt-up panels, EPS, painted surfaces',
      'Dual-purpose: base coat and patching compound',
      'Coverage: ~4–8m² per 20kg bag',
      'Finish with sealer + two coats 100% acrylic paint',
    ],
    application:
      'Base render on difficult, non-porous, or previously-painted substrates; patching and repairs on existing render.',
    badges: ['System Product', 'CBS Stocked'],
    externalLink: 'https://novatexproducts.com.au/products/',
    featured: false,
    imagePath: '/images/products/novatex-base-and-patch.webp',
  },
  { id: 'novatex-hi-build', name: 'Novatex Hi Build Lo Weight', category: 'Render', brand: 'Novatex', shortDescription: 'Lightweight acrylic-modified cement render designed to build up and level undulating surfaces. Buildable up to 40mm thickness.', features: ['Unique lightweight technology', 'Buildable up to 40mm thickness', 'Superior adhesion properties', 'Ideal for lightweight building substrates'], specs: [{ label: 'Max thickness', value: '40mm' }, { label: 'Application', value: 'Hawk and trowel' }], application: 'Brickwork, AAC blocks, fibre cement sheets, concrete, polystyrene surfaces.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/hi-build/', imagePath: '/images/products/novatex-hi-build.webp' },
  { id: 'novatex-medium-float', name: 'Novatex Insulclad Medium Float', category: 'Render', brand: 'Novatex', shortDescription: 'Polymer modified cement based finishing render for the Insulclad exterior insulated rendered wall system. Attractive subtle granular texture.', features: ['Polymer-modified cement formulation', 'Subtle granular texture finish', 'Combines exterior cladding with superior insulation', 'Compatible with multiple substrate types'], application: 'Finish coat for Insulclad systems, blue board, Hebel, brick, blockwork, and masonry substrates.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/medium-float/', imagePath: '/images/products/novatex-medium-float.webp' },
  { id: 'novatex-fine-skim', name: 'Novatex Insulclad Fine Skim', category: 'Render', brand: 'Novatex', shortDescription: 'Polymer modified cement based finishing render for the Insulclad exterior insulated wall system. Fine granular texture for modern construction.', features: ['Fine, subtle granular texture finish', 'Insulclad exterior insulated wall system', 'Modern and traditional construction'], application: 'Finish coat on Insulclad, blue board, Hebel, brick, blockwork, and masonry substrates.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/fine-skim/', imagePath: '/images/products/novatex-fine-skim.webp' },
  { id: 'novatex-tint-n-prime', name: 'Novatex Tint N Prime', category: 'Render', brand: 'Novatex', shortDescription: 'High performance acrylic tintable primer designed to seal and prime all clean masonry surfaces. Tint to match final coat colour.', features: ['Tintable formulation', 'Excellent adhesion', 'Superior coverage', 'Good hiding power'], application: 'Sealing and priming clean masonry surfaces with tint additions.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/tint-n-prime/', imagePath: '/images/products/novatex-tint-n-prime.webp' },

  // --- MELBACRYLIC RENDERS ---
  {
    id: 'mac-macrender-hbs',
    name: 'Melbacrylic Macrender HBS',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Medium grade high bond strength render for application to demanding surfaces. Highly polymer modified cementitious plaster especially suited to EPS and low-porosity surfaces.',
    features: ['High polymer content for exceptional bond strength', 'Designed for EPS and low-porosity surfaces', 'Medium grade with good workability', 'Ideal base for MAC architectural finish systems', 'AS1530.1 Non-Combustible certified', '20kg bag (60 per pallet)'],
    specs: [{ label: 'Grade', value: 'Medium' }, { label: 'Key feature', value: 'High bond strength to EPS and low-porosity substrates' }, { label: 'Pack size', value: '20kg bag' }, { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' }],
    application: 'Base coat on EPS cladding boards and difficult or low-porosity masonry surfaces.',
    badges: ['System Product', 'EPS Compatible'],
    externalLink: 'http://www.melbacrylic.com.au/macrender-hbs',
    featured: true,
    imagePath: '/images/products/mac-macrender-hbs.webp',
  },
  {
    id: 'mac-macrender-coarse-fr',
    name: 'Melbacrylic Macrender Coarse FR',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Medium grade render with synthetic fibre reinforcement for AAC constructions. Polymer modified cement based plaster suitable for many rendering and patching applications.',
    features: ['Fibre reinforcement for crack resistance', 'Polymer-modified cementitious formulation', 'Specifically suited to AAC blocks and panels', 'Good bond strength with minimal shrinkage', 'AS1530.1 Non-Combustible certified', '20kg bag (60 per pallet)'],
    specs: [{ label: 'Grade', value: 'Medium (fibre reinforced)' }, { label: 'Key substrates', value: 'AAC blocks and panels, stable porous masonry' }, { label: 'Pack size', value: '20kg bag' }, { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' }],
    application: 'Render base coat on AAC/Hebel block and panel construction.',
    badges: ['System Product', 'AAC Specialist'],
    externalLink: 'http://www.melbacrylic.com.au/macrender-coarse-fr',
    imagePath: '/images/products/mac-macrender-coarse-fr.webp',
  },
  {
    id: 'mac-macrender',
    name: 'Melbacrylic Macrender (Standard)',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Medium grade general purpose render for application to stable masonry based surfaces with sufficient porosity. Just add water — no site batching required.',
    features: ['Just add water — no site batching', 'Good bond strength and minimal shrinkage', 'Medium grade for versatile application', 'Ideal base for MAC acrylic and cement-based finishes', 'AS1530.1 Non-Combustible certified', '20kg bag (60 per pallet)'],
    specs: [{ label: 'Grade', value: 'Medium' }, { label: 'Mix', value: 'Water only' }, { label: 'Pack size', value: '20kg bag (60 per pallet)' }, { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' }],
    application: 'General purpose render base coat on stable masonry with sufficient porosity.',
    badges: ['System Product'],
    externalLink: 'http://www.melbacrylic.com.au/macrender',
    imagePath: '/images/products/mac-macrender.webp',
  },
  {
    id: 'mac-macrender-coarse',
    name: 'Melbacrylic Macrender Coarse',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Coarse grade general purpose render for application to stable masonry based surfaces with sufficient porosity.',
    features: ['Coarse grade', 'General purpose polymer render', 'For stable porous masonry', 'AS1530.1 Non-Combustible certified', '20kg bag'],
    specs: [{ label: 'Grade', value: 'Coarse' }, { label: 'Pack size', value: '20kg bag' }, { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' }],
    application: 'Coarse-finish render base coat on stable masonry requiring thicker build-up.',
    badges: ['System Product'],
    externalLink: 'http://www.melbacrylic.com.au/macrender-coarse',
    imagePath: '/images/products/mac-macrender-coarse.webp',
  },
  {
    id: 'mac-supaskim',
    name: 'Melbacrylic Supaskim',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Fine grade general purpose render for application to stable masonry based surfaces with sufficient porosity. Ideal for sponge finishing prior to painting.',
    features: ['Fine grade for smooth sponge finish', 'General purpose polymer render', 'Ideal base for painting systems', 'AS1530.1 Non-Combustible certified', '20kg bag'],
    specs: [{ label: 'Grade', value: 'Fine' }, { label: 'Finish', value: 'Sponge finish' }, { label: 'Pack size', value: '20kg bag' }, { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' }],
    application: 'Fine finish render coat on stable masonry prior to exterior paint application.',
    badges: ['System Product'],
    externalLink: 'http://www.melbacrylic.com.au/supaskim',
    imagePath: '/images/products/mac-supaskim.webp',
  },
  {
    id: 'mac-hi-build',
    name: 'Melbacrylic Hi-Build',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Coarse grade lightweight render for thick section application. Designed for high-build applications where greater render thickness is required.',
    features: ['Coarse grade', 'Lightweight formulation', 'Thick section application', 'Reduced load on structure', 'AS1530.1 Non-Combustible certified'],
    specs: [{ label: 'Grade', value: 'Coarse (lightweight)' }, { label: 'Key feature', value: 'High-build thick section' }, { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' }],
    application: 'High-build render applications where greater thickness is needed, including remedial work.',
    badges: ['System Product'],
    externalLink: 'http://www.melbacrylic.com.au/hi-build',
    imagePath: '/images/products/mac-hi-build.webp',
  },
  {
    id: 'mac-dri-patch',
    name: 'Melbacrylic Dri-Patch',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Fine grade high polymer render for application to low-porosity surfaces. Also functions as an economical dry-mix jointing and skim-coating compound for fibre-cement sheet.',
    features: ['Fine grade', 'High polymer content', 'For low-porosity surfaces', 'Also works as jointing/skim compound', 'For fibre-cement sheet and painted surfaces'],
    application: 'Render on low-porosity surfaces; jointing and skim coating on fibre-cement base sheet.',
    badges: ['System Product'],
    externalLink: 'http://www.melbacrylic.com.au/dri-patch',
    imagePath: '/images/products/mac-dri-patch.webp',
  },
  {
    id: 'mac-macpatch-coarse',
    name: 'Melbacrylic Macpatch Coarse',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Medium grade pre-mixed polymer render for application to difficult surfaces. Use over previously painted masonry surfaces and fibre-cement base sheet.',
    features: ['Medium grade', 'Pre-mixed acrylic polymer', 'For difficult surfaces and painted masonry', 'Joint stopping and skim coating', 'For fibre-cement sheet'],
    application: 'Pre-mixed render on painted masonry, fibre-cement base sheet, and difficult substrates.',
    badges: ['System Product'],
    externalLink: 'http://www.melbacrylic.com.au/macpatch-coarse',
    imagePath: '/images/products/mac-macpatch-coarse.webp',
  },
  {
    id: 'mac-polylite',
    name: 'Melbacrylic Polylite',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription: 'Lightweight polymer render for EPS cladding systems. Formulated for application over polystyrene panel substrates with reduced structural load.',
    features: ['Lightweight formulation', 'For EPS cladding systems', 'Polymer modified', 'Reduced structural load', 'AS1530.1 Non-Combustible certified'],
    specs: [{ label: 'Key feature', value: 'Lightweight for EPS systems' }, { label: 'Fire certification', value: 'AS1530.1 Non-Combustible' }],
    application: 'Render coat on EPS foam panel cladding systems.',
    badges: ['System Product', 'EPS Compatible'],
    externalLink: 'http://www.melbacrylic.com.au/polylite',
    imagePath: '/images/products/mac-macrender.webp',
  },
]

// =============================================================================
// TEXTURE COATINGS – Melbacrylic (buckets)
// =============================================================================

const textureProducts: Product[] = [
  // --- NOVATEX TEXTURES ---
  { id: 'novatex-flex-n-patch', name: 'Novatex Flex N Patch', category: 'Texture', brand: 'Novatex', shortDescription: 'Ready mixed flexible acrylic coating for patching and setting joints where flexibility is essential. Non-shrink formula with fine granular texture.', features: ['Acrylic-based formulation', 'Non-shrink properties', 'Easy trowelability', 'Superior adhesion and flexibility', 'Modern fine granule texture finish'], application: 'Interior or exterior surfaces for patching and joints where flexibility is essential.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/flex-n-patch/', imagePath: '/images/products/novatex-flex-n-patch.webp' },
  { id: 'novatex-crystal-coarse', name: 'Novatex Crystal Coarse', category: 'Texture', brand: 'Novatex', shortDescription: 'Ready mixed flexible acrylic coating for decorating surfaces. Attractive granular texture with BIS mould and dirt resistance.', features: ['Acrylic based formulation', 'Tintable', 'Easy trowelability', 'Superior adhesion and flexibility', 'BIS mould and dirt resistance'], application: 'Interior or exterior surfaces (suitably prepared).', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/crystal-coarse/', imagePath: '/images/products/novatex-crystal-coarse.webp' },
  // --- EUROMIX TEXTURES (buckets) ---
  { id: 'euromix-sandstone-texture', name: 'Euromix Sandstone Texture', category: 'Texture', brand: 'Euromix', shortDescription: 'Textured architectural coating with a natural sandstone finish for interior and exterior surfaces.', features: ['Natural sandstone finish', 'Architectural texture coating', 'Interior and exterior use'], application: 'Textured coating applied to achieve a natural sandstone finish on rendered surfaces.', badges: ['System Product'], externalLink: 'https://euromix.com.au/textures-and-coatings/euromix-sandstone-texture/', imagePath: '/images/products/euromix-sandstone-texture.webp' },
  { id: 'euromix-finecoat', name: 'Euromix Fine Coat', category: 'Texture', brand: 'Euromix', shortDescription: 'Fine textured architectural coating for smooth decorative finishes on interior and exterior surfaces.', features: ['Fine texture finish', 'Architectural coating', 'Interior and exterior use'], application: 'Fine textured coating for smooth decorative finish on rendered surfaces.', badges: ['System Product'], externalLink: 'https://euromix.com.au/textures-and-coatings/euromix-finecoat/', imagePath: '/images/products/euromix-finecoat.webp' },
  { id: 'euromix-quartz-texture', name: 'Euromix Quartz Texture', category: 'Texture', brand: 'Euromix', shortDescription: 'Quartz-based textured architectural coating for durable decorative finishes on rendered surfaces.', features: ['Quartz-based texture', 'Durable decorative finish', 'Architectural coating'], application: 'Quartz textured coating for durable decorative finishes on rendered surfaces.', badges: ['System Product'], externalLink: 'https://euromix.com.au/textures-and-coatings/euromix-quartz-texture/', imagePath: '/images/products/euromix-sandstone-texture.webp' },
  { id: 'euromix-sandfinish-texture', name: 'Euromix Sand Finish Texture', category: 'Texture', brand: 'Euromix', shortDescription: 'Sand finish textured architectural coating for natural-looking decorative finishes on interior and exterior surfaces.', features: ['Sand finish texture', 'Natural-looking decorative finish', 'Interior and exterior use'], application: 'Sand finish textured coating for natural decorative appearance on rendered surfaces.', badges: ['System Product'], externalLink: 'https://euromix.com.au/textures-and-coatings/euromix-sandfinish-texture/', imagePath: '/images/products/euromix-sandfinish-texture.webp' },
  // --- MELBACRYLIC TEXTURES (buckets) ---
  { id: 'mac-vernazzo', name: 'Melbacrylic Vernazzo', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Acrylic polymer based concrete finish providing flexibility and weather resistance. Trowel-applied in multiple colours for a modern concrete aesthetic.', features: ['Acrylic polymer based', 'Concrete look finish', 'Trowel applied', 'Flexible and weather resistant', 'Multiple colour options'], application: 'Decorative concrete-look finish on rendered facades.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/vernazzo', imagePath: '/images/products/mac-vernazzo.webp' },
  { id: 'mac-corfu-plus', name: 'Melbacrylic Corfu Plus', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Medium aggregate acrylic wall finish formulated for trowel application with improved water beading properties to resist dirt accumulation.', features: ['Medium aggregate', 'Trowel applied', 'Water beading properties', 'Dirt resistant', 'Extensive colour range'], application: 'Trowel-applied textured finish on cured render systems.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/corfu-plus', imagePath: '/images/products/mac-corfu-plus.webp' },
  { id: 'mac-3060-sandstone', name: 'Melbacrylic 3060 Sandstone', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Fine grade trowel-applied acrylic textured finish available in an extensive colour range.', features: ['Fine grade', 'Trowel applied', 'Acrylic textured finish', 'Extensive colour range'], application: 'Fine-textured decorative finish on rendered facades.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/3060-sandstone', imagePath: '/images/products/mac-3060-sandstone.webp' },
  { id: 'mac-1140-sandfinish', name: 'Melbacrylic 1140 Sandfinish', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Medium grade trowel-applied acrylic textured finish with broad colour availability for rendered facades.', features: ['Medium grade', 'Trowel applied', 'Broad colour range', 'Acrylic textured finish'], application: 'Medium-textured decorative finish on rendered facades.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/1140-sandfinish', imagePath: '/images/products/mac-1140-sandfinish.webp' },
  { id: 'mac-crystal-plus', name: 'Melbacrylic Crystal Plus', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Medium grade natural sand-based acrylic textured finish in an extensive colour range.', features: ['Medium grade', 'Natural sand-based', 'Acrylic textured finish', 'Extensive colour range'], application: 'Natural sand textured finish on cured render systems.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/crystal', imagePath: '/images/products/mac-crystal-plus.webp' },
  { id: 'mac-trowel-1mm', name: 'Melbacrylic 1mm Trowel-On', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Medium grade trowel-applied acrylic scratch finish available in extensive colours.', features: ['1mm aggregate', 'Trowel applied', 'Scratch finish', 'Extensive colours'], application: '1mm scratch-finish decorative coat on rendered facades.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/1mm-trowel', imagePath: '/images/products/mac-trowel-1mm.webp' },
  { id: 'mac-trowel-2mm', name: 'Melbacrylic 2mm Trowel-On', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Coarse grade trowel-applied acrylic scratch finish in multiple colour options.', features: ['2mm aggregate', 'Coarse grade', 'Trowel applied', 'Scratch finish', 'Multiple colours'], application: '2mm scratch-finish decorative coat on rendered facades.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/2mm-trowel', imagePath: '/images/products/mac-trowel-2mm.webp' },
  { id: 'mac-satin', name: 'Melbacrylic Satin Membrane', category: 'Texture', brand: 'Melbacrylic', shortDescription: '100% acrylic premium grade paint formulated for application to renders and acrylic textured coatings.', features: ['100% acrylic', 'Premium grade', 'For renders and textured coatings', 'Roll-on application'], application: 'Protective roll-on membrane over cured render and texture coatings.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/satin', imagePath: '/images/products/mac-satin.webp' },
  { id: 'mac-satin-flex', name: 'Melbacrylic Satin Flex', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Flexible roll-on acrylic membrane for renders and textured coatings. Provides crack-bridging elastomeric protection.', features: ['Flexible elastomeric', 'Roll-on application', 'Crack bridging', 'For renders and textured coatings'], application: 'Elastomeric protective membrane over cured render and texture coatings.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/satin-flex', imagePath: '/images/products/mac-satin.webp' },
  { id: 'mac-rustic', name: 'Melbacrylic Rustic Roll-on', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Fine grade roller-applied acrylic textured coating for renders and masonry surfaces.', features: ['Fine grade', 'Roller applied', 'Acrylic textured coating', 'For renders and masonry'], application: 'Roller-applied fine texture on rendered and masonry facades.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/rustic', imagePath: '/images/products/mac-rustic.webp' },
  { id: 'mac-tuscan', name: 'Melbacrylic Tuscan Roll-on', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Coarse grade roller-applied acrylic textured coating designed for renders and masonry.', features: ['Coarse grade', 'Roller applied', 'Acrylic textured coating', 'For renders and masonry'], application: 'Roller-applied coarse texture on rendered and masonry facades.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/tuscan', imagePath: '/images/products/mac-tuscan.webp' },
  { id: 'mac-suede', name: 'Melbacrylic Suede FC', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Ultrafine cement-based fairing coat providing a smooth, natural concrete appearance.', features: ['Ultrafine grade', 'Cement based', 'Natural concrete look', 'Smooth fairing coat'], application: 'Smooth concrete-look fairing coat on rendered facades.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/suede', imagePath: '/images/products/mac-suede.webp' },
  { id: 'mac-dri-tex', name: 'Melbacrylic Dri-Tex', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Cement based textured finish available in natural white or custom colours.', features: ['Cement based', 'Textured finish', 'Natural white or custom colours'], application: 'Cement-based textured finish on rendered surfaces.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/dritex', imagePath: '/images/products/mac-dri-tex.webp' },
  { id: 'mac-treviso', name: 'Melbacrylic Treviso', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Premium acrylic textured finish coat for contemporary rendered facades.', features: ['Premium quality', 'Acrylic textured finish', 'Contemporary aesthetic'], application: 'Premium decorative textured finish on modern rendered facades.', badges: ['System Product', 'New'], externalLink: 'http://www.melbacrylic.com.au/treviso', imagePath: '/images/products/mac-vernazzo.webp' },
  { id: 'mac-aquashield', name: 'Melbacrylic Aquashield', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Protective acrylic sealer and shield coat for rendered and textured surfaces.', features: ['Protective sealer', 'Shield coat', 'For rendered and textured surfaces'], application: 'Protective sealer over cured render and texture coatings.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/aquashield', imagePath: '/images/products/mac-satin.webp' },
  { id: 'mac-glaze', name: 'Melbacrylic Glaze', category: 'Texture', brand: 'Melbacrylic', shortDescription: 'Clear acrylic glaze finish for rendered and textured surfaces.', features: ['Clear acrylic', 'Glaze finish', 'For rendered and textured surfaces'], application: 'Clear protective glaze over decorative textured finishes.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/glaze', imagePath: '/images/products/mac-satin.webp' },
]

// =============================================================================
// MOULDINGS – ACE Mouldings
// =============================================================================

const mouldingsProducts: Product[] = [
  // --- FLAT MOULDINGS ---
  { id: 'ace-moulding-fm-100x30', name: 'ACE Flat Moulding FM 100×30', category: 'Mouldings', brand: 'ACE', shortDescription: 'Polystyrene decorative flat moulding. Clean, modern profile ideal for wall-ceiling junctions and feature borders.', features: ['100mm × 30mm flat profile', 'Available in 2M or 2.5M lengths', 'Lightweight polystyrene construction', 'Simple adhesive installation', 'Paintable surface finish'], specs: [{ label: 'Width', value: '100mm' }, { label: 'Height', value: '30mm' }, { label: 'Length', value: '2M / 2.5M' }, { label: 'Profile', value: 'Flat (FM)' }], application: 'Wall-ceiling junctions, feature borders, and trim on rendered and painted surfaces.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/mouldings/flat-mouldings/100mm-x-30mm-detail.html', imagePath: '/images/products/ace-moulding-fm-100x30.webp' },
  { id: 'ace-moulding-fm-80x30', name: 'ACE Flat Moulding FM 80×30', category: 'Mouldings', brand: 'ACE', shortDescription: 'Compact polystyrene flat moulding for subtle wall-ceiling trim and borders.', features: ['80mm × 30mm flat profile', 'Available in 2M or 2.5M lengths', 'Lightweight polystyrene construction', 'Simple adhesive installation', 'Paintable surface finish'], specs: [{ label: 'Width', value: '80mm' }, { label: 'Height', value: '30mm' }, { label: 'Length', value: '2M / 2.5M' }, { label: 'Profile', value: 'Flat (FM)' }], application: 'Subtle wall-ceiling trim and borders on rendered surfaces.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/mouldings/flat-mouldings/80mm-x-30mm-detail.html', imagePath: '/images/products/ace-moulding-fm-80x30.webp' },
  // --- STEP MOULDINGS ---
  { id: 'ace-moulding-sm-100x40', name: 'ACE Step Moulding SM 100×40', category: 'Mouldings', brand: 'ACE', shortDescription: 'Stepped cornice profile adding depth and shadow lines to any room.', features: ['100mm × 40mm step profile', 'Available in 2M or 2.5M lengths', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '100mm' }, { label: 'Height', value: '40mm' }, { label: 'Length', value: '2M / 2.5M' }, { label: 'Profile', value: 'Step (SM)' }], application: 'Stepped cornice lines on rendered and painted interiors and exteriors.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/mouldings/step-mouldings/100mm-x-40mm-detail.html', imagePath: '/images/products/ace-moulding-sm-100x40.webp' },
  { id: 'ace-moulding-sm-100x50', name: 'ACE Step Moulding SM 100×50', category: 'Mouldings', brand: 'ACE', shortDescription: 'Deeper stepped cornice profile with enhanced shadow detail.', features: ['100mm × 50mm step profile', 'Available in 2M or 2.5M lengths', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '100mm' }, { label: 'Height', value: '50mm' }, { label: 'Length', value: '2M / 2.5M' }, { label: 'Profile', value: 'Step (SM)' }], application: 'Deeper stepped cornice detail on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/mouldings/step-mouldings/100mm-x-50mm-detail.html', imagePath: '/images/products/ace-moulding-sm-100x50.webp' },
  { id: 'ace-moulding-sm-150x40', name: 'ACE Step Moulding SM 150×40', category: 'Mouldings', brand: 'ACE', shortDescription: 'Wide stepped cornice profile for grander proportions and shadow lines.', features: ['150mm × 40mm step profile', 'Available in 2M or 2.5M lengths', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '150mm' }, { label: 'Height', value: '40mm' }, { label: 'Length', value: '2M / 2.5M' }, { label: 'Profile', value: 'Step (SM)' }], application: 'Wide stepped cornice on larger rooms and commercial facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/mouldings/step-mouldings/150mm-x-40mm-detail.html', imagePath: '/images/products/ace-moulding-sm-150x40.webp' },
  { id: 'ace-moulding-sm-150x50', name: 'ACE Step Moulding SM 150×50', category: 'Mouldings', brand: 'ACE', shortDescription: 'Large stepped cornice with bold shadow lines for statement interiors and exteriors.', features: ['150mm × 50mm step profile', 'Available in 2M or 2.5M lengths', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '150mm' }, { label: 'Height', value: '50mm' }, { label: 'Length', value: '2M / 2.5M' }, { label: 'Profile', value: 'Step (SM)' }], application: 'Bold statement cornice on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/mouldings/step-mouldings/150mm-x-50mm-detail.html', imagePath: '/images/products/ace-moulding-sm-150x50.webp' },
  // --- DECORATIVE MOULDINGS ---
  { id: 'ace-moulding-90x35', name: 'ACE Moulding 90×35', category: 'Mouldings', brand: 'ACE', shortDescription: 'Decorative polystyrene moulding profile 90mm × 35mm. Lightweight, paintable, adhesive-fixed.', features: ['90mm × 35mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable', 'Custom lengths available'], specs: [{ label: 'Width', value: '90mm' }, { label: 'Height', value: '35mm' }], application: 'Decorative architectural moulding on rendered and painted facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-90x35.webp', featured: true },
  { id: 'ace-moulding-100x35', name: 'ACE Moulding 100×35', category: 'Mouldings', brand: 'ACE', shortDescription: 'Decorative polystyrene moulding profile 100mm × 35mm.', features: ['100mm × 35mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '100mm' }, { label: 'Height', value: '35mm' }], application: 'Decorative architectural moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-100x35.webp' },
  { id: 'ace-moulding-110x40', name: 'ACE Moulding 110×40', category: 'Mouldings', brand: 'ACE', shortDescription: 'Decorative polystyrene moulding profile 110mm × 40mm.', features: ['110mm × 40mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '110mm' }, { label: 'Height', value: '40mm' }], application: 'Decorative architectural moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-110x40.webp' },
  { id: 'ace-moulding-120x120', name: 'ACE Moulding 120×120', category: 'Mouldings', brand: 'ACE', shortDescription: 'Large square-profile decorative polystyrene moulding 120mm × 120mm.', features: ['120mm × 120mm profile', 'Large decorative cornice', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '120mm' }, { label: 'Height', value: '120mm' }], application: 'Large decorative cornice on rendered commercial and residential facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-120x120.webp' },
  { id: 'ace-moulding-125x75', name: 'ACE Moulding 125×75', category: 'Mouldings', brand: 'ACE', shortDescription: 'Decorative polystyrene moulding profile 125mm × 75mm.', features: ['125mm × 75mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '125mm' }, { label: 'Height', value: '75mm' }], application: 'Decorative architectural moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-125x75.webp' },
  { id: 'ace-moulding-140x70', name: 'ACE Moulding 140×70', category: 'Mouldings', brand: 'ACE', shortDescription: 'Decorative polystyrene moulding profile 140mm × 70mm.', features: ['140mm × 70mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '140mm' }, { label: 'Height', value: '70mm' }], application: 'Decorative architectural moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-140x70.webp' },
  { id: 'ace-moulding-140x80', name: 'ACE Moulding 140×80', category: 'Mouldings', brand: 'ACE', shortDescription: 'Decorative polystyrene moulding profile 140mm × 80mm.', features: ['140mm × 80mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '140mm' }, { label: 'Height', value: '80mm' }], application: 'Decorative architectural moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-140x80.webp' },
  { id: 'ace-moulding-140x90', name: 'ACE Moulding 140×90', category: 'Mouldings', brand: 'ACE', shortDescription: 'Decorative polystyrene moulding profile 140mm × 90mm.', features: ['140mm × 90mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '140mm' }, { label: 'Height', value: '90mm' }], application: 'Decorative architectural moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-140x90.webp' },
  { id: 'ace-moulding-171x135', name: 'ACE Moulding 171×135', category: 'Mouldings', brand: 'ACE', shortDescription: 'Large decorative polystyrene moulding profile 171mm × 135mm.', features: ['171mm × 135mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '171mm' }, { label: 'Height', value: '135mm' }], application: 'Large decorative moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-171x135.webp' },
  { id: 'ace-moulding-130x230', name: 'ACE Moulding 130×230', category: 'Mouldings', brand: 'ACE', shortDescription: 'Extra-large decorative polystyrene moulding profile 130mm × 230mm.', features: ['130mm × 230mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '130mm' }, { label: 'Height', value: '230mm' }], application: 'Statement architectural moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-130x230.webp' },
  { id: 'ace-moulding-240x190', name: 'ACE Moulding 240×190', category: 'Mouldings', brand: 'ACE', shortDescription: 'Premium large decorative polystyrene moulding 240mm × 190mm.', features: ['240mm × 190mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '240mm' }, { label: 'Height', value: '190mm' }], application: 'Premium large moulding for high-end rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-240x190.webp' },
  { id: 'ace-moulding-250x140', name: 'ACE Moulding 250×140', category: 'Mouldings', brand: 'ACE', shortDescription: 'Premium wide decorative polystyrene moulding 250mm × 140mm.', features: ['250mm × 140mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '250mm' }, { label: 'Height', value: '140mm' }], application: 'Premium wide moulding for rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-250x140.webp' },
  { id: 'ace-moulding-270x110', name: 'ACE Moulding 270×110', category: 'Mouldings', brand: 'ACE', shortDescription: 'Extra-wide decorative polystyrene moulding 270mm × 110mm.', features: ['270mm × 110mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '270mm' }, { label: 'Height', value: '110mm' }], application: 'Extra-wide decorative moulding on rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-270x110.webp' },
  { id: 'ace-moulding-320x180', name: 'ACE Moulding 320×180', category: 'Mouldings', brand: 'ACE', shortDescription: 'Grand-scale decorative polystyrene moulding 320mm × 180mm.', features: ['320mm × 180mm decorative profile', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '320mm' }, { label: 'Height', value: '180mm' }], application: 'Grand-scale moulding for commercial and prestige rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-320x180.webp' },
  { id: 'ace-moulding-330x210', name: 'ACE Moulding 330×210', category: 'Mouldings', brand: 'ACE', shortDescription: 'The largest ACE decorative polystyrene moulding 330mm × 210mm. Statement cornice for prestige projects.', features: ['330mm × 210mm decorative profile', 'Largest ACE moulding', 'Lightweight polystyrene', 'Adhesive installation', 'Paintable'], specs: [{ label: 'Width', value: '330mm' }, { label: 'Height', value: '210mm' }], application: 'Statement cornice for prestige commercial and residential rendered facades.', badges: ['Factory Direct'], externalLink: 'https://www.acepolystyrene.com.au/products/ace-mouldings.html', imagePath: '/images/products/ace-moulding-330x210.webp' },
]

// =============================================================================
// PAINT – Placeholder (CBS stocks exterior render paints)
// TODO: Update with actual CBS paint brands and product lines
// =============================================================================

const paintProducts: Product[] = [
  {
    id: 'astec-energy-star-dirtguard',
    name: 'Astec Energy Star Dirtguard IR Elastic PCM LS',
    category: 'Paint',
    brand: 'Astec',
    shortDescription:
      'Premium exterior low sheen paint with heat-reflective infrared technology, dirt-resistant coating, and elastomeric properties for superior crack-bridging on rendered surfaces.',
    features: [
      'Heat-reflective infrared (IR) technology',
      'Dirtguard technology — self-cleaning finish',
      'Elastomeric — bridges hairline cracks',
      'Phase Change Material (PCM) for thermal regulation',
      'Low sheen finish',
      'Suitable for rendered and masonry surfaces',
    ],
    application:
      'Premium exterior paint coat over cured render systems on residential and commercial buildings. Ideal for facades exposed to high heat and UV.',
    badges: ['CBS Stocked', 'Popular'],
    featured: true,
    imagePath: '/images/products/astec-energy-star-dirtguard.webp',
    externalLink: 'https://www.astecpaints.com.au/products/energy-star-range/',
  },
  {
    id: 'astec-ec5000-pcm',
    name: 'Astec EC-5000 PCM Low Sheen',
    category: 'Paint',
    brand: 'Astec',
    shortDescription:
      'High-performance exterior low sheen acrylic paint with Phase Change Material technology for thermal comfort. Provides excellent coverage and durability on rendered facades.',
    features: [
      'Phase Change Material (PCM) technology',
      'Low sheen finish',
      '100% acrylic formulation',
      'Excellent UV resistance',
      'Suitable for rendered, masonry, and fibre cement surfaces',
      'Trade quantity supply',
    ],
    application: 'Exterior paint system over cured render coats on residential and commercial buildings.',
    badges: ['CBS Stocked'],
    featured: false,
    imagePath: '/images/products/astec-ec5000.webp',
    externalLink: 'https://www.astecpaints.com.au/products/ec-range/',
  },
  {
    id: 'astec-ec2000-extreme',
    name: 'Astec EC-2000 Extreme Low Sheen',
    category: 'Paint',
    brand: 'Astec',
    shortDescription:
      'Durable exterior low sheen acrylic paint designed for extreme weather conditions. Provides long-lasting protection and colour retention on rendered and masonry surfaces.',
    features: [
      'Extreme weather durability',
      'Low sheen finish',
      '100% acrylic formulation',
      'Excellent colour retention',
      'Suitable for rendered, masonry, and texture-coated surfaces',
      'Wide colour range available',
    ],
    application: 'Exterior paint coat over cured render or texture coatings in residential and commercial applications.',
    badges: ['CBS Stocked'],
    featured: false,
    imagePath: '/images/products/astec-ec2000.webp',
    externalLink: 'https://www.astecpaints.com.au/products/ec-range/',
  },
  {
    id: 'astec-energy-star-exterior',
    name: 'Astec Energy Star Exterior Low Sheen',
    category: 'Paint',
    brand: 'Astec',
    shortDescription:
      'Energy-efficient exterior low sheen paint with heat-reflective technology. Reduces heat absorption through painted surfaces for improved thermal comfort indoors.',
    features: [
      'Heat-reflective technology',
      'Low sheen finish',
      'Energy Star rated',
      '100% acrylic formulation',
      'Suitable for rendered and masonry surfaces',
      'Interior and exterior grades available',
    ],
    application: 'Exterior paint system on rendered facades where thermal performance and energy efficiency are required.',
    badges: ['CBS Stocked'],
    featured: false,
    imagePath: '/images/products/astec-energy-star-exterior.webp',
    externalLink: 'https://www.astecpaints.com.au/products/energy-star-range/',
  },
  { id: 'astec-firewall-render', name: 'Astec Firewall Render', category: 'Render', brand: 'Astec', shortDescription: 'High-performance exterior render system for fire-rated applications.', features: ['Fire-rated render system', 'Exterior application', 'For masonry and EPS substrates', 'Weather resistant'], application: 'Fire-rated base coat render on masonry and EPS cladding systems.', badges: ['CBS Stocked', 'Fire Rated'], externalLink: 'https://www.astecpaints.com.au/products/firewall-range/', imagePath: '/images/products/astec-firewall-render.webp' },
  { id: 'astec-firewall-1530', name: 'Astec Firewall 1530 Render (Non-Combustible)', category: 'Render', brand: 'Astec', shortDescription: 'AS1530.1 Non-Combustible certified render for fire-rated wall systems.', features: ['AS1530.1 Non-Combustible certified', 'Fire-rated wall systems', 'Commercial and residential'], application: 'Non-combustible render for fire-rated cladding and wall systems.', badges: ['CBS Stocked', 'AS1530.1', 'Non-Combustible'], externalLink: 'https://www.astecpaints.com.au/products/firewall-range/', imagePath: '/images/products/astec-firewall-1530.webp' },
  { id: 'astec-firewall-rota', name: 'Astec Firewall Rota-Render (Non-Combustible)', category: 'Render', brand: 'Astec', shortDescription: 'Non-combustible rotary-applied render for fire-rated systems.', features: ['Non-combustible certified', 'Rotary/machine application', 'Fire-rated systems'], application: 'Machine-applied non-combustible render for fire-rated wall systems.', badges: ['CBS Stocked', 'Non-Combustible'], externalLink: 'https://www.astecpaints.com.au/products/firewall-range/', imagePath: '/images/products/astec-firewall-rota.webp' },
  { id: 'astec-firewall-skim', name: 'Astec Firewall Skim', category: 'Render', brand: 'Astec', shortDescription: 'Fine-grade skim coat finish for Astec Firewall render base coats.', features: ['Fine skim finish coat', 'Over Firewall base coats', 'Smooth finish for paint or texture'], application: 'Skim finishing coat over Astec Firewall render base coats.', badges: ['CBS Stocked'], externalLink: 'https://www.astecpaints.com.au/products/firewall-range/', imagePath: '/images/products/astec-firewall-skim.webp' },
  { id: 'astec-firewall-aggraprime', name: 'Astec Firewall Aggra-Prime', category: 'Render', brand: 'Astec', shortDescription: 'Aggregate primer for Astec Firewall render systems.', features: ['Aggregate primer', 'Creates bonding key', 'For smooth and non-porous substrates'], application: 'Primer on smooth substrates prior to Astec Firewall render application.', badges: ['CBS Stocked'], externalLink: 'https://www.astecpaints.com.au/products/firewall-range/', imagePath: '/images/products/astec-firewall-aggraprime.webp' },
]

// =============================================================================
// TOOLS – Rendering tools stocked by CBS
// TODO: Update product names and descriptions with exact CBS inventory
// =============================================================================

const toolsProducts: Product[] = []

// =============================================================================
// ACCESSORIES – Fixings, washers, screws, accelerators
// (ACE render mesh lives under the Mesh category; Builders Emporium spray guns,
//  hoses and nails are Accessories but sit in beProducts below)
// =============================================================================

const accessoriesProducts: Product[] = [
  {
    id: 'ace-render-mesh',
    name: 'ACE Fibreglass Render Mesh',
    category: 'Mesh',
    brand: 'ACE',
    shortDescription:
      'Alkali-resistant fibreglass mesh for reinforcing the base coat in EIFS/EWI cladding systems. Available in widths from 50mm to 1200mm in 50m rolls.',
    features: [
      'Alkali-resistant fibreglass construction',
      'Available widths: 50mm, 150mm, 600mm, 1000mm, 1200mm',
      'Roll length: 50m',
      'Adhesive and non-adhesive variants available',
      'Essential component of EPS cladding systems',
      'Provides crack control and structural integrity',
    ],
    application: 'Embedded into base coat render over EPS foam panels in EWI/EIFS cladding systems.',
    badges: ['Factory Direct', 'CBS Stocked'],
    externalLink: 'https://www.acepolystyrene.com.au/products.html',
    featured: true,
    imagePath: '/images/aae48f01-4072-4c17-97fd-d65329611b85.webp',
  },
  {
    id: 'ace-grey-washer',
    name: 'ACE Grey Plastic Washer',
    category: 'Accessories',
    brand: 'ACE',
    shortDescription:
      'Wide-flange plastic washers for fixing polystyrene foam panels to the wall substrate. Distribute fixing load across the EPS face to prevent pull-through.',
    features: [
      'Wide bearing surface to distribute load',
      'UV-stabilised plastic construction',
      'Compatible with ACE foam screw fixings',
      'Sold in trade packs',
    ],
    application: 'Mechanical fixings for ACE foam panels in EWI/EIFS cladding systems.',
    badges: ['Factory Direct', 'CBS Stocked'],
    featured: false,
    imagePath: '/images/aae48f01-4072-4c17-97fd-d65329611b85.webp',
    externalLink: 'https://www.acepolystyrene.com.au/products/screws-washers.html',
  },
  {
    id: 'ace-screws-sds',
    name: 'Self-Drilling SDS Screws (EPS Fixing)',
    category: 'Accessories',
    brand: 'ACE',
    shortDescription:
      'Self-drilling screws for securing polystyrene foam panels and battens. Used with ACE Grey Plastic Washers for a compliant EPS mechanical fixing system.',
    features: [
      'Self-drilling tip — no pre-drilling required',
      'Various lengths to match foam thickness',
      'Corrosion-resistant coating',
      'Used with ACE Grey Plastic Washer for EPS fixing',
      'Sold in trade packs',
    ],
    application: 'Mechanical fixing of ACE foam panels to masonry, timber frame, or steel frame substrates.',
    badges: ['Factory Direct', 'CBS Stocked'],
    featured: false,
    imagePath: '/images/aae48f01-4072-4c17-97fd-d65329611b85.webp',
    externalLink: 'https://www.acepolystyrene.com.au/products/screws-washers.html',
  },
  {
    id: 'macbond-admixture',
    name: 'Melbacrylic Macbond Admixture',
    category: 'Render',
    brand: 'Melbacrylic',
    shortDescription:
      'Polymer admixture added to cement-based render mixes to improve tensile adhesion and flexibility. Used where extra bond strength is required on difficult substrates.',
    features: [
      'Acrylic polymer admixture',
      'Improves tensile adhesion of cement renders',
      'Adds flexibility to cementitious mixes',
      'Used in conjunction with Melbacrylic renders',
      'Particularly useful on difficult substrates',
    ],
    application: 'Added to base render mixes on difficult or low-porosity substrates requiring extra adhesion.',
    badges: ['System Product'],
    externalLink: 'http://www.melbacrylic.com.au/macbond',
    featured: false,
    imagePath: '/images/products/mac-macbond.webp',
  },
  // (Novatex Nova Mix / Novabond now in Novatex Primers section above)
  // --- NOVATEX PRIMERS & ADDITIVES ---
  { id: 'novatex-optimus-primer', name: 'Novatex Optimus Primer', category: 'Render', brand: 'Novatex', shortDescription: 'Premium acrylic primer for masonry and rendered surfaces. Prepares substrates for render and texture coating application.', features: ['Premium acrylic primer', 'For masonry and rendered surfaces', 'Substrate preparation'], application: 'Primer on masonry prior to render or texture coating application.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/', imagePath: '/images/products/novatex-optimus-primer.webp' },
  { id: 'novatex-novaprime', name: 'Novatex NovaPrime', category: 'Render', brand: 'Novatex', shortDescription: 'Acrylic primer for porous masonry substrates. Controls suction and improves adhesion of subsequent coatings.', features: ['Acrylic primer', 'Controls suction', 'Improves adhesion', 'For porous masonry'], application: 'Prime coat on porous masonry prior to rendering.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/', imagePath: '/images/products/novatex-novaprime.webp' },
  { id: 'novatex-novabond-additive', name: 'Novatex Novabond Additive', category: 'Render', brand: 'Novatex', shortDescription: 'Priming and bonding admixture for Novatex renders. Diluted 1:1 with water as a surface primer, or added to mix water on high-suction substrates.', features: ['Priming and bonding admixture', 'Dilute 1:1 as surface primer', 'Add to mix water for high-suction substrates', 'Compatible with all Novatex renders'], application: 'Surface prime coat and mix water additive for Novatex renders.', badges: ['System Product', 'CBS Stocked'], externalLink: 'https://novatexproducts.com.au/products/', imagePath: '/images/products/novatex-novabond-additive.webp' },
  { id: 'novatex-hydro-prime', name: 'Novatex Hydro Prime', category: 'Render', brand: 'Novatex', shortDescription: 'Water-based hydrophobic primer for rendered and masonry surfaces requiring moisture resistance.', features: ['Hydrophobic primer', 'Water-based', 'Moisture resistance', 'For rendered and masonry surfaces'], application: 'Hydrophobic primer on rendered surfaces requiring moisture protection.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/', imagePath: '/images/products/novatex-hydro-prime.webp' },
  // --- NOVATEX TILE ADHESIVES ---
  { id: 'novatex-e-lite-white', name: 'Novatex E-Lite White', category: 'Tiling', brand: 'Novatex', shortDescription: 'Premium grade tile adhesive with superior adhesion strength and flexibility. Lightweight PFR formulation suitable for timber floors and swimming pools.', features: ['High performance adhesive', 'Flexible bonding', 'Non-slump formulation', 'Extended open time', 'C2S2TE classification', 'Suitable for heated floor systems', 'Lightweight'], specs: [{ label: 'Classification', value: 'C2S2TE' }], application: 'Diverse tiling including timber floors and swimming pool installations.', badges: ['System Product', 'C2S2TE'], externalLink: 'https://novatexproducts.com.au/products/e-lite-white/', imagePath: '/images/products/novatex-e-lite-white.webp' },
  { id: 'novatex-uninova', name: 'Novatex Uninova', category: 'Tiling', brand: 'Novatex', shortDescription: 'Premium grade non-slip, non-slump, flexible white tile adhesive designed to withstand movement in substrates. Lightweight PFR formulation.', features: ['High performance', 'Flexible', 'Non-slump', 'Extended open time', 'Lightweight', 'C2S2TE classification'], specs: [{ label: 'Classification', value: 'C2S2TE' }, { label: 'Colour', value: 'White' }], application: 'Diverse tiling including timber floors and pool installations.', badges: ['System Product', 'C2S2TE'], externalLink: 'https://novatexproducts.com.au/products/uninova/', imagePath: '/images/products/novatex-uninova.webp' },
  { id: 'novatex-novamastic', name: 'Novatex Novamastic', category: 'Tiling', brand: 'Novatex', shortDescription: 'Non-slump white cement based tile adhesive designed for large format tiles. Will not slump on walls or floors.', features: ['Commercial grade', 'Flexible, non-slump', 'Extended open time', 'C2S1TE classification'], specs: [{ label: 'Classification', value: 'C2S1TE' }], application: 'Large format tiles on walls and floors.', badges: ['System Product', 'C2S1TE'], externalLink: 'https://novatexproducts.com.au/products/novamastic/', imagePath: '/images/products/novatex-novamastic.webp' },
  { id: 'novatex-terranova', name: 'Novatex Terranova', category: 'Tiling', brand: 'Novatex', shortDescription: 'Premium grade fast-setting, non-slip, non-slump flexible tile adhesive for moisture sensitive stone. Trafficable after 4 hours.', features: ['Fast set — trafficable after 4 hours', 'Flexible', 'Non-slump', 'C2S2TE classification', 'For moisture-sensitive stone'], specs: [{ label: 'Classification', value: 'C2S2TE' }, { label: 'Setting time', value: '4 hours to traffic' }], application: 'Moisture-sensitive stone, general tiling requiring fast set.', badges: ['System Product', 'C2S2TE'], externalLink: 'https://novatexproducts.com.au/products/terranova/', imagePath: '/images/products/novatex-terranova.webp' },
  { id: 'novatex-supanova', name: 'Novatex Supanova', category: 'Tiling', brand: 'Novatex', shortDescription: 'Super grade polymer modified tile adhesive with FR technology for superior shear strength. Ideal for heavy vehicle traffic on driveways.', features: ['Superior impact strength', 'Extended open time', 'C1E classification'], specs: [{ label: 'Classification', value: 'C1E' }], application: 'Heavy-duty tiling for driveways with vehicular loads.', badges: ['System Product', 'C1E'], externalLink: 'https://novatexproducts.com.au/products/supanova/', imagePath: '/images/products/novatex-supanova.webp' },
  // --- NOVATEX GROUTS ---
  { id: 'novatex-novagrout-smooth', name: 'Novatex NovaGrout Smooth', category: 'Tiling', brand: 'Novatex', shortDescription: 'Polymer-modified cement-based grout for internal and external wall and floor applications. Mould resistant, non-shrink with easy clean-off.', features: ['Mould resistant', 'Non-shrink', 'Suitable for swimming pools', 'Easy clean off', 'Joint width: 1.5–4mm'], specs: [{ label: 'Joint width', value: '1.5–4mm' }], application: 'Internal and external wall and floor tiling with ceramic, marble, porcelain, stone, and mosaic tiles.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/novagrout-smooth/', imagePath: '/images/products/novatex-novagrout-smooth.webp' },
  { id: 'novatex-novagrout-sanded', name: 'Novatex NovaGrout Sanded', category: 'Tiling', brand: 'Novatex', shortDescription: 'Polymer-modified cement-based grout for wider joints. Mould resistant, non-shrink formula.', features: ['Mould resistant', 'Non-shrink', 'Joint width: 3–12mm', 'Easy clean off'], specs: [{ label: 'Joint width', value: '3–12mm' }], application: 'Internal and external tiling with wider joints.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/novagrout-sanded/', imagePath: '/images/products/novatex-novagrout-sanded.webp' },
  { id: 'novatex-novagrout-epoxy', name: 'Novatex NovaGrout Epoxy', category: 'Tiling', brand: 'Novatex', shortDescription: 'Three part commercial grade water clean-up epoxy grout system. Chemical resistant with high mechanical strength.', features: ['Chemical resistant', 'High mechanical strength', 'Non-shrink', 'Joint width: 1.2–6mm', 'Water cleanup'], specs: [{ label: 'Joint width', value: '1.2–6mm' }, { label: 'Type', value: 'Three-part epoxy' }], application: 'Tile grouting where chemical resistance and durability are required.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/novagrout-epoxy/', imagePath: '/images/products/novatex-novagrout-epoxy.webp' },
  // --- NOVATEX SPECIALTY ---
  { id: 'novatex-mega-screed', name: 'Novatex Mega Screed', category: 'Tiling', brand: 'Novatex', shortDescription: 'Engineered screed for preparation of concrete floors prior to laying floor coverings. Walkable in 3 hours, up to 60mm thickness.', features: ['Bonded and unbonded screeds to 60mm', 'Walkable in 3 hours', 'Superior adhesion to concrete', 'Pumpable', 'Shrinkage compensated'], specs: [{ label: 'Max thickness', value: '60mm' }, { label: 'Walk time', value: '3 hours' }], application: 'Floor preparation before timber, vinyl, or tile coverings.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/mega-screed/', imagePath: '/images/products/novatex-mega-screed.webp' },
  { id: 'novatex-levelr-superflow', name: 'Novatex LevelR Superflow', category: 'Tiling', brand: 'Novatex', shortDescription: 'Self-smoothing levelling compound for concrete floors. Fast-setting, feather edge to 15mm.', features: ['Self-smoothing', 'Feather edge to 15mm', 'Fast setting', 'Pumpable', 'Superior adhesion'], specs: [{ label: 'Thickness', value: 'Feather edge to 15mm' }], application: 'Floor levelling before laying coverings.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/levelr-superflow/', imagePath: '/images/products/novatex-levelr-superflow.webp' },
  { id: 'novatex-levelr', name: 'Novatex LevelR', category: 'Tiling', brand: 'Novatex', shortDescription: 'Self-smoothing levelling compound for concrete floors. Feather edge to 50mm thickness.', features: ['Self-smoothing', 'Feather edge to 50mm', 'Fast setting', 'Pumpable', 'Superior adhesion'], specs: [{ label: 'Thickness', value: 'Feather edge to 50mm' }], application: 'Floor levelling and preparation.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/levelr/', imagePath: '/images/products/novatex-levelr.webp' },
  { id: 'novatex-structagrout', name: 'Novatex StructaGrout', category: 'Tiling', brand: 'Novatex', shortDescription: 'Class A cementitious grout for patching cement and concrete elements including precast and tilt-up panels.', features: ['Class A grout', 'Shrinkage compensated', 'For tilt-up and precast panels', 'Column underpinning', 'Hollow block filling', 'Pumpable'], application: 'Patching concrete elements, precast panels, column underpinning, hollow block filling.', badges: ['System Product', 'Class A'], externalLink: 'https://novatexproducts.com.au/products/structagrout/', imagePath: '/images/products/novatex-structagrout.webp' },
  // --- NOVATEX WATERPROOFING & SEALANTS ---
  { id: 'novatex-novaproof-pu-815', name: 'Novatex NovaProof PU 815', category: 'Waterproofing', brand: 'Novatex', shortDescription: 'Polyurethane-based highly elastic waterproofing membrane for wet areas. One-part pre-mixed, Class III rated.', features: ['Class III (AS/NZS 4858:2004)', 'One-part pre-mixed', 'Fast curing', 'Internal and external', 'Light grey'], specs: [{ label: 'Classification', value: 'Class III (AS/NZS 4858:2004)' }, { label: 'Type', value: 'One-part pre-mixed' }], application: 'Internal wet areas, external waterproofing.', badges: ['System Product', 'Class III'], externalLink: 'https://novatexproducts.com.au/products/novaproof-pu-815/', imagePath: '/images/products/novatex-novaproof-pu-815.webp' },
  { id: 'novatex-novaproof-fr', name: 'Novatex NovaProof FR', category: 'Waterproofing', brand: 'Novatex', shortDescription: 'Polyurethane modified fibre reinforced flexible waterproofing membrane. Class III, pre-mixed ready to use.', features: ['Class III (AS/NZS 4858)', 'Fibre reinforced', 'Pre-mixed', 'For showers, bathrooms, laundries, verandahs'], specs: [{ label: 'Classification', value: 'Class III (AS/NZS 4858)' }], application: 'Shower recesses, bathrooms, laundries, exterior verandahs.', badges: ['System Product', 'Class III'], externalLink: 'https://novatexproducts.com.au/products/novaproof-fr/', imagePath: '/images/products/novatex-novaproof-fr.webp' },
  { id: 'novatex-novaproof-2-part', name: 'Novatex NovaProof 2 Part', category: 'Waterproofing', brand: 'Novatex', shortDescription: 'Fast-drying two-component waterproof membrane. Handles ponding and permanently wet conditions without re-emulsifying.', features: ['Two-component system', 'Handles ponding — will not re-emulsify', 'Flexible with good elongation', 'Non-sag', 'Solvent-free'], application: 'Waterproofing for ponding and permanently wet conditions.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/novaproof-2-part/', imagePath: '/images/products/novatex-novaproof-2-part.webp' },
  { id: 'novatex-forza-ms-20', name: 'Novatex Forza MS 20', category: 'Waterproofing', brand: 'Novatex', shortDescription: 'One-part MS Polymer permanently elastic construction sealant for expansion and construction joints. +/-25% joint movement.', features: ['MS Polymer', 'Permanently elastic', 'Paintable', 'Odourless', '+/-25% joint movement', 'Resists ageing and weathering'], specs: [{ label: 'Joint movement', value: '+/-25%' }, { label: 'Type', value: 'MS Polymer' }], application: 'Sealing expansion and construction joints.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/forza-ms-20/', imagePath: '/images/products/novatex-forza-ms-20.webp' },
  { id: 'novatex-forza-fc-50', name: 'Novatex Forza FC 50', category: 'Waterproofing', brand: 'Novatex', shortDescription: 'High-performance one-component polyurethane adhesive/sealant. Permanently flexible, bonds and seals simultaneously.', features: ['One-component polyurethane', 'Permanently flexible', 'Bonds and seals simultaneously', 'Non-sag', 'Fast drying'], application: 'Bonding and sealing metals, painted surfaces, PVC, and rigid plastics.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/forza-fc-50/', imagePath: '/images/products/novatex-forza-fc-50.webp' },
  { id: 'novatex-elasto-joint-band', name: 'Novatex Elasto Series Joint Band', category: 'Waterproofing', brand: 'Novatex', shortDescription: 'Waterproofing joint bands, pre-fabricated corners, and pipe collars with enhanced elastic recovery and high tensile properties.', features: ['Enhanced elastic recovery', 'High tensile', 'Pre-fabricated corners and collars', 'Internal and external', 'Solvent-free'], application: 'Waterproofing bond breakers, pipe sealing, joint reinforcement.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/elasto-series-joint-band/', imagePath: '/images/products/novatex-elasto-series-joint-band.webp' },
  { id: 'novatex-novarapid', name: 'Novatex NovaRapid', category: 'Accessories', brand: 'Novatex', shortDescription: 'Calcium Chloride based liquid accelerator for cement based products. Makes renders, adhesives, and grouts set and develop strength faster.', features: ['Accelerates cement-based curing', 'For Novatex tile adhesives, grouts, and renders', 'Liquid format'], application: 'Accelerating setting times for Novatex cement-based products.', badges: ['System Product'], externalLink: 'https://novatexproducts.com.au/products/novarapid/', imagePath: '/images/products/novatex-novarapid.webp' },
  // --- MELBACRYLIC BASE PREP ---
  { id: 'mac-pro-prime', name: 'Melbacrylic Pro-Prime', category: 'Render', brand: 'Melbacrylic', shortDescription: 'A gritty, highly water resistant acrylic based primer formulated for application to smooth, dense and low porosity surfaces. Creates a bonding key for subsequent render coats.', features: ['Gritty finish for mechanical key', 'Highly water resistant', 'For smooth, dense and low porosity surfaces', 'Acrylic based formulation'], application: 'Prime coat on smooth concrete, tilt-up panels, and low-porosity substrates prior to rendering.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/proprime', imagePath: '/images/products/mac-pro-prime.webp' },
  { id: 'mac-macprime', name: 'Melbacrylic Macprime', category: 'Render', brand: 'Melbacrylic', shortDescription: 'A tintable acrylic based masonry primer formulated for use on porous surfaces prior to the application of decorative textured finish coats.', features: ['Tintable formulation', 'For porous masonry surfaces', 'Acrylic based', 'Prepares surface for textured finishes'], application: 'Primer for porous masonry surfaces before applying decorative textured coatings.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/macprime', imagePath: '/images/products/mac-macprime.webp' },
  { id: 'mac-macprime-hp', name: 'Melbacrylic Macprime HP', category: 'Render', brand: 'Melbacrylic', shortDescription: 'A low viscosity, highly water resistant acrylic based masonry primer formulated for penetration into high and low porosity surfaces.', features: ['Low viscosity for deep penetration', 'Highly water resistant', 'Suits both high and low porosity surfaces', 'Acrylic based'], application: 'Deep-penetrating primer for variable-porosity masonry prior to rendering.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/macprime-hp', imagePath: '/images/products/mac-macprime-hp.webp' },
  { id: 'mac-macpatch-fine', name: 'Melbacrylic Macpatch Fine', category: 'Render', brand: 'Melbacrylic', shortDescription: 'A low-shrink, highly flexible acrylic patching compound for setting rebated joints in fibre-cement base sheet constructions.', features: ['Low shrinkage', 'Highly flexible', 'For rebated joints in fibre-cement sheet', 'Acrylic patching compound'], application: 'Joint patching and skim coating on fibre-cement base sheet.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/macpatch-fine', imagePath: '/images/products/mac-macpatch-fine.webp' },
  { id: 'mac-wpm440', name: 'Melbacrylic WPM-440', category: 'Waterproofing', brand: 'Melbacrylic', shortDescription: 'A premium grade, highly flexible, one-part Class III water based waterproofing membrane suitable for internal and external wet areas.', features: ['Class III waterproofing membrane', 'One-part application', 'Highly flexible', 'Internal and external wet areas', 'Water based'], application: 'Waterproofing membrane for wet areas, balconies, and external applications.', badges: ['System Product'], externalLink: 'http://www.melbacrylic.com.au/wpm440', imagePath: '/images/products/mac-wpm440.webp' },
]

// =============================================================================
// BUILDERS EMPORIUM – Australian-made render accessories
// Sourced from https://buildersemporium.com.au/ (37 products)
// Angles      → render angles, arch beads, starter trims, stop beads, expansion joints
// Mesh        → fibreglass render mesh, adhesive mesh tape, expanded metal mesh
// Accessories → render spray guns, hoses, stainless steel nails
// =============================================================================

const beProducts: Product[] = [
  { id: 'be-render-spray-gun-rsg', name: 'Render Spray Gun (RSG)', category: 'Accessories', brand: 'Builders Emporium', shortDescription: 'Standalone 8-dial multi-function render spray gun designed in Australia for Australian renderers. Switch between fine mist, coarse mist, shower, jet, soaker, and flat patterns.', features: ['8-dial gun: 2 fine mist, 2 coarse mist, shower, jet, soaker, flat', 'Designed in Australia specifically for Australian renderers', 'Eases the float and sponge stage of render finishing'], application: 'Spraying water during the float/sponge stage of acrylic and cement render.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/render-spray-gun-rsg', imagePath: '/images/products/be-render-spray-gun-rsg.webp' },
  { id: 'be-render-spray-gun-hose-tap-connectors-rsg-4pcs', name: 'Render Spray Gun + Hose/Tap Connectors (RSG+4pcs)', category: 'Accessories', brand: 'Builders Emporium', shortDescription: 'Australian-designed 8-dial render spray gun bundled with two hose connectors, one tap connector, and a three-way coupler. Speeds up the floating and sponging stage of any render system.', features: ['8-dial spray head: 2 fine mist, 2 coarse mist, shower, jet, soaker, flat', 'Bundled with 2 hose connectors, 1 tap connector, 3-way coupler', 'Designed in Australia specifically for Australian renderers', 'Ideal for floating and sponging acrylic and cement render'], specs: [{ label: 'Pack contents', value: 'Spray gun + 4pcs accessory set' }], application: 'Floating, sponging, and finishing of acrylic and cement-based render systems.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/render-spray-gun-hose-tap-connectors-rsg-4pcs', imagePath: '/images/products/be-render-spray-gun-hose-tap-connectors-rsg-4pcs.webp' },
  { id: 'be-a-heavyduty-high-visability-hose-30', name: 'Heavy-Duty High-Visibility Render Hose 30m (HOSE-30)', category: 'Accessories', brand: 'Builders Emporium', shortDescription: '30-metre heavy-duty high-visibility hose engineered to handle building-site conditions and hold pressure for everyday rendering use. Working pressure 275psi.', features: ['30m length', 'Working pressure 275psi', 'High-visibility colour for site safety', 'Heavy-duty construction for harsh job sites'], specs: [{ label: 'Length', value: '30m' }, { label: 'Working pressure', value: '275psi' }], application: 'On-site water supply for render spray gun work and general building-site use.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/a-heavyduty-high-visability-hose-30', imagePath: '/images/products/be-a-heavyduty-high-visability-hose-30.webp' },
  { id: 'be-heavyduty-high-visability-hose-50', name: 'Heavy-Duty High-Visibility Render Hose 50m (HOSE-50)', category: 'Accessories', brand: 'Builders Emporium', shortDescription: '50-metre heavy-duty high-visibility hose engineered to handle building-site conditions and hold pressure for everyday rendering use. Working pressure 275psi.', features: ['50m length', 'Working pressure 275psi', 'High-visibility colour for site safety', 'Heavy-duty construction for harsh job sites'], specs: [{ label: 'Length', value: '50m' }, { label: 'Working pressure', value: '275psi' }], application: 'On-site water supply for render spray gun work and general building-site use.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/heavyduty-high-visability-hose-50', imagePath: '/images/products/be-heavyduty-high-visability-hose-50.webp' },
  { id: 'be-slimline-acrylic-render-angle-be-2mm', name: 'Slimline Acrylic Render Angle 25×25mm — 2mm Build (BE-2mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Ultra-slimline acrylic render external angle. 25×25mm wide leg with a 2mm render build and small anchor-cap finish. Suits both texture coating and paint finish.', features: ['Ultra-slimline 25×25mm leg', '2mm render build with anchor-cap finish', 'Suits both texture coating and paint finish', '3m length'], specs: [{ label: 'Leg', value: '25×25mm' }, { label: 'Render build', value: '2mm' }, { label: 'Length', value: '3m' }], application: '90° external acrylic render corners — minimal-build/skim systems.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/slimline-acrylic-render-angle-be-2mm', imagePath: '/images/products/be-slimline-acrylic-render-angle-be-2mm.webp' },
  { id: 'be-slimline-acrylic-render-angle-be-2-5mm-round', name: 'Slimline Acrylic Render Angle 30×30mm Round — 2.5mm (BE-2.5mm Round)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Slimline acrylic render external angle with a 30×30mm wide leg and 2.5mm render build. Small curved bump finish suited to paint finishes.', features: ['30×30mm leg', '2.5mm render build with curved bump finish', 'Best suited to paint finishes', '3m length'], specs: [{ label: 'Leg', value: '30×30mm' }, { label: 'Render build', value: '2.5mm' }, { label: 'Finish', value: 'Curved bump' }, { label: 'Length', value: '3m' }], application: '90° external acrylic render corners with rounded paint-finish detailing.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/slimline-acrylic-render-angle-be-2-5mm-round', imagePath: '/images/products/be-slimline-acrylic-render-angle-be-2-5mm-round.webp' },
  { id: 'be-slimline-acrylic-render-angle-2-5mmtex', name: 'Slimline Acrylic Render Angle 30×30mm Tex — 2.5mm (2.5mmTex)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Slimline acrylic render external angle with a 30×30mm wide leg and 2.5mm render build. Sharp square finish — designed for texture coatings.', features: ['30×30mm leg', '2.5mm render build with sharp square finish', 'Optimised for texture coatings', '3m length'], specs: [{ label: 'Leg', value: '30×30mm' }, { label: 'Render build', value: '2.5mm' }, { label: 'Finish', value: 'Sharp square' }, { label: 'Length', value: '3m' }], application: '90° external acrylic render corners under texture-coated finishes.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/slimline-acrylic-render-angle-2-5mmtex', imagePath: '/images/products/be-slimline-acrylic-render-angle-2-5mmtex.webp' },
  { id: 'be-slimline-acrylic-render-angle-be-3-5mm', name: 'Slimline Acrylic Render Angle 30×30mm — 3.5mm Build (BE-3.5mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Slimline acrylic render external angle with a 30×30mm wide leg and 3.5mm render build. Small anchor-cap finish suiting both paint and texture coating.', features: ['30×30mm leg', '3.5mm render build with anchor-cap finish', 'Suits both paint and texture finishes', '3m length'], specs: [{ label: 'Leg', value: '30×30mm' }, { label: 'Render build', value: '3.5mm' }, { label: 'Length', value: '3m' }], application: '90° external acrylic render corners at standard render build thickness.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/slimline-acrylic-render-angle-be-3-5mm', imagePath: '/images/products/be-slimline-acrylic-render-angle-be-3-5mm.webp' },
  { id: 'be-slimline-acrylic-render-angle-4mm-mintex', name: 'Acrylic or Sand–Cement Render Angle 40×40mm — 4mm (4mm Tex)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Render external angle for either acrylic or sand–cement render. 40×40mm wide leg with a 4mm render build and square finish — ideal for texture coatings.', features: ['40×40mm wide leg', '4mm render build with square finish', 'Suits acrylic and sand–cement render', 'Optimised for texture-coated finishes', '3m length'], specs: [{ label: 'Leg', value: '40×40mm' }, { label: 'Render build', value: '4mm' }, { label: 'Finish', value: 'Square' }, { label: 'Length', value: '3m' }], application: '90° external corners on acrylic or cement render walls under texture coatings.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/slimline-acrylic-render-angle-4mm-mintex', imagePath: '/images/products/be-slimline-acrylic-render-angle-4mm-mintex.webp' },
  { id: 'be-acrylic-render-pre-meshed-angle-4mm-mesh', name: 'Acrylic Render Pre-Meshed Angle 4mm (4mm Mesh)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Pre-meshed acrylic render external angle. 40×40mm wide leg with a 4mm render build and fibreglass mesh extending 130mm each side to reinforce the corner of the render wall.', features: ['4mm render build with square finish', '40×40mm wide leg, 3m length', 'Pre-attached fibreglass mesh — 130mm each side', 'Square finish ideal for texture-coated finishes'], specs: [{ label: 'Leg', value: '40×40mm' }, { label: 'Render build', value: '4mm' }, { label: 'Length', value: '3m' }, { label: 'Mesh wing', value: '130mm each side' }], application: '90° external corners on acrylic render systems where mesh reinforcement is required.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/acrylic-render-pre-meshed-angle-4mm-mesh', imagePath: '/images/products/be-acrylic-render-pre-meshed-angle-4mm-mesh.webp' },
  { id: 'be-heavy-duty-sand-and-cementrender-angle-be40', name: 'Heavy-Duty Sand–Cement Render Angle 40×40mm (BE40)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Heavy-duty sand–cement render external angle with a 40×40mm wide leg. Medium 4mm radius finish — ideal for 90° render corners under cement-based systems.', features: ['Heavy-duty profile', '40×40mm wide leg, 4mm radius finish', 'Optimised for sand–cement render', '3m length'], specs: [{ label: 'Leg', value: '40×40mm' }, { label: 'Radius', value: '4mm' }, { label: 'Length', value: '3m' }], application: '90° external corners on sand–cement render walls.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/heavy-duty-sand-and-cementrender-angle-be40', imagePath: '/images/products/be-heavy-duty-sand-and-cementrender-angle-be40.webp' },
  { id: 'be-heavy-duty-sand-and-cementrender-angle', name: 'Heavy-Duty Sand–Cement Render Angle 45×45mm (BE45)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Heavy-duty sand–cement render external angle with a 45×45mm wide leg. Medium 5mm radius finish for 90° render corners under cement-based systems.', features: ['Heavy-duty profile', '45×45mm wide leg, 5mm radius finish', 'Optimised for sand–cement render', '3m length'], specs: [{ label: 'Leg', value: '45×45mm' }, { label: 'Radius', value: '5mm' }, { label: 'Length', value: '3m' }], application: '90° external corners on sand–cement render walls — higher build thickness.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/heavy-duty-sand-and-cementrender-angle', imagePath: '/images/products/be-heavy-duty-sand-and-cementrender-angle.webp' },
  { id: 'be-sand-and-cement-render-angle-be50', name: 'Sand–Cement Render Angle 50×50mm (BE50)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Sand–cement render external angle with a 50×50mm wide leg. Large 8mm radius finish — heaviest build in the range, suited to thick cement render systems.', features: ['50×50mm wide leg', '8mm radius finish — largest in range', 'Optimised for thick sand–cement render', '3m length'], specs: [{ label: 'Leg', value: '50×50mm' }, { label: 'Radius', value: '8mm' }, { label: 'Length', value: '3m' }], application: '90° external corners on heavy-build sand–cement render walls.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/sand-and-cement-render-angle-be50', imagePath: '/images/products/be-sand-and-cement-render-angle-be50.webp' },
  { id: 'be-aluminium-render-angle-al60-3', name: 'Aluminium Render Angle 60×60mm (AL60-3)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Aluminium external render angle with 60×60mm wide leg and 5mm render build. Bump finish on a 3m length. Suitable for both internal and external 90° corners.', features: ['Aluminium — corrosion resistant, internal/external use', '60×60mm wide leg, 3m length', '5mm render build with bump finish', 'Ideal for 90° corners'], specs: [{ label: 'Material', value: 'Aluminium' }, { label: 'Leg', value: '60×60mm' }, { label: 'Render build', value: '5mm' }, { label: 'Length', value: '3m' }], application: '90° external/internal render corners — preferred where exposure or moisture rules out galvanised steel.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/aluminium-render-angle-al60-3', imagePath: '/images/products/be-aluminium-render-angle-al60-3.webp' },
  { id: 'be-fibre-cement-sheeting-starter-trim-gal60-3', name: 'Galvanised Steel Render Angle 60×60mm (GAL60-3)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Galvanised steel render angle with 60×60mm wide leg and 5mm render build. Bump finish on a 3m length. For internal use only.', features: ['Galvanised steel — internal use only', '60×60mm wide leg, 3m length', '5mm render build with bump finish', 'Ideal for 90° corners'], specs: [{ label: 'Material', value: 'Galvanised steel' }, { label: 'Leg', value: '60×60mm' }, { label: 'Render build', value: '5mm' }, { label: 'Length', value: '3m' }], application: '90° internal render corners with a 5mm build.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/fibre-cement-sheeting-starter-trim-gal60-3', imagePath: '/images/products/be-fibre-cement-sheeting-starter-trim-gal60-3.webp' },
  { id: 'be-galvanised-steel-slimline-plaster-board-gal30-2-4', name: 'Galvanised Slimline Plaster Board Angle 30×30mm — 2.4m (GAL30-2.4)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Slimline galvanised steel plaster board / render angle with 30×30mm wide leg and 2.5mm render build. Small bump finish, 2.4m length. Internal use only.', features: ['Galvanised steel — internal use only', '30×30mm wide leg, 2.4m length', '2.5mm render build with small bump finish', 'Matches standard 2.4m plasterboard heights'], specs: [{ label: 'Material', value: 'Galvanised steel' }, { label: 'Leg', value: '30×30mm' }, { label: 'Render build', value: '2.5mm' }, { label: 'Length', value: '2.4m' }], application: '90° internal plasterboard and skim render corners (2.4m ceiling heights).', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/galvanised-steel-slimline-plaster-board-gal30-2-4', imagePath: '/images/products/be-galvanised-steel-slimline-plaster-board-gal30-2-4.webp' },
  { id: 'be-galvanised-steel-slimline-plaster-board-gal30-2-7', name: 'Galvanised Slimline Plaster Board Angle 30×30mm — 2.7m (GAL30-2.7)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Slimline galvanised steel plaster board / render angle with 30×30mm wide leg and 2.5mm render build. Small bump finish, 2.7m length. Internal use only.', features: ['Galvanised steel — internal use only', '30×30mm wide leg, 2.7m length', '2.5mm render build with small bump finish', 'Standard plasterboard corner protection'], specs: [{ label: 'Material', value: 'Galvanised steel' }, { label: 'Leg', value: '30×30mm' }, { label: 'Render build', value: '2.5mm' }, { label: 'Length', value: '2.7m' }], application: '90° internal plasterboard and skim render corners (2.7m ceiling heights).', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/galvanised-steel-slimline-plaster-board-gal30-2-7', imagePath: '/images/products/be-galvanised-steel-slimline-plaster-board-gal30-2-7.webp' },
  { id: 'be-galvanised-steel-slimline-plaster-board-gal30-3', name: 'Galvanised Slimline Plaster Board Angle 30×30mm — 3m (GAL30-3)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Slimline galvanised steel plaster board / render angle with 30×30mm wide leg and 2.5mm render build. Small bump finish, 3m length. Internal use only.', features: ['Galvanised steel — internal use only', '30×30mm wide leg, 3m length', '2.5mm render build with small bump finish', 'Ideal for 90° plasterboard corners'], specs: [{ label: 'Material', value: 'Galvanised steel' }, { label: 'Leg', value: '30×30mm' }, { label: 'Render build', value: '2.5mm' }, { label: 'Length', value: '3m' }], application: '90° internal plasterboard and skim render corners.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/galvanised-steel-slimline-plaster-board-gal30-3', imagePath: '/images/products/be-galvanised-steel-slimline-plaster-board-gal30-3.webp' },
  { id: 'be-render-arch-bead-narrow-leg-arch-bead-2-5mm', name: 'Render Arch Bead Narrow Leg 2.5mm (Arch Bead-2.5mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Flexible arch bead for curved render walls. 35×35mm narrow leg with large holes for render keying. 2.5mm curved bump profile suits both acrylic and sand–cement render.', features: ['2.5mm curved bump finish', '35×35mm narrow leg, 3m length', 'Large keying holes for strong render adhesion', 'Suits acrylic and sand–cement render'], specs: [{ label: 'Leg', value: '35×35mm' }, { label: 'Render build', value: '2.5mm' }, { label: 'Length', value: '3m' }], application: 'Curved arches and rounded openings under acrylic or cement render.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/render-arch-bead-narrow-leg-arch-bead-2-5mm', imagePath: '/images/products/be-render-arch-bead-narrow-leg-arch-bead-2-5mm.webp' },
  { id: 'be-arch-bead-arch-bead', name: 'Render Arch Bead Wide Leg 3.5mm (Arch Bead-3.5mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Heavier-duty arch bead for curved walls. 45×45mm wide leg with large keying holes and a 3.5mm curved bump finish. Compatible with both acrylic and sand–cement render.', features: ['3.5mm curved bump finish', '45×45mm wide leg, 3m length', 'Large keying holes for render adhesion', 'Suits acrylic and sand–cement render'], specs: [{ label: 'Leg', value: '45×45mm' }, { label: 'Render build', value: '3.5mm' }, { label: 'Length', value: '3m' }], application: 'Curved arches and feature openings under acrylic or cement render.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/arch-bead-arch-bead', imagePath: '/images/products/be-arch-bead-arch-bead.webp' },
  { id: 'be-foam-panel-starter-trim-rst-75mm', name: 'Foam Panel Starter Trim 75mm (RST-75mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'PVC starter trim for the base of 75mm EPS foam wall panels. 3.5mm render build with weep holes to prevent water accumulation and a clean edge to render to.', features: ['For 75mm foam panels', '3.5mm render build', 'Weep holes to drain water at panel base', 'Provides clean render edge', '3m length'], specs: [{ label: 'Suits panel', value: '75mm EPS' }, { label: 'Render build', value: '3.5mm' }, { label: 'Length', value: '3m' }], application: 'Starter trim at the base of 75mm EPS foam wall panels in EWI/EIFS systems.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/foam-panel-starter-trim-rst-75mm', imagePath: '/images/products/be-foam-panel-starter-trim-rst-75mm.webp' },
  { id: 'be-foam-panel-starter-trim-rst-100mm', name: 'Foam Panel Starter Trim 100mm (RST-100mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'PVC starter trim for the base of 100mm EPS foam wall panels. 3.5mm render build with weep holes to prevent water accumulation and a clean edge to render to.', features: ['For 100mm foam panels', '3.5mm render build', 'Weep holes to drain water at panel base', 'Provides clean render edge', '3m length'], specs: [{ label: 'Suits panel', value: '100mm EPS' }, { label: 'Render build', value: '3.5mm' }, { label: 'Length', value: '3m' }], application: 'Starter trim at the base of 100mm EPS foam wall panels in EWI/EIFS systems.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/foam-panel-starter-trim-rst-100mm', imagePath: '/images/products/be-foam-panel-starter-trim-rst-100mm.webp' },
  { id: 'be-fibre-cement-sheeting-starter-trim-rst-7-5mm', name: 'Fibre Cement Sheeting Starter Trim 7.5mm (RST-7.5mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'PVC starter trim for the base of fibre-cement / blueboard sheeting. 2.5mm render build providing a clean edge for the render to finish to.', features: ['For fibre-cement / blueboard sheets', '2.5mm render build', 'Protects sheet base and gives clean render edge', '3m length'], specs: [{ label: 'Suits sheet', value: '7.5mm fibre-cement' }, { label: 'Render build', value: '2.5mm' }, { label: 'Length', value: '3m' }], application: 'Starter trim at the base of fibre-cement sheeting / blueboard render walls.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/fibre-cement-sheeting-starter-trim-rst-7-5mm', imagePath: '/images/products/be-fibre-cement-sheeting-starter-trim-rst-7-5mm.webp' },
  { id: 'be-slimline-25mm-wide-stop-bead-stop-4mm', name: 'Slimline Stop Bead 25mm — 4mm Build (Stop-4mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Slimline 25mm-wide stop bead with a 4mm render build. Gives a clean straight finish where a render wall ends or meets a different substrate. Designed for acrylic render.', features: ['25mm wide slimline profile', '4mm render build', 'Clean straight termination edge', 'For acrylic render systems', '3m length'], specs: [{ label: 'Width', value: '25mm' }, { label: 'Render build', value: '4mm' }, { label: 'Length', value: '3m' }], application: 'Edge termination of acrylic render at wall ends and substrate changes.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/slimline-25mm-wide-stop-bead-stop-4mm', imagePath: '/images/products/be-slimline-25mm-wide-stop-bead-stop-4mm.webp' },
  { id: 'be-40mm-wide-stop-bead-stop-6mm', name: 'Stop Bead 40mm — 6mm Build (Stop-6mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: '40mm-wide stop bead with a 6mm render build. Provides a clean straight termination where a render wall ends or meets a different substrate. Suits both acrylic and sand–cement render.', features: ['40mm wide profile', '6mm render build', 'Suits acrylic and sand–cement render', 'Clean straight termination edge', '3m length'], specs: [{ label: 'Width', value: '40mm' }, { label: 'Render build', value: '6mm' }, { label: 'Length', value: '3m' }], application: 'Edge termination of acrylic or cement render at wall ends and substrate changes.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/40mm-wide-stop-bead-stop-6mm', imagePath: '/images/products/be-40mm-wide-stop-bead-stop-6mm.webp' },
  { id: 'be-l-bead-stop-bead-tearaway-2-5mm', name: 'L Bead / Stop Bead Tear-Away 2.5mm (TearAway-2.5mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: 'Tear-away L bead / stop bead — 30mm wide with a 2.5mm render build. Gives a clean finish where blueboard or fibro meets a window frame, door reveal, or different substrate.', features: ['30mm wide bead, 2.5mm render build', 'Tear-away strip protects adjoining surface', 'Clean termination at window/door frames', '3m length'], specs: [{ label: 'Width', value: '30mm' }, { label: 'Render build', value: '2.5mm' }, { label: 'Length', value: '3m' }], application: 'Clean render termination where blueboard / fibro abuts window frames, doors, or dissimilar substrates.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/l-bead-stop-bead-tearaway-2-5mm', imagePath: '/images/products/be-l-bead-stop-bead-tearaway-2-5mm.webp' },
  { id: 'be-expansion-joint-4mm-ex-joint-4mm', name: 'Expansion Joint 4mm (Ex/Joint 4mm)', category: 'Angles', brand: 'Builders Emporium', shortDescription: '25×25mm expansion joint profile with a 4mm render build. Provides controlled flexible movement across structural joints in the substrate. Ideal under acrylic render.', features: ['25×25mm profile, 4mm render build', 'Accommodates structural movement at substrate joints', 'Ideal for use with acrylic render', '3m length'], specs: [{ label: 'Profile', value: '25×25mm' }, { label: 'Render build', value: '4mm' }, { label: 'Length', value: '3m' }], application: 'Render expansion / movement joints over structural breaks in the substrate.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/expansion-joint-4mm-ex-joint-4mm', imagePath: '/images/products/be-expansion-joint-4mm-ex-joint-4mm.webp' },
  { id: 'be-green-fibreglass-adhesive-mesh-tape-amt-50', name: 'Green Fibreglass Adhesive Mesh Tape 50mm (AMT-50)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Narrow self-adhesive alkaline-resistant green fibreglass mesh tape on a 50mm × 50m roll. 5×5mm aperture, 160g/m². Suited to narrow joint detailing.', features: ['Self-adhesive backing', 'Alkaline-resistant fibreglass — 5×5mm holes, 160g/m²', '50mm × 50m roll', 'Ideal for narrow joints and detail reinforcement'], specs: [{ label: 'Width', value: '50mm' }, { label: 'Length', value: '50m' }, { label: 'Aperture', value: '5×5mm' }, { label: 'Weight', value: '160 g/m²' }], application: 'Reinforcing narrow wall joints, sheet edges, and detail areas prior to render.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/green-fibreglass-adhesive-mesh-tape-amt-50', imagePath: '/images/products/be-green-fibreglass-adhesive-mesh-tape-amt-50.webp' },
  { id: 'be-green-fibreglass-adhesive-mesh-tape-amt-100', name: 'Green Fibreglass Adhesive Mesh Tape 100mm (AMT-100)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Self-adhesive alkaline-resistant green fibreglass mesh tape on a 100mm × 50m roll. 5×5mm aperture, 160g/m². Designed to reinforce wall joints while enhancing adhesion and impact strength.', features: ['Self-adhesive backing', 'Alkaline-resistant fibreglass — 5×5mm holes, 160g/m²', '100mm × 50m roll', 'Reinforces joints; improves render adhesion and impact strength'], specs: [{ label: 'Width', value: '100mm' }, { label: 'Length', value: '50m' }, { label: 'Aperture', value: '5×5mm' }, { label: 'Weight', value: '160 g/m²' }], application: 'Reinforcing wall joints and panel junctions prior to render.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/green-fibreglass-adhesive-mesh-tape-amt-100', imagePath: '/images/products/be-green-fibreglass-adhesive-mesh-tape-amt-100.webp' },
  { id: 'be-heavy-duty-highvisability-50m-amt-200', name: 'Green Fibreglass Adhesive Mesh Tape 200mm (AMT-200)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Self-adhesive alkaline-resistant green fibreglass mesh tape on a 200mm × 50m roll. 5×5mm aperture, 160g/m². Reinforces wall joints and improves render adhesion and impact strength.', features: ['Self-adhesive — sticks to wall before render coat', 'Alkaline-resistant fibreglass — 5×5mm holes, 160g/m²', '200mm × 50m roll', 'Reinforces wall joints; improves adhesion and impact strength'], specs: [{ label: 'Width', value: '200mm' }, { label: 'Length', value: '50m' }, { label: 'Aperture', value: '5×5mm' }, { label: 'Weight', value: '160 g/m²' }], application: 'Reinforcing wall joints, control joints, and panel junctions prior to render.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/heavy-duty-highvisability-50m-amt-200', imagePath: '/images/products/be-heavy-duty-highvisability-50m-amt-200.webp' },
  { id: 'be-green-fibreglass-mesh-rm-200', name: 'Green Fibreglass Render Mesh 200mm (RM-200)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Non-adhesive alkaline-resistant green fibreglass render mesh on a 200mm × 50m roll. 5×5mm aperture, 160g/m². Designed to be embedded into base coat render at wall joints.', features: ['Non-adhesive — embed into wet render', 'Alkaline-resistant fibreglass — 5×5mm holes, 160g/m²', '200mm × 50m roll', 'Reinforces wall joints and substrate transitions'], specs: [{ label: 'Width', value: '200mm' }, { label: 'Length', value: '50m' }, { label: 'Aperture', value: '5×5mm' }, { label: 'Weight', value: '160 g/m²' }], application: 'Embedded reinforcement of base coat render at wall joints and substrate transitions.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/green-fibreglass-mesh-rm-200', imagePath: '/images/products/be-green-fibreglass-mesh-rm-200.webp' },
  { id: 'be-green-fibreglass-mesh-rmg-1-2', name: 'Green Fibreglass Render Mesh 1.2m (RMG-1.2)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Full-width non-adhesive alkaline-resistant green fibreglass render mesh on a 1.2m × 50m roll. 5×5mm aperture, 160g/m². Identical reinforcement properties to the white mesh in the trade-standard green colourway.', features: ['Non-adhesive — embed into wet render', 'Alkaline-resistant fibreglass — 5×5mm holes, 160g/m²', '1.2m × 50m roll', 'Full-wall reinforcement for EWI/EIFS base coat'], specs: [{ label: 'Width', value: '1.2m' }, { label: 'Length', value: '50m' }, { label: 'Aperture', value: '5×5mm' }, { label: 'Weight', value: '160 g/m²' }], application: 'Embedded reinforcement of base coat render across full wall surfaces in EWI/EIFS systems.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/green-fibreglass-mesh-rmg-1-2', imagePath: '/images/products/be-green-fibreglass-mesh-rmg-1-2.webp' },
  { id: 'be-white-fibreglass-mesh-rmw-1-2', name: 'White Fibreglass Render Mesh 1.2m (RMW-1.2)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Full-width non-adhesive alkaline-resistant white fibreglass render mesh on a 1.2m × 50m roll. 5×5mm aperture, 160g/m². Reinforces base coat render across full wall surfaces.', features: ['Non-adhesive — embed into wet render', 'Alkaline-resistant fibreglass — 5×5mm holes, 160g/m²', '1.2m × 50m roll', 'Full-wall reinforcement for EWI/EIFS base coat'], specs: [{ label: 'Width', value: '1.2m' }, { label: 'Length', value: '50m' }, { label: 'Aperture', value: '5×5mm' }, { label: 'Weight', value: '160 g/m²' }], application: 'Embedded reinforcement of base coat render across full wall surfaces in EWI/EIFS systems.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/white-fibreglass-mesh-rmw-1-2', imagePath: '/images/products/be-white-fibreglass-mesh-rmw-1-2.webp' },
  { id: 'be-foam-panel-starter-trim-emgal', name: 'Galvanised Expanded Metal Mesh Light Gauge (EMGAL)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Light-gauge galvanised expanded metal mesh sheets, 0.7m × 2.4m. Fixed to walls during render application to reinforce sand–cement render beds and masonry substrates.', features: ['Light gauge galvanised steel mesh', '0.7m × 2.4m sheet', 'Reinforces sand–cement render beds and masonry walls'], specs: [{ label: 'Material', value: 'Galvanised steel' }, { label: 'Gauge', value: 'Light' }, { label: 'Sheet', value: '0.7 × 2.4m' }], application: 'Reinforcing sand–cement render beds and masonry walls during render application.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/foam-panel-starter-trim-emgal', imagePath: '/images/products/be-foam-panel-starter-trim-emgal.webp' },
  { id: 'be-galvanised-steel-slimline-plaster-board-emgal-hd', name: 'Galvanised Expanded Metal Mesh Heavy Gauge (EMGAL-HD)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Heavier-gauge galvanised expanded metal mesh sheets, 0.7m × 2.4m. Fixed to walls during render application to reinforce sand–cement render beds and masonry substrates.', features: ['Heavier gauge galvanised steel mesh', '0.7m × 2.4m sheet', 'Reinforces sand–cement render beds and masonry walls'], specs: [{ label: 'Material', value: 'Galvanised steel' }, { label: 'Gauge', value: 'Heavy' }, { label: 'Sheet', value: '0.7 × 2.4m' }], application: 'Heavy-duty reinforcement of sand–cement render beds and masonry walls.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/galvanised-steel-slimline-plaster-board-emgal-hd', imagePath: '/images/products/be-galvanised-steel-slimline-plaster-board-emgal-hd.webp' },
  { id: 'be-304-grade-stainless-steel-light-gauge-emss', name: '304 Stainless Steel Expanded Mesh Light Gauge (EMSS)', category: 'Mesh', brand: 'Builders Emporium', shortDescription: 'Light-gauge 304 grade stainless steel expanded mesh sheets, 0.7m × 2.4m. Fixed to walls during render application to reinforce sand–cement render beds and masonry substrates.', features: ['304 grade stainless steel — corrosion resistant', 'Light gauge expanded mesh', '0.7m × 2.4m sheet', 'Reinforces sand–cement render beds and masonry walls'], specs: [{ label: 'Grade', value: '304 stainless' }, { label: 'Sheet', value: '0.7 × 2.4m' }], application: 'Reinforcing sand–cement render beds and masonry walls during render application.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/304-grade-stainless-steel-light-gauge-emss', imagePath: '/images/products/be-304-grade-stainless-steel-light-gauge-emss.webp' },
  { id: 'be-galvanised-steel-slimline-plaster-board-nails-s-s', name: 'Marine-Grade Stainless Steel Nails (NAILS S/S)', category: 'Accessories', brand: 'Builders Emporium', shortDescription: '316 marine-grade stainless steel fixing nails — 3mm thick, 30mm long. Suited to coastal and high-humidity environments where corrosion resistance is critical.', features: ['316 marine-grade stainless steel', '30mm length, 3mm thickness', 'Suited to coastal and high-humidity sites'], specs: [{ label: 'Grade', value: '316 marine stainless' }, { label: 'Length', value: '30mm' }, { label: 'Thickness', value: '3mm' }], application: 'Fixing render trims, beads, and angles where corrosion resistance is required.', badges: ['CBS Stocked', 'Australian Owned'], externalLink: 'https://buildersemporium.com.au/products/galvanised-steel-slimline-plaster-board-nails-s-s', imagePath: '/images/products/be-galvanised-steel-slimline-plaster-board-nails-s-s.webp' },
]

// =============================================================================
// UNITEX – Base coat renders + textures and finishes
// Sourced from https://www.unitex.com.au/ — Base Coat Renders and Textures and
// Finishes ranges only (per client). Colour ranges are grouped into one entry per
// finish family with a `colours` swatch list.
// =============================================================================

const unitexProducts: Product[] = [
  {
    id: 'unitex-aero-render',
    name: 'Unitex Aero Render',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Cement-based, polymer-modified single-coat render for AAC panels, brickwork and blockwork. Medium grade with a long open time, applied from a skim coat up to 10mm and finished tight and smooth.',
    features: [
      'Single-coat application over AAC panels, brick and cement block',
      'Medium grade; skim coat to 10mm in one pass',
      'Long open time; closes over readily when floated',
      'Polymer-modified for strong adhesion to AAC and masonry',
      'Render machine pumpable; 20kg bags',
      'Overcoat with Unitex Applied Finishes textures once dry',
    ],
    specs: [
      { label: 'Size', value: '20kg bags' },
      { label: 'Coverage', value: '4-7m²' },
      { label: 'Suitable for', value: 'AAC Panels, New Bricks, Old Bricks, Cement Block' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Levelling and protective single-coat render over sound AAC panels and dry brick or concrete block walls, prior to a Unitex texture finish.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/aero-render/',
    imagePath: '/images/products/unitex-aero-render.webp',
  },
  {
    id: 'unitex-hilite-render',
    name: 'Unitex HiLite Render',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Lightweight high-build cement-based, polymer-modified render for uneven masonry surfaces. Trowel or spray applied from 6mm up to around 15mm per pass, with 30mm achievable in successive coats without adding excessive weight.',
    features: [
      'High build: 6mm to approx 15mm per pass, 30mm in successive coats',
      'Lightweight; does not add excessive weight to the structure',
      'Ideal for rough brickwork and filling rake joints',
      'Trowel or spray machine applied, one or two coats',
      'Minimum 24 hours curing between coats',
      '14kg bags; coverage 2-4m²',
    ],
    specs: [
      { label: 'Size', value: '14kg bags' },
      { label: 'Coverage', value: '2-4m²' },
      { label: 'Suitable for', value: 'New Bricks, Old Bricks, Cement Block' },
      { label: 'Apply with', value: 'Spray or Trowel' },
    ],
    application: 'High-build render for levelling uneven brick and block masonry inside and out where a skim coat is not suitable.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/hilite-render/',
    imagePath: '/images/products/unitex-hilite-render.webp',
  },
  {
    id: 'unitex-redi-render-non-combustible',
    name: 'Unitex Redi Render Non-Combustible',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Cement-based, polymer-modified masonry render certified non-combustible to AS 1530.1. Trowel or spray applied in one or two coats over brick and block inside and out, workable to around 4mm; a skim coat is enough where the surface is in good order.',
    features: [
      'Certified non-combustible to AS 1530.1',
      'One-coat or two-coat application; skim coat on sound surfaces',
      'Workable to approx 4mm; spray or trowel applied',
      'Water resistant, polymer-modified for strong adhesion',
      'Can be sponge-finished or overcoated with Unitex textures',
      'Coverage 3.5-4.5m² per 20kg bag',
    ],
    specs: [
      { label: 'Size', value: '20kg bags' },
      { label: 'Coverage', value: '3.5-4.5m²' },
      { label: 'Suitable for', value: 'New & / or Old Brick, Cement Block' },
      { label: 'Apply with', value: 'Spray or Trowel' },
    ],
    application: 'Protective render over brick and block masonry inside and out, before a Unitex roll, trowel or brush applied texture.',
    badges: ['CBS Stocked', 'Non-Combustible'],
    externalLink: 'https://www.unitex.com.au/product/redi-render-non-combustible/',
    imagePath: '/images/products/unitex-redi-render-non-combustible.webp',
  },
  {
    id: 'unitex-fast-r-render-non-combustible',
    name: 'Unitex Fast-R Render Non-Combustible',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Medium grade cement-based, polymer-modified render certified non-combustible to AS 1530.1. Applied as a single coat over AAC panels, brickwork and blockwork from a skim coat up to 10mm, thick or thin, and finished tight and smooth.',
    features: [
      'Certified non-combustible to AS 1530.1',
      'Single coat from skim coat to 10mm; no wait for a second coat',
      'Substrates: AAC panels, new and old brick, cement block',
      'Can be screeded, floated or sponged to a smooth surface',
      'Render machine pumpable; 16kg bags',
      'Overcoat with Unitex Applied Finishes textures',
    ],
    specs: [
      { label: 'Size', value: '16kg bags' },
      { label: 'Coverage', value: '2.5-3.5m²' },
      { label: 'Suitable for', value: 'AAC Panels, New Bricks, Old Bricks, Cement Block' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Levelling and protective single-coat render over sound, dry AAC panels and masonry walls before a Unitex texture finish.',
    badges: ['CBS Stocked', 'Non-Combustible'],
    externalLink: 'https://www.unitex.com.au/product/fast-r-render-non-combustible/',
    imagePath: '/images/products/unitex-fast-r-render-non-combustible.webp',
  },
  {
    id: 'unitex-beach-render-non-combustible',
    name: 'Unitex Beach Render Non-Combustible',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Fine to medium grade cement-based, polymer-modified render for sponge finishing over clean brick and blockwork. Certified non-combustible to AS 1530.1 and applied in two passes: a build coat then a final sponge finish.',
    features: [
      'Certified non-combustible to AS 1530.1',
      'Fine to medium grade for sponge finishing',
      'Two-pass application: build coat then sponge finish',
      'Workable to approx 10mm; trowel or machine spray applied',
      'Water resistant, polymer-modified for strong adhesion',
      'Coverage 2-4.5m² per 20kg bag',
    ],
    specs: [
      { label: 'Size', value: '20kg bags' },
      { label: 'Coverage', value: '2-4.5m²' },
      { label: 'Suitable for', value: 'New & / or Old Brick, Cement Block' },
      { label: 'Apply with', value: 'Trowel, Machine Spray, and Sponge' },
    ],
    application: 'Sponge-finished render over brick and block masonry inside and out, or as a base for Unitex roll, trowel or brush applied textures.',
    badges: ['CBS Stocked', 'Non-Combustible'],
    externalLink: 'https://www.unitex.com.au/product/beach-render-non-combustible/',
    imagePath: '/images/products/unitex-beach-render-non-combustible.webp',
  },
  {
    id: 'unitex-harbour-fine-non-combustible',
    name: 'Unitex Harbour Fine Non-Combustible',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Fine grade cement-based, polymer-modified render for sponge finishing over clean brick and blockwork, certified non-combustible to AS 1530.1. Generally used for skim coat work, applied in two passes: a build coat then a final sponge finish.',
    features: [
      'Certified non-combustible to AS 1530.1',
      'Fine grade render for sponge finishing',
      'Skim coat work in two passes: build coat then sponge finish',
      'Workable to approx 10mm; trowel or machine spray applied',
      'Water resistant, polymer-modified for strong adhesion',
      'Coverage 2-4.5m² per 20kg bag',
    ],
    specs: [
      { label: 'Size', value: '20kg bags' },
      { label: 'Coverage', value: '2-4.5m²' },
      { label: 'Suitable for', value: 'New & / or Old Brick, Cement Block' },
      { label: 'Apply with', value: 'Trowel, Machine Spray, and Sponge' },
    ],
    application: 'Skim or sponge-finished render over brick and block masonry inside and out, or overcoated with Unitex applied textures.',
    badges: ['CBS Stocked', 'Non-Combustible'],
    externalLink: 'https://www.unitex.com.au/product/harbour-fine-non-combustible/',
    imagePath: '/images/products/unitex-harbour-fine-non-combustible.webp',
  },
  {
    id: 'unitex-base-board-render-bbr-8-5',
    name: 'Unitex Base Board Render BBR 8.5',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Lightweight 8.5kg cement-based, polymer-modified build coat render formulated for the Unitex Base Board and IB Board systems. Trowel applied at a minimum 5mm in one or two coats, then overcoated with Unitex textures.',
    features: [
      'Build coat for Unitex Base Board and IB Board systems',
      'Lightweight 8.5kg bag; approx 1.5-2m² coverage',
      'Minimum 5mm thickness; workable to 5-10mm per pass',
      'One-coat or two-coat trowel application',
      'Polymer-modified, water resistant, strong adhesion',
      'Overcoat with Unitex roll, trowel or brush applied textures',
    ],
    specs: [
      { label: 'Size', value: '8.5kg bags' },
      { label: 'Coverage', value: '1.5-2m²' },
      { label: 'Suitable for', value: 'Uni-Base Board systems' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Trowel-applied build coat over pre-coated Unitex Uni-Base Board as part of the Uni-EIFS external insulating cladding system.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/base-board-render-bbr-8-5/',
    imagePath: '/images/products/unitex-base-board-render-bbr-8-5.webp',
  },
  {
    id: 'unitex-polymer-render-wet',
    name: 'Unitex Polymer Render Wet',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Trowel-applied acrylic filling and levelling compound in a 15L pail, the strongest adhering render in the Unitex range. Used as a primary key coat over difficult substrates and as a skim coat over FRC sheeting; mix in 5-10% cement before use.',
    features: [
      'Strongest adhering render in the Unitex range',
      'Key coat for painted brick, rough concrete and FC sheeting',
      'Add 5-10% cement by drill mixing just before use',
      'Up to 3mm internally, 5mm externally straight from the pail',
      'Patching, levelling, skim coating and restoration work',
      '15L pail covers approx 8-10m² as a key coat',
    ],
    specs: [
      { label: 'Size', value: '15L pail' },
      { label: 'Coverage', value: '8-10m²' },
      { label: 'Suitable for', value: 'Painted Brick, New & / or Old Brick, In-situ Concrete (Rough), Fibrous-Cement Sheeting' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Primary key coat and levelling skim coat over dry, non-porous or difficult surfaces such as FRC sheeting before a Unitex texture.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/polymer-render-wet/',
    imagePath: '/images/products/unitex-polymer-render-wet.webp',
  },
  {
    id: 'unitex-panel-patch-4hr-fire-rating',
    name: 'Unitex Panel Patch (4hr Fire Rating)',
    category: 'Render',
    brand: 'Unitex',
    shortDescription:
      'Fine to medium modified cement-based patching mortar for steel joining plate recesses in concrete tilt-up panels and damaged concrete. Trowel applied in one coat to around 30mm, with a four-hour fire rating when used to Unitex specifications.',
    features: [
      'Four-hour fire rating (tested to AS1530.4-2005)',
      'One-coat trowel application, applied around 30mm thick over joining plate recesses',
      'Strong adhesion to concrete and masonry; just add water',
      'Negligible shrinkage; 20MPa compressive strength at 28 days',
      '8kg bag covers approx ten 200mm x 200mm joining plate recesses',
      'Available in grey (standard) or off white',
    ],
    specs: [
      { label: 'Size', value: '8kg bags' },
      { label: 'Coverage', value: 'Approx 10 joining plate recesses' },
      { label: 'Suitable for', value: 'Precast Panel, Concrete repairs' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Patching joining plate recesses on precast tilt-up panels and repairing surface-damaged concrete, including fire rated walls.',
    badges: ['CBS Stocked', 'Fire Rated'],
    externalLink: 'https://www.unitex.com.au/product/panel-patch-4hr-fire-rating/',
    imagePath: '/images/products/unitex-panel-patch-4hr-fire-rating.webp',
  },
  {
    id: 'unitex-trowel-on-texture-104',
    name: 'Unitex Trowel On Texture 104',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Coarsest grade in the Unitex trowel-applied range, giving a 1-2mm marble scratch finish. An acrylic-bound, tintable texture applied as a single coat over Unitex Specialty Renders on interior and exterior walls.',
    features: [
      '1-2mm marble scratch coat finish, medium thickness',
      'Coarsest grade of the Uni-Trowel Decor range',
      'Single-coat trowel application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating; impact resistant once cured',
      'Pre-coloured in 15L pails; tintable to almost any colour',
      'Deep tone colours require a protective top coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '6-7.5m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Trowel applied as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls, as well as interior walls, for new construction and renovations.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/trowel-on-texture-104/',
    imagePath: '/images/products/unitex-trowel-on-texture-104.webp',
  },
  {
    id: 'unitex-trowel-on-texture-107',
    name: 'Unitex Trowel On Texture 107',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Fine scratch grade of the Unitex trowel-applied range with a 0.5-1mm marble scratch finish. An acrylic-bound, tintable texture applied as a single coat over Unitex Specialty Renders on interior and exterior walls.',
    features: [
      '0.5-1mm fine marble scratch coat finish, low thickness',
      'Single-coat trowel application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating that forms an impact-resistant surface able to withstand scuffing and hard knocks',
      'Pre-coloured in 15L pails; tintable to almost any colour',
      'Minimum 72 hours dry time at standard conditions',
      'Deep tone colours require a protective top coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '6-7.5m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Trowel applied as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls and interior walls.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/trowel-on-texture-107/',
    imagePath: '/images/products/unitex-trowel-on-texture-107.webp',
  },
  {
    id: 'unitex-trowel-on-texture-146',
    name: 'Unitex Trowel On Texture 146',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Finest grade in the Unitex trowel-applied range, giving a fine grain finish. An acrylic-bound, tintable texture for use over Unitex Specialty Renders; may need a second wet-on-wet coat depending on substrate and weather.',
    features: [
      'Fine grain finish, low thickness; finest grade in the range',
      'Trowel applied over Unitex Specialty Renders',
      'May require a second wet-on-wet coat depending on substrate and weather',
      'Acrylic-bound, water-based coating that forms an impact-resistant surface',
      'Pre-coloured in 15L pails; tintable to almost any colour',
      'Deep tone colours require a protective top coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '9-10m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Trowel applied over cured Unitex Specialty Renders on commercial and residential exterior walls and interior walls, with an additional wet-on-wet coat where substrate or weather conditions require it.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/trowel-on-texture-146/',
    imagePath: '/images/products/unitex-trowel-on-texture-146.webp',
  },
  {
    id: 'unitex-trowel-on-texture-333',
    name: 'Unitex Trowel On Texture 333',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Fine sand finish from the Unitex trowel-applied range. An acrylic-bound, tintable texture for use over Unitex Specialty Renders; as a finer grade it may need a second wet-on-wet coat depending on substrate and weather.',
    features: [
      'Fine sand finish, low thickness',
      'Trowel applied over Unitex Specialty Renders',
      'May require a second wet-on-wet coat depending on substrate and weather',
      'Acrylic-bound, water-based coating; impact resistant once cured',
      'Pre-coloured in 15L pails; tintable to almost any colour',
      'Deep tone colours require a protective top coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '9-10m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Trowel applied over cured Unitex Specialty Renders on commercial and residential exterior walls and interior walls, with an additional wet-on-wet coat where substrate or weather conditions require it.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/trowel-on-texture-333/',
    imagePath: '/images/products/unitex-trowel-on-texture-333.webp',
  },
  {
    id: 'unitex-trowel-on-texture-500',
    name: 'Unitex Trowel On Texture 500',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Fine to medium grain texture with a glossy finish from the Unitex trowel-applied range. An acrylic-bound, tintable coating applied as a single coat over Unitex Specialty Renders on interior and exterior walls.',
    features: [
      'Fine to medium grain glossy finish, low thickness',
      'Single-coat trowel application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating; impact resistant once cured',
      'Pre-coloured in 15L pails; tintable to almost any colour',
      'Minimum 72 hours dry time at standard conditions',
      'Deep tone colours require a protective coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '8-9m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Trowel applied as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls and interior walls.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/trowel-on-texture-500/',
    imagePath: '/images/products/unitex-trowel-on-texture-500.webp',
  },
  {
    id: 'unitex-trowel-on-texture-777',
    name: 'Unitex Trowel On Texture 777',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Medium marble grain finish from the Unitex trowel-applied range. An acrylic-bound, tintable texture applied as a single coat over Unitex Specialty Renders on interior and exterior walls.',
    features: [
      'Medium marble grain finish, medium thickness',
      'Single-coat trowel application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating; impact resistant once cured',
      'Pre-coloured in 15L pails; tintable to almost any colour',
      'Minimum 72 hours dry time at standard conditions',
      'Deep tone colours require a protective top coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '8-9m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Trowel applied as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls and interior walls.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/trowel-on-texture-777/',
    imagePath: '/images/products/unitex-trowel-on-texture-777.webp',
  },
  {
    id: 'unitex-trowel-on-texture-888',
    name: 'Unitex Trowel On Texture 888',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Medium marble grain finish from the Unitex trowel-applied range. An acrylic-bound, tintable texture applied as a single coat over Unitex Specialty Renders on interior and exterior walls.',
    features: [
      'Medium marble grain finish, medium thickness',
      'Single-coat trowel application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating; impact resistant once cured',
      'Pre-coloured in 15L pails; tintable to almost any colour',
      'Minimum 72 hours dry time at standard conditions',
      'Deep tone colours require a protective top coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '8-9m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Trowel' },
    ],
    application: 'Trowel applied as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls and interior walls.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/trowel-on-texture-888/',
    imagePath: '/images/products/unitex-trowel-on-texture-888.webp',
  },
  {
    id: 'unitex-roll-on-texture-109',
    name: 'Unitex Roll On Texture 109',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Fine-medium grade acrylic-bound roll-on texture for exterior walls, applied by spaghetti roller for a gentle peaked effect or sprayed for a smoother finish. One coat over Unitex Specialty Renders gives a heavy-duty, impact-resistant coating.',
    features: [
      'Fine-medium finish, low-medium thickness',
      'Roller applied for a gentle peaked effect; can also be spray applied',
      'One-coat application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating; impact resistant, resists scuffing',
      '15L pail; typical coverage 16-18m² per pail',
      'Deep tone colours require a protective top coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '16-18m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Medium or Fine Roller' },
    ],
    application: 'Applied by medium or fine roller (or spray on larger jobs) as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/roll-on-texture-109/',
    imagePath: '/images/products/unitex-roll-on-texture-109.webp',
  },
  {
    id: 'unitex-roll-on-texture-110',
    name: 'Unitex Roll On Texture 110',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'High-thickness, acrylic-bound roll-on texture for exterior walls, rolled on for a heavy peaked effect with the peaks smoothed by trowel. One coat over Unitex Specialty Renders gives a heavy-duty, impact-resistant coating.',
    features: [
      'Heavy peaked finish, high thickness',
      'Roller applied, with peaks smoothed by trowel; can also be spray applied',
      'One-coat application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating; impact resistant, resists scuffing',
      '15L pail; typical coverage 7-10m² per pail',
      'Deep tone colours require a protective top coat of Unitex PTC',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '7-10m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Roller. Peaks are smoothed with a trowel' },
    ],
    application: 'Applied by roller with the peaks trowelled smooth, as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/roll-on-texture-110/',
    imagePath: '/images/products/unitex-roll-on-texture-110.webp',
  },
  {
    id: 'unitex-bagging-finish-109',
    name: 'Unitex Bagging Finish 109',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Acrylic-bound texture applied by bagging mitten, texture brush or broom to give a rough cast bagged effect on exterior walls. Low-medium build, one-coat application over Unitex Specialty Renders, tintable or colour matched to almost any colour.',
    features: [
      'Rough cast bagged effect, low-medium thickness',
      'Applied by bagging mitten, texture brush or broom',
      'One-coat application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating for commercial and residential exteriors',
      '15L pail; coverage 16-18m²',
      'Tintable or colour matched to almost any colour',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '16-18m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Bagging Mitten, Texture Brush or Broom' },
    ],
    application: 'Applied by bagging mitten, texture brush or broom as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/unitex-bagging-finish-109/',
    imagePath: '/images/products/unitex-bagging-finish-109.webp',
  },
  {
    id: 'unitex-bagging-finish-110',
    name: 'Unitex Bagging Finish 110',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Acrylic-bound texture applied by bagging mitten, texture brush or broom to give a rough cast bagged effect on exterior walls. High build, one-coat application over Unitex Specialty Renders, tintable or colour matched to almost any colour.',
    features: [
      'Rough cast bagged effect, high thickness',
      'Applied by bagging mitten, texture brush or broom',
      'One-coat application over Unitex Specialty Renders',
      'Acrylic-bound, water-based coating for commercial and residential exteriors',
      '15L pail; coverage 7-10m²',
      'Tintable or colour matched to almost any colour',
    ],
    specs: [
      { label: 'Size', value: '15L' },
      { label: 'Coverage', value: '7-10m²' },
      { label: 'Suitable for', value: 'Unitex Specialty Renders' },
      { label: 'Apply with', value: 'Bagging Mitten, Texture Brush or Broom' },
    ],
    application: 'Applied by bagging mitten, texture brush or broom as a single coat over cured Unitex Specialty Renders on commercial and residential exterior walls.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/unitex-bagging-finish-110/',
    imagePath: '/images/products/unitex-bagging-finish-110.webp',
  },
  {
    id: 'unitex-uni-rock-polished-concrete-finish',
    name: 'Unitex Uni-Rock Polished Concrete Finish',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Cementitious skim-coat powder trowelled in thin layers over pre-sealed rendered walls to give a smooth, polished concrete-look feature finish inside or out. Can be beeswax overcoated internally for a glossy effect.',
    features: [
      'Available in 4 factory colours',
      'Smooth, fine concrete-look finish for interior and exterior walls',
      'Skim coat applied to a maximum of 1.5mm over pre-sealed render',
      'Steel trowel or sponge finished; beeswax overcoat for internal gloss',
      'Supplied as powder in 15L pails, mixed with approx. 4-5L water',
      'Covers approx. 15-18m² per pail at 1mm build; pot life about 3 hours',
    ],
    application: 'Trowel applied as a thin skim coat over rendered walls pre-sealed with Unitex Cembond Substrate Sealer or a skim of Unitex Polymer Render to create polished concrete-look feature walls internally and externally.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/polished-concrete-finish-uni-rock-dark-grey/',
    imagePath: '/images/products/unitex-polished-concrete-finish-uni-rock-dark-grey.webp',
    colours: [
      { name: 'Dark Grey', imagePath: '/images/products/unitex-polished-concrete-finish-uni-rock-dark-grey.webp' },
      { name: 'Grey', imagePath: '/images/products/unitex-polished-concrete-finish-uni-rock-grey.webp' },
      { name: 'Off White', imagePath: '/images/products/unitex-polished-concrete-finish-uni-rock-off-white.webp' },
      { name: 'White', imagePath: '/images/products/unitex-polished-concrete-finish-uni-rock-white.webp' },
    ],
  },
  {
    id: 'unitex-tanami-polished-concrete-finish',
    name: 'Unitex Tanami Polished Concrete Finish',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'A premium finish that gives the look of a polished plaster \'moving\' wall, inspired by the Tanami Desert. Flexible, needs only 2 to 3 coats, suits internal and external walls, and is for qualified applicators experienced in fine and polished finishes.',
    features: [
      'Polished plaster \'moving\' wall appearance',
      'Only 2 to 3 coats required',
      'Suitable for internal and external walls, including 3D effects',
      '10 litre pail covers 16m² per coat',
      'Available in a standard range of 14 colours inspired by the Tanami Desert',
      'Half, quarter or three-quarter strength available in any standard colour',
    ],
    application: 'Decorative polished finish for internal and external walls, applied by qualified applicators experienced in fine and polished finishes.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/tanami-polished-concrete-finish-classic-colours-bass-straight/',
    imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-bass-straight.webp',
    colours: [
      { name: 'Bass Straight', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-bass-straight.webp' },
      { name: 'Storm Cloud', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-storm-cloud.webp' },
      { name: 'Sunset', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-sunset.webp' },
      { name: 'Desert Plains', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-desert-plains.webp' },
      { name: 'Ocean', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-ocean.webp' },
      { name: 'Oasis', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-oasis.webp' },
      { name: 'Amaroo', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-neutrals-amaroo.webp' },
      { name: 'Sand Dune', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-neutrals-sand-dune.webp' },
      { name: 'Distant Mist', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-neutrals-distant-mist.webp' },
      { name: 'Winter Rain', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-neutrals-winter-rain.webp' },
      { name: 'Concrete', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-neutrals-concrete.webp' },
      { name: 'Rock Face', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-rock-face.webp' },
      { name: 'Thunder Storm', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-thunder-storm.webp' },
      { name: 'Night Sky', imagePath: '/images/products/unitex-tanami-polished-concrete-finish-classic-colours-night-sky.webp' },
    ],
  },
  {
    id: 'unitex-veneto-mineral-coloured-finish',
    name: 'Unitex Veneto Mineral Coloured Finish',
    category: 'Texture',
    brand: 'Unitex',
    shortDescription:
      'Pre-coloured cement-based exterior wall finish that weathers to a sandy, aged patina in warm earthy tones. Trowelled and sponge-floated over a sealed Unitex render, it needs no acrylic topcoat and suits new builds and renovations.',
    features: [
      'Available in 28 factory colours',
      'Pre-coloured with durable inorganic oxide pigments; no acrylic topcoat required',
      'Two-coat trowel application, sponge floated to a sandy finish',
      'Applied over dry Unitex render sealed with Cembond Substrate Sealer',
      '20kg pail mixes with 4-5L water to yield 15L; approx 10-15m² per pail at 1mm',
      'Apply between 8°C and 30°C; made to order, so order the whole project in one batch',
    ],
    application: 'Exterior finish trowelled in two coats over a dry, sealed Unitex render on new homes and renovations, finished with a soft sponge float.',
    badges: ['CBS Stocked'],
    externalLink: 'https://www.unitex.com.au/product/veneto-mineral-coloured-finish-light-grey/',
    imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-light-grey.webp',
    colours: [
      { name: 'Light Grey', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-light-grey.webp' },
      { name: 'Hog Bristle', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-hog-bristle.webp' },
      { name: 'Traditional Grey', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-traditional-grey.webp' },
      { name: 'Barnyard', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-barnyard.webp' },
      { name: 'Liberty Grey', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-liberty-grey.webp' },
      { name: 'Black Pitch', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-black-pitch.webp' },
      { name: 'Athol', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-athol.webp' },
      { name: 'Papyrus', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-papyrus.webp' },
      { name: 'White Swan', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-white-swan.webp' },
      { name: 'Beach', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-beach.webp' },
      { name: 'Uni-Haze', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-uni-haze.webp' },
      { name: 'Hog Bristle 1 & 1/2', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-hog-bristle-1-1-2.webp' },
      { name: 'White', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-white.webp' },
      { name: 'Grey Pebble 1/4', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-grey-pebble-1-4.webp' },
      { name: 'Peachy', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-peachy.webp' },
      { name: 'White Birch', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-white-birch.webp' },
      { name: 'Beige Royal', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-beige-royal.webp' },
      { name: 'Olive', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-olive.webp' },
      { name: 'Parchment', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-parchment.webp' },
      { name: 'Rhino', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-rhino.webp' },
      { name: 'Grey Clagg', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-grey-clagg.webp' },
      { name: 'Primero', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-primero.webp' },
      { name: 'Cotta', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-cotta.webp' },
      { name: 'Rust', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-rust.webp' },
      { name: 'Merriwee', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-merriwee.webp' },
      { name: 'Hilltop', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-hilltop.webp' },
      { name: 'Khaki', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-khaki.webp' },
      { name: 'Chocca', imagePath: '/images/products/unitex-veneto-mineral-coloured-finish-chocca.webp' },
    ],
  },
]

// =============================================================================
// MASTER PRODUCT LIST
// =============================================================================

export const products: Product[] = [
  ...foamProducts,
  ...renderProducts,
  ...textureProducts,
  ...mouldingsProducts,
  ...paintProducts,
  ...toolsProducts,
  ...accessoriesProducts,
  ...beProducts,
  ...unitexProducts,
]

// Helpers
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductsByBrand(brand: ProductBrand): Product[] {
  return products.filter((p) => p.brand === brand)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export const CATEGORIES: ProductCategory[] = [
  'Foam',
  'Render',
  'Texture',
  'Mouldings',
  'Paint',
  'Tiling',
  'Waterproofing',
  'Angles',
  'Mesh',
  'Tools',
  'Accessories',
]

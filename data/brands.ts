// =============================================================================
// CBS BRAND CATALOGUE
// =============================================================================
// Edit this file to add or update brand listings.
// These brands are featured on the Brands page and the brand strip.
// =============================================================================

export interface Brand {
  id: string
  name: string
  // Path relative to /public/images/brands/
  // TODO: Add actual brand logo files to /public/images/brands/
  logoPath: string
  shortBlurb: string
  // Key product types CBS carries from this brand
  productTypes: string[]
  // Link to brand's website
  websiteUrl: string
  // Is this an in-house / CBS-owned brand?
  inHouse?: boolean
  // Feature this brand prominently on the Brands page
  featured?: boolean
  // Accent color for brand card (optional)
  accentColor?: string
  // Logo artwork is white/light — render it on a dark tile so it stays visible
  logoOnDark?: boolean
}

export const brands: Brand[] = [
  {
    id: 'ace',
    name: 'ACE Polystyrene',
    logoPath: '/images/ace-logo-orange.webp',
    shortBlurb:
      'ACE Polystyrene has manufactured high-density graphite-infused EPS foam panels, foam mouldings, and architectural features at Condell Park, NSW since 2000. CBS supplies the full ACE range at factory-direct pricing, with custom sizing cut to order and short lead times on trade quantities.',
    productTypes: [
      'Graphite EPS Foam Panels (all thicknesses)',
      'Landscaping Foam Blocks',
      'Foam Window Surrounds & Mouldings',
      'Cornices, Columns & Pilasters',
      'Band Courses & Architraves',
      'Expanding PU Foam (Gap Filler)',
      'Render Mesh',
      'Panel Fixings & Washers',
    ],
    websiteUrl: 'https://www.acepolystyrene.com.au/',
    inHouse: false,
    featured: true,
    accentColor: '#C8491A',
  },
  {
    id: 'euromix',
    name: 'Euromix',
    logoPath: '/images/Euromix.webp',
    shortBlurb:
      'Euromix is an Australian-made and owned manufacturer of premium acrylic-modified cement renders, skim coats, and plasters. Based in Strathfield South NSW, Euromix renders are formulated with specially blended mineral fillers for superior crack resistance, flexibility, and workability. CBS distributes the full Euromix render system — from base coats to skim finishes.',
    productTypes: [
      'Euromix Render (Multi-Purpose Base)',
      'Euromix 1Render (Single-Coat System)',
      'Euromix FP Render (Full Polymer, EPS compatible)',
      'Euromix LWHB (Lightweight High Build)',
      'Euromix Cream Render',
      'Euromix Skim Coat',
      'Euromix NPS Keycoat',
      'Euralbi Plus White Set Plaster',
    ],
    websiteUrl: 'https://euromix.com.au/',
    inHouse: false,
    featured: true,
  },
  {
    id: 'novatex',
    name: 'Novatex',
    logoPath: '/images/FINALLOGONOVATEX.webp',
    shortBlurb:
      'Novatex Products has more than 70 years of history in the Australian building industry. Based in Wetherill Park NSW — just minutes from CBS Villawood — they manufacture adhesives, renders, texture coatings, and waterproofing systems. CBS distributes Novatex\'s key render products including the popular EZ101, ER100, and SPR Acrylic lines alongside their Ezytex texture range.',
    productTypes: [
      'EZ101 – Modified Cement Render (PFR Technology)',
      'ER100 – Fast Cure Render (PFR Technology)',
      'SPR Acrylic – Smooth Polymer Render',
      'Valencia – Acrylic Texture Coating',
      'Saturn – Acrylic Texture Coating',
      'Ezytex Base & Patch',
      'Ezytex Fine Skim',
      'Nova Mix Additive',
    ],
    websiteUrl: 'https://novatexproducts.com.au/',
    inHouse: false,
    featured: true,
    logoOnDark: true,
  },
  {
    id: 'melbacrylic',
    name: 'Melbacrylic',
    logoPath: '/images/Mac-Render.webp',
    shortBlurb:
      'Melbacrylic (MAC) is a specialist manufacturer of cement and acrylic architectural renders and coatings backed by a 7-year manufacturer\'s warranty. Their render selector system makes it easy to match the right product to any substrate. CBS distributes Melbacrylic\'s commercial render range including Macrender HBS (high bond for EPS), Macrender Coarse FR (fibre-reinforced for AAC), and the Supaskim finishing render.',
    productTypes: [
      'Macrender HBS (High Bond Strength, EPS specialist)',
      'Macrender Coarse FR (Fibre Reinforced, AAC specialist)',
      'Macrender (Standard General Purpose)',
      'Macrender Coarse',
      'Supaskim (Fine Finishing Render)',
      'Macbond Admixture',
      'Macprime / Pro-Prime Primers',
    ],
    websiteUrl: 'https://www.melbacrylic.com.au/',
    inHouse: false,
    featured: true,
  },
  {
    id: 'unitex',
    name: 'Unitex',
    logoPath: '/images/unitex-logo.svg',
    shortBlurb:
      'Unitex has manufactured specialty exterior wall materials in Australia since 1983 — lightweight base coat renders, applied texture finishes, masonry paints, and External Insulation Finishing Systems (EIFS) — Australian made and owned using local ingredients. CBS stocks the Unitex base coat render range and the Unitex textures and finishes collection: trowel-on and roll-on textures, bagging finishes, and the Uni-Rock, Tanami, and Veneto decorative finishes.',
    productTypes: [
      'Aero Render, HiLite Render & Polymer Render Wet (Base Coats)',
      'Redi Render, Fast-R, Beach & Harbour Fine (Non-Combustible)',
      'Base Board Render BBR 8.5 (Uni-Base Board systems)',
      'Panel Patch (4hr Fire Rating)',
      'Trowel On Textures (104 – 888 grades)',
      'Roll On Textures (109 / 110)',
      'Bagging Finishes (109 / 110)',
      'Uni-Rock Polished Concrete Finish',
      'Tanami Polished Concrete Finish (14 colours)',
      'Veneto Mineral Coloured Finish (28 colours)',
    ],
    websiteUrl: 'https://www.unitex.com.au/',
    inHouse: false,
    featured: true,
  },
  {
    id: 'builders-emporium',
    name: 'Builders Emporium',
    logoPath: '/images/builders-emporium-logo.svg',
    shortBlurb:
      'Builders Emporium is an Australian-owned supplier of render accessories established in 2008 — including render angles, beads, expansion joints, stop beads, fibreglass mesh, adhesive mesh tape, foam panel starter trims, expanded metal mesh, render spray guns, and rendering hoses. CBS stocks the Builders Emporium range to support every stage of an EWI/EIFS render system from base coat reinforcement through to corner detailing and finishing.',
    productTypes: [
      'Slimline Acrylic Render Angles (2mm–4mm builds)',
      'Sand & Cement Render Angles (BE40 / BE45 / BE50)',
      'Aluminium & Galvanised Steel Render Angles',
      'Foam Panel & Fibre Cement Starter Trims',
      'Stop Beads, L Beads & Expansion Joints',
      'Render Arch Beads (narrow & wide leg)',
      'Green & White Fibreglass Render Mesh',
      'Self-Adhesive Mesh Tape (AMT-50/100/200)',
      'Expanded Metal Mesh (Galvanised & Stainless)',
      'Render Spray Guns & Building Site Hoses',
      'Marine-Grade Stainless Steel Nails',
    ],
    websiteUrl: 'https://buildersemporium.com.au/',
    inHouse: false,
    featured: true,
    logoOnDark: true,
  },
  {
    id: 'trademark',
    name: 'TradeMark Wholesale',
    logoPath: '/images/trademark-wholesale-logo.webp',
    shortBlurb:
      'TradeMark Wholesale is the national sales agent for ACE Polystyrene products and a key distribution partner for CBS across New South Wales. Their network helps CBS service trade customers efficiently across greater Sydney and beyond.',
    productTypes: [
      'ACE Polystyrene products (national distribution)',
      'Building supplies distribution',
    ],
    websiteUrl: 'https://www.trademarkwholesale.com.au/',
    // Placeholder — confirm URL with client
    inHouse: false,
    featured: false,
  },
]

// Helpers
export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id)
}

export function getFeaturedBrands(): Brand[] {
  return brands.filter((b) => b.featured)
}

export function getInHouseBrands(): Brand[] {
  return brands.filter((b) => b.inHouse)
}

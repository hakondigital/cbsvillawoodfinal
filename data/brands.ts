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
  // Link to brand's website. Leave it out to hide the Brand Site button (client, 26 Nov 2026: none for Astec).
  websiteUrl?: string
  // Is this an in-house / CBS-owned brand?
  inHouse?: boolean
  // Feature this brand prominently on the Brands page
  featured?: boolean
  // Accent color for brand card (optional)
  accentColor?: string
  // Logo artwork is white/light — render it on a dark tile so it stays visible
  logoOnDark?: boolean
  // Override for the "View Products" button (e.g. a category filter instead of a brand filter)
  productsHref?: string
}

export const brands: Brand[] = [
  {
    id: 'ace',
    name: 'ACE Polystyrene',
    logoPath: '/images/ace-logo-orange.webp',
    shortBlurb:
      'ACE Polystyrene Products is a trusted Australian owned and operated manufacturer of high-quality expanded polystyrene (EPS) foam panels based in Arndell Park NSW. The Ace Polystyrene External Cladding System is CodeMark Certificated (BCA 2025 + BCA 2022 Amndt. 2). Offering lightweight, versatile and cost-effective solutions for residential, commercial and industrial applications, available in SL, M and H grades. Manufacturing standard sheets, blocks and custom-made shapes to your exact specifications, helping reduce material waste, installation time and labour costs.',
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
    id: 'ace-mouldings',
    name: 'ACE Mouldings',
    logoPath: '/images/ace-moulding-logo.webp',
    shortBlurb:
      'ACE Mouldings is the architectural foam range from ACE Polystyrene: window and door surrounds, band courses, sills, cornices, columns and pilasters, profiled from high-density EPS and ready to be rendered on site. CBS keeps the standard profiles in stock at Villawood and can have custom profiles cut to your drawings.',
    productTypes: [
      'Standard Profiles from 90×35mm to 330×210mm (17 sizes)',
      'Sill Mouldings SM 100×40 to 150×50',
      'Feature Mouldings FM 80×30 & 100×30',
      'Window & Door Surrounds',
      'Band Courses, Cornices & Pilasters',
      'Custom Profiles Cut to Order',
    ],
    websiteUrl: 'https://www.acepolystyrene.com.au/mouldings.html',
    inHouse: false,
    featured: true,
    accentColor: '#C8491A',
    productsHref: '/products?category=Mouldings',
  },
  {
    id: 'mac-render',
    name: 'MAC Render',
    logoPath: '/images/mac-render-logo.webp',
    shortBlurb:
      'For more than 30 years, MAC has specialised in advanced cement and acrylic rendering solutions designed to deliver outstanding performance, workability and finish quality. MAC\'s comprehensive range includes purpose-developed systems for EPS. With a range of renders, acrylic textured finishes, membranes, primers and concrete finishes, MAC will have your project covered.',
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
    id: 'novatex',
    name: 'Novatex',
    logoPath: '/images/FINALLOGONOVATEX.webp',
    shortBlurb:
      'NOVATEX delivers Australian-made rendering and coating solutions designed for quality, durability and performance. Its comprehensive range caters to a variety of rendering and surface finishing applications. We proudly stock NOVATEX products to help professionals achieve exceptional results on every project.',
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
    id: 'euromix',
    name: 'Euromix',
    logoPath: '/images/Euromix.webp',
    shortBlurb:
      'Euromix specialises in premium rendering and architectural coating solutions designed for the Australian building industry. Its extensive range includes polymer-modified cement renders, acrylic texture coatings, patching compounds, primers and decorative finishes. With purpose-developed systems for a wide variety of substrates, Euromix delivers versatility, durability and professional finish quality.',
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
    id: 'astec',
    name: 'Astec Wallmaster',
    logoPath: '/images/astec-wallmaster-logo.webp',
    shortBlurb:
      'Astec Paints has developed, tested and manufactured coatings in Australia since 1978 and remains 100% Australian owned. CBS stocks the Astec Wallmaster trade range — the Firewall fire-rated render system, Energy Star heat-reflective exterior coatings and the EC-2000 and EC-5000 membranes — alongside its other render systems.',
    productTypes: [
      'Energy Star Dirtguard IR Elastic PCM LS',
      'EC-5000 PCM Low Sheen',
      'EC-2000 Extreme Low Sheen',
      'Energy Star Exterior Low Sheen',
      'Firewall Render',
      'Firewall 1530 Render (Non-Combustible)',
      'Firewall Rota-Render (Non-Combustible)',
      'Firewall Skim',
      'Firewall Aggra-Prime',
    ],
    // No websiteUrl: the client asked for Astec's Brand Site button to be removed (26 Nov 2026).
    inHouse: false,
    featured: true,
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
  {
    id: 'iquip',
    name: 'iQuip',
    logoPath: '/images/iquip-logo.webp',
    shortBlurb:
      'iQuip Group is an Australian family-owned wholesaler of premium paint and render accessories, tools and equipment, supplying the trade nationwide under the motto "Committed to the Finish". CBS carries iQuip rendering and painting tools over the counter at Villawood; ask in store for the full range.',
    // TODO(client): confirm which iQuip lines CBS stocks; this is the render-relevant part of their catalogue.
    productTypes: [
      'Render Trowels, Floats & Rasps',
      'Straight Edges & Screeds',
      'Turbo Roller & PRO Polyester Roller Sleeves',
      'Paint Brushes, Roller Frames & Poles',
      'Masking Tape & Pre-Taped Masking Film',
      'Putty Knives, Scrapers & Caulking Guns',
      'Patching, Filling & Adhesives',
    ],
    websiteUrl: 'https://www.iquip.com.au/',
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

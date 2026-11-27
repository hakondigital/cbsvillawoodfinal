import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Map category names to their icon paths or emoji equivalents */
export const CATEGORY_META: Record<
  string,
  { label: string; description: string; icon: string; slug: string }
> = {
  Foam: {
    label: 'Foam',
    description:
      'Factory-direct ACE graphite EPS foam panels, landscaping blocks, and expanding foam.',
    icon: '▪',
    slug: 'foam',
  },
  Render: {
    label: 'Render',
    description:
      'Premium acrylic and cement-based renders from MAC Render, Novatex, Unitex, and Euromix. Base coats, finish renders, skim coats, and primers.',
    icon: '▪',
    slug: 'render',
  },
  Texture: {
    label: 'Texture',
    description:
      'Acrylic texture coatings and decorative finishes from MAC Render, Novatex, Unitex, and Euromix — trowel-on, roll-on, and polished concrete looks.',
    icon: '▪',
    slug: 'texture',
  },
  Mouldings: {
    label: 'Mouldings',
    description:
      'ACE foam architectural mouldings: window surrounds, cornices, columns, band courses, and architraves. Factory-direct with custom sizing available.',
    icon: '▪',
    slug: 'mouldings',
  },
  Paint: {
    label: 'Paint',
    description:
      'Exterior acrylic paints and primers suitable for rendered surfaces. Trade quantities and wide colour range available in-store.',
    icon: '▪',
    slug: 'paint',
  },
  Tiling: {
    label: 'Tiling',
    description: 'Novatex tile adhesives, grouts, screeds, and levelling compounds.',
    icon: '▪',
    slug: 'tiling',
  },
  Waterproofing: {
    label: 'Waterproofing',
    description: 'MAC Render and Novatex waterproofing membranes, sealants, and joint bands for wet areas and external walls.',
    icon: '▪',
    slug: 'waterproofing',
  },
  Angles: {
    label: 'Angles',
    description:
      'Builders Emporium render angles, arch beads, starter trims, stop beads, and expansion joints for acrylic and sand–cement render systems.',
    icon: '▪',
    slug: 'angles',
  },
  Mesh: {
    label: 'Mesh',
    description:
      'Alkali-resistant fibreglass render mesh, self-adhesive mesh tape, and expanded metal mesh for reinforcing base coat render.',
    icon: '▪',
    slug: 'mesh',
  },
  Tools: {
    label: 'Tools',
    description:
      'Professional rendering tools: trowels, floats, hawks, mixing paddles, corner beads, and scratchers. Everything a renderer needs on-site.',
    icon: '▪',
    slug: 'tools',
  },
  Accessories: {
    label: 'Accessories',
    description:
      'Panel fixings, washers, render spray guns, hoses, stainless nails, and accelerators. All the system accessories for a complete render installation.',
    icon: '▪',
    slug: 'accessories',
  },
}

/**
 * Map a full-size image path to its 200px thumbnail.
 * scripts/optimise-images.js writes a thumbnail for every image under public/images,
 * mirroring the directory structure inside public/images/thumbs.
 * Use this anywhere the rendered box is small (list rows, swatch grids) — the full
 * image is 30–280KB, the thumbnail is about 4KB.
 */
export function thumb(imagePath: string): string {
  return imagePath.startsWith('/images/') ? imagePath.replace('/images/', '/images/thumbs/') : imagePath
}

/**
 * Map a full-size image path to its 800px variant, for boxes a few hundred pixels wide
 * (category tiles, brand strips, showroom galleries). Only the photography in the
 * images root has one; anything else is returned unchanged.
 */
const HAS_MEDIUM = /^\/images\/[^/]+\.webp$/
export function medium(imagePath: string): string {
  return HAS_MEDIUM.test(imagePath) ? imagePath.replace('/images/', '/images/medium/') : imagePath
}

/**
 * CBS store details — update here if opening hours or contact changes.
 * PRIMARY_STORE is the branch this site belongs to; SECONDARY_STORE is the sister branch
 * shown as "also visit". To spin up another branch site (e.g. CBS ACT), add its entry
 * below and point PRIMARY_STORE / SECONDARY_STORE at the right stores.
 */
/** A CBS branch. Details the client has not supplied yet (e.g. ACT email and hours) are optional and simply not rendered. */
export type Store = {
  name: string
  suburb: string
  tagline: string
  address: string
  phone: string
  mobile?: string
  email?: string
  hours?: { weekdays: string; saturday: string; sunday: string }
  mapEmbedUrl: string
  googleMapsEmbed: string
}

// TODO(client): confirm the ACT phone (taken from the "Central Building Supplies ACT" Facebook page) and supply an email and trading hours.
const ACT: Store = {
  name: 'CBS ACT',
  suburb: 'ACT',
  tagline: 'Our Canberra branch in Mitchell, supplying renderers across the ACT and surrounding region.',
  address: '4/110 Lysaght St, Mitchell ACT 2911',
  phone: '0431 276 655',
  mapEmbedUrl: 'https://www.google.com/maps/search/4%2F110+Lysaght+St+Mitchell+ACT+2911',
  googleMapsEmbed: 'https://maps.google.com/maps?q=4%2F110+Lysaght+St,+Mitchell+ACT+2911&t=&z=15&ie=UTF8&iwloc=&output=embed',
}

export const CBS_STORE = {
  villawood: {
    name: 'CBS Villawood',
    suburb: 'Villawood',
    tagline: 'Our original store in Villawood, supplying Western Sydney’s renderers since the early 2000s.',
    address: '203 Woodville Rd, Villawood NSW 2163',
    phone: '(02) 9791 1188',
    // Office mobile, confirmed by the client 2026-11-13 (also on the Woodville Rd street sign).
    mobile: '0452 222 281',
    email: 'admin@centralbuildingsupplies.com.au',
    hours: {
      weekdays: '6:00 AM – 4:00 PM',
      saturday: '6:00 AM – 1:00 PM',
      sunday: 'Closed',
    },
    mapEmbedUrl:
      'https://www.google.com/maps/search/Central+Building+Supplies+Villawood',
    googleMapsEmbed:
      'https://maps.google.com/maps?q=Central+Building+Supplies+Villawood&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  prestons: {
    name: 'CBS Prestons',
    suburb: 'Prestons',
    tagline: 'Our newest location in Prestons is now open.',
    address: 'Unit 1/16 Bernera Rd, Prestons NSW 2170',
    phone: '(02) 8119 7711',
    mobile: '0422 99 66 44',
    email: 'Admin@cbsprestons.com.au',
    hours: {
      weekdays: '6:00 AM – 4:00 PM',
      saturday: '6:00 AM – 1:00 PM',
      sunday: 'Closed',
    },
    mapEmbedUrl:
      'https://www.google.com/maps/search/Central+Building+Supplies+Prestons',
    googleMapsEmbed:
      'https://maps.google.com/maps?q=Central+Building+Supplies+Prestons&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  act: ACT,
}

/** The branch this site is for. Header, CTAs, product drawer and footer all read from this. */
export const PRIMARY_STORE = CBS_STORE.villawood
/** The sister branch, cross-promoted in the store sections, contact page and footer. */
export const SECONDARY_STORE = CBS_STORE.prestons
/** All sister branches in display order (client, 24 Nov 2026: CBS ACT shown as the third store beside Prestons). */
export const SECONDARY_STORES: Store[] = [CBS_STORE.prestons, CBS_STORE.act]

/**
 * Photo of the primary store, used in the hero, about page and store sections.
 * The Villawood shop entrance, supplied by the client 2026-11-13. To change it, drop the new file in
 * public/images, run `node scripts/make-medium.js .` so medium() has an 800px copy, then change this one path.
 */
export const PRIMARY_STORE_PHOTO = '/images/villawood-storefront.webp'

/** Placeholder stats — update with real numbers from Joseph */
export const CBS_STATS = [
  { value: 20, suffix: '+', label: 'Years supplying renderers' },
  { value: 200, suffix: '+', label: 'Products stocked' },
  { value: 4, suffix: '', label: 'Leading render brands' },
  { value: 2, suffix: '', label: 'Sydney locations' },
]
// TODO: Replace CBS_STATS values with accurate numbers approved by client

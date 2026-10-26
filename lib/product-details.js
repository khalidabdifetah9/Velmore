import { collection } from "@/lib/collection";

export const tierMeta = {
  top: {
    title: "Top notes",
    short: "Top",
    time: "0 – 30 min",
    text: "The first impression: bright, volatile and gone within the hour.",
  },
  heart: {
    title: "Heart notes",
    short: "Heart",
    time: "30 min – 4 hrs",
    text: "The character of the scent, warming slowly as it meets your skin.",
  },
  base: {
    title: "Base notes",
    short: "Base",
    time: "4 hrs +",
    text: "The lasting trace that stays on skin and fabric for days.",
  },
};

const defaults = {
  kind: "Extrait de parfum",
  facts: [
    ["Concentration", "Extrait de parfum, 22%"],
    ["Longevity", "8 – 10 hours"],
    ["Sillage", "Moderate and intimate"],
    ["Made in", "Paris, in numbered batches"],
  ],
  howToWear:
    "Spray on clean pulse points (wrists, neck and behind the ears) from about 15 cm. Let it dry naturally and avoid rubbing, which dulls the top notes.",
  delivery:
    "Complimentary shipping on orders over $150. Dispatched from our Paris atelier within two working days. Unopened items can be returned within 30 days.",
};

const data = {
  "amber-veil": {
    family: "Amber · Vanilla · Musk",
    tagline: "A warm veil of amber that settles like candlelight.",
    description:
      "Resinous amber and Madagascan vanilla, softened by white musk. Quiet at first, then impossible to forget.",
    notes: {
      top: ["Bergamot", "Pink pepper"],
      heart: ["Labdanum", "Iris"],
      base: ["Amber", "Vanilla", "White musk"],
    },
    inspiration:
      "Composed from the memory of a one-room studio lit by a single lamp, where resin was warmed on a bench and the whole room slowly turned golden.",
    rating: 4.6,
    count: 128,
  },
  "iris-hour": {
    family: "Iris · Bergamot · Cedar",
    tagline: "Cold iris in the blue hour before dawn.",
    description:
      "Three year dried Tuscan iris root, sharpened with bergamot and grounded in dry cedar. Cool, powdery and exact.",
    notes: {
      top: ["Bergamot", "Pink pepper"],
      heart: ["Iris root", "Violet leaf"],
      base: ["Cedar", "White musk"],
    },
    inspiration:
      "Written around the minutes before sunrise, when the air is still cold and the whole house smells faintly of stone and powder.",
    rating: 4.3,
    count: 94,
  },
  "oud-solstice": {
    family: "Oud · Saffron · Rose",
    tagline: "Rare oud, lit from within by saffron.",
    description:
      "Seven year aged Assam oud, threaded with saffron and damask rose. Deep, resinous and unhurried.",
    notes: {
      top: ["Saffron", "Cardamom"],
      heart: ["Aged oud", "Damask rose"],
      base: ["Smoked amber", "Sandalwood"],
    },
    inspiration:
      "Our longest resting formula. Inspired by the longest night of the year, when the only light comes from a low fire and a bowl of warm resin.",
    rating: 4.8,
    count: 156,
  },
  "saffron-dusk": {
    family: "Saffron · Leather · Amber",
    tagline: "Saffron and leather at the end of a warm day.",
    description:
      "Hand picked saffron over soft suede leather and a trace of amber. Warm, dry and quietly confident.",
    notes: {
      top: ["Saffron", "Mandarin"],
      heart: ["Suede leather", "Cistus"],
      base: ["Amber", "Tonka bean"],
    },
    inspiration:
      "A coat worn all evening and left on a chair, still carrying the warmth of the day. This perfume is that last half hour of light.",
    rating: 4.4,
    count: 87,
  },
  "vetiver-ash": {
    family: "Vetiver · Smoke · Pepper",
    tagline: "Smoked vetiver, dry as cooled embers.",
    description:
      "Haitian vetiver roasted over ash wood with black pepper and a thread of incense. Dark, mineral and clean.",
    notes: {
      top: ["Black pepper", "Grapefruit zest"],
      heart: ["Smoked vetiver", "Incense"],
      base: ["Ash wood", "Patchouli"],
    },
    inspiration:
      "Inspired by a garden bonfire at the end of autumn, when the smoke has gone and only the cool, earthy smell of the ash remains.",
    rating: 4.2,
    count: 73,
  },
  "cedar-bloom": {
    family: "Cedar · Magnolia · Tonka",
    tagline: "Cedar and magnolia opening in morning light.",
    description:
      "Creamy magnolia over sun-warmed cedar and tonka. Fresh, woody and softly floral.",
    notes: {
      top: ["Green mandarin", "Magnolia bud"],
      heart: ["Magnolia", "Cedar leaf"],
      base: ["Cedarwood", "Tonka bean"],
    },
    inspiration:
      "Written for the first open window of spring, when the cold wood of the house meets the first flowers in the garden.",
    rating: 4.5,
    count: 112,
  },
  "discovery-set": {
    kind: "Discovery set",
    family: "Six signatures",
    sizes: [{ label: "6 × 2 ml", price: 45 }],
    tagline: "All six signatures, in vials small enough to carry.",
    description:
      "Six 2 ml vials, one for each Velmora signature, in a numbered box. The price is credited to your first full bottle.",
    notes: {
      top: ["Bergamot", "Saffron", "Black pepper"],
      heart: ["Iris", "Oud", "Magnolia"],
      base: ["Amber", "Vetiver", "Cedar"],
    },
    facts: [
      ["Contents", "6 × 2 ml vials"],
      ["Credit", "Applied to your first full bottle"],
      ["Packaging", "Numbered box"],
      ["Made in", "Paris"],
    ],
    howToWear:
      "Try one scent per day, on skin and not on paper. Give each one at least four hours before deciding.",
    inspiration:
      "Made for the slow decision. A scent reveals itself over hours, so the set lets you live with all six before choosing one.",
    rating: 4.7,
    count: 203,
  },
  "travel-atomizer": {
    kind: "Accessory",
    family: "Refillable atomizer",
    sizes: [{ label: "10 ml", price: 38 }],
    tagline: "Your signature scent, ready for the road.",
    description:
      "A refillable 10 ml atomizer in anodised aluminium, made to fit any Velmora 50 ml or 100 ml bottle.",
    notes: null,
    facts: [
      ["Capacity", "10 ml"],
      ["Material", "Anodised aluminium and glass"],
      ["Fits", "Any Velmora bottle"],
      ["Includes", "Refill funnel"],
    ],
    howToWear:
      "Fill from your bottle with the included funnel and keep it out of direct sunlight. Refills about 200 sprays.",
    inspiration:
      "A good perfume should travel with you. We built the atomizer to be lighter than a lipstick, and to close with a quiet, solid click.",
    rating: 4.1,
    count: 58,
  },
  "cedar-bloom-candle": {
    kind: "Scented candle",
    family: "Cedar · Magnolia · Tonka",
    sizes: [{ label: "220 g", price: 72 }],
    tagline: "The Cedar Bloom scent, poured into wax.",
    description:
      "A hand-poured coconut and soy candle that carries the Cedar Bloom accord into a room. Burns clean for about 45 hours.",
    notes: {
      top: ["Green mandarin"],
      heart: ["Magnolia", "Cedar leaf"],
      base: ["Cedarwood", "Tonka bean"],
    },
    facts: [
      ["Wax", "Coconut and soy"],
      ["Burn time", "About 45 hours"],
      ["Vessel", "Reusable hand-blown glass"],
      ["Wick", "Cotton"],
    ],
    howToWear:
      "Trim the wick to 5 mm before each burn and burn for up to three hours at a time, so the wax melts evenly to the edge.",
    inspiration:
      "For the rooms you return to every evening. The candle follows the same slow structure as the perfume, only it unfolds across a room.",
    rating: 4.4,
    count: 66,
  },
  "oud-solstice-oil": {
    kind: "Perfume oil",
    family: "Oud · Saffron · Rose",
    sizes: [{ label: "10 ml", price: 98 }],
    tagline: "Oud Solstice, concentrated into an oil.",
    description:
      "An alcohol free oil of aged oud, saffron and damask rose. It sits closer to the skin and lasts longer than the perfume.",
    notes: {
      top: ["Saffron"],
      heart: ["Damask rose"],
      base: ["Aged oud", "Smoked amber"],
    },
    facts: [
      ["Format", "Alcohol-free oil"],
      ["Longevity", "12 hours or more"],
      ["Applicator", "Glass roller"],
      ["Made in", "Paris"],
    ],
    howToWear:
      "Roll onto pulse points and leave it alone. A little goes a long way, and it layers beautifully under the perfume.",
    inspiration:
      "The same materials as Oud Solstice with the alcohol removed. Quieter, closer, and meant for the people who stand next to you.",
    rating: 4.6,
    count: 91,
  },
};

const sizesFor = (price) => [
  { label: "50 ml", price },
  { label: "100 ml", price: Math.round((price * 1.65) / 5) * 5 },
];

export function getDetails(slug) {
  const product = collection.find((p) => p.slug === slug);
  const d = data[slug] ?? {};
  return {
    ...defaults,
    sizes: sizesFor(product?.price ?? 0),
    notes: null,
    family: "",
    tagline: "",
    description: "",
    inspiration: "",
    rating: 4.5,
    count: 50,
    ...d,
  };
}

const pool = [
  { name: "Amara", rating: 5, date: "March 2026", text: "Still on my scarf three days later. {name} is never loud, always there." },
  { name: "Briana", rating: 4, date: "February 2026", text: "A beautiful opening that settles into something very personal on my skin. I would love it to last a little longer." },
  { name: "Elias", rating: 5, date: "January 2026", text: "Bought it for myself and now two friends have asked for it. Elegant bottle, even better scent." },
  { name: "Noor", rating: 4, date: "December 2025", text: "Quiet luxury. People notice it up close, which is exactly how I like to wear a scent." },
  { name: "Jonas", rating: 5, date: "November 2025", text: "Warm without being heavy. It works in an office and at dinner." },
  { name: "Skyler", rating: 4, date: "October 2025", text: "The dry-down is the best part. I am reordering when this one runs out." },
];

export function getReviews(slug) {
  const product = collection.find((p) => p.slug === slug);
  const start = Math.max(0, collection.findIndex((p) => p.slug === slug)) % pool.length;
  return [0, 1, 2].map((k) => {
    const r = pool[(start + k) % pool.length];
    return { ...r, text: r.text.replace("{name}", product?.name ?? "It") };
  });
}
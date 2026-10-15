/*
  Mock data. Nothing here is real.

  DEMO_AGENT stands in for the record the real site would fetch by DRE number
  from the agent's website profile (frs-offices agent.json, agentInfo).
  DEMO_LISTING is the marketing-design sample listing, used by "Fill with the
  sample listing" so a demo can get to a finished flyer in one click.
  Photos are AI-generated demo images from marketing-design.
*/

const DEMO_AGENT = {
  fullName: "Marcus Hale",
  jobTitle: "Realtor®",
  phone: "(805) 555-0147",
  email: "marcus@halehomesca.com",
  headshotUrl: "assets/demo/headshot.webp",
  headshotCutoutUrl: "assets/demo/headshot-cutout.webp",
  office: "CENTURY 21 Masters · Thousand Oaks",
  website: "halehomesca.com",
};

const DEMO_LISTING = {
  street: "1847 Larkspur Ridge Drive",
  city: "Thousand Oaks",
  state: "CA",
  zip: "91362",
  priceLabel: "Offered at",
  price: "$2,095,000",
  beds: "4",
  baths: "3",
  sqft: "3,240",
  garageSpaces: "2",
  headline: "Modern Living, Designed in Warm Wood and Light",
  description: "Built in 2025, this 4-bedroom, 3.5-bath contemporary pairs cedar plank and charcoal finishes with floor-to-ceiling glass for a home that feels open, bright, and grounded. A chef’s kitchen with a large island flows into the open living and dining space, while upstairs the primary suite opens onto a private balcony with a walk-in closet and spa-style bath. A guest suite, flexible loft or office, smart home system, solar-ready roof, and attached 2-car garage complete 3,240 sq ft of thoughtfully designed living.",
  hero: { url: "assets/demo/hero.webp", name: "hero.jpg" },
  gallery: [
    { url: "assets/demo/hero.webp", name: "exterior.jpg" },
    { url: "assets/demo/kitchen.webp", name: "kitchen.png" },
    { url: "assets/demo/living.webp", name: "living.png" },
    { url: "assets/demo/bedroom.webp", name: "bedroom.png" },
  ],
  // The sample's Saturday, kept relative so the demo never offers a past date.
  sessionDaysAhead: 9,
  sessionStart: "13:00",
  sessionEnd: "16:00",
};

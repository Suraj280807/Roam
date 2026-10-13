import belem from "@/assets/belem.jpg";
import jeronimos from "@/assets/jeronimos.jpg";
import alfama from "@/assets/alfama.jpg";
import castle from "@/assets/castle.jpg";
import lxfactory from "@/assets/lxfactory.jpg";
import miradouro from "@/assets/miradouro.jpg";
import pasteis from "@/assets/pasteis.jpg";

import sgu from "@/assets/sgu.jpg";
import ramling from "@/assets/ramling.jpg";
import cafeAmigos from "@/assets/cafe-amigos.png";
import teaToastCo from "@/assets/tea-toast-co.png";

export type Category = "Landmarks" | "History" | "Viewpoints" | "Food" | "Culture";
export const CATEGORIES: Category[] = ["Landmarks", "History", "Viewpoints", "Food", "Culture"];

export interface Place {
  id: string;
  name: string;
  area: string;
  category: Category;
  image: string;
  distanceKm: number;
  duration: string;
  rating: number;
  tagline: string;
  history: string;
  culture: string;
  facts: string[];
  hiddenGem?: boolean;
  featured?: boolean;
  map: { x: number; y: number };
  qa: Record<string, string>;
}

/**
 * Places for CURRENT LOCATION (Kolhapur / SGU region)
 */
export const CURRENT_PLACES: Place[] = [
  {
    id: "sgu",
    name: "Sanjay Ghodawat University",
    area: "Atigre, Kolhapur",
    category: "Landmarks",
    image: sgu,
    distanceKm: 0.8,
    duration: "1–2 hrs",
    rating: 4.9,
    tagline: "A world-class university campus nestled in scenic green landscapes.",
    history:
      "Founded by the visionary Sanjay Ghodawat Group, SGU has rapidly evolved into one of Maharashtra's premier educational institutions, pioneering modern research, engineering, and arts education.",
    culture:
      "A vibrant, thriving hub of student activity, cultural festivals, academic symposiums, and sports championships, set against lush green grounds and modern architectural faculties.",
    facts: [
      "Sprawls across an expansive eco-friendly campus with modern university faculties.",
      "Features state-of-the-art sports facilities, hostels, amphitheaters, and research labs.",
      "Known for vibrant annual tech fests, cultural concerts, and student gatherings."
    ],
    featured: true,
    map: { x: 45, y: 35 },
    qa: {
      "What is SGU best known for?":
        "Excellence in technology, management, modern student amenities, and high university placements.",
      "When is the best time to visit?":
        "Weekdays during daytime to witness the energetic campus atmosphere and central amenities.",
      "What can I see on campus?":
        "Explore the iconic central building, lush tree-lined walkways, sports grounds, and vibrant student cafeterias."
    }
  },
  {
    id: "ramling",
    name: "Ramling Temple",
    area: "Hatkanangle, Kolhapur",
    category: "History",
    image: ramling,
    distanceKm: 2.4,
    duration: "45 min – 1 hr",
    rating: 4.8,
    tagline: "Ancient cave temple dedicated to Lord Shiva with holy natural spring ponds.",
    history:
      "Steeped in epic heritage, local tradition recounts that Lord Rama consecrated and prayed to Lord Shiva here during his exile. The temple complex is renowned for its historic rock-cut sanctum and sacred water kunds.",
    culture:
      "A peaceful spiritual retreat nestled at the base of green hills. Devotees and travelers visit to meditate by the cool natural spring waters and seek sacred blessings.",
    facts: [
      "Features ancient stone kunds (tanks) filled with perennial, cool natural spring water.",
      "Surrounded by serene hill trails, offering tranquil panoramic viewpoints of the valley.",
      "Draws thousands of pilgrims and celebratory processions during Mahashivratri."
    ],
    featured: true,
    hiddenGem: true,
    map: { x: 65, y: 55 },
    qa: {
      "What is the story of Ramling?":
        "Believed to have been visited by Lord Rama in Treta Yuga, who carved and worshipped a Shiva lingam beside the natural stream.",
      "When should I visit?":
        "Mornings and late afternoons offer cool breezes, chanting echoes, and serene reflections in the temple water.",
      "What should I explore?":
        "The inner rock shrine, the holy temple kunds, and the peaceful hillside stone walkways."
    }
  },
  {
    id: "cafe-amigos",
    name: "Café Amigo's",
    area: "Near SGU Campus, Kolhapur",
    category: "Food",
    image: cafeAmigos,
    distanceKm: 1.2,
    duration: "30–45 min",
    rating: 4.7,
    tagline: "Lively outdoor hangout for loaded burgers, iced coffees & chill vibes.",
    history:
      "Started as a welcoming hangout spot for university students, locals, and road travelers looking for delicious fast food and cozy evening conversations.",
    culture:
      "Warm ambient lighting under a white canopy tent, comfortable open-air seating, and upbeat music that makes it a favorite evening destination for friends.",
    facts: [
      "Famous for handcrafted cheesy burgers, peri-peri loaded fries, and signature shakes.",
      "Popular evening hangout hub for SGU students after classes and study sessions.",
      "Features outdoor covered patio seating with great nightlife vibes."
    ],
    featured: false,
    map: { x: 38, y: 42 },
    qa: {
      "What are the top picks on the menu?":
        "Their Amigo's special burger, spicy cheese fries, hazelnut cold coffee, and paneer wraps.",
      "What is the vibe like?":
        "Casual, youthful, and lively with outdoor canopy seating that glows nicely in the evening."
    }
  },
  {
    id: "tea-toast-co",
    name: "The Tea Toast Co.",
    area: "Campus Promenade, Kolhapur",
    category: "Food",
    image: teaToastCo,
    distanceKm: 1.5,
    duration: "20–35 min",
    rating: 4.8,
    tagline: "Artisanal crunchy toasts, kulhad tea, and cozy café comforting bites.",
    history:
      "Created to elevate classic Indian street tea culture with gourmet toasties and modern café hospitality in a sleek glass pavilion.",
    culture:
      "A sunny, modern glasshouse café with outdoor bistro tables, artistic wall murals, and the comforting fragrance of steaming cardamom chai.",
    facts: [
      "Famous for piping hot masala tea served in traditional clay kulhads.",
      "Serves an extensive menu of savory melt-in-the-mouth toasts, from cheese chilli to garlic herb.",
      "Spacious glass pavilion design with breezy patio seating."
    ],
    featured: true,
    map: { x: 50, y: 40 },
    qa: {
      "What are the must-try items?":
        "Order the Signature Kulhad Chai, Cheese Chilli Toast, and fresh potato wedges.",
      "Is it good for quick catch-ups?":
        "Perfect for quick study chats, breakfast toasties, or a relaxing evening tea break."
    }
  }
];

/**
 * Places for DEMO LOCATION (Lisbon)
 */
export const DEMO_PLACES: Place[] = [
  {
    id: "belem-tower",
    name: "Belém Tower",
    area: "Belém",
    category: "Landmarks",
    image: belem,
    distanceKm: 6.2,
    duration: "1–1.5 hrs",
    rating: 4.7,
    tagline: "A limestone sentinel guarding the Tagus since 1519.",
    history:
      "Built between 1514 and 1519 under King Manuel I, the tower defended the mouth of the Tagus and served as the ceremonial gateway to Lisbon for explorers departing on the great voyages of discovery.",
    culture:
      "A masterpiece of Manueline architecture, it blends Gothic, Moorish and maritime motifs — ropes, armillary spheres and the Cross of the Order of Christ are carved in stone. It is a UNESCO World Heritage Site.",
    facts: [
      "Look for the stone rhinoceros — one of Europe's first depictions of the animal.",
      "It originally stood on a small island; the river shifted after the 1755 earthquake.",
      "The tower later served as a prison and customs house.",
    ],
    featured: true,
    map: { x: 12, y: 72 },
    qa: {
      "Why was it built?":
        "Belém Tower was commissioned by King Manuel I to defend Lisbon's harbour. Its cannons covered the river entrance, and it doubled as a symbolic farewell point for ships bound for Africa, India and Brazil.",
      "Best time to visit?":
        "Arrive at opening (around 9:30–10:00) to avoid queues, or come at sunset to photograph the tower glowing gold over the water. It is typically closed on Mondays.",
      "What should I look for?":
        "Find the carved rhinoceros beneath the western watchtower, the twisted stone ropes along the façade, and the Virgin of Safe Homecoming statue facing the river.",
    },
  },
  {
    id: "jeronimos",
    name: "Jerónimos Monastery",
    area: "Belém",
    category: "History",
    image: jeronimos,
    distanceKm: 5.7,
    duration: "1.5–2 hrs",
    rating: 4.8,
    tagline: "Cloisters carved from limestone, funded by the spice trade.",
    history:
      "Founded in 1501 to celebrate Vasco da Gama's return from India, the monastery took a century to complete, funded by a 5% tax on eastern spices like pepper, cinnamon and cloves.",
    culture:
      "The cloisters are widely considered Portugal's crowning architectural achievement. Vasco da Gama and the poet Luís de Camões lie buried here in carved stone tombs.",
    facts: [
      "Surviving the 1755 earthquake with almost no damage, the monks credited its divine construction.",
      "The south portal features over 40 intricate statues carved by master João de Castilho.",
      "It housed the Order of Saint Jerome until 1833.",
    ],
    featured: true,
    map: { x: 16, y: 68 },
    qa: {
      "Who is buried here?":
        "Explorer Vasco da Gama, poet Luís de Camões, and writer Fernando Pessoa (in the cloister). Several Portuguese monarchs also rest in the chancel.",
      "How do I avoid queues?":
        "Buy tickets online in advance and visit early morning. The church (Santa Maria de Belém) is free to enter, but cloisters require a ticket.",
      "What makes the architecture special?":
        "The delicate Manueline vaulted ceilings seem to float with no visible central supports — an engineering marvel of the 16th century.",
    },
  },
  {
    id: "alfama",
    name: "Alfama Old Quarter",
    area: "Alfama",
    category: "Culture",
    image: alfama,
    distanceKm: 0.9,
    duration: "2–3 hrs",
    rating: 4.6,
    tagline: "A labyrinth of alleys, laundry lines and evening fado.",
    history:
      "Lisbon's oldest neighbourhood, Alfama derives its name from the Arabic 'al-hamma' (hot springs). Its narrow, winding medieval layout survived the 1755 earthquake almost intact.",
    culture:
      "The spiritual cradle of fado — Portugal's melancholic folk music. In the evenings, tavern doors open and heartfelt voices carry down cobblestone lanes.",
    facts: [
      "Tram 28 rattles straight through Alfama's tightest curves.",
      "During June's Santo António festival, the streets fill with grilled sardines, paper garlands and dancing.",
      "Many alleys are so steep they are built as stone staircases (becos and escadinhas).",
    ],
    featured: true,
    map: { x: 62, y: 44 },
    qa: {
      "Where can I hear real fado?":
        "Avoid tourist-trap dinner shows on main streets. Seek small tascas like Mesa de Frades or A Baiuca where locals sing spontaneously ('fado vadio').",
      "Is it easy to get lost?":
        "Yes, and that's the point! Keep heading uphill to find the castle or downhill to hit the river.",
      "Best time to wander?":
        "Late afternoon as the light softens on pastel walls, staying into the evening for dinner and music.",
    },
  },
  {
    id: "castelo",
    name: "São Jorge Castle",
    area: "Castelo",
    category: "History",
    image: castle,
    distanceKm: 0.7,
    duration: "1.5–2 hrs",
    rating: 4.5,
    tagline: "Hilltop battlements watching over Lisbon for a thousand years.",
    history:
      "First fortified by the Romans, Visigoths and later the Moors in the 10th century, the citadel fell to King Afonso Henriques during the 1147 Siege of Lisbon with help from passing Crusaders.",
    culture:
      "The castle walls offer one of the city's finest 360-degree panoramas. Peacocks roam freely among olive trees in the tranquil inner courtyards.",
    facts: [
      "Eleven towers remain along the perimeter wall.",
      "The Tower of Ulysses houses a camera obscura providing live optical views of Lisbon.",
      "Archaeologists have uncovered traces of 7th-century BC Iron Age settlements on this hill.",
    ],
    map: { x: 54, y: 38 },
    qa: {
      "Is the view worth the climb?":
        "Absolutely — from the ramparts you can see the Tagus estuary, the bridge, downtown Baixa and across to the Monsanto forest park.",
      "Is it crowded?":
        "Lines peak midday. Arrive right at opening (9:00) or 2 hours before closing to enjoy golden hour without tour groups.",
      "Are there peacocks?":
        "Yes, dozens of wild peacocks live in the gardens and often perch dramatically on the stone battlements.",
    },
  },
  {
    id: "lx-factory",
    name: "LX Factory",
    area: "Alcântara",
    category: "Culture",
    image: lxfactory,
    distanceKm: 3.8,
    duration: "1.5–2.5 hrs",
    rating: 4.6,
    tagline: "A 19th-century textile mill reborn as an arts & dining village.",
    history:
      "Founded in 1846 as the Companhia de Fiação e Tecidos Lisbonense, this 23,000-square-metre industrial site was abandoned for decades before creatives transformed it in 2008.",
    culture:
      "A creative hub filled with design studios, mural art, independent bookshops, vintage boutiques, rooftop cocktail bars and open-air food courts beneath the 25 de Abril Bridge.",
    facts: [
      "Ler Devagar is celebrated as one of the world's most beautiful bookstores, with a flying bicycle sculpture suspended from the ceiling.",
      "Street artists from around the world have painted massive murals across the brick facades.",
      "Every Sunday it hosts a lively open-air vintage and design flea market.",
    ],
    hiddenGem: true,
    map: { x: 32, y: 66 },
    qa: {
      "When is it busiest?":
        "Weekend afternoons and Sunday market days. Visit on a weekday morning for a calmer stroll.",
      "Best place to eat?":
        "Browse the courtyard eateries — from Portuguese petiscos to specialty coffee. Rooftop bars offer bridge views at sunset.",
      "What makes it unique?":
        "It preserves the raw industrial architecture of the mill while layering contemporary art, design and independent shops on top.",
    },
  },
  {
    id: "senhora-monte",
    name: "Miradouro da Senhora do Monte",
    area: "Graça",
    category: "Viewpoints",
    image: miradouro,
    distanceKm: 1.6,
    duration: "30–45 min",
    rating: 4.8,
    tagline: "The highest viewpoint in Lisbon, beloved at dusk.",
    history:
      "A small chapel dedicated to Our Lady of the Hill was founded here in 1147, the same year Lisbon was taken from the Moors.",
    culture:
      "Locals gather here with friends and guitars as the sun sets. Expectant mothers traditionally visit the chapel to sit in São Gens' stone chair for a blessed birth.",
    facts: [
      "It offers a panoramic view from the castle to the river.",
      "It's less crowded than the nearby Miradouro da Graça.",
      "The pine tree here is one of the city's most photographed.",
    ],
    hiddenGem: true,
    map: { x: 58, y: 26 },
    qa: {
      "When should I go?":
        "Arrive about 30 minutes before sunset to find a spot on the wall. Bring a light jacket — it gets breezy at the top.",
      "How hard is the climb?":
        "It's steep. Tram 28 stops nearby at Graça, leaving only a short uphill walk.",
      "What can I see?":
        "São Jorge Castle, the Tagus, the 25 de Abril bridge, the Baixa grid and, on clear days, the Cristo Rei statue across the river.",
    },
  },
  {
    id: "pasteis-belem",
    name: "Pastéis de Belém",
    area: "Belém",
    category: "Food",
    image: pasteis,
    distanceKm: 6.0,
    duration: "30–45 min",
    rating: 4.7,
    tagline: "Custard tarts from a secret recipe guarded since 1837.",
    history:
      "After the 1834 dissolution of religious orders, monks from Jerónimos sold their pastry recipe to a local sugar refinery, which opened this bakery in 1837.",
    culture:
      "The recipe is still known only to a handful of master bakers who work in a locked 'secret room'. Locals dust tarts with cinnamon and powdered sugar.",
    facts: [
      "The bakery sells up to 20,000 tarts a day.",
      "Only here are they called 'pastéis de Belém' — elsewhere they're 'pastéis de nata'.",
      "The tiled inner rooms seat hundreds of guests.",
    ],
    hiddenGem: true,
    map: { x: 22, y: 76 },
    qa: {
      "How do I skip the queue?":
        "The takeaway line moves fast, but walk inside to the seated rooms — there's often no wait to sit and order at the table.",
      "How should I eat them?":
        "Warm, with a sprinkle of cinnamon and powdered sugar, alongside a bica (Lisbon's espresso).",
      "Why are they famous?":
        "Their flaky, caramelised crust and silky custard come from a recipe unchanged since 1837 — a direct link to the monks of Jerónimos.",
    },
  },
];

export const ALL_PLACES: Place[] = [...CURRENT_PLACES, ...DEMO_PLACES];

/**
 * Returns places for the given location mode:
 * - "device" / current location: CURRENT_PLACES (SGU, Ramling, Café Amigo's, The Tea Toast Co.)
 * - "demo": DEMO_PLACES (Lisbon)
 */
export function getPlacesForLocation(mode: "demo" | "device" | "unset"): Place[] {
  if (mode === "demo") {
    return DEMO_PLACES;
  }
  // Default to CURRENT_PLACES for current location / device mode
  return CURRENT_PLACES;
}

// Global lookup and defaults
export const PLACES = ALL_PLACES;
export const getPlace = (id: string) => ALL_PLACES.find((p) => p.id === id);

export const GENERIC_QUESTIONS = ["Tell me a story", "Fun fact?", "Nearby food?"];

export function demoAnswer(place: Place, question: string): string {
  const exact = place.qa[question];
  if (exact) return exact;
  const q = question.toLowerCase();
  if (q.includes("story") || q.includes("history") || q.includes("old"))
    return place.history;
  if (q.includes("fact") || q.includes("interesting"))
    return place.facts[Math.floor(Math.random() * place.facts.length)];
  if (q.includes("food") || q.includes("eat"))
    return `Near ${place.name}, check out Café Amigo's and The Tea Toast Co. for delicious burgers, teas, and snacks.`;
  if (q.includes("culture") || q.includes("meaning") || q.includes("signific"))
    return place.culture;
  if (q.includes("time") || q.includes("long") || q.includes("duration"))
    return `Plan about ${place.duration} at ${place.name}.`;
  return `Here's what I know about ${place.name}: ${place.tagline} ${place.culture}`;
}

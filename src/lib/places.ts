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

export type Category = "Landmarks" | "History" | "Viewpoints" | "Food" | "Culture" | "Cafes" | "Restaurants" | "Hotels";
export const CATEGORIES: Category[] = ["Landmarks", "History", "Viewpoints", "Food", "Culture", "Cafes", "Restaurants", "Hotels"];

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
  coords?: { lat: number; lng: number } | undefined;
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
      "Known for vibrant annual tech fests, cultural concerts, and student gatherings.",
    ],
    featured: true,
    map: { x: 45, y: 35 },
    coords: { lat: 16.746, lng: 74.3725 },
    qa: {
      "What is SGU best known for?":
        "Excellence in technology, management, modern student amenities, and high university placements.",
      "When is the best time to visit?":
        "Weekdays during daytime to witness the energetic campus atmosphere and central amenities.",
      "What can I see on campus?":
        "Explore the iconic central building, lush tree-lined walkways, sports grounds, and vibrant student cafeterias.",
    },
  },
  {
    id: "ramling",
    name: "Ramling Temple",
    area: "Hatkanangle, Kolhapur",
    category: "History",
    image: ramling,
    distanceKm: 5.4,
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
      "Draws thousands of pilgrims and celebratory processions during Mahashivratri.",
    ],
    featured: true,
    hiddenGem: true,
    map: { x: 65, y: 55 },
    coords: { lat: 16.758, lng: 74.408 },
    qa: {
      "What is the story of Ramling?":
        "Believed to have been visited by Lord Rama in Treta Yuga, who carved and worshipped a Shiva lingam beside the natural stream.",
      "When should I visit?":
        "Mornings and late afternoons offer cool breezes, chanting echoes, and serene reflections in the temple water.",
      "What should I explore?":
        "The inner rock shrine, the holy temple kunds, and the peaceful hillside stone walkways.",
    },
  },
  {
    id: "cafe-amigos",
    name: "Café Amigo's",
    area: "Near SGU Campus, Kolhapur",
    category: "Cafes",
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
      "Features outdoor covered patio seating with great nightlife vibes.",
    ],
    featured: false,
    map: { x: 38, y: 42 },
    coords: { lat: 16.7445, lng: 74.37 },
    qa: {
      "What are the top picks on the menu?":
        "Their Amigo's special burger, spicy cheese fries, hazelnut cold coffee, and paneer wraps.",
      "What is the vibe like?":
        "Casual, youthful, and lively with outdoor canopy seating that glows nicely in the evening.",
    },
  },
  {
    id: "tea-toast-co",
    name: "The Tea Toast Co.",
    area: "Campus Promenade, Kolhapur",
    category: "Cafes",
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
      "Spacious glass pavilion design with breezy patio seating.",
    ],
    featured: true,
    map: { x: 50, y: 40 },
    coords: { lat: 16.7455, lng: 74.3715 },
    qa: {
      "What are the must-try items?":
        "Order the Signature Kulhad Chai, Cheese Chilli Toast, and fresh potato wedges.",
      "Is it good for quick catch-ups?":
        "Perfect for quick study chats, breakfast toasties, or a relaxing evening tea break.",
    },
  },
  {
    id: "hotel-dehati",
    name: "Hotel Dehati Kolhapuri Thali",
    area: "C.S.T. Road, Kolhapur",
    category: "Restaurants",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    distanceKm: 4.8,
    duration: "1 hr",
    rating: 4.9,
    tagline: "Legendary authentic Kolhapuri dining with iconic Tambda & Pandhra Rassa.",
    history:
      "Dehati is an institution in Kolhapur, preserving traditional Maratha spices, slow-cooked curries, and time-honored thali culinary secrets passed down through generations.",
    culture:
      "A bustling, heartwarming celebration of Kolhapur's rich culinary pride where steaming bowls of red and white broths accompany fragrant mutton and bhakri.",
    facts: [
      "Famous for its fiery Tambda Rassa (red curry) and comforting Pandhra Rassa (white coconut broth).",
      "Regularly featured in national travel documentaries and culinary guides.",
      "Served on traditional brass thalis with fresh jowar and bajra bhakris.",
    ],
    featured: true,
    map: { x: 52, y: 58 },
    coords: { lat: 16.705, lng: 74.243 },
    qa: {
      "What should I order?":
        "The Special Kolhapuri Mutton Thali served with unlimited Tambda and Pandhra Rassa is the signature experience.",
      "Is it very spicy?":
        "The heat is aromatic and rich rather than overwhelming; the Pandhra Rassa provides soothing balance.",
    },
  },
  {
    id: "sayaji-hotel",
    name: "Sayaji Hotel Kolhapur",
    area: "Old Pune-Bangalore Hwy, Kolhapur",
    category: "Hotels",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    distanceKm: 5.2,
    duration: "Overnight",
    rating: 4.8,
    tagline: "5-star luxury hospitality, rooftop dining and lavish suites overlooking Kolhapur.",
    history:
      "Sayaji stands as the hallmark of premier luxury lodging in Southern Maharashtra, blending contemporary business comforts with heartfelt regional hospitality.",
    culture:
      "A stylish retreat for international travelers and weekend explorers featuring rooftop cocktail lounges, spa sanctuaries, and celebrated barbecue buffets.",
    facts: [
      "Boasts panoramic city viewpoints from its acclaimed rooftop restaurant.",
      "Features lavish deluxe suites, swimming pool, and modern fitness wellness facilities.",
      "Conveniently situated right along the main travel corridor connecting Pune and Goa.",
    ],
    featured: false,
    map: { x: 48, y: 62 },
    coords: { lat: 16.711, lng: 74.258 },
    qa: {
      "What amenities are available?":
        "Rooftop infinity views, multiple dining restaurants, swimming pool, high-speed WiFi, and 24/7 concierge.",
      "How close is it to central Kolhapur?":
        "Just a short 10-minute drive to Mahalaxmi Temple and Rankala Lake.",
    },
  },
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
    coords: { lat: 38.6916, lng: -9.216 },
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
    coords: { lat: 38.6979, lng: -9.2067 },
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
    coords: { lat: 38.7118, lng: -9.1302 },
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
    coords: { lat: 38.7139, lng: -9.1335 },
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
    coords: { lat: 38.7037, lng: -9.1788 },
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
    coords: { lat: 38.7198, lng: -9.1317 },
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
    category: "Cafes",
    image: pasteis,
    distanceKm: 6.0,
    duration: "30–45 min",
    rating: 4.8,
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
    coords: { lat: 38.6974, lng: -9.2033 },
    qa: {
      "How do I skip the queue?":
        "The takeaway line moves fast, but walk inside to the seated rooms — there's often no wait to sit and order at the table.",
      "How should I eat them?":
        "Warm, with a sprinkle of cinnamon and powdered sugar, alongside a bica (Lisbon's espresso).",
      "Why are they famous?":
        "Their flaky, caramelised crust and silky custard come from a recipe unchanged since 1837 — a direct link to the monks of Jerónimos.",
    },
  },
  {
    id: "cafe-brasileira",
    name: "Café A Brasileira",
    area: "Chiado, Lisbon",
    category: "Cafes",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    distanceKm: 0.6,
    duration: "30–45 min",
    rating: 4.7,
    tagline: "Historic Art Deco café where poet Fernando Pessoa spent afternoons writing.",
    history:
      "Opened in 1905 to import Brazilian coffee beans, A Brasileira quickly became the intellectual epicentre of Lisbon's modernist artists and writers.",
    culture:
      "A grand room with carved oak paneling, mirrored walls, and brass accents. Travelers sit outside beside the life-sized bronze statue of Fernando Pessoa.",
    facts: [
      "Coined the Lisbon slang phrase 'Bica' (Beba Isto Com Açúcar) for espresso.",
      "The bronze statue of Fernando Pessoa on the terrace is one of Lisbon's most photographed icons.",
      "Preserves original 1920s Art Deco fixtures and painted canvas ceiling art.",
    ],
    featured: false,
    map: { x: 44, y: 50 },
    coords: { lat: 38.7107, lng: -9.1422 },
    qa: {
      "Who was Fernando Pessoa?":
        "Portugal's legendary 20th-century poet who frequented the café and now sits cast in bronze on its patio.",
      "What should I order?":
        "A classic 'bica' espresso alongside a freshly baked pastry.",
    },
  },
  {
    id: "timeout-market",
    name: "Time Out Market Lisboa",
    area: "Cais do Sodré, Lisbon",
    category: "Restaurants",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    distanceKm: 1.1,
    duration: "1–1.5 hrs",
    rating: 4.8,
    tagline: "Gourmet culinary hall featuring 26 top Portuguese chefs and specialty dishes.",
    history:
      "Housed in the historic 1892 Mercado da Ribeira, Time Out curated Portugal's very finest restaurants under one roof in 2014.",
    culture:
      "Communal wooden tables beneath soaring iron girders, alive with laughter, craft beer, pastel de nata workshops, and Michelin-starred tasting plates.",
    facts: [
      "Curates only venues that received 4 or 5 stars from independent food critics.",
      "Features live fado, cooking workshops, and local wine tasting bars.",
      "Attracts over 3 million visitors annually as Lisbon's #1 culinary hotspot.",
    ],
    featured: true,
    map: { x: 38, y: 62 },
    coords: { lat: 38.7071, lng: -9.1457 },
    qa: {
      "How does ordering work?":
        "Browse the counters around the perimeter, order your dishes, take a buzzer, and sit at the communal center tables.",
      "What are the best stalls?":
        "Try the slow-roasted suckling pig sandwich from Henrique Sá Pessoa or sea bass tartar from Tartar-ia.",
    },
  },
  {
    id: "tivoli-liberdade",
    name: "Tivoli Avenida Liberdade Lisboa",
    area: "Avenida da Liberdade, Lisbon",
    category: "Hotels",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    distanceKm: 1.4,
    duration: "Overnight",
    rating: 4.9,
    tagline: "Grand 5-star heritage hotel with subtropical gardens and a glamorous rooftop bar.",
    history:
      "Welcoming guests since 1933, the Tivoli has hosted royalty, Hollywood legends, and statesmen along Lisbon's most fashionable tree-lined boulevard.",
    culture:
      "Old-world European glamour combined with modern luxury, featuring the famous SEEN sky bar with sunset views over the castle and river.",
    facts: [
      "Hidden oasis with a heated round pool set in lush 1930s subtropical gardens.",
      "The rooftop SEEN Sky Bar is famous for inventive cocktails and panoramic sunset vistas.",
      "Located on Lisbon's high-fashion designer shopping boulevard.",
    ],
    featured: false,
    map: { x: 42, y: 30 },
    coords: { lat: 38.7205, lng: -9.1462 },
    qa: {
      "Is the rooftop bar open to non-guests?":
        "Yes, the SEEN Rooftop is open for dinner and evening cocktails with reservations recommended.",
      "Where is it situated?":
        "Directly on Avenida da Liberdade, an easy 10-minute stroll to Rossio square and Baixa.",
    },
  },
];

export const ALL_PLACES: Place[] = [...CURRENT_PLACES, ...DEMO_PLACES];

const DYNAMIC_PLACES_REGISTRY = new Map<string, Place>();
ALL_PLACES.forEach((p) => DYNAMIC_PLACES_REGISTRY.set(p.id, p));

export function registerDynamicPlaces(places: Place[]) {
  places.forEach((p) => DYNAMIC_PLACES_REGISTRY.set(p.id, p));
}

/**
 * Returns places for the given location mode:
 * - "device" / current location: CURRENT_PLACES (SGU, Ramling, Café Amigo's, The Tea Toast Co.)
 * - "demo": DEMO_PLACES (Lisbon)
 */
export function getPlacesForLocation(mode: "demo" | "device" | "unset"): Place[] {
  if (mode === "demo") {
    return DEMO_PLACES;
  }
  return CURRENT_PLACES;
}

// Global lookup and defaults
export const PLACES = ALL_PLACES;
export const getPlace = (id: string) =>
  DYNAMIC_PLACES_REGISTRY.get(id) || ALL_PLACES.find((p) => p.id === id);

export const GENERIC_QUESTIONS = ["Tell me a story", "Fun fact?", "Nearby food?"];

export function demoAnswer(place: Place, question: string): string {
  const exact = place.qa[question];
  if (exact) return exact;
  const q = question.toLowerCase();
  if (q.includes("story") || q.includes("history") || q.includes("old")) return place.history;
  if (q.includes("fact") || q.includes("interesting"))
    return place.facts[Math.floor(Math.random() * place.facts.length)] || place.tagline;
  if (q.includes("food") || q.includes("eat"))
    return `Near ${place.name}, check out Café Amigo's and The Tea Toast Co. for delicious burgers, teas, and snacks.`;
  if (q.includes("culture") || q.includes("meaning") || q.includes("signific"))
    return place.culture;
  if (q.includes("time") || q.includes("long") || q.includes("duration"))
    return `Plan about ${place.duration} at ${place.name}.`;
  return `Here's what I know about ${place.name}: ${place.tagline} ${place.culture}`;
}

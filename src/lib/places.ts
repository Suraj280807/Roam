import belem from "@/assets/belem.jpg";
import jeronimos from "@/assets/jeronimos.jpg";
import alfama from "@/assets/alfama.jpg";
import castle from "@/assets/castle.jpg";
import lxfactory from "@/assets/lxfactory.jpg";
import miradouro from "@/assets/miradouro.jpg";
import pasteis from "@/assets/pasteis.jpg";

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

export const PLACES: Place[] = [
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
    distanceKm: 5.9,
    duration: "1.5–2 hrs",
    rating: 4.8,
    tagline: "Lace-like stone cloisters funded by the spice trade.",
    history:
      "Founded in 1501, the monastery was financed by a tax on spices brought from Africa and Asia. Vasco da Gama's tomb rests inside, alongside the poet Luís de Camões.",
    culture:
      "Hieronymite monks once prayed here for sailors' souls. Today it symbolises Portugal's Age of Discovery and is the venue where the EU's Lisbon Treaty was signed in 2007.",
    facts: [
      "The two-storey cloister survived the 1755 earthquake almost intact.",
      "Construction took roughly 100 years.",
      "The monks are credited with inventing the original pastel de nata recipe.",
    ],
    featured: true,
    map: { x: 18, y: 62 },
    qa: {
      "Who is buried here?":
        "Vasco da Gama, the navigator who reached India by sea in 1498, and Luís de Camões, author of Portugal's national epic Os Lusíadas, both lie in ornate tombs near the church entrance.",
      "Best time to visit?":
        "Weekday mornings are calmest. The church is free; the cloister requires a ticket. Combine it with Belém Tower and a stop for pastries.",
      "What is Manueline style?":
        "It's a Portuguese late-Gothic style full of maritime symbols — coral, ropes, seaweed and armillary spheres — celebrating the nation's ocean voyages.",
    },
  },
  {
    id: "alfama",
    name: "Alfama Quarter",
    area: "Alfama",
    category: "Culture",
    image: alfama,
    distanceKm: 0.9,
    duration: "2–3 hrs",
    rating: 4.6,
    tagline: "Lisbon's oldest neighbourhood, where fado drifts from doorways.",
    history:
      "Alfama's tangled lanes date to Moorish rule — its name comes from the Arabic al-hamma, meaning hot springs. Built on dense bedrock, it largely survived the great earthquake of 1755.",
    culture:
      "This is the heartland of fado, the soulful music of longing. In June, the Santo António festival fills every alley with grilled sardines, garlands and dancing.",
    facts: [
      "Tram 28 rattles through some of its narrowest streets.",
      "Many houses still display traditional azulejo tile façades.",
      "Fado was added to UNESCO's Intangible Cultural Heritage list in 2011.",
    ],
    featured: true,
    map: { x: 70, y: 48 },
    qa: {
      "Where can I hear fado?":
        "Small family-run casas de fado in Alfama host evening performances. Book ahead, arrive around 8–9pm, and keep silent during songs — it's considered respectful.",
      "Is it walkable?":
        "Yes, but it's steep with slippery cobblestones. Wear comfortable shoes and consider riding Tram 28 up, then walking down.",
      "Hidden spots nearby?":
        "Seek out Largo do Chafariz de Dentro for its fountain square and the tiny Beco do Carneiro alley — one of the narrowest in Lisbon.",
    },
  },
  {
    id: "sao-jorge",
    name: "São Jorge Castle",
    area: "Castelo",
    category: "History",
    image: castle,
    distanceKm: 1.1,
    duration: "1.5–2 hrs",
    rating: 4.5,
    tagline: "Moorish ramparts crowning the city's highest hill.",
    history:
      "The hilltop has been fortified since at least the 2nd century BC. The Moors built the current walls in the 11th century; Afonso Henriques captured it in 1147 during the Reconquista.",
    culture:
      "The castle was the royal residence until the 16th century. Today peacocks roam its gardens and its terraces offer one of the most beloved views in Lisbon.",
    facts: [
      "The castle has 11 towers.",
      "A camera obscura in the Tower of Ulysses projects live views of the city.",
      "Archaeological digs here revealed remains from the Iron Age.",
    ],
    map: { x: 64, y: 38 },
    qa: {
      "Is the view worth it?":
        "Absolutely — the ramparts frame the Tagus, the 25 de Abril bridge and the red rooftops of Baixa. Sunset is especially magical.",
      "How do I get there?":
        "Walk uphill from Baixa through Alfama (about 20 minutes), take Tram 28 to Largo das Portas do Sol, or use bus 737.",
      "Tell me about the peacocks":
        "Peacocks have lived freely in the castle gardens for decades. They are a beloved quirk — listen for their calls echoing off the walls.",
    },
  },
  {
    id: "lx-factory",
    name: "LX Factory",
    area: "Alcântara",
    category: "Culture",
    image: lxfactory,
    distanceKm: 4.4,
    duration: "1–2 hrs",
    rating: 4.4,
    tagline: "A 19th-century textile mill reborn as a creative village.",
    history:
      "Founded in 1846 as a fabric and thread complex, the site later housed printers and industrial workshops before standing empty for decades.",
    culture:
      "Since 2008 it has been a creative hub of studios, design shops, street art and restaurants. Its bookstore, Ler Devagar, fills a former printing hall.",
    facts: [
      "Ler Devagar features a flying bicycle sculpture above the shelves.",
      "A Sunday market brings vintage finds and local crafts.",
      "It sits right beneath the 25 de Abril bridge.",
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

export const getPlace = (id: string) => PLACES.find((p) => p.id === id);

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
    return `Near ${place.name}, look for a traditional tasca serving bacalhau, grilled sardines and a glass of vinho verde. In ${place.area}, small family places usually beat the busy main streets.`;
  if (q.includes("culture") || q.includes("meaning") || q.includes("signific"))
    return place.culture;
  if (q.includes("time") || q.includes("long") || q.includes("duration"))
    return `Plan about ${place.duration} at ${place.name}. Mornings are typically quieter.`;
  return `Here's what I know about ${place.name}: ${place.tagline} ${place.culture} Try asking about its history, best visiting time, or a fun fact.`;
}

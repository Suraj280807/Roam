// Chapters 1 to 5 pages generator
module.exports = function getCh1ToCh5Pages() {
  const pages = [];

  // ==========================================
  // PAGE 8 (Report Page 1): CHAPTER 1 - INTRODUCTION
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    1. INTRODUCTION
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    <p style="margin-bottom: 5mm;">
      Modern global tourism and daily commuting rely heavily on mobile navigation platforms. While existing map applications excel at calculating the shortest turn-by-turn route between geographic coordinates, they treat journeys primarily as logistical transit. As travelers move from one location to another, they frequently pass ancient temples, historic fortresses, prominent educational institutions, viewpoints, and artisanal local businesses without discovering why these places matter or understanding their cultural heritage.
    </p>
    <p style="margin-bottom: 5mm;">
      Our project, <b>Roam — AI-Powered Travel Companion</b>, is a client-first, responsive web application engineered to transform passive geographic navigation into an engaging journey of interactive exploration. Built on modern web standards using React 19, TypeScript, TanStack Router, Leaflet, and Tailwind CSS, Roam acts as a personal intelligent guide that accompanies travelers wherever they explore.
    </p>
    <p style="margin-bottom: 5mm;">
      The core philosophy of Roam is encapsulated in a five-stage exploration paradigm: <b>Discover &rarr; Explore &rarr; Learn &rarr; Earn &rarr; Remember</b>. Rather than leaving travelers to juggle separate mapping utilities, web searches, guidebooks, and photo albums, Roam integrates real-time proximity discovery, historical storytelling, voice audio narration, camera-based landmark photo capture, digital passport gamification, and personal travel journaling into a unified browser experience.
    </p>
    <p style="margin-bottom: 5mm;">
      The scope of the project focuses on responsive client-side intelligence, HTML5 geolocation with automatic IP fallback, client-side canvas image compression, and reliable local state management. Personal notes, stamps and journal data are stored locally in the browser. Location resolution and map display may communicate with external services when required. The system operates with transparent mathematical distance formulas (Haversine equation) and browser-native Speech Synthesis.
    </p>
    <p>
      The remainder of this report is organized as follows. Chapter 2 reviews the literature on navigation systems and identifies key research gaps. Chapter 3 presents our motivation, formal problem statement, and project objectives. Chapters 4 and 5 delineate the system architecture and detailed UML design models. Chapter 6 details the development methodology and algorithms. Chapter 7 documents our field work and data collection in the SGU Kolhapur region. Chapter 8 provides results and analysis. Chapter 9 presents conclusions and future scope, followed by references and appendices.
    </p>
  </div>
  <div class="page-footer">1</div>
</div>
`);

  // ==========================================
  // PAGE 9 (Report Page 2): CHAPTER 2 - LITERATURE REVIEW (2.1)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    2. LITERATURE REVIEW / EXISTING SYSTEM
  </div>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    2.1 Background study
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    <p style="margin-bottom: 5mm;">
      Contemporary spatial navigation has evolved dramatically over the past two decades. Early digital navigation relied on static pre-rendered roadmaps and standalone GPS receivers. The advent of modern mapping APIs, such as Google Maps, Mapbox, and OpenStreetMap, revolutionized mobile navigation by enabling real-time GPS coordinate mapping, dynamic routing, and estimated arrival times. However, these systems are fundamentally optimized for vehicular traffic and point-to-point transit efficiency rather than leisurely foot exploration or cultural discovery.
    </p>
    <p style="margin-bottom: 5mm;">
      In parallel, digital tourism platforms such as TripAdvisor, Lonely Planet, and Wikivoyage provide comprehensive crowd-sourced reviews, ratings, and travel itineraries. While these platforms contain extensive catalogs of popular attractions, their user interfaces are dense, text-heavy, and heavily monetized with third-party advertisements and affiliate booking links. Travelers are required to switch continuously between mapping tools to locate a site and review websites to learn about it, resulting in fragmented user experiences.
    </p>
    <p style="margin-bottom: 5mm;">
      Dedicated audio tour mobile applications, such as VoiceMap and PocketGuide, offer GPS-triggered spoken walking tours. However, they typically rely on proprietary, heavy native mobile downloads, expensive paywalled content packs, and rigid linear itineraries that penalize spontaneous exploration. Furthermore, emerging mobile applications with augmented reality (AR) or machine-learning object recognition often demand intensive GPU computation and continuous cloud API roundtrips that consume significant mobile data and deplete battery life rapidly.
    </p>
    <p>
      In recent years, gamified exploration concepts (such as Geocaching and location-based quest games) have demonstrated that achievement mechanisms significantly boost user motivation to explore local environments. Nevertheless, few systems seamlessly unify lightweight web-based audio storytelling, spatial proximity calculations, and collectible digital passport stamps within a zero-install, privacy-first single-page application.
    </p>
  </div>
  <div class="page-footer">2</div>
</div>
`);

  // ==========================================
  // PAGE 10 (Report Page 3): CHAPTER 2 cont. (2.2 Gaps Identified & Table 1)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    2.2 Gaps identified
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 6mm;">
    From the review of existing commercial navigation and tourism systems, six critical engineering and experiential gaps were identified. Each gap is addressed by a specific architectural and functional design decision in Roam, as summarized in Table 1 below.
  </div>

  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 1: Gaps identified in existing systems and Roam's response
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 11pt; line-height: 1.5;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 8px; width: 10%;">Gap</th>
        <th style="border: 1px solid #777; padding: 8px; width: 45%;">Gap identified in existing work</th>
        <th style="border: 1px solid #777; padding: 8px; width: 45%;">Response in this project (Roam)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #777; padding: 8px; font-weight: bold; text-align: center;">G1</td>
        <td style="border: 1px solid #777; padding: 8px;">Mainstream maps focus strictly on navigation and road routing, omitting the cultural, historical, and architectural context of landmarks.</td>
        <td style="border: 1px solid #777; padding: 8px;">Provides rich contextual storytelling, curated historical facts, and cultural insights directly alongside location coordinates.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 8px; font-weight: bold; text-align: center;">G2</td>
        <td style="border: 1px solid #777; padding: 8px;">Fragmented workflow requiring users to switch between separate apps for navigation, reviews, journal keeping, and camera identification.</td>
        <td style="border: 1px solid #777; padding: 8px;">Integrates discovery, mapping, audio narration, landmark photo scanning, and travel journaling into a single cohesive interface.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 8px; font-weight: bold; text-align: center;">G3</td>
        <td style="border: 1px solid #777; padding: 8px;">Local regional heritage sites (e.g., Ramling Temple, artisan cafes) are eclipsed by commercial chains and large sponsored listings.</td>
        <td style="border: 1px solid #777; padding: 8px;">Highlights verified local landmarks and hidden gems with equal prominence and dedicated partner coupon rewards.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 8px; font-weight: bold; text-align: center;">G4</td>
        <td style="border: 1px solid #777; padding: 8px;">Passive navigation offers zero reward or incentive for travelers to explore beyond standard tourist hotspots.</td>
        <td style="border: 1px solid #777; padding: 8px;">Introduces a gamified Digital Travel Passport with collectible stamps, explorer tiers, and unlockable merchant discounts.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 8px; font-weight: bold; text-align: center;">G5</td>
        <td style="border: 1px solid #777; padding: 8px;">Audio guide applications are paywalled, requiring expensive in-app purchases and heavy native package downloads.</td>
        <td style="border: 1px solid #777; padding: 8px;">Implements a zero-cost, browser-native audio tour engine utilizing the Web Speech Synthesis API with natural cadence.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 8px; font-weight: bold; text-align: center;">G6</td>
        <td style="border: 1px solid #777; padding: 8px;">Aggressive cloud data harvesting, mandatory account creation, and constant background battery drain.</td>
        <td style="border: 1px solid #777; padding: 8px;">Personal notes, stamps, and journal data are stored locally in the browser; network calls are limited to on-demand location resolution and map tiles.</td>
      </tr>
    </tbody>
  </table>
  <div class="page-footer">3</div>
</div>
`);

  // ==========================================
  // PAGE 11 (Report Page 4): CHAPTER 3 - MOTIVATION & PROBLEM STATEMENT
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    3. MOTIVATION, PROBLEM STATEMENT AND OBJECTIVES
  </div>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    3.1 Motivation
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 6mm;">
    <p style="margin-bottom: 5mm;">
      Travel has the unique ability to broaden horizons, foster cultural empathy, and connect individuals to history. However, in our fast-paced digital era, smartphones often detach users from their immediate surroundings. Travelers navigate between points staring at directional arrows, missing the rich heritage beneath their feet. In historical regions like Kolhapur and vibrant campuses like Sanjay Ghodawat University, visitors often walk past sites of architectural and cultural significance without awareness of their background.
    </p>
    <p style="margin-bottom: 5mm;">
      As undergraduate students in Computer Science and Engineering, our primary motivation was to harness modern web engineering to bridge this gap. We sought to build an application that does not merely tell a user <i>where</i> to go, but reveals <i>why</i> a place matters. From an engineering standpoint, this project provided an ideal opportunity to integrate cutting-edge single-page application (SPA) paradigms with React 19, TypeScript, TanStack Router, Leaflet mapping, browser hardware APIs (Geolocation, Speech Synthesis, Camera), and responsive UI design.
    </p>
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    3.2 Problem statement
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    <p style="margin-bottom: 5mm;">
      Modern digital navigation and tourism tools remain severely fragmented. Traditional mapping tools provide geometric routing without cultural depth; travel guide platforms present cumbersome, ad-laden articles; audio guides require expensive proprietary apps; and memorable travel reflections remain scattered across disconnected social media albums. Furthermore, travelers frequently encounter poor internet connectivity and restrictive device permissions while in the field.
    </p>
    <p>
      The problem addressed by this project is to design, implement, and validate <b>Roam</b>: an integrated, lightweight, client-first web companion that automatically identifies user proximity to landmarks, delivers hands-free voice audio storytelling, provides a landmark photo capture and compression interface, gamifies exploration through digital stamps and merchant rewards, and records personal travel memories—all operating smoothly across desktop and mobile browsers.
    </p>
  </div>
  <div class="page-footer">4</div>
</div>
`);

  // ==========================================
  // PAGE 12 (Report Page 5): CHAPTER 3 cont. (3.3 Numbered Objectives)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 5mm;">
    3.3 Objectives
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 6mm;">
    The central aim of the project is to construct a production-ready, client-first web application that transforms travel navigation into an interactive learning journey. To accomplish this, the specific objectives are formulated as follows:
  </div>

  <ol style="font-size: 12pt; line-height: 1.9; padding-left: 8mm; text-align: justify;">
    <li style="margin-bottom: 2mm;"><b>Proximity Geolocation Engine:</b> To implement a real-time location service that computes precise distances between the user and cataloged landmarks using the mathematical Haversine formula.</li>
    <li style="margin-bottom: 2mm;"><b>Multi-Tier Geolocation Fallback:</b> To engineer a resilient location resolution pipeline incorporating HTML5 high-accuracy GPS, Google Maps reverse geocoding, and automatic IP-based geolocation fallback when GPS permissions are withheld.</li>
    <li style="margin-bottom: 2mm;"><b>Interactive Map Visualization:</b> To integrate Leaflet-based interactive maps displaying categorized, color-coded pins, custom popups, and spatial exploration boundaries.</li>
    <li style="margin-bottom: 2mm;"><b>Browser-Native Audio Narration:</b> To construct a hands-free audio tour storyteller leveraging the Web Speech Synthesis API with natural cadence and dedicated audio player controls.</li>
    <li style="margin-bottom: 2mm;"><b>Landmark Photo Capture Interface:</b> To implement a client-side photo capture interface featuring multi-tier canvas image compression (<tt>createObjectURL</tt> &rarr; <tt>FileReader</tt> &rarr; raw fallback) for mobile storage efficiency.</li>
    <li style="margin-bottom: 2mm;"><b>Gamified Digital Travel Passport:</b> To design a collectible stamp system where users unlock location-verified passport stamps and advance through progressive explorer tiers.</li>
    <li style="margin-bottom: 2mm;"><b>Local Merchant Loyalty Integration:</b> To create a partner coupon and quest reward mechanism linking landmark visits to real local businesses (such as The Tea Toast Co. and Cafe Amigos).</li>
    <li style="margin-bottom: 2mm;"><b>Personal Travel Journal:</b> To develop a private client journal allowing travelers to record date-stamped reflections, attach compressed photo memories, and manage saved landmarks.</li>
    <li style="margin-bottom: 2mm;"><b>Privacy-Conscious Local State:</b> To store personal notes, stamps, and journal reflections locally in the browser using React Context and LocalStorage, while external network communication is restricted to location resolution and map tiles.</li>
    <li><b>Comprehensive Boundary and Usability Testing:</b> To conduct rigorous unit, boundary, and cross-browser testing across desktop and mobile devices under diverse network and permission scenarios.</li>
  </ol>
  <div class="page-footer">5</div>
</div>
`);

  // ==========================================
  // PAGE 13 (Report Page 6): CHAPTER 4 - SYSTEM ARCHITECTURE
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    4. SYSTEM ARCHITECTURE
  </div>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    4.1 Architecture overview
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 5mm;">
    Roam is structured around a modern client-first, single-page application (SPA) architecture. The application is hosted as a static web bundle and executes entirely within the user's web browser, directly interacting with standardized HTML5 device hardware APIs. This approach eliminates server roundtrip latency for interactive exploration, ensures user data privacy for personal notes and collected stamps, and facilitates smooth offline recovery.
  </div>

  <div style="text-align: center; margin-bottom: 6mm;">
    <svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#333" />
        </marker>
      </defs>
      <!-- Boxes -->
      <rect x="10" y="25" width="100" height="50" rx="8" fill="#cfe2ff" stroke="#084298" stroke-width="1.5"/>
      <text x="60" y="47" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#084298">Browser Client</text>
      <text x="60" y="62" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle" fill="#084298">React 19 / UI</text>

      <line x1="110" y1="50" x2="148" y2="50" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>

      <rect x="150" y="25" width="105" height="50" rx="8" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.5"/>
      <text x="202" y="47" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#0f5132">TanStack Router</text>
      <text x="202" y="62" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle" fill="#0f5132">Route Dispatcher</text>

      <line x1="255" y1="50" x2="293" y2="50" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>

      <rect x="295" y="25" width="125" height="50" rx="8" fill="#fff3cd" stroke="#664d03" stroke-width="1.5"/>
      <text x="357" y="47" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#664d03">Location & Haversine</text>
      <text x="357" y="62" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle" fill="#664d03">Proximity Engine</text>

      <line x1="420" y1="50" x2="463" y2="50" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>

      <rect x="465" y="25" width="125" height="50" rx="8" fill="#e2d9f3" stroke="#432874" stroke-width="1.5"/>
      <text x="527" y="47" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#432874">Audio &amp; Photo</text>
      <text x="527" y="62" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle" fill="#432874">Speech &amp; Canvas API</text>

      <!-- Return Flow -->
      <line x1="527" y1="75" x2="527" y2="115" stroke="#333" stroke-width="1.5"/>
      <line x1="527" y1="115" x2="202" y2="115" stroke="#333" stroke-width="1.5"/>
      <line x1="202" y1="115" x2="202" y2="77" stroke="#333" stroke-width="1.5" marker-end="url(#arrow)"/>

      <rect x="250" y="100" width="160" height="28" rx="4" fill="#f8f9fa" stroke="#6c757d" stroke-width="1"/>
      <text x="330" y="118" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle" fill="#333">State Store (LocalStorage)</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic; margin-top: 2mm;">
      Figure 1: System architecture and request-response flow
    </div>
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    4.2 Layers of the architecture
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    The architecture comprises three primary tiers:
    <b>1. Presentation Layer:</b> Built with React 19, Tailwind CSS, Lucide icons, and Radix UI components. It renders responsive cards, modal sheets, and interactive Leaflet map layers.
    <b>2. Application & Logic Layer:</b> Contains the central React Context state manager, TanStack Router routing tree, Haversine proximity computation, speech synthesis controller, and multi-tier image compression routines.
    <b>3. Service & Storage Layer:</b> Interfaces with hardware APIs (HTML5 Geolocation, Web Speech API, MediaDevices Camera), external Google Maps geocoding endpoints, and persistent browser LocalStorage.
  </div>
  <div class="page-footer">6</div>
</div>
`);

  // ==========================================
  // PAGE 14 (Report Page 7): CHAPTER 4 cont. (Tables 2 & 3)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    4.3 Technology stack
  </div>
  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 2: Technology stack and role of each component
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 10.5pt; line-height: 1.45; margin-bottom: 6mm;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 6px; width: 22%;">Part</th>
        <th style="border: 1px solid #777; padding: 6px; width: 28%;">Technology</th>
        <th style="border: 1px solid #777; padding: 6px; width: 50%;">Role in the system</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Frontend UI</td><td style="border: 1px solid #777; padding: 6px;">React 19 & TypeScript</td><td style="border: 1px solid #777; padding: 6px;">Component-driven view rendering, strict type safety, and reactive DOM updates.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Client Routing</td><td style="border: 1px solid #777; padding: 6px;">TanStack React Router</td><td style="border: 1px solid #777; padding: 6px;">Type-safe file-based URL routing, nested layouts, and view transitions.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Styling</td><td style="border: 1px solid #777; padding: 6px;">Tailwind CSS v4 & Radix</td><td style="border: 1px solid #777; padding: 6px;">Responsive utility styling, mobile drawer sheets, dialogs, and animations.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Spatial Maps</td><td style="border: 1px solid #777; padding: 6px;">Leaflet & OpenStreetMap</td><td style="border: 1px solid #777; padding: 6px;">Interactive map display, custom pin clusters, user geolocator marker, and pan/zoom.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Audio Narration</td><td style="border: 1px solid #777; padding: 6px;">Web Speech Synthesis API</td><td style="border: 1px solid #777; padding: 6px;">Browser-native text-to-speech engine delivering hands-free landmark audio tours.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Image Processing</td><td style="border: 1px solid #777; padding: 6px;">HTML Canvas & FileReader</td><td style="border: 1px solid #777; padding: 6px;">Client-side landmark photo downscaling and compression before local storage.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Persistence</td><td style="border: 1px solid #777; padding: 6px;">HTML5 LocalStorage API</td><td style="border: 1px solid #777; padding: 6px;">Persistent client storage for collected stamps, coins, notes, and photo memories.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Testing</td><td style="border: 1px solid #777; padding: 6px;">Vitest</td><td style="border: 1px solid #777; padding: 6px;">Automated test runner verifying route matchers, logic routines, and state actions.</td></tr>
    </tbody>
  </table>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    4.4 Project files and components
  </div>
  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 3: Core project files and modules
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 10.5pt; line-height: 1.45;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 6px; width: 28%;">File / Module</th>
        <th style="border: 1px solid #777; padding: 6px; width: 72%;">Purpose and Architectural Function</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/routes/index.tsx</td><td style="border: 1px solid #777; padding: 6px;">Landing dashboard with active region switcher (SGU/Kolhapur vs Lisbon) and stats.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/routes/discover.tsx</td><td style="border: 1px solid #777; padding: 6px;">Real-time landmark discovery feed with category chips and Haversine distance badges.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/routes/explore.tsx</td><td style="border: 1px solid #777; padding: 6px;">Interactive Leaflet map explorer and camera-based landmark photo capture modal.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/routes/place.$id.tsx</td><td style="border: 1px solid #777; padding: 6px;">In-depth landmark guide featuring history, cultural lore, facts, and Q&A accordion.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/routes/passport.tsx</td><td style="border: 1px solid #777; padding: 6px;">Gamified Travel Passport displaying unlocked stamps, explorer rank, and quests.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/routes/journal.tsx</td><td style="border: 1px solid #777; padding: 6px;">Personal traveler journal preserving reflections, notes, and compressed photo memories.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/lib/location.ts</td><td style="border: 1px solid #777; padding: 6px;">HTML5 GPS fetcher, Google Maps reverse geocoder, and automatic IP fallback handler.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/lib/dynamic-places.ts</td><td style="border: 1px solid #777; padding: 6px;">Haversine distance calculation and curated regional destination packs.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/lib/audio.ts</td><td style="border: 1px solid #777; padding: 6px;">Web Speech Synthesis audio storyteller with cadence control and state listeners.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">src/lib/store.tsx</td><td style="border: 1px solid #777; padding: 6px;">React Context provider managing user session, stamps, coins, notes, and coupons.</td></tr>
    </tbody>
  </table>
  <div class="page-footer">7</div>
</div>
`);

  // ==========================================
  // PAGE 15 (Report Page 8): CHAPTER 5 - SYSTEM DESIGN (5.1 Use Case)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    5. SYSTEM DESIGN
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 5mm;">
    This chapter presents the architectural design of Roam through a comprehensive suite of Unified Modeling Language (UML) diagrams and a structured Data Flow Diagram (DFD). These models capture the system's structural components, behavioral interactions, execution states, and deployment topology.
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    5.1 Use case diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 5mm;">
    The primary actor is the <b>Traveler</b> (student, tourist, or explorer). The user interacts with the system to discover nearby places, filter by interest, listen to spoken audio stories, capture landmark photos with the camera, collect verified digital passport stamps, and save journal reflections.
  </div>

  <div style="text-align: center; margin-top: 4mm;">
    <svg width="580" height="260" viewBox="0 0 580 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="uc-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#444" />
        </marker>
      </defs>
      <!-- System boundary -->
      <rect x="130" y="10" width="430" height="240" rx="10" fill="#fdfdfd" stroke="#084298" stroke-width="1.8"/>
      <text x="345" y="28" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="#084298" text-anchor="middle">Roam Travel Companion System</text>

      <!-- Actor: Traveler -->
      <circle cx="50" cy="90" r="14" fill="#cfe2ff" stroke="#084298" stroke-width="1.5"/>
      <line x1="50" y1="104" x2="50" y2="150" stroke="#084298" stroke-width="2"/>
      <line x1="25" y1="120" x2="75" y2="120" stroke="#084298" stroke-width="2"/>
      <line x1="50" y1="150" x2="30" y2="195" stroke="#084298" stroke-width="2"/>
      <line x1="50" y1="150" x2="70" y2="195" stroke="#084298" stroke-width="2"/>
      <text x="50" y="215" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" fill="#084298" text-anchor="middle">Traveler</text>

      <!-- Use cases -->
      <ellipse cx="230" cy="55" rx="75" ry="18" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.2"/>
      <text x="230" y="59" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle">Discover Nearby Places</text>

      <ellipse cx="230" cy="100" rx="75" ry="18" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.2"/>
      <text x="230" y="104" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle">Listen to Voice Audio Tour</text>

      <ellipse cx="230" cy="145" rx="75" ry="18" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.2"/>
      <text x="230" y="149" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle">Capture Landmark Photo</text>

      <ellipse cx="230" cy="190" rx="75" ry="18" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.2"/>
      <text x="230" y="194" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle">Collect Passport Stamp</text>

      <ellipse cx="230" cy="230" rx="75" ry="15" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.2"/>
      <text x="230" y="234" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle">Record Journal Memory</text>

      <!-- Included use case -->
      <ellipse cx="450" cy="115" rx="85" ry="22" fill="#fff3cd" stroke="#664d03" stroke-width="1.2" stroke-dasharray="3,3"/>
      <text x="450" y="115" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#664d03">&lt;&lt;include&gt;&gt;</text>
      <text x="450" y="128" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle">Resolve User Coordinates</text>

      <!-- Lines from Actor -->
      <line x1="75" y1="120" x2="155" y2="55" stroke="#444" stroke-width="1.2"/>
      <line x1="75" y1="120" x2="155" y2="100" stroke="#444" stroke-width="1.2"/>
      <line x1="75" y1="120" x2="155" y2="145" stroke="#444" stroke-width="1.2"/>
      <line x1="75" y1="120" x2="155" y2="190" stroke="#444" stroke-width="1.2"/>
      <line x1="75" y1="120" x2="155" y2="230" stroke="#444" stroke-width="1.2"/>

      <!-- Include dashed arrows -->
      <line x1="305" y1="58" x2="385" y2="100" stroke="#444" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#uc-arrow)"/>
      <line x1="305" y1="102" x2="365" y2="110" stroke="#444" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#uc-arrow)"/>
      <line x1="305" y1="145" x2="368" y2="125" stroke="#444" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#uc-arrow)"/>
      <line x1="305" y1="190" x2="388" y2="135" stroke="#444" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#uc-arrow)"/>
    </svg>
    <div style="font-size: 12pt; font-style: italic; margin-top: 3mm;">
      Figure 2: Use case diagram for Roam exploration workflows
    </div>
  </div>
  <div class="page-footer">8</div>
</div>
`);

  // ==========================================
  // PAGE 16 (Report Page 9): CHAPTER 5 cont. (5.2 Class & 5.3 Object Diagrams)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    5.2 Class diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 3mm;">
    The class diagram illustrates the primary TypeScript interfaces and classes governing state, audio narration, geolocation, and place catalogs.
  </div>

  <div style="text-align: center; margin-bottom: 5mm;">
    <svg width="580" height="155" viewBox="0 0 580 155" xmlns="http://www.w3.org/2000/svg">
      <!-- StoreContext -->
      <rect x="180" y="5" width="220" height="50" fill="#cfe2ff" stroke="#084298" stroke-width="1.3"/>
      <text x="290" y="20" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#084298">StoreContext</text>
      <line x1="180" y1="25" x2="400" y2="25" stroke="#084298" stroke-width="1"/>
      <text x="185" y="37" font-family="'Times New Roman', serif" font-size="9">- user, activePlaces, stamps, notes, coupons</text>
      <text x="185" y="49" font-family="'Times New Roman', serif" font-size="9">+ addStamp(), saveNote(), redeemCoupon()</text>

      <!-- Lines to child classes -->
      <line x1="220" y1="55" x2="80" y2="85" stroke="#333" stroke-width="1.2"/>
      <line x1="290" y1="55" x2="290" y2="85" stroke="#333" stroke-width="1.2"/>
      <line x1="360" y1="55" x2="500" y2="85" stroke="#333" stroke-width="1.2"/>

      <!-- Place -->
      <rect x="10" y="85" width="150" height="65" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.2"/>
      <text x="85" y="98" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#0f5132">&lt;&lt;interface&gt;&gt; Place</text>
      <line x1="10" y1="103" x2="160" y2="103" stroke="#0f5132" stroke-width="1"/>
      <text x="15" y="115" font-family="'Times New Roman', serif" font-size="8.5">+ id, name, area, category</text>
      <text x="15" y="126" font-family="'Times New Roman', serif" font-size="8.5">+ coords, distanceKm, rating</text>
      <text x="15" y="137" font-family="'Times New Roman', serif" font-size="8.5">+ history, culture, facts, qa</text>

      <!-- AudioTourEngine -->
      <rect x="210" y="85" width="160" height="65" fill="#f8d7da" stroke="#842029" stroke-width="1.2"/>
      <text x="290" y="98" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#842029">AudioTourEngine</text>
      <line x1="210" y1="103" x2="370" y2="103" stroke="#842029" stroke-width="1"/>
      <text x="215" y="115" font-family="'Times New Roman', serif" font-size="8.5">- synth: SpeechSynthesis</text>
      <text x="215" y="126" font-family="'Times New Roman', serif" font-size="8.5">+ speak(text: string): boolean</text>
      <text x="215" y="137" font-family="'Times New Roman', serif" font-size="8.5">+ stop(), registerListener()</text>

      <!-- LocationService -->
      <rect x="420" y="85" width="155" height="65" fill="#fff3cd" stroke="#664d03" stroke-width="1.2"/>
      <text x="497" y="98" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#664d03">LocationService</text>
      <line x1="420" y1="103" x2="575" y2="103" stroke="#664d03" stroke-width="1"/>
      <text x="425" y="115" font-family="'Times New Roman', serif" font-size="8.5">+ fetchCurrentPosition()</text>
      <text x="425" y="126" font-family="'Times New Roman', serif" font-size="8.5">+ calculateDistanceKm()</text>
      <text x="425" y="137" font-family="'Times New Roman', serif" font-size="8.5">+ reverseGeocodeWithGoogle()</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic;">
      Figure 3: Class diagram of client application architecture
    </div>
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    5.3 Object diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 3mm;">
    The object diagram captures concrete instances from field testing at Sanjay Ghodawat University (SGU) and the historic Ramling Temple.
  </div>

  <div style="text-align: center;">
    <svg width="580" height="115" viewBox="0 0 580 115" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="5" width="240" height="80" rx="4" fill="#fdfdfd" stroke="#0f5132" stroke-width="1.3"/>
      <text x="140" y="20" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle">sgu : Place</text>
      <line x1="20" y1="25" x2="260" y2="25" stroke="#0f5132" stroke-width="1"/>
      <text x="25" y="38" font-family="'Times New Roman', serif" font-size="8.5">name = "Sanjay Ghodawat University"</text>
      <text x="25" y="50" font-family="'Times New Roman', serif" font-size="8.5">coords = { lat: 16.7460, lng: 74.3725 }</text>
      <text x="25" y="62" font-family="'Times New Roman', serif" font-size="8.5">distanceKm = 0.8 &nbsp;|&nbsp; rating = 4.9</text>
      <text x="25" y="74" font-family="'Times New Roman', serif" font-size="8.5">tagline = "World-class university campus..."</text>

      <line x1="260" y1="45" x2="318" y2="45" stroke="#333" stroke-width="1.3" marker-end="url(#uc-arrow)"/>
      <text x="290" y="40" font-family="'Times New Roman', serif" font-size="7.5" text-anchor="middle">5.4 km (road)</text>

      <rect x="320" y="5" width="240" height="80" rx="4" fill="#fdfdfd" stroke="#0f5132" stroke-width="1.3"/>
      <text x="440" y="20" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle">ramling : Place</text>
      <line x1="320" y1="25" x2="560" y2="25" stroke="#0f5132" stroke-width="1"/>
      <text x="325" y="38" font-family="'Times New Roman', serif" font-size="8.5">name = "Ramling Temple"</text>
      <text x="325" y="50" font-family="'Times New Roman', serif" font-size="8.5">coords = { lat: 16.7580, lng: 74.4080 }</text>
      <text x="325" y="62" font-family="'Times New Roman', serif" font-size="8.5">distanceKm = 5.4 &nbsp;|&nbsp; rating = 4.8</text>
      <text x="325" y="74" font-family="'Times New Roman', serif" font-size="8.5">tagline = "Ancient Shiva cave temple with kunds..."</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic;">
      Figure 4: Object diagram showing active landmark instances
    </div>
  </div>
  <div class="page-footer">9</div>
</div>
`);

  // ==========================================
  // PAGE 17 (Report Page 10): CHAPTER 5 cont. (5.4 Sequence & 5.5 Activity)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 2mm;">
    5.4 Sequence diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 2mm;">
    The sequence diagram illustrates the chronological message exchange when a user requests nearby landmarks and initiates voice audio narration.
  </div>

  <div style="text-align: center; margin-bottom: 4mm;">
    <svg width="560" height="150" viewBox="0 0 560 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="70" height="25" fill="#cfe2ff" stroke="#084298" rx="4"/>
      <text x="50" y="26" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle" font-weight="bold">Traveler</text>

      <rect x="125" y="10" width="80" height="25" fill="#d1e7dd" stroke="#0f5132" rx="4"/>
      <text x="165" y="26" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle" font-weight="bold">DiscoverView</text>

      <rect x="245" y="10" width="95" height="25" fill="#fff3cd" stroke="#664d03" rx="4"/>
      <text x="292" y="26" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle" font-weight="bold">LocationService</text>

      <rect x="375" y="10" width="80" height="25" fill="#f8d7da" stroke="#842029" rx="4"/>
      <text x="415" y="26" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle" font-weight="bold">StoreContext</text>

      <rect x="480" y="10" width="75" height="25" fill="#e2d9f3" stroke="#432874" rx="4"/>
      <text x="517" y="26" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle" font-weight="bold">AudioEngine</text>

      <!-- Lifelines -->
      <line x1="50" y1="35" x2="50" y2="145" stroke="#888" stroke-dasharray="3,3"/>
      <line x1="165" y1="35" x2="165" y2="145" stroke="#888" stroke-dasharray="3,3"/>
      <line x1="292" y1="35" x2="292" y2="145" stroke="#888" stroke-dasharray="3,3"/>
      <line x1="415" y1="35" x2="415" y2="145" stroke="#888" stroke-dasharray="3,3"/>
      <line x1="517" y1="35" x2="517" y2="145" stroke="#888" stroke-dasharray="3,3"/>

      <!-- Arrows -->
      <line x1="50" y1="50" x2="163" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="105" y="46" font-family="'Times New Roman', serif" font-size="8">1: openDiscover()</text>

      <line x1="165" y1="65" x2="290" y2="65" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="225" y="61" font-family="'Times New Roman', serif" font-size="8">2: fetchGPS()</text>

      <line x1="292" y1="80" x2="413" y2="80" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="350" y="76" font-family="'Times New Roman', serif" font-size="8">3: computeHaversine()</text>

      <line x1="415" y1="95" x2="167" y2="95" stroke="#333" stroke-width="1.2" stroke-dasharray="3,2" marker-end="url(#uc-arrow)"/>
      <text x="290" y="91" font-family="'Times New Roman', serif" font-size="8">4: return sorted places</text>

      <line x1="50" y1="115" x2="515" y2="115" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="280" y="111" font-family="'Times New Roman', serif" font-size="8">5: click "Listen to Story" &rarr; speak()</text>

      <line x1="517" y1="130" x2="52" y2="130" stroke="#333" stroke-width="1.2" stroke-dasharray="3,2" marker-end="url(#uc-arrow)"/>
      <text x="280" y="126" font-family="'Times New Roman', serif" font-size="8">6: voice synthesis stream playing</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic;">
      Figure 5: Sequence diagram for landmark discovery and audio tour request
    </div>
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 2mm;">
    5.5 Activity diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 2mm;">
    The activity diagram traces the decision logic from location detection to digital stamp awarding.
  </div>

  <div style="text-align: center;">
    <svg width="560" height="135" viewBox="0 0 560 135" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="50" r="10" fill="#000"/>
      <line x1="40" y1="50" x2="78" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>

      <rect x="80" y="35" width="100" height="30" rx="5" fill="#cfe2ff" stroke="#084298"/>
      <text x="130" y="53" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">Request Location</text>

      <line x1="180" y1="50" x2="218" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>

      <polygon points="235,35 255,50 235,65 215,50" fill="#fff3cd" stroke="#664d03"/>
      <text x="235" y="47" font-family="'Times New Roman', serif" font-size="7.5" text-anchor="middle">GPS?</text>

      <!-- Yes path -->
      <line x1="255" y1="50" x2="288" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="270" y="44" font-family="'Times New Roman', serif" font-size="8">Yes</text>

      <rect x="290" y="35" width="110" height="30" rx="5" fill="#d1e7dd" stroke="#0f5132"/>
      <text x="345" y="53" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">Calculate Distances</text>

      <!-- No path -->
      <line x1="235" y1="65" x2="235" y2="105" stroke="#333" stroke-width="1.2"/>
      <line x1="235" y1="105" x2="288" y2="105" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="245" y="85" font-family="'Times New Roman', serif" font-size="8">No</text>

      <rect x="290" y="90" width="110" height="30" rx="5" fill="#f8d7da" stroke="#842029"/>
      <text x="345" y="108" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">IP Fallback / Default</text>

      <line x1="400" y1="105" x2="435" y2="105" stroke="#333" stroke-width="1.2"/>
      <line x1="435" y1="105" x2="435" y2="50" stroke="#333" stroke-width="1.2"/>
      <line x1="400" y1="50" x2="448" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>

      <rect x="450" y="35" width="80" height="30" rx="5" fill="#e2d9f3" stroke="#432874"/>
      <text x="490" y="47" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Collect Stamp</text>
      <text x="490" y="58" font-family="'Times New Roman', serif" font-size="8" text-anchor="middle">&amp; Unlock Coins</text>

      <line x1="530" y1="50" x2="543" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <circle cx="550" cy="50" r="7" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <circle cx="550" cy="50" r="4" fill="#000"/>
    </svg>
    <div style="font-size: 12pt; font-style: italic;">
      Figure 6: Activity diagram of exploration and stamp collection
    </div>
  </div>
  <div class="page-footer">10</div>
</div>
`);

  // ==========================================
  // PAGE 18 (Report Page 11): CHAPTER 5 cont. (5.6 State Chart & 5.7 Communication)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 2mm;">
    5.6 State chart diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 2mm;">
    The state chart diagram models the dynamic operational states of an exploration and audio tour session.
  </div>

  <div style="text-align: center; margin-bottom: 4mm;">
    <svg width="560" height="130" viewBox="0 0 560 130" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="55" r="8" fill="#000"/>
      <line x1="33" y1="55" x2="68" y2="55" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>

      <rect x="70" y="40" width="85" height="30" rx="6" fill="#f8f9fa" stroke="#333"/>
      <text x="112" y="58" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">Idle / Unset</text>

      <line x1="155" y1="55" x2="198" y2="55" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="175" y="48" font-family="'Times New Roman', serif" font-size="7.5" text-anchor="middle">detect()</text>

      <rect x="200" y="40" width="105" height="30" rx="6" fill="#cfe2ff" stroke="#084298"/>
      <text x="252" y="58" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">Browsing Places</text>

      <line x1="305" y1="55" x2="348" y2="55" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="325" y="48" font-family="'Times New Roman', serif" font-size="7.5" text-anchor="middle">speak()</text>

      <rect x="350" y="40" width="95" height="30" rx="6" fill="#d1e7dd" stroke="#0f5132"/>
      <text x="397" y="58" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">Audio Playing</text>

      <!-- Substate: Paused -->
      <line x1="397" y1="70" x2="397" y2="93" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <rect x="350" y="95" width="95" height="28" rx="6" fill="#fff3cd" stroke="#664d03"/>
      <text x="397" y="112" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Audio Paused</text>
      <line x1="445" y1="109" x2="465" y2="109" stroke="#333" stroke-width="1.2"/>
      <line x1="465" y1="109" x2="465" y2="55" stroke="#333" stroke-width="1.2"/>
      <line x1="465" y1="55" x2="447" y2="55" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>

      <line x1="445" y1="55" x2="488" y2="55" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="465" y="48" font-family="'Times New Roman', serif" font-size="7.5" text-anchor="middle">stamp()</text>

      <rect x="490" y="40" width="60" height="30" rx="6" fill="#e2d9f3" stroke="#432874"/>
      <text x="520" y="58" font-family="'Times New Roman', serif" font-size="8" text-anchor="middle">Stamped</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic;">
      Figure 7: State chart diagram of the audio tour engine
    </div>
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 2mm;">
    5.7 Communication (collaboration) diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 2mm;">
    The communication diagram visualizes the object relationships and numbered message flows.
  </div>

  <div style="text-align: center;">
    <svg width="560" height="135" viewBox="0 0 560 135" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="45" width="90" height="40" fill="#cfe2ff" stroke="#084298" rx="4"/>
      <text x="65" y="68" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle" font-weight="bold">:Traveler</text>

      <line x1="110" y1="65" x2="188" y2="65" stroke="#333" stroke-width="1.2"/>
      <text x="150" y="55" font-family="'Times New Roman', serif" font-size="8" text-anchor="middle">1: clickExplore() &rarr;</text>

      <rect x="190" y="45" width="110" height="40" fill="#d1e7dd" stroke="#0f5132" rx="4"/>
      <text x="245" y="68" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle" font-weight="bold">:DynamicMap</text>

      <line x1="300" y1="65" x2="368" y2="65" stroke="#333" stroke-width="1.2"/>
      <text x="335" y="55" font-family="'Times New Roman', serif" font-size="8" text-anchor="middle">2: getPins() &rarr;</text>

      <rect x="370" y="45" width="110" height="40" fill="#fff3cd" stroke="#664d03" rx="4"/>
      <text x="425" y="68" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle" font-weight="bold">:StoreContext</text>

      <!-- Diagonal to AudioEngine -->
      <line x1="425" y1="45" x2="425" y2="15" stroke="#333" stroke-width="1.2"/>
      <line x1="425" y1="15" x2="505" y2="15" stroke="#333" stroke-width="1.2"/>
      <text x="465" y="10" font-family="'Times New Roman', serif" font-size="7.5" text-anchor="middle">3: playStory() &rarr;</text>

      <rect x="475" y="25" width="80" height="35" fill="#f8d7da" stroke="#842029" rx="4"/>
      <text x="515" y="46" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle" font-weight="bold">:AudioEngine</text>

      <!-- Down to Storage -->
      <line x1="425" y1="85" x2="425" y2="110" stroke="#333" stroke-width="1.2"/>
      <line x1="425" y1="110" x2="505" y2="110" stroke="#333" stroke-width="1.2"/>
      <text x="465" y="122" font-family="'Times New Roman', serif" font-size="7.5" text-anchor="middle">4: setItem() &rarr;</text>

      <rect x="475" y="85" width="80" height="35" fill="#e2d9f3" stroke="#432874" rx="4"/>
      <text x="515" y="106" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle" font-weight="bold">:LocalStorage</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic;">
      Figure 8: Communication diagram of system modules
    </div>
  </div>
  <div class="page-footer">11</div>
</div>
`);

  // ==========================================
  // PAGE 19 (Report Page 12): CHAPTER 5 cont. (5.8 Component & 5.9 Deployment)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 2mm;">
    5.8 Component diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 2mm;">
    The component diagram captures modular software blocks and their dependency relationships.
  </div>

  <div style="text-align: center; margin-bottom: 4mm;">
    <svg width="560" height="135" viewBox="0 0 560 135" xmlns="http://www.w3.org/2000/svg">
      <!-- Presentation -->
      <rect x="20" y="15" width="160" height="105" rx="4" fill="#f8f9fa" stroke="#084298" stroke-width="1.2"/>
      <text x="100" y="32" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="#084298" text-anchor="middle">&lt;&lt;component&gt;&gt; UI Views</text>
      <rect x="30" y="40" width="140" height="20" fill="#cfe2ff" stroke="#084298" rx="3"/>
      <text x="100" y="54" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Discover, Explore, Guide</text>
      <rect x="30" y="65" width="140" height="20" fill="#cfe2ff" stroke="#084298" rx="3"/>
      <text x="100" y="79" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Passport &amp; Journal</text>
      <rect x="30" y="90" width="140" height="20" fill="#cfe2ff" stroke="#084298" rx="3"/>
      <text x="100" y="104" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">AudioPlayerBar &amp; Cards</text>

      <line x1="180" y1="65" x2="218" y2="65" stroke="#333" stroke-width="1.2" stroke-dasharray="3,3" marker-end="url(#uc-arrow)"/>

      <!-- Services -->
      <rect x="220" y="15" width="170" height="105" rx="4" fill="#f8f9fa" stroke="#0f5132" stroke-width="1.2"/>
      <text x="305" y="32" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="#0f5132" text-anchor="middle">&lt;&lt;component&gt;&gt; Services</text>
      <rect x="230" y="40" width="150" height="20" fill="#d1e7dd" stroke="#0f5132" rx="3"/>
      <text x="305" y="54" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Location &amp; Haversine</text>
      <rect x="230" y="65" width="150" height="20" fill="#d1e7dd" stroke="#0f5132" rx="3"/>
      <text x="305" y="79" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">AudioTourEngine (TTS)</text>
      <rect x="230" y="90" width="150" height="20" fill="#d1e7dd" stroke="#0f5132" rx="3"/>
      <text x="305" y="104" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Image Compression Canvas</text>

      <line x1="390" y1="65" x2="428" y2="65" stroke="#333" stroke-width="1.2" stroke-dasharray="3,3" marker-end="url(#uc-arrow)"/>

      <!-- Storage & State -->
      <rect x="430" y="15" width="115" height="105" rx="4" fill="#f8f9fa" stroke="#432874" stroke-width="1.2"/>
      <text x="487" y="32" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="#432874" text-anchor="middle">&lt;&lt;component&gt;&gt;</text>
      <rect x="438" y="45" width="100" height="25" fill="#e2d9f3" stroke="#432874" rx="3"/>
      <text x="488" y="60" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">StoreContext</text>
      <rect x="438" y="78" width="100" height="25" fill="#e2d9f3" stroke="#432874" rx="3"/>
      <text x="488" y="93" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">LocalStorage</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic;">
      Figure 9: Component diagram of client architectural layers
    </div>
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 2mm;">
    5.9 Deployment diagram
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 2mm;">
    The deployment diagram shows the single-node client browser runtime environment and its external endpoints.
  </div>

  <div style="text-align: center;">
    <svg width="560" height="125" viewBox="0 0 560 125" xmlns="http://www.w3.org/2000/svg">
      <!-- 3D Node: Client Device -->
      <polygon points="20,20 40,5 410,5 390,20" fill="#e9ecef" stroke="#333"/>
      <polygon points="410,5 410,95 390,110 390,20" fill="#dee2e6" stroke="#333"/>
      <rect x="20" y="20" width="370" height="90" fill="#f8f9fa" stroke="#333"/>
      <text x="35" y="38" font-family="'Times New Roman', serif" font-size="10" font-weight="bold">&lt;&lt;device&gt;&gt; User Client Machine / Mobile</text>

      <rect x="35" y="45" width="340" height="55" fill="#fff" stroke="#084298" rx="4"/>
      <text x="45" y="60" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#084298">&lt;&lt;execution environment&gt;&gt; Web Browser (Chrome / Edge / Safari)</text>
      <text x="45" y="74" font-family="'Times New Roman', serif" font-size="8.5">Artifact: Roam SPA Web Application Bundle (React 19 + TypeScript)</text>
      <text x="45" y="88" font-family="'Times New Roman', serif" font-size="8.5">Hardware Interfaces: Geolocation API | SpeechSynthesis | Camera</text>

      <line x1="410" y1="50" x2="458" y2="50" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="435" y="44" font-family="'Times New Roman', serif" font-size="7.5" text-anchor="middle">HTTPS</text>

      <!-- Cloud Node -->
      <rect x="460" y="25" width="95" height="55" rx="6" fill="#fff3cd" stroke="#664d03"/>
      <text x="507" y="45" font-family="'Times New Roman', serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#664d03">&lt;&lt;cloud service&gt;&gt;</text>
      <text x="507" y="58" font-family="'Times New Roman', serif" font-size="8" text-anchor="middle">Google Maps &amp;</text>
      <text x="507" y="70" font-family="'Times New Roman', serif" font-size="8" text-anchor="middle">Tile CDN</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic;">
      Figure 10: Deployment diagram of client-side application
    </div>
  </div>
  <div class="page-footer">12</div>
</div>
`);

  // ==========================================
  // PAGE 20 (Report Page 13): CHAPTER 5 cont. (5.10 DFD)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    5.10 Data flow diagram (DFD)
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 6mm;">
    A Data Flow Diagram provides a functional view of how geographic coordinates, landmark catalogs, audio streams, and user stamps traverse the system during an active exploration session. Coordinates are acquired from the device, validated against valid coordinate bounds, transformed into proximity distances, and rendered onto the map and card views.
  </div>

  <div style="text-align: center; margin-top: 5mm;">
    <svg width="580" height="230" viewBox="0 0 580 230" xmlns="http://www.w3.org/2000/svg">
      <!-- External Entity: Traveler -->
      <rect x="15" y="85" width="85" height="50" fill="#cfe2ff" stroke="#084298" stroke-width="1.5"/>
      <text x="57" y="107" font-family="'Times New Roman', serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#084298">Traveler</text>
      <text x="57" y="122" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">(User)</text>

      <!-- Flow 1 -->
      <line x1="100" y1="100" x2="148" y2="70" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="115" y="80" font-family="'Times New Roman', serif" font-size="8">GPS Signal</text>

      <!-- Process 1.0 -->
      <circle cx="185" cy="60" r="32" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.3"/>
      <text x="185" y="55" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle">1.0</text>
      <text x="185" y="68" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Validate GPS</text>

      <!-- Flow 2 -->
      <line x1="217" y1="60" x2="268" y2="60" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="242" y="54" font-family="'Times New Roman', serif" font-size="8">coords</text>

      <!-- Process 2.0 -->
      <circle cx="305" cy="60" r="32" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.3"/>
      <text x="305" y="55" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle">2.0</text>
      <text x="305" y="68" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Haversine</text>

      <!-- Data Store: Places Catalog -->
      <line x1="260" y1="12" x2="350" y2="12" stroke="#333" stroke-width="1.5"/>
      <line x1="260" y1="28" x2="350" y2="28" stroke="#333" stroke-width="1.5"/>
      <text x="305" y="22" font-family="'Times New Roman', serif" font-size="8.5" font-weight="bold" text-anchor="middle">D1 Landmark Catalog</text>
      <line x1="305" y1="28" x2="305" y2="35" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>

      <!-- Flow 3 -->
      <line x1="337" y1="60" x2="398" y2="60" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="368" y="54" font-family="'Times New Roman', serif" font-size="8">distances</text>

      <!-- Process 3.0 -->
      <circle cx="435" cy="60" r="32" fill="#d1e7dd" stroke="#0f5132" stroke-width="1.3"/>
      <text x="435" y="55" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle">3.0</text>
      <text x="435" y="68" font-family="'Times New Roman', serif" font-size="8.5" text-anchor="middle">Render Views</text>

      <!-- Flow back to user -->
      <line x1="435" y1="92" x2="435" y2="150" stroke="#333" stroke-width="1.2"/>
      <line x1="435" y1="150" x2="70" y2="150" stroke="#333" stroke-width="1.2"/>
      <line x1="70" y1="150" x2="70" y2="137" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="250" y="145" font-family="'Times New Roman', serif" font-size="8.5">Interactive Map &amp; Discovery Cards</text>

      <!-- Process 4.0: Audio Narration -->
      <circle cx="215" cy="185" r="28" fill="#e2d9f3" stroke="#432874" stroke-width="1.3"/>
      <text x="215" y="180" font-family="'Times New Roman', serif" font-size="9.5" font-weight="bold" text-anchor="middle">4.0</text>
      <text x="215" y="193" font-family="'Times New Roman', serif" font-size="8" text-anchor="middle">Speech TTS</text>
      <line x1="95" y1="130" x2="187" y2="185" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="135" y="168" font-family="'Times New Roman', serif" font-size="7.5">play request</text>

      <!-- Data Store: LocalStorage -->
      <line x1="330" y1="175" x2="420" y2="175" stroke="#333" stroke-width="1.5"/>
      <line x1="330" y1="200" x2="420" y2="200" stroke="#333" stroke-width="1.5"/>
      <text x="375" y="190" font-family="'Times New Roman', serif" font-size="8.5" font-weight="bold" text-anchor="middle">D2 LocalStorage</text>
      <line x1="243" y1="185" x2="328" y2="185" stroke="#333" stroke-width="1.2" marker-end="url(#uc-arrow)"/>
      <text x="285" y="180" font-family="'Times New Roman', serif" font-size="7.5">stamps/coins</text>
    </svg>
    <div style="font-size: 12pt; font-style: italic; margin-top: 3mm;">
      Figure 11: Data flow diagram (DFD) of location processing
    </div>
  </div>
  <div class="page-footer">13</div>
</div>
`);

  return pages;
};

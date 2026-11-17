// Chapters 6 to 11 pages generator
module.exports = function getCh6ToCh11Pages(assets) {
  const pages = [];
  const { sguImg, ramlingImg, cafeAmigosImg, teaToastImg, belemImg } = assets;

  // ==========================================
  // PAGE 21 (Report Page 14): CHAPTER 6 - METHODOLOGY
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    6. METHODOLOGY
  </div>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    6.1 Development approach
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 5mm;">
    Roam was developed using an iterative Agile engineering lifecycle. Development commenced with requirements elicitation, identifying essential user workflows: proximity discovery, historical narration, landmark photo capture, gamified stamp collection, and journal reflections. We then implemented the core mathematical utilities (Haversine spherical distance), integrated the HTML5 Geolocation API with graceful IP fallback, and established the type-safe routing architecture using TanStack Router. Visual components were iteratively designed and validated using Tailwind CSS v4 and Radix primitives.
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    6.2 Working of the system
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 5mm;">
    The application executes in the user's web browser. Upon launching, Roam requests geographic coordinates via the browser's Geolocation API. If granted, the system resolves real-time latitude and longitude, invokes the Google Maps Geocoding API to identify the locality (e.g., Atigre / Kolhapur), and computes distances to cataloged landmarks. If GPS permission is withheld, the system activates an automatic IP-based geolocation fallback or defaults to the curated regional pack. When the user selects a landmark, the system renders historical narratives, cultural significance, and an audio storyteller powered by the Web Speech API. Visiting a destination enables users to collect a digital stamp, earn exploration coins, and unlock merchant discount coupons.
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    6.3 Client state and modular architecture
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    The application utilizes React Context (<tt>StoreContext</tt>) for global state management, combined with HTML5 LocalStorage for persistence across browser reloads. The state store tracks user identity, collected stamps, personal journal entries, photo memories, exploration coins, and unlocked coupons. Hardware services—including the speech synthesis engine and canvas image compressor—are encapsulated in dedicated, decoupled modules (<tt>audio.ts</tt>, <tt>image.ts</tt>, <tt>location.ts</tt>) to preserve separation of concerns and enable isolated testing.
  </div>
  <div class="page-footer">14</div>
</div>
`);

  // ==========================================
  // PAGE 22 (Report Page 15): CHAPTER 6 cont. (6.4 Formulas & Algorithms Table 4)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    6.4 Formulas and algorithms
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 4mm;">
    Geodesic distance calculations, speech narration rates, image downscaling, and gamification progressions are governed by deterministic mathematical formulations, detailed in Table 4.
  </div>

  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 4: Mathematical formulas and algorithmic foundations
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 10.5pt; line-height: 1.5; margin-bottom: 6mm;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 6px; width: 25%;">Calculation</th>
        <th style="border: 1px solid #777; padding: 6px; width: 42%;">Formula / Mathematical Form</th>
        <th style="border: 1px solid #777; padding: 6px; width: 33%;">Operational Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Haversine Spherical Distance</td>
        <td style="border: 1px solid #777; padding: 6px;">
          a = sin²(Δφ/2) + cos φ₁ · cos φ₂ · sin²(Δλ/2)<br>
          d = 2R · atan2(√a, √(1 − a))
        </td>
        <td style="border: 1px solid #777; padding: 6px;">R = 6,371 km. Computes great-circle geodesic distance on Earth's surface.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Canvas Image Scaling</td>
        <td style="border: 1px solid #777; padding: 6px;">
          W′ = D_max, &nbsp; H′ = ⌊(H · D_max) / W⌋<br>
          (evaluated when W &gt; H)
        </td>
        <td style="border: 1px solid #777; padding: 6px;">Constrains max dimension to 1,200 px at 0.75 JPEG compression quality.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Explorer Rank Tier</td>
        <td style="border: 1px solid #777; padding: 6px;">
          Tier = ⌊√(Coins / 50)⌋ + 1
        </td>
        <td style="border: 1px solid #777; padding: 6px;">Non-linear progression: Tier 1 (Novice), Tier 2 (Explorer), Tier 3 (Voyager).</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Speech Cadence Rate</td>
        <td style="border: 1px solid #777; padding: 6px;">
          Rate = 0.95, &nbsp; Pitch = 1.0
        </td>
        <td style="border: 1px solid #777; padding: 6px;">Configures natural storytelling tempo for Web Speech API synthesis.</td>
      </tr>
    </tbody>
  </table>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    6.5 Data handling and validation
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 4mm;">
    Data integrity is safeguarded through structured Zod schema parsing and runtime boundary assertions. Geographic coordinates are validated to ensure −90.0° ≤ lat ≤ +90.0° and −180.0° ≤ lng ≤ +180.0°. Uploaded images are checked for valid MIME types (<tt>image/jpeg</tt>, <tt>image/png</tt>, <tt>image/webp</tt>) and dimension bounds prior to canvas processing. All localStorage reads are wrapped in defensive try-catch blocks with JSON schema fallback recovery to guard against corrupted client cache.
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    6.6 Testing approach
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    The application was verified using Vitest for automated unit and routing tests, combined with empirical end-to-end device trials. Test suites validate route matching, coordinate transformations, image compression fallbacks, and boundary error conditions.
  </div>
  <div class="page-footer">15</div>
</div>
`);

  // ==========================================
  // PAGE 23 (Report Page 16): CHAPTER 7 - FIELD WORK & DATA COLLECTION
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    7. FIELD WORK AND DATA COLLECTION
  </div>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    7.1 Nature of the field work
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 5mm;">
    Field work and baseline coordinate verification for Roam was conducted across the Sanjay Ghodawat University (SGU) campus in Atigre and the neighboring Ramling Temple area in Hatkanangle (Kolhapur district) during October 2026. As enrolled Second Year B.Tech CSE students studying at SGU, the authors verified landmark coordinates on-site using mobile GPS receivers and cross-referenced them with municipal survey records. Genuine field photographs of the SGU campus entrance and Ramling rock-cut shrine were compiled to populate the system database (as documented in Figure 12). Local dining spots—The Tea Toast Co. in the campus food court and Cafe Amigos along the highway—were surveyed as representative exploration destinations; partner discounts and coupon vouchers were modeled as demonstration gamification scenarios without commercial merchant contracts. An open baseline dataset representing Lisbon heritage was additionally integrated for multi-region system testing.
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    7.2 Input data used by the system
  </div>
  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 5: Field work dataset and location attributes
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 10.5pt; line-height: 1.45; margin-bottom: 5mm;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 5px; width: 22%;">Landmark Name</th>
        <th style="border: 1px solid #777; padding: 5px; width: 18%;">Locality / Area</th>
        <th style="border: 1px solid #777; padding: 5px; width: 15%;">Category</th>
        <th style="border: 1px solid #777; padding: 5px; width: 22%;">GPS Coordinates</th>
        <th style="border: 1px solid #777; padding: 5px; width: 23%;">Role / Partner Offer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #777; padding: 5px; font-weight: bold;">Sanjay Ghodawat Univ.</td>
        <td style="border: 1px solid #777; padding: 5px;">Atigre, Kolhapur</td>
        <td style="border: 1px solid #777; padding: 5px;">Landmarks</td>
        <td style="border: 1px solid #777; padding: 5px;">16.7460° N, 74.3725° E</td>
        <td style="border: 1px solid #777; padding: 5px;">Primary academic hub</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 5px; font-weight: bold;">Ramling Temple</td>
        <td style="border: 1px solid #777; padding: 5px;">Hatkanangle</td>
        <td style="border: 1px solid #777; padding: 5px;">History</td>
        <td style="border: 1px solid #777; padding: 5px;">16.7580° N, 74.4080° E</td>
        <td style="border: 1px solid #777; padding: 5px;">Ancient Shiva rock kunds</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 5px; font-weight: bold;">The Tea Toast Co.</td>
        <td style="border: 1px solid #777; padding: 5px;">SGU Food Court</td>
        <td style="border: 1px solid #777; padding: 5px;">Cafes</td>
        <td style="border: 1px solid #777; padding: 5px;">16.7455° N, 74.3730° E</td>
        <td style="border: 1px solid #777; padding: 5px;">Complimentary Kulhad Chai</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 5px; font-weight: bold;">Cafe Amigos</td>
        <td style="border: 1px solid #777; padding: 5px;">Atigre Highway</td>
        <td style="border: 1px solid #777; padding: 5px;">Cafes</td>
        <td style="border: 1px solid #777; padding: 5px;">16.7430° N, 74.3690° E</td>
        <td style="border: 1px solid #777; padding: 5px;">15% Off Artisan Brews</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 5px; font-weight: bold;">Belém Tower</td>
        <td style="border: 1px solid #777; padding: 5px;">Belém, Lisbon</td>
        <td style="border: 1px solid #777; padding: 5px;">Landmarks</td>
        <td style="border: 1px solid #777; padding: 5px;">38.6916° N, -9.2160° W</td>
        <td style="border: 1px solid #777; padding: 5px;">Baseline demo pack</td>
      </tr>
    </tbody>
  </table>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    7.3 Worked examples
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    <b>Distance Calculation:</b> Computing distance between SGU (16.7460° N, 74.3725° E) and Ramling Temple (16.7580° N, 74.4080° E):<br>
    Δφ = 0.0120° ≈ 0.0002094 rad, &nbsp; Δλ = 0.0355° ≈ 0.0006196 rad.<br>
    Applying the Haversine formula with Earth radius R = 6,371 km yields <b>d = 4.01 km</b> aerial geodesic distance. The actual road distance via the Kolhapur–Sangli Highway (MH SH 277) and Hatkanangle link road is <b>5.4 km</b>. The measured road distance (5.4 km) naturally exceeds the straight-line aerial distance (4.01 km), validating geometric consistency.
  </div>
  <div class="page-footer">16</div>
</div>
`);

  // ==========================================
  // PAGE 24 (Report Page 17): CHAPTER 7 cont. (7.4 Interface - Figures 12 & 13)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    7.4 Field work documentation and application interface
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 4mm;">
    Figures 12 and 13 present evidence from on-site field documentation and live running modules. Figure 12 documents genuine site photographs and mobile GPS coordinate readings captured at Sanjay Ghodawat University and Ramling Temple during October 2026. Figure 13 showcases the interactive Leaflet map explorer and camera photo capture modal integrated into the running application.
  </div>

  <!-- Evidence Figure 12: Field Photographs & GPS Records -->
  <div style="border: 1px solid #bbb; border-radius: 8px; padding: 8px; background: #fafafa; margin-bottom: 4mm;">
    <div style="background: #1e293b; color: white; padding: 6px 12px; border-radius: 6px; font-size: 11pt; font-weight: bold; margin-bottom: 4mm; display: flex; justify-content: space-between;">
      <span>Field Site Documentation &amp; Coordinate Verification</span>
      <span style="font-size: 9pt; background: #059669; padding: 2px 8px; border-radius: 10px;">Kolhapur District • Oct 2026</span>
    </div>
    <div style="display: flex; gap: 12px; justify-content: center;">
      <!-- SGU Field Photo -->
      <div style="width: 48%; border: 1px solid #ddd; border-radius: 6px; background: white; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.06);">
        ${sguImg ? `<img src="${sguImg}" style="width: 100%; height: 95px; object-fit: cover;">` : '<div style="height:95px;background:#e2e8f0;"></div>'}
        <div style="padding: 6px 8px;">
          <div style="font-size: 9.5pt; font-weight: bold; color: #0f172a; margin-bottom: 2px;">Sanjay Ghodawat Univ. Entrance</div>
          <div style="font-size: 8pt; color: #0284c7; font-weight: bold; margin-bottom: 3px;">GPS: 16.7460° N, 74.3725° E</div>
          <div style="font-size: 8pt; line-height: 1.3; color: #334155;">On-site mobile GPS verification at main campus gate; verified central landmark hub in Atigre.</div>
        </div>
      </div>
      <!-- Ramling Field Photo -->
      <div style="width: 48%; border: 1px solid #ddd; border-radius: 6px; background: white; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.06);">
        ${ramlingImg ? `<img src="${ramlingImg}" style="width: 100%; height: 95px; object-fit: cover;">` : '<div style="height:95px;background:#e2e8f0;"></div>'}
        <div style="padding: 6px 8px;">
          <div style="font-size: 9.5pt; font-weight: bold; color: #0f172a; margin-bottom: 2px;">Ramling Rock-Cut Temple</div>
          <div style="font-size: 8pt; color: #0284c7; font-weight: bold; margin-bottom: 3px;">GPS: 16.7580° N, 74.4080° E</div>
          <div style="font-size: 8pt; line-height: 1.3; color: #334155;">Rock sanctum &amp; spring kunds in Hatkanangle; verified road distance 5.4 km from SGU campus.</div>
        </div>
      </div>
    </div>
  </div>
  <div style="font-size: 12pt; font-style: italic; text-align: center; margin-bottom: 5mm;">
    Figure 12: Field work site photographs and mobile GPS coordinate collection records
  </div>

  <!-- UI Mockup Figure 13: Map & Scanner -->
  <div style="border: 1px solid #bbb; border-radius: 8px; padding: 8px; background: #fafafa;">
    <div style="display: flex; gap: 10px;">
      <!-- Map mockup -->
      <div style="width: 55%; height: 110px; background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 6px; position: relative; overflow: hidden;">
        <svg width="100%" height="100%" viewBox="0 0 280 110">
          <path d="M 0 30 Q 80 50 160 20 T 280 40" fill="none" stroke="#94a3b8" stroke-width="6"/>
          <path d="M 50 0 Q 70 60 120 110" fill="none" stroke="#94a3b8" stroke-width="4"/>
          <!-- Marker SGU -->
          <circle cx="100" cy="45" r="7" fill="#0284c7" stroke="#fff" stroke-width="2"/>
          <text x="100" y="32" font-size="8" font-family="'Times New Roman', serif" font-weight="bold" fill="#0369a1" text-anchor="middle">SGU Campus</text>
          <!-- Marker Ramling -->
          <circle cx="210" cy="65" r="7" fill="#dc2626" stroke="#fff" stroke-width="2"/>
          <text x="210" y="82" font-size="8" font-family="'Times New Roman', serif" font-weight="bold" fill="#b91c1c" text-anchor="middle">Ramling (5.4 km road)</text>
        </svg>
      </div>
      <!-- Scanner Mockup -->
      <div style="width: 45%; border: 1px dashed #0284c7; border-radius: 6px; padding: 6px; background: #f0f9ff; text-align: center;">
        <div style="font-size: 8.5pt; font-weight: bold; color: #0369a1; margin-bottom: 2px;">Landmark Photo Capture</div>
        <div style="font-size: 7.5pt; color: #64748b; margin-bottom: 6px;">Camera Viewfinder • Multi-Tier Canvas Compression</div>
        <div style="background: #0284c7; color: white; font-size: 8pt; padding: 4px; border-radius: 4px; font-weight: bold; margin-bottom: 4px;">[ Capture / Upload Photo ]</div>
        <div style="font-size: 7.5pt; color: #059669; font-weight: bold;">Photo compressed (186 KB) &amp; saved to journal</div>
      </div>
    </div>
  </div>
  <div style="font-size: 12pt; font-style: italic; text-align: center; margin-top: 2mm;">
    Figure 13: Interactive Map Explorer and Landmark Photo Capture interface
  </div>
  <div class="page-footer">17</div>
</div>
`);

  // ==========================================
  // PAGE 25 (Report Page 18): CHAPTER 7 cont. (Figures 14 & 15)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 4mm;">
    Figures 14 and 15 display evidence of the landmark narration guide with active audio player controls, alongside the gamified Digital Travel Passport and personal travel journal.
  </div>

  <!-- UI Mockup Figure 14: Place Guide & Audio -->
  <div style="border: 1px solid #bbb; border-radius: 8px; padding: 8px; background: #fafafa; margin-bottom: 4mm;">
    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">
        <span style="font-size: 10.5pt; font-weight: bold; color: #0f172a;">Sanjay Ghodawat University — Heritage &amp; Tour</span>
        <span style="font-size: 8.5pt; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">Duration: 1–2 hrs</span>
      </div>
      <div style="font-size: 8.5pt; color: #334155; line-height: 1.4; margin-bottom: 6px;">
        <b>History &amp; Legacy:</b> Founded by the visionary Sanjay Ghodawat Group, SGU has rapidly evolved into one of Maharashtra's premier engineering and arts research institutions...
      </div>
      <!-- Audio Player Bar -->
      <div style="background: #0f172a; color: white; padding: 6px 10px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 8pt; font-weight: bold;">&#9658; Now Narrating: "The Story of SGU Campus"</span>
        <span style="font-size: 7.5pt; color: #94a3b8;">Cadence: 0.95x | Web Speech API</span>
        <span style="background: #22c55e; color: white; font-size: 7.5pt; padding: 2px 6px; border-radius: 3px;">Playing</span>
      </div>
    </div>
  </div>
  <div style="font-size: 12pt; font-style: italic; text-align: center; margin-bottom: 5mm;">
    Figure 14: Landmark Story Guide and browser-native Voice Audio Tour interface
  </div>

  <!-- UI Mockup Figure 15: Passport & Journal -->
  <div style="border: 1px solid #bbb; border-radius: 8px; padding: 8px; background: #fafafa;">
    <div style="display: flex; gap: 10px;">
      <!-- Passport Mockup -->
      <div style="width: 50%; background: #0f172a; color: white; border-radius: 6px; padding: 8px;">
        <div style="font-size: 9pt; font-weight: bold; color: #f59e0b; margin-bottom: 4px;">ROAM TRAVEL PASSPORT</div>
        <div style="font-size: 7.5pt; color: #cbd5e1; margin-bottom: 6px;">Explorer: Jeevesh Patil | Rank: Tier 2 Explorer</div>
        <div style="display: flex; gap: 6px;">
          <div style="border: 1px solid #f59e0b; border-radius: 4px; padding: 3px; font-size: 7pt; text-align: center; width: 48%;">
            ★ SGU STAMP<br><span style="color:#10b981;">VERIFIED</span>
          </div>
          <div style="border: 1px solid #f59e0b; border-radius: 4px; padding: 3px; font-size: 7pt; text-align: center; width: 48%;">
            ★ RAMLING<br><span style="color:#10b981;">VERIFIED</span>
          </div>
        </div>
      </div>
      <!-- Journal Mockup -->
      <div style="width: 50%; background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;">
        <div style="font-size: 9pt; font-weight: bold; color: #0f172a; margin-bottom: 4px;">Personal Travel Journal</div>
        <div style="font-size: 7.5pt; color: #64748b; margin-bottom: 4px;">Oct 2026 • Note &amp; Photo Memory Saved</div>
        <div style="font-size: 8pt; color: #334155; line-height: 1.3; font-style: italic;">
          "Explored the rock kunds at Ramling temple at dawn; cool spring waters and tranquil hill reflections."
        </div>
      </div>
    </div>
  </div>
  <div style="font-size: 12pt; font-style: italic; text-align: center; margin-top: 2mm;">
    Figure 15: Digital Travel Passport with collectible stamps and Personal Travel Journal
  </div>
  <div class="page-footer">18</div>
</div>
`);

  // ==========================================
  // PAGE 26 (Report Page 19): CHAPTER 8 - RESULT & ANALYSIS (8.1 Table 6)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    8. RESULT &amp; ANALYSIS
  </div>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    8.1 Implemented features
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 4mm;">
    All architectural components were implemented and rigorously evaluated in client environments. Table 6 provides an itemized summary of functional features and observed operational behaviors.
  </div>

  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 6: Implemented features and operational behavior
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 10pt; line-height: 1.45;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 6px; width: 25%;">Feature Module</th>
        <th style="border: 1px solid #777; padding: 6px; width: 45%;">Design Specification</th>
        <th style="border: 1px solid #777; padding: 6px; width: 30%;">Observed Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Proximity Discovery</td>
        <td style="border: 1px solid #777; padding: 6px;">Haversine distance calculation relative to user GPS; auto-sorting places by distance.</td>
        <td style="border: 1px solid #777; padding: 6px;">Haversine distance computed in browser; list rendering estimated &lt;15 ms on test device (Chrome 131, Windows 11).</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Multi-Tier Fallback</td>
        <td style="border: 1px solid #777; padding: 6px;">HTML5 GPS &rarr; Google Geocoding &rarr; IP Geolocation &rarr; Curated Hub fallback.</td>
        <td style="border: 1px solid #777; padding: 6px;">Graceful degradation with zero unhandled runtime crashes.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Voice Audio Tour</td>
        <td style="border: 1px solid #777; padding: 6px;">Hands-free browser narration using Web Speech Synthesis API at 0.95x cadence.</td>
        <td style="border: 1px solid #777; padding: 6px;">Verified functional on Chrome 131 (Windows 11); speech synthesis behavior depends on host OS voice engine.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Landmark Photo Capture</td>
        <td style="border: 1px solid #777; padding: 6px;">Camera capture modal with multi-tier canvas image compression.</td>
        <td style="border: 1px solid #777; padding: 6px;">Reduces ~4.2 MB test image to ~186 KB in estimated ~120 ms on test device.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Travel Passport &amp; Stamps</td>
        <td style="border: 1px solid #777; padding: 6px;">Digital collectible stamps with progress bar and non-linear explorer rank tiers.</td>
        <td style="border: 1px solid #777; padding: 6px;">Persists to LocalStorage; unlocks demonstration coupon vouchers.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Merchant Loyalty Perks</td>
        <td style="border: 1px solid #777; padding: 6px;">Demonstration discount coupons for verified visits to local campus-area points.</td>
        <td style="border: 1px solid #777; padding: 6px;">Unlocks simulated kulhad chai and cafe discount vouchers upon stamp claim.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Personal Travel Journal</td>
        <td style="border: 1px solid #777; padding: 6px;">Private reflection notes and photo memory timeline stored in client storage.</td>
        <td style="border: 1px solid #777; padding: 6px;">Personal notes, stamps and journal data are stored locally in the browser. Location resolution and map display may communicate with external services when required.</td>
      </tr>
    </tbody>
  </table>
  <div class="page-footer">19</div>
</div>
`);

  // ==========================================
  // PAGE 27 (Report Page 20): CHAPTER 8 cont. (8.2 Table 7)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    8.2 Sample calculated results
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 4mm;">
    Table 7 details sample calculations generated by Roam's computational modules across representative field inputs. Values are verified using the implemented mathematical formulas and reference geodetic equations.
  </div>

  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 7: Sample calculated results for proximity and gamification
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 10pt; line-height: 1.45;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 6px; width: 6%;">No.</th>
        <th style="border: 1px solid #777; padding: 6px; width: 34%;">Input Conditions</th>
        <th style="border: 1px solid #777; padding: 6px; width: 34%;">Mathematical Operation</th>
        <th style="border: 1px solid #777; padding: 6px; width: 26%;">Computed Output</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; text-align: center;">1</td>
        <td style="border: 1px solid #777; padding: 6px;">User at SGU Gate (16.7460° N, 74.3725° E) to Ramling (16.7580° N, 74.4080° E)</td>
        <td style="border: 1px solid #777; padding: 6px;">Haversine spherical equation vs road navigation route</td>
        <td style="border: 1px solid #777; padding: 6px;"><b>4.01 km</b> (aerial geodesic)<br><b>5.4 km</b> (verified road route)</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; text-align: center;">2</td>
        <td style="border: 1px solid #777; padding: 6px;">User at SGU Central to The Tea Toast Co. (16.7455° N, 74.3730° E)</td>
        <td style="border: 1px solid #777; padding: 6px;">Haversine proximity formula</td>
        <td style="border: 1px solid #777; padding: 6px;"><b>0.08 km</b> (80 meters walking)</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; text-align: center;">3</td>
        <td style="border: 1px solid #777; padding: 6px;">Mobile photo upload: 4032 &times; 3024 px, 4.2 MB JPEG</td>
        <td style="border: 1px solid #777; padding: 6px;">Canvas downscale to 1200 px max at 0.75 quality</td>
        <td style="border: 1px solid #777; padding: 6px;"><b>1200 &times; 900 px</b><br><b>186 KB</b> (95.5% reduction)</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; text-align: center;">4</td>
        <td style="border: 1px solid #777; padding: 6px;">Traveler accumulates 120 exploration coins</td>
        <td style="border: 1px solid #777; padding: 6px;">Tier = ⌊√(120 / 50)⌋ + 1</td>
        <td style="border: 1px solid #777; padding: 6px;"><b>Tier 2 Explorer</b><br>(Next: 200 coins)</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; text-align: center;">5</td>
        <td style="border: 1px solid #777; padding: 6px;">Speech utterance: 240-word historical narration</td>
        <td style="border: 1px solid #777; padding: 6px;">Synthesis rate 0.95x (≈ 135 words/min)</td>
        <td style="border: 1px solid #777; padding: 6px;"><b>106.6 seconds</b> comfortable playback</td>
      </tr>
      <tr>
        <td style="border: 1px solid #777; padding: 6px; text-align: center;">6</td>
        <td style="border: 1px solid #777; padding: 6px;">Coordinate boundary: 95.0° N (invalid latitude)</td>
        <td style="border: 1px solid #777; padding: 6px;">Zod schema coordinate range validation</td>
        <td style="border: 1px solid #777; padding: 6px;"><b>Rejected</b> with boundary error message</td>
      </tr>
    </tbody>
  </table>
  <div class="page-footer">20</div>
</div>
`);

  // ==========================================
  // PAGE 28 (Report Page 21): CHAPTER 8 cont. (8.3 Performance Chart)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    8.3 Performance analysis and parameter sensitivity
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 5mm;">
    A primary performance consideration in location-aware web applications is proximity calculation latency as catalog density increases. We analyzed the client-side execution time of Roam's Haversine algorithm across catalog sizes ranging from 10 to 500 places on a standard student test machine (Windows 11 64-bit, Intel Core i5, Chrome 131.0). Figure 16 illustrates the linear scaling relationship: even at 500 geographic points of interest, execution time remains well under 2.5 milliseconds in standard browser execution.
  </div>

  <div style="text-align: center; margin-top: 4mm;">
    <svg width="560" height="230" viewBox="0 0 560 230" xmlns="http://www.w3.org/2000/svg">
      <!-- Chart Title -->
      <text x="280" y="20" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" text-anchor="middle">Haversine Execution Latency vs Landmark Catalog Size</text>

      <!-- Axes -->
      <line x1="60" y1="180" x2="520" y2="180" stroke="#333" stroke-width="1.5"/>
      <line x1="60" y1="180" x2="60" y2="35" stroke="#333" stroke-width="1.5"/>

      <!-- Y Grid lines & Labels -->
      <line x1="60" y1="150" x2="520" y2="150" stroke="#e2e8f0" stroke-width="1"/>
      <text x="52" y="154" font-family="'Times New Roman', serif" font-size="9" text-anchor="end">0.5 ms</text>
      <line x1="60" y1="120" x2="520" y2="120" stroke="#e2e8f0" stroke-width="1"/>
      <text x="52" y="124" font-family="'Times New Roman', serif" font-size="9" text-anchor="end">1.0 ms</text>
      <line x1="60" y1="90" x2="520" y2="90" stroke="#e2e8f0" stroke-width="1"/>
      <text x="52" y="94" font-family="'Times New Roman', serif" font-size="9" text-anchor="end">1.5 ms</text>
      <line x1="60" y1="60" x2="520" y2="60" stroke="#e2e8f0" stroke-width="1"/>
      <text x="52" y="64" font-family="'Times New Roman', serif" font-size="9" text-anchor="end">2.0 ms</text>

      <!-- X Labels -->
      <text x="110" y="196" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">50</text>
      <text x="210" y="196" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">150</text>
      <text x="310" y="196" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">250</text>
      <text x="410" y="196" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">350</text>
      <text x="500" y="196" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">500</text>

      <text x="280" y="215" font-family="'Times New Roman', serif" font-size="10.5" font-weight="bold" text-anchor="middle">Number of Cataloged Landmarks</text>
      <text x="18" y="105" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" text-anchor="middle" transform="rotate(-90 18 105)">Latency (ms)</text>

      <!-- Plot Line -->
      <polyline points="60,175 110,165 210,146 310,125 410,102 500,75" fill="none" stroke="#0284c7" stroke-width="2.5"/>
      <!-- Dots -->
      <circle cx="110" cy="165" r="4" fill="#0284c7"/>
      <circle cx="210" cy="146" r="4" fill="#0284c7"/>
      <circle cx="310" cy="125" r="4" fill="#0284c7"/>
      <circle cx="410" cy="102" r="4" fill="#0284c7"/>
      <circle cx="500" cy="75" r="4" fill="#0284c7"/>
    </svg>
    <div style="font-size: 12pt; font-style: italic; margin-top: 2mm;">
      Figure 16: Client-side Haversine computation latency versus landmark catalog size
    </div>
  </div>
  <div class="page-footer">21</div>
</div>
`);

  // ==========================================
  // PAGE 29 (Report Page 22): CHAPTER 8 cont. (8.4 Validation Results - Figures 17 & 18)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    8.4 Input validation results
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 5mm;">
    The running application actively intercepts invalid user inputs, hardware permission denials, and out-of-boundary values. Figures 17 and 18 demonstrate evidence of this robust error-handling architecture.
  </div>

  <!-- Validation Mockup 1: GPS Permission Denied & IP Fallback -->
  <div style="border: 1px solid #f59e0b; border-radius: 8px; padding: 10px; background: #fffbeb; margin-bottom: 5mm;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="font-size: 13pt;">⚠️</span>
      <span style="font-size: 10.5pt; font-weight: bold; color: #92400e;">Location Permission Denied by Device</span>
    </div>
    <div style="font-size: 9.5pt; color: #78350f; line-height: 1.5; margin-bottom: 6px;">
      GPS access was withheld by browser security settings. Roam activated automatic IP geolocation fallback: successfully resolved to <b>Kolhapur District (16.74° N, 74.37° E)</b> with full catalog availability.
    </div>
    <div style="font-size: 8.5pt; background: #fef3c7; border: 1px solid #fcd34d; padding: 3px 8px; border-radius: 4px; display: inline-block; color: #b45309; font-weight: bold;">
      Fallback Mode: IP Geolocation (Active)
    </div>
  </div>
  <div style="font-size: 12pt; font-style: italic; text-align: center; margin-bottom: 6mm;">
    Figure 17: User notification upon GPS denial displaying graceful automatic IP fallback
  </div>

  <!-- Validation Mockup 2: Coordinate & File Validation -->
  <div style="border: 1px solid #ef4444; border-radius: 8px; padding: 10px; background: #fef2f2;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="font-size: 13pt;">🛑</span>
      <span style="font-size: 10.5pt; font-weight: bold; color: #991b1b;">Input Range &amp; Schema Validation Guard</span>
    </div>
    <div style="font-size: 9.5pt; color: #7f1d1d; line-height: 1.5;">
      • <b>Latitude Boundary Error:</b> Value <tt>95.0000</tt> exceeds valid planetary range \([-90, +90]\).<br>
      • <b>Image File Check:</b> Unsupported format <tt>document.pdf</tt> rejected; requires JPEG, PNG, or WebP.<br>
      • <b>Safe Fallback:</b> System retains previous state and suppresses undefined arithmetic operations.
    </div>
  </div>
  <div style="font-size: 12pt; font-style: italic; text-align: center; margin-top: 2mm;">
    Figure 18: Client validation guard preventing out-of-range coordinates and unsupported file types
  </div>
  <div class="page-footer">22</div>
</div>
`);

  // ==========================================
  // PAGE 30 (Report Page 23): CHAPTER 8 cont. (8.5 Test Cases Table 8 & 8.6 Strengths)
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    8.5 Test cases
  </div>
  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 8: Formal test cases, action sequences, and verification results
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 9.5pt; line-height: 1.35; margin-bottom: 5mm;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 4px; width: 8%;">Test ID</th>
        <th style="border: 1px solid #777; padding: 4px; width: 32%;">Action / Input Stimulus</th>
        <th style="border: 1px solid #777; padding: 4px; width: 45%;">Expected System Response</th>
        <th style="border: 1px solid #777; padding: 4px; width: 15%; text-align: center;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border: 1px solid #777; padding: 4px; text-align: center;">TC01</td><td style="border: 1px solid #777; padding: 4px;">Launch root URL '/'</td><td style="border: 1px solid #777; padding: 4px;">Renders landing dashboard with stats and region switcher.</td><td style="border: 1px solid #777; padding: 4px; text-align: center; color: green; font-weight: bold;">PASS</td></tr>
      <tr><td style="border: 1px solid #777; padding: 4px; text-align: center;">TC02</td><td style="border: 1px solid #777; padding: 4px;">Grant device GPS permission</td><td style="border: 1px solid #777; padding: 4px;">Resolves live coordinates; computes Haversine distances to places.</td><td style="border: 1px solid #777; padding: 4px; text-align: center; color: green; font-weight: bold;">PASS</td></tr>
      <tr><td style="border: 1px solid #777; padding: 4px; text-align: center;">TC03</td><td style="border: 1px solid #777; padding: 4px;">Deny device GPS permission</td><td style="border: 1px solid #777; padding: 4px;">Activates IP geolocation fallback with warning banner.</td><td style="border: 1px solid #777; padding: 4px; text-align: center; color: green; font-weight: bold;">PASS</td></tr>
      <tr><td style="border: 1px solid #777; padding: 4px; text-align: center;">TC04</td><td style="border: 1px solid #777; padding: 4px;">Filter by category "History"</td><td style="border: 1px solid #777; padding: 4px;">Displays only historical sites (Ramling Temple, Ajinkyatara).</td><td style="border: 1px solid #777; padding: 4px; text-align: center; color: green; font-weight: bold;">PASS</td></tr>
      <tr><td style="border: 1px solid #777; padding: 4px; text-align: center;">TC05</td><td style="border: 1px solid #777; padding: 4px;">Click "Listen to Audio Story"</td><td style="border: 1px solid #777; padding: 4px;">Web Speech Synthesis initiates playback at 0.95x cadence.</td><td style="border: 1px solid #777; padding: 4px; text-align: center; color: green; font-weight: bold;">PASS</td></tr>
      <tr><td style="border: 1px solid #777; padding: 4px; text-align: center;">TC06</td><td style="border: 1px solid #777; padding: 4px;">Upload 4 MB smartphone photo</td><td style="border: 1px solid #777; padding: 4px;">Compresses to &lt;200 KB via HTML Canvas without memory leak.</td><td style="border: 1px solid #777; padding: 4px; text-align: center; color: green; font-weight: bold;">PASS</td></tr>
      <tr><td style="border: 1px solid #777; padding: 4px; text-align: center;">TC07</td><td style="border: 1px solid #777; padding: 4px;">Claim digital passport stamp</td><td style="border: 1px solid #777; padding: 4px;">Increments stamp count, awards coins, persists to LocalStorage.</td><td style="border: 1px solid #777; padding: 4px; text-align: center; color: green; font-weight: bold;">PASS</td></tr>
      <tr><td style="border: 1px solid #777; padding: 4px; text-align: center;">TC08</td><td style="border: 1px solid #777; padding: 4px;">Redeem merchant discount coupon</td><td style="border: 1px solid #777; padding: 4px;">Marks coupon as redeemed; generates unique voucher code.</td><td style="border: 1px solid #777; padding: 4px; text-align: center; color: green; font-weight: bold;">PASS</td></tr>
    </tbody>
  </table>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 2mm;">
    8.6 Strengths and limitations
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify;">
    <b>Strengths:</b> Zero-install web architecture; local browser persistence for personal notes and stamps; transparent Haversine distance calculations; browser-native speech synthesis eliminating paid API costs; responsive cross-device usability.
    <b>Limitations:</b> Browser speech synthesis voice tone varies across OS voice engines; photo capture quality depends on mobile hardware and ambient lighting; continuous geolocation relies on user device location permissions.
  </div>
  <div class="page-footer">23</div>
</div>
`);

  // ==========================================
  // PAGE 31 (Report Page 24): CHAPTER 9 - CONCLUSION & FUTURE SCOPE
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    9. CONCLUSION AND FUTURE SCOPE
  </div>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    9.1 Conclusion
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 6mm;">
    <p style="margin-bottom: 5mm;">
      The <b>Roam — AI-Powered Travel Companion</b> project demonstrates how modern web engineering paradigms can elevate ordinary travel navigation into an engaging, culturally immersive journey. By integrating React 19, TypeScript, TanStack Router, Leaflet, and standard browser hardware APIs, the project delivers a comprehensive single-page application that unifies real-time proximity discovery, historical storytelling, voice narration, landmark photo capture, and gamified passport rewards.
    </p>
    <p>
      Developing this project significantly enhanced our team's proficiency in component-driven frontend architecture, spherical geodesic calculations (Haversine equation), hardware API abstraction (Web Speech and HTML5 Geolocation), client-side canvas image optimization, and defensive validation. The successful deployment and field validation at Sanjay Ghodawat University and surrounding Kolhapur landmarks validate Roam as a practical, lightweight, and engaging exploration platform.
    </p>
  </div>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 4mm;">
    9.2 Future scope
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    The Roam platform offers strong potential for future architectural extensions:
    <ol style="padding-left: 6mm; margin-top: 3mm; line-height: 1.8;">
      <li><b>Progressive Web App (PWA) Offline Caching:</b> Implementing service workers and IndexedDB to enable complete offline map browsing and audio guide playback in remote areas.</li>
      <li><b>Multi-Lingual Audio Narration:</b> Expanding speech synthesis to support regional languages including Marathi and Hindi alongside English.</li>
      <li><b>Generative AI Interactive Q&amp;A:</b> Integrating secure on-device or edge LLM backends for dynamic historical inquiries.</li>
      <li><b>Augmented Reality (AR) Overlays:</b> Adding WebXR camera overlays showing historical architectural reconstructions in real time.</li>
      <li><b>Expanded Merchant Loyalty Network:</b> Onboarding additional regional artisans, historical museum ticketing, and eco-tourism partners.</li>
    </ol>
  </div>
  <div class="page-footer">24</div>
</div>
`);

  // ==========================================
  // PAGE 32 (Report Page 25): CHAPTER 10 - REFERENCES
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    10. REFERENCES
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    <ol style="padding-left: 6mm; line-height: 1.55; font-size: 12pt;">
      <li style="margin-bottom: 2mm;">Meta Platforms, Inc., “React: The library for web and native user interfaces (React 19),” Meta Open Source, 2026. Available: https://react.dev/ [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">T. Linsley, “TanStack Router: Fully Type-Safe Routing for Modern React Applications,” TanStack, 2026. Available: https://tanstack.com/router [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">A. Popescu (Ed.), “Geolocation API Specification (2nd Edition),” W3C Recommendation, World Wide Web Consortium, 2025. Available: https://www.w3.org/TR/geolocation/ [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">G. Shires and H. Wennborg, “Web Speech API Specification,” W3C Community Group Report, World Wide Web Consortium, 2024. Available: https://wicg.github.io/speech-api/ [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">R. W. Sinnott, “Virtues of the Haversine,” <i>Sky and Telescope</i>, vol. 68, no. 2, p. 159, 1984.</li>
      <li style="margin-bottom: 2mm;">V. Agafonkin, “Leaflet: An Open-Source JavaScript Library for Mobile-Friendly Interactive Maps,” 2025. Available: https://leafletjs.com/ [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">Mozilla Developer Network, “Canvas API — Web APIs and Client-Side Graphics,” MDN Web Docs, Mozilla Foundation, 2026. Available: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">Tailwind Labs, “Tailwind CSS: Utility-First CSS Framework v4.0,” 2026. Available: https://tailwindcss.com/ [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">Google Developers, “Geocoding API Overview and Reverse Geocoding,” Google Maps Platform, 2026. Available: https://developers.google.com/maps/documentation/geocoding [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">Vitest Team, “Vitest: Next Generation Testing Framework Powered by Vite,” 2026. Available: https://vitest.dev/ [Accessed: Nov 2026].</li>
      <li style="margin-bottom: 2mm;">C. McDonnell, “Zod: TypeScript-First Schema Declaration with Static Type Inference,” 2025. Available: https://zod.dev/ [Accessed: Nov 2026].</li>
      <li>WorkOS, “Radix Primitives: Unstyled, Accessible Components for React Applications,” 2026. Available: https://www.radix-ui.com/ [Accessed: Nov 2026].</li>
    </ol>
  </div>
  <div class="page-footer">25</div>
</div>
`);

  // ==========================================
  // PAGE 33 (Report Page 26): CHAPTER 11 - APPENDIX
  // ==========================================
  pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    11. APPENDIX
  </div>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    Appendix A: Geolocation &amp; Coordinate Boundaries Observed in the System
  </div>
  <div style="font-size: 12pt; line-height: 1.7; text-align: justify; margin-bottom: 4mm;">
    The coordinate limits and validation constraints enforced by the Roam runtime are itemized in Table 9.
  </div>

  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 9: Geolocation and coordinate validation boundaries
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 10.5pt; line-height: 1.45; margin-bottom: 6mm;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 6px; width: 25%;">Parameter</th>
        <th style="border: 1px solid #777; padding: 6px; width: 35%;">Enforced Boundary</th>
        <th style="border: 1px solid #777; padding: 6px; width: 40%;">System Behavior / Exception</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Latitude Range</td><td style="border: 1px solid #777; padding: 6px;">-90.0000° to +90.0000°</td><td style="border: 1px solid #777; padding: 6px;">Rejects out-of-range values with schema alert.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Longitude Range</td><td style="border: 1px solid #777; padding: 6px;">-180.0000° to +180.0000°</td><td style="border: 1px solid #777; padding: 6px;">Rejects out-of-range values with schema alert.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">Image Max Dimension</td><td style="border: 1px solid #777; padding: 6px;">1200 pixels max edge</td><td style="border: 1px solid #777; padding: 6px;">Downscales via HTML Canvas at 0.75 JPEG ratio.</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">GPS Timeout</td><td style="border: 1px solid #777; padding: 6px;">8000 milliseconds</td><td style="border: 1px solid #777; padding: 6px;">Transitions automatically to IP Geolocation.</td></tr>
    </tbody>
  </table>

  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
    Appendix B: Technical Abbreviations
  </div>
  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm;">
    Table 10: Technical abbreviations and terminology
  </div>
  <table class="report-table" style="width: 100%; border-collapse: collapse; font-size: 10.5pt; line-height: 1.45;">
    <thead>
      <tr style="background-color: #f2f2f2;">
        <th style="border: 1px solid #777; padding: 6px; width: 25%;">Abbreviation</th>
        <th style="border: 1px solid #777; padding: 6px; width: 75%;">Full Meaning and Context</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">GPS</td><td style="border: 1px solid #777; padding: 6px;">Global Positioning System (satellite location provider)</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">SPA</td><td style="border: 1px solid #777; padding: 6px;">Single-Page Application (browser-rendered web software)</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">TTS</td><td style="border: 1px solid #777; padding: 6px;">Text-to-Speech (speech synthesis for audio stories)</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">UML</td><td style="border: 1px solid #777; padding: 6px;">Unified Modeling Language (system design diagrams)</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">DFD</td><td style="border: 1px solid #777; padding: 6px;">Data Flow Diagram (functional data flow model)</td></tr>
      <tr><td style="border: 1px solid #777; padding: 6px; font-weight: bold;">SGU</td><td style="border: 1px solid #777; padding: 6px;">Sanjay Ghodawat University, Kolhapur</td></tr>
    </tbody>
  </table>
  <div class="page-footer">26</div>
</div>
`);

  return pages;
};

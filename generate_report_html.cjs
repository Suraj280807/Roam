const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Assembling complete Roam Field Project Report HTML...");

function getBase64Image(relPath, mimeType) {
  try {
    const fullPath = path.join(__dirname, relPath);
    if (fs.existsSync(fullPath)) {
      const data = fs.readFileSync(fullPath).toString('base64');
      return `data:${mimeType};base64,${data}`;
    }
  } catch (err) {
    console.warn(`Could not load ${relPath}:`, err.message);
  }
  return '';
}

const assets = {
  sguImg: getBase64Image('src/assets/sgu.jpg', 'image/jpeg'),
  ramlingImg: getBase64Image('src/assets/ramling.jpg', 'image/jpeg'),
  cafeAmigosImg: getBase64Image('src/assets/cafe-amigos.png', 'image/png'),
  teaToastImg: getBase64Image('src/assets/tea-toast-co.png', 'image/png'),
  belemImg: getBase64Image('src/assets/belem.jpg', 'image/jpeg')
};

const sguLogoSvg = `
<svg width="115" height="135" viewBox="0 0 120 145" xmlns="http://www.w3.org/2000/svg">
  <path d="M 12 12 L 108 12 L 108 85 C 108 120 60 138 60 138 C 60 138 12 120 12 85 Z" fill="#c8102e" stroke="#900a20" stroke-width="2.5"/>
  <g fill="#ffffff">
    <polygon points="26,24 28,29 33,29 29,32 30,37 26,34 22,37 23,32 19,29 24,29" />
    <polygon points="43,22 45,27 50,27 46,30 47,35 43,32 39,35 40,30 36,27 41,27" />
    <polygon points="60,20 62,25 67,25 63,28 64,33 60,30 56,33 57,28 53,25 58,25" />
    <polygon points="77,22 79,27 84,27 80,30 81,35 77,32 73,35 74,30 70,27 75,27" />
    <polygon points="94,24 96,29 101,29 97,32 98,37 94,34 90,37 91,32 87,29 92,29" />
  </g>
  <rect x="15" y="42" width="90" height="36" fill="#ffffff" rx="2"/>
  <text x="60" y="69" font-family="'Times New Roman', serif" font-weight="bold" font-size="26" fill="#1b2a4a" text-anchor="middle" letter-spacing="1.5">SGU</text>
  <circle cx="60" cy="104" r="10" fill="#ffffff"/>
  <circle cx="60" cy="104" r="5" fill="#c8102e"/>
  <g stroke="#ffffff" stroke-width="2.2" stroke-linecap="round">
    <line x1="60" y1="88" x2="60" y2="83" />
    <line x1="60" y1="120" x2="60" y2="125" />
    <line x1="44" y1="104" x2="39" y2="104" />
    <line x1="76" y1="104" x2="81" y2="104" />
    <line x1="49" y1="93" x2="45" y2="89" />
    <line x1="71" y1="115" x2="75" y2="119" />
    <line x1="49" y1="115" x2="45" y2="119" />
    <line x1="71" y1="93" x2="75" y2="89" />
    <line x1="54" y1="89" x2="52" y2="85" />
    <line x1="66" y1="89" x2="68" y2="85" />
    <line x1="54" y1="119" x2="52" y2="123" />
    <line x1="66" y1="119" x2="68" y2="123" />
  </g>
</svg>
`;

const pages = [];

// ==========================================
// PAGE 1: COVER PAGE
// ==========================================
pages.push(`
<div class="page" style="text-align: center; display: flex; flex-direction: column; justify-content: space-between; padding-top: 35mm; padding-bottom: 25mm;">
  <div>
    ${sguLogoSvg}
    <div style="height: 18mm;"></div>
    <div style="font-size: 15pt; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 8mm;">
      A FIELD PROJECT REPORT ON
    </div>
    <div style="font-size: 20pt; font-weight: bold; color: #111; margin-bottom: 4mm;">
      Roam — AI-Powered Travel Companion
    </div>
    <div style="font-size: 13pt; font-style: italic; color: #444; margin-bottom: 12mm;">
      Transforming Navigation into Interactive Exploration
    </div>
    <div style="font-size: 12pt; line-height: 1.5; margin-bottom: 3mm;">
      Submitted in partial fulfilment of the requirements for
    </div>
    <div style="font-size: 14pt; font-weight: bold; margin-bottom: 3mm;">
      UCSFP301 — Field Project
    </div>
    <div style="font-size: 12pt; margin-bottom: 14mm;">
      Second Year — Bachelor of Technology in Computer Science and Engineering
    </div>
  </div>

  <div>
    <div style="font-size: 12pt; font-weight: bold; margin-bottom: 4mm; letter-spacing: 0.5px;">
      SUBMITTED BY
    </div>
    <div style="font-size: 12pt; line-height: 1.7; margin-bottom: 8mm;">
      Surajsing Pruthviraj Patil | PRN No: 252141180<br>
      Yash Bhagwan Torwane | PRN No: 252141181<br>
      Sai Ravindra Mahajan | PRN No: 252141182<br>
      Jeevesh Jeevan Patil | PRN No: 252141183
    </div>
    <div style="font-size: 12pt; font-weight: bold; margin-bottom: 2mm; letter-spacing: 0.5px;">
      UNDER THE GUIDANCE OF
    </div>
    <div style="font-size: 13pt; font-weight: bold; margin-bottom: 12mm;">
      Mr. Gurunath Machhale
    </div>
    <div style="font-size: 12pt; font-weight: bold; line-height: 1.4;">
      Department of Computer Science and Engineering<br>
      Sanjay Ghodawat University, Kolhapur ,<br>
      Academic Year 2026–27
    </div>
  </div>
</div>
`);

// ==========================================
// PAGE 2: CERTIFICATE
// ==========================================
pages.push(`
<div class="page" style="display: flex; flex-direction: column; justify-content: space-between; padding-top: 30mm; padding-bottom: 25mm;">
  <div style="text-align: center;">
    ${sguLogoSvg}
    <div style="height: 14mm;"></div>
    <div style="font-size: 18pt; font-weight: bold; letter-spacing: 1px; margin-bottom: 10mm;">
      CERTIFICATE
    </div>
  </div>

  <div style="font-size: 12pt; line-height: 1.8; text-align: justify; padding: 0 5mm;">
    <p style="margin-bottom: 6mm;">This is to certify that the Field Project entitled</p>
    <p style="font-size: 14pt; font-weight: bold; text-align: center; margin-bottom: 6mm; color: #111;">
      “ROAM — AI-POWERED TRAVEL COMPANION”
    </p>
    <p style="margin-bottom: 8mm;">
      has been satisfactorily carried out and submitted by the following students of Second Year B.Tech. Computer Science and Engineering, in partial fulfilment of the requirements for the course <b>UCSFP301 — Field Project</b>, during the academic year 2026–27, under our guidance.
    </p>
    <div style="margin-left: 8mm; line-height: 1.9; font-size: 12pt; font-weight: 500;">
      1. Surajsing Pruthviraj Patil &nbsp;&nbsp;&nbsp;&nbsp; PRN No: 252141180<br>
      2. Yash Bhagwan Torwane &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PRN No: 252141181<br>
      3. Sai Ravindra Mahajan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PRN No: 252141182<br>
      4. Jeevesh Jeevan Patil &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PRN No: 252141183
    </div>
  </div>

  <div style="padding: 0 5mm;">
    <div style="display: flex; justify-content: space-between; font-size: 12pt; margin-bottom: 18mm;">
      <span>Place: Kolhapur</span>
      <span>Date: ____________</span>
    </div>
    <div style="display: flex; justify-content: space-between; text-align: center; font-size: 12pt; line-height: 1.4;">
      <div style="width: 30%;">
        <b>Mr. Gurunath Machhale</b><br>
        (Mentor / Guide)
      </div>
      <div style="width: 33%;">
        <b>Mrs. Seema Sambhushete</b><br>
        (Course Coordinator)
      </div>
      <div style="width: 30%;">
        <b>Dr. Deepika Patil</b><br>
        ( HOD, CSE)
      </div>
    </div>
  </div>
</div>
`);

// ==========================================
// PAGE 3: DECLARATION
// ==========================================
pages.push(`
<div class="page" style="display: flex; flex-direction: column; justify-content: space-between; padding-top: 30mm; padding-bottom: 25mm;">
  <div>
    <div style="font-size: 18pt; font-weight: bold; text-align: center; letter-spacing: 1px; margin-bottom: 12mm;">
      DECLARATION
    </div>
    <div style="font-size: 12pt; line-height: 1.8; text-align: justify; margin-bottom: 10mm;">
      We hereby declare that the Field Project report titled <b>“Roam — AI-Powered Travel Companion”</b> submitted for <b>UCSFP301 — Field Project</b> is our original academic work prepared under the guidance of <b>Mr. Gurunath Machhale</b>. Technical explanations and external references used in the report are acknowledged where appropriate. We have not represented undocumented field visits, interviews, or location accuracy as verified results.
    </div>

    <table class="report-table" style="width: 100%; border-collapse: collapse; margin-top: 6mm; font-size: 12pt;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #777; padding: 10px; width: 12%; text-align: left;">Sr. No</th>
          <th style="border: 1px solid #777; padding: 10px; width: 40%; text-align: left;">Name</th>
          <th style="border: 1px solid #777; padding: 10px; width: 28%; text-align: left;">PRN No</th>
          <th style="border: 1px solid #777; padding: 10px; width: 20%; text-align: left;">Signature</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #777; padding: 12px 10px;">1.</td>
          <td style="border: 1px solid #777; padding: 12px 10px;">Surajsing Pruthviraj Patil</td>
          <td style="border: 1px solid #777; padding: 12px 10px;">252141180</td>
          <td style="border: 1px solid #777; padding: 12px 10px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #777; padding: 12px 10px;">2.</td>
          <td style="border: 1px solid #777; padding: 12px 10px;">Yash Bhagwan Torwane</td>
          <td style="border: 1px solid #777; padding: 12px 10px;">252141181</td>
          <td style="border: 1px solid #777; padding: 12px 10px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #777; padding: 12px 10px;">3.</td>
          <td style="border: 1px solid #777; padding: 12px 10px;">Sai Ravindra Mahajan</td>
          <td style="border: 1px solid #777; padding: 12px 10px;">252141182</td>
          <td style="border: 1px solid #777; padding: 12px 10px;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid #777; padding: 12px 10px;">4.</td>
          <td style="border: 1px solid #777; padding: 12px 10px;">Jeevesh Jeevan Patil</td>
          <td style="border: 1px solid #777; padding: 12px 10px;">252141183</td>
          <td style="border: 1px solid #777; padding: 12px 10px;"></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="display: flex; justify-content: space-between; font-size: 12pt; padding: 0 5mm;">
    <span>Place: Kolhapur</span>
    <span>Date: ____________</span>
  </div>
</div>
`);

// ==========================================
// PAGE 4: ACKNOWLEDGEMENT
// ==========================================
pages.push(`
<div class="page" style="padding-top: 30mm;">
  <div style="font-size: 18pt; font-weight: bold; text-align: center; letter-spacing: 1px; margin-bottom: 12mm;">
    ACKNOWLEDGEMENT
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    <p style="margin-bottom: 5mm;">
      We sincerely express our gratitude to <b>Mr. Gurunath Machhale</b> for his continuous support, guidance, and constructive feedback throughout the duration of this project. His expert suggestions helped us improve the technical quality, software architecture, report structure, and overall understanding of the field project process.
    </p>
    <p style="margin-bottom: 5mm;">
      We would also like to thank the Department of Computer Science and Engineering, Sanjay Ghodawat University, Kolhapur, for providing the academic environment, computational infrastructure, and institutional support needed to complete this work. The department provided us with opportunities to learn, discuss, and refine our project concept from the initial ideation phase to the final implementation of the Roam Travel Companion.
    </p>
    <p style="margin-bottom: 5mm;">
      Our sincere appreciation goes to our course coordinator <b>Mrs. Seema Sambhushete</b>, Head of Department <b>Dr. Deepika Patil</b>, and faculty members for their cooperation during the planning, implementation, and testing of the system. Their encouragement motivated us to work diligently and uphold both academic rigor and practical effectiveness.
    </p>
    <p style="margin-bottom: 5mm;">
      We are grateful to our classmates and peers who contributed through valuable user testing, interface discussions, and usability feedback. Their suggestions helped us polish the interactive maps, audio narration engine, digital passport stamps, and documentation quality.
    </p>
    <p>
      Finally, we acknowledge the role of modern open-source web technologies and standards, including React 19, TypeScript, TanStack Router, Leaflet, Tailwind CSS, and the Web Speech API documentation. Their availability enabled us to construct an interactive, client-first, and privacy-conscious travel companion application.
    </p>
  </div>
</div>
`);

// ==========================================
// PAGE 5: LIST OF TABLES & LIST OF FIGURES (Page i)
// ==========================================
pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 5mm;">
    LIST OF TABLES
  </div>
  <div style="font-size: 12pt; line-height: 1.6; margin-bottom: 7mm;">
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 1:</span><span style="flex-grow: 1;">Gaps identified in existing systems and Roam's response</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">3</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 2:</span><span style="flex-grow: 1;">Technology stack and role of each component</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">7</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 3:</span><span style="flex-grow: 1;">Core project files and modules</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">7</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 4:</span><span style="flex-grow: 1;">Mathematical formulas and algorithmic foundations</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">15</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 5:</span><span style="flex-grow: 1;">Field work dataset and location attributes</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">16</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 6:</span><span style="flex-grow: 1;">Implemented features and operational behavior</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">19</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 7:</span><span style="flex-grow: 1;">Sample calculated results for proximity and gamification</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">20</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 8:</span><span style="flex-grow: 1;">Formal test cases, action sequences, and results</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">23</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 9:</span><span style="flex-grow: 1;">Geolocation and coordinate validation boundaries</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">26</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 85px;">Table 10:</span><span style="flex-grow: 1;">Technical abbreviations and terminology</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">26</span></div>
  </div>

  <div style="font-size: 16pt; font-weight: bold; margin-bottom: 5mm;">
    LIST OF FIGURES
  </div>
  <div style="font-size: 12pt; line-height: 1.55;">
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 1:</span><span style="flex-grow: 1;">System architecture and request-response flow</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">6</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 2:</span><span style="flex-grow: 1;">Use case diagram for traveler exploration workflows</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">8</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 3:</span><span style="flex-grow: 1;">Class diagram of client application architecture</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">9</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 4:</span><span style="flex-grow: 1;">Object diagram with active landmark instances</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">9</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 5:</span><span style="flex-grow: 1;">Sequence diagram for landmark discovery and audio tour request</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">10</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 6:</span><span style="flex-grow: 1;">Activity diagram of exploration and stamp collection</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">10</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 7:</span><span style="flex-grow: 1;">State chart diagram of the audio tour engine</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">11</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 8:</span><span style="flex-grow: 1;">Communication diagram of system modules</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">11</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 9:</span><span style="flex-grow: 1;">Component diagram of client architectural layers</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">12</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 10:</span><span style="flex-grow: 1;">Deployment diagram of client-side application</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">12</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 11:</span><span style="flex-grow: 1;">Data flow diagram (DFD) of location processing</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">13</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 12:</span><span style="flex-grow: 1;">Field work site photographs and mobile GPS coordinate collection records</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">17</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 13:</span><span style="flex-grow: 1;">Interactive Map and Landmark Photo Capture interface</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">17</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 14:</span><span style="flex-grow: 1;">Place Guide and Voice Audio Tour interface</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">18</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 15:</span><span style="flex-grow: 1;">Digital Travel Passport and Personal Journal interface</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">18</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 16:</span><span style="flex-grow: 1;">Performance analysis: Haversine distance execution latency</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">21</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 17:</span><span style="flex-grow: 1;">User notification upon GPS denial and automatic IP fallback</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">22</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold; width: 90px;">Figure 18:</span><span style="flex-grow: 1;">Client validation guard for coordinates and file types</span><span style="flex-grow: 0.5; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">22</span></div>
  </div>
  <div class="page-footer">i</div>
</div>
`);

// ==========================================
// PAGE 6: TABLE OF CONTENTS (Page ii)
// ==========================================
pages.push(`
<div class="page" style="padding-top: 25mm;">
  <div style="font-size: 18pt; font-weight: bold; text-align: center; letter-spacing: 1px; margin-bottom: 7mm;">
    TABLE OF CONTENTS
  </div>
  <div style="font-size: 12pt; line-height: 1.68;">
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">1. Introduction</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">1</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">2. Literature Review / Existing System</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">2</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>2.1 Background Study</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>2</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>2.2 Gaps Identified</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>3</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">3. Motivation, Problem Statement and Objectives</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">4</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>3.1 Motivation</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>4</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>3.2 Problem Statement</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>4</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>3.3 Objectives</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>5</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">4. System Architecture</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">6</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>4.1 Architecture Overview</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>6</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>4.2 Layers of the Architecture</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>6</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>4.3 Technology Stack</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>7</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>4.4 Project Files and Components</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>7</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">5. System Design</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">8</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.1 Use Case Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>8</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.2 Class Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>9</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.3 Object Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>9</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.4 Sequence Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>10</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.5 Activity Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>10</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.6 State Chart Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>11</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.7 Communication Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>11</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.8 Component Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>12</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.9 Deployment Diagram</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>12</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-left: 6mm;"><span>5.10 Data Flow Diagram (DFD)</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span>13</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">6. Methodology</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">14</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">7. Field Work and Data Collection</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">16</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">8. Result and Analysis</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">19</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">9. Conclusion and Future Scope</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">24</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">10. References</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">25</span></div>
    <div style="display: flex; justify-content: space-between; align-items: baseline;"><span style="font-weight: bold;">11. Appendix</span><span style="flex-grow: 1; border-bottom: 1px dotted #888; margin: 0 8px;"></span><span style="font-weight: bold;">26</span></div>
  </div>
  <div class="page-footer">ii</div>
</div>
`);

// ==========================================
// PAGE 7: ABSTRACT (Page iii)
// ==========================================
pages.push(`
<div class="page" style="padding-top: 30mm;">
  <div style="font-size: 18pt; font-weight: bold; text-align: center; letter-spacing: 1px; margin-bottom: 12mm;">
    ABSTRACT
  </div>
  <div style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    <p style="margin-bottom: 6mm;">
      <b>Roam — AI-Powered Travel Companion</b> is a modern, responsive web application engineered to transform standard geographic navigation into an interactive journey of cultural discovery. Traditional navigation systems focus strictly on turn-by-turn routing between coordinates, often leaving travelers disconnected from the historical, cultural, and architectural significance of the places they encounter. Roam bridges this divide by providing an integrated, client-first digital travel companion built with React 19, TypeScript, TanStack Router, Leaflet, and Tailwind CSS.
    </p>
    <p style="margin-bottom: 6mm;">
      The application incorporates five core exploration capabilities: real-time proximity discovery using the mathematical Haversine formula, an interactive mapping interface with dynamic category filters, a browser-native voice audio tour narrator utilizing the Web Speech Synthesis API, a landmark photo capture interface with multi-tier client-side image compression, and a gamified Digital Travel Passport enabling travelers to collect digital stamps, earn exploration coins, and unlock regional partner discounts.
    </p>
    <p style="margin-bottom: 8mm;">
      The system is designed with a lightweight, client-focused architecture. Personal notes, stamps and journal data are stored locally in the browser. Location resolution and map display may communicate with external services when required. The project encompasses field work and data verification conducted in the Sanjay Ghodawat University (SGU) campus and Hatkanangle/Kolhapur heritage region, complemented by a curated baseline demonstration pack. Roam provides students, tourists, and independent explorers with an engaging and educational travel experience.
    </p>
    <div style="font-size: 12pt; margin-top: 10mm;">
      <b>Keywords :</b> Travel Companion, Geolocation, Haversine Distance, Web Speech API, Landmark Photo Capture, Digital Passport, React 19, TypeScript.
    </div>
  </div>
  <div class="page-footer">iii</div>
</div>
`);

// Import Chapters 1 to 5 and Chapters 6 to 11
const getCh1ToCh5 = require('./report_pages_ch1_to_ch5.cjs');
const getCh6ToCh11 = require('./report_pages_ch6_to_ch11.cjs');

const ch1ToCh5Pages = getCh1ToCh5();
const ch6ToCh11Pages = getCh6ToCh11(assets);

pages.push(...ch1ToCh5Pages);
pages.push(...ch6ToCh11Pages);

console.log(`Total assembled pages: ${pages.length}`);

// Complete HTML Document template
const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Roam — AI-Powered Travel Companion | Field Project Report</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 210mm;
      background-color: #ffffff;
      font-family: 'Times New Roman', Times, serif;
      color: #000000;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 22mm 24mm 20mm 24mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      background: #ffffff;
    }
    .page-footer {
      position: absolute;
      bottom: 12mm;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 11pt;
      font-family: 'Times New Roman', Times, serif;
    }
    .report-table th, .report-table td {
      border: 1px solid #777;
    }
    p {
      text-align: justify;
    }
  </style>
</head>
<body>
${pages.join('\n')}
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'Roam_Report.html'), fullHtml, 'utf8');
console.log("Roam_Report.html successfully generated.");

const { spawnSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.join(__dirname, 'Roam_Report.html');
const pdfPath = path.join(__dirname, 'Roam_Field_Project_Report.pdf');

console.log("Compiling PDF via Chrome headless...");
const result = spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfPath}`,
  htmlPath
], { stdio: 'inherit' });

if (result.error) {
  console.error("Chrome compilation error:", result.error.message);
} else {
  console.log("Roam_Field_Project_Report.pdf successfully generated.");
}

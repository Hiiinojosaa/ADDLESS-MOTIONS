/* ═══════════════════════════════════════════════════════
   UNDERWORLD — app.js
   ═══════════════════════════════════════════════════════ */

const API_URL = "http://localhost:3000/artists";

/* ─────────────────────────────────────────────────────
   INTRO: canvas sand + 3D title + burst exit
   ─────────────────────────────────────────────────────*/
(function initIntro() {
  const canvas = document.getElementById("sandCanvas");
  const ctx    = canvas.getContext("2d");
  const intro  = document.getElementById("introScreen");
  const main   = document.getElementById("mainSite");

  let particles = [];
  let animId;
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class SandParticle {
    constructor(x, y, burst) {
      this.x     = x !== undefined ? x : Math.random() * W;
      this.y     = y !== undefined ? y : Math.random() * H;
      this.vx    = burst ? (Math.random() - 0.5) * 7 : (Math.random() - 0.5) * 0.3;
      this.vy    = burst ? (Math.random() - 0.5) * 7 - 1.5 : Math.random() * 0.4 + 0.1;
      this.size  = burst ? Math.random() * 3 + 1 : Math.random() * 1.4 + 0.3;
      this.alpha = burst ? Math.random() * 0.9 + 0.1 : Math.random() * 0.25 + 0.05;
      this.decay = burst ? Math.random() * 0.02 + 0.01 : 0.0008;
      this.hue   = 35 + Math.random() * 18;
      this.light = 55 + Math.random() * 22;
    }

    update() {
      this.x     += this.vx;
      this.y     += this.vy;
      this.alpha -= this.decay;
      this.vy    += 0.035;
      this.vx    *= 0.992;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle   = `hsl(${this.hue}, 12%, ${this.light}%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /* seed ambient dust */
  for (let i = 0; i < 100; i++) particles.push(new SandParticle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    if (particles.length < 70) {
      for (let i = 0; i < 2; i++) particles.push(new SandParticle());
    }
    animId = requestAnimationFrame(loop);
  }
  loop();

  function burst() {
    const cx = W / 2, cy = H / 2;
    for (let i = 0; i < 350; i++) {
      particles.push(new SandParticle(
        cx + (Math.random() - 0.5) * 400,
        cy + (Math.random() - 0.5) * 100,
        true
      ));
    }
  }

  /* Wait for title animation to settle, then burst and exit */
  setTimeout(() => {
    burst();
    setTimeout(() => {
      intro.classList.add("fadeOut");
      intro.addEventListener("animationend", () => {
        cancelAnimationFrame(animId);
        intro.style.display = "none";
        main.classList.remove("hidden");
        initApp();
      }, { once: true });
    }, 500);
  }, 2600);
})();

/* ─────────────────────────────────────────────────────
   APP INIT
   ─────────────────────────────────────────────────────*/
let allArtists = [];

async function initApp() {
  setupNav();
  await fetchArtists();
  setupModal();
}

/* ── FETCH ────────────────────────────────────────── */
async function fetchArtists() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allArtists = await res.json();
    renderGrid(allArtists);
  } catch (err) {
    console.error("Fetch error:", err);
    renderError();
  }
}

/* ── RENDER GRID ──────────────────────────────────── */
function renderGrid(artistList) {
  const grid = document.getElementById("artistGrid");
  const loadingMsg = document.getElementById("loadingMsg");
  if (loadingMsg) loadingMsg.remove();

  grid.innerHTML = "";

  /* Split into rows of 5 (matching screenshot) */
  const rowSize = 5;
  for (let i = 0; i < artistList.length; i += rowSize) {
    const rowArtists = artistList.slice(i, i + rowSize);
    const row = document.createElement("div");
    row.className = "gridRow";

    rowArtists.forEach((artist, idx) => {
      const frame = document.createElement("div");
      frame.className = "artistFrame";
      frame.setAttribute("data-id", artist.id);
      frame.style.animationDelay = `${(i + idx) * 55}ms`;

      frame.innerHTML = `
        <img
          src="${escapeHtml(artist.image)}"
          alt="${escapeHtml(artist.name)}"
          loading="lazy"
          onerror="this.src='https://via.placeholder.com/300x400/111/333?text=%E2%9C%A6'"
        />
        <div class="frameGradient"></div>
        <div class="frameStar">✦</div>
        <div class="frameName">${escapeHtml(artist.displayName)}</div>
      `;

      row.appendChild(frame);
    });

    grid.appendChild(row);
  }
}

function renderError() {
  const grid = document.getElementById("artistGrid");
  grid.innerHTML = `<div class="loadingMsg">
    ✦ ERROR — Inicia JSON Server:<br>
    <small style="font-size:.6rem;color:#444;margin-top:8px;display:block">npx json-server db.json</small>
  </div>`;
}

/* ─────────────────────────────────────────────────────
   MODAL
   ─────────────────────────────────────────────────────*/
function setupModal() {
  const modal   = document.getElementById("artistModal");
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");
  const grid    = document.getElementById("artistGrid");

  /* Open on artist click */
  grid.addEventListener("click", (e) => {
    const frame = e.target.closest(".artistFrame");
    if (!frame) return;
    const artistId = parseInt(frame.getAttribute("data-id"), 10);
    const artist   = allArtists.find(a => a.id === artistId);
    if (artist) openModal(artist);
  });

  /* Close */
  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function openModal(artist) {
    document.getElementById("modalImg").src    = artist.image;
    document.getElementById("modalImg").alt    = artist.name;
    document.getElementById("modalGenre").textContent  = artist.genre.toUpperCase();
    document.getElementById("modalName").textContent   = artist.displayName;
    document.getElementById("modalOrigin").textContent = `📍 ${artist.origin}`;
    document.getElementById("modalDesc").textContent   = artist.description;
    renderConcerts(artist);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

/* ── CONCERTS (invented per artist) ─────────────── */
const concertData = {
  1: [ /* Soto Asa */
    { date: "14 JUN 2025", venue: "Sala But",        city: "MADRID" },
    { date: "21 JUN 2025", venue: "Razzmatazz",      city: "BARCELONA" },
    { date: "05 JUL 2025", venue: "Sala Maravillas",  city: "MADRID" },
  ],
  2: [ /* Judeline */
    { date: "20 JUN 2025", venue: "Teatro Lope de Vega", city: "SEVILLA" },
    { date: "28 JUN 2025", venue: "Auditorio Mar de Vigo", city: "VIGO" },
    { date: "12 JUL 2025", venue: "Sala Apolo",       city: "BARCELONA" },
  ],
  3: [ /* Guxo */
    { date: "07 JUN 2025", venue: "Sala Mon",         city: "MADRID" },
    { date: "14 JUN 2025", venue: "Sala Upload",      city: "BARCELONA" },
    { date: "22 JUN 2025", venue: "Sala X",           city: "VALENCIA" },
  ],
  4: [ /* Pedro LaDroga */
    { date: "11 JUN 2025", venue: "Barby",            city: "BUENOS AIRES" },
    { date: "19 JUN 2025", venue: "La Sala",          city: "MADRID" },
    { date: "03 JUL 2025", venue: "Sala Heineken",    city: "GRANADA" },
  ],
  5: [ /* Disobey */
    { date: "18 JUN 2025", venue: "Sala 16 Toneladas", city: "VALENCIA" },
    { date: "25 JUN 2025", venue: "Sala Caracol",     city: "MADRID" },
    { date: "09 JUL 2025", venue: "Primavera Sound",  city: "BARCELONA" },
  ],
  6: [ /* Sticky M.A. */
    { date: "06 JUN 2025", venue: "Sala El Sol",      city: "MADRID" },
    { date: "13 JUN 2025", venue: "Bikini",           city: "BARCELONA" },
    { date: "27 JUN 2025", venue: "Café Berlín",      city: "MADRID" },
  ],
  7: [ /* Metrika */
    { date: "08 JUN 2025", venue: "Sala Zentral",     city: "MADRID" },
    { date: "15 JUN 2025", venue: "Sala Bóveda",      city: "BARCELONA" },
    { date: "29 JUN 2025", venue: "Sala Rock&Beer",   city: "BILBAO" },
  ],
  8: [ /* MC Buzz */
    { date: "10 JUN 2025", venue: "La Riviera",       city: "MADRID" },
    { date: "17 JUN 2025", venue: "Sala Luz de Gas",  city: "BARCELONA" },
    { date: "01 JUL 2025", venue: "Sala Albéniz",     city: "SEVILLA" },
  ],
  9: [ /* Rusowsky */
    { date: "05 JUN 2025", venue: "Teatro Circo Price", city: "MADRID" },
    { date: "12 JUN 2025", venue: "Sala Barts",       city: "BARCELONA" },
    { date: "26 JUN 2025", venue: "Sala 16 Toneladas", city: "VALENCIA" },
  ],
  10: [ /* L0rna */
    { date: "09 JUN 2025", venue: "Sala But",         city: "MADRID" },
    { date: "16 JUN 2025", venue: "Sala Upload",      city: "BARCELONA" },
    { date: "30 JUN 2025", venue: "La Riviera",       city: "MADRID" },
  ],
};

function renderConcerts(artist) {
  const list    = document.getElementById("modalConcerts");
  const concerts = concertData[artist.id] || [];
  list.innerHTML = "";

  if (!concerts.length) {
    list.innerHTML = `<li><span class="concertVenue" style="color:var(--dim)">Sin fechas confirmadas</span></li>`;
    return;
  }

  concerts.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="concertDate">${escapeHtml(c.date)}</span>
      <span class="concertVenue">${escapeHtml(c.venue)}</span>
      <span class="concertCity">${escapeHtml(c.city)}</span>
    `;
    list.appendChild(li);
  });
}

/* ─────────────────────────────────────────────────────
   NAV
   ─────────────────────────────────────────────────────*/
function setupNav() {
  const toggler = document.getElementById("navToggler");
  const links   = document.getElementById("navLinks");
  if (toggler && links) {
    toggler.addEventListener("click", () => links.classList.toggle("open"));
  }
}

/* ─────────────────────────────────────────────────────
   UTILS
   ─────────────────────────────────────────────────────*/
function escapeHtml(str) {
  if (typeof str !== "string") return String(str);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

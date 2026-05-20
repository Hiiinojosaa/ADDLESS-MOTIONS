const baseUrl = 'http://127.0.0.1:5000';

const localBackupData = {
  "artists": [
    { "id": "1", "name": "Soto Asa", "genre": "Reggaeton / Trap Zen", "origin": "Ceuta, Spain", "bio": "Pioneer of zen trap sound in Spain, blending mysticism with arcade aesthetics.", "fee": "12.000€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/PKLZ4O2Y45HHTG3ZCSYKO4YROQ_wiooqb.avif" },
    { "id": "2", "name": "Judeline", "genre": "Indie Pop / Flamenco Alt", "origin": "Cadiz, Spain", "bio": "Revolutionary voice mixing traditional southern folklore with avant-garde electronic textures.", "fee": "15.000€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/judeline-inri-portada_advpw8.jpg" },
    { "id": "3", "name": "Guxo", "genre": "Pluggnb / Digital Trap", "origin": "Vigo, Spain", "bio": "Key figure of emotional pluggnb in Spanish, atmospheric and highly detailed soundscapes.", "fee": "4.500€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/guxo-artist-xceed-cover-49b1_wxkee8.jpg" },
    { "id": "4", "name": "Pedro LaDroga", "genre": "Vaporwave / Experimental Hip-Hop", "origin": "Sevilla, Spain", "bio": "Underground genius shaping dark, psychedelic, and lo-fi digital trap concepts.", "fee": "6.000€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/helsinkipro-pedro-ladroga-square_wjihdu.avif" },
    { "id": "5", "name": "Disobey", "genre": "Hardcore / Hard Dance", "origin": "Madrid, Spain", "bio": "Industrial beats and acid synthesizers crushing modern electronic underground scenes.", "fee": "5.000€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/photo_5983084864796214559_m_kbe2pi.jpg" },
    { "id": "6", "name": "Sticky M.A.", "genre": "Psychedelic Trap", "origin": "Madrid, Spain", "bio": "Cult icon using modulated vocals and spacey beats to draft emotional urban anthems.", "fee": "10.000€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/image-f260d75c8dd3a4783750b8c266282e7eaec5c4e9-1830x1907-jpg-1875_t0h3wk.webp" },
    { "id": "7", "name": "Metrika", "genre": "Hardcore Rap / Dark Trap", "origin": "Zaragoza, Spain", "bio": "Raw street poetry focused on empowerment, shadow aesthetics, and tight sharp rhyming flows.", "fee": "5.500€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/IMG_0486-683x1024_bqarme.png" },
    { "id": "8", "name": "MC Buzz", "genre": "Baile Funk / Bass Club", "origin": "Sao Paulo / Barcelona", "bio": "Perfect cross-over bridge connecting Brazilian favela rhythms with European rave sounds.", "fee": "4.000€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/039e61ae3d57583f67799b81aa734f46.538x538x1_cufrpl.png" },
    { "id": "9", "name": "Rusowsky", "genre": "Bedroom Pop / Lo-Fi Electronic", "origin": "Madrid, Spain", "bio": "Architect of intimate, jazz-tinted nostalgic melodies matching melancholic visual fields.", "fee": "14.000€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/ab676161000051741ccc31898f2f43623815bac8_w08toi.jpg" },
    { "id": "10", "name": "L0rna", "genre": "Glitchcore / Cyberpop", "origin": "Barcelona, Spain", "bio": "Digital distortion and internet culture tailored into heavy, emotional virtual live tracks.", "fee": "3.500€", "imageUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/l0rnapic_X_cncbp9.jpg" }
  ],
  "releases": [
    { "id": "r1", "title": "BODHICITTA", "artist": "Judeline", "year": "2024", "tracks": "12 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/c_auto,w_4000/1900x1900-000000-80-0-0_t7cc11.jpg", "spotifyUrl": "https://open.spotify.com/intl-es/album/3P72RptvKkY9vSohb70W9b" },
    { "id": "r2", "title": "SPACECADET", "artist": "Soto Asa", "year": "2023", "tracks": "10 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/c_auto,w_4000/e7633b59cac8198ffdcedb8100a4cdc1.1000x1000x1_gmozsd.png", "spotifyUrl": "https://open.spotify.com/intl-es/album/6K47OitvS87A5S81gB3zGv" },
    { "id": "r3", "title": "COUPÉ", "artist": "Soto Asa", "year": "2020", "tracks": "9 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/c_auto,w_4000/maxresdefault_adqxtm.jpg", "spotifyUrl": "https://open.spotify.com/intl-es/album/1pZg55P2uYIq818bSguU83" },
    { "id": "r4", "title": "SADCORE DIGITAL", "artist": "Guxo", "year": "2024", "tracks": "7 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/c_auto,w_4000/ab67616d0000b273c3a4f88a89a1964b8f10a2dc_zqetcy.jpg", "spotifyUrl": "https://open.spotify.com/intl-es/album/5VnB87S81gaBcX81A5zBvG" },
    { "id": "r5", "title": "LAS ENTRÁÑAS", "artist": "Sticky M.A.", "year": "2022", "tracks": "11 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/c_auto,w_4000/51zDT6gDaIL._UXNaN_FMjpg_QL85__knj1bk.jpg", "spotifyUrl": "https://open.spotify.com/intl-es/album/7mS87a6S81gaBx71A8zbVg" },
    { "id": "r6", "title": "DAISY", "artist": "Rusowsky", "year": "2024", "tracks": "11 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/v1779179142/DAISY-RUSOWSKY_FINALALBUMsRGBCOVER_ozowfc.webp", "spotifyUrl": "https://open.spotify.com/intl-es/album/1ZqS87A5SaBcX81A5zBvG" },
    { "id": "r7", "title": "MADRE", "artist": "Metrika", "year": "2023", "tracks": "9 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/v1779179280/a1530761606_16_xcmjwz.jpg", "spotifyUrl": "https://open.spotify.com/intl-es/album/2kB87S81gaBcX81A5zBvG" },
    { "id": "r8", "title": "AMOR AMARGO", "artist": "L0rna", "year": "2025", "tracks": "6 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/v1779179280/a0767748583_5_gbzmdm.jpg", "spotifyUrl": "https://open.spotify.com/intl-es/album/3VnB87S81gaBcX81A5zBvG" },
    { "id": "r9", "title": "MISTICISMO DOCK", "artist": "Soto Asa", "year": "2021", "tracks": "8 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/PKLZ4O2Y45HHTG3ZCSYKO4YROQ_wiooqb.avif", "spotifyUrl": "https://open.spotify.com/intl-es/album/4mB87S81gaBcX81A5zBvG" },
    { "id": "r10", "title": "INRI", "artist": "Judeline", "year": "2023", "tracks": "5 Tracks", "coverUrl": "https://res.cloudinary.com/ddj5f29yf/image/upload/judeline-inri-portada_advpw8.jpg", "spotifyUrl": "https://open.spotify.com/intl-es/album/5kB87S81gaBcX81A5zBvG" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
    loadPlatformData();
    createDetailsModalStructure();
});

async function loadPlatformData() {
    const container = document.getElementById('cardsContainer');
    const loading = document.getElementById('loadingState');
    
    let artistsList = [];
    let releasesList = [];

    try {
        const [resArtists, resReleases] = await Promise.all([
            fetch(`${baseUrl}/artists`),
            fetch(`${baseUrl}/releases`)
        ]);
        
        if (!resArtists.ok || !resReleases.ok) throw new Error("Server communication fault");
        
        artistsList = await resArtists.json();
        releasesList = await resReleases.json();
        console.log("🟢 Connected to local API server successfully.");
    } 
    catch (err) {
        console.warn("⚠️ Local API server unreachable. Switching to internal memory fallbacks...");
        artistsList = localBackupData.artists;
        releasesList = localBackupData.releases;
    }

    const frames = document.querySelectorAll('.video-artist-frame');
    frames.forEach(frame => {
        const id = frame.getAttribute('data-artist-id');
        const matchData = artistsList.find(a => String(a.id) === String(id));
        
        if (matchData) {
            frame.addEventListener('click', (e) => {
                e.preventDefault();
                openArtistProfile(matchData);
            });
        }
    });

    if (loading) loading.remove();
    if (container) {
        container.innerHTML = '';
        container.classList.remove('d-none');
    }

    releasesList.forEach(album => {
        // Enlace limpio a Spotify corregido sin fallos de caracteres
        const urlSpotify = album.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(album.title + ' ' + album.artist)}`;
        
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <a href="${urlSpotify}" target="_blank" class="text-decoration-none text-white d-block h-100 style-card-anchor">
                <div class="underworld-release-card h-100" style="transition: transform 0.3s ease; cursor: pointer;">
                    <div class="release-img-wrapper">
                        <img src="${album.coverUrl}" alt="${album.title}" class="img-fluid">
                    </div>
                    <div class="release-info-box p-3">
                        <span class="release-artist-badge">${album.artist.toUpperCase()}</span>
                        <h4 class="release-album-title mt-1 mb-2">${album.title.toUpperCase()}</h4>
                        <div class="d-flex justify-content-between align-items-center text-muted small mt-2 pt-2" style="border-top: 1px solid rgba(255,255,255,0.05);">
                            <span>${album.year}</span>
                            <span>✦ ${album.tracks}</span>
                        </div>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(col);
    });
}


function createDetailsModalStructure() {
    if (document.getElementById('artistModal')) return;

    const modalElement = document.createElement('div');
    modalElement.className = 'modal fade';
    modalElement.id = 'artistModal';
    modalElement.setAttribute('tabindex', '-1');
    modalElement.setAttribute('aria-hidden', 'true');
    
    modalElement.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content underworld-modal-content">
                <div class="modal-header underworld-modal-header">
                    <h5 class="modal-title modal-artist-title-pop" id="modalArtistName"></h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="row g-4">
                        <div class="col-md-5">
                            <div class="modal-img-frame" style="height: 100%; min-height: 250px; background: #000;">
                                <img id="modalArtistImg" src="" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                        <div class="col-md-7 d-flex flex-column justify-content-between">
                            <div>
                                <div class="row mb-3">
                                    <div class="col-6">
                                        <span class="modal-label-tech">Style / Genre</span>
                                        <p id="modalArtistGenre" class="modal-value-tech mt-1 text-uppercase"></p>
                                    </div>
                                    <div class="col-6">
                                        <span class="modal-label-tech">Origin</span>
                                        <p id="modalArtistOrigin" class="modal-value-tech mt-1"></p>
                                    </div>
                                </div>
                                <hr style="border-color: rgba(255, 255, 255, 0.1);">
                                <span class="modal-label-tech d-block mb-2">Official Biography</span>
                                <p id="modalArtistBio" class="modal-bio-text"></p>
                            </div>
                            <div class="pt-3 text-end">
                                <span class="modal-label-tech me-2">BOOKING STATUS:</span>
                                <span id="modalArtistFee" class="badge bg-white text-dark fw-bold rounded-0 px-3 py-2" style="font-family: 'Syne', sans-serif; font-size: 0.7rem; letter-spacing: 0.5px;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalElement);
}


function openArtistProfile(artist) {
    document.getElementById('modalArtistName').textContent = artist.name.toUpperCase();
    document.getElementById('modalArtistGenre').textContent = artist.genre;
    document.getElementById('modalArtistOrigin').textContent = artist.origin;
    document.getElementById('modalArtistBio').textContent = artist.bio;
    document.getElementById('modalArtistFee').textContent = `BOOKED ${artist.fee}`;
    
    const img = document.getElementById('modalArtistImg');
    img.src = artist.imageUrl;
    img.alt = artist.name;
    
    const element = document.getElementById('artistModal');
    const modalInstance = bootstrap.Modal.getInstance(element) || new bootstrap.Modal(element);
    modalInstance.show();
}
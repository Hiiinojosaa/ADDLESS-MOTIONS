// URL local de tu JSON Server configurada con IP numérica directa para evitar caídas de resolución
const BASE_URL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Vincular interacciones a las celdas fijas del Roster de arriba
    initArtistsInteractivity();
    // 2. Cargar lanzamientos asíncronos en el catálogo inferior
    loadDynamicReleases();
    // 3. Inyectar estructura modular del Modal en el documento
    createDetailsModalStructure();
});

/**
 * Trae los artistas desde db.json y asocia dinámicamente la escucha del click
 */
async function initArtistsInteractivity() {
    try {
        const res = await fetch(`${BASE_URL}/artists`);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        
        const artists = await res.json();
        const frames = document.querySelectorAll('.video-artist-frame');
        
        frames.forEach(frame => {
            const id = frame.getAttribute('data-artist-id');
            const matchData = artists.find(a => String(a.id) === String(id));
            
            if (matchData) {
                frame.addEventListener('click', (e) => {
                    e.preventDefault();
                    openArtistProfile(matchData);
                });
            }
        });
    } catch (err) {
        console.error("Error cargando base de artistas:", err);
    }
}

/**
 * Trae y dibuja la sección de discografía asíncronamente
 */
async function loadDynamicReleases() {
    const container = document.getElementById('cardsContainer');
    const loading = document.getElementById('loadingState');
    
    try {
        const res = await fetch(`${BASE_URL}/releases`);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        
        const releasesList = await res.json();
        
        // Limpiamos los spinners de carga inicial
        if (loading) loading.remove();
        if (container) {
            container.innerHTML = '';
            container.classList.remove('d-none');
        }
        
        releasesList.forEach(album => {
            const col = document.createElement('div');
            col.className = 'col';
            
            col.innerHTML = `
                <div class="underworld-release-card h-100">
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
            `;
            container.appendChild(col);
        });
        
    } catch (err) {
        console.error("Error inyectando lanzamientos:", err);
        if (loading) {
            loading.innerHTML = `
                <div class="text-danger small py-3">
                    <p class="fw-bold mb-1">⚠️ Error de conexión con JSON Server</p>
                    <p class="text-muted mb-0">Ejecuta en terminal: <code class="text-warning">npx json-server --watch db.json --port 5000 --cors</code></p>
                </div>
            `;
        }
    }
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
                                        <span class="modal-label-tech">Estilo / Género</span>
                                        <p id="modalArtistGenre" class="modal-value-tech mt-1 text-uppercase"></p>
                                    </div>
                                    <div class="col-6">
                                        <span class="modal-label-tech">Procedencia</span>
                                        <p id="modalArtistOrigin" class="modal-value-tech mt-1"></p>
                                    </div>
                                </div>
                                <hr style="border-color: rgba(255, 255, 255, 0.1);">
                                <span class="modal-label-tech d-block mb-2">Biografía Oficial</span>
                                <p id="modalArtistBio" class="modal-bio-text"></p>
                            </div>
                            <div class="pt-3 text-end">
                                <span class="modal-label-tech me-2">STATUS ACUERDO:</span>
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
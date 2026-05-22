const requestURL = './json/db.json';

async function fetchMoviesJson() {
    const response = await fetch(requestURL);
    const movies = await response.json();
    return movies;
}

fetchMoviesJson().then(movies => {
    const moviesSection = document.getElementById('movieSection');
    if (!moviesSection) return;

    moviesSection.innerHTML = '';

    for (let index = 0; index < movies.documentaries.length; index++) {
        let item = movies.documentaries[index];

        moviesSection.innerHTML += `
        <div class="col-6 col-md-4 col-lg-3 mb-4">
            <div class="underworld-release-card card h-100" data-index="${index}">
                <div class="release-img-wrapper">
                    <img src="${item.poster}" class="card-img-top img-fluid" alt="${item.title}">
                </div>
                <div class="release-quick-info p-3">
                    <h5 class="release-album-title-grid">${item.title.toUpperCase()}</h5>
                    <span class="release-artist-badge-grid">${item.director}</span>
                </div>
            </div>
        </div>
        `;
    }

    createInteractiveRectangularModal();
    createDetailsModalStructure();

    const cards = document.querySelectorAll('.underworld-release-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const index = card.getAttribute('data-index');
            const data = movies.documentaries[index];
            openRectangularInfo(data);
        });
    });

    initRosterInteractivity(movies.documentaries);
});

function createInteractiveRectangularModal() {
    if (document.getElementById('albumInfoModal')) return;

    const modalElement = document.createElement('div');
    modalElement.className = 'modal fade';
    modalElement.id = 'albumInfoModal';
    modalElement.setAttribute('tabindex', '-1');
    modalElement.setAttribute('aria-hidden', 'true');
    
    modalElement.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content rectangular-player-card">
                <div class="modal-body p-0">
                    <div class="row g-0">
                        <div class="col-md-5 display-cover-pane">
                            <img id="recModalPoster" src="" alt="" class="img-fluid visual-cover-main">
                        </div>
                        <div class="col-md-7 display-data-pane p-4 d-flex flex-column justify-content-between">
                            <div>
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <span class="tech-label-header">ALBUM DETAILS</span>
                                    </div>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                
                                <div class="metadata-table mb-4">
                                    <div class="meta-row">
                                        <span class="meta-label">TITLE</span>
                                        <span class="meta-value" id="recModalTitle"></span>
                                    </div>
                                    <div class="meta-row">
                                        <span class="meta-label">RELEASE YEAR</span>
                                        <span class="meta-value" id="recModalYear"></span>
                                    </div>
                                    <div class="meta-row">
                                        <span class="meta-label">TRACKS</span>
                                        <span class="meta-value" id="recModalLength"></span>
                                    </div>
                                    <div class="meta-row">
                                        <span class="meta-label">GENRE</span>
                                        <span class="meta-value">Vaporwave / Urban Variant</span>
                                    </div>
                                </div>

                                <div class="biography-block">
                                    <span class="tech-label-header d-block mb-2">ARTIST BIOGRAPHY</span>
                                    <p class="biography-text" id="recModalSynopsis"></p>
                                </div>
                            </div>

                            <div class="spotify-integration-wrapper pt-3">
                                <a id="recModalSpotifyBtn" href="#" target="_blank" class="spotify-brutalist-button">
                                    <div class="spotify-wave">
                                        <span></span><span></span><span></span><span></span>
                                    </div>
                                    <div class="spotify-brand">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-spotify me-2" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.5.5 0 0 1-.218-.976c3.05-.696 5.662-.396 7.769.892a.5.5 0 0 1 .163.689m.712-2.182a.625.625 0 0 1-.861.206c-2.148-1.32-5.424-1.705-7.957-.937a.625.625 0 0 1-.366-1.2c2.898-.88 6.51-.453 8.977 1.066a.63.63 0 0 1 .207.865m.073-2.28c-2.574-1.53-6.814-1.67-9.264-.926a.75.75 0 1 1-.44-1.435c2.819-.856 7.5-.694 10.465 1.067a.75.75 0 1 1-.762 1.294"/>
                                        </svg>
                                        SPOTIFY
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalElement);
}

function openRectangularInfo(data) {
    document.getElementById('recModalPoster').src = data.poster;
    document.getElementById('recModalTitle').textContent = data.title.toUpperCase();
    document.getElementById('recModalYear').textContent = data.year;
    document.getElementById('recModalLength').textContent = data.length;
    document.getElementById('recModalSynopsis').textContent = data.synopsis;

    const query = encodeURIComponent(`${data.title} ${data.director}`);
    document.getElementById('recModalSpotifyBtn').href = `https://open.spotify.com/search/${query}`;

    const element = document.getElementById('albumInfoModal');
    const modalInstance = bootstrap.Modal.getInstance(element) || new bootstrap.Modal(element);
    modalInstance.show();
}

function initRosterInteractivity(artistsData) {
    const frames = document.querySelectorAll('.video-artist-frame');
    
    frames.forEach(frame => {
        const id = frame.getAttribute('data-artist-id');
        const match = artistsData.find(item => String(item.id) === String(id));
        
        if (match) {
            frame.addEventListener('click', (e) => {
                e.preventDefault();
                openArtistProfile(match);
            });
        }
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
                            <div class="modal-img-frame modal-artist-img-frame">
                                <img id="modalArtistImg" src="" alt="" class="modal-artist-img-inner">
                            </div>
                        </div>
                        <div class="col-md-7 d-flex flex-column justify-content-between">
                            <div>
                                <div class="row mb-3">
                                    <div class="col-6">
                                        <span class="modal-label-tech">Style / Genre</span>
                                        <p id="modalArtistGenre" class="modal-value-tech mt-1 text-uppercase">URBAN VARIANT</p>
                                    </div>
                                    <div class="col-6">
                                        <span class="modal-label-tech">Release Year</span>
                                        <p id="modalArtistOrigin" class="modal-value-tech mt-1"></p>
                                    </div>
                                </div>
                                <hr class="modal-artist-divider">
                                <span class="modal-label-tech d-block mb-2">Album Overview</span>
                                <p id="modalArtistBio" class="modal-bio-text"></p>
                            </div>
                            <div class="pt-3 text-end">
                                <span class="modal-label-tech me-2">STATUS:</span>
                                <span id="modalArtistFee" class="badge bg-white text-dark fw-bold rounded-0 px-3 py-2 roster-status-badge">OFFICIAL ROSTER</span>
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
    document.getElementById('modalArtistName').textContent = artist.director.toUpperCase();
    document.getElementById('modalArtistOrigin').textContent = artist.year;
    document.getElementById('modalArtistBio').textContent = artist.synopsis;
    document.getElementById('modalArtistFee').textContent = `ALBUM: ${artist.title}`;
    
    const img = document.getElementById('modalArtistImg');
    img.src = artist.poster;
    img.alt = artist.director;
    
    const element = document.getElementById('artistModal');
    const modalInstance = bootstrap.Modal.getInstance(element) || new bootstrap.Modal(element);
    modalInstance.show();
}

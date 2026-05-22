# ADDLESS MOTIONS — The Card Gallery

A visual catalog web landing built as part of The Card Gallery project. ADDLESS MOTIONS is a fictional music agency showcasing its artist roster and discography through dynamic cards loaded from a JSON Server.

---

## Theme

The project is themed around a music agency called **ADDLESS MOTIONS**. The catalog displays 11 artists and their albums, each with a poster, release year, track count, and biography. The aesthetic draws from underground urban music, vaporwave, and brutalist web design.

---

## Design

The visual identity is built around a dark matte palette (`#0a0a0c`) with white typography and high-contrast elements. The design uses two Google Fonts:

- **Syne** — display font for headings and titles, bold and geometric
- **Inter** — body font for metadata and descriptions, clean and readable

The layout is split into two sections:

- **Roster** — a horizontal expandable grid of artist portraits in grayscale with a hover expansion effect
- **Releases** — a Bootstrap card grid showing album artwork loaded dynamically from `db.json`

Clicking a roster photo opens a dark brutalist modal with artist details. Clicking an album card opens a white rectangular modal with metadata and a Spotify search button with animated sound wave.

Custom gradients are used throughout: the card overlay uses a vertical fade from transparent to near-black, and the navbar uses a textured image background.

No inline CSS is used anywhere — all styles are defined in `styles.css`.

---

## Screenshots

### Preloader
![Preloader](./screenshots/preloader.png)

### Roster — Artist Grid
![Roster](./screenshots/roster.png)

### Artist Modal
![Artist Modal](./screenshots/artist-modal.png)

### Album Modal
![Album Modal](./screenshots/album-modal.png)

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML | Structure |
| CSS | Visual design |
| JavaScript | DOM logic and fetch |
| JSON Server | Simulated REST API |
| Bootstrap 5 | Card components |
| Google Fonts | Syne + Inter |
| Cloudinary | Image hosting |

---

## Project Structure

```
ADDLESS-MOTIONS/
├── index.html
├── styles.css
├── app.js
├── json/
│   └── db.json
└── README.md
```

---

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- JSON Server installed globally:

```bash
npm install -g json-server
```

### Steps

1. Clone the repository:

```bash
git clone https://github.com/Hiiinojosaa/ADDLESS-MOTIONS.git
cd ADDLESS-MOTIONS
```

2. Start JSON Server:

```bash
json-server --watch json/db.json --port 3000
```

3. Open `index.html` in your browser (use Live Server or any local server).

> The fetch in `app.js` points to `./json/db.json` for static use. If using JSON Server, update the `requestURL` in `app.js` to `http://localhost:3000/documentaries`.

---

## Live Demo

🔗 [View on Vercel](https://addless-motions-2rntzkeip-hiiinojosaas-projects.vercel.app)

---

## Author

Made by **@Hiiinojosaa**

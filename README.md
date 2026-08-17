# Carvello AI

Repository principal pentru Carvello AI CAD/CAM.

## Regula proiectului
Acest repository este separat de `CarvelloBiesse`. Nu reutilizăm shell-ul vechi și nu copiem module v9/v10 direct peste baza nouă.

## Pornire pe Windows
După clonarea repository-ului o singură dată, rulează:

`START_CARVELLO.bat`

La fiecare pornire, scriptul încearcă automat `git pull --ff-only`, apoi pornește aplicația local. Nu mai trebuie descărcată manual fiecare versiune.

## Dezvoltare
- `index.html` — shell CAD
- `styles-v11.css` — UI
- `core-v11.js` — model proiect / istoric / geometrie de bază
- `render-v11.js` — viewport WebGL
- `ui-v11.js` — binding UI
- `tests/` — teste funcționale și vizuale
- `.github/workflows/` — audit automat GitHub Actions

## Principii
- un singur proiect activ;
- toolbar CAD permanent, fără scroll;
- selector clar Piesă / Corp;
- Project Tree în stânga;
- Properties contextual în dreapta;
- viewport central;
- funcțiile noi intră numai după teste;
- fără stări duplicate ale proiectului.

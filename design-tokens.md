# Design Tokens — Direction A « Cahier d'ingénieur »

> Tous les tokens sont définis dans `app/globals.css` (bloc `@theme` + sections utilitaires) et chargés via `next/font/google` dans `app/layout.tsx`.

## Palette — encre chaude (dark)

| Token | Valeur | Usage |
|---|---|---|
| `--color-bg` | `#0e0d0b` | Fond principal (encre chaleureuse, plus de `#0a0a12` froid) |
| `--color-bg-subtle` | `#121110` | Bandeaux footer / fonds alternés |
| `--color-bg-muted` | `#161412` | Modal, overlays |
| `--color-surface` | `#1a1815` | Cartes, blocs |
| `--color-surface-1` | `#211e1a` | Cartes hover / niveaux 2 |
| `--color-surface-2` | `#29251f` | Scrollbar, niveaux 3 |
| `--color-text-primary` | `#f2ede2` | Titres |
| `--color-text-secondary` | `#a89f8d` | Corps de texte |
| `--color-text-muted` | `#6b6455` | Légendes mono |
| `--color-border` | `rgba(242,237,226,0.08)` | Filets standards |
| `--color-border-warm` | `rgba(203,191,164,0.16)` | Filets plus visibles |
| `--color-border-2` | `rgba(232,72,43,0.28)` | Liserés accent |

## Accents (un seul vrai accent + dérivés chauds)

| Token | Valeur | Usage |
|---|---|---|
| `--color-accent` | `#e8482b` | **Couleur signature** : CTAs, curseur, points actifs |
| `--color-accent-bright` | `#ff5d38` | Hover accent |
| `--color-accent-dim` | `#a32f1a` | Degrés sombres |
| `--color-rust` | `#b3541e` | Marquers FIG./section, keyword serif |
| `--color-ochre` | `#d9a441` | Secondary warm (tabs, badges) |
| `--color-olive` | `#a3a04e` | "What I learned", tags |
| `--color-teal-ink` | `#3f8f7f` | Solution / DevOps / backend badges |
| `--color-clay` | `#c96f4a` | Challenges |
| `--color-denim` | `#5b7ba6` | Education, liens |
| `--color-paper` | `#f4f0e6` | Fond light mode |
| `--color-linen` | `#cbbfa4` | Texte mono clair |

**Règle d'or** : le vermillon `#e8482b` est réservé aux actions ; tout le reste du travail visuel se fait avec les dérivés chauds à faible opacité. Plus de violet/cyan/vert néon.

## Typographie

| Role | Police | Variable CSS | Notes |
|---|---|---|---|
| Display (titres) | **Archivo** (variable, axe `wdth`) | `--font-display` | Utiliser classe `.font-display` (erset `font-stretch: 125%`) ; titres en majuscules, tracking serré |
| Accent éditorial | **Instrument Serif** (italic) | `--font-serif` | Classe `.serif-accent` — italiques élégants dans les titres (`<em>`) |
| Mono (labels, légendes, boutons) | **JetBrains Mono** | `--font-mono` | Métadonnées, FIG., numéros, boutons (uppercase + letter-spacing) |
| Corps | **Inter** | `--font-sans` | Texte courant |

Chargement fonts : `app/layout.tsx` (Archivo avec `axes: ["wdth"]`, Instrument_Serif + italic).

## Rythme & espacement

| Token | Valeur |
|---|---|
| `.section` | `clamp(4.5rem, 10vw, 7.5rem)` |
| `.section-sm` | `clamp(3rem, 6vw, 4.5rem)` |
| `.section-lg` | `clamp(6rem, 14vw, 9.5rem)` |
| Conteneur | `max-width: 1320px`, padding `clamp(1.25rem, 4vw, 2.5rem)` |
| Header de section | `SectionHeader` (FIG. xx + filet + title clip reveal + note) — `components/ui/SectionHeader.tsx` |

## Motifs signature

- Marquers `FIG. 01 — about`, pagination `01 ⁄ 06` (SectionHeader).
- Séparateur de sections : filet + croix `+` (`SectionDivider`).
- Croix de repère aux coins (SVG `<line>`) sur les cadres type plan.
- Plan gravé monochrome dans le hero (SVG, lignes hairline, points SMIL animés).
- Boutons **carrés** (`border-radius: 0.375rem`), mono uppercase, min-height 44px.
- Chips `.tech-chip` — coins 0.3rem, filets chauds.
- Noise overlay `body::after` opacité 0.03.

## Light mode

Surcharges dans `.light { ... }` : fond papier `#f4f0e6`, encre `#1a150e`. Tokens textes/borders remplacés ; accents inchangés.

## Ajustements rapides

1. **Couleur de fond** : modifier `--color-bg` + valeurs surface (dark), `.light` pour le mode clair.
2. **Accent** : changer `--color-accent`, `--color-accent-bright`, `--color-rust` (et les dérivés), puis `::selection`, scrollbar, `.btn-primary`.
3. **Typographie** : remplacer les imports dans `layout.tsx` + les noms dans `@theme`. La classe `.font-display` gère la largeur (wdth).
4. **Accents par projet** : liste `accents` dans `components/sections/Projects.tsx` (5 duos chauds, rotation par index).
5. **Sections** : passer par `SectionHeader` pour la numérotation (index 01→06).
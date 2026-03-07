# Project Structure

## Directory Layout
```
code/
├── index.html              # Homepage with hero and quick actions
├── style.css               # Global styles and CSS custom properties
├── main.js                 # Entry point (duplicate, not used)
├── html/                   # Feature pages
│   ├── about.html
│   ├── chat.html          # Raksha Chat (5-layer emotional processing)
│   ├── community.html     # Anonymous community posts
│   ├── journal.html       # Personal journaling
│   ├── mood.html          # Mood tracking with charts
│   └── resources.html     # Mental health resources
├── js/                    # Modular JavaScript
│   ├── main.js           # Global state and initialization
│   ├── animations.js     # Stagger animations and IntersectionObserver
│   ├── chat.js           # Chat layer logic
│   ├── community.js      # Community post management
│   ├── journal.js        # Journal entry management
│   ├── mood.js           # Mood tracking and Chart.js integration
│   ├── modal.js          # Shanti modal and breathing exercises
│   └── navigation.js     # Mobile menu toggle
└── images/
    ├── bg.jpeg           # Background image
    └── logo.png          # Mindful Nest logo
```

## Code Organization

### HTML Pages
- Each page includes full navigation and footer
- Pages load all JS modules (not optimized for production)
- Shared layout and styling via `style.css`

### CSS Architecture
- CSS custom properties in `:root` for theming
- Component-based classes (`.card`, `.btn-primary`, `.emotion-pill`)
- Utility classes from Tailwind CSS
- Responsive breakpoints at 768px (mobile/desktop)

### JavaScript Modules
- `main.js`: Global state object, initialization, sample data
- Feature-specific files handle their own logic
- Functions are globally scoped (no modules/imports)
- Event handlers attached via `onclick` attributes

## Naming Conventions
- CSS classes: kebab-case (`.nav-link`, `.quick-card`)
- JavaScript functions: camelCase (`selectEmotion`, `toggleMobileMenu`)
- CSS custom properties: kebab-case with semantic names (`--saffron-muted`, `--indigo-deep`)
- IDs: camelCase (`chatMessages`, `mobileNav`)

## Key Patterns
- Stagger animations using IntersectionObserver
- Page transitions with `.page.active` class
- Modal overlays with fixed positioning
- localStorage for all data persistence
- Inline styles for dynamic theming (using CSS custom properties)

# Technical Stack

## Core Technologies
- HTML5, CSS3, JavaScript (vanilla, no frameworks)
- Tailwind CSS (via CDN)
- Chart.js (for mood visualization)
- Google Fonts: Playfair Display (headings), Source Sans 3 (body)

## Build System
No build system required. This is a static web application that runs directly in the browser.

## Project Structure
- Static HTML pages with shared navigation
- CSS custom properties for theming
- Modular JavaScript files for each feature
- Local storage for data persistence

## Common Commands
Since this is a static site, no build commands are needed. Simply:
- Open `index.html` in a browser to run locally
- Use a local server for development: `python -m http.server 8000` or `npx serve`
- Deploy by uploading files to any static hosting service

## Data Storage
- localStorage API for all user data (journal entries, mood logs, community posts, chat history)
- No backend or database required
- Data persists only on the user's device

## Browser Compatibility
Modern browsers with ES6+ support required for:
- CSS custom properties
- localStorage
- IntersectionObserver (for animations)
- Arrow functions and template literals

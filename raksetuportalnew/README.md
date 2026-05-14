# RaktaSetu — India's Blood Availability & Donation Platform

RaktaSetu is a modern web platform that connects blood donors, patients, and blood banks across India. It provides real-time blood availability search, donor registration, and emergency blood request capabilities.

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **React Router 7** | Client-side routing |
| **Vite 7** | Build tool & dev server |
| **Lucide React** | Icon library |
| **Vanilla CSS** | Styling (no Tailwind) |

## Features

- 🔍 **Blood Availability Search** — Filter by state, district, blood group, and component
- 📍 **Blood Center Directory** — Find nearby registered blood banks
- ❤️ **Donor Registration** — Simple signup process with eligibility criteria
- 🏥 **Blood Bank Dashboard** — Inventory management panels for registered centers
- 🚨 **Emergency Requests** — Urgent blood request notifications
- 📊 **Analytics** — Usage trends and demand forecasting
- 🔒 **Data Privacy** — Encrypted personal health information

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/raktasetu-platform.git
cd raktasetu-platform

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Button.jsx/css        # Reusable button system
│   ├── ErrorBoundary.jsx     # React error boundary
│   ├── Footer.jsx/css        # Site footer
│   ├── Layout.jsx/css        # Page layout wrapper
│   ├── Navbar.jsx/css        # Navigation with dropdowns
│   └── ScrollToTop.jsx       # Scroll restoration
├── pages/
│   ├── Home.jsx/css          # Landing page with 7 sections
│   ├── Features.jsx/css      # Platform features grid
│   ├── HowItWorks.jsx/css    # Tabbed process guide
│   ├── ForBloodBanks.jsx/css # Blood bank onboarding
│   ├── About.jsx/css         # Mission & values
│   ├── Contact.jsx/css       # Contact form with validation
│   ├── BloodAvailability.jsx/css # Search filters & results
│   ├── PrivacyPolicy.jsx     # Privacy policy
│   ├── Terms.jsx             # Terms of service
│   ├── NotFound.jsx/css      # 404 page
│   └── Legal.css             # Shared legal page styles
├── App.jsx                   # Routes + lazy loading
├── main.jsx                  # Entry point
└── index.css                 # Global design system
```

## Design

The UI follows a **government portal** aesthetic inspired by India's e-RaktKosh platform:
- Dark maroon primary color (#8B0000)
- Two-tier header (logo + search / navigation bar)
- Ticker bar for announcements
- Card-based layouts with hover animations
- Responsive across all breakpoints

## Production Readiness

- ✅ Full SEO (meta tags, Open Graph, Twitter cards)
- ✅ Accessibility (skip-to-content, ARIA labels, focus-visible)
- ✅ Error Boundary with fallback UI
- ✅ Code splitting (lazy-loaded routes + vendor chunking)
- ✅ 404 page for invalid routes
- ✅ Form validation (email format, required fields)
- ✅ robots.txt
- ✅ Custom branded favicon

## License

MIT

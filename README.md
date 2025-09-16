# Donor Finder Frontend

A modern web application for discovering foundations, grantmakers, and donors to support nonprofit missions. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Donor Discovery**: Browse through a paginated grid of nonprofit organizations and foundations
- **Detailed Profiles**: View comprehensive donor information including financial data and filing history
- **Financial Insights**: Display revenue, assets, expenses, and liabilities with year-over-year comparisons
- **Filing History**: Access historical tax filings with downloadable PDFs
- **Mobile-First Design**: Responsive design optimized for all device sizes
- **Modern UI**: Built with shadcn/ui components for a clean, professional interface

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm
- Access to the Donor Finder Backend API

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd donor_finder_frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure the API endpoint:
   - Set the `NEXT_PUBLIC_API_URL` environment variable, or
   - Update the `config.apiUrl` in `lib/config.ts`

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## API Integration

The frontend integrates with the Donor Finder Backend API:

### Endpoints Used

- `GET /api/v1/organizations/?limit={limit}&offset={offset}` - List organizations with pagination
- `GET /api/v1/organizations/{ein}` - Get organization details with filing history

### Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: `http://0.0.0.0:8000/api/v1`)

## Project Structure

```
app/
├── donor/[ein]/         # Dynamic donor detail pages
│   ├── page.tsx         # Donor detail page
│   └── not-found.tsx    # 404 page for invalid donors
├── globals.css          # Global styles
├── layout.tsx           # Root layout
└── page.tsx             # Home page

components/
├── ui/                  # shadcn/ui components
├── donor-card.tsx       # Donor card component
├── donor-details.tsx    # Donor detail view
├── donor-grid.tsx       # Paginated donor grid
├── donor-grid-skeleton.tsx  # Loading skeleton
└── filing-history.tsx   # Filing history component

lib/
├── api.ts              # API client functions
├── config.ts           # Configuration
├── types.ts            # TypeScript type definitions
└── utils.ts            # Utility functions
```

## Key Components

### DonorGrid
- Displays paginated list of donors in a responsive grid
- Includes loading states and error handling
- Smooth pagination with URL state management

### DonorCard
- Compact donor information display
- Shows location, NTEE code, and last update
- Hover effects and click navigation

### DonorDetails
- Comprehensive donor profile page
- Financial overview with key metrics
- External links to GuideStar and NCCS

### FilingHistory
- Historical tax filing data
- Year-over-year revenue comparison
- Downloadable PDF links

## Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: 1024px - 1280px (3 columns)
- Large Desktop: > 1280px (4 columns)

## Performance Features

- Server-side rendering with Next.js App Router
- Optimized images and fonts
- Code splitting and lazy loading
- Efficient pagination with minimal data fetching

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Adding New Components

1. Create component in `components/` directory
2. Export from component file
3. Import and use in pages or other components
4. Add TypeScript types as needed

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Ensure responsive design for new components
4. Test on multiple screen sizes
5. Run linting before committing

## License

This project is part of the Donor Finder MVP application.
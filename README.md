# Donor Finder Frontend

A modern web application for discovering foundations, grantmakers, and donors to support nonprofit missions. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Donor Discovery**: Browse through a paginated grid of nonprofit organizations and foundations
- **Semantic Search**: Natural language search with AI-powered relevance scoring
- **Advanced Filtering**: Filter by state, organization type (501c3, etc.), and search type
- **Detailed Profiles**: View comprehensive donor information including financial data and filing history
- **Financial Insights**: Display revenue, assets, expenses, and liabilities with year-over-year comparisons
- **Filing History**: Access historical tax filings with downloadable PDFs
- **Search Results**: Relevance scoring with star ratings and match type indicators
- **Mobile-First Design**: Responsive design optimized for all device sizes
- **Modern UI**: Built with shadcn/ui components for a clean, professional interface

## Tech Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.17+ or 20+ (recommended: use the latest LTS version)
- **pnpm** 8+ (install via `npm install -g pnpm`)
- **Git** for version control

### Local Development Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd donor_finder_frontend
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Environment Configuration:**
   
   Create a `.env.local` file in the root directory (optional):
```bash
# Optional: Override the default API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

   **Note**: If no environment variable is set, the app defaults to `http://0.0.0.0:8000/api/v1`

4. **Start the development server:**
```bash
pnpm dev
```

5. **Open the application:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app will automatically reload when you make changes

### Production Build

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

The production server will run on [http://localhost:3000](http://localhost:3000) by default.

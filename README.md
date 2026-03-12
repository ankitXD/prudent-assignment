# Patient Directory

A modern patient management dashboard built with Next.js 16, React 19, and Tailwind CSS 4. Browse, search, filter, and view detailed patient profiles with a responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Patient Directory** — View 1,000 patient records with pagination (10 per page)
- **Table & Card Views** — Toggle between table and card layouts
- **Search** — Debounced search by patient name (300ms)
- **Filters** — Filter by medical issue and age range
- **Sorting** — Sort by name (A-Z/Z-A) or age (ascending/descending)
- **Patient Profile** — Click any patient to view detailed profile with:
  - Vitals & clinical performance
  - Clinical alerts
  - Recent activity timeline
  - Medical summary & medications
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Loading States** — Skeleton loaders for both table and card views

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Font:** Manrope (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/ankitXD/prudent-assignment.git
cd prudent-assignment

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/
│   ├── api/patients/     # API route for patient data
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with Manrope font
│   └── page.tsx          # Main page component
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── filters.tsx       # Medical issue & age filters
│   ├── loading.tsx       # Skeleton loaders
│   ├── pagination.tsx    # Pagination controls
│   ├── patient-card.tsx  # Card view component
│   ├── patient-profile.tsx # Patient detail view
│   ├── patient-table.tsx # Table view component
│   ├── search-bar.tsx    # Debounced search input
│   └── sort-controls.tsx # Sort dropdown
├── data/
│   └── data.json         # Mock patient data (1,000 records)
├── lib/
│   ├── getPatients.ts    # API client helper
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
└── hooks/
    └── use-mobile.ts     # Mobile detection hook
```

## API

### GET /api/patients

Returns paginated patient data with filtering and sorting.

**Query Parameters:**

| Parameter       | Type   | Description                          |
| --------------- | ------ | ------------------------------------ |
| `page`          | number | Page number (default: 1)             |
| `limit`         | number | Records per page (default: 10)       |
| `search`        | string | Search by patient name               |
| `medical_issue` | string | Filter by medical condition          |
| `age`           | string | Age range (e.g., "19-35", "66-80")   |
| `sort`          | string | Sort field (`patient_name` or `age`) |
| `order`         | string | Sort order (`asc` or `desc`)         |

**Response:**

```json
{
  "data": [...],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}
```
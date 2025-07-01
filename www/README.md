# SpaceX Launch Dashboard

A React application for exploring SpaceX launch data. Built with TypeScript, Vite, and React Query.

## Features

- 🚀 **Launch Explorer**: Browse past, upcoming, latest, and next SpaceX launches
- 🎥 **Webcast Integration**: Embedded YouTube webcasts for launch viewing
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🔍 **Filtering**: Filter launches by status with pagination support
- 📈 **Analytics Ready**: Google Analytics integration for experiment tracking

## Project Structure

```
src/
├── api/                  # API layer and type definitions
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── pages/                # Page components
└── vite-env.d.ts         # Vite environment types
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- SpaceX Launch API backend running

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd spacex-launch-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Configure environment variables:

```env
VITE_API_URL=http://localhost:3001
VITE_GA_MEASUREMENT_ID=GA_MEASUREMENT_ID
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

The frontend connects to the SpaceX Launch API backend. Ensure the backend is running and accessible at the configured `VITE_API_URL`.

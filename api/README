# SpaceX Launch API

A Node.js REST API service that provides SpaceX launch data with clean architecture principles. This service fetches data from the SpaceX API and provides a normalized, paginated interface for accessing launch information.

## Features

- 🚀 **Launch Data**: Access past, upcoming, latest, and next SpaceX launches
- 📄 **Pagination**: Built-in pagination support for large datasets
- 🏗️ **Clean Architecture**: Follows Domain-Driven Design principles

## Architecture

This project follows Clean Architecture principles with clear separation of concerns:

```
├── domain/              # Business logic and entities
│   ├── entities/        # Core business entities
│   ├── repositories/    # Repository interfaces
│   └── useCases/        # Business use cases
├── application/         # Application services
│   └── services/        # External API services
├── infrastructure/      # External concerns
│   └── repositories/    # Repository implementations
└── presentation/        # API layer
    ├── controllers/     # Request handlers
    └── routes/          # Route definitions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd spacex-launch-api
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure environment variables:

```env
PORT=3001
SPACEX_URL=https://api.spacexdata.com/v5
NODE_ENV=development
```

5. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Health Check

```
GET /health
```

Returns server status and uptime information.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.5
}
```

### Get Launches

```
GET /api/launches?status={status}&limit={limit}&page={page}
```

**Query Parameters:**

- `status` (required): One of `past`, `upcoming`, `latest`, `next`
- `limit` (optional): Number of results per page (1-100, default: 10)
- `page` (optional): Page number (minimum: 1, default: 1)

**Launches payload format:**

```json
{
  "data": [
    {
      "id": "launch-id",
      "name": "Mission Name",
      "flightNumber": 123,
      "rocket": "falcon9",
      "status": "success",
      "dateUTC": "2024-01-15T10:30:00.000Z",
      "launchSite": "KSC LC-39A",
      "payload": "Starlink",
      "cores": [
        {
          "id": "core-id",
          "name": "core-name",
          "flight": 5,
          "gridfins": true,
          "legs": true,
          "reused": true
        }
      ],
      "webcastId": "youtube-video-id"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15,
    "hasNextPage": true
  }
}
```

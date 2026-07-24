# 🎬 OTT App - Multi-Service Streaming Platform

A comprehensive Over-The-Top (OTT) streaming application that aggregates content from multiple streaming services including JioTV, AirtelXtream, and Tata Play Binge.

## Features

### 🎥 Core Features
- **Multi-Service Integration**: Connect and stream from JioTV, AirtelXtream, and Tata Play
- **Content Aggregation**: Unified library from multiple OTT services
- **Personalized Watchlist**: Save and manage favorite content
- **Continue Watching**: Resume playback from where you left off
- **HLS Video Streaming**: Adaptive bitrate streaming for smooth playback
- **Advanced Search & Filtering**: Filter by genre, type, language, and more

### 👤 User Features
- **User Authentication**: Secure JWT-based authentication
- **User Profiles**: Personalized preferences and settings
- **Subscription Plans**: Free, Basic, Premium, and Family plans
- **Rating & Reviews**: Rate and review content
- **Watchlist Management**: Add/remove content from watchlist

### 🎯 Content Management
- **Movies & TV Shows**: Browse extensive library
- **Multiple Genres**: Action, Comedy, Drama, Horror, Romance, etc.
- **Multiple Languages**: Support for multiple audio tracks and subtitles
- **Quality Options**: SD, HD, FHD, 4K streaming

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **API Integration**: Axios
- **Security**: bcryptjs for password hashing

### Frontend
- **Framework**: React.js 18+
- **Styling**: Tailwind CSS + Custom CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Create React App

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database**: MongoDB (containerized)

## Quick Start

### Prerequisites
- Node.js 14+
- MongoDB 4.0+
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kamalabkalpane5-ops/OTT-APP.git
cd OTT-APP
```

2. **Setup environment variables**
```bash
cp .env.example .env
```

3. **Install dependencies**
```bash
npm run install-all
```

4. **Start with Docker Compose**
```bash
docker-compose up
```

The app will be available at `http://localhost:5000`

### Manual Setup

1. **Start MongoDB**
```bash
docker run -d -p 27017:27017 mongo
```

2. **Start backend**
```bash
npm run dev
```

3. **Start frontend** (in another terminal)
```bash
npm run client
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Content
- `GET /api/content` - Get all content with filters
- `GET /api/content/trending` - Get trending content
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/search/query` - Search content

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/watchlist/add` - Add to watchlist
- `POST /api/user/watchlist/remove` - Remove from watchlist
- `GET /api/user/watchlist` - Get watchlist
- `POST /api/user/continue-watching` - Update progress
- `GET /api/user/continue-watching` - Get continue watching

### Services
- `POST /api/services/jiotv/login` - Connect JioTV
- `POST /api/services/airtel/login` - Connect AirtelXtream
- `POST /api/services/tataplay/login` - Connect Tata Play
- `GET /api/services/subscribed` - Get subscribed services
- `POST /api/services/disconnect/:serviceName` - Disconnect service

## License

MIT License

## Contact

For support, open an issue on GitHub.

# Fun Friday Board Leaders Selection App

## Overview

This is a modern web application built for selecting "Fun Friday Board Leaders" through an interactive wheel-spinning interface. The app features a casino-style aesthetic with neon green accents, animations, and confetti effects to create an engaging user experience for selecting two random participants from a predefined pool of names.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom dark theme and neon green primary color
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for smooth animations and transitions
- **State Management**: React hooks for local state, TanStack Query for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement with Vite integration

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared TypeScript schemas and types
├── migrations/      # Database migration files
└── attached_assets/ # Design specifications and requirements
```

## Key Components

### Frontend Components
- **Home Page**: Main wheel-spinning interface with name selection logic
- **UI Library**: Comprehensive shadcn/ui components (buttons, badges, dialogs, etc.)
- **Animation System**: Framer Motion integration for smooth transitions
- **Sound Effects**: Web Audio API integration for spinning sound effects
- **Confetti System**: Custom confetti animation on winner selection

### Backend Components
- **Express Server**: RESTful API with middleware for logging and error handling
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Database Schema**: User table with Drizzle ORM and Zod validation
- **Development Tools**: Hot reloading and runtime error overlay integration

### Design System
- **Theme**: Dark background with neon green (#00C896) accents
- **Typography**: Geist Sans and Inter fonts
- **Color Palette**: Neutral grays with bright green primary color
- **Layout**: Fullscreen responsive design with centered content
- **Animations**: Casino-style effects with 3D button styling

## Data Flow

### Client-Side Flow
1. User loads the home page displaying the wheel interface
2. Clicking "Pick Board Leaders" triggers the spinning animation
3. Random selection algorithm chooses 2 winners from the name pool
4. Winners are displayed with confetti animation and sound effects
5. Results persist until the next spin

### Server-Side Flow (Prepared)
1. Express server handles API routes (currently minimal implementation)
2. Storage interface provides CRUD operations for user management
3. Database operations use Drizzle ORM with type-safe queries
4. Session management ready for user authentication features

### Name Selection Logic
- Hardcoded pool of 20 participant names
- Fisher-Yates shuffle algorithm for random selection
- Ensures no duplicate winners in single spin
- Immediate result display with visual feedback

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth transitions
- **wouter**: Lightweight React router

### UI and Styling
- **@radix-ui/***: Accessible UI primitives for component library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional class name utility

### Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite dev server with Express integration
- **Error Handling**: Runtime error modal for development
- **TypeScript**: Strict type checking across all modules
- **Path Aliases**: Organized imports with @ prefix for client code

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served through Express with proper routing fallback
- **Environment**: Production-ready with proper error handling

### Database Setup
- **Migrations**: Drizzle migrations in `./migrations` directory
- **Schema**: Shared schema definitions in `shared/schema.ts`
- **Connection**: Environment-based DATABASE_URL configuration
- **Push Command**: `npm run db:push` for schema synchronization

### Scripts
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build for both client and server
- `npm start`: Production server startup
- `npm run check`: TypeScript type checking
- `npm run db:push`: Database schema deployment
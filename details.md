# Waheed Aslam - MERN Developer Portfolio

## Overview

This is a personal portfolio website for Waheed Aslam, a MERN Stack Developer with a Bachelor's degree in Computer Science. The application is a single-page portfolio showcasing professional information, projects, skills, and contact details. It's built as a full-stack application with a React frontend and Express backend, though the current implementation focuses primarily on the frontend presentation layer with minimal backend functionality.

The portfolio features a modern, clean design with dark mode support, smooth scrolling navigation, and responsive layouts optimized for various screen sizes. The design follows professional developer portfolio standards with inspiration from modern web applications like Linear and Stripe.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Single-page application architecture with component-based design

**UI Component System:**
- Shadcn/ui component library (New York style variant) for consistent, accessible UI components
- Radix UI primitives for headless component functionality
- Tailwind CSS for utility-first styling with custom configuration
- Class Variance Authority (CVA) for component variant management

**State Management:**
- TanStack Query (React Query) for server state management and caching
- React Context for theme management (dark/light mode)
- Local component state with React hooks

**Styling Approach:**
- Custom Tailwind configuration with extended color palette supporting dark/light themes
- CSS custom properties for theme-aware colors
- Responsive design with mobile-first breakpoints
- Custom elevation/hover effects through utility classes

**Type System:**
- Shared schema definitions between frontend and backend using Zod
- Drizzle-zod for database schema validation
- Path aliases configured for clean imports (@/, @shared/, @assets/)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Development mode integrates Vite middleware for HMR
- Production mode serves static built files
- Request/response logging middleware for API monitoring

**Data Storage Strategy:**
- In-memory storage implementation (MemStorage class) for development
- Interface-based storage abstraction (IStorage) allowing easy swap to database
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver)
- Database schema defined with UUID primary keys and unique constraints

**API Design:**
- RESTful API pattern with /api prefix for all backend routes
- Centralized error handling middleware
- CORS and JSON body parsing configured
- Session-based architecture supported (connect-pg-simple configured)

**Development vs Production:**
- Conditional Vite setup only in development
- Separate build process for client (Vite) and server (esbuild)
- Environment-based configuration through NODE_ENV

### Design System

**Typography:**
- Primary font: DM Sans for UI text
- Monospace font: Geist Mono/Fira Code for code/technical elements
- Font loading optimized through Google Fonts with preconnect

**Color System:**
- HSL-based color tokens with alpha channel support
- Separate light/dark mode palettes
- Primary blue theme (217° hue) with neutral grays
- Semantic color naming (primary, secondary, destructive, muted, accent)

**Component Patterns:**
- Card-based layouts for content sections
- Fixed navigation with backdrop blur
- Grid systems for responsive project/skill displays
- Smooth scroll behavior for section navigation
- Hover elevation effects for interactive elements

## External Dependencies

### Core Framework Dependencies
- **React ecosystem**: react, react-dom, react-router (wouter)
- **Build tools**: Vite, esbuild, TypeScript
- **State management**: @tanstack/react-query for async state

### Database & ORM
- **Drizzle ORM**: Database toolkit with TypeScript support
- **@neondatabase/serverless**: PostgreSQL driver for Neon serverless
- **drizzle-kit**: CLI for database migrations
- **drizzle-zod**: Schema validation bridge

### UI Component Libraries
- **Radix UI**: Comprehensive set of primitives (20+ components imported)
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets (Simple Icons for tech logos)
- **cmdk**: Command palette component
- **vaul**: Drawer component (not currently used in implementation)
- **embla-carousel-react**: Carousel component
- **react-day-picker**: Date picker functionality

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **tailwindcss-animate**: Animation utilities
- **class-variance-authority**: Component variant system
- **clsx & tailwind-merge**: Conditional className utilities

### Form Management
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Validation resolvers
- **zod**: Schema validation library

### Development Tools
- **@replit/vite-plugin-***: Replit-specific development plugins
  - runtime-error-modal: Error overlay
  - cartographer: Code navigation
  - dev-banner: Development indicator

### Backend Utilities
- **express**: Web server framework
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)
- **date-fns**: Date manipulation utility

### Testing & Asset Management
- Stock images stored in `attached_assets/stock_images/` for hero, profile, and project displays
- Test IDs added to components for potential E2E testing
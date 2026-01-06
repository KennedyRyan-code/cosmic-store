# cosmic-store

A modern React application built with TypeScript, Vite, and TailwindCSS.

## Tech Stack

- **React 19** - Latest version of React
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Next-generation frontend tooling
- **TailwindCSS 4** - Utility-first CSS framework
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm 10+

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

### Build

```bash
# Build for production
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
cosmic-store/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and other assets
│   ├── App.tsx      # Main App component
│   ├── main.tsx     # Application entry point
│   ├── index.css    # Global styles with Tailwind
│   └── vite-env.d.ts # Vite type definitions
├── index.html       # HTML template
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
└── package.json     # Project dependencies
```

## Features

- ⚡️ Lightning-fast HMR (Hot Module Replacement)
- 🎨 TailwindCSS for rapid UI development
- 📘 TypeScript for type safety
- 🔧 ESLint for code quality
- 🚀 Optimized production builds

## License

MIT

# REACH Web Application

A premium, fully responsive web application built with Next.js, TypeScript, Tailwind CSS, and world-class animations.

## 🚀 Quick Start

**New to this project?** Start with **[START_HERE.md](./START_HERE.md)** for step-by-step instructions on updating from Figma.

**Ready to implement?** Follow **[UPDATE_FROM_FIGMA.md](./UPDATE_FROM_FIGMA.md)** for the complete workflow.

## Features

- 🎨 **Pixel-Perfect Design** - Built from Figma with exact specifications
- 🚀 **Next.js 14** - Latest App Router with TypeScript
- 🎭 **Premium Animations** - Framer Motion powered smooth animations
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- 🌓 **Dark/Light Theme** - System-aware theme switching
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- ⚡ **Performance** - Optimized images and code splitting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── pricing/           # Pricing page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── showcase/          # Animation showcase page
│   ├── loading.tsx        # Loading state
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── layout/           # Layout components
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── animations/       # Animation components
│       ├── scroll-reveal.tsx
│       ├── stagger-container.tsx
│       ├── counter.tsx
│       ├── parallax.tsx
│       └── magnetic.tsx
├── hooks/                # Custom React hooks
│   ├── use-theme.ts
│   └── use-scroll-reveal.ts
├── lib/                  # Utility functions
│   └── utils.ts
└── public/               # Static assets
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui patterns

## Animation Features

- **Page Transitions** - Smooth transitions between pages
- **Scroll Reveals** - Elements animate as they enter viewport
- **Staggered Animations** - Sequential animations for lists
- **Hover & Tap Feedback** - Interactive button and card animations
- **Floating Elements** - Continuous floating animations
- **Parallax Effects** - Depth-based scroll animations
- **Magnetic Effects** - Interactive magnetic hover effects
- **Animated Counters** - Numbers that count up on scroll
- **Micro-interactions** - Subtle animations throughout the UI

## Figma Integration

This project is set up for pixel-perfect implementation from Figma designs.

### Quick Start with Figma

1. **Extract Design Tokens**:
   - Open the Figma file
   - Enable Dev Mode (View > Developer Mode)
   - Extract colors, typography, spacing from `lib/design-tokens.ts`
   - Update values in `lib/design-tokens.ts`

2. **Update CSS Variables**:
   - Convert Figma hex colors to HSL
   - Update `app/globals.css` with exact color values

3. **Implement Screens**:
   - Use `FigmaWrapper` and `FigmaContainer` components for exact spacing
   - Use arbitrary Tailwind values for exact measurements: `h-[56px]`, `text-[24px]`
   - Follow `IMPLEMENTATION_GUIDE.md` for step-by-step instructions

### Documentation

- **FIGMA_INTEGRATION.md** - Complete guide for extracting and applying Figma specs
- **IMPLEMENTATION_GUIDE.md** - Step-by-step pixel-perfect implementation guide
- **lib/figma-utils.ts** - Helper functions for Figma value conversion

### Customization

### Theme Colors

Edit `app/globals.css` to customize the color scheme. Update with exact values from Figma.

### Animations

Animation configurations are in:
- `tailwind.config.ts` - CSS keyframes
- Component files - Framer Motion variants

## License

MIT


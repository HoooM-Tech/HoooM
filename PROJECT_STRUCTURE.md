# Project Structure

## Directory Overview

```
pricing/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with Navbar/Footer
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles & CSS variables
│   ├── loading.tsx              # Loading state
│   ├── not-found.tsx            # 404 page
│   ├── pricing/                 # Pricing page
│   │   └── page.tsx
│   ├── about/                   # About page
│   │   └── page.tsx
│   ├── contact/                 # Contact page
│   │   └── page.tsx
│   └── showcase/                # Animation showcase
│       └── page.tsx
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx           # Button with animations
│   │   ├── card.tsx             # Card component
│   │   ├── input.tsx            # Input field
│   │   ├── textarea.tsx         # Textarea
│   │   ├── badge.tsx            # Badge component
│   │   ├── avatar.tsx           # Avatar component
│   │   ├── separator.tsx        # Separator
│   │   ├── dialog.tsx           # Modal/Dialog
│   │   ├── toast.tsx            # Toast notifications
│   │   ├── skeleton.tsx         # Loading skeleton
│   │   └── loading-spinner.tsx  # Spinner
│   │
│   ├── layout/                  # Layout components
│   │   ├── navbar.tsx          # Navigation bar
│   │   └── footer.tsx          # Footer
│   │
│   ├── animations/              # Animation components
│   │   ├── scroll-reveal.tsx   # Scroll-triggered animations
│   │   ├── stagger-container.tsx # Staggered animations
│   │   ├── counter.tsx         # Animated counter
│   │   ├── parallax.tsx        # Parallax effect
│   │   ├── magnetic.tsx        # Magnetic hover effect
│   │   └── page-transition.tsx  # Page transitions
│   │
│   └── figma-wrapper.tsx       # Figma-specific helpers
│
├── hooks/                        # Custom React hooks
│   ├── use-theme.ts             # Theme management
│   └── use-scroll-reveal.ts     # Scroll reveal hook
│
├── lib/                          # Utility functions
│   ├── utils.ts                 # General utilities (cn, etc.)
│   ├── design-tokens.ts         # Design tokens from Figma
│   └── figma-utils.ts           # Figma conversion helpers
│
├── scripts/                      # Utility scripts
│   └── extract-figma-tokens.js  # Token extraction helper
│
├── public/                       # Static assets
│   └── .gitkeep
│
├── Configuration Files
│   ├── package.json             # Dependencies
│   ├── tsconfig.json            # TypeScript config
│   ├── tailwind.config.ts      # Tailwind CSS config
│   ├── postcss.config.mjs       # PostCSS config
│   ├── next.config.js          # Next.js config
│   └── .eslintrc.json          # ESLint config
│
└── Documentation
    ├── README.md                # Main readme
    ├── SETUP.md                 # Setup instructions
    ├── FIGMA_INTEGRATION.md     # Figma integration guide
    ├── IMPLEMENTATION_GUIDE.md  # Implementation steps
    ├── FIGMA_QUICK_START.md     # Quick start guide
    └── PROJECT_STRUCTURE.md     # This file
```

## Key Files Explained

### App Directory (`app/`)

- **`layout.tsx`**: Root layout wrapping all pages. Includes Navbar, Footer, and ToastProvider.
- **`page.tsx`**: Home/landing page with hero section, features, and CTA.
- **`globals.css`**: Global styles, CSS variables for theming, and custom animations.
- **`loading.tsx`**: Loading state shown while pages load.
- **`not-found.tsx`**: 404 error page.

### Components Directory (`components/`)

#### UI Components (`components/ui/`)
Reusable, styled components following shadcn/ui patterns:
- All components support animations
- Fully typed with TypeScript
- Accessible (ARIA attributes)
- Customizable via props

#### Layout Components (`components/layout/`)
- **`navbar.tsx`**: Responsive navigation with mobile menu and theme switcher
- **`footer.tsx`**: Footer with links and company info

#### Animation Components (`components/animations/`)
- **`scroll-reveal.tsx`**: Elements animate when scrolled into view
- **`stagger-container.tsx`**: Sequential animations for lists
- **`counter.tsx`**: Animated number counting
- **`parallax.tsx`**: Scroll-based parallax effects
- **`magnetic.tsx`**: Interactive magnetic hover effects
- **`page-transition.tsx`**: Smooth page transitions

#### Figma Helpers (`components/`)
- **`figma-wrapper.tsx`**: Components for pixel-perfect Figma implementation

### Hooks Directory (`hooks/`)

- **`use-theme.ts`**: Manages dark/light theme switching
- **`use-scroll-reveal.ts`**: Intersection Observer hook for scroll animations

### Lib Directory (`lib/`)

- **`utils.ts`**: General utilities (cn for className merging, etc.)
- **`design-tokens.ts`**: Centralized design tokens extracted from Figma
- **`figma-utils.ts`**: Helper functions to convert Figma values to CSS/Tailwind

## Design System

### Colors
Defined in:
- `lib/design-tokens.ts` → `colors` object
- `app/globals.css` → CSS variables (`--primary`, `--secondary`, etc.)

### Typography
Defined in:
- `lib/design-tokens.ts` → `typography` object
- Applied via Tailwind classes: `text-xl`, `font-bold`, etc.

### Spacing
Defined in:
- `lib/design-tokens.ts` → `spacing` object
- Applied via Tailwind: `p-4`, `gap-6`, etc.
- Use arbitrary values for exact Figma spacing: `p-[24px]`

### Components
All components follow consistent patterns:
- TypeScript interfaces for props
- Variant support via `class-variance-authority`
- Animation support via Framer Motion
- Accessibility built-in

## Adding New Pages

1. Create new directory in `app/`: `app/new-page/`
2. Create `page.tsx` inside: `app/new-page/page.tsx`
3. Export default component:
```tsx
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

## Adding New Components

1. Create component file: `components/ui/new-component.tsx`
2. Follow existing component patterns
3. Export from component file
4. Import where needed: `import { NewComponent } from "@/components/ui/new-component"`

## Styling Approach

### Tailwind CSS
- Utility-first approach
- Use arbitrary values for exact Figma measurements: `h-[56px]`
- Custom classes in `globals.css` for complex styles

### CSS Variables
- Theme colors defined in `app/globals.css`
- Use `hsl(var(--primary))` for colors
- Supports dark mode automatically

### Animations
- CSS keyframes in `tailwind.config.ts`
- Framer Motion for complex animations
- Use animation components for reusable patterns

## Figma Integration

### Design Tokens
Update `lib/design-tokens.ts` with values from Figma:
- Colors
- Typography
- Spacing
- Border radius
- Shadows

### CSS Variables
Update `app/globals.css` with exact color values from Figma

### Components
Use `FigmaWrapper` and `FigmaContainer` for exact spacing:
```tsx
<FigmaContainer figmaWidth={1440} figmaPadding={80}>
  {/* Content */}
</FigmaContainer>
```

## Best Practices

1. **Use TypeScript**: All components are fully typed
2. **Follow Patterns**: Use existing components as templates
3. **Accessibility**: Include ARIA attributes and keyboard navigation
4. **Responsive**: Always test mobile, tablet, and desktop
5. **Performance**: Use Next.js Image component for images
6. **Animations**: Keep animations smooth and performant
7. **Figma Match**: Use exact measurements from Figma when possible

## Common Patterns

### Page Structure
```tsx
export default function Page() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
      </div>
    </div>
  );
}
```

### Animated Section
```tsx
<ScrollReveal direction="up">
  <Card>
    {/* Content */}
  </Card>
</ScrollReveal>
```

### Staggered List
```tsx
<StaggerContainer>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

## Next Steps

1. Extract design tokens from Figma
2. Update colors and typography
3. Implement each screen page by page
4. Verify pixel-perfect match
5. Test responsive behavior
6. Add animations
7. Test accessibility



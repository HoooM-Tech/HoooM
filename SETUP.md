# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Overview

This is a premium Next.js application built with:

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Key Features Implemented

### ✅ Core Setup
- [x] Next.js 14 App Router configuration
- [x] TypeScript configuration
- [x] Tailwind CSS with custom theme
- [x] PostCSS and Autoprefixer

### ✅ UI Components
- [x] Button with animations
- [x] Card components
- [x] Input fields
- [x] Textarea
- [x] Badge
- [x] Avatar
- [x] Separator
- [x] Dialog/Modal
- [x] Toast notifications
- [x] Loading spinner
- [x] Skeleton loaders

### ✅ Layout Components
- [x] Responsive Navbar with mobile menu
- [x] Footer with links
- [x] Theme switcher (dark/light mode)

### ✅ Animation Components
- [x] ScrollReveal - Elements animate on scroll
- [x] StaggerContainer - Sequential animations
- [x] Counter - Animated number counting
- [x] Parallax - Scroll-based parallax effects
- [x] Magnetic - Interactive magnetic hover
- [x] PageTransition - Smooth page transitions

### ✅ Pages
- [x] Home page with hero section
- [x] Features section
- [x] Pricing page
- [x] About page
- [x] Contact page with form
- [x] Showcase page (animation demos)
- [x] 404 page
- [x] Loading states

### ✅ Responsive Design
- [x] Mobile-first approach
- [x] Tablet breakpoints
- [x] Desktop breakpoints
- [x] Large desktop support

### ✅ Accessibility
- [x] ARIA attributes
- [x] Keyboard navigation
- [x] Focus states
- [x] Semantic HTML

## Customization

### Colors
Edit `app/globals.css` to customize the color scheme. The theme uses CSS variables for easy customization.

### Animations
- CSS keyframes are defined in `tailwind.config.ts`
- Framer Motion animations are in component files
- Customize animation timing and easing in component files

### Components
All components are in `components/ui/` and can be customized as needed.

## Building for Production

```bash
npm run build
npm start
```

## Next Steps

1. **Connect to Figma Design**
   - Review the Figma file to match exact colors, spacing, and typography
   - Update CSS variables in `globals.css` to match Figma design tokens
   - Adjust component styles to match Figma specifications

2. **Add Content**
   - Replace placeholder content with real content
   - Add images to `public/` directory
   - Update metadata in `app/layout.tsx`

3. **API Integration**
   - Set up API routes in `app/api/`
   - Connect forms to backend services
   - Add data fetching with Next.js data fetching methods

4. **Optimization**
   - Add images using Next.js Image component
   - Implement code splitting
   - Add analytics
   - Set up error tracking

## Troubleshooting

### TypeScript Errors
If you see TypeScript errors about missing types, run:
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

### Tailwind Not Working
Make sure `tailwind.config.ts` includes all your file paths in the `content` array.

### Animations Not Working
Ensure `framer-motion` is installed:
```bash
npm install framer-motion
```

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)



# HoooM Pricing Landing Page

A premium, fully responsive pricing and landing page for HoooM's productized social media management system. Built with Next.js, TypeScript, Tailwind CSS, and world-class animations powered by Framer Motion.

## 🚀 Overview

This landing page showcases HoooM's social media management services with a focus on:
- **Problem-Solution Framework**: Highlights common social media challenges and presents HoooM as the solution
- **Clear Pricing Structure**: Three tiered pricing plans (Presence, Growth, Amplify)
- **Engaging Animations**: Premium micro-interactions and scroll-triggered animations throughout
- **Mobile-First Design**: Fully responsive across all screen sizes

## ✨ Features

### Design & UX
- 🎨 **Pixel-Perfect Design** - Carefully crafted UI with attention to detail
- 📱 **Fully Responsive** - Mobile-first design that works seamlessly on all devices
- 🎭 **Premium Animations** - Smooth, engaging animations powered by Framer Motion
- ⚡ **Performance Optimized** - Fast loading with Next.js Image optimization
- ♿ **Accessible** - Semantic HTML and proper ARIA attributes

### Animation Features
- **Stagger Animations** - Sequential reveals for headlines and list items
- **3D Tilt Effects** - Interactive card tilting based on mouse position
- **Parallax Scrolling** - Depth-based scroll animations for images
- **Magnetic Buttons** - Interactive hover effects on CTA buttons
- **Animated Counters** - Price numbers that count up on scroll
- **Chart Animations** - Animated bar charts and line graphs
- **Shake & Pulse Effects** - Attention-grabbing animations for alerts
- **Floating Elements** - Subtle continuous animations
- **Cascade Effects** - Staggered checkmark animations in pricing cards
- **Shimmer Effects** - Shine animations on "Most Popular" badges

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 📦 Project Structure

```
├── app/
│   ├── page.tsx           # Main landing page with all sections
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── animations/        # Animation components
│   │   ├── scroll-reveal.tsx
│   │   ├── stagger-container.tsx
│   │   ├── counter.tsx
│   │   ├── parallax.tsx
│   │   └── magnetic.tsx
│   └── figma-wrapper.tsx  # Figma integration utilities
├── hooks/
│   └── use-scroll-reveal.ts
└── public/                # Static assets (images)
```

## 🎯 Page Sections

### 1. Hero Section
- Animated headline with word-by-word stagger effect
- Floating hero image with scale animation
- Magnetic CTA buttons with hover effects
- Smooth fade-in animations

### 2. Problem Section
Four problem cards showcasing common social media challenges:
- **Inconsistent Posting**: Cards with shake animation and alert badges
- **No Clear Content Strategy**: 3D card stack visualization
- **Too Much Time Coordinating**: Simple problem statement
- **Low Engagement**: Animated bar chart with drawing line animation

### 3. Solution Section
- Staggered checklist items with pop animations
- Team image with parallax effect
- Clear value proposition presentation

### 4. How It Works Section
Four-step process cards:
- Alternate slide-in directions (left/right)
- Icon rotation animations with bounce
- Lift effect on hover

### 5. Pricing Section
Three pricing tiers:
- **Presence**: ₦120,000/month
- **Growth**: ₦220,000/month (Most Popular with shimmer effect)
- **Amplify**: ₦950,000/month
- Animated price counters
- Cascade checkmark animations
- Enhanced hover effects with scale and shadow

## 🚀 Getting Started

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

## 🎨 Customization

### Colors

The project uses Tailwind CSS with custom color classes. Main colors:
- **Teal**: `teal-400`, `teal-500` (primary CTA buttons)
- **Orange**: `orange-500` (badges and accents)
- **Gray**: Various shades for text and backgrounds
- **Red**: `red-500` (alert badges)

### Animations

Animation configurations are defined inline using Framer Motion:
- Spring physics: `{ type: "spring", stiffness: 300, damping: 20 }`
- Stagger delays: `0.1s`, `0.15s` for sequential animations
- Duration: `0.5s` to `0.8s` for most animations

### Responsive Breakpoints

- Mobile: Default styles
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+

## 🔧 Key Components

### Counter Component
Animated number counter that counts up when scrolled into view:
```tsx
<Counter value={120} duration={1.5} />
```

### Tilt3D Component
3D tilt effect based on mouse position:
```tsx
<Tilt3D>
  <div>Your content</div>
</Tilt3D>
```

### StaggerContainer & StaggerItem
Sequential animation wrapper:
```tsx
<StaggerContainer staggerDelay={0.15}>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
</StaggerContainer>
```

## 📱 Responsive Design

The page is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Adaptive spacing and padding
- Overflow protection to prevent horizontal scrolling

## ⚡ Performance

- Next.js Image optimization for all images
- Code splitting with Next.js App Router
- Optimized animations with Framer Motion
- Minimal bundle size

## 🐛 Troubleshooting

### Horizontal Scrolling on Mobile
If you experience horizontal scrolling, ensure:
- All sections have `overflow-x-hidden`
- Cards with `translate-x` have responsive values
- Fixed widths are replaced with responsive classes

### Animation Performance
For better performance:
- Use `viewport={{ once: true }}` for scroll animations
- Limit simultaneous animations
- Use `will-change` CSS property sparingly

## 📄 License

MIT

## 👥 Credits

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion.

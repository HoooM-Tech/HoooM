/**
 * Figma Design Update Script
 * 
 * This script helps update the project with values extracted from Figma.
 * 
 * Usage:
 * 1. Extract values from Figma using FIGMA_EXTRACTION_TEMPLATE.md
 * 2. Update the values object below
 * 3. Run: node scripts/update-from-figma.js
 * 
 * This will generate updated code snippets you can copy into the project.
 */

const figmaValues = {
  // Colors (hex format)
  colors: {
    primary: "#0ea5e9", // Replace with Figma primary color
    primaryHover: "#0284c7",
    secondary: "#64748b",
    background: "#ffffff",
    backgroundAlt: "#f8fafc",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    accent: "#8b5cf6",
    success: "#10b981",
    error: "#ef4444",
  },

  // Typography
  typography: {
    h1: { size: 72, weight: 700, lineHeight: 1.1 },
    h2: { size: 48, weight: 600, lineHeight: 1.2 },
    h3: { size: 36, weight: 600, lineHeight: 1.3 },
    body: { size: 16, weight: 400, lineHeight: 1.5 },
    button: { size: 16, weight: 600 },
  },

  // Spacing
  spacing: {
    containerMaxWidth: 1440,
    containerPadding: 80,
    sectionGap: 96,
    elementGap: 32,
  },

  // Components
  components: {
    button: {
      height: 56,
      paddingX: 32,
      paddingY: 16,
      borderRadius: 8,
    },
    input: {
      height: 48,
      padding: 16,
      borderRadius: 8,
    },
    card: {
      padding: 24,
      borderRadius: 12,
    },
  },
};

/**
 * Convert hex to HSL for CSS variables
 */
function hexToHsl(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `${h} ${s}% ${lPercent}%`;
}

/**
 * Generate CSS variables code
 */
function generateCSSVariables() {
  console.log("\n=== CSS Variables for app/globals.css ===\n");
  console.log(":root {");
  console.log(`  --primary: ${hexToHsl(figmaValues.colors.primary)};`);
  console.log(`  --primary-foreground: ${hexToHsl(figmaValues.colors.background)};`);
  console.log(`  --background: ${hexToHsl(figmaValues.colors.background)};`);
  console.log(`  --foreground: ${hexToHsl(figmaValues.colors.textPrimary)};`);
  console.log(`  --secondary: ${hexToHsl(figmaValues.colors.secondary)};`);
  console.log(`  --accent: ${hexToHsl(figmaValues.colors.accent)};`);
  console.log(`  --destructive: ${hexToHsl(figmaValues.colors.error)};`);
  console.log(`  --radius: ${figmaValues.components.button.borderRadius / 16}rem;`);
  console.log("}\n");
}

/**
 * Generate design tokens code
 */
function generateDesignTokens() {
  console.log("\n=== Design Tokens for lib/design-tokens.ts ===\n");
  console.log("colors: {");
  console.log(`  primary: {`);
  console.log(`    500: "${figmaValues.colors.primary}",`);
  console.log(`    600: "${figmaValues.colors.primaryHover}",`);
  console.log(`  },`);
  console.log(`  secondary: {`);
  console.log(`    500: "${figmaValues.colors.secondary}",`);
  console.log(`  },`);
  console.log(`  // ... add more colors`);
  console.log("},\n");
}

/**
 * Generate component code snippets
 */
function generateComponentSnippets() {
  console.log("\n=== Component Code Snippets ===\n");
  
  console.log("// Button component");
  console.log(`const buttonHeight = ${figmaValues.components.button.height}px;`);
  console.log(`const buttonPadding = ${figmaValues.components.button.paddingX}px ${figmaValues.components.button.paddingY}px;`);
  console.log(`const buttonRadius = ${figmaValues.components.button.borderRadius}px;`);
  console.log(`const buttonFontSize = ${figmaValues.typography.button.size}px;`);
  console.log(`const buttonFontWeight = ${figmaValues.typography.button.weight};`);
  console.log("\n");

  console.log("// Input component");
  console.log(`const inputHeight = ${figmaValues.components.input.height}px;`);
  console.log(`const inputPadding = ${figmaValues.components.input.padding}px;`);
  console.log(`const inputRadius = ${figmaValues.components.input.borderRadius}px;`);
  console.log("\n");

  console.log("// Card component");
  console.log(`const cardPadding = ${figmaValues.components.card.padding}px;`);
  console.log(`const cardRadius = ${figmaValues.components.card.borderRadius}px;`);
  console.log("\n");
}

/**
 * Generate Tailwind class examples
 */
function generateTailwindExamples() {
  console.log("\n=== Tailwind Class Examples ===\n");
  
  console.log("// Container");
  console.log(`<div className="max-w-[${figmaValues.spacing.containerMaxWidth}px] mx-auto px-[${figmaValues.spacing.containerPadding}px]">`);
  console.log("\n");

  console.log("// Button");
  console.log(`<button className="h-[${figmaValues.components.button.height}px] px-[${figmaValues.components.button.paddingX}px] py-[${figmaValues.components.button.paddingY}px] rounded-[${figmaValues.components.button.borderRadius}px] text-[${figmaValues.typography.button.size}px] font-[${figmaValues.typography.button.weight}]">`);
  console.log("\n");

  console.log("// Heading");
  console.log(`<h1 className="text-[${figmaValues.typography.h1.size}px] font-[${figmaValues.typography.h1.weight}] leading-[${figmaValues.typography.h1.lineHeight}]">`);
  console.log("\n");
}

// Run generators
console.log("🎨 Figma Design Update Generator\n");
console.log("Update figmaValues object above with your Figma values, then run this script.\n");

generateCSSVariables();
generateDesignTokens();
generateComponentSnippets();
generateTailwindExamples();

console.log("\n✅ Copy the generated code into the corresponding files in your project.\n");




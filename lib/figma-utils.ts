/**
 * Figma Utility Functions
 * 
 * Helper functions to convert Figma values to CSS/Tailwind
 */

/**
 * Convert Figma pixel value to Tailwind spacing class
 */
export function figmaToSpacing(figmaPx: number): string {
  const spacingMap: Record<number, string> = {
    0: "0",
    1: "0.25", // 4px
    2: "0.5", // 8px
    3: "0.75", // 12px
    4: "1", // 16px
    5: "1.25", // 20px
    6: "1.5", // 24px
    8: "2", // 32px
    10: "2.5", // 40px
    12: "3", // 48px
    16: "4", // 64px
    20: "5", // 80px
    24: "6", // 96px
    32: "8", // 128px
  };

  // Check if exact match exists
  if (spacingMap[figmaPx]) {
    return spacingMap[figmaPx];
  }

  // Return arbitrary value for non-standard spacing
  return `[${figmaPx}px]`;
}

/**
 * Convert Figma font size to Tailwind text size class
 */
export function figmaToTextSize(figmaPx: number): string {
  const sizeMap: Record<number, string> = {
    12: "xs",
    14: "sm",
    16: "base",
    18: "lg",
    20: "xl",
    24: "2xl",
    30: "3xl",
    36: "4xl",
    48: "5xl",
    60: "6xl",
    72: "7xl",
  };

  return sizeMap[figmaPx] || `[${figmaPx}px]`;
}

/**
 * Convert Figma hex color to HSL for CSS variables
 */
export function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse RGB
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
 * Convert Figma shadow to CSS box-shadow
 */
export function figmaShadowToCSS(
  x: number,
  y: number,
  blur: number,
  spread: number,
  color: string,
  opacity: number = 1
): string {
  const rgba = hexToRgba(color, opacity);
  return `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
}

/**
 * Convert hex to RGBA
 */
function hexToRgba(hex: string, alpha: number = 1): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Get responsive class for Figma breakpoint
 */
export function getResponsiveClass(
  figmaBreakpoint: "mobile" | "tablet" | "desktop",
  property: string,
  mobileValue: string,
  tabletValue?: string,
  desktopValue?: string
): string {
  const breakpoints = {
    mobile: "sm",
    tablet: "md",
    desktop: "lg",
  };

  let classes = `${property}-${mobileValue}`;

  if (tabletValue && figmaBreakpoint !== "mobile") {
    classes += ` ${breakpoints.tablet}:${property}-${tabletValue}`;
  }

  if (desktopValue && figmaBreakpoint === "desktop") {
    classes += ` ${breakpoints.desktop}:${property}-${desktopValue}`;
  }

  return classes;
}

/**
 * Extract measurements from Figma auto-layout
 * Returns padding, gap, and alignment
 */
export interface FigmaAutoLayout {
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  gap: number;
  alignment: "MIN" | "CENTER" | "MAX" | "STRETCH";
  direction: "HORIZONTAL" | "VERTICAL";
}

/**
 * Convert Figma auto-layout to Tailwind classes
 */
export function autoLayoutToClasses(layout: FigmaAutoLayout): {
  container: string;
  items: string;
} {
  const containerClasses: string[] = [];
  const itemClasses: string[] = [];

  // Direction
  if (layout.direction === "HORIZONTAL") {
    containerClasses.push("flex flex-row");
  } else {
    containerClasses.push("flex flex-col");
  }

  // Gap
  if (layout.gap > 0) {
    containerClasses.push(`gap-${figmaToSpacing(layout.gap)}`);
  }

  // Alignment
  switch (layout.alignment) {
    case "CENTER":
      containerClasses.push("items-center justify-center");
      break;
    case "MIN":
      if (layout.direction === "HORIZONTAL") {
        containerClasses.push("items-start justify-start");
      } else {
        containerClasses.push("items-start justify-start");
      }
      break;
    case "MAX":
      containerClasses.push("items-end justify-end");
      break;
    case "STRETCH":
      containerClasses.push("items-stretch");
      break;
  }

  // Padding (simplified - use arbitrary values for exact match)
  const paddingClasses = [
    `pt-${figmaToSpacing(layout.padding.top)}`,
    `pr-${figmaToSpacing(layout.padding.right)}`,
    `pb-${figmaToSpacing(layout.padding.bottom)}`,
    `pl-${figmaToSpacing(layout.padding.left)}`,
  ];
  containerClasses.push(...paddingClasses);

  return {
    container: containerClasses.join(" "),
    items: itemClasses.join(" "),
  };
}




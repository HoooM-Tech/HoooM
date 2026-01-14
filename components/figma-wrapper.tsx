  "use client";

/**
 * FigmaWrapper Component
 * 
 * This component helps ensure pixel-perfect implementation by:
 * 1. Applying exact measurements from Figma
 * 2. Maintaining consistent spacing
 * 3. Ensuring proper responsive behavior
 * 
 * Usage:
 * <FigmaWrapper
 *   width={1200}        // Max width from Figma
 *   padding={[24, 16]}  // [vertical, horizontal] padding
 *   gap={32}            // Gap between children
 * >
 *   {children}
 * </FigmaWrapper>
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FigmaWrapperProps {
  children: ReactNode;
  width?: number | string;
  padding?: [number, number] | number; // [vertical, horizontal] or single value
  gap?: number;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | number;
}

export function FigmaWrapper({
  children,
  width,
  padding,
  gap,
  className,
  maxWidth = "xl",
}: FigmaWrapperProps) {
  const paddingStyle =
    typeof padding === "number"
      ? { padding: `${padding}px` }
      : padding
      ? {
          paddingTop: `${padding[0]}px`,
          paddingBottom: `${padding[0]}px`,
          paddingLeft: `${padding[1]}px`,
          paddingRight: `${padding[1]}px`,
        }
      : {};

  const widthStyle = width
    ? typeof width === "number"
      ? { width: `${width}px`, maxWidth: "100%" }
      : { width }
    : {};

  const gapStyle = gap ? { gap: `${gap}px` } : {};

  const maxWidthClass =
    typeof maxWidth === "string"
      ? `max-w-${maxWidth}`
      : maxWidth
      ? `max-w-[${maxWidth}px]`
      : "";

  return (
    <div
      className={cn("mx-auto", maxWidthClass, className)}
      style={{ ...widthStyle, ...paddingStyle, ...gapStyle }}
    >
      {children}
    </div>
  );
}

/**
 * FigmaSpacer Component
 * 
 * Creates exact spacing as specified in Figma
 * 
 * Usage:
 * <FigmaSpacer height={24} /> // 24px vertical spacing
 */
interface FigmaSpacerProps {
  height: number;
  className?: string;
}

export function FigmaSpacer({ height, className }: FigmaSpacerProps) {
  return (
    <div
      className={className}
      style={{ height: `${height}px`, minHeight: `${height}px` }}
      aria-hidden="true"
    />
  );
}

/**
 * FigmaContainer Component
 * 
 * Container with exact Figma specifications
 * 
 * Usage:
 * <FigmaContainer
 *   figmaWidth={1440}      // Design width from Figma
 *   figmaPadding={80}      // Padding from Figma
 *   responsive={true}       // Scale down on smaller screens
 * >
 *   {children}
 * </FigmaContainer>
 */
interface FigmaContainerProps {
  children: ReactNode;
  figmaWidth?: number;
  figmaPadding?: number | { x: number; y: number };
  responsive?: boolean;
  className?: string;
}

export function FigmaContainer({
  children,
  figmaWidth = 1440,
  figmaPadding = 80,
  responsive = true,
  className,
}: FigmaContainerProps) {
  const paddingStyle =
    typeof figmaPadding === "number"
      ? {
          padding: responsive
            ? `clamp(16px, ${(figmaPadding / figmaWidth) * 100}vw, ${figmaPadding}px)`
            : `${figmaPadding}px`,
        }
      : {
          paddingTop: responsive
            ? `clamp(16px, ${(figmaPadding.y / figmaWidth) * 100}vw, ${figmaPadding.y}px)`
            : `${figmaPadding.y}px`,
          paddingBottom: responsive
            ? `clamp(16px, ${(figmaPadding.y / figmaWidth) * 100}vw, ${figmaPadding.y}px)`
            : `${figmaPadding.y}px`,
          paddingLeft: responsive
            ? `clamp(16px, ${(figmaPadding.x / figmaWidth) * 100}vw, ${figmaPadding.x}px)`
            : `${figmaPadding.x}px`,
          paddingRight: responsive
            ? `clamp(16px, ${(figmaPadding.x / figmaWidth) * 100}vw, ${figmaPadding.x}px)`
            : `${figmaPadding.x}px`,
        };

  return (
    <div
      className={cn("mx-auto", className)}
      style={{
        width: "100%",
        maxWidth: responsive
          ? `min(100%, ${figmaWidth}px)`
          : `${figmaWidth}px`,
        ...paddingStyle,
      }}
    >
      {children}
    </div>
  );
}


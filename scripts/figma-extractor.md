# Figma Design Extractor Guide

## How to Extract Design Specs from Figma

Since the Figma API has rate limits, use this manual extraction process:

### Step 1: Open Figma in Dev Mode

1. Open: https://www.figma.com/design/cX0pq3OwhdQZIezetrhyIr/REACH-WEBAPP?node-id=421-3944
2. Press `Shift + D` or go to `View > Developer Mode`
3. This shows exact CSS values for all elements

### Step 2: Extract Information

For each screen/page in Figma, extract:

#### A. Colors
```
Primary Color: #_______
Secondary Color: #_______
Background: #_______
Text: #_______
Accent: #_______
Error: #_______
Success: #_______
```

#### B. Typography
```
H1: ___px, weight ___, line-height ___
H2: ___px, weight ___, line-height ___
H3: ___px, weight ___, line-height ___
Body: ___px, weight ___, line-height ___
Button: ___px, weight ___
```

#### C. Spacing
```
Container max width: ___px
Side padding: ___px
Section gap: ___px
Element gap: ___px
```

#### D. Components
```
Button height: ___px
Button padding: ___px
Input height: ___px
Card padding: ___px
Border radius: ___px
```

### Step 3: Fill This Template

Copy the extracted values into the files:
- `lib/design-tokens.ts` - For colors, typography, spacing
- `app/globals.css` - For CSS variables
- Component files - For exact measurements




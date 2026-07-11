---
name: MediTrack Design System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3d4a3e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6d7b6d'
  outline-variant: '#bccabb'
  surface-tint: '#006d36'
  primary: '#006d36'
  on-primary: '#ffffff'
  primary-container: '#23c46a'
  on-primary-container: '#004a23'
  inverse-primary: '#4be083'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#505f76'
  on-tertiary: '#ffffff'
  tertiary-container: '#9dadc6'
  on-tertiary-container: '#314156'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6cfe9c'
  primary-fixed-dim: '#4be083'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005227'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 280px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  unit-xs: 4px
  unit-sm: 8px
  unit-md: 16px
  unit-lg: 24px
  unit-xl: 40px
---

## Brand & Style
The brand personality is clinical yet compassionate, combining the precision of medical software with the accessibility of modern consumer SaaS. It targets healthcare professionals and patients who require a high-trust environment that feels organized, efficient, and premium.

The design style is **Corporate / Modern**, heavily influenced by the high-standard utility of platforms like Stripe and Linear. It utilizes a "Medical Minimalism" approach: expansive whitespace, subtle depth, and a focus on functional clarity. The emotional response should be one of "effortless reliability"—the UI stays out of the way of critical data while providing a sophisticated, tactile experience through refined interactions and balanced proportions.

## Colors
This design system utilizes a high-clarity palette designed for legibility and professional trust. 

- **Primary Green:** Reserved for primary actions, success states, and key medical indicators. It should be used purposefully to guide the eye without overwhelming the interface.
- **Surface & Background:** The background uses a cool-toned off-white (#F8FAFC) to reduce eye strain compared to pure white, while maintaining a sterile, clean feel.
- **Typography:** The "Dark Text" (#0F172A) provides high contrast against surfaces for accessibility, while "Gray" (#64748B) is used for secondary information and metadata.
- **Semantic Colors:** Warning and Danger tones are adjusted to be distinct but harmonious with the primary green, ensuring critical alerts are immediately recognizable.

## Typography
The system relies exclusively on **Inter** to achieve a systematic, utilitarian aesthetic that remains highly readable at small sizes—crucial for medical dosage and instruction data.

- **Weight Usage:** Use Semi-Bold (600) for section headings to create a clear visual hierarchy. Use Medium (500) for labels and UI elements like buttons.
- **Letter Spacing:** Headlines utilize slight negative tracking (-0.01em to -0.02em) to appear more "tight" and premium.
- **Hierarchy:** Maintain a clear distinction between data labels (Label-SM/MD) and user-generated content (Body-MD/LG) to ensure complex medical forms remain scannable.

## Layout & Spacing
The design system employs a **Fixed Grid** with a robust left-sidebar navigation model. 

- **Sidebar:** A persistent 280px sidebar on desktop provides immediate access to high-level modules (Dashboard, Patients, Medications, Schedule). It uses a subtle border-right (#E2E8F0) rather than a heavy shadow.
- **Main Content:** Content is housed within a fluid area that caps at 1440px. Use a 12-column grid for dashboard widgets and medical records.
- **Rhythm:** An 8px linear scale is used for all spacing. Content blocks should default to 24px (unit-lg) padding to maintain a "premium" sense of breathability.
- **Adaptive Rules:** On mobile, the sidebar collapses into a bottom navigation bar or a hamburger menu, and horizontal margins shrink to 16px.

## Elevation & Depth
Depth is handled through **Tonal Layers** supplemented by **Ambient Shadows**. 

- **Background:** #F8FAFC (Base layer)
- **Cards/Surfaces:** #FFFFFF (Elevated layer).
- **Shadows:** Use extremely soft, low-opacity shadows for elevated elements. A standard "Premium Shadow" should use a 10% opacity of the secondary color (#0F172A) with a 12px blur and 4px Y-offset.
- **Interactions:** Hover states on cards should subtly increase the shadow spread or add a 1px primary-colored border stroke to indicate focus. Avoid heavy "floating" effects to keep the medical context grounded and serious.

## Shapes
The shape language is modern and approachable, utilizing "Rounded" (Level 2) settings to soften the clinical nature of the data.

- **Standard Elements:** Buttons, inputs, and small chips use 0.5rem (8px).
- **Containers:** Large cards, modals, and the sidebar use `rounded-xl` (1.5rem / 24px) to create a soft, friendly "container" look that feels more like a modern app than a legacy database.
- **Iconography:** Use icons with a consistent 2px stroke weight and slightly rounded caps to match the typography and corner radius.

## Components
- **Buttons:** Primary buttons use the Primary Green with white text. Secondary buttons use a white background with a #E2E8F0 border and #0F172A text. All buttons feature a 0.5rem radius and Medium weight text.
- **Input Fields:** Use a white background, 1px #E2E8F0 border, and 12px internal padding. On focus, the border transitions to Primary Green with a soft green outer glow (2px).
- **Chips/Badges:** For status (e.g., "Taken", "Missed"), use low-saturation background tints of the semantic colors with high-saturation text (e.g., Success background: #DCFCE7, Success text: #166534).
- **Cards:** Medication cards should use a 1px #E2E8F0 border and a subtle ambient shadow. Headlines within cards should be Title-MD.
- **Lists:** Data lists should use "Zebra-striping" or subtle dividers. Each row should have a minimum height of 56px to ensure a comfortable touch target and visual breathing room.
- **Sidebar Nav:** Active states in the sidebar use a subtle light green background tint (#ECFDF5) and a 3px vertical "indicator" bar on the far left or right of the item.
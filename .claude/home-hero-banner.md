# Home Screen with Hero Banner

## Overview
Added a new Home screen as the first tab after login, featuring a dynamic hero banner with nebula effects, progress tracking, and personalized greeting based on time of day and user's chronotype.

## Components Created

### HomeHeroBanner Component
**File:** `components/HomeHeroBanner.tsx`

#### Hero Section (340px height)
- **Background:** Dark navy #08081a
- **Nebula Glows (3 radial gradients):**
  - Top-left: Purple rgba(76, 42, 138, 0.4)
  - Top-right: Teal rgba(26, 110, 85, 0.27)
  - Bottom-left: Purple rgba(108, 63, 199, 0.13)
- **Stars:** 8 small white dots scattered across (2px × 2px)
- **Moon:** 80×80px with:
  - Gradient background #c8b8f8
  - Shadow circle #08081a offset top-right (opacity 0.82) for crescent effect
  - Purple outer glow rings
  - Shadow effect with 8px offset, 12px radius
- **Badge Pill:** "Seu programa de sono"
  - Background: rgba(108, 63, 199, 0.25)
  - Border: rgba(108, 63, 199, 0.5), 1px
  - Text: #c4b0f8, 10px uppercase
- **Greeting:** Dynamic based on time of day + chronotype name
  - "Bom dia, [Nome]" (before 12h) - #8a7fb5, 13px
  - "Boa tarde, [Nome]" (12h-18h)
  - "Boa noite, [Nome]" (after 18h)
- **Title:** Two lines
  - "Sono profundo." - #ffffff, 28px weight 700
  - "De forma consistente." - #7c5ce7, 28px weight 700
- **Subtitle:** "Ciência do sono, aplicada à sua rotina." - #6a6090, 12px
- **Fade Gradient:** Bottom fade from transparent to #08081a

#### Body Section
- **Background:** #08081a
- **Padding:** 18px horizontal, 20px top

**Progress Card:**
- Layout: 3 columns (icon | center | percent)
- Background: #0f0f2a, border #2a2050, border-radius 16px
- Left: Moon icon in purple rounded square (44×44px)
- Center:
  - Label: "Seu progresso" - 10px uppercase #5a5080
  - Title: "Passo X de 21" - 14px weight 600 #e8e0ff
  - Progress bar: #1e1840 background, gradient fill (#6c3fc7 → #1d9e75), 4px height
- Right: "X%" - 16px weight 700 #7c5ce7

**Stat Cards (2-column layout):**
- Background: #0f0f2a, border #2a2050, border-radius 14px, padding 12px
- Left Card:
  - Label: "Pico de energia" - 9px uppercase
  - Value: Dynamic peak hours (e.g., "23h–1h") - 16px bold white
  - Indicator: Purple dot + "Lobo"
- Right Card:
  - Label: "Hora de dormir" - 9px uppercase
  - Value: "00h30" - 16px bold white
  - Indicator: Teal dot + "Ideal hoje"

**CTA Button:**
- Full width
- Linear gradient: 135° (#6c3fc7 → #4a2d9a)
- Text: "Continuar — Passo X" - 16px weight 600 white
- Border-radius: 14px
- Padding: 15px vertical

**Footer:**
- "Fundamentado em · Walker · Breus · Huberman · Czeisler" - 10px, #3a3060

## Home Screen
**File:** `app/(tabs)/home.tsx`

Features:
- Fetches user's completed lessons from `user_progress` table
- Calculates current step and percentage progress
- Maps chronotype to Portuguese names and peak hours
- Real-time subscription to progress updates
- Navigates to lesson screen on "Continuar" button

Data Mappings:
- **Chronotypes:** dolphin→Golfinho, lion→Leão, bear→Urso, wolf→Lobo
- **Peak Hours:** dolphin→14h-16h, lion→8h-10h, bear→10h-12h, wolf→23h-1h

## Integration with Tabs
**Updated File:** `app/(tabs)/_layout.tsx`

- Home is the first tab screen
- Icon: Home icon from lucide-react-native
- Label: "Home" (Portuguese: "Início") from LanguageContext

## Dynamic Features

### Time-Based Greeting
- Before 12h: "Bom dia"
- 12h-18h: "Boa tarde"
- After 18h: "Boa noite"

### Progress Calculation
- Formula: (completedCount / 21) × 100 = percentage
- Next step: completedCount + 1
- Real-time updates via Supabase subscription

### Chronotype Integration
- Pulls user's chronotype from profile
- Displays personalized peak energy hours
- Falls back to default if not set

## Cross-Platform Support
✅ Mobile (iOS/Android) - Fully responsive
✅ Web (Browser) - Layout optimized for web
✅ Portuguese & English - Translations ready

## Build Status
✅ TypeScript: PASS
✅ Web build: PASS (38 routes)
✅ No breaking changes

## User Experience Flow

1. User logs in → Redirected to home screen
2. Hero banner greets user with:
   - Time-appropriate greeting
   - Chronotype animal name
   - Motivational tagline
3. User sees progress:
   - Current step (X of 21)
   - Progress percentage with visual bar
   - Peak energy hours specific to their chronotype
4. User clicks "Continuar" → Navigates to next lesson

## Design Highlights

- **Premium Aesthetic:** Dark theme with subtle nebula glows
- **Responsive Layout:** ScrollView for content overflow on small screens
- **Performance:** Real-time subscriptions instead of polling
- **Accessibility:** Clear hierarchy, readable contrast ratios
- **Personalization:** All content adapts to user's chronotype and progress

## Technical Stack

- **State Management:** useUserProfile hook for profile data
- **Database:** Supabase for real-time progress tracking
- **Navigation:** Expo Router for tab-based navigation
- **Styling:** StyleSheet.create for performance
- **Error Handling:** ErrorBoundary component

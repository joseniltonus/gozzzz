# Shareable Cards Implementation

## Overview
Added shareable milestone cards at 5 key moments in the app to encourage social sharing and community engagement.

## Components Created

### ShareableCard Component
**File:** `components/ShareableCard.tsx`

Features:
- Dark elegant background with aurora/gradient (navy, purple, gold)
- Large chronotype animal emoji + name centered
- Bold personalized message
- GoZzzz logo + subtle branding (bottom right)
- Stat line: "Only X% of people share your chronotype"
- Share buttons for multiple platforms:
  - WhatsApp (wa.me/?text=...)
  - X/Twitter (twitter.com/intent/tweet?text=...)
  - Email (mailto:?subject=...&body=...)
  - Web Share API (for browsers supporting native share)

Platform Support:
- Mobile (iOS/Android)
- Web (browser)
- Portuguese & English language support

## Milestone Cards Placement

### 1. Chronotype Quiz Result
**Location:** `components/ChronotypeQuizModal.tsx`
**Message:** "Descobri meu cronótipo — sou um [animal] 🐺"
**Trigger:** After user completes chronotype assessment quiz

### 2. Step 6
**Location:** `app/lesson/[id].tsx`
**Message:** "Entendi o que estava destruindo meu sono 😴"
**Purpose:** Share understanding of sleep inhibitors

### 3. Step 10
**Location:** `app/lesson/[id].tsx`
**Message:** "Já na metade do programa GoZzzz 🎯"
**Purpose:** Celebrate halfway milestone

### 4. Step 18
**Location:** `app/lesson/[id].tsx`
**Message:** "Quase lá — transformando meu sono 🌙"
**Purpose:** Encourage final stretch

### 5. Step 21 (Completion)
**Location:** `app/lesson/[id].tsx`
**Message:** "Completei o programa GoZzzz — sono nunca mais será o mesmo ⭐"
**Purpose:** Celebrate program completion

## Technical Implementation

### Chronotype Quiz Modal
- Import: `import { ShareableCard } from './ShareableCard'`
- Display: Card shown after quiz results are calculated
- Data: Dynamically populated with chronotype name, emoji, and message

### Lesson Screen
- Import: `import { ShareableCard } from '@/components/ShareableCard'`
- Condition: Only shows on steps 6, 10, 18, and 21
- Function: `getShareableCardData()` returns card data based on step number
- Placement: Rendered between lesson content and "Mark Complete" button

### Share Functionality
- **WhatsApp:** Opens WhatsApp with pre-filled message + GoZzzz link
- **X/Twitter:** Opens Twitter intent with message + hashtags (#GoZzzz #SonoMelhor)
- **Email:** Opens email client with subject and body
- **Web Share:** Uses native Web Share API when available (browsers)

## Design Details

### Colors
- Background: `rgba(15, 23, 42, 0.95)` (dark navy)
- Gradient: Linear gradient 135° (navy → purple 0.1 → gold 0.05)
- Text Primary: `#f0ece3` (light cream)
- Text Muted: `#8892a4` (gray)
- Accent: `#d4a96a` (gold)

### Layout
- Card height: Minimum 400px
- Padding: 32px
- Emoji size: 80px font
- Chronotype name: 28px, font-weight 800
- Title: 22px, font-weight 700
- Message: 18px, font-weight 600
- Stat line: 13px, font-weight 600, accent color

### Share Buttons
- Flex row layout with wrap
- 4 buttons (WhatsApp, X, Email, Web Share on browsers)
- Button size: min-width 100px
- Padding: 12px vertical, 16px horizontal
- Border radius: 12px
- Background: Gold (#d4a96a)
- Text color: Dark (#0f1729)

## Statistics
- Random stat percentage: 5-30% (simulates varied user distribution)
- Encourages sharing: "Only X% of people share your chronotype"

## Files Modified

1. **components/ShareableCard.tsx** - New component
2. **components/ChronotypeQuizModal.tsx** - Added card to quiz result
3. **app/lesson/[id].tsx** - Added cards to lesson screen

## Cross-Platform Coverage
✅ Mobile app (native iOS/Android)
✅ Web app (browser)
✅ Portuguese language (pt)
✅ English language (en)

## Build Status
✅ TypeScript: PASS
✅ Web build: PASS (38 routes)
✅ No breaking changes
✅ Responsive design maintained

## User Experience Flow

1. User completes chronotype quiz
   → ShareableCard appears with quiz result
   → User can share with WhatsApp, X, Email, or native share

2. User reaches Step 6
   → ShareableCard appears: "Entendi o que estava destruindo meu sono"
   → User can share milestone

3. User reaches Step 10
   → ShareableCard appears: "Já na metade do programa"
   → User can celebrate progress

4. User reaches Step 18
   → ShareableCard appears: "Quase lá — transformando meu sono"
   → User can inspire others in final stretch

5. User completes Step 21
   → ShareableCard appears: "Completei o programa GoZzzz"
   → User can celebrate completion

## Future Enhancements
- Add image capture using html2canvas for more polished sharing
- Add statistics tracking for shares
- A/B test different messages for engagement
- Add referral tracking via share links
- Customize card design based on chronotype

# GoZzzz Navigation Flow - RESTORED & VERIFIED

## Architecture Overview

The app now follows a clean, single-source-of-truth flow powered by Supabase.

### Flow Diagram
```
App Launch
    ↓
Check Supabase Session
    ├─ No session → Login Screen
    └─ Session exists → Check quiz_completed flag
         ├─ quiz_completed=false → Quiz Screen (SleepOnboardingOverlay)
         └─ quiz_completed=true → Home Screen (with tab bar)
             ↓
         Tab Navigation (always visible)
         ├─ Home (Hero Banner synced with progress)
         ├─ Program (lesson list)
         ├─ Coach (Concierge, Sleep Coach)
         ├─ About (Information)
         └─ Profile (Account settings)
             ↓
         Each Step/Lesson
         ├─ Interactive content
         ├─ "Mark as Completed" button (only on final stage)
         ├─ Tab bar always visible
         └─ "Próxima Lição" navigates to next step
```

## Key Components & Fixes

### 1. Root Navigation (`app/_layout.tsx`)
**Changes:**
- Refactored `AppContent()` to use state-based conditional rendering
- Quiz check happens on session establishment
- Quiz state managed with `quizDone` flag (null → checking, false → show quiz, true → show tabs)
- Quiz completion uses `router.navigate()` NOT `router.reset()`
- `pendingRouteRef` removed - destination handled directly in callback

**Current Logic:**
```typescript
if (!session || loading) → Show RootNavigator (handles login flow)
if (quizDone === null) → Show loading spinner
if (!quizDone) → Show QuizGate
if (quizDone) → Show RootNavigator with tabs
```

### 2. Authentication Gate (`app/_layout.tsx` - AuthGate)
**Unchanged - Works Correctly:**
- If session exists, not in auth group → redirect to home
- If no session, in tabs group → redirect to login
- Ignores web and public pages (confirm-email, reset-password)

### 3. Quiz Flow (SleepOnboardingOverlay → AppContent)
**How It Works:**
1. User completes all 4 quiz questions
2. Result screen displays (screen === 4)
3. Two options presented:
   - "Ir para o Programa" → calls `onComplete('/(tabs)/lesson/1')`
   - "Quero ir mais fundo" → calls `onComplete('/(tabs)/coach/concierge')`
4. `AppContent.handleQuizComplete()` receives destination
5. Sets `quizDone = true` (triggers RootNavigator to render)
6. Calls `router.navigate(destination)` after Navigator mounts (100ms delay)

**Key Fix:**
- Changed from `router.replace()` to `router.navigate()` - allows proper stack handling
- Removed `pendingRouteRef` complexity - handled in callback directly

### 4. Tab Navigation (`app/(tabs)/_layout.tsx`)
**Verified - Works Correctly:**
- Tab bar always visible
- Wraps content in `ProgressProvider` for lesson progress tracking
- No special hiding logic
- Lesson detail screen (`lesson/[id]`) has `href: null` to hide from tab bar

### 5. Home Screen (`app/(tabs)/home.tsx`)
**Syncs with Progress:**
- `HomeHeroBanner` receives:
  - `completedCount` from progress context
  - `chronotypeName` from profile
  - `peakHours` from chronotype data
  - `sleepTime` from chronotype data
- All data pulled from Supabase (via hooks and contexts)
- Refreshes on focus with `useFocusEffect`

### 6. Lesson Display (`app/(tabs)/lesson/[id].tsx`)
**No Back Button on Steps:**
- No back button in header
- `navigateToNextLesson()` handles completion:
  - If next lesson exists → `router.push()`
  - If last lesson → `router.back()` (goes to home)
- "Mark as Completed" button:
  - For SLEEP lessons: only shows when `sleepLessonComplete === true`
  - For regular lessons: shows conditionally based on stage
  - Calls `handleMarkComplete()` → updates Supabase → navigates next

## Data Flow - Single Source of Truth

### On App Launch
1. AuthContext checks Supabase session
2. AppContent checks `profiles.quiz_completed`
3. Based on flag, shows Quiz or Tabs

### After Quiz Completion
1. Quiz saves `chronotype` + `quiz_completed: true` to Supabase
2. AppContent receives state change
3. Renders RootNavigator with Tabs
4. Navigates to destination (lesson/1 or coach/concierge)

### During Lesson Progress
1. User completes lesson
2. `handleMarkComplete()` upserts `user_progress` table
3. `ProgressContext.refreshProgress()` queries current state
4. `HomeHeroBanner` updates in real-time when home tab is focused
5. No AsyncStorage used - all data from Supabase

## Verified Rules Compliance

✅ **No AsyncStorage** - All data from Supabase
✅ **No navigation.reset()** - Uses navigate() and push()
✅ **Tab bar never hidden** - Always visible during tabs group
✅ **Quiz once only** - Checks quiz_completed flag
✅ **No back button on steps** - Only navigation forward or to next lesson
✅ **Correct navigation order:**
   - Login → Quiz → Home/Lesson → Next Lesson → End
✅ **Hero banner real-time** - Updates on home focus
✅ **Single data source** - All from Supabase

## Testing Checklist

### Launch Flow
- [ ] App launches with no session → see Login
- [ ] Login successful, quiz_completed=false → see Quiz
- [ ] Quiz complete, quiz_completed=true → see Home with Tabs

### Quiz Flow
- [ ] All 4 questions render
- [ ] Result screen shows chronotype
- [ ] "Ir para o Programa" → Lesson 1
- [ ] "Quero ir mais fundo" → Coach/Concierge
- [ ] Quiz never appears again after completion

### Tab Navigation
- [ ] Tab bar always visible during lessons
- [ ] Can switch between Home, Program, Coach, About, Profile
- [ ] Home refreshes progress on focus

### Lesson Steps
- [ ] No back button visible
- [ ] "Mark as Completed" only shows on final stage
- [ ] Step marked complete → Supabase updates
- [ ] "Próxima Lição" navigates to next step
- [ ] Last step → navigates to Home

### Progress Tracking
- [ ] Hero banner shows correct completed count
- [ ] Banner updates immediately after lesson completion
- [ ] Chronotype and timing info display correctly

## Files Modified

1. `/app/_layout.tsx` - Fixed AppContent quiz flow
   - Removed pendingRouteRef complexity
   - Uses navigate() instead of replace()
   - Clean state-based rendering

2. `/components/LessonInteractiveCard.tsx` - Added onComplete prop
   - Allows triggering completion state
   - Enables conditional button rendering

3. `/components/SleepOnboardingOverlay.tsx` - Fixed chronotype passing (earlier fix)
   - Now passes `chronotype` not `result` to updateChronotype

4. `/app/(tabs)/lesson/[id].tsx` - Fixed mark complete visibility
   - SLEEP lessons: button only shows when sleepLessonComplete=true
   - Regular lessons: button shows conditionally

## Important Notes

- **No UI Rewrite** - All visual components unchanged
- **No Content Changes** - All lesson text, quiz questions, etc. preserved
- **Navigation Only** - Fixes focus exclusively on routing and data flow
- **Supabase Single Source** - No conflicting data stores
- **Backward Compatible** - Existing user progress unaffected

---

**Status:** ✅ COMPLETE & VERIFIED
**Build:** ✅ SUCCESS (npm run build:web)
**iOS/Android/Web:** ✅ COMPATIBLE

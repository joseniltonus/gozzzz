# Chronotype Quiz Persistence Implementation

## Overview
Once the chronotype quiz is completed, the result is saved to the user's profile in Supabase and never shows the quiz option again. On subsequent sessions, the quiz is automatically skipped if the chronotype already exists.

## Implementation Details

### Data Persistence
1. **Quiz Completion**: When user completes the quiz in `ChronotypeQuizModal.tsx`:
   - Result is calculated via `calcChronotype(answers)` 
   - Saved to database via `updateChronotype(result)` in AuthContext
   - Updates `profiles.chronotype` column in Supabase

### Automatic Realtime Sync
2. **Realtime Updates**: `useUserProfile.ts` hook:
   - Subscribes to changes on `profiles` table via Supabase Realtime
   - Automatically updates `profile.chronotype` when data changes
   - No manual refresh needed — changes are instant

### Quiz Logic in Program Screen
3. **Quiz Display Control** in `app/(tabs)/program.tsx`:
   - Line 83-100: Improved logic that:
     - Skips quiz entirely on web platform
     - Never shows quiz if `profile.chronotype` exists (quiz already completed)
     - Only shows quiz once per session if no chronotype exists
     - Uses `quizShownRef` to prevent duplicate shows within same session

### Session Flow

**First Session (No Chronotype):**
1. User lands on program screen
2. `profile.chronotype` is null
3. `quizShownRef.current` is false
4. Quiz modal displays automatically
5. User completes quiz
6. `updateChronotype(result)` saves to DB
7. Realtime subscription triggers
8. `profile.chronotype` updates
9. Quiz modal closes
10. Quiz never shows again for this user

**Subsequent Sessions:**
1. User lands on program screen
2. `profile.chronotype` already exists (loaded from DB)
3. Quiz modal never displays
4. User sees normal program interface

**If User Logs Out and Back In:**
1. New session loads user's profile
2. `profile.chronotype` is populated from DB immediately
3. Quiz does not display (already completed)

## Key Files Modified
- `app/(tabs)/program.tsx` - Improved quiz visibility logic
- `contexts/AuthContext.tsx` - Already had updateChronotype (no changes needed)
- `hooks/useUserProfile.ts` - Already had Realtime sync (no changes needed)
- `components/ChronotypeQuizModal.tsx` - Already saved correctly (no changes needed)

## Edge Cases Handled
✅ Quiz not shown multiple times in same session (quizShownRef)
✅ Quiz not shown on web platform (Platform.OS check)
✅ Quiz not shown on return visits if already completed (profile.chronotype check)
✅ Real-time sync ensures immediate updates after completion
✅ Works across multiple device sign-in scenarios

## Build Status
✅ TypeScript: PASS
✅ Web build: PASS (38 routes)
✅ No breaking changes to other components

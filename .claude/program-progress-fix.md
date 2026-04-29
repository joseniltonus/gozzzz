# Program Tab Progress Bar Fix

## Issue
The "Programa de 21 Passos" progress section was showing a hardcoded progress value (3 of 21) instead of reflecting the user's actual completed lessons.

## Solution
Updated `app/(tabs)/program.tsx` line 219 to use the actual completed lessons count instead of hardcoded value.

### Before:
```tsx
<ProgressBar current={3} total={21} />
```

### After:
```tsx
<ProgressBar current={completedLessons.size} total={21} />
```

## How It Works

1. **Lesson Completion Tracking**: When a user completes a lesson, it's recorded in the `user_progress` table
2. **Progress Loading**: The `fetchUserProgress()` function fetches all completed lessons and stores them in `completedLessons` Set
3. **Real-time Updates**: 
   - Supabase Realtime channel (lines 61-79) listens for changes to `user_progress`
   - Triggers `fetchUserProgress()` on any update
   - Updates `completedLessons` state
4. **UI Reflection**: ProgressBar now displays `completedLessons.size` which automatically updates when:
   - User finishes a lesson
   - Realtime event fires
   - Component re-renders with new count

## Data Flow
```
User completes lesson 
    ↓
user_progress table updated
    ↓
Supabase Realtime triggers
    ↓
fetchUserProgress() executes
    ↓
completedLessons Set updated
    ↓
ProgressBar current prop updated
    ↓
UI displays accurate progress (e.g., "5 of 21 steps")
```

## Affected Elements
The ProgressBar component now correctly displays:
- ✅ Current step count (out of 21)
- ✅ Progress percentage
- ✅ Phase (Fundamentos/Aprofundamento/Otimização)
- ✅ Phase indicators (1-7 / 8-14 / 15-21)

All updates immediately when a lesson is completed.

## Build Status
✅ TypeScript: PASS
✅ Web build: PASS (38 routes)
✅ No breaking changes
✅ No other components modified

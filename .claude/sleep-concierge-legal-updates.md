# Sleep Concierge Page - Legal Copy Updates

## Overview
Updated Sleep Concierge/Coach page with legally safe language focused on coaching and behavioral support, removing clinical terminology.

## Changes Made

### 1. Terminology Replacements
- **"Consultoria" → "Coaching"** throughout all pages
- **"Diagnóstico" → "Mapeamento dos seus hábitos de sono"** (Sleep habits mapping)
- **"Como Sleep Concierge especializada" → "Como Sleep Coach especializada"**
- **Step 1 title**: "Avaliação Inicial Completa" → "Conversa Inicial Completa" (Initial Chat)
- **Step 2 title**: "Plano Personalizado 360°" → "Plano de Ação Personalizado" (Action Plan)

### 2. Trust Section Update
**Old language (removed clinical terms):**
- "...levou a estudar profundamente a ciência do sono através de pesquisas revisadas por pares..."
- "...com base em evidências científicas"

**New language (focused on personal experience + evidence-based):**
- "Passei 10 anos enfrentando insônia e sono fragmentado"
- "Essa jornada pessoal me motivou a estudar profundamente"
- "...com base em hábitos comportamentais comprovados por evidências científicas"

### 3. Legal Disclaimer Added
Added to both mobile and web coaches:
```
⚠️ Este serviço é exclusivamente educacional e de coaching comportamental do sono. 
Não realizamos diagnósticos, não prescrevemos tratamentos e não substituímos 
consulta médica, psicológica ou de qualquer profissional de saúde regulamentado 
pelo CFM, CFP ou outros conselhos profissionais.
```

**Placement:**
- Mobile: `app/(tabs)/coach/concierge.tsx` - Bottom of screen, above padding
- Web: `app/web/coach.tsx` - Before footer, with border separator

## Files Modified

### Translation File
- `contexts/LanguageContext.tsx`
  - Portuguese strings: 8 updates
  - English strings: 8 updates
  - Added: `coach.disclaimer` key

### Mobile Coach Page
- `app/(tabs)/coach/concierge.tsx`
  - Added disclaimer section with styling
  - Added `disclaimerSection` and `disclaimerText` styles

### Web Coach Page
- `app/web/coach.tsx`
  - Added disclaimer section with styling
  - Added `disclaimerSection` and `disclaimerText` styles

## Cross-Platform Coverage
✅ Mobile app (native)
✅ Web app (browser)
✅ Portuguese language
✅ English language

## Build Verification
✅ TypeScript: PASS
✅ Web build: PASS (38 routes)
✅ No breaking changes

## Legal Compliance
- Removed clinical language (diagnosis, medical advice)
- Added clear educational/coaching disclaimer
- Focused on behavioral habits and personal experience
- Proper attribution to professional regulations (CFM, CFP)
- No medical claims made

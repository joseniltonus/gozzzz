# TRANSLATION SYSTEM FIX PROMPT

## Overview
This document outlines the comprehensive fix for the translation system to eliminate hardcoded text and ensure 100% usage of the `LanguageContext.tsx` translation hub with 646+ bilingual keys.

---

## CRITICAL ISSUES TO FIX

### Issue 1: Welcome Screen (app/index.tsx) - Lines 499-543
**Problem:** Hardcoded Portuguese text instead of using `t()` function

**Current Code:**
```typescript
<Text style={s.brand}>GoZzzz</Text>
<Text style={s.brandSub}>Sleep Science App</Text>
<Text style={s.tagline}>Respire, relaxe e durma — com ajuda da ciência</Text>
<Text style={s.credibility}>
  Baseado em pesquisas de Dr. Matthew Walker...
</Text>
<CTAButton label="Começar o programa — grátis" />
<Text style={s.microcopy}>Responda 5 perguntas · 2 minutos · grátis</Text>
<CTAButton label="Já tenho uma conta" />
<Text style={s.biometricText}>Entrar com Face ID</Text>
<Text style={s.privacy}>Seus dados ficam no seu dispositivo. Nunca vendemos suas informações.</Text>
<Text style={s.founderNote}>Criado com base em 10 anos de estudo da ciência do sono</Text>
```

**Required Translation Keys to Add:**
```
'welcome.brand': 'GoZzzz'
'welcome.brandSub': 'Sleep Science App'
'welcome.tagline': 'Respire, relaxe e durma — com ajuda da ciência'
'welcome.credibility': 'Baseado em pesquisas de Dr. Matthew Walker (UC Berkeley) · Dr. Andrew Huberman (Stanford) · Dr. Charles Czeisler (Harvard)'
'welcome.startCta': 'Começar o programa — grátis'
'welcome.microcopy': 'Responda 5 perguntas · 2 minutos · grátis'
'welcome.loginCta': 'Já tenho uma conta'
'welcome.faceIdCta': 'Entrar com Face ID'
'welcome.privacy': 'Seus dados ficam no seu dispositivo. Nunca vendemos suas informações.'
'welcome.founderNote': 'Criado com base em 10 anos de estudo da ciência do sono'
```

**English Equivalents:**
```
'welcome.brand': 'GoZzzz'
'welcome.brandSub': 'Sleep Science App'
'welcome.tagline': 'Breathe, relax and sleep — with the help of science'
'welcome.credibility': 'Based on research by Dr. Matthew Walker (UC Berkeley) · Dr. Andrew Huberman (Stanford) · Dr. Charles Czeisler (Harvard)'
'welcome.startCta': 'Start program — free'
'welcome.microcopy': 'Answer 5 questions · 2 minutes · free'
'welcome.loginCta': 'I already have an account'
'welcome.faceIdCta': 'Sign in with Face ID'
'welcome.privacy': 'Your data stays on your device. We never sell your information.'
'welcome.founderNote': 'Built on 10 years of sleep science research'
```

---

### Issue 2: Privacy Policy (app/privacy.tsx) - Lines 20-onwards
**Problem:** Uses `isPt ? 'PT' : 'EN'` pattern instead of `t()` function

**Current Approach:**
```typescript
const isPt = language !== 'en';
{isPt ? 'Voltar' : 'Back'}
{isPt ? 'Política de Privacidade' : 'Privacy Policy'}
```

**Fix:** Replace all with `t()` calls

**Required Translation Keys:**
```
'privacy.back': 'Voltar' / 'Back'
'privacy.title': 'Política de Privacidade' / 'Privacy Policy'
'privacy.updated': 'Atualizada em 17 de março de 2026' / 'Updated March 17, 2026'
'privacy.section1.title': 'Visão Geral' / 'Overview'
'privacy.section1.text': '...'
'privacy.section2.title': 'Responsável pelos Dados' / 'Data Controller'
...
```

---

### Issue 3: Terms & Conditions (app/terms.tsx) - Lines 20-onwards
**Problem:** Portuguese-only hardcoded text, missing English translation

**Current Issue:**
- No `isPt` conditional logic (unlike privacy.tsx)
- All text in Portuguese
- No English version at all

**Required Translation Keys:**
```
'terms.back': 'Voltar' / 'Back'
'terms.title': 'Termos e Condições' / 'Terms & Conditions'
'terms.updated': 'Atualizado em 17 de março de 2026' / 'Updated March 17, 2026'
'terms.section1.title': 'Aceitação dos Termos' / 'Acceptance of Terms'
'terms.section1.text': '...'
...
```

---

### Issue 4: Payment Screen (app/payment.tsx)
**Problem:** Hardcoded prices instead of translations

**Current Approach:**
```typescript
locale === 'BR' ? 'R$ 39,90' : '$11.90'
locale === 'BR' ? 'R$ 24,99' : '$7.90'
```

**Required Translation Keys:**
```
'payment.monthlyPrice': 'R$ 39,90' / '$11.90'
'payment.annualPrice': 'R$ 24,99' / '$7.90'
'payment.savings': 'Economize 37%' / 'Save 39%'
...
```

---

### Issue 5: Checkout Screen (app/checkout.tsx)
**Problem:** Uses custom `getText()` helper instead of `t()` function

**Current Pattern:**
```typescript
const getText = (pt: string, en: string) => language === 'pt' ? pt : en;
getText('Plano Mensal', 'Monthly Plan')
```

**Fix:** Remove `getText()` helper and use `t()` consistently

---

### Issue 6: Web Pages Metadata
**Problem:** Head tags hardcoded in English only

**Files Affected:**
- `app/web/programa.tsx` - Hardcoded English metadata
- `app/web/sobre.tsx` - Hardcoded English metadata

**Required Translation Keys:**
```
'web.meta.programa.title': '21-Step Program...' / '...'
'web.meta.sobre.title': 'About GoZzzz...' / '...'
```

---

## IMPLEMENTATION STEPS

### Step 1: Extend LanguageContext.tsx
Add all missing translation keys to both Portuguese and English objects:
- 10 welcome screen keys
- 30+ privacy policy keys
- 30+ terms & conditions keys
- 5+ payment keys
- 10+ web metadata keys

**Total New Keys:** ~85 keys

### Step 2: Update app/index.tsx
Replace all hardcoded text with `t()` calls:
- Import `useLanguage` hook
- Replace string literals with `t('welcome.*')` calls
- Test both Portuguese and English versions

### Step 3: Update app/privacy.tsx
Replace `isPt ? '' : ''` conditionals with `t()` calls:
- Replace each conditional with single `t()` call
- Remove `const isPt = language !== 'en'` line
- Add all missing English translations to LanguageContext

### Step 4: Update app/terms.tsx
Add English translation and switch to `t()` calls:
- Add full English translation to LanguageContext
- Replace hardcoded Portuguese with `t()` calls
- Mirror structure from privacy.tsx

### Step 5: Update app/payment.tsx
Replace hardcoded prices with `t()` calls:
- Remove hardcoded currency values
- Add translation keys for all price strings
- Use `t('payment.*')` pattern

### Step 6: Update app/checkout.tsx
Remove `getText()` helper and use `t()`:
- Delete `const getText = (pt, en) => ...` helper
- Replace all `getText()` calls with `t()` calls
- Add any missing translation keys

### Step 7: Update Web Pages
Replace hardcoded metadata:
- Add translation keys for meta titles/descriptions
- Update `app/web/programa.tsx`
- Update `app/web/sobre.tsx`
- Update `app/web/coach.tsx` if needed

### Step 8: Testing & Verification
- Run build: `npm run build`
- Test both Portuguese and English versions
- Verify all strings display correctly
- Check for any missing keys in console

---

## TRANSLATION KEYS SUMMARY

### New Keys to Add (~85 total)

#### Welcome Screen (10 keys)
```typescript
'welcome.brand'
'welcome.brandSub'
'welcome.tagline'
'welcome.credibility'
'welcome.startCta'
'welcome.microcopy'
'welcome.loginCta'
'welcome.faceIdCta'
'welcome.privacy'
'welcome.founderNote'
```

#### Privacy Policy (25+ keys)
```typescript
'privacy.back'
'privacy.title'
'privacy.updated'
'privacy.overview.title'
'privacy.overview.text'
'privacy.dataController.title'
'privacy.dataController.text'
... (more sections)
```

#### Terms & Conditions (25+ keys)
```typescript
'terms.back'
'terms.title'
'terms.updated'
'terms.acceptance.title'
'terms.acceptance.text'
'terms.service.title'
'terms.service.text'
... (more sections)
```

#### Payment (5+ keys)
```typescript
'payment.monthlyPrice'
'payment.annualPrice'
'payment.savings'
... (more if needed)
```

#### Web Metadata (10+ keys)
```typescript
'web.meta.programa.title'
'web.meta.programa.description'
'web.meta.sobre.title'
'web.meta.sobre.description'
... (more pages)
```

---

## CONSISTENCY RULES

After Implementation:
1. ✅ **All user-visible text** uses `t()` function
2. ✅ **No hardcoded strings** except brand names (GoZzzz, expert names)
3. ✅ **No `isPt ? '' : ''` patterns** anywhere
4. ✅ **No custom translation helpers** (like `getText()`)
5. ✅ **All keys follow naming convention:** `section.subsection.key`
6. ✅ **Both PT and EN** provided for every key
7. ✅ **Build passes** with no missing translation warnings

---

## FILES TO MODIFY

| File | Type | Changes |
|------|------|---------|
| `contexts/LanguageContext.tsx` | Context | Add 85+ new translation keys |
| `app/index.tsx` | Welcome | Replace 10 hardcoded strings with `t()` |
| `app/privacy.tsx` | Policy | Replace all `isPt ? '' : ''` with `t()` |
| `app/terms.tsx` | Terms | Add English + replace hardcoded with `t()` |
| `app/payment.tsx` | Payment | Replace hardcoded prices with `t()` |
| `app/checkout.tsx` | Checkout | Remove `getText()` helper, use `t()` |
| `app/web/programa.tsx` | Web | Replace metadata with `t()` |
| `app/web/sobre.tsx` | Web | Replace metadata with `t()` |

---

## VERIFICATION CHECKLIST

After completing all changes:
- [ ] All 85+ new keys added to LanguageContext.tsx
- [ ] app/index.tsx uses `t()` for all strings
- [ ] app/privacy.tsx uses `t()` consistently
- [ ] app/terms.tsx has full English translation
- [ ] app/payment.tsx prices use `t()`
- [ ] app/checkout.tsx removed `getText()` helper
- [ ] Web pages use `t()` for metadata
- [ ] `npm run build` passes without errors
- [ ] Portuguese version displays correctly
- [ ] English version displays correctly
- [ ] No console warnings about missing keys
- [ ] All 646+ keys working properly

---

## EXPECTED OUTCOME

✅ **One unified translation system** using `LanguageContext.tsx`
✅ **Zero hardcoded text** for user-facing content
✅ **650+ translation keys** covering entire app
✅ **Complete bilingual support** Portuguese & English
✅ **Easy maintenance** - all strings in one place
✅ **Better UX** - seamless language switching
✅ **Production ready** - no missing translations


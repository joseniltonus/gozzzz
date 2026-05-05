# Design tokens — Entry screen ↔ Figma

**Fonte de verdade no código:** `src/screens/entryScreenTokens.ts`  
Altere o TypeScript primeiro; use este documento para **espelhar variáveis e estilos no Figma** (ou cole trechos nas descrições das variáveis).

---

## Convenção de nomes no Figma

Use coleções por categoria, com **slash** (espelha o objeto TS):

| Coleção Figma sugerida | Exemplo de nome de variável |
|--------------------------|-----------------------------|
| `Entry / Color` | `Entry/Color/Text/Primary` |
| `Entry / Space` | `Entry/Space/4` (= 16px) |
| `Entry / Radius` | `Entry/Radius/LG` |
| `Entry / Type` | `Entry/Type/Display/Font size` |

**Mapeamento TS → nome Figma**

- `T.color.text.primary` → `Entry/Color/Text/Primary`
- `T.space[4]` → `Entry/Space/4` (valor **16**)
- `T.space.pageInline` → `Entry/Space/Page inline`
- `T.radius.lg` → `Entry/Radius/LG`

---

## Cores (Color variables)

Coleção: **Entry / Color**

| Nome Figma (sugestão) | Valor | Uso |
|----------------------|-------|-----|
| `Entry/Color/Canvas` | `#080a15` | Fundo da tela |
| `Entry/Color/Star` | `#ffffff` | Partículas |
| `Entry/Color/Text/Primary` | `#fafbff` | Headline principal |
| `Entry/Color/Text/Secondary` | `#9ca6cc` | Corpo / instituição |
| `Entry/Color/Text/Tertiary` | `#8b96b8` | Especialidade |
| `Entry/Color/Text/Quaternary` | `#7a8498` | Link secundário |
| `Entry/Color/Text/Inverse` | `#ffffff` | Texto sobre CTA |
| `Entry/Color/Text/Accent` | `#c4b8ff` | Destaque headline |
| `Entry/Color/Text/Accent muted` | `#b8b0ff` | Fallback “Zzzz” web |
| `Entry/Color/Text/Emphasis` | `#dce2f5` | “Código de sono” |
| `Entry/Color/Text/Overline` | `#7a85a8` | Tagline caps |
| `Entry/Color/Text/Label` | `#6a7698` | Label seção |
| `Entry/Color/Text/Caption` | `#5a6488` | Disclaimer |
| `Entry/Color/Text/Meta` | `#8b96b8` | Linha meta |
| `Entry/Color/Border/Hairline` | `rgba(255,255,255,0.085)` | Divisor |
| `Entry/Color/Border/Subtle` | `rgba(255,255,255,0.08)` | Borda card |
| `Entry/Color/Border/Default` | `rgba(255,255,255,0.12)` | Borda neutra |
| `Entry/Color/Border/Strong` | `rgba(255,255,255,0.14)` | — |
| `Entry/Color/Border/Badge` | `rgba(189,179,255,0.22)` | Pill ciência |
| `Entry/Color/Border/CTA` | `rgba(255,255,255,0.14)` | Contorno botão |
| `Entry/Color/Icon/Muted` | `#8e9ab8` | Lucide meta |
| `Entry/Color/Icon/Dim` | `#6a7698` | Sparkles divisor |
| `Entry/Color/Icon/Chevron` | `rgba(255,255,255,0.42)` | Chevron link |
| `Entry/Color/Glow/Primary` | `rgba(100,80,255,0.14)` | Glow 1 |
| `Entry/Color/Glow/Secondary` | `rgba(70,120,255,0.075)` | Glow 2 |
| `Entry/Color/Shadow/CTA` | `#4030a8` | Sombra CTA |
| `Entry/Color/Shadow/Card` | `#020510` | Sombra card |
| `Entry/Color/Shadow/Badge` | `#6a50c0` | Sombra pill |
| `Entry/Color/Shadow/Check` | `#0a1a12` | Sombra selo ✓ |
| `Entry/Color/Success/Fill` | `rgba(124,255,160,0.08)` | Fundo selo |
| `Entry/Color/Success/Border` | `rgba(140,255,185,0.32)` | Borda selo |
| `Entry/Color/Success/Icon` | `#8effb8` | Ícone check |
| `Entry/Color/Headline/Glow` | `rgba(80,60,180,0.45)` | textShadow headline |

**Gradientes** (no Figma: variáveis de gradiente ou estilos de preenchimento):

- **CTA:** `#9080ff` → `#6a5fff` → `#4a90ff` (diagonal)
- **Wordmark:** `#b8b0ff` → `#70d0ff` (horizontal)
- **Card:** stops em `entryScreenTokens` → `color.gradient.card`

**Superfícies** (aliases úteis):

- `Entry/Color/Surface/Badge fill`, `Badge dot`, `Pill label`, `Divider dot`, `Link pill`, `Shimmer`, `CTA hairline`, `Card hairline`, `Home indicator` — valores em `T.color.surface.*` no TS.

---

## Espaço (Number variables, escala 4px)

Coleção: **Entry / Space** — unidade **px**

| Nome | Valor | Nome TS |
|------|-------|---------|
| `Entry/Space/0` | 0 | `space.0` |
| `Entry/Space/1` | 4 | `space.1` |
| `Entry/Space/2` | 8 | `space.2` |
| `Entry/Space/3` | 12 | `space.3` |
| `Entry/Space/4` | 16 | `space.4` |
| `Entry/Space/5` | 20 | `space.5` |
| `Entry/Space/6` | 24 | `space.6` |
| `Entry/Space/7` | 28 | `space.7` |
| `Entry/Space/8` | 32 | `space.8` |
| `Entry/Space/10` | 40 | `space.10` |
| `Entry/Space/12` | 48 | `space.12` |
| `Entry/Space/14` | 56 | `space.14` |
| `Entry/Space/Page inline` | 24 | `space.pageInline` |
| `Entry/Space/Page top` | 56 | `space.pageTop` |
| `Entry/Space/Page bottom` | 48 | `space.pageBottom` |

---

## Raio (Number variables, px)

| Nome | Valor |
|------|-------|
| `Entry/Radius/XS` | 4 |
| `Entry/Radius/SM` | 8 |
| `Entry/Radius/MD` | 12 |
| `Entry/Radius/LG` | 16 |
| `Entry/Radius/Pill` | 999 |
| `Entry/Radius/Seal` | 11 |
| `Entry/Radius/Home indicator` | 2 |

---

## Tipografia (Font ou variáveis compostas)

No Figma, prefira **estilos de texto** com o mesmo nome da chave em `T.type.*`:

| Estilo | Size | Line | Tracking | Weight |
|--------|------|------|----------|--------|
| `Entry/Type/Overline` | 11 | 16 | 2.5 | Medium 500 |
| `Entry/Type/Label` | 10 | 14 | 2.2 | Semibold 600 |
| `Entry/Type/Caption` | 12 | 16 | 0.12 | Medium 500 |
| `Entry/Type/Body` | 16 | 24 | 0.15 | Regular 400 |
| `Entry/Type/Body emphasis` | 16 | 24 | — | Semibold 600 |
| `Entry/Type/CTA` | 17 | 24 | 0.2 | Bold 700 |
| `Entry/Type/Display` | 38 | 44 | -1.1 | Bold 700 |
| `Entry/Type/Logo` | 32 | 40 | -1 | Bold 700 |
| `Entry/Type/Disclaimer` | 10 | 17 | 0.1 | Regular 400 |
| `Entry/Type/Card title` | 12 | 16 | -0.15 | Semibold 600 |
| `Entry/Type/Card meta` | 10 | 16 | 0.05 | Regular 400 |
| `Entry/Type/Card spec` | 9 | 14 | 0.15 | Regular 400 italic |
| `Entry/Type/Avatar` | 10 | 12 | — | Bold 700 |
| `Entry/Type/Badge` | 11 | 14 | 1.4 | Semibold 600 |

Fonte: use a família do app (SF Pro / Inter / etc.) alinhada ao que o Expo carrega.

---

## Elevação (Effect styles)

Crie **Effect style** com os valores abaixo (iOS shadow; no Android use `elevation` só no dev).

| Nome | Color | Offset Y | Blur | Opacity |
|------|-------|----------|------|---------|
| `Entry/Elevation/Badge` | `#6a50c0` | 12 | 16 | 22% |
| `Entry/Elevation/CTA` | `#4030a8` | 14 | 26 | 42% |
| `Entry/Elevation/Card` | `#020510` | 14 | 22 | 65% |
| `Entry/Elevation/Check` | `#0a1a12` | 4 | 4 | 50% |

---

## Ícones Lucide (referência, não variável Figma numérica)

| Token TS | px | Stroke (aprox.) |
|----------|----|------------------|
| `icon.xs` | 11 | 2.75 |
| `icon.sm` | 12 | 1.5 |
| `icon.md` | 14 | 1.75–2 |
| `icon.cta` / `lg` | 18 | 2.25 |

---

## Avatares pesquisadores (`researcherAvatar`)

| Chave | Fill | Text | Ring |
|-------|------|------|------|
| MB | `rgba(124,111,255,0.22)` | `#d8d0ff` | `rgba(255,255,255,0.1)` |
| MW | `rgba(111,200,255,0.2)` | `#b8e8ff` | idem |
| AH | `rgba(160,111,255,0.2)` | `#dcc0ff` | idem |
| CC | `rgba(111,200,160,0.2)` | `#b8ffe8` | idem |

---

## Texto para colar na descrição da biblioteca Figma

```
Sincronizado com: src/screens/entryScreenTokens.ts (GoZzzz Entry).
Escala de espaço: múltiplos de 4px. Cores semânticas Entry/Color/*.
Alterações: editar TS → atualizar variáveis/estilos aqui → PR.
```

---

## JSON plano (plugins / Tokens Studio)

Arquivo gerado: `docs/figma-entry-screen-tokens.json` — chaves planas `color.text.primary` → valor string/number para importação em ferramentas que aceitem JSON flat.

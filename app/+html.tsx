// Template raiz do HTML para o web (Expo Router static export).
//
// Por que isso existe: o default do Expo Router emite `<html lang="en">`,
// o que confunde o Google em páginas PT-BR e prejudica ranqueamento no
// mercado brasileiro. Esse template força `lang="pt-BR"` globalmente
// (todo o conteúdo principal é em português; a versão EN é fallback
// dentro da app, não uma rota separada).
//
// Também garantimos viewport correto e charset utf-8 — esses metas
// precisam estar no HTML inicial pra renderização correta.

import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';
import { WEB_EDITORIAL_GOOGLE_FONTS_HREF } from '@/constants/webEditorialFonts';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* theme-color casa o chrome do navegador mobile com o BG da landing */}
        <meta name="theme-color" content="#0a0a1a" />
        <meta name="application-name" content="GoZzzz" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="GoZzzz" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        {/* Tipografia editorial (lições / leitura web) — Fraunces + Source Sans 3 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={WEB_EDITORIAL_GOOGLE_FONTS_HREF} rel="stylesheet" />
        {/* RN-web ScrollView reset — evita scroll horizontal indesejado */}
        <ScrollViewStyleReset />
        {/* Evita barra horizontal em landings com flex row no viewport estreito (mobile browser). */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              'html,body{max-width:100%;overflow-x:clip;margin:0;}' +
              'body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

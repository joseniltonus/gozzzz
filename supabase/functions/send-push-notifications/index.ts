import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type Chronotype = "dolphin" | "lion" | "bear" | "wolf";
type Lang = "pt" | "en";
type Week = 1 | 2 | 3;

const TIMING: Record<Chronotype, string[]> = {
  dolphin: ["21:30", "22:00", "06:30"],
  lion:    ["20:00", "20:30", "05:30"],
  bear:    ["22:00", "22:30", "07:00"],
  wolf:    ["23:00", "23:30", "08:00"],
};

type NotifContent = { title: string; body: string };
type LangContent = Record<Lang, NotifContent>;
type TimeSlotContent = Record<string, LangContent>;
type WeekContent = Record<Week, TimeSlotContent>;
type ChronotypeContent = Record<Chronotype, WeekContent>;

const CONTENT: ChronotypeContent = {
  dolphin: {
    1: {
      "21:30": {
        pt: { title: "🐬 GoZzzz", body: "Sua mente acelerada tem solução. Amanhã você aprende a primeira." },
        en: { title: "🐬 GoZzzz", body: "Your racing mind has a solution. Tomorrow you learn the first one." },
      },
      "22:00": {
        pt: { title: "🐬 Janela ideal de sono", body: "Desligue as telas. Seu sono começa agora." },
        en: { title: "🐬 Ideal sleep window", body: "Turn off the screens. Your sleep starts now." },
      },
      "06:30": {
        pt: { title: "🐬 Bom dia, Golfinho", body: "Estudos de ritmo circadiano de Harvard mostram que cronotipos noturnos sofrem jetlag social crônico quando forçados a horários convencionais." },
        en: { title: "🐬 Good morning, Dolphin", body: "Harvard circadian research shows night chronotypes suffer chronic social jetlag when forced into conventional schedules." },
      },
    },
    2: {
      "21:30": {
        pt: { title: "🐬 GoZzzz", body: "Desafio: 10min de decompressão antes de deitar. Só isso." },
        en: { title: "🐬 GoZzzz", body: "Challenge: 10 minutes of decompression before bed. That's all." },
      },
      "22:00": {
        pt: { title: "🐬 Ritual noturno", body: "Tela desligada. Mente desacelerando. Você sabe o que fazer." },
        en: { title: "🐬 Night ritual", body: "Screen off. Mind slowing down. You know what to do." },
      },
      "06:30": {
        pt: { title: "🐬 Manhã consistente", body: "Estudos de ritmo circadiano de Harvard mostram que cronotipos noturnos sofrem jetlag social crônico quando forçados a horários convencionais." },
        en: { title: "🐬 Consistent morning", body: "Harvard circadian research shows night chronotypes suffer chronic social jetlag when forced into conventional schedules." },
      },
    },
    3: {
      "21:30": {
        pt: { title: "🐬 GoZzzz", body: "3 semanas. Sua mente aprendeu a desligar. Isso não volta atrás." },
        en: { title: "🐬 GoZzzz", body: "3 weeks. Your mind learned to switch off. That doesn't go backwards." },
      },
      "22:00": {
        pt: { title: "🐬 21 dias", body: "Você mudou seu sono. Continue protegendo o que construiu." },
        en: { title: "🐬 21 days", body: "You changed your sleep. Keep protecting what you built." },
      },
      "06:30": {
        pt: { title: "🐬 Bom dia", body: "Estudos de ritmo circadiano de Harvard mostram que cronotipos noturnos sofrem jetlag social crônico quando forçados a horários convencionais." },
        en: { title: "🐬 Good morning", body: "Harvard circadian research shows night chronotypes suffer chronic social jetlag when forced into conventional schedules." },
      },
    },
  },
  lion: {
    1: {
      "20:00": {
        pt: { title: "🦁 GoZzzz", body: "Seu ritmo natural é raro. Protegê-lo muda tudo." },
        en: { title: "🦁 GoZzzz", body: "Your natural rhythm is rare. Protecting it changes everything." },
      },
      "20:30": {
        pt: { title: "🦁 Janela ideal de sono", body: "Luz baixa. Telas fora. Seu pico matinal depende desta noite." },
        en: { title: "🦁 Ideal sleep window", body: "Low light. Screens off. Your morning peak depends on tonight." },
      },
      "05:30": {
        pt: { title: "🦁 Bom dia, Leão", body: "Pesquisas de neurociência indicam que luz natural nos primeiros 30min ao acordar regula seu ritmo circadiano." },
        en: { title: "🦁 Good morning, Lion", body: "Neuroscience research shows natural light in the first 30min after waking regulates your circadian rhythm." },
      },
    },
    2: {
      "20:00": {
        pt: { title: "🦁 GoZzzz", body: "Mesmo horário por 7 dias. Walker chama isso de âncora circadiana." },
        en: { title: "🦁 GoZzzz", body: "Same schedule for 7 days. Walker calls it a circadian anchor." },
      },
      "20:30": {
        pt: { title: "🦁 Âncora circadiana", body: "Consistência hoje = pico máximo amanhã cedo." },
        en: { title: "🦁 Circadian anchor", body: "Consistency tonight = maximum peak tomorrow morning." },
      },
      "05:30": {
        pt: { title: "🦁 Leão acorda", body: "Pesquisas de neurociência indicam que luz natural nos primeiros 30min ao acordar regula seu ritmo circadiano." },
        en: { title: "🦁 Lion wakes", body: "Neuroscience research shows natural light in the first 30min after waking regulates your circadian rhythm." },
      },
    },
    3: {
      "20:00": {
        pt: { title: "🦁 GoZzzz", body: "21 dias protegendo seu ritmo. Seu cérebro agradece." },
        en: { title: "🦁 GoZzzz", body: "21 days protecting your rhythm. Your brain thanks you." },
      },
      "20:30": {
        pt: { title: "🦁 21 dias", body: "Seu plano de Leão está mais afiado do que nunca." },
        en: { title: "🦁 21 days", body: "Your Lion blueprint is sharper than ever." },
      },
      "05:30": {
        pt: { title: "🦁 Bom dia", body: "Pesquisas de neurociência indicam que luz natural nos primeiros 30min ao acordar regula seu ritmo circadiano." },
        en: { title: "🦁 Good morning", body: "Neuroscience research shows natural light in the first 30min after waking regulates your circadian rhythm." },
      },
    },
  },
  bear: {
    1: {
      "22:00": {
        pt: { title: "🐻 GoZzzz", body: "Você dorme — mas está em dívida. Amanhã calculamos quanto." },
        en: { title: "🐻 GoZzzz", body: "You sleep — but you're in debt. Tomorrow we calculate how much." },
      },
      "22:30": {
        pt: { title: "🐻 Janela ideal de sono", body: "Mesmo horário todo dia. Seu sono profundo agradece." },
        en: { title: "🐻 Ideal sleep window", body: "Same time every day. Your deep sleep thanks you." },
      },
      "07:00": {
        pt: { title: "🐻 Bom dia, Urso", body: "Pesquisas de neurociência indicam que luz natural nos primeiros 30min ao acordar regula seu ritmo circadiano." },
        en: { title: "🐻 Good morning, Bear", body: "Neuroscience research shows natural light in the first 30min after waking regulates your circadian rhythm." },
      },
    },
    2: {
      "22:00": {
        pt: { title: "🐻 GoZzzz", body: "Mesma hora de acordar todo dia — inclusive sábado." },
        en: { title: "🐻 GoZzzz", body: "Same wake time every day — including Saturday." },
      },
      "22:30": {
        pt: { title: "🐻 Consistência", body: "O fim de semana não quebra o que você construiu durante a semana." },
        en: { title: "🐻 Consistency", body: "The weekend doesn't break what you built during the week." },
      },
      "07:00": {
        pt: { title: "🐻 Manhã de Urso", body: "Pesquisas de neurociência indicam que luz natural nos primeiros 30min ao acordar regula seu ritmo circadiano." },
        en: { title: "🐻 Bear morning", body: "Neuroscience research shows natural light in the first 30min after waking regulates your circadian rhythm." },
      },
    },
    3: {
      "22:00": {
        pt: { title: "🐻 GoZzzz", body: "21 etapas. Dívida zerada. Sono consistente. É seu agora." },
        en: { title: "🐻 GoZzzz", body: "21 steps. Debt cleared. Consistent sleep. It's yours now." },
      },
      "22:30": {
        pt: { title: "🐻 21 dias", body: "Você chegou. Seu sono nunca foi tão consistente." },
        en: { title: "🐻 21 days", body: "You made it. Your sleep has never been this consistent." },
      },
      "07:00": {
        pt: { title: "🐻 Bom dia", body: "Pesquisas de neurociência indicam que luz natural nos primeiros 30min ao acordar regula seu ritmo circadiano." },
        en: { title: "🐻 Good morning", body: "Neuroscience research shows natural light in the first 30min after waking regulates your circadian rhythm." },
      },
    },
  },
  wolf: {
    1: {
      "23:00": {
        pt: { title: "🐺 GoZzzz", body: "Você não é preguiçoso. Seu DNA manda aqui." },
        en: { title: "🐺 GoZzzz", body: "You're not lazy. Your DNA is in charge here." },
      },
      "23:30": {
        pt: { title: "🐺 Janela ideal de sono", body: "Lento, mas consistente. Seu relógio vai aprender." },
        en: { title: "🐺 Ideal sleep window", body: "Slow, but consistent. Your clock will learn." },
      },
      "08:00": {
        pt: { title: "🐺 Bom dia, Lobo", body: "Estudos de ritmo circadiano de Harvard mostram que cronotipos noturnos sofrem jetlag social crônico quando forçados a horários convencionais." },
        en: { title: "🐺 Good morning, Wolf", body: "Harvard circadian research shows night chronotypes suffer chronic social jetlag when forced into conventional schedules." },
      },
    },
    2: {
      "23:00": {
        pt: { title: "🐺 GoZzzz", body: "Uma estratégia para funcionar melhor no mundo das 9h às 18h." },
        en: { title: "🐺 GoZzzz", body: "One strategy to perform better in the 9-to-5 world." },
      },
      "23:30": {
        pt: { title: "🐺 Protocolo do Lobo", body: "Desconecte agora. Seu sono tardio ainda pode ser profundo." },
        en: { title: "🐺 Wolf protocol", body: "Disconnect now. Your late sleep can still be deep." },
      },
      "08:00": {
        pt: { title: "🐺 Manhã de Lobo", body: "Estudos de ritmo circadiano de Harvard mostram que cronotipos noturnos sofrem jetlag social crônico quando forçados a horários convencionais." },
        en: { title: "🐺 Wolf morning", body: "Harvard circadian research shows night chronotypes suffer chronic social jetlag when forced into conventional schedules." },
      },
    },
    3: {
      "23:00": {
        pt: { title: "🐺 GoZzzz", body: "Lobos que chegam aqui são raros. Você foi um deles." },
        en: { title: "🐺 GoZzzz", body: "Wolves who make it here are rare. You were one of them." },
      },
      "23:30": {
        pt: { title: "🐺 21 dias", body: "Você sobreviveu ao mundo diurno com seu ritmo intacto." },
        en: { title: "🐺 21 days", body: "You survived the daytime world with your rhythm intact." },
      },
      "08:00": {
        pt: { title: "🐺 Bom dia", body: "Estudos de ritmo circadiano de Harvard mostram que cronotipos noturnos sofrem jetlag social crônico quando forçados a horários convencionais." },
        en: { title: "🐺 Good morning", body: "Harvard circadian research shows night chronotypes suffer chronic social jetlag when forced into conventional schedules." },
      },
    },
  },
};

function getWeekFromOnboardingDate(onboardingDateMs: number): Week {
  if (!onboardingDateMs) return 1;
  const daysPassed = Math.floor((Date.now() - onboardingDateMs) / 86_400_000);
  return Math.min(Math.floor(daysPassed / 7) + 1, 3) as Week;
}

function getLocalTime(utcOffsetMinutes: number): { hour: number; minute: number } {
  const nowMs = Date.now() + utcOffsetMinutes * 60_000;
  const d = new Date(nowMs);
  return { hour: d.getUTCHours(), minute: d.getUTCMinutes() };
}

function timesMatch(localHour: number, localMinute: number, timeSlot: string, windowMin = 15): boolean {
  const [slotH, slotM] = timeSlot.split(":").map(Number);
  const slotTotalMin = slotH * 60 + slotM;
  const localTotalMin = localHour * 60 + localMinute;
  const diff = Math.abs(localTotalMin - slotTotalMin);
  return diff <= windowMin;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: vapidRow } = await supabase
      .from("vapid_keys")
      .select("public_key, private_key")
      .maybeSingle();

    if (!vapidRow) {
      return new Response(
        JSON.stringify({ skipped: "No VAPID keys found. Call /vapid-key first." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    webpush.setVapidDetails(
      "mailto:hello@gozzzz.app",
      vapidRow.public_key,
      vapidRow.private_key
    );

    const { data: subscriptions, error } = await supabase
      .from("push_subscriptions")
      .select("*");

    if (error) throw error;
    if (!subscriptions?.length) {
      return new Response(
        JSON.stringify({ sent: 0, message: "No subscriptions" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let sent = 0;
    let failed = 0;

    for (const sub of subscriptions) {
      const { hour, minute } = getLocalTime(sub.utc_offset);
      const chronotype = (sub.chronotype || "bear") as Chronotype;
      const lang = (sub.lang || "pt") as Lang;
      const week = getWeekFromOnboardingDate(sub.onboarding_date);
      const slots = TIMING[chronotype] || [];

      for (const slot of slots) {
        if (!timesMatch(hour, minute, slot)) continue;

        const weekContent = CONTENT[chronotype]?.[week];
        const slotContent = weekContent?.[slot];
        const langContent = slotContent?.[lang];
        if (!langContent) continue;

        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            JSON.stringify({
              title: langContent.title,
              body: langContent.body,
              icon: "/assets/images/icon.png",
              url: "/",
            })
          );
          sent++;
        } catch (_err) {
          failed++;
          if ((_err as any)?.statusCode === 410) {
            await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
          }
        }
        break;
      }
    }

    return new Response(
      JSON.stringify({ sent, failed, total: subscriptions.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

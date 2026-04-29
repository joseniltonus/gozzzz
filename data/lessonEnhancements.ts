export interface LessonEnhancement {
  lessonId: string;
  imageUrl?: string;
  keyPoints: {
    pt: string[];
    en: string[];
  };
  expertTips: {
    pt: { expert: string; tip: string }[];
    en: { expert: string; tip: string }[];
  };
  stats?: {
    pt: { number: string; label: string; description: string }[];
    en: { number: string; label: string; description: string }[];
  };
  concepts?: {
    pt: { icon: string; title: string; description: string; color: string; textColor: string }[];
    en: { icon: string; title: string; description: string; color: string; textColor: string }[];
  };
  insights?: {
    pt: { icon: string; color: string; title: string; description: string }[];
    en: { icon: string; color: string; title: string; description: string }[];
  };
  quickTips?: {
    pt: { icon: string; title: string; description: string }[];
    en: { icon: string; title: string; description: string }[];
  };
}

export const LESSON_ENHANCEMENTS: LessonEnhancement[] = [
  {
    lessonId: '1',
    keyPoints: {
      pt: [
        '4 estágios do sono: N1, N2, N3 (profundo) e REM',
        'Sono REM consolida memórias emocionais',
        'Sono profundo (N3) consolida fatos e habilidades motoras',
        'Adultos precisam de 7-9 horas por noite',
        'Menos de 6 horas aumenta risco cardíaco em 48%'
      ],
      en: [
        '4 sleep stages: N1, N2, N3 (deep) and REM',
        'REM sleep consolidates emotional memories',
        'Deep sleep (N3) consolidates facts and motor skills',
        'Adults need 7-9 hours per night',
        'Less than 6 hours increases cardiac risk by 48%'
      ],
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '8',
    keyPoints: {
      pt: [
        'Exposição solar matinal (10-30min) nos primeiros 60min após acordar',
        'Ativa células ganglionares da retina → sinaliza ao relógio biológico',
        'Aumenta cortisol pela manhã (bom!) e programa melatonina à noite',
        'Dias nublados: 20-30min. Dias ensolarados: 10-15min',
        'Não olhe diretamente pro sol - basta estar ao ar livre'
      ],
      en: [
        'Morning sun exposure (10-30min) in first 60min after waking',
        'Activates retinal ganglion cells → signals biological clock',
        'Increases morning cortisol (good!) and programs evening melatonin',
        'Cloudy days: 20-30min. Sunny days: 10-15min',
        'Don\'t look directly at sun - just be outdoors'
      ],
    },
    stats: {
      pt: [
        { number: '10-15', label: 'minutos', description: 'dias ensolarados' },
        { number: '20-30', label: 'minutos', description: 'dias nublados' },
        { number: '50x', label: 'mais brilho', description: 'exterior vs interior' }
      ],
      en: [
        { number: '10-15', label: 'minutes', description: 'sunny days' },
        { number: '20-30', label: 'minutes', description: 'cloudy days' },
        { number: '50x', label: 'brighter', description: 'outdoors vs indoors' }
      ]
    },
    concepts: {
      pt: [
        { icon: '☀️', title: 'Sincronização', description: 'Alinha seu relógio circadiano', color: '#fef08a', textColor: '#854d0e' },
        { icon: '🧠', title: 'Cortisol Matinal', description: 'Aumenta alertness e foco', color: '#fecdd3', textColor: '#7c2d12' },
        { icon: '🌙', title: 'Melatonina Noturna', description: 'Programa sono profundo', color: '#1e1b4b', textColor: '#a78bfa' },
        { icon: '👁️', title: 'Células da Retina', description: 'Detectam luz matinal', color: '#e0f2fe', textColor: '#0369a1' }
      ],
      en: [
        { icon: '☀️', title: 'Synchronization', description: 'Aligns your circadian clock', color: '#fef08a', textColor: '#854d0e' },
        { icon: '🧠', title: 'Morning Cortisol', description: 'Increases alertness and focus', color: '#fecdd3', textColor: '#7c2d12' },
        { icon: '🌙', title: 'Evening Melatonin', description: 'Programs deep sleep', color: '#1e1b4b', textColor: '#a78bfa' },
        { icon: '👁️', title: 'Retinal Cells', description: 'Detect morning light', color: '#e0f2fe', textColor: '#0369a1' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Zap', color: '#f59e0b', title: 'Efeito Circadiano', description: 'Sincroniza todos os ritmos corporais de 24h' },
        { icon: 'Heart', color: '#ef4444', title: 'Saúde Cardiovascular', description: 'Cortisol matinal organiza ritmo cardíaco' },
        { icon: 'Brain', color: '#6366f1', title: 'Foco e Clareza', description: 'Aumenta dopamina para concentração durante o dia' }
      ],
      en: [
        { icon: 'Zap', color: '#f59e0b', title: 'Circadian Effect', description: 'Synchronizes all 24h body rhythms' },
        { icon: 'Heart', color: '#ef4444', title: 'Heart Health', description: 'Morning cortisol organizes cardiac rhythm' },
        { icon: 'Brain', color: '#6366f1', title: 'Focus and Clarity', description: 'Increases dopamine for daytime concentration' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Clock', title: 'Tempo Crítico', description: 'Primeiros 60 minutos após acordar' },
        { icon: 'Moon', title: 'Consistência', description: 'Todos os dias, mesmo fins de semana' },
        { icon: 'Zap', title: 'Sem Óculos', description: 'Remova óculos de sol durante exposição' },
        { icon: 'Lightbulb', title: 'Abra a Janela', description: 'Luz através de vidro é menos eficaz' }
      ],
      en: [
        { icon: 'Clock', title: 'Critical Window', description: 'First 60 minutes after waking' },
        { icon: 'Moon', title: 'Consistency', description: 'Every day, including weekends' },
        { icon: 'Zap', title: 'No Sunglasses', description: 'Remove sunglasses during exposure' },
        { icon: 'Lightbulb', title: 'Open Window', description: 'Light through glass is less effective' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '9',
    keyPoints: {
      pt: [
        'Meia-vida da cafeína: 5-6 horas (25% ainda no sistema após 12h)',
        'Horário de corte: 10-12h antes de dormir',
        '400mg/dia (4 xícaras) é seguro, mas timing é crucial',
        'Cafeína bloqueia receptores de adenosina (pressão de sono)',
        'Power nap de 20min à tarde > café'
      ],
      en: [
        'Caffeine half-life: 5-6 hours (25% still in system after 12h)',
        'Cutoff time: 10-12h before bed',
        '400mg/day (4 cups) is safe, but timing is crucial',
        'Caffeine blocks adenosine receptors (sleep pressure)',
        '20-min power nap afternoon > coffee'
      ],
    },
    stats: {
      pt: [
        { number: '5-6', label: 'horas', description: 'meia-vida da cafeína' },
        { number: '25%', label: 'reste', description: 'após 12 horas' },
        { number: '400mg', label: 'máximo seguro', description: 'por dia' }
      ],
      en: [
        { number: '5-6', label: 'hours', description: 'caffeine half-life' },
        { number: '25%', label: 'remains', description: 'after 12 hours' },
        { number: '400mg', label: 'safe max', description: 'per day' }
      ]
    },
    concepts: {
      pt: [
        { icon: '☕', title: 'Bloqueio de Adenosina', description: 'Suprime pressão de sono', color: '#fef3c7', textColor: '#92400e' },
        { icon: '⏰', title: 'Timing Crítico', description: 'Corte 10-12h antes de dormir', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '⚡', title: 'Efeitos Invisíveis', description: 'Reduz N3 mesmo invisível', color: '#dcfce7', textColor: '#166534' },
        { icon: '😴', title: 'Power Nap', description: 'Melhor que café à tarde', color: '#e0f2fe', textColor: '#0369a1' }
      ],
      en: [
        { icon: '☕', title: 'Adenosine Blockade', description: 'Suppresses sleep pressure', color: '#fef3c7', textColor: '#92400e' },
        { icon: '⏰', title: 'Critical Timing', description: 'Cutoff 10-12h before bed', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '⚡', title: 'Invisible Effects', description: 'Reduces N3 undetected', color: '#dcfce7', textColor: '#166534' },
        { icon: '😴', title: 'Power Nap', description: 'Better than afternoon coffee', color: '#e0f2fe', textColor: '#0369a1' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Brain', color: '#6366f1', title: 'Qualidade vs Duração', description: 'Cafeína não reduz duração, mas qualidade reduz 15-20%' },
        { icon: 'Zap', color: '#f59e0b', title: 'Metabolismo Variável', description: 'Genética afeta velocidade de eliminação de cafeína' },
        { icon: 'Moon', color: '#8b5cf6', title: 'Efeito Cumulativo', description: 'Pequenas doses se acumulam se não houver espaço' }
      ],
      en: [
        { icon: 'Brain', color: '#6366f1', title: 'Quality vs Duration', description: 'Caffeine doesn\'t reduce duration, but quality reduces 15-20%' },
        { icon: 'Zap', color: '#f59e0b', title: 'Variable Metabolism', description: 'Genetics affects caffeine elimination speed' },
        { icon: 'Moon', color: '#8b5cf6', title: 'Cumulative Effect', description: 'Small doses accumulate if no spacing' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Clock', title: 'Corte Matinal', description: 'Máximo até meio-dia' },
        { icon: 'Zap', title: 'Sem Cafeína à Noite', description: '3pm é o limite mais tarde' },
        { icon: 'Moon', title: 'Power Nap', description: '20 min restaura mais que café' },
        { icon: 'Heart', title: 'Detecte Padrões', description: 'Você dorme mas sente fadiga?' }
      ],
      en: [
        { icon: 'Clock', title: 'Morning Cutoff', description: 'Maximum until noon' },
        { icon: 'Zap', title: 'No Evening Caffeine', description: '3pm is the latest limit' },
        { icon: 'Moon', title: 'Power Nap', description: '20 min restores more than coffee' },
        { icon: 'Heart', title: 'Detect Patterns', description: 'You sleep but feel tired?' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '10',
    keyPoints: {
      pt: [
        'Temperatura ideal: 15-19°C (60-67°F)',
        'Vasodilatação periférica: corpo esfria antes de dormir',
        'Temperatura corporal central cai 2-3°C',
        'Cama quente = menos sono profundo e mais fragmentação',
        'Banho quente 2-3h antes de dormir facilita queda térmica'
      ],
      en: [
        'Optimal temperature: 15-19°C (60-67°F)',
        'Peripheral vasodilation: body cools before sleep',
        'Core body temperature drops 2-3°C',
        'Hot bed = less deep sleep and more fragmentation',
        'Hot bath 2-3h before bed facilitates thermal drop'
      ],
    },
    stats: {
      pt: [
        { number: '15-19', label: '°C', description: 'temperatura ideal' },
        { number: '2-3', label: '°C', description: 'queda corporal' },
        { number: '2-3', label: 'horas', description: 'banho antes de dormir' }
      ],
      en: [
        { number: '15-19', label: '°C', description: 'ideal temperature' },
        { number: '2-3', label: '°C', description: 'body temperature drop' },
        { number: '2-3', label: 'hours', description: 'bath before bed' }
      ]
    },
    concepts: {
      pt: [
        { icon: '🌡️', title: 'Temperatura Corporal', description: 'Cai naturalmente antes de dormir', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🛏️', title: 'Vasodilatação', description: 'Sangue flui para extremidades', color: '#fecdd3', textColor: '#7c2d12' },
        { icon: '🚿', title: 'Banho Quente', description: 'Intensifica queda térmica', color: '#fef3c7', textColor: '#92400e' },
        { icon: '❄️', title: 'Ambiente Fresco', description: 'Promove melatonina naturalmente', color: '#dcfce7', textColor: '#166534' }
      ],
      en: [
        { icon: '🌡️', title: 'Core Temperature', description: 'Naturally drops before sleep', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🛏️', title: 'Vasodilation', description: 'Blood flows to extremities', color: '#fecdd3', textColor: '#7c2d12' },
        { icon: '🚿', title: 'Hot Bath', description: 'Intensifies thermal drop', color: '#fef3c7', textColor: '#92400e' },
        { icon: '❄️', title: 'Cool Environment', description: 'Promotes melatonin naturally', color: '#dcfce7', textColor: '#166534' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Zap', color: '#f59e0b', title: 'Gatilho Biológico', description: 'Queda de temperatura é o sinal para dormir, não apenas conforto' },
        { icon: 'Heart', color: '#ef4444', title: 'Recuperação Cardiovascular', description: 'Ambiente fresco suporta pressão arterial normal durante sono' },
        { icon: 'Brain', color: '#6366f1', title: 'Melatonina Natural', description: 'Temperatura baixa ativa produção endógena de melatonina' }
      ],
      en: [
        { icon: 'Zap', color: '#f59e0b', title: 'Biological Trigger', description: 'Temperature drop is sleep signal, not just comfort' },
        { icon: 'Heart', color: '#ef4444', title: 'Cardiovascular Recovery', description: 'Cool environment supports normal blood pressure during sleep' },
        { icon: 'Brain', color: '#6366f1', title: 'Natural Melatonin', description: 'Low temperature activates endogenous melatonin production' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Lightbulb', title: 'Configure Termostato', description: '16-17°C é ideal para maioria' },
        { icon: 'Moon', title: 'Banho Estratégico', description: '2 horas antes de dormir' },
        { icon: 'Zap', title: 'Exposição Pés', description: 'Deixe pés descobertos para dissipar' },
        { icon: 'Heart', title: 'Tecido Respirável', description: 'Algodão vs sintético importa' }
      ],
      en: [
        { icon: 'Lightbulb', title: 'Set Thermostat', description: '16-17°C ideal for most' },
        { icon: 'Moon', title: 'Strategic Bath', description: '2 hours before bed' },
        { icon: 'Zap', title: 'Expose Feet', description: 'Leave feet uncovered to dissipate' },
        { icon: 'Heart', title: 'Breathable Fabric', description: 'Cotton vs synthetic matters' }
      ]
    },
    expertTips: {
      pt: [
        {
          expert: 'Dr. Michael Breus',
          tip: 'A temperatura é frequentemente negligenciada, mas é TÃO importante quanto luz e escuridão para o sono. Seu corpo precisa esfriar para dormir bem.'
        },
      ],
      en: [
        {
          expert: 'Dr. Michael Breus',
          tip: 'Temperature is often overlooked, but it\'s AS important as light and darkness for sleep. Your body needs to cool down to sleep well.'
        },
      ],
    }
  },
  {
    lessonId: '15',
    keyPoints: {
      pt: [
        'Exercício melhora sono profundo (N3) e qualidade REM',
        'Tempo ideal: quando temperatura corporal está subindo (manhã/início tarde)',
        'Exercício noturno (3-4h antes de dormir) pode interferir',
        '150 min moderado/semana melhora duração e qualidade do sono',
        'Hiperventilação durante exercício aumenta alertness por 2-4h'
      ],
      en: [
        'Exercise improves deep sleep (N3) and REM quality',
        'Ideal timing: when core body temperature is rising (morning/early afternoon)',
        'Evening exercise (3-4h before bed) can interfere',
        '150 min moderate/week improves sleep duration and quality',
        'Hyperventilation during exercise increases alertness for 2-4h'
      ],
    },
    stats: {
      pt: [
        { number: '150', label: 'minutos/semana', description: 'mínimo recomendado' },
        { number: '30', label: 'minutos', description: 'aumenta N3 significativamente' },
        { number: '3-4', label: 'horas', description: 'antes de dormir evitar' }
      ],
      en: [
        { number: '150', label: 'min/week', description: 'recommended minimum' },
        { number: '30', label: 'minutes', description: 'significantly increases N3' },
        { number: '3-4', label: 'hours', description: 'before bed to avoid' }
      ]
    },
    concepts: {
      pt: [
        { icon: '🏃', title: 'Adenosina', description: 'Acumula durante exercício = mais pressão de sono', color: '#fecdd3', textColor: '#7c2d12' },
        { icon: '☀️', title: 'Timing Matinal', description: 'Sincroniza ritmo circadiano', color: '#fef08a', textColor: '#854d0e' },
        { icon: '💪', title: 'Força Noturna', description: 'Crescimento muscular durante sono profundo', color: '#dcfce7', textColor: '#166534' },
        { icon: '🧠', title: 'Plasticidade', description: 'REM consolida aprendizagem motora', color: '#e0f2fe', textColor: '#0369a1' }
      ],
      en: [
        { icon: '🏃', title: 'Adenosine', description: 'Accumulates during exercise = more sleep pressure', color: '#fecdd3', textColor: '#7c2d12' },
        { icon: '☀️', title: 'Morning Timing', description: 'Synchronizes circadian rhythm', color: '#fef08a', textColor: '#854d0e' },
        { icon: '💪', title: 'Evening Strength', description: 'Muscle growth during deep sleep', color: '#dcfce7', textColor: '#166534' },
        { icon: '🧠', title: 'Plasticity', description: 'REM consolidates motor learning', color: '#e0f2fe', textColor: '#0369a1' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Heart', color: '#ef4444', title: 'Efeito Cardíaco', description: 'Exercício durante sono recupera frequência cardíaca' },
        { icon: 'Zap', color: '#f59e0b', title: 'Homeostase de Sono', description: 'Seu corpo aumenta duração de sono com maior atividade' },
        { icon: 'Brain', color: '#6366f1', title: 'Sincronização', description: 'Exercício matinal alinha todos ritmos circadianos' }
      ],
      en: [
        { icon: 'Heart', color: '#ef4444', title: 'Cardiac Effect', description: 'Exercise during sleep recovers heart rate' },
        { icon: 'Zap', color: '#f59e0b', title: 'Sleep Homeostasis', description: 'Your body increases sleep duration with more activity' },
        { icon: 'Brain', color: '#6366f1', title: 'Synchronization', description: 'Morning exercise aligns all circadian rhythms' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Clock', title: 'Timing Ideal', description: 'Manhã ou início da tarde' },
        { icon: 'Zap', title: 'Evite à Noite', description: 'Não dentro de 3-4h de dormir' },
        { icon: 'Moon', title: '150 Minutos', description: 'Meta semanal de atividade' },
        { icon: 'Heart', title: 'Tipo Variado', description: 'Aeróbio + força é ideal' }
      ],
      en: [
        { icon: 'Clock', title: 'Ideal Timing', description: 'Morning or early afternoon' },
        { icon: 'Zap', title: 'Avoid Evening', description: 'Not within 3-4h of bed' },
        { icon: 'Moon', title: '150 Minutes', description: 'Weekly activity goal' },
        { icon: 'Heart', title: 'Varied Type', description: 'Aerobic + strength ideal' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '13',
    keyPoints: {
      pt: [
        'Stress e ansiedade elevam cortisol noturno (prejudica sono)',
        'Meditação/respiração diafragmática reduz ativação simpática',
        'Técnica 4-7-8: inhala 4, segura 7, exhala 8 (ativa parassimpático)',
        'Journaling antes de dormir reduz pensamentos ruminativos',
        'Visualização relaxante cria estado de calma neural'
      ],
      en: [
        'Stress and anxiety elevate nighttime cortisol (harms sleep)',
        'Meditation/diaphragmatic breathing reduces sympathetic activation',
        '4-7-8 technique: inhale 4, hold 7, exhale 8 (activates parasympathetic)',
        'Pre-sleep journaling reduces ruminative thoughts',
        'Relaxation visualization creates neural calm state'
      ],
    },
    stats: {
      pt: [
        { number: '10', label: 'minutos', description: 'journaling antes de dormir' },
        { number: '40%', label: 'redução insônia', description: 'com journaling' },
        { number: '4-7-8', label: 'padrão respiratório', description: 'ativa parassimpático' }
      ],
      en: [
        { number: '10', label: 'minutes', description: 'pre-sleep journaling' },
        { number: '40%', label: 'insomnia reduction', description: 'with journaling' },
        { number: '4-7-8', label: 'breathing pattern', description: 'activates parasympathetic' }
      ]
    },
    concepts: {
      pt: [
        { icon: '🧘', title: 'Meditação', description: 'Ativa sistema parassimpático', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '💨', title: 'Respiração', description: 'Vagal tone eleva com exalação longa', color: '#dcfce7', textColor: '#166534' },
        { icon: '📝', title: 'Journaling', description: 'Externaliza pensamentos ruminativos', color: '#fef3c7', textColor: '#92400e' },
        { icon: '🧠', title: 'Visualização', description: 'Cria estado neural de calma', color: '#fee2e2', textColor: '#7f1d1d' }
      ],
      en: [
        { icon: '🧘', title: 'Meditation', description: 'Activates parasympathetic system', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '💨', title: 'Breathing', description: 'Vagal tone increases with long exhale', color: '#dcfce7', textColor: '#166534' },
        { icon: '📝', title: 'Journaling', description: 'Externalizes ruminative thoughts', color: '#fef3c7', textColor: '#92400e' },
        { icon: '🧠', title: 'Visualization', description: 'Creates neural calm state', color: '#fee2e2', textColor: '#7f1d1d' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Brain', color: '#6366f1', title: 'Plasticidade Neural', description: 'Práticas regulares remapear sistema nervoso' },
        { icon: 'Heart', color: '#ef4444', title: 'Variabilidade Cardíaca', description: 'Respiração longa aumenta VFC (saúde vagal)' },
        { icon: 'Zap', color: '#f59e0b', title: 'Ciclo Quebrado', description: 'Ansiedade → insônia → mais ansiedade (quebrar é crítico)' }
      ],
      en: [
        { icon: 'Brain', color: '#6366f1', title: 'Neural Plasticity', description: 'Regular practice remaps nervous system' },
        { icon: 'Heart', color: '#ef4444', title: 'Heart Variability', description: 'Long breathing increases HRV (vagal health)' },
        { icon: 'Zap', color: '#f59e0b', title: 'Broken Cycle', description: 'Anxiety → insomnia → more anxiety (breaking is critical)' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Clock', title: 'Respiração 4-7-8', description: '5 minutos antes de dormir' },
        { icon: 'Moon', title: 'Journaling', description: '10 min de escrita livre' },
        { icon: 'Heart', title: 'Meditação Guiada', description: 'Apps: Insight Timer, Calm' },
        { icon: 'Lightbulb', title: 'Consistência', description: 'Diária, não apenas à noite' }
      ],
      en: [
        { icon: 'Clock', title: '4-7-8 Breathing', description: '5 minutes before bed' },
        { icon: 'Moon', title: 'Journaling', description: '10 min free writing' },
        { icon: 'Heart', title: 'Guided Meditation', description: 'Apps: Insight Timer, Calm' },
        { icon: 'Lightbulb', title: 'Consistency', description: 'Daily, not just at night' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '16',
    keyPoints: {
      pt: [
        'Power nap de 10-20 min (sem REM) restaura alertness',
        'Nap de 30 min entra em sono leve (N2) com inércia de sono',
        'Nap de 60-90 min inclui sono profundo e REM (recuperação completa)',
        'Tempo ideal: 13-15h (pico circadiano de fadiga)',
        'Cafeína 20 min antes de nap intensifica alertness pós-nap'
      ],
      en: [
        '10-20 min power nap (no REM) restores alertness',
        '30 min nap enters light sleep (N2) with sleep inertia',
        '60-90 min nap includes deep sleep and REM (complete recovery)',
        'Ideal timing: 1-3pm (circadian fatigue peak)',
        'Caffeine 20 min before nap intensifies post-nap alertness'
      ],
    },
    stats: {
      pt: [
        { number: '20', label: 'minutos', description: 'poder nap ideal' },
        { number: '13-15h', label: 'horário ideal', description: 'pico de fadiga' },
        { number: '34%', label: 'aumento performance', description: 'com nap estratégico' }
      ],
      en: [
        { number: '20', label: 'minutes', description: 'ideal power nap' },
        { number: '1-3pm', label: 'ideal time', description: 'fatigue peak' },
        { number: '34%', label: 'performance increase', description: 'with strategic nap' }
      ]
    },
    concepts: {
      pt: [
        { icon: '⚡', title: 'Nap 20min', description: 'N1→N2 sem inércia', color: '#fef08a', textColor: '#854d0e' },
        { icon: '😴', title: 'Nap 30min', description: 'Entra N2 com confusão', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🛏️', title: 'Nap 90min', description: 'Ciclo completo + REM', color: '#dcfce7', textColor: '#166534' },
        { icon: '☕', title: 'Cafeína Tática', description: '20min antes = mega alerta', color: '#fecdd3', textColor: '#7c2d12' }
      ],
      en: [
        { icon: '⚡', title: 'Nap 20min', description: 'N1→N2 no inertia', color: '#fef08a', textColor: '#854d0e' },
        { icon: '😴', title: 'Nap 30min', description: 'Enters N2 with confusion', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🛏️', title: 'Nap 90min', description: 'Complete cycle + REM', color: '#dcfce7', textColor: '#166534' },
        { icon: '☕', title: 'Tactical Caffeine', description: '20min before = mega alert', color: '#fecdd3', textColor: '#7c2d12' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Zap', color: '#f59e0b', title: 'Inércia de Sono', description: 'N2→N3 causa confusão ao acordar' },
        { icon: 'Brain', color: '#6366f1', title: 'Recuperação Rápida', description: '20 min = 2 horas de benefício noturno' },
        { icon: 'Heart', color: '#ef4444', title: 'Timing Circadiano', description: 'Seu corpo quer nap 8-10h após acordar' }
      ],
      en: [
        { icon: 'Zap', color: '#f59e0b', title: 'Sleep Inertia', description: 'N2→N3 causes confusion when waking' },
        { icon: 'Brain', color: '#6366f1', title: 'Quick Recovery', description: '20 min = 2 hours of nighttime benefit' },
        { icon: 'Heart', color: '#ef4444', title: 'Circadian Timing', description: 'Your body wants nap 8-10h after waking' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Clock', title: '20min Exato', description: 'Nem 15, nem 25 - precisão importa' },
        { icon: 'Moon', title: 'Horário Ideal', description: '13h-15h máximo' },
        { icon: 'Zap', title: 'Sem Adormecer Longo', description: 'Se dura >30min, acorda confuso' },
        { icon: 'Heart', title: 'Cafeína Opcional', description: 'Para mega alertness pós-nap' }
      ],
      en: [
        { icon: 'Clock', title: '20min Exact', description: 'Not 15, not 25 - precision matters' },
        { icon: 'Moon', title: 'Ideal Time', description: '1-3pm maximum' },
        { icon: 'Zap', title: 'No Long Sleeping', description: 'If >30min, wake confused' },
        { icon: 'Heart', title: 'Optional Caffeine', description: 'For mega post-nap alertness' }
      ]
    },
    expertTips: {
      pt: [
        {
          expert: 'Matthew Walker',
          tip: 'O nap é subestimado no mundo corporativo. Um nap de 20 min restaura performance melhor que café.'
        },
      ],
      en: [
        {
          expert: 'Matthew Walker',
          tip: 'Napping is underestimated in the corporate world. A 20-min nap restores performance better than coffee.'
        },
      ],
    }
  },
  {
    lessonId: '11',
    keyPoints: {
      pt: [
        'Acordar meio do ciclo deixa você desorientado e cansado',
        'Ciclos dormem ~90 min: calcule tempo de despertar reverso',
        'Se dorme 22h, calcule: 90min = 23:30, 180min = 0:00, 270min = 1:30',
        'Alarme antes de fim do ciclo piora inércia de sono',
        'Soneca gradual (snooze) prejudica sincronismo circadiano'
      ],
      en: [
        'Waking mid-cycle leaves you disoriented and tired',
        'Sleep cycles ~90 min: calculate wake time in reverse',
        'If sleep at 10pm: 90min = 11:30pm, 180min = 12:00am, 270min = 1:30am',
        'Alarm before cycle end worsens sleep inertia',
        'Gradual snoozing harms circadian synchronization'
      ],
    },
    stats: {
      pt: [
        { number: '90', label: 'minutos', description: 'duração típica do ciclo' },
        { number: '4-6', label: 'ciclos', description: 'por noite (7-9h)' },
        { number: '100%', label: 'desincronizado', description: 'com snooze regular' }
      ],
      en: [
        { number: '90', label: 'minutes', description: 'typical cycle duration' },
        { number: '4-6', label: 'cycles', description: 'per night (7-9h)' },
        { number: '100%', label: 'desynchronized', description: 'with regular snooze' }
      ]
    },
    concepts: {
      pt: [
        { icon: '⏰', title: 'Ciclo 90min', description: 'N1→N2→N3→REM repetido', color: '#fef08a', textColor: '#854d0e' },
        { icon: '🌙', title: 'Fim Ideal', description: 'Acorde durante REM = alerta', color: '#1e1b4b', textColor: '#a78bfa' },
        { icon: '😴', title: 'Meio Ciclo', description: 'Acorde durante N3 = confuso', color: '#dcfce7', textColor: '#166534' },
        { icon: '⚠️', title: 'Snooze Prejudicial', description: 'Reinicia ciclo + fragmentação', color: '#fee2e2', textColor: '#7f1d1d' }
      ],
      en: [
        { icon: '⏰', title: '90min Cycle', description: 'N1→N2→N3→REM repeated', color: '#fef08a', textColor: '#854d0e' },
        { icon: '🌙', title: 'Ideal End', description: 'Wake during REM = alert', color: '#1e1b4b', textColor: '#a78bfa' },
        { icon: '😴', title: 'Mid-Cycle', description: 'Wake during N3 = confused', color: '#dcfce7', textColor: '#166534' },
        { icon: '⚠️', title: 'Snooze Harmful', description: 'Restarts cycle + fragmentation', color: '#fee2e2', textColor: '#7f1d1d' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Brain', color: '#6366f1', title: 'Inércia de Sono', description: 'Desorientation máxima ao acordar durante N3' },
        { icon: 'Zap', color: '#f59e0b', title: 'Cálculo Reverso', description: 'Subtraia múltiplos de 90 min de hora de acordar' },
        { icon: 'Heart', color: '#ef4444', title: 'Vício em Snooze', description: 'Cada snooze piora sincronização circadiana' }
      ],
      en: [
        { icon: 'Brain', color: '#6366f1', title: 'Sleep Inertia', description: 'Maximum disorientation when waking during N3' },
        { icon: 'Zap', color: '#f59e0b', title: 'Reverse Calculation', description: 'Subtract 90-min multiples from wake time' },
        { icon: 'Heart', color: '#ef4444', title: 'Snooze Addiction', description: 'Each snooze worsens circadian synchronization' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Clock', title: 'Calcule para Trás', description: '7-9h = 4-6 ciclos' },
        { icon: 'Moon', title: 'Múltiplos de 90min', description: 'Use calculadora se necessário' },
        { icon: 'Zap', title: 'Sem Snooze', description: 'Elimine completamente' },
        { icon: 'Heart', title: 'Alarme Fora da Cama', description: 'Força você acordar de verdade' }
      ],
      en: [
        { icon: 'Clock', title: 'Calculate Backward', description: '7-9h = 4-6 cycles' },
        { icon: 'Moon', title: '90min Multiples', description: 'Use calculator if needed' },
        { icon: 'Zap', title: 'No Snooze', description: 'Eliminate completely' },
        { icon: 'Heart', title: 'Alarm Across Room', description: 'Forces you truly awake' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '14',
    keyPoints: {
      pt: [
        'Telas emitem luz azul que suprime melatonina',
        'Modo noturno das telas é INEFETIVO (luz azul ainda presente)',
        'Óculos de bloqueio de luz azul ajudam, mas redução de tela é melhor',
        'Idealmente: zero telas 1h antes de dormir',
        'Redes sociais ativam dopamina (mantém você acordado)'
      ],
      en: [
        'Screens emit blue light that suppresses melatonin',
        'Night mode on screens is INEFFECTIVE (blue light still present)',
        'Blue light blocking glasses help, but screen reduction is better',
        'Ideally: zero screens 1h before bed',
        'Social media activates dopamine (keeps you awake)'
      ],
    },
    stats: {
      pt: [
        { number: '25-30x', label: 'mais luz azul', description: 'telas vs noite natural' },
        { number: '2', label: 'horas', description: 'suprime 50% melatonina' },
        { number: '90', label: 'minutos', description: 'zero telas antes de dormir' }
      ],
      en: [
        { number: '25-30x', label: 'more blue light', description: 'screens vs natural night' },
        { number: '2', label: 'hours', description: 'suppresses 50% melatonin' },
        { number: '90', label: 'minutes', description: 'zero screens before bed' }
      ]
    },
    concepts: {
      pt: [
        { icon: '📱', title: 'Luz Azul Intensa', description: '460-480nm wavelength', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🌙', title: 'Supressão Melatonina', description: 'Até 50% com apenas 2h', color: '#1e1b4b', textColor: '#a78bfa' },
        { icon: '👓', title: 'Óculos Bloqueadores', description: 'Qualidade importa muito', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '💡', title: 'Night Mode Fraco', description: 'Reduz alguns, não elimina azul', color: '#fef3c7', textColor: '#92400e' }
      ],
      en: [
        { icon: '📱', title: 'Intense Blue Light', description: '460-480nm wavelength', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🌙', title: 'Melatonin Suppression', description: 'Up to 50% with just 2h', color: '#1e1b4b', textColor: '#a78bfa' },
        { icon: '👓', title: 'Blocking Glasses', description: 'Quality matters heavily', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '💡', title: 'Night Mode Weak', description: 'Reduces some, doesn\'t eliminate blue', color: '#fef3c7', textColor: '#92400e' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Brain', color: '#6366f1', title: 'Fototransdução', description: 'Olhos detectam azul mesmo fechados' },
        { icon: 'Zap', color: '#f59e0b', title: 'Dopamina Social', description: 'Redes sociais ativam dopamina > melatonina' },
        { icon: 'Heart', color: '#ef4444', title: 'Ilusão de Sono', description: 'Você dorme, mas melatonina reduzida = baixa qualidade' }
      ],
      en: [
        { icon: 'Brain', color: '#6366f1', title: 'Phototransduction', description: 'Eyes detect blue even closed' },
        { icon: 'Zap', color: '#f59e0b', title: 'Social Dopamine', description: 'Social media activates dopamine > melatonin' },
        { icon: 'Heart', color: '#ef4444', title: 'Sleep Illusion', description: 'You sleep, but reduced melatonin = poor quality' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Clock', title: 'Corte 1h antes', description: 'Zero telas nesse tempo' },
        { icon: 'Moon', title: 'Óculos de Qualidade', description: 'Não baratos - investir vale' },
        { icon: 'Heart', title: 'f.lux', description: 'Software gratuito para PC/Mac' },
        { icon: 'Lightbulb', title: 'Brilho 30%', description: 'Reduz emissão dramaticamente' }
      ],
      en: [
        { icon: 'Clock', title: 'Cutoff 1h Before', description: 'Zero screens in that time' },
        { icon: 'Moon', title: 'Quality Glasses', description: 'Not cheap - investment worth it' },
        { icon: 'Heart', title: 'f.lux', description: 'Free software for PC/Mac' },
        { icon: 'Lightbulb', title: 'Brightness 30%', description: 'Dramatically reduces emission' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '17',
    keyPoints: {
      pt: [
        'Sono insuficiente aumenta risco cardiovascular em 48%',
        'Pressão arterial cai durante sono profundo (recuperação cardiovascular)',
        'Inflamação sistêmica aumenta com privação de sono',
        '<6h aumenta risco de arritmia cardíaca',
        'Sistema imunológico depende criticamente de sono'
      ],
      en: [
        'Insufficient sleep increases cardiovascular risk by 48%',
        'Blood pressure drops during deep sleep (cardiovascular recovery)',
        'Systemic inflammation increases with sleep deprivation',
        '<6h increases risk of cardiac arrhythmia',
        'Immune system depends critically on sleep'
      ],
    },
    stats: {
      pt: [
        { number: '48%', label: 'aumento risco', description: 'com <6h sono' },
        { number: '30-40%', label: 'redução imunidade', description: 'com sono insuficiente' },
        { number: '7-9', label: 'horas', description: 'mínimo cardioprotetor' }
      ],
      en: [
        { number: '48%', label: 'risk increase', description: 'with <6h sleep' },
        { number: '30-40%', label: 'immunity reduction', description: 'with insufficient sleep' },
        { number: '7-9', label: 'hours', description: 'cardioprotective minimum' }
      ]
    },
    concepts: {
      pt: [
        { icon: '❤️', title: 'Recuperação Cardiac', description: 'PA cai durante sono profundo', color: '#fecdd3', textColor: '#7c2d12' },
        { icon: '🛡️', title: 'Imunidade', description: 'Defesa depende de sono', color: '#dcfce7', textColor: '#166534' },
        { icon: '🔥', title: 'Inflamação', description: 'Reduzida durante sono profundo', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '⚡', title: 'Ritmo Cardíaco', description: 'VFC melhora com sono', color: '#e0f2fe', textColor: '#0369a1' }
      ],
      en: [
        { icon: '❤️', title: 'Cardiac Recovery', description: 'BP drops during deep sleep', color: '#fecdd3', textColor: '#7c2d12' },
        { icon: '🛡️', title: 'Immunity', description: 'Defense depends on sleep', color: '#dcfce7', textColor: '#166534' },
        { icon: '🔥', title: 'Inflammation', description: 'Reduced during deep sleep', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '⚡', title: 'Heart Rhythm', description: 'HRV improves with sleep', color: '#e0f2fe', textColor: '#0369a1' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Heart', color: '#ef4444', title: 'Proteção Cardiovascular', description: 'Sono é melhor que qualquer medicação' },
        { icon: 'Brain', color: '#6366f1', title: 'Inflamação Sistêmica', description: 'Privação = resposta inflamatória crônica lenta' },
        { icon: 'Zap', color: '#f59e0b', title: 'Imunidade Comprometida', description: 'Dormir mal = infecções frequentes' }
      ],
      en: [
        { icon: 'Heart', color: '#ef4444', title: 'Cardiovascular Protection', description: 'Sleep is better than any medication' },
        { icon: 'Brain', color: '#6366f1', title: 'Systemic Inflammation', description: 'Deprivation = slow chronic inflammatory response' },
        { icon: 'Zap', color: '#f59e0b', title: 'Compromised Immunity', description: 'Poor sleep = frequent infections' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Heart', title: '7-9h não é opcional', description: 'É saúde cardíaca básica' },
        { icon: 'Moon', title: 'Menos é pior', description: 'Risco aumenta dramático <6h' },
        { icon: 'Zap', title: 'Inflamação Invisível', description: 'Sem sintomas, mas real' },
        { icon: 'Lightbulb', title: 'Pressão Arterial', description: 'Melhora com sono consistente' }
      ],
      en: [
        { icon: 'Heart', title: '7-9h Non-Negotiable', description: 'Is basic heart health' },
        { icon: 'Moon', title: 'Less is Worse', description: 'Risk increases dramatically <6h' },
        { icon: 'Zap', title: 'Invisible Inflammation', description: 'No symptoms, but real' },
        { icon: 'Lightbulb', title: 'Blood Pressure', description: 'Improves with consistent sleep' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '12',
    keyPoints: {
      pt: [
        'Sistema glinfático ativo durante sono profundo (limpeza cerebral)',
        'Remove proteínas tóxicas associadas a Alzheimer e Parkinson',
        'Memória é consolidada durante REM e N2',
        'Aprendizagem sem sono = retenção 40% pior',
        'Privação de sono accelera declínio cognitivo com idade'
      ],
      en: [
        'Glymphatic system active during deep sleep (brain cleansing)',
        'Removes toxic proteins associated with Alzheimer\'s and Parkinson\'s',
        'Memory is consolidated during REM and N2',
        'Learning without sleep = 40% worse retention',
        'Sleep deprivation accelerates cognitive decline with age'
      ],
    },
    stats: {
      pt: [
        { number: '60%', label: 'aumento intersticial', description: 'durante sono profundo' },
        { number: '40%', label: 'redução retenção', description: 'aprendizado sem sono' },
        { number: '2x', label: 'aceleração declínio', description: 'Alzheimer sem sono' }
      ],
      en: [
        { number: '60%', label: 'interstitial increase', description: 'during deep sleep' },
        { number: '40%', label: 'retention reduction', description: 'learning without sleep' },
        { number: '2x', label: 'decline acceleration', description: 'Alzheimer without sleep' }
      ]
    },
    concepts: {
      pt: [
        { icon: '🧠', title: 'Sistema Glinfático', description: 'Limpeza de resíduos cerebrais', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '💾', title: 'Consolidação', description: 'Aprendizado fixado durante sono', color: '#fef08a', textColor: '#854d0e' },
        { icon: '🧹', title: 'Beta-Amiloide', description: 'Proteína tóxica removida durante sono', color: '#dcfce7', textColor: '#166534' },
        { icon: '🔒', title: 'Neuroproteiçã', description: 'Sono é neuroprotética ativa', color: '#fee2e2', textColor: '#7f1d1d' }
      ],
      en: [
        { icon: '🧠', title: 'Glymphatic System', description: 'Brain waste clearance', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '💾', title: 'Consolidation', description: 'Learning fixed during sleep', color: '#fef08a', textColor: '#854d0e' },
        { icon: '🧹', title: 'Beta-Amyloid', description: 'Toxic protein removed during sleep', color: '#dcfce7', textColor: '#166534' },
        { icon: '🔒', title: 'Neuroprotection', description: 'Sleep is active neuroprotection', color: '#fee2e2', textColor: '#7f1d1d' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Brain', color: '#6366f1', title: 'Limpeza Noturna', description: 'Cérebro fica 60% mais espaçado durante sono' },
        { icon: 'Zap', color: '#f59e0b', title: 'Toxinas Acumulam', description: 'Sem sono = Alzheimer acelera' },
        { icon: 'Heart', color: '#ef4444', title: 'Proteção Preventiva', description: 'Sono bom = prevenção Alzheimer mais eficaz' }
      ],
      en: [
        { icon: 'Brain', color: '#6366f1', title: 'Nightly Cleaning', description: 'Brain becomes 60% more spaced during sleep' },
        { icon: 'Zap', color: '#f59e0b', title: 'Toxins Accumulate', description: 'Without sleep = Alzheimer accelerates' },
        { icon: 'Heart', color: '#ef4444', title: 'Preventive Protection', description: 'Good sleep = most effective Alzheimer prevention' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Brain', title: '7-9h Preventivo', description: 'Proteção contra Alzheimer' },
        { icon: 'Moon', title: 'Estudar + Dormir', description: 'Melhor que estudar sem dormir' },
        { icon: 'Heart', title: 'Idosos Crítico', description: 'Sono ainda mais importante com idade' },
        { icon: 'Lightbulb', title: 'Sistema Vascular', description: 'Sono mantém cérebro limpo' }
      ],
      en: [
        { icon: 'Brain', title: '7-9h Preventive', description: 'Protection against Alzheimer' },
        { icon: 'Moon', title: 'Study + Sleep', description: 'Better than study without sleep' },
        { icon: 'Heart', title: 'Elderly Critical', description: 'Sleep even more important with age' },
        { icon: 'Lightbulb', title: 'Vascular System', description: 'Sleep keeps brain clean' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '19',
    keyPoints: {
      pt: [
        'Turno trabalho desincroniza todos os ritmos circadianos',
        'Luz solar é o principal sincronizador (mais importante que hormônios)',
        'Luz artificial à noite reduz efetividade de sincronização',
        'Melatonina estratégica em novo horário ajuda realinhamento',
        'Proteína também ajuda sincronização (refeições em novo horário)'
      ],
      en: [
        'Shift work desynchronizes all circadian rhythms',
        'Sunlight is the primary synchronizer (more important than hormones)',
        'Artificial light at night reduces synchronization effectiveness',
        'Strategic melatonin at new time helps realignment',
        'Protein also helps synchronization (meals on new schedule)'
      ],
    },
    stats: {
      pt: [
        { number: '2-3', label: 'semanas', description: 'para adaptação novo turno' },
        { number: '30-40%', label: 'ineficiência', description: 'turno noturno vs diurno' },
        { number: '100x', label: 'mais potente', description: 'luz solar vs artificial' }
      ],
      en: [
        { number: '2-3', label: 'weeks', description: 'to adapt new shift' },
        { number: '30-40%', label: 'inefficiency', description: 'night shift vs day' },
        { number: '100x', label: 'more potent', description: 'sunlight vs artificial' }
      ]
    },
    concepts: {
      pt: [
        { icon: '☀️', title: 'Luz Solar Crítica', description: 'Principal sincronizador (100x artificial)', color: '#fef08a', textColor: '#854d0e' },
        { icon: '⏰', title: 'Novo Horário', description: 'Luz no novo "dia" desejado', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🌙', title: 'Melatonina Tática', description: 'No novo horário de sono', color: '#1e1b4b', textColor: '#a78bfa' },
        { icon: '🍽️', title: 'Proteína Timing', description: 'Refeições em novo horário', color: '#dcfce7', textColor: '#166534' }
      ],
      en: [
        { icon: '☀️', title: 'Solar Light Critical', description: 'Primary synchronizer (100x artificial)', color: '#fef08a', textColor: '#854d0e' },
        { icon: '⏰', title: 'New Schedule', description: 'Light in new desired "day"', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🌙', title: 'Tactical Melatonin', description: 'At new sleep time', color: '#1e1b4b', textColor: '#a78bfa' },
        { icon: '🍽️', title: 'Protein Timing', description: 'Meals on new schedule', color: '#dcfce7', textColor: '#166534' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Zap', color: '#f59e0b', title: 'Corpo Nunca Adapta', description: 'Turno noturno é luta constante' },
        { icon: 'Heart', color: '#ef4444', title: 'Saúde Comprometida', description: 'Turno noturno crônico reduz expectativa de vida' },
        { icon: 'Brain', color: '#6366f1', title: 'Minimize Danos', description: 'Se trabalha à noite, maximize luz solar disponível' }
      ],
      en: [
        { icon: 'Zap', color: '#f59e0b', title: 'Body Never Fully Adapts', description: 'Night shift is constant fight' },
        { icon: 'Heart', color: '#ef4444', title: 'Health Compromised', description: 'Chronic night shift reduces life expectancy' },
        { icon: 'Brain', color: '#6366f1', title: 'Minimize Damage', description: 'If working nights, maximize available sunlight' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Sun', title: 'Luz Solar Máxima', description: 'Seu melhor aliado' },
        { icon: 'Moon', title: 'Novo Horário Luz', description: 'Exponha-se no novo "dia"' },
        { icon: 'Heart', title: 'Escuridão Absoluta', description: 'Durante novo "sono"' },
        { icon: 'Lightbulb', title: 'Refeições Novas', description: 'Ajudam sincronização' }
      ],
      en: [
        { icon: 'Sun', title: 'Maximum Sunlight', description: 'Your best ally' },
        { icon: 'Moon', title: 'New Light Schedule', description: 'Expose yourself during new "day"' },
        { icon: 'Heart', title: 'Complete Darkness', description: 'During new "sleep"' },
        { icon: 'Lightbulb', title: 'New Meal Times', description: 'Help synchronization' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
  {
    lessonId: '18',
    keyPoints: {
      pt: [
        'Voo leste = dia curto: durma MAIS antes, melatonina no novo horário',
        'Voo oeste = dia longo: durma MENOS, luz matinal do novo local',
        '1 dia de recuperação por 1 hora de fuso horário (regra clássica)',
        'Luz solar é o resetador mais potente (mais que melatonina)',
        'Álcool amplifica jet lag em 1-2 dias (evite 48h)'
      ],
      en: [
        'Eastward flight = short day: sleep MORE before, melatonin at new time',
        'Westward flight = long day: sleep LESS, morning light of new place',
        '1 day recovery per 1 hour timezone (classic rule)',
        'Sunlight is most potent resetter (more than melatonin)',
        'Alcohol amplifies jet lag by 1-2 days (avoid 48h)'
      ],
    },
    stats: {
      pt: [
        { number: '1', label: 'dia recuperação', description: 'por 1h fuso' },
        { number: '6', label: 'dias', description: 'voo leste típico (6 horas)' },
        { number: '3-4', label: 'dias', description: 'voo oeste típico' }
      ],
      en: [
        { number: '1', label: 'day recovery', description: 'per 1h timezone' },
        { number: '6', label: 'days', description: 'typical eastward (6 hours)' },
        { number: '3-4', label: 'days', description: 'typical westward' }
      ]
    },
    concepts: {
      pt: [
        { icon: '✈️', title: 'Voo Leste', description: 'Dia curto = dormir MAIS antes', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '✈️', title: 'Voo Oeste', description: 'Dia longo = dormir MENOS antes', color: '#fef3c7', textColor: '#92400e' },
        { icon: '☀️', title: 'Luz Resetadora', description: 'Mais potente que melatonina', color: '#fef08a', textColor: '#854d0e' },
        { icon: '🚫', title: 'Evitar Álcool', description: 'Piora jet lag 1-2 dias', color: '#e0f2fe', textColor: '#0369a1' }
      ],
      en: [
        { icon: '✈️', title: 'Eastward Flight', description: 'Short day = sleep MORE before', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '✈️', title: 'Westward Flight', description: 'Long day = sleep LESS before', color: '#fef3c7', textColor: '#92400e' },
        { icon: '☀️', title: 'Light Reset', description: 'More potent than melatonin', color: '#fef08a', textColor: '#854d0e' },
        { icon: '🚫', title: 'Avoid Alcohol', description: 'Worsens jet lag 1-2 days', color: '#e0f2fe', textColor: '#0369a1' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Zap', color: '#f59e0b', title: 'Asimetria Voo', description: 'Voo leste é PIOR que voo oeste' },
        { icon: 'Brain', color: '#6366f1', title: 'Melatonina Timing', description: 'Tomar no novo horário desejado, não antigo' },
        { icon: 'Heart', color: '#ef4444', title: 'Rápido Reset', description: 'Luz solar funciona mais rápido que melatonina' }
      ],
      en: [
        { icon: 'Zap', color: '#f59e0b', title: 'Flight Asymmetry', description: 'Eastward flight is WORSE than westward' },
        { icon: 'Brain', color: '#6366f1', title: 'Melatonin Timing', description: 'Take at new desired time, not old' },
        { icon: 'Heart', color: '#ef4444', title: 'Quick Reset', description: 'Sunlight works faster than melatonin' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Lightbulb', title: 'Antes do Voo Leste', description: 'Durma mais, melatonina novo horário' },
        { icon: 'Moon', title: 'Antes do Voo Oeste', description: 'Durma menos, busque luz matinal' },
        { icon: 'Heart', title: 'Luz Local ASAP', description: 'Melhor que melatonina' },
        { icon: 'Clock', title: 'Evite Álcool 48h', description: 'Prejudica adaptação' }
      ],
      en: [
        { icon: 'Lightbulb', title: 'Before Eastward', description: 'Sleep more, melatonin at new time' },
        { icon: 'Moon', title: 'Before Westward', description: 'Sleep less, seek morning light' },
        { icon: 'Heart', title: 'Local Light ASAP', description: 'Better than melatonin' },
        { icon: 'Clock', title: 'Avoid Alcohol 48h', description: 'Harms adaptation' }
      ]
    },
    expertTips: {
      pt: [
        {
          expert: 'Dr. Michael Breus',
          tip: 'Jet lag voo LESTE é pior que OESTE. Seu corpo prefere dias mais longos que curtos. Prepare-se diferente.'
        },
      ],
      en: [
        {
          expert: 'Dr. Michael Breus',
          tip: 'Eastward jet lag is worse than westward. Your body prefers longer to shorter days. Prepare differently.'
        },
      ],
    }
  },
  {
    lessonId: '21',
    keyPoints: {
      pt: [
        'Manutenção é mais difícil que mudança inicial (60% caem fora em 6-12m)',
        'Automatize tudo: zero decisão = zero desculpa',
        'Rastreie sono (app, wearable): o que é medido é mantido',
        'Identifique seus gatilhos de regressão (trabalho, viagem, amigos)',
        '1 noite ruim é OK. 1 semana ruim é problema - volta ao protocolo'
      ],
      en: [
        'Maintenance is harder than initial change (60% fall off in 6-12m)',
        'Automate everything: zero decision = zero excuses',
        'Track sleep (app, wearable): what is measured is maintained',
        'Identify YOUR regression triggers (work, travel, friends)',
        '1 bad night is OK. 1 bad week is problem - return to protocol'
      ],
    },
    stats: {
      pt: [
        { number: '60%', label: 'desistem em', description: '6-12 meses' },
        { number: '21', label: 'dias', description: 'para formar hábito' },
        { number: '1', label: 'semana', description: 'antes de problemas regredir' }
      ],
      en: [
        { number: '60%', label: 'quit within', description: '6-12 months' },
        { number: '21', label: 'days', description: 'to form habit' },
        { number: '1', label: 'week', description: 'before regression sets in' }
      ]
    },
    concepts: {
      pt: [
        { icon: '📊', title: 'Rastreamento', description: 'Medição = manutenção', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🔄', title: 'Automatização', description: 'Zero decisão = consistência', color: '#dcfce7', textColor: '#166534' },
        { icon: '⚠️', title: 'Gatilhos', description: 'Identifique seus fraquezas', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '🎯', title: 'Volta Rápida', description: '1 noite OK, 1 semana = problema', color: '#fef3c7', textColor: '#92400e' }
      ],
      en: [
        { icon: '📊', title: 'Tracking', description: 'Measurement = maintenance', color: '#e0f2fe', textColor: '#0369a1' },
        { icon: '🔄', title: 'Automation', description: 'Zero decision = consistency', color: '#dcfce7', textColor: '#166534' },
        { icon: '⚠️', title: 'Triggers', description: 'Identify your weaknesses', color: '#fee2e2', textColor: '#7f1d1d' },
        { icon: '🎯', title: 'Quick Recovery', description: '1 night OK, 1 week = problem', color: '#fef3c7', textColor: '#92400e' }
      ]
    },
    insights: {
      pt: [
        { icon: 'Brain', color: '#6366f1', title: 'Degradação Invisível', description: 'Você não vê, mas cérebro nota' },
        { icon: 'Zap', color: '#f59e0b', title: 'Queda Lenta', description: 'Uma noite ruim → semana ruim → mês ruim' },
        { icon: 'Heart', color: '#ef4444', title: 'Resiliência', description: 'Importante é voltar no dia seguinte' }
      ],
      en: [
        { icon: 'Brain', color: '#6366f1', title: 'Invisible Degradation', description: 'You don\'t see it, but brain does' },
        { icon: 'Zap', color: '#f59e0b', title: 'Slow Decline', description: 'One bad night → bad week → bad month' },
        { icon: 'Heart', color: '#ef4444', title: 'Resilience', description: 'Important is return next day' }
      ]
    },
    quickTips: {
      pt: [
        { icon: 'Lightbulb', title: 'Rastreie Sempre', description: 'App de sono ou wearable' },
        { icon: 'Moon', title: 'Automatize Hábitos', description: 'Sem decisão = sem desculpas' },
        { icon: 'Heart', title: '1 Semana é Limite', description: 'Após isso, volta ao protocolo' },
        { icon: 'Clock', title: 'Aceite Imperfeição', description: '1 noite ≠ fracasso' }
      ],
      en: [
        { icon: 'Lightbulb', title: 'Always Track', description: 'Sleep app or wearable' },
        { icon: 'Moon', title: 'Automate Habits', description: 'No decision = no excuses' },
        { icon: 'Heart', title: '1 Week Limit', description: 'After that, return to protocol' },
        { icon: 'Clock', title: 'Accept Imperfection', description: '1 night ≠ failure' }
      ]
    },
    expertTips: {
      pt: [

      ],
      en: [

      ],
    }
  },
];

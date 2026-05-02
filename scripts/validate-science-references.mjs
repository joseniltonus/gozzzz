import fs from 'fs';
import path from 'path';

const root = process.cwd();

const targetFiles = [
  'data/sleepLessonContent.ts',
  'components/Lesson1InteractiveCard.tsx',
  'components/Lesson1InteractiveCardWeb.tsx',
];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function validateSourceFields(file, content) {
  const errors = [];
  const sourceRegex = /source:\s*(["'])(.*?)\1/g;
  let match;
  while ((match = sourceRegex.exec(content)) !== null) {
    const value = match[2].trim();
    if (!value) {
      errors.push(`${file}: empty source field`);
      continue;
    }
    // Require minimum metadata quality, while avoiding false positives.
    const hasYear = /\b(19|20)\d{2}\b/.test(value);
    const hasJournalCue = /(journal|sleep|science|nature|cell|pubmed|cochrane|bmj|lancet|proceedings|current biology|clinical|chronobiology|psychoneuroendocrinology|brain|medicine|health|risk management|biology|physiology|fisiologia)/i.test(value);
    const hasBookCue = /(book|scribner|penguin|avery|rodale|ed\.)/i.test(value);
    const hasBasicStructure = /,/.test(value) || /\bvol\.|\bdoi\b/i.test(value);
    if (!hasYear || !hasBasicStructure || (!hasJournalCue && !hasBookCue)) {
      errors.push(`${file}: weak source metadata -> "${value}"`);
    }
  }
  return errors;
}

function validatePubMedLinks(file, content) {
  const errors = [];
  // Ensure science-rendering components expose PubMed action.
  if (file.includes('Lesson1InteractiveCard') || file.includes('SleepLessonCard')) {
    if (!content.includes('pubmed.ncbi.nlm.nih.gov')) {
      errors.push(`${file}: missing PubMed lookup link`);
    }
    if (!content.includes('Open reference on PubMed') && !content.includes('Abrir referência no PubMed')) {
      errors.push(`${file}: missing user-facing PubMed link label`);
    }
  }
  return errors;
}

let allErrors = [];
for (const file of targetFiles) {
  const content = read(file);
  allErrors = allErrors
    .concat(validateSourceFields(file, content))
    .concat(validatePubMedLinks(file, content));
}

if (allErrors.length > 0) {
  console.error('Science reference validation failed:\n');
  for (const err of allErrors) {
    console.error(`- ${err}`);
  }
  process.exit(1);
}

console.log('Science reference validation passed.');

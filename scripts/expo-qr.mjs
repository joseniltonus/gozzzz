import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import qrcode from 'qrcode-terminal';
import QRCode from 'qrcode';

const port = process.env.EXPO_PORT || '8088';
const defaultPlatform = process.env.EXPO_QR_PLATFORM || 'android';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function getExpoLink(platform) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: 'localhost',
        port,
        path: `/_expo/link?platform=${platform}`,
        method: 'GET',
        headers: {
          'expo-platform': platform,
        },
      },
      (res) => {
        const location = res.headers.location;

        if (location && (location.startsWith('exp://') || location.startsWith('exps://'))) {
          resolve(location);
          return;
        }

        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          reject(
            new Error(
              `Nao foi possivel obter o link Expo (${platform}, status ${res.statusCode ?? 'desconhecido'}): ${body}`
            )
          );
        });
      }
    );

    req.on('error', (error) => {
      reject(error);
    });
    req.end();
  });
}

async function writePng(filePath, link) {
  await QRCode.toFile(filePath, link, {
    type: 'png',
    width: 640,
    margin: 3,
    errorCorrectionLevel: 'M',
    color: { dark: '#000000', light: '#ffffff' },
  });
}

async function main() {
  try {
    const [androidLink, iosLink] = await Promise.all([
      getExpoLink('android'),
      getExpoLink('ios'),
    ]);

    const primary = defaultPlatform === 'ios' ? iosLink : androidLink;

    console.log(`Expo link (Android): ${androidLink}`);
    console.log(`Expo link (iOS):     ${iosLink}`);
    console.log('');

    const androidPath = path.join(projectRoot, 'expo-qr-android.png');
    const iosPath = path.join(projectRoot, 'expo-qr-ios.png');
    const legacyPath = path.join(projectRoot, 'expo-qr.png');

    await writePng(androidPath, androidLink);
    await writePng(iosPath, iosLink);
    await writePng(legacyPath, primary);

    console.log('QR em PNG (mais facil de escanear no Expo Go):');
    console.log(`  Android → ${androidPath}`);
    console.log(`  iOS     → ${iosPath}`);
    console.log(`  (padrao EXPO_QR_PLATFORM) → ${legacyPath}`);
    console.log('');
    console.log('Como usar no Expo Go:');
    console.log('  1) Abra o PNG no Mac (Preview), tela cheia ou zoom alto, brilho no maximo.');
    console.log('  2) No Expo Go: aba "Home" → "Scan QR code" e aponte para o PNG (nao use a Camera do iOS/Android fora do app).');
    console.log('  3) Se ainda falhar: Home → "Enter URL manually" e cole o link exp://... acima (use o de Android ou iOS conforme seu celular).');
    console.log('');
    console.log('QR no terminal (maior que antes; ainda e mais dificil que o PNG):');
    qrcode.generate(primary, { small: false });
    console.log('');
    console.log(`Dev tools no navegador: http://localhost:${port}`);
  } catch (error) {
    console.error('Falha ao gerar QR do Expo.');
    console.error(
      `Confirme se o servidor esta rodando (ex.: npx expo start --tunnel --port ${port}).`
    );
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();

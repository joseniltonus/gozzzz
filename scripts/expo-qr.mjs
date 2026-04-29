import http from 'node:http';
import qrcode from 'qrcode-terminal';

const port = process.env.EXPO_PORT || '8088';
const platform = process.env.EXPO_QR_PLATFORM || 'android';

function getExpoLink() {
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

        if (location && location.startsWith('exp://')) {
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
              `Nao foi possivel obter o link Expo (status ${res.statusCode ?? 'desconhecido'}): ${body}`
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

async function main() {
  try {
    const link = await getExpoLink();
    console.log(`Expo link (${platform}): ${link}`);
    console.log('');
    qrcode.generate(link, { small: true });
    console.log('');
    console.log(`Se nao ler, abra: http://localhost:${port}`);
  } catch (error) {
    console.error('Falha ao gerar QR do Expo.');
    console.error(
      `Confirme se o servidor esta rodando (ex.: npx expo start --tunnel --go --port ${port}).`
    );
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();

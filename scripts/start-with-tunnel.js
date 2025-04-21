// Script para iniciar o servidor com túnel ngrok
import ngrok from 'ngrok';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const PORT = process.env.PORT || 3000;
const WEBHOOK_PATH = '/api/mercadopago/webhook';
const ENV_FILE_PATH = path.join(__dirname, '..', '.env.local');

async function startTunnel() {
  console.log('🚀 Iniciando o servidor Next.js...');
  
  // Iniciar o servidor Next.js
  const nextProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env }
  });
  
  // Esperar um pouco para o servidor iniciar
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  try {
    console.log('🔄 Conectando ao ngrok...');
    const url = await ngrok.connect({
      addr: PORT,
      region: 'sa', // Região da América do Sul
    });
    
    const webhookUrl = `${url}${WEBHOOK_PATH}`;
    console.log('\n✅ Túnel ngrok criado com sucesso!');
    console.log('\n🔗 URLs de Acesso:');
    console.log(`📱 Aplicação: ${url}`);
    console.log(`🔔 Webhook: ${webhookUrl}`);
    
    // Atualizar o arquivo .env.local com a URL do webhook
    try {
      console.log('\n📝 Atualizando arquivo .env.local com a URL do webhook...');
      
      let envContent = '';
      if (fs.existsSync(ENV_FILE_PATH)) {
        envContent = fs.readFileSync(ENV_FILE_PATH, 'utf8');
      }
      
      // Verificar se já existe a variável WEBHOOK_URL
      if (envContent.includes('WEBHOOK_URL=')) {
        // Substituir a URL existente
        envContent = envContent.replace(/WEBHOOK_URL=.*/g, `WEBHOOK_URL=${webhookUrl}`);
      } else {
        // Adicionar a nova URL
        envContent += `\nWEBHOOK_URL=${webhookUrl}`;
      }
      
      fs.writeFileSync(ENV_FILE_PATH, envContent);
      console.log('✅ Arquivo .env.local atualizado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao atualizar .env.local:', error.message);
    }
    
    console.log('\n👉 Instruções para testar o Mercado Pago:');
    console.log('1. Configure esta URL de webhook no painel do Mercado Pago:');
    console.log(`   ${webhookUrl}`);
    console.log('2. Acesse sua aplicação em:');
    console.log(`   ${url}/mercadopago.html`);
    console.log('3. Realize o fluxo de pagamento para testar');
    console.log('\n⚠️ Pressione Ctrl+C para encerrar o servidor e o túnel\n');
    
    // Monitorar o processo Next.js
    nextProcess.on('close', (code) => {
      console.log(`\n🛑 Servidor Next.js encerrado com código ${code}`);
      ngrok.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar túnel ngrok:', error.message);
    nextProcess.kill();
    process.exit(1);
  }
}

// Iniciar o túnel
startTunnel().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});

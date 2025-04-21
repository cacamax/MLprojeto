# React + TypeScript + Vite

Este projeto é uma aplicação web moderna desenvolvida com React, TypeScript e Vite que oferece uma solução inteligente para geração e análise de jogos da loteria.

## Funcionalidades Principais

- Geração inteligente de combinações de números para jogos da loteria
- Interface moderna e responsiva com Tailwind CSS
- Sistema de pagamento integrado com Mercado Pago
- Análise estatística de números mais sorteados
- Padrões e estratégias de jogos
- Dashboard administrativo para gestão de pagamentos

## Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Express.js (Backend)
- MercadoPago API
- Radix UI Components

## Deploy Rápido no Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcacamax%2FMLprojeto)

1. Clique no botão "Deploy with Vercel" acima
2. Faça login ou crie uma conta no Vercel
3. O projeto será automaticamente clonado e configurado
4. Configure as seguintes variáveis de ambiente:
   - `MERCADOPAGO_ACCESS_TOKEN`: Seu token de acesso do Mercado Pago
   - `VITE_API_URL`: URL da sua API (se estiver usando um backend separado)

## Instalação Local

```bash
# Clone o repositório
git clone https://github.com/cacamax/MLprojeto.git

# Entre no diretório
cd MLprojeto

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Para build de produção
npm run build
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`
2. Configure suas variáveis de ambiente
3. Para desenvolvimento local, use `npm run dev`
4. Para produção, use `npm run build` seguido de `npm start`

## API Endpoints

- `/api/create-preference`: Cria preferência de pagamento
- `/api/webhook`: Webhook do Mercado Pago
- `/api/payment`: Processamento de pagamentos

## Recursos Futuros

- Integração com Machine Learning para análise preditiva
- Mais opções de jogos e loteria
- Sistema de assinatura
- Histórico completo de sorteios

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

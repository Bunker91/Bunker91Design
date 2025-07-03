
# Bunker 91 — Manual de Deploy na Vercel

## 1. Crie sua conta na Vercel
- Acesse https://vercel.com
- Crie uma conta (use GitHub ou Google)

## 2. Importar o projeto
- Vá em: https://vercel.com/new
- Clique em “Import Third-Party Git Repository”
- Cole a URL do repositório GitHub que o Wilson vai te fornecer (ou envie o .zip lá e crie seu repo)
- Escolha “Framework: Next.js” (detecção automática)
- Clique em “Deploy”

## 3. Configurar variáveis de ambiente (Environment Variables)
- SUPABASE_URL=🔒 sua URL do Supabase
- SUPABASE_ANON_KEY=🔒 sua public key do Supabase
- STRIPE_SECRET_KEY=🔒 sua secret key do Stripe
- ADMIN_EMAIL=bunker91design@gmail.com

## 4. Tudo pronto!
- A Vercel vai buildar seu site
- Quando terminar, ele estará online com domínio próprio (ex: bunker91.vercel.app)

## Acesso administrativo
- Vá para /admin
- Faça login com bunker91design@gmail.com

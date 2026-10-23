# Ativação das conexões pessoais — 1.5.0

## Estado real da entrega

O backend está implementado em `netlify/functions/api.js`. Login pessoal, OAuth, leitura Calendar/Notion/Drive e seleção de fontes têm testes com provedores **simulados**. Não houve conexão real a contas: nenhum cliente OAuth, segredo de sessão, senha de acesso pessoal ou acesso Netlify está disponível nesta sessão. Os testes não comprovam aceite dos provedores em produção.

O app local não requer esse backend para estudar. A configuração das fontes, depois da ativação, é feita em Configurações por nome: calendários, base/data source do Notion e pasta do Drive. O usuário não precisa copiar JSON, tokens ou IDs para usar as conexões. A importação manual continua como alternativa.

## Ações externas indispensáveis, uma vez

1. **Hospedagem:** conectar o repositório ao site Netlify existente, com autorização de deploy. Publicar o projeto completo pelo Git permite à Netlify empacotar as funções; `netlify.toml` publica somente `site/` e define as rotas `/api/*`. Use os recursos gratuitos disponíveis e não habilite upgrade/cobrança automática. O ZIP de deploy estático via Drop **não publica funções**.
2. **Google:** criar/configurar um aplicativo OAuth Web na conta do usuário, habilitar APIs Calendar e Drive e permitir o próprio usuário como testador quando necessário. Redirect exato: `https://SEU-DOMINIO/api/oauth/google/callback`. Solicitações são Calendar somente leitura e Drive somente leitura. O escopo Drive permite leitura ampla na conta; o aplicativo limita a extração à pasta selecionada. Não há permissão de escrita. Verificação/limitações da tela de consentimento dependem das políticas do Google.
3. **Notion:** criar um aplicativo OAuth com capacidades **somente leitura** e callback `https://SEU-DOMINIO/api/oauth/notion/callback`. Autorizar somente a base desejada. A API usa versão `2025-09-03` e consulta data sources, não grava páginas. Os nomes de campos reconhecidos constam em INTEGRATIONS.md.
4. **Segredos do servidor:** registrar nas configurações seguras da Netlify, nunca em chat, arquivos públicos ou frontend: `ORBITA_BASE_URL` (origem HTTPS, sem caminho), `ORBITA_SESSION_SECRET` (segredo aleatório com pelo menos 32 caracteres), `ORBITA_OWNER_PASSWORD` (senha pessoal longa, pelo menos 16 caracteres), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET`. A origem HTTPS não é segredo; os demais valores devem ser tratados com cuidado. Não enviar valores ao repositório.

Depois, abrir Configurações → entrar na área pessoal → Conectar Google/Notion → consentir → selecionar fontes por nome → sincronizar. Fontes selecionadas são lembradas por cookies protegidos. Na abertura seguinte, o app tenta atualizar fontes selecionadas se a cópia tiver mais de 15 minutos; falhas preservam a cópia local. Não há sincronização em segundo plano quando o app está fechado.

## Segurança implementada e limites

- Tokens permanecem em cookies cifrados AES-256-GCM, HttpOnly, Secure e SameSite=Lax, limitados ao host. Não entram em JSON retornado ao cliente ou logs. Senha protege as conexões do servidor; não cifra o histórico local do dispositivo.
- Sessão pessoal de até sete dias; OAuth Google com state e PKCE S256, callback fixo e refresh token de servidor. Notion usa state e troca confidencial pelo servidor; se a autorização expirar/revogar, reconectar. Sem armazenamento central de tokens para executar tarefas com o app fechado.
- POST exige origem exata. Login usa comparação de hashes em tempo constante e limite de tentativas por instância. Esse limite é em memória, não um serviço distribuído; não substitui proteção da hospedagem para exposição ampla. O projeto é para um usuário.
- Respostas privadas usam `private, no-store`; SW ignora `/api/` e `/.netlify/`. Calendar/Notion/Drive são somente leitura. Logout limpa os cookies neste aparelho; revogação definitiva da autorização ocorre também nos painéis Google/Notion.
- Falhas de paginação retornam erro em vez de anunciar snapshot completo. Há limites de volume e tempo de requisição.
- Drive indexa metadados dos filhos diretos da pasta selecionada. Extração textual de Google Docs/texto até 1 MB, com origem e `page:null`; não inventa paginação. PDF, OCR, diagramas e busca recursiva de todas as pastas continuam pendentes.
- Trechos autorizados podem ser adicionados à biblioteca **privada local** após escolher disciplina e parágrafo. Não são enviados ao catálogo público; integram o backup privado. Links de vídeos encontrados em documentos são referências não verificadas até passar pela checagem de fontes.
- Seletores listam até 100 pastas e 100 data sources inicialmente. Fontes maiores podem precisar de organização/seleção mais específica. A compatibilidade efetiva com sua conta Google/Notion exige teste real após autorização.

## Publicar pelo código-fonte

O ZIP-fonte contém `site/`, `netlify/functions/`, `netlify.toml` e documentação. Faça o deploy via integração Git/Netlify ou CLI autorizada com `--dir=site --functions=netlify/functions`; não exponha a raiz como pasta pública. Nenhuma publicação ocorreu nesta sessão.

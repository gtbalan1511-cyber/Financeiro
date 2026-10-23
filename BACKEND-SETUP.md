# Ativação das conexões no ambiente existente

## Estado verificado nesta rodada

O aplicativo usa `/api/` na mesma origem. A URL informada pelo usuário está em `chatgpt.site`; a leitura dessa origem foi bloqueada pelo proxy do ambiente (403). Não há ferramenta de publicação/edição desse site ou conector de contas Google/Notion disponível nesta conversa. Nenhuma variável OAuth ou de sessão está configurada no ambiente. Isso impede publicar o backend, emitir links OAuth válidos e testar contas reais. O repositório não concede acesso ao editor da publicação.

O código agora oferece `server/index.cjs`: servidor HTTP Node 22+ independente de provedor, servindo o aplicativo existente e as mesmas rotas `/api/`. O adaptador anterior de funções continua disponível por compatibilidade, sem configurar nem pressupor essa hospedagem. O Dockerfile contém somente aplicação, adaptador e servidor, sem dependências adicionais, repositório ou pacotes pessoais. Nenhuma imagem foi construída nem infraestrutura contratada.

## Acesso indispensável, uma vez

1. Disponibilizar acesso autorizado ao editor/painel que mantém o aplicativo atual, com capacidade de executar Node ou encaminhar `/api/` para um backend HTTPS seguro. Reutilizar a mesma origem preserva o armazenamento do PWA e evita cookies entre sites, que são limitados no Safari. Se essa plataforma não suportar execução nem proxy, será necessário resolver essa limitação com o operador antes de publicar; não foi criado outro site.
2. No projeto Google do titular, habilitar Calendar API e Drive API e registrar um cliente OAuth Web. O callback é a origem atual seguida de `/api/oauth/google/callback`. Os escopos são `calendar.readonly` e `drive.readonly`. O segundo permite descoberta e leitura da conta; o servidor limita a navegação à pasta acadêmica selecionada. Não há escrita. Aplicativos Google em modo de testes podem ter refresh tokens com validade limitada; não prometer conexão permanente nesse modo.
3. No Notion, registrar OAuth somente leitura, callback da origem atual seguido de `/api/oauth/notion/callback`. O titular autoriza as páginas/bases permitidas. A implementação consulta data sources da API `2025-09-03`; páginas comuns sem data source não equivalem a uma base consultável e ainda exigem adaptação após identificar a estrutura real.
4. Cadastrar os segredos no painel privado do servidor: `ORBITA_BASE_URL`, `ORBITA_SESSION_SECRET` (aleatório, mínimo 32 caracteres), `ORBITA_OWNER_PASSWORD` (mínimo 16), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET`. Nunca enviar valores por mensagem nem adicioná-los ao frontend/Git. A senha é definida no painel, usada apenas no formulário HTTPS da área pessoal.

A configuração dos clientes OAuth exige acesso administrativo às contas/plataforma. Depois dela, o uso normal é: Configurações → entrar → Conectar Google → Conectar Notion → selecionar calendário, pasta e até quatro bases por nome → sincronizar. Nenhum ID, token, JSON, ICS ou CSV precisa ser manipulado no fluxo diário.

## Execução e diagnóstico

- `npm run start:integrated`: servidor em `127.0.0.1:4173`; a aplicação funciona mesmo sem OAuth e a API informa que falta configuração. Não expor esse servidor HTTP diretamente à internet: utilizar HTTPS da plataforma/proxy existente.
- Em contêiner, o Dockerfile define `HOST=0.0.0.0`, `PORT=8080`; os segredos são injetados pelo painel da plataforma, nunca na imagem. A imagem não foi validada neste ambiente.
- `node server/check.cjs https://ORIGEM-ATUAL`: diagnóstico sem tokens/dados acadêmicos. Distingue página estática de JSON, servidor configurado e falta de acesso. Resultado configurado **não** comprova consentimento ou leitura das contas.
- Backend e PWA usam a mesma origem. Não configurar uma URL externa de API no frontend ou desativar a política de origem para contornar autenticação.

## Comportamento implementado

- OAuth Google com state/PKCE e Notion com state/troca confidencial. Renovação Google/Notion quando o provedor disponibiliza refresh token; seleção preservada na renovação. Tokens somente em cookies cifrados, HttpOnly/Secure/SameSite=Lax. Sessões/cookies têm validade de sete dias; reconexão é necessária após expiração, revogação ou limpeza. Não há promessa de autorização eterna.
- Calendar: eventos expandidos no fuso America/Sao_Paulo, janela de sete dias passados a noventa futuros, paginação limitada e falha explícita se incompleta. Estudo, revisão, aula, simulado, laboratório, atividade avaliativa e prova são diferenciados. Só status `confirmed`, disciplina identificada e categoria avaliativa geram avaliações. Bloco de estudo P2 não vira prova. Mudanças/removidos na parte interna da janela substituem a agenda anterior; avaliações anteriormente sincronizadas que perderam confirmação são arquivadas, preservando avaliações manuais e tentativas. Fronteiras da janela permanecem conservadoras.
- Notion: até quatro data sources selecionados por nome, propriedades/relações de matérias resolvidas entre os registros selecionados, dificuldades e datas de revisão preservadas, deduplicação por página. Registros privados originais são mantidos para consulta/expansão; não se inventam dados ausentes ou notas. Estruturas específicas das quatro fontes reais precisam ser validadas após autorização.
- Drive: navegação recursiva da pasta selecionada, até 100 pastas/5000 arquivos, sem atalhos externos. Disciplina atribuída somente quando há código conhecido no nome/caminho. Metadados de materiais ficam locais e os documentos abrem no Drive autenticado. Extração de texto/Google Docs permanece limitada a filhos diretos da pasta selecionada; não há OCR/PDF, gabarito extraído ou paginação inventada. Materiais sem código permanecem sem associação, para evitar suposições.
- Sincronização na abertura, retorno ao app e a cada 15 minutos enquanto visível; botão para atualização imediata. Falhas aparecem no painel e preservam cópias locais. Não executa tarefas com o app fechado. Importação privada permanece alternativa, não procedimento principal.
- Correção do treino/feed/simulado continua disponível offline com as resoluções autorais existentes; não implica correção automática discursiva ou conteúdo oficial extraído.

## Testes reais pendentes de consentimento

No iPhone, após a infraestrutura estar ativa: consentir em Google/Notion; selecionar fontes reais; conferir calendário/material/erro contra o provedor; alterar um evento no provedor e sincronizar; verificar prova confirmada e exercício do dia; reabrir PWA e verificar renovação; testar revogação e cópia offline. Nenhum desses resultados pode ser afirmado antes da execução.

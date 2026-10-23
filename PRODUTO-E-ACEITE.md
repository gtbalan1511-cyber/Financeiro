# Órbita Estudos — implementação e critérios de aceite

## Situação em 22/10/2026
Site publicado pelo usuário em `https://venerable-narwhal-8d8674.netlify.app/`. Captura confirmou carregamento inicial no Safari do iPhone; botões e persistência final ainda precisam de testes extensivos. Site nesta pasta já tem layout escuro, catálogo de 9 matérias, cartões no feed, exercícios de múltipla escolha, flashcards, páginas de provas e progresso. NÃO assumir API integrada, sincronização ao vivo ou importação integral de PDFs. O ZIP original de deploy foi preparado para o Netlify Drop.

## Objetivo do usuário
Fazer app pessoal atraente para estudo e preparação P2/P3 FEI, inspirado funcionalmente no Astra AI, com UI escura sofisticada; aprender no tempo livre em feed Para Você de Engenharia com vídeos/ilustrações/animações/curiosidades, simulações e desafios. O sucesso é aprendizado medido, não rolagem compulsiva. Sem cobrança obrigatória, e utilizável pelo Safari como PWA no iPhone.

## Prioridades por ordem
1. Estabilizar o atual PWA: testar iOS, navegação, erro de tela infinita, cache de Service Worker, editor de provas, quizzes, respostas, flashcards e backups. Versão/rollback e validação de console.
2. Experiência Astra funcional ORIGINAL (sem copiar ativos): Exam Prep com datas P1/P2/P3, tópicos e provas antigas; assistente de método socrático; importação PDF local; resultado da tentativa + confiança + categorização de erro; mapas de domínio com evidências reais; modo simulado. Progressão e revisão espaçada.
3. Feed For You tipo TikTok **educacional**: fullscreen swipe, animações reais e explicações curtas, vídeos apenas se direitos permitirem, salvar, repetir, verificar entendimento, revisar mais tarde, sessão 5/10/15 min, parar conscientemente, basear ranking em erros e agenda. Sem feed infinito manipulativo.
4. Puxar calendário de estudos via Google Calendar, somente após OAuth seguro e mínimo de escopo. Sem OAuth, carregar snapshot local via IMPORTAÇÃO EXPLÍCITA do usuário e exibir estado 'snapshot atualizado em ...'. Somente indicar exercícios nos dias com eventos 'Estudo P2' (não confundir aulas).
5. Integrar Notion para acompanhar conteúdo, metas e erros, com acesso do usuário. A base Erros & Reestudo — P2 tem campos [Erro / questão, Matéria, Conteúdo, Origem, O que eu fiz, Onde começou o erro, Confiança antes da correção, Tipo de erro, Regra para próxima vez, Status, Data, Revisar em]. Duas vias somente se autorizado; idempotência e prevenção de duplicidade. Sem acesso à API, opção de importação manual de snapshot JSON com aviso.
6. Google Drive acadêmico 9 disciplinas: ingerir somente arquivos que usuário consiga autenticar e conceder; extrair com fidelidade diagramas, conteúdo e gabaritos; preservar fonte/página; não inventar exercícios oficiais. Sugerir exercícios autorais no estilo e método do professor, mas identificá-los como autorais.
7. Tutor IA sem plano pago obrigatório: camada provedora pluggable backend protegida; sem chave não fingir chatbot, usar tutor predefinido e questões locais. Pesquisar somente ofertas gratuitas REAIS dentro dos limites atuais; jamais depender da assinatura ChatGPT para API de app independente.
8. Implantação: gerar ZIP de deploy de `site/` sem pasta `_contexto_privado/`. Publicar no mesmo Netlify só se a conta estiver autorizada; se não, preparar ZIP pronto e instruções. Não prometer publicação automática.

## Regras pedagógicas
- Começar exercício pedindo assunto, dados, pedido, método provável e hipóteses; jamais revelar solução imediatamente sem solicitação.
- Corrigir método do professor. Em Vibrações priorizar DCL, forças, momentos e EDM; MEE120 usar Çengel & Ghajar 4ª ed SI; MEP230 preservar notação e passo a passo do professor para carga unitária/Castigliano e Hill; MEP140 interpretar caminho de potência antes do Excel.
- Fazer aluno estimar confiança antes de mostrar correção. Falta de tentativa ≠ erro, resposta certa com baixa confiança ≠ domínio, assistir card ≠ domínio. Reavaliação independente posterior.
- Registrar evidência de acerto/erro, categorias e notas; evitar calcular métricas fictícias.
- Prioridade de assunto = bloco do Calendar + erro ativo do Notion + prova próxima + revisão espaçada + dificuldade; nunca só engajamento.
- Agenda manhã 40 min: teoria 10 min, exercício 20 min, confiança 2 min, correção 6 min, registro 2 min. Máximo normal 1 exercício central e outro para confirmar.
- Nota mínima não é meta final; usuário busca domínio e evitar P3.

## Aceite e testes
- Safari iPhone: aplicativo abre sem travar nem depender do app Arquivos; pode ser adicionado à tela inicial; sem barra sobrepondo navegação.
- Navegação pelos 9 cursos; abrir exercícios, responder, mostrar explicação DEPOIS, registrar erro e confiança; persistir entre reaberturas; exportar/importar backup.
- Feed mostra cards variados por matéria; swipe; salva; desafios contam evidência de aprendizagem; usuário pode encerrar sessão.
- Tela 'Exercício de hoje' usa agenda e os erros do Notion (via OAuth ou snapshot importado com origem marcada), sem sugerir quando não há bloco acadêmico.
- Tela de notas é fiel aos registros e identifica valores projetados vs oficiais; fórmulas com testes unitários.
- Se IA não configurada, UI explica de forma clara e não cobra nem falha; chave nunca no front-end.
- Links Drive originais abrem sob autenticação do usuário, sem incorporar PDF privado automaticamente.
- Um pacote de deploy sem dados acadêmicos privados; outro pacote fonte incluindo documentação local.

## Arquivos
- `site/`: aplicação atual; faça backup antes de alterações.
- `_contexto_privado/agenda_estudos_snapshot.json`: blocos de estudo selecionados do Google Calendar. NÃO é API/live.
- `_contexto_privado/notion_estudos_snapshot.json`: prioridades, fórmulas e dificuldades específicas extraídas do Notion. NÃO é API/live.
- `_contexto_privado/fontes_drive.json`: localização de matérias e fontes. NÃO inclui os PDFs.

## Limites conhecidos
- Não foi concedido acesso a repositório git nem deploy com credenciais; não há integração Codex disparável deste chat.
- Não há API gratuita do ChatGPT vinculada à assinatura do usuário. Simulador offline deve continuar funcional.
- Prazo aspiracional 'amanhã cedo' não autoriza fingir que todo o backlog foi completado.

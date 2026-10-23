# Órbita Estudos 1.3.0

Continuação incremental do ZIP 1.2.0. Aplicação estática em JavaScript, HTML e CSS, sem backend, frameworks, cobrança ou API essencial. Conteúdo autoral para nove disciplinas; não equivale a provas oficiais nem currículo completo da FEI.

## Executar e testar

Requisitos: Python 3 e Node.js 22+; Chromium para testes E2E.

```sh
npm ci
npm start
```

Em outro terminal, na mesma pasta:

```sh
TZ=America/Sao_Paulo npm test
npm run test:browser
npm run build
```

`CHROMIUM_PATH` pode informar outro executável Chromium. Sem Chromium de sistema, instale o navegador do Playwright e informe seu caminho. A aplicação em produção não precisa de Node nem npm; essas ferramentas servem somente ao desenvolvimento. O empacotamento gera os dois ZIPs em `dist/`, valida arquivos estáticos e não transpila o JavaScript.

## Publicar e instalar

1. Guarde backup da publicação anterior e exporte seu progresso no aplicativo.
2. Na conta Netlify, escolha o site existente e envie `Orbita-Netlify-1.3.0.zip` na área de deploy manual. O `index.html` está na raiz desse ZIP. Não envie o ZIP de código-fonte.
3. Abra o domínio HTTPS e confirme `v1.3.0` no rodapé. Uma aba antiga pode precisar ser fechada/reaberta para atualizar o Service Worker.
4. No Safari do iPhone: Compartilhar → Adicionar à Tela de Início. Abra o novo ícone online uma vez. Depois ative modo avião e confirme abertura e registro de respostas.
5. Exporte backups periodicamente. Dados ficam no armazenamento do domínio/dispositivo; limpeza do Safari, troca de domínio ou desinstalação pode removê-los. Não há sincronização entre aparelhos.

Publicação não foi realizada nesta entrega: não há conexão de hospedagem autorizada disponível. Manifest, ícones, metadados Apple e Service Worker estão preparados; instalação e uso no Safari de iPhone real ainda exigem validação no aparelho.

## Dados manuais e integrações

Configurações aceita JSONs de agenda, erros/notas e links. Exemplos **sintéticos** estão em `tests/fixtures/`, fora do ZIP de deploy. Eles são dados de teste, não agenda pessoal. Agenda usa `study_events` com `date` (AAAA-MM-DD), `start` (HH:mm), `end`, `subject` e `title`; importe somente blocos de estudo. Notion usa `error_records` e `grades`. Links do Drive exigem HTTPS. Não importe tokens nesses arquivos.

Integração automática continua pendente: requer backend com OAuth Google Calendar somente leitura e acesso Notion à base escolhida. Não existe autorização persistente conectada ao app; acesso de um conector no chat não fornece OAuth ao PWA. Não há escrita no Notion. PDFs, IA generativa, sincronização entre dispositivos e conteúdo multimídia extenso estão pendentes. Todas as funções locais atuais funcionam sem essas integrações.

Os dados pessoais importados não são enviados a servidor; entram no backup exportado, que deve permanecer privado. O site estático público não tem autenticação. `_headers` fornece CSP e proteções básicas no Netlify. Não publique snapshots reais, backups, notas ou credenciais.

Consulte `CHANGELOG.md`, `TEST-REPORT.md`, `NEXT-STEPS.md` e os resultados JSON para evidências e limitações.

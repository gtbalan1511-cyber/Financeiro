# Órbita Estudos 1.6.0 — Missão 02

Evolução da branch 1.5.0, preservando catálogo, modelos, simulados e dados locais. Novos: progresso privado cifrado, D1/SQLite, retomada de exercícios em outro aparelho, fila offline com conflito explícito, cadastro de disciplinas e navegação desktop.

**Estado real:** testes locais; sem URL de produção nova. Cloudflare não autenticada e clientes OAuth ausentes. Não declarar integração real nem iPhone físico validado. [Arquitetura](docs/MISSAO-02-ARQUITETURA.md), [investigação Astra](docs/REA-ASTRA.md), [ativação gratuita](docs/DEPLOY-CLOUDFLARE.md), [testes](TEST-REPORT.md).

`npm ci`, `npm test`, `npm run test:browser`, `npm run test:multiplatform`, `npm run test:worker`, `npm run cloudflare:check`. Node 24+. Playwright requer navegadores/bibliotecas: `npx playwright install --with-deps chromium firefox webkit`. Execução Node: `npm run start:integrated` (sem configuração privada, opera só local). Cloudflare: Worker + assets + D1; nada depende do computador pessoal depois de publicar em conta autorizada.

## Documentação da versão anterior (histórica)

> Conexões: há agora um servidor Node independente de provedor em `server/index.cjs`, com aplicativo e `/api/` na mesma origem. Veja [BACKEND-SETUP.md](BACKEND-SETUP.md). Não houve publicação nem autorização real das contas.

> Configuração pessoal da versão existente: veja [PERSONAL-SETUP.md](PERSONAL-SETUP.md). Um único pacote privado pode ser mesclado sem apagar progresso. Não houve mudança de hospedagem ou conexão real às contas nesta rodada.

# Órbita Estudos 1.5.0

Continuação incremental da 1.4. PWA pessoal para Engenharia Mecânica: catálogo expansível, feed adaptativo, simulados, revisão espaçada e backend de conexões somente leitura. Sem IA paga ou serviço contratado nesta entrega.

## O que está entregue

**402 atividades**: 153 explicações originais, 153 desafios distintos, 36 simulações com controles/modelos/curvas e 60 vídeos referenciados. São **153 conceitos-base autorais**, não 402 conceitos diferentes. Todas as nove disciplinas têm 17 conceitos e 17 desafios. Conteúdo introdutório com revisão pedagógica humana pendente, não provas oficiais FEI.

Os **60 IDs e títulos de vídeos foram conferidos por HTTP nas fontes oficiais MIT OpenCourseWare em commits fixos**. Reprodução e duração exata no YouTube não foram validadas: o acesso direto retornou bloqueio de rede. Vídeos não são baixados, copiados ou carregados automaticamente; o player oficial exige ação do usuário. Parte das aulas é longa e está disponível na Biblioteca de vídeos, fora das filas curtas. Veja CONTENT-REPORT.md e VIDEO-VERIFICATION-RESULTS.json.

O motor usa exibições, conclusões, respostas/confiança, erros recorrentes, calendário, Notion e provas próximas. Prioriza inéditos, alterna disciplinas/formatos, evita o mesmo item em seis horas e prefere outro formato do conceito na revisão. Exposição/conclusão não cria domínio; o indicador exige acertos independentes confiantes em dias distintos. Sessões **5/15/30 minutos**, fila finita e encerramento consciente. Há aviso se o catálogo elegível não preencher a estimativa. Duração estimada não garante tempo real de estudo.

## Conexões

Backend Netlify com acesso pessoal, cookies cifrados HttpOnly, OAuth Google com state/PKCE, OAuth Notion, seleção por nome e leitura Calendar/Notion/Drive. Calendar usa America/Sao_Paulo; Drive indexa pasta selecionada e extrai Google Docs/texto, preservando origem sem inventar páginas. Trechos escolhidos podem virar cartões privados locais. Histórico/snapshots ficam disponíveis offline.

**Nenhuma conta real foi conectada/testada nesta sessão.** Testes de backend usam mocks. A ativação exige hospedagem e registro OAuth externo; veja BACKEND-SETUP.md. O aplicativo não pede tokens, IDs ou JSON no fluxo de conexão. Importação manual antiga permanece como alternativa.

Limites: Notion não recebe escrita/histórico do app; PDF/OCR/diagramas, varredura recursiva do Drive e sync com app fechado não estão implementados. Dados locais não são cifrados pela senha do servidor. Backups contêm suas informações pessoais e devem permanecer privados.

## Executar e testar

Requisitos: Node.js 22+, Python 3 e Chromium para E2E. Validação local realizada com Node 24 e Python 3.12.

```sh
npm ci
npm run catalog:build
TZ=America/Sao_Paulo npm test
npm run test:usage
npm run test:browser
npm run build
npm start
```

`npm start` serve **somente site/** na porta 4173; as funções Netlify precisam do runtime Netlify. O modo local funciona sem backend. E2E inicia seu próprio servidor e usa `CHROMIUM_PATH`, `/usr/bin/chromium` ou Chromium do Playwright. Para instalar em outra máquina: `npx playwright install --with-deps chromium`.

`npm run test:usage` produz histórico **sintético** de uma sessão, três sessões, sete e trinta dias. Não é aprendizagem de uma pessoa. Resultados em FEED-SIMULATION-RESULTS.json. `npm run videos:verify` confere os arquivos públicos oficiais por HTTP e não testa reprodução.

## Adicionar e renovar conteúdo

- `content/lessons.tsv`: fonte editorial das 153 explicações e perguntas, com alternativas e correção.
- `content/videos.sources.json`: IDs/títulos, fonte oficial, commit, idioma e limitações da verificação.
- `site/simulations.js`: biblioteca reutilizável de modelos; simulações novas exigem função física e testes, não só metadados.
- `tools/build-catalog.cjs`: gera e valida `site/catalog/v1.json` e cobertura. IDs estáveis, tags, fonte, licença, duração, dificuldade, pré-requisitos, estado de revisão e versão por item.
- O app busca/valida o catálogo ao abrir e por botão em Configurações; cache validado dá fallback offline. Atualização é adiada durante sessão/simulado ativos. Novos conteúdos entram pelo catálogo, sem alterar a navegação principal.
- Workflow semanal audita fontes autorizadas e gera relatório. Não cria vídeos, não raspa material privado e não faz deploy sem revisão.

A configuração inicial de fonte depende da conta autorizada. Nenhum documento pessoal foi extraído nesta sessão. Os trechos privados que o usuário escolher não entram no JSON público nem no cache público do catálogo.

## Publicar

**Não houve publicação da 1.5 nesta sessão.** Sem acesso Netlify autorizado.

- **Aplicativo local/offline:** enviar `dist/Orbita-Netlify-1.5.0.zip` ao deploy manual do site existente. O ZIP contém somente assets públicos; index.html está na raiz. Esse modo não instala funções OAuth.
- **Aplicativo com backend:** conectar este repositório ao Netlify, usando a branch desejada, com `netlify.toml`, `site/` e `netlify/functions/`. Preencher segredos somente no servidor e registrar callbacks Google/Notion conforme BACKEND-SETUP.md. A raiz do repositório nunca é a pasta pública.
- O ZIP-fonte completo está em `dist/Orbita-Codigo-Fonte-1.5.0.zip`; hashes em `dist/SHA256.json`. Não publique o ZIP-fonte por Drop como site estático.
- GitHub CI executa testes/empacotamento. Resultados remotos não foram confirmados, pois a API GitHub retornou Forbidden. Commits são disponibilizados na branch 1.5 e no PR existente; main não é mesclada automaticamente.

## iPhone

Publique em HTTPS → abra no Safari → Compartilhar → Adicionar à Tela de Início. Abra online uma vez para preparar assets e catálogo offline. Teste uma resposta, reabra e confira Progresso; exporte/restaure backup; ative modo avião e teste exercícios/simulações. Vídeos e novas sincronizações precisam de internet.

Em Configurações, verifique/aplique atualização após terminar o simulado e exportar backup. Mudança de versão não deve apagar progresso. Safari/iPhone físico e instalação standalone ainda precisam de teste no aparelho; Chromium não os substitui. O iOS pode remover armazenamento: mantenha backups periódicos.

Relatórios: TEST-REPORT.md, CONTENT-REPORT.md, CONTENT-COVERAGE.json, FEED-SIMULATION-RESULTS.json, VIDEO-VERIFICATION-RESULTS.json e NEXT-STEPS.md.

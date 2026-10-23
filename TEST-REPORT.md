# Validação — Órbita 1.4.0 — 23/10/2026

Ambiente: Linux, Node.js 24.19.0, Python 3.12.14, Playwright 1.62.1 e Chromium headless. Projeto/CI também prevê Node 22; essa versão não foi executada localmente.

## Comandos e resultados

| Verificação | Comando | Resultado |
| --- | --- | --- |
| Dependências reprodutíveis | `npm ci --ignore-scripts --cache /workspace/orbita-tools/npm-cache` | Concluído pelo lockfile |
| Unitários | `TZ=America/Sao_Paulo node --test tests/core.test.cjs` | 21/21 aprovados, sem skips |
| Integração e regressão por VM | `TZ=America/Sao_Paulo node test_logic.cjs` | 26/26 aprovados |
| Sintaxe, PWA e privacidade estática | `python test_static.py` | 11/11 aprovados |
| Navegador | `npm run test:browser` | 26 cenários aprovados; mobile 390×844 e desktop 1440×900, mais falhas/migração |
| Aplicação iniciada | `npm start` e requisições locais | HTML, manifest e data.js versão 1.4.0 disponíveis |
| Empacotamento | `npm run build` | ZIP-fonte, ZIP-Netlify e hashes; allowlist de 12 arquivos públicos |

Os ZIPs foram abertos e tiveram integridade verificada; o ZIP-fonte foi extraído em diretório temporário e seus 21 unitários, 26 testes de regressão e 11 verificações estáticas passaram novamente.

Os resultados detalhados estão em TEST-RESULTS.json (regressão) e BROWSER-RESULTS.json (execução de navegador atual). Unitários usam o runner nativo Node e saída de execução. A regressão original continua coberta, com atualização das expectativas para retomada persistente e agrupamento das tentativas por questão; nenhuma asserção foi desabilitada.

## Cobertura funcional efetivamente executada

- Configuração de simulado por conteúdo/quantidade/P3, resposta com confiança, reload, retomada na questão corrigida, conclusão e histórico sem duplicação.
- JSONs sintéticos Calendar/Notion/Drive, ICS e CSV, troca entre dois blocos de estudo, resolução e autoavaliação diárias; regras de recorrência, fuso UTC/local e aulas genéricas em unitários.
- Revisão progressiva 3/7/14/30/60, reinício após dificuldade, datas bissextas, filtro de conteúdo, ranking por erro ativo e repetição no mesmo dia sem falsa retenção.
- Feed com confiança, cartão estável após responder, retorno sem duplicar evidência, swipe sintético, slider sem acionar swipe, movimento reduzido, término finito e timer expirando uma única vez.
- Navegação Voltar e recarga na disciplina selecionada; páginas verificadas sem overflow horizontal nos dois tamanhos.
- Download e restauração real de backup, rejeição de backup inválido, abertura/resposta/reabertura offline mantendo progresso.
- Falha de quota simulada no Storage: importação não substitui dados anteriores; dados corrompidos preservados; conflito entre duas abas impede sobrescrita silenciosa.
- Texto importado com marcação HTML fica escapado; marcador sintético privado não aparece em caches do SW; nenhuma requisição externa ou exceção JS nos fluxos principais.
- Migração de um SW real 1.3 (fixture de código público do Git) para 1.4, ativação pelo botão, progresso preservado e nova versão funcionando offline.
- Estruturas nulas, poluição de protótipo, URLs executáveis/credenciais e dados inconsistentes rejeitados; banco com IDs únicos e gabaritos/referências válidos.

## Falhas encontradas durante a rodada

Corrigidas: aviso de quota sem atualização imediata de tela, estado/ordem de resposta do feed, repetição do resumo por timer vencido, retomada/histórico ausentes, navegação de disciplinas e contagem de consulta como erro. Também foram corrigidas as configurações do teste para aceitar explicitamente o diálogo de restauração e aguardar conclusão das leituras de arquivos. As execuções finais passaram após essas correções.

## Limites da evidência

- Safari/iPhone físico e instalação standalone não executados. WebKit não está instalado; seu download havia retornado HTTP 403 nesta máquina. Gestos automatizados são sintéticos e não comprovam ergonomia física.
- Sem publicação HTTPS nova nem verificação do domínio Netlify com 1.4. Não há acesso de deploy conectado. Headers são verificados estaticamente e CSP é aplicada no servidor do teste; não se afirma que foram aplicados na hospedagem.
- Sem OAuth/servidor privado Calendar/Notion: integrações ao vivo não foram executadas nem declaradas concluídas. Todos os dados dos testes são sintéticos.
- Não é auditoria completa de segurança nem revisão pedagógica de todo conteúdo. Pressão real de armazenamento/expulsão pelo iOS e sincronização entre aparelhos não testadas.
- CI remota não foi confirmada: a API GitHub retornou Forbidden. Resultados acima são da máquina desta sessão.

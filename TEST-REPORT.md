## Integrações e backend independente — rodada atual

- `TZ=America/Sao_Paulo npm test`: 65 testes Node, 26 verificações VM e 15 verificações estáticas aprovados.
- `npm run test:browser`: 30 cenários Chromium aprovados, com mobile/desktop e preservação de progresso/backup/offline. Novo cenário usa API explicitamente simulada para conferir POST, seleção de duas bases, cadastro de avaliação e mensagem de falha sem perda da cópia anterior.
- O adaptador HTTP foi testado com servidor/socket reais: app/API, JSON de configuração ausente, isolamento de caminhos, método e limite de corpo. OAuth e conteúdo dos provedores foram simulados; nenhuma conta real foi autorizada.
- `npm run test:usage` executado, sem alteração do catálogo; resultados sintéticos não comprovam aprendizagem.
- `npm run build` executado, gerando pacotes públicos por allowlist; não constitui publicação. Dockerfile preparado, imagem não construída/testada.
- Verificação da URL atual falhou por bloqueio de acesso (403 do proxy); o diagnóstico não detectou API acessível. Não há ferramenta ou credencial de implantação utilizável e faltam clientes OAuth do aplicativo.
- Nenhuma conexão real, leitura de dados do usuário via API ou deploy foi executado. A missão de integração permanece dependente do acesso à infraestrutura atual e consentimento externo. Safari físico e estruturas reais das quatro fontes Notion permanecem sem validação.

## Configuração pessoal 1.5.0 — 23/10/2026

- `TZ=America/Sao_Paulo npm test`: 56 testes Node, 26 verificações VM e 15 verificações estáticas aprovados.
- `npm run test:browser`: 29 cenários Chromium aprovados, incluindo mobile 390×844 e desktop 1440×900. Novo cenário cobre importação única duas vezes, preservação da tentativa anterior, correção do exercício diário, backup, restauração e reabertura offline. A migração de Service Worker também preserva progresso.
- `npm run test:usage`: cenários de uso sintético executados; resultados em FEED-SIMULATION-RESULTS.json. Não representam aprendizagem real.
- `npm run build`: pacote público por allowlist e verificações locais; nenhum deploy executado.
- O pacote real foi analisado e convertido fora do repositório: quatro eventos, três dificuldades, quatro referências Notion, três materiais, nenhuma avaliação confirmada; nenhum registro recusado. Os quatro blocos encontram exercícios autorais correspondentes. Isso valida conversão, não comprova sincronização ou conclusão dos exercícios.
- Nenhum dado pessoal foi inserido no aplicativo remoto. A URL fornecida pelo usuário teve acesso bloqueado pelo proxy (403). Não houve acesso ao editor da publicação.
- OAuth real, acesso a PDFs privados e Safari físico não foram testados. Correções numéricas seguem os dados/resoluções disponíveis; não há avaliação automática de respostas discursivas.

# Validação 1.5.0 — 23/10/2026

Linux, Node 24.19.0, Python 3.12, Playwright 1.62.1, Chromium headless. Não executado Safari físico.

## Testes executados

- `npm test`: **45 testes Node** (21 regras base, 10 catálogo/recomendação/modelos e 14 backend com mocks), **26 testes de integração/regressão por VM** e **15 verificações estáticas**. Sem skips na execução final.
- `npm run test:browser`: **28 cenários** Chromium. Mobile 390×844 e desktop 1440×900, quiz/confiança, simulado retomável, backup/restauração, dados manuais, sessão, swipe/controles, layout/Voltar, offline/persistência, concorrência, quota e dados corrompidos. Cenários adicionais carregam catálogo substancial, exercitam os **36 modelos no DOM**, simulam vídeo indisponível/catálogo insuficiente, preservam dados privados fora do cache e migram SW 1.3 → 1.5 mantendo progresso.
- `npm run test:usage`: cenários de uso **sintéticos**, com respostas geradas por código. Não se trata de estudo humano real. Resultados completos em FEED-SIMULATION-RESULTS.json.
- `python tools/verify-video-sources.py`: **60/60 fontes oficiais retornaram HTTP 200 e corresponderam ao ID/título**, em commits fixos MIT OCW. Resultado em VIDEO-VERIFICATION-RESULTS.json. Reprodução e duração exata dos vídeos: **não verificadas**. YouTube/oEmbed e site MIT direto retornaram HTTP 403; repositórios oficiais públicos no GitHub foram acessíveis.
- `npm run build`: validação e pacotes por allowlist. ZIP Netlify contém somente assets públicos; código de funções e documentação ficam no ZIP-fonte/Git. ZIP estático não ativa backend. Integridade dos dois ZIPs conferida; o ZIP-fonte foi extraído e `npm test` passou novamente. O servidor local respondeu com catálogo 1.5.0 de 402 itens.

## Uso sintético com o catálogo final de 402 atividades

| Cenário | Exibições | Itens únicos | Repetições | Desafios respondidos pelo simulador |
| --- | ---: | ---: | ---: | ---: |
| Uma sessão de 30 min | 8 | 8 | 0 | 4 |
| Três sessões no dia | 36 | 36 | 0 | 13 |
| Sete dias, 3 sessões/dia | 306 | 179 | 127 | 132 |
| Trinta dias, 3 sessões/dia | 1346 | 375 | 971 | 587 |

Nos cenários longos houve cobertura das nove disciplinas e quatro formatos. Os vinte vídeos longos não cabem em 30 minutos e ficam fora dessas filas; há no máximo 382 itens elegíveis para essas filas. Nesta execução, 375 foram exibidos: sete elegíveis ainda não foram selecionados, pois as dificuldades e revisões receberam prioridade. Não se afirma cobertura integral de todo item em 30 dias. Repetições incluem revisão intencional; o relatório registra justificativas. A quantidade de recomendações marcadas como revisão não coincide necessariamente com repetições de item, pois um conceito pode reaparecer em outro formato ainda inédito.

Retorno em 20 minutos sem repetir itens, revisão em formato alternativo, catálogo insuficiente sem fabricar fila, vídeo indisponível excluído e evidência de domínio em dias distintos têm asserções específicas nos testes. O teste de vídeo indisponível usa fixture sintética; não simula prova de remoção de um vídeo real do MIT.

## Modelos

36 modelos avaliados em defaults e extremos, sem NaN/Infinity. Cada controle altera resultado ou curva. Valores de referência independentes conferidos para oscilador livre, parede plana, circuito estrela e alongamento axial. Testes de todos os controles não equivalem a auditoria completa de cada equação física; revisão técnica humana permanece pendente. Gráficos são calculados de parâmetros reais, com escalas e hipóteses; animação SVG respeita movimento reduzido.

## Backend

Mocks exercitam: servidor não configurado falha fechado, login/origem, cookies cifrados e expiração, Google OAuth state/PKCE, callback inválido, troca de código sem expor token, classificação Calendar/fuso/paginação, leitura/deduplicação Notion, limite de pasta Drive, extração de texto com origem e recusa de PDF não suportado. Não há operação de escrita Notion.

**Google, Notion, Drive e Netlify reais não foram autenticados ou publicados.** Não se declara integração ativa, compatibilidade com esquemas reais ou aceite OAuth com base em mocks. A API GitHub também retornou Forbidden; CI remota não confirmada.

## Problemas investigados nesta rodada

Corrigidos: controles decorativos removidos, duas explicações muito curtas ampliadas, aliases de vídeo deduplicados, validação do catálogo adaptada à identidade do vídeo, referências de desafios resolvidas por ID, restauração de simulados aguardando catálogo, proteção de atualização durante sessão e espera pelo SW ativado antes de recarregar. O teste de migração tinha uma espera intermitente em evento de página; a checagem final observa a troca real do SW/caches e testa a nova versão offline com o mesmo progresso.

## Não executados / limites

Safari/iPhone físico, reprodução real do YouTube, OAuth e APIs de contas reais, publicação HTTPS nova, extração de PDF/OCR e sync com app fechado. Não houve geração de dados acadêmicos pessoais para preencher resultados. Relatórios distinguem metadados públicos reais, conteúdo autoral e testes sintéticos.

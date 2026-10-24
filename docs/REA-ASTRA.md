# Astra AI — investigação pública e requisitos próprios

24/10/2026; Chromium/Playwright, viewports 1440×900 e 390×844. Evidências de URL/status: `docs/evidence/public-audit.json`. Registros brutos e capturas da referência ficaram fora do repositório/deploy em `/workspace/scratch/orbita-reference-audit/`, para inspeção local, sem redistribuir interfaces ou textos da referência. Nenhuma autenticação criada, nenhuma proteção contornada, nenhum código/ativo proprietário reutilizado. Arquivos de evidência descrevem interfaces públicas, não dados acadêmicos privados.

## Observação direta

- astra-ai.co respondeu 200 e apresentou ferramentas, preparação por materiais, navegação para acesso/compra. Descrições comerciais não provam resultados pedagógicos.
- app.astra-ai.co respondeu 200 e levou à tela de login (Google/Apple/e-mail). Histórico, retomada da conta, algoritmo de recomendação e sincronização interna não foram acessados.
- /showcase respondeu 200: filtros por tutor, preparação, aprendizado, planejamento e laboratório. Cartões: prova oral, flashcards, apps, podcasts, calendário, texto inteligente, simulado, caminho personalizado e tutor por pergunta/foto. Essa lista é descrição pública, não validação da execução autenticada.
- Clique na demonstração de preparação abriu fluxo de seis etapas, com material de exemplo pré-definido. Clique no arquivo de exemplo registrou envio concluído. Não foi enviado documento real nem inferida extração real de PDF com base nessa demonstração. A primeira etapa foi executada; as outras não foram integralmente percorridas.
- /lab respondeu 200: busca, filtros por tipo/área, coleções e miniapps públicos. A organização mobile reduz informações secundárias; os controles principais permanecem acessíveis por toque.
- Construtor de circuitos público foi aberto em desktop e mobile. Instruções: prever antes de energizar, alternativas de brilho, atalhos 1–4, construção livre e exploração. Vinte níveis e explicação sobre tentar conceito semelhante após erro são descritos na ajuda; não se auditou todo o currículo ou código do algoritmo.
- Na atividade inicial, previsão “Apagada” após abrir um interruptor resultou em feedback de acerto, valores antes/depois (0,60 A → 0,00 A), explicação de circuito fechado, armadilha conceitual e botão Próximo. A interface distingue previsão, observação e explicação. O registro local de evidência contém também a tela após reabrir; isso não comprova persistência de uma conta.

## Tradução para requisitos do Órbita

| Evidência | Requisito próprio | Estado do Órbita |
| --- | --- | --- |
| Previsão antes do resultado | Exigir tentativa/confiança antes da correção; consulta não equivale a acerto | Implementado, regressões automatizadas |
| Comparação antes/depois | Mostrar modelo, unidades, hipóteses e feedback comentado | 36 modelos existentes preservados; revisão técnica humana pendente |
| Etapas de preparação por material | Associar origem, assunto, preparação e avaliação, sem fabricar fonte oficial | Catálogo autoral e trechos privados; PDF/OCR/ingestão integral pendentes |
| Atalhos e layout adaptado | Navegação lateral desktop, 1–4 nas alternativas, toque/mobile | Implementado e sob testes Chromium/Firefox/WebKit |
| Atividade com Próximo | Fila finita e encerramento consciente | Implementado, teste de limite e duração |
| Flashcards/quiz na descrição pública | Recuperação ativa e agenda de revisão | Flashcards/revisões locais existentes; não inferir algoritmo do Astra |
| Caminho personalizado descrito | Priorizar agenda, erros, revisões e prova, com justificativa legível | Motor determinístico existente; sem alegar modelo de IA |
| Conta privada (login) | Retomar mesmo exercício e progresso em aparelhos diferentes | Backend de progresso adicionado, autenticação privada e testes locais |
| Tutor por texto/foto descrito | Separar tutor guiado de IA generativa real | Tutor guiado existente; provedor generativo não configurado |
| Podcasts descritos | Vincular áudio ao material e avaliar compreensão depois | Não implementado; descrição pública não basta para copiar fluxo interno |

## O que não foi observado

Não se verificaram arquitetura, APIs internas, banco, fórmula de espaçamento, recomendação, retenção, correção discursiva, geração de áudio, conta paga, comportamento autenticado offline ou sincronização real do Astra. Não atribuir ao produto detalhes técnicos inventados. A implementação do Órbita usa regras próprias e conteúdo autoral identificado; resumos e atividades não são material oficial da FEI.

## Infraestrutura anterior do Órbita

A URL histórica `https://venerable-narwhal-8d8674.netlify.app/` retornou HTTP 401 e “This site is private / Sign in with an invited Netlify account”. Não foi substituída nem removida. O acesso ao GitHub não é acesso à conta Netlify; dados existentes no navegador do usuário precisam de exportação antes de mudança de origem.

# Pendências — 1.4.0

1. Conectar acesso de deploy à conta Netlify do site existente ou enviar o ZIP Netlify pelo painel. Nenhuma publicação nova foi realizada nesta sessão; a branch do PR #1 não foi mesclada.
2. Testar no Safari/iPhone real: instalação, modo standalone, gestos físicos, encerramento/reabertura, backup e atualização. Chromium não substitui esse teste. WebKit indisponível na máquina; download anteriormente bloqueado por rede.
3. Conectar backend autenticado + OAuth Calendar somente leitura e Notion na base autorizada. Credenciais ausentes; sem sincronização real ou escrita Notion. INTEGRATIONS.md detalha os requisitos. JSON/ICS/CSV locais funcionam sem autorização externa.
4. ICS com recorrência, TZID, eventos sem horário e blocos atravessando meia-noite requer JSON com ocorrências expandidas. JSON sem `kind:study` precisa identificar estudo/revisão/simulado no título. Importar erros novamente substitui o snapshot; histórico de tentativas locais permanece.
5. Expandir banco de questões e diagramas e revisar pedagogicamente. Quantidade do simulado é limitada à seleção disponível. P2/P3 é objetivo de preparação; não presume fórmula oficial de P3. Notas importadas são projeções explícitas.
6. Melhorar persistência para volumes maiores (IndexedDB) e sync privada entre dispositivos. Hoje localStorage tem quota limitada; falhas mostram alerta e backup preserva o estado em memória. Outra aba que alterou dados exige exportar/recarregar antes de gravar.
7. PDFs com páginas/diagramas fiéis, vídeos autorais/licenciados, tutor generativo opcional e adaptação mais avançada por evidências continuam fora desta entrega.
8. A API GitHub retornou Forbidden para leitura/edição de PR, apesar do Git funcionar. Atualizações da branch aparecem no PR #1; nenhuma alegação de CI remota aprovada será feita sem acesso aos resultados.

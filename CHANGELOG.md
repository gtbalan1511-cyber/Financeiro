## Conexões — infraestrutura independente de provedor

- Servidor Node com aplicativo e API na mesma origem, corpo limitado e isolamento de arquivos públicos; Dockerfile sem dados pessoais.
- Corrigido POST na sincronização por interface, seleção de múltiplas bases Notion e preservação na renovação de tokens Google/Notion.
- Calendar cadastra somente avaliações confirmadas; agenda atualizada dentro da janela, retirada de confirmações arquivada sem apagar provas manuais.
- Drive percorre subpastas autorizadas e associa metadados por códigos reais. Atualização automática enquanto visível, falhas exibidas e cópia offline preservada.
- Sem deploy nem consentimento real: BACKEND-SETUP.md documenta as ações externas indispensáveis e os limites.

## Configuração pessoal da 1.5.0 — 23/10/2026

- Importação privada de um pacote único com quatro esquemas parciais, validação e mesclagem incremental.
- Preservação de progresso e registros ausentes no recorte; deduplicação por ID/URL/chave composta.
- Fuso acadêmico São Paulo; tipo explícito impede confundir aulas com estudo. Avaliações exigem confirmação e evidência.
- Atalhos Notion e materiais Drive importados sem publicar dados. Correção compartilhada e resoluções por questão no resultado dos simulados.
- Cache PWA atualizado; hospedagem mantida, sem publicação nesta rodada. Consulte PERSONAL-SETUP.md.

# 1.5.0 — 23/10/2026

- Catálogo externo versionado: 402 atividades (153 explicações, 153 desafios, 36 simulações, 60 referências de vídeo), cobrindo nove disciplinas. Contagem de conceitos e limitações explícitas.
- 60 IDs/títulos de vídeos conferidos por HTTP em fontes oficiais MIT OCW e deduplicados; player oficial sob ação do usuário. Reprodução/duração exata não validadas nesta rede.
- Recomendação com histórico de exibição/conclusão/resposta, confiança, erros, diversidade de formatos/disciplinas, intervalo de repetição, revisão espaçada, Notion, Calendar e provas próximas. Sessões 5/15/30, fila estimada finita e continuação consciente.
- Biblioteca de 36 modelos ajustáveis e gráficos/traçador animado, com hipóteses e movimento reduzido. Biblioteca separada para aulas que excedem a duração do feed.
- Backend Netlify somente leitura: acesso pessoal, cookies cifrados, OAuth Google state/PKCE, OAuth Notion, seletores por nome, sincronização por abertura, Calendar SP, Notion data sources e Drive com metadados/texto. Implementado e testado com mocks, sem contas reais conectadas.
- Trechos de documentos autorizados podem virar cartões privados locais, com origem e sem paginação inventada. Nunca entram no catálogo público.
- Cache validado de catálogo, atualização adiada durante sessão, preservação de simulados/backups e migração de SW. Checagens de origem e sessão antes de APIs privadas.
- Auditoria periódica de fontes no GitHub, ferramentas de cobertura, cenários sintéticos de uso e pacotes separados. Sem publicação Netlify nesta entrega.

# 1.4.0 — 23/10/2026

- Exam Prep configurável por conteúdo, quantidade e objetivo P2/P3; retomada persistente, relatórios e histórico.
- Revisões de questões e flashcards progressivas (3/7/14/30/60), sem inflar retenção por repetir no mesmo dia; fila acionável, feedback pedagógico e categoria de dificuldade.
- Seleção entre blocos do dia, próximo estudo por horário local, exclusão de aulas genéricas, prioridades de erros ativos e avaliações próximas.
- Importadores locais Calendar ICS e Notion CSV além de JSON; validação, idempotência por substituição e recusa explícita de formatos de calendário não suportados.
- Feed estável após responder, confiança antes de desafios, prevenção de duplicação no retorno, diagramas SVG originais, sessão com encerramento e timer corrigido.
- Backup transacional, proteção a dados corrompidos, quota, concorrência entre abas, chaves de protótipo e URLs inseguras.
- SW por versão com ativação explícita, cache somente de assets públicos e migração preservando progresso; histórico de navegação, alvos de toque e campos sem zoom iOS.
- CI com servidor E2E autônomo e Chromium portável; netlify.toml, ZIPs por allowlist, hashes, auditoria e documentação de integrações pendentes.

# 1.3.0 — 23/10/2026

- Simulado prioriza erros locais, dificuldades importadas e revisões vencidas, mantendo sequência estável durante a tentativa.
- Revisões vencidas contam apenas a última tentativa por questão.
- Corrigida duplicação por nova correção/revelação da mesma questão.
- Backup valida estrutura antes de substituir os dados; rejeita links executáveis e estruturas incompatíveis. Cache de ranking é invalidado na restauração e reset.
- Agenda valida datas e horas; assunto sem correspondência deixa de ganhar exercício arbitrário.
- Feed termina com opção consciente de saída em vez de circular automaticamente.
- Datas de provas usam diferença entre dias locais para evitar erro de um dia por horário.
- Service Worker com nova versão de cache, mantendo conteúdo estático offline; headers Netlify revalidam HTML e Service Worker.
- Fixtures sintéticas, testes reais Chromium mobile/desktop, empacotamento separado e instruções reproduzíveis.

# Órbita Estudos — alterações

## 1.2.0 — 23/10/2026

- Implementado **Exercício do dia** condicionado a eventos de estudo de um snapshot importado do Google Calendar; não inventa tarefas nos dias sem bloco. Seleciona questão autoral elaborada pelo título/assunto do evento e apresenta resolução apenas após confiança informada.
- Criado banco de **10 exercícios elaborados** de Engenharia com método guiado, pistas, solução e dados numéricos; correção e autoavaliação registradas localmente, sem confundir autoavaliação com correção automática.
- Importação explícita e privada de snapshots de **Calendar, Notion e Drive** via Configurações, com indicador de data e ausência de sincronização em tempo real. Links de Drive e notas pessoais foram **removidos do código público**.
- Página **Preparação de provas / Exam Prep** com matérias, metas, erros priorizados, treino livre e simulado autoral de 3 a 5 questões por matéria, com relatório final.
- Página **Notas e metas P2** com cálculos locais para matérias com fórmulas conhecidas; valores hipotéticos destacados, mínimo arredondado para cima a centésimos.
- Quizzes agora exigem confiança antes da correção; revelação direta não conta como acerto; revisão é agendada após resposta com baixa confiança, erro ou ajuda.
- Feed prioriza matérias da agenda importada e dificuldades; permite troca de cartão por swipe vertical e horizontal; corrige associação incorreta de questões em cartões do tipo desafio.
- Service Worker com atualização preferencial pela rede e fallback offline; cache versionado, cabeçalhos de segurança para Netlify e orientação para instalação PWA.
- Testes automatizados em Node para renderização, importações, fluxo diário, notas, simulado, feed, persistência e isolamento de dados privados.

## Limitações conhecidas

- Sem OAuth ao vivo com Google Calendar, Notion ou Drive; apenas importação de snapshots privados.
- Sem tutor generativo de IA, processamento de PDFs, vídeos licenciados ou sincronização entre dispositivos.
- Não foi realizado teste em Safari iOS real; ambiente de navegador automatizado disponível bloqueou URLs por política administrada. Testes de lógica e integridade estática passaram.
- Não houve acesso autenticado ao Netlify, repositório Git ou sessão do Codex para deploy/automação externa.

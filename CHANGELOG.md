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

# Integrações 1.5.0

Backend implementado, **sem conexões reais ativas/testadas nesta sessão**. A configuração indispensável e limites de segurança estão em BACKEND-SETUP.md.

- Google Calendar: OAuth de servidor, lista de calendários por nome, ocorrências expandidas, janela de −7/+90 dias, America/Sao_Paulo. Classifica aula, estudo, revisão, simulado e prova; só blocos acadêmicos com código conhecido entram em exercícios. Provas próximas alimentam recomendação.
- Notion: OAuth de servidor, seleção de data source por nome e consultas somente leitura. Reconhece Matéria/Materia/subject, Conteúdo/Conteudo/topic, Prioridade/priority, Confiança antes da correção/Confiança/confidence, Revisar em/review_on, Status/status, Onde começou o erro/O que eu fiz/observation, Regra para próxima vez/next_rule e Tipo de erro/type. IDs de páginas deduplicam snapshots. Campos relacionais a outras bases não são resolvidos automaticamente. Histórico de aprendizagem do app fica local; escrita Notion não foi implementada nem autorizada.
- Drive: OAuth Google compartilhado com Calendar, pasta escolhida por nome, metadados de filhos diretos. Google Docs e texto podem ser extraídos de forma autenticada (até 1 MB), com referência, sem inventar páginas; PDF/OCR/diagramas e árvore recursiva completa não estão implementados. Trecho explicitamente escolhido vira cartão privado local. Links de YouTube encontrados são indicados como não verificados.
- Contas autorizadas e fontes escolhidas ficam em cookies protegidos. O app tenta atualização ao abrir, respeitando intervalo de 15 minutos; snapshots locais permitem estudo offline. Não é serviço de sincronização com o app fechado.

Importações 1.4 preservadas: Calendar JSON/ICS único sem TZID/recorrência; Notion JSON/CSV; links Drive JSON. Não são necessárias no fluxo OAuth, mas continuam como alternativa offline. Nenhum token deve ser colado no frontend ou em JSON de importação.

Vídeos públicos: 60 IDs/títulos conferidos em fontes oficiais MIT no GitHub por HTTP, com proveniência em commit fixo. YouTube/oEmbed bloqueado na rede: reprodução e duração exata não verificadas. Player sob consentimento; indisponibilidade pode ser marcada e excluída das recomendações.

Netlify: sem token/conector de deploy disponível. Projeto completo está pronto para deploy Git com funções; ZIP estático é somente frontend/offline. Não houve publicação nesta sessão.

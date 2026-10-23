# Órbita Estudos 1.4.0: simulados retomáveis e PWA com atualização controlada

A preparação agora permite escolher conteúdo, quantidade e objetivo P2/P3, retomar simulados após fechar a página e acompanhar histórico de resultados/revisões. O exercício diário permite escolher blocos e importar Calendar ICS/Notion CSV, além dos snapshots JSON existentes.

Corrige troca de cartão após responder no feed, timer reabrindo o resumo, falhas de backup/persistência, concorrência entre abas e navegação. O SW mantém um conjunto completo de assets por versão e aplica atualização por escolha do usuário. Dados acadêmicos permanecem locais; OAuth e deploy não são simulados.

Validação local: 21 unitários, 26 testes de integração/regressão, 11 verificações estáticas e 26 cenários Chromium, incluindo mobile/desktop, restauração, offline, quota, dados corrompidos, privacidade e migração SW 1.3 → 1.4. Detalhes em TEST-REPORT.md.

Pacotes gerados por allowlist em dist/, somente site/ no ZIP-Netlify. Safari físico, OAuth Calendar/Notion e publicação Netlify permanecem pendentes. As alterações estão na branch feat/orbita-1.4-integrated ligada ao PR #1; não houve merge em main.

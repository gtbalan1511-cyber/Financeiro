# Codex — Órbita Estudos

Você é o agente de desenvolvimento do Órbita Estudos, aplicativo PESSOAL de Engenharia Mecânica. Este repositório contém `site/` (app estático já funcional) e `_contexto_privado/` (anotações acadêmicas privadas). Leia `PRODUTO-E-ACEITE.md` ANTES de mudar código.

## Segurança e privacidade
- NUNCA publique `_contexto_privado/` ou notas pessoais em hospedagem pública. O ZIP COMPLETO não é arquivo de deploy.
- Não exponha APIs/tokens/secrets no JS cliente, HTML ou repositório público. Sem plano pago, cartão de crédito ou serviços que impliquem cobrança sem autorização explícita.
- Não descarte o site atual, que está funcionando no iPhone. Trabalhe incrementalmente, preserve backup e testes de regressão.
- Não copie arquivos, código nem branding do Astra AI; implemente recursos educacionais originais.
- Não trate links privados do Google Drive como arquivos públicos ou ingira conteúdo sem permissão.
- Não afirme integração com Calendar/Notion/Drive antes de ter autenticação, sincronização e testes reais. Os JSONs disponíveis são SNAPSHOTS DE REFERÊNCIA, não integração ao vivo.
- PWA em HTTPS/Netlify, iPhone Safari; dados acadêmicos devem permanecer privados. Ao publicar, cuide da autenticação e da separação de dados.

## Forma de trabalhar
- Ao iniciar, listar o que já funciona, reproduzir erros, executar testes e priorizar regressão/bugs antes de adicionar funcionalidades.
- Instalar a ferramenta mínima de teste (sem custo recorrente) se necessário. Incluir comandos de setup, testes e script de empacotamento.
- Propor e implementar o máximo de funcionalidades em uma passagem, não só design/mockup. Se algo exigir credencial ausente, criar adaptador inativo e documentar honestamente.
- Executar validação no navegador mobile 390x844 + desktop, teste de PWA, estados salvos/exportação/importação, quizzes, feed, datas e fuso.
- Manter `CHANGELOG.md`, `TEST-REPORT.md`, `NEXT-STEPS.md`. Ao terminar produzir ZIP de deploy SÓ de `site/` e um ZIP de código fonte separado, sem dados privados no ZIP de deploy.

## Atualização 1.2.0 — 23/10/2026
- Já implementados: `site/features.js`, importação local dos três snapshots em Configurações, tela Hoje, Exam Prep com simulado, notas/metas, confiança e revisão, correções de feed, privacidade e cache PWA.
- Leia `CHANGELOG.md`, `TEST-REPORT.md`, `NEXT-STEPS.md` e rode `TZ=America/Sao_Paulo node test_logic.cjs` antes de qualquer refatoração.
- O ZIP de código-fonte público **não contém `_contexto_privado/`**. Os snapshots ficam em ZIP pessoal separado; não devem entrar no deploy ou repositório público.
- Testes no Chromium deste ambiente ficaram bloqueados por política administrada; execute E2E num navegador autorizado e Safari real.

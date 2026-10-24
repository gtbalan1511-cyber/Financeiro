# Missão 02 — auditoria e decisão arquitetural

Auditoria anterior a mudanças de código: 24/10/2026. main 7c01f02 (1.3.0); ambas branches feat/orbita-1.4-integrated e feat/orbita-1.5-adaptive em 6b4db02 (package 1.5.0). PR #1 aberto/draft; descrição cita commit antigo. Código mais recente preservado, branch de trabalho feat/orbita-missao-02.

## Revisão de requisitos e arquitetura (método BMAD)

Não há ferramenta/skill BMAD ou REA instalada. Aplicam-se diretamente análise de requisitos, arquitetura, riscos, implementação e validação, sem alegar execução de ferramenta ausente.

Preservar frontend JavaScript/CSS, catálogo autoral, importações validadas, backend Node e rotas OAuth. Não há motivo técnico para migração a React ou app nativo. PWA responsiva suporta Windows/macOS/Safari e offline, com validação física iOS ainda necessária.

Inventário: 402 atividades em nove disciplinas, quizzes com confiança, 36 modelos, flashcards, simulados P2/P3, revisões, backup e histórico locais. Testes baseline: 65 Node + 26 VM + 15 estáticos. Backend possui autenticação pessoal e OAuth de leitura implementados; somente mocks comprovados. Sem banco, sincronização de progresso, tutor generativo, podcast ou extração PDF. Notion não escreve progresso. Materiais privados e históricos não constam do clone público.

## Decisão incremental

Frontend existente + servidor Node 24 LTS na mesma origem HTTPS + SQLite em volume persistente. SQLite transacional é suficiente para um aluno e evita dependência de serviço remoto. Não escalar para múltiplas instâncias com arquivo local. Dados do progresso cifrados em repouso com chave do servidor; banco fora da pasta pública, backups obrigatórios. Autenticação pessoal existente por cookie HttpOnly/Secure/SameSite e origem exata para escrita. Nenhum token no frontend.

Contrato: GET /api/progress retorna {revision,data,updatedAt}; PUT /api/progress recebe {revision,data}. Revisão zero para criação. Escrita condicional transacional, HTTP 409 quando a versão mudou e 422 para estado inválido. Não sobrescrever silenciosamente outro aparelho. Retransmissão de payload já aplicado é idempotente. Histórico cifrado limitado permite recuperar versões anteriores. Falha no banco retorna indisponibilidade, nunca sucesso local apresentado como sync.

Cliente guarda progresso antes de transmitir; metadados revision/dirty ficam locais. Sincroniza após login, abertura, online/foco e enquanto visível. Offline conserva fila implícita do último estado. Conflito mantém as duas versões: exportação, envio condicional da local ou adoção explícita da remota. Sessão de estudo em andamento adia aplicação remota. Não há promessa de execução em background com PWA fechado no iOS.

## Hospedagem avaliada

- Netlify/Vercel: funções sem disco durável; exigiriam banco separado. Não escolhidas para SQLite.
- Render/Railway: Node e disco/volume compatíveis; persistência pode exigir cobrança, proibida sem autorização.
- Cloudflare Workers + D1: opção gerenciada, exige portabilidade do Node/SQLite/OAuth e conta autorizada; custo e limites devem ser verificados na conta.
- VPS/contêiner existente com volume e HTTPS: reaproveitável se houver acesso e backup.

Alvo de implantação preparado: contêiner Node com volume /var/lib/orbita em host autorizado. Render é candidato operacional, não contratação nem garantia de plano gratuito. Não configurar volume pago automaticamente. Sem credenciais de infraestrutura no ambiente nesta auditoria; seleção final depende de disponibilidade real sem despesa. Rollback: preservar imagem/commit 6b4db02 e backup consistente do banco, manter domínio para preservar localStorage e cookies; nova origem exige exportar/importar os dados antigos.

## Verificação e riscos

Testar autenticação/origem, CAS, retransmissão, dados inválidos, limite do corpo, reinício, dois contextos, offline/reconexão e conflitos. Reexecutar regressões; adicionar Firefox e WebKit. Chromium/WebKit mobile não equivalem a iPhone físico. OAuth e APIs externas só serão ativos após cliente próprio, consentimento e operação real. IA permanece explicitamente desativada sem autorização/configuração; não criar despesas.

## Decisão final após preferência por configuração gratuita

Cloudflare Workers Free + assets + D1 Free, mesma origem HTTPS. Adapter dedicado em worker/index.js reaproveita createHandler; D1 executa SQL condicional e guarda dados cifrados. Servidor Node/SQLite é alternativa local ou host com volume existente, sem contratar Render/Railway. Configuração em wrangler.jsonc; ID zero é marcador explícito, nunca banco provisionado.

Documentação oficial conferida no repositório público cloudflare/cloudflare-docs (sites diretos retornaram 403): Workers Free inclui 100.000 requests dinâmicos/dia e 10 ms de CPU por invocação; assets têm uso gratuito. D1 Free tem 500 MB por banco, 5 GB por conta, Time Travel de 7 dias. Linha máxima 2.000.000 bytes. Progresso limitado a 1.000.000 bytes JSON antes da cifra/base64 para respeitar esse limite. Ao exceder, API rejeita, conserva cópia local e exige exportar/reduzir o histórico; não há arquivo privado enviado a assets. Limites e elegibilidade da conta deverão ser reconferidos antes da ativação; não autoriza plano pago. CPU e quotas precisam ser medidos na produção real.

Persistência validada nos dois adaptadores locais. Histórico cifrado retém 20 versões anteriores por trigger. Recuperação administrativa exige chave original e backup do D1; trocar a chave sem migrar torna versões ilegíveis. As chaves de cifra são segredos de servidor, sem possibilidade de recuperação se perdidas.

CLI wrangler whoami em 24/10/2026: 'You are not authenticated'. Nenhuma conta/ID de banco foi inventado nem recurso pago ativado. Deploy definitivo e operação OAuth real bloqueados por cadastro/autorização externa.

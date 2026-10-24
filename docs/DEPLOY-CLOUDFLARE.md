# Ativação gratuita — Cloudflare Workers + D1

**Alternativa existente:** foi localizada uma publicação privada Sites que já usa Workers. Sua atualização preservaria o domínio, mas o helper obrigatório do plugin não está disponível no runtime. Cliente Notion existente foi preservado. Evidências e rollback: [INFRA-ATUAL.md](INFRA-ATUAL.md). O guia abaixo descreve o caminho independente em conta Cloudflare própria.


Estado em 24/10/2026: código/Worker/D1 executados localmente; dry-run aprovado. **Sem deploy remoto:** `wrangler whoami` informou conta não autenticada. Não existe URL definitiva provisionada. Não usar preview temporário como produção pessoal. Nenhum serviço pago contratado.

## Ação externa indispensável

Criar/autorizar conta Cloudflare **Workers Free**, sem upgrade. Disponibilizar acesso seguro pelo ambiente ou configurar um token limitado ao Worker e D1 no secret `CLOUDFLARE_API_TOKEN` do GitHub, junto a `CLOUDFLARE_ACCOUNT_ID`. Não enviar token, senha ou client secret no chat. O cadastro deve ficar sob titularidade do usuário. Se a conta exigir plano pago, parar e não contratar.

Depois do acesso, o operador pode executar:

```sh
npm ci
npx wrangler whoami
npx wrangler d1 create orbita-progress
# Salvar o UUID retornado em ORBITA_DATABASE_ID (não é um segredo).
node tools/configure-cloudflare.cjs
npx wrangler d1 migrations apply orbita-progress --remote
```

Escolher a origem definitiva `<nome-do-worker>.<subdominio-da-conta>.workers.dev` ou domínio próprio já existente. Registrar `ORBITA_BASE_URL` com essa origem HTTPS exata (sem caminho). Não inventar subdomínio antes da conta existir.

Configurar com `wrangler secret put NOME`, em terminal privado/painel: `ORBITA_BASE_URL`, `ORBITA_OWNER_PASSWORD` (senha única de 16+ caracteres), `ORBITA_SESSION_SECRET` (32+ caracteres aleatórios). Guardar cópia segura da chave original: ela cifra progresso e sessões; não trocar sem plano de migração. Não colocar valores em Git, assets ou logs. Esta aplicação é pessoal, com um único proprietário; não é serviço multiusuário.

Para OAuth, criar clientes próprios e adicionar os segredos `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET`. Google: Calendar API e Drive API, cliente Web, escopos calendar.readonly e drive.readonly. Notion: integração pública OAuth com leitura das páginas selecionadas. Redirects exatos:

- `https://ORIGEM/api/oauth/google/callback`
- `https://ORIGEM/api/oauth/notion/callback`

Sem clientes autorizados, o estudo local e a persistência privada podem funcionar, mas Calendar/Drive/Notion permanecem desativados. OAuth usa cookies cifrados por aparelho; entrar em outro aparelho não transfere automaticamente consentimentos OAuth. Google em modo de teste pode expirar refresh tokens. Notion permanece somente leitura: envio de progresso/erros ao Notion ainda não implementado.

## Verificar e publicar

```sh
npm test
npm run test:browser
npm run test:multiplatform
npm run test:worker
npm run cloudflare:check
npm run cloudflare:deploy
# ORBITA_PRODUCTION_URL deve conter a origem HTTPS real.
node server/check-production.cjs
```

Esses comandos não substituem verificar a página publicada, entrar em dois aparelhos, resolver uma questão no computador, continuar no iPhone, desconectar/reconectar e comparar os dados do banco. Fazer consentimento OAuth e uma operação real em cada serviço. Publicação não está aceita só por resposta da CLI.

## CI/CD

`.github/workflows/cloudflare.yml` executa Node/VM/estáticos, Chromium, Firefox, WebKit, dois contextos com HTTPS/SQLite, Worker/D1 local, bundling e empacotamento. Deploy somente na main após verificação, quando houver `CLOUDFLARE_D1_DATABASE_ID` nas Variables do GitHub, `ORBITA_PRODUCTION_URL` nas Variables e os dois secrets Cloudflare. Secrets do Órbita são registrados diretamente no Worker, não copiados ao frontend. Sem essas variáveis, job de deploy não roda. A presença do YAML não prova execução remota.

## Preservação e rollback

Antes de mudar de domínio: exportar backup do navegador atual e conferir o arquivo. localStorage não migra entre origens. A publicação antiga permanece intacta; não apagar o site antigo ou dados pessoais.

Antes de substituir produção: registrar ID de versão do Worker e bookmark de Time Travel (`wrangler d1 time-travel info orbita-progress`). Fazer exportação do D1 em armazenamento privado (`wrangler d1 export orbita-progress --remote --output CAMINHO_PRIVADO`). Mesmo cifrado, backup do banco não deve entrar em repositório/artefato público.

Rollback de código: `wrangler rollback ID_DA_VERSAO`. Migração atual é aditiva; dados do progresso não são apagados. D1 Free oferece Time Travel por 7 dias conforme documentação consultada; validar disponibilidade real na conta. Restauração de banco é destrutiva e exige avaliar dados posteriores antes de executar. `progress_history` mantém 20 versões cifradas adicionais; recuperação administrativa exige chave original. Não expor SQL/admin ao cliente.

## Limites materiais

Workers Free: 100.000 requests dinâmicos/dia, 10 ms de CPU/invocação. Assets gratuitos. D1 Free: banco de até 500 MB e 5 GB/conta; linha até 2 MB. API aceita estado com no máximo 1 MB de JSON para comportar cifra/base64; ao exceder, preserva o local e exige exportação/gestão do histórico. Medir CPU/quotas e confirmar o Free na conta antes de aceite. Não há upgrade automático autorizado.

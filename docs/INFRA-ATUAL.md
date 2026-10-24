# Infraestrutura existente localizada — 24/10/2026

A investigação adicional pelo plugin Sites encontrou duas publicações anteriores. A mais recente mantém a origem:

https://orbita-estudos-140-gabriel.alighttrail9.chatgpt.site

É uma publicação privada do proprietário, não uma URL de produção da versão 1.6.0. A página e `/api/status` retornaram HTTP 200 com acesso de serviço autorizado do plugin. A página ainda não carrega `progress-sync.js`. Não foi modificada nesta rodada.

Estado reportado pela API existente: `configured=true`, Google `configured=false/connected=false`, Notion `configured=true/connected=false`, `readOnly=true`. Nomes dos segredos Notion existem na hospedagem; valores redigidos não foram lidos, exportados ou substituídos. Cliente configurado não significa consentimento, operação real ou sincronização validada. Nenhuma operação real Calendar/Drive/Notion foi executada pelo Órbita nesta rodada.

Rollback preservado: versão Sites 4, fonte `5a7253bf903e743039d34ec38440efc549952576`, version ID `appgprj_6adb69d74ffc8191af7a77e0419bd48d~appgver_443b7e3914508191a696a7f2b3687f14`. Acessibilidade permanece limitada ao proprietário; não se mudou audiência. Não se criou novo Site nem se substituiu o domínio.

## Bloqueio técnico no caminho Sites

Skill aplicada: `skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md`.

Instruções explícitas: “Existing hosted Site: retain its project_id and audience, call get_site and create_source_repository_write_credential, and open with the source helper before editing” e “For hosted work, package with the source helper”.

O helper `scripts/site-workflow.mjs` não existe nos caminhos acessíveis do ambiente; nenhum pacote de skills executor foi disponibilizado, e as tentativas de leitura pelo pacote cloud falharam. Portanto não foi possível executar o workflow suportado de abertura, empacotamento e sincronização dessa publicação. A credencial de repositório recebida permaneceu somente em memória; não foi gravada em arquivo, Git, frontend ou passada em argumentos de shell. A tentativa de obter o artefato antigo pela referência de arquivo retornou “file could not be authorized or resolved”; não foi contornada.

Para atualizar preservando a origem atual, disponibilizar o runtime completo do plugin Sites com seus helpers. A alternativa preparada no repositório é Cloudflare Workers + D1 em conta própria gratuita; esse caminho exige autorizar a conta Cloudflare. Não declarar ausência de acesso à publicação antiga como se ela não tivesse sido localizada.

## CI remoto verificado

Commit de implementação `9118fcee11ef0322d47bafab6e30aabc74822bd4`:

- Orbita CI and release package, execução 40061954155: job verify concluído com sucesso.
- Verify and deploy Orbita on Cloudflare, execução 40061954130: job verify concluído com sucesso (Node, Chromium/Firefox/WebKit, Worker/D1 local, bundling, build). Job deploy pulado: branch não é main e configuração de produção não foi provisionada.

Não houve deploy apenas por existir um job com esse nome. A verificação de testes de código está aprovada; aceite de produção permanece pendente.

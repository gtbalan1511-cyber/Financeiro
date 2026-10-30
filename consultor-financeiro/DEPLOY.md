# Publicação

Site privado registrado no Sites:

- Projeto: `appgprj_6ae491cf832881918e7357ab79c04327`
- Endereço previsto: https://clareza-financeira-gabriel.gtbalan1511.chatgpt.site
- Diretório estático: `site/`, declarado em `.openai/hosting.json`.

A confirmação final do deploy é dada pelo retorno de publicação e entregue no chat. Um endereço previsto não é prova de publicação. Nenhum dado financeiro local é enviado no deploy. O acesso privado à interface não cria sincronização do banco entre aparelhos.

Pacote alternativo: `npm run build` gera `dist/clareza-deploy.zip` contendo somente os arquivos da interface, pronto para uma hospedagem estática HTTPS. `dist/clareza-fonte.zip` contém código, documentação e testes sintéticos, sem dados privados do usuário.

## Release e atualização

1. Rodar `npm test` e `npm run test:browser`.
2. Incrementar o nome do cache em `site/sw.js` ao mudar recursos da interface.
3. Manter o mesmo domínio/origem para preservar IndexedDB do usuário. Trocar domínio exige exportar/restaurar backup.
4. Empacotar somente `site/` e manifesto da hospedagem para publicação. Nunca incluir bancos, backups, `_contexto_privado/` ou arquivos de outros projetos.
5. Publicar como privado, preservando a audiência. Confirmar status de implantação antes de informar sucesso.

A aplicação estática pode ser servida por qualquer hospedagem HTTPS; os cabeçalhos em `_headers` precisam de suporte do provedor. Nenhuma variável de ambiente ou segredo é necessário para o funcionamento local.

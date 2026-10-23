# Órbita Estudos 1.4.0

PWA pessoal para Engenharia Mecânica, desenvolvido incrementalmente sobre a versão 1.3. Aplicação estática em HTML/CSS/JavaScript; não depende de API paga, backend ou conta conectada para estudar. Questões e diagramas são autorais; não são provas oficiais nem cobrem integralmente o currículo da FEI.

## Recursos

- Exam Prep P2/P3 por disciplina, conteúdo e quantidade (1/3/5/10, limitado ao banco disponível); sequência priorizada por erros ativos, bloco de estudo, prova próxima e revisão vencida.
- Simulado retomável após reload, relatório e histórico por matéria; respostas independentes, confiança, ajuda e consulta distinguidas; classificação de dificuldade e feedback pedagógico.
- Revisão espaçada de questões e flashcards: 3/7/14/30/60 dias para acertos independentes confiantes; 1 dia para erro/ajuda/baixa confiança. Repetir cedo não infla retenção.
- Exercício diário com escolha entre blocos, próximos estudos em horário local e dificuldades importadas; não usa aulas genéricas ou inventa correspondência de assunto.
- Importação local Calendar JSON/ICS e Notion JSON/CSV, além de links HTTPS de Drive; histórico local de revisões. Sem sincronização OAuth ao vivo.
- Feed finito, swipe vertical, diagramas SVG originais, simulações de vibração/condução, desafios com confiança, sessões de 5/10/15 minutos e encerramento explícito. Visualizações não contam como acertos.
- Backup JSON, restauração transacional, proteção contra sobrescrita entre abas, recuperação de dados corrompidos e avisos de falha de persistência.
- PWA offline com cache estático por versão e atualização controlada em Configurações. Campos e alvos de toque adaptados ao iPhone e redução de movimento respeitada.

## Desenvolvimento e validação

Python 3, Node.js 22+ e Chromium (para E2E).

```sh
npm ci
TZ=America/Sao_Paulo npm test
npm run test:browser
npm run build
npm start
```

O teste de navegador inicia e encerra seu próprio servidor e navegador. Usa `/usr/bin/chromium` se disponível, ou navegador instalado pelo Playwright; `CHROMIUM_PATH` substitui o executável. Em outra máquina: `npx playwright install --with-deps chromium`. `npm start` serve somente `site/` na porta 4173. Não sirva a raiz do repositório em hospedagem pública.

`npm run build` executa testes unitários, regressão e verificações estáticas e gera em `dist/`:

- `Orbita-Netlify-1.4.0.zip`: somente site público, index.html na raiz.
- `Orbita-Codigo-Fonte-1.4.0.zip`: código, testes, documentação e fixtures sintéticas (incluindo código público antigo para teste de atualização).
- `SHA256.json`: integridade dos ZIPs.

Não há transpiler: o build desta arquitetura é validação + empacotamento. Resultados de navegador ficam em BROWSER-RESULTS.json; testes de lógica em TEST-RESULTS.json. A CI executa os mesmos comandos antes de produzir o artefato.

## Publicação Netlify

Sem publicação realizada nesta sessão: falta acesso de deploy autorizado à conta do site existente. O endereço antigo não indica disponibilidade desta versão.

1. Exporte seu progresso e guarde o deploy anterior.
2. No site existente da sua conta Netlify, envie **apenas** `Orbita-Netlify-1.4.0.zip` como deploy manual.
3. Alternativa: conecte este repositório ao site, escolha a branch desejada e publique `site/`; `netlify.toml` já define a pasta. A branch de desenvolvimento é `feat/orbita-1.4-integrated`, ligada ao PR #1; esta entrega não mescla na main.
4. Confirme `v1.4.0` no rodapé, HTTPS, manifest e ausência de erros. `_headers` configura CSP e revalidação de HTML/SW.
5. Em uma instalação antiga, abra Configurações → Verificar atualização. Depois de exportar backup e finalizar o simulado, aplique a atualização disponível. Uma instalação 1.3 usa seu mecanismo anterior até receber a página nova; pode precisar fechar/reabrir a aba online.

## Testar no iPhone

1. Abra o domínio HTTPS no Safari → Compartilhar → Adicionar à Tela de Início.
2. Abra o ícone online; responda uma questão informando confiança. Feche e reabra; confira Progresso.
3. Em Exam Prep, configure um simulado. Responda, feche e reabra, e use Retomar simulado; conclua e confira o histórico.
4. Exporte backup em Configurações; restaure-o e confira tentativas, notas, provas e imports.
5. Ative modo avião, reabra e responda outra questão. Reabra novamente para conferir persistência. A primeira visita precisa ser online.
6. No feed, deslize no corpo do cartão, ajuste os simuladores e encerre a sessão. O gesto não deve trocar cartões quando estiver usando um controle.
7. Teste uma atualização online pelo painel de Configurações; o progresso deve permanecer. Caso apareça aviso de armazenamento, exporte backup antes de fechar.

Chromium mobile/desktop e migração de SW são automatizados; Safari físico e instalação standalone ainda exigem teste no aparelho. Armazenamento do iOS pode ser removido pelo sistema; backups periódicos continuam essenciais. Não há sync entre aparelhos/domínios.

## Privacidade e integrações

Snapshots e backups reais ficam fora do repositório público e do deploy. Os exemplos em `tests/fixtures/` são sintéticos. Dados privados importados são armazenados localmente, não enviados ao servidor; backups exportados passam a conter esses dados e devem permanecer privados. Não cole tokens no app.

OAuth Google Calendar/Notion e publicação automatizada precisam das conexões especificadas em [INTEGRATIONS.md](INTEGRATIONS.md). Sem backend autenticado, esta versão mantém importação manual. PDF, tutor generativo e sincronização entre aparelhos seguem pendentes. Consulte [auditoria](AUDIT-1.4.md), [testes](TEST-REPORT.md), [changelog](CHANGELOG.md) e [pendências](NEXT-STEPS.md).

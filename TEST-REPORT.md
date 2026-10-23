# Testes — 1.3.0 — 23/10/2026

Executados nesta entrega, sem reaproveitar alegações da versão anterior:

- `TZ=America/Sao_Paulo node test_logic.cjs`: 26/26 aprovados. Quizzes, confiança, resolução sem acerto fictício, importações sintéticas, exercício diário, notas, simulado, persistência, validação de estruturas e URLs e proteção contra dupla correção. Resultado em TEST-RESULTS.json.
- `python test_static.py`: 11/11 aprovados. Sintaxe dos quatro scripts, manifest, assets offline, ordem de carregamento, headers e verificações de ausência de dados privados/segredos conhecidos. Não é uma auditoria de segurança completa.
- `node tests/browser.cjs`: Chromium headless, 390×844 e 1440×900. Em ambas as dimensões: nove matérias, quiz com confiança, persistência após reload, download e reimportação de backup, três snapshots sintéticos, exercício diário Hill, navegação, ausência de overflow horizontal nas páginas verificadas, simulado completo, fim consciente do feed, recarga offline via Service Worker e nenhuma exceção JavaScript capturada. Resultado em BROWSER-RESULTS.json.
- `python package.py`: empacotamento estático e checagem de index.html na raiz do deploy, excluindo fixtures e diretórios privados. Não há compilação/transpilação exigida pela arquitetura. O ZIP-fonte foi extraído em diretório temporário e sua suíte de lógica passou novamente (26/26); o ZIP de deploy contém 12 arquivos com index.html na raiz.

## Falha inicial e correção

O teste original dependia de `_contexto_privado/`, inexistente no ZIP público, e de identificador privado específico. A suíte agora usa fixtures sintéticas redistribuíveis. Não recuperamos nem inventamos dados reais do usuário.

## Não validados

Safari/iPhone real, instalação pela tela inicial e comportamento do armazenamento sob pressão no iOS; gestos físicos e modo standalone; publicação HTTPS e aplicação dos headers no Netlify; atualização partindo de uma instalação antiga 1.2.0; integrações OAuth e dados acadêmicos reais. WebKit não estava instalado e o download retornou HTTP 403 (Domain forbidden). Os domínios de download foram adicionados ao rascunho de rede, sem mudança efetiva observada na instância.

Testes de navegador usam HTTP local, permitido para Service Worker em loopback. Isso demonstra offline nesse navegador, não instalação no iOS. Testes não asseguram exatidão integral de todo conteúdo pedagógico; recomenda-se revisão com professor.

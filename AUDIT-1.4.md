# Auditoria técnica — Órbita 1.4.0

Escopo: lidos os seis documentos obrigatórios, aplicação estática completa (`app.js`, `features.js`, `data.js`, HTML, CSS, manifest, SW, headers), empacotamento, testes e CI. Continuação incremental da versão 1.3, sem substituição da arquitetura.

## Achados e correções

- Resposta do feed limpava seu ranking durante a correção, podendo exibir outro cartão; estados também podiam vazar após filtrar/salvar. Ranking agora é estável durante a navegação, reiniciado ao entrar novamente; confiança e resposta ficam associadas ao cartão e à tentativa. Voltar ao desafio não duplica evidência antes do próximo reteste.
- Timer vencido deixava a sessão ativa e reabria o resumo continuamente. Expiração agora encerra o timer antes de abrir o resumo; encerramento manual disponível.
- Simulados existiam apenas em memória e não persistiam relatórios. Estado atual, respostas, índice e histórico agora são persistidos. Filtros ficam indisponíveis dentro do simulado para não misturar sequências.
- Revisão era fixa em 1/7 dias; agora aumenta 3/7/14/30/60 para acertos independentes confiantes, retorna a 1 com erro/ajuda/insegurança. Consulta é distinguida de erro. Flashcards também têm agenda local.
- Importação poderia anunciar sucesso mesmo com falha no localStorage. Snapshot/backup só substituem os dados em memória depois da gravação persistente. Falhas de quota mostram aviso persistente. Dados corrompidos são preservados para exportação; outra aba bloqueia sobrescrita silenciosa.
- Validação de backup aceitava registros internos nulos. Nova validação estrutural e proteção a chaves de protótipo impedem falhas de renderização e URLs executáveis/credenciais embutidas. Tamanho é verificado antes da leitura do backup.
- Primeiro bloco era obrigatório; agora todos os blocos de estudo são selecionáveis e os próximos aparecem por horário local. Aulas não são usadas como exercício diário. Assunto desconhecido não recebe questão inventada; bloco genérico pode usar dificuldade ativa.
- SW network-first podia misturar arquivos de versões diferentes e assumir controle automaticamente. Cache estático completo por versão e ativação explícita em Configurações; endpoints privados não são armazenados. Atualização bloqueada durante simulado ou falha de armazenamento.
- Navegação interna não criava histórico. Rotas principais usam histórico do navegador e respondem a Voltar; links com hash abrem a tela correspondente.
- Campos menores que 16 px provocavam zoom de formulário no iOS; tamanho e alvos de toque corrigidos, área segura e movimento reduzido respeitados.
- Fórmula geométrica com P1=0 exibia infinito; agora informa indisponível.

## Arquitetura e limites

Sem backend, autenticação, telemetria ou API paga. `features.js` contém regras puras/importadores; `app.js` conserva renderização e eventos; `data.js` contém biblioteca autoral pública; localStorage mantém dados pessoais por domínio; SW guarda somente assets públicos.

Os testes são evidência delimitada, não comprovação de Safari físico, conteúdo pedagógico integral ou integrações externas. O banco continua introdutório e o objetivo P2/P3 não altera fórmulas oficiais. Regras de integração em INTEGRATIONS.md; resultados em TEST-REPORT.md.

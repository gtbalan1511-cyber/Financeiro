# Cobertura de conteúdo — Órbita 1.5.0

| Critério | Quantidade entregue | Evidência / limite |
| --- | ---: | --- |
| Cartões/atividades distintos | 402 | 153 explicações, 153 desafios, 36 simulações e 60 referências de vídeo |
| Conceitos-base autorais | 153 | 17 por disciplina; explicação e desafio são atividades diferentes do mesmo conceito, não 306 conceitos |
| Desafios distintos | 153 | Enunciados únicos, quatro alternativas, gabarito, pista e explicação |
| Simulações | 36 | Modelos computacionais distintos; parâmetros, curva, resultado e explicação; controles testados |
| Vídeos com metadados conferidos | 60 | IDs únicos e títulos encontrados via HTTP 200 nos arquivos oficiais MIT OCW, em commits fixos |
| Vídeos com reprodução validada | **0** | YouTube direto bloqueado por rede; não confundir verificação de metadados com reprodução atual |
| Disciplinas | 9 | Todas com pelo menos 17 conceitos e 17 desafios |

Distribuição completa em CONTENT-COVERAGE.json. As 60 referências estão em content/videos.sources.json; a checagem HTTP de cada fonte está em VIDEO-VERIFICATION-RESULTS.json. Não há vídeos baixados ou republicados. O player é oficial, carregado somente por ação do usuário. Não se presume licença individual de cada vídeo: o catálogo registra esse limite e aponta para a fonte.

Os vídeos são em inglês, provenientes de 2.003SC Engineering Dynamics, 6.002 Circuits and Electronics e 8.01SC Classical Mechanics, MIT OpenCourseWare. Os vídeos se concentram em dinâmica, fundamentos mecânicos e circuitos; não há cobertura audiovisual equivalente nas nove disciplinas. Há 20 aulas longas estimadas em 55 minutos que não entram na fila de até 30 minutos, mas ficam na Biblioteca de vídeos. As outras 40 referências têm estimativa de 10 minutos; durações exatas não foram verificadas. O planejamento é estimativo e o timer respeita a duração escolhida.

## Integridade e qualidade

- Nenhum ID duplicado. Vídeos deduplicados pelo youtube_id, inclusive aliases de recursos que apontam à mesma aula. Enunciados autorais e textos-base passam por verificação de duplicação exata.
- 153 conceitos escritos como explicações originais e perguntas específicas, sem placeholders ou simples troca numérica de um mesmo enunciado.
- Uma explicação e um desafio do mesmo conceito são contados como duas atividades de formatos diferentes, explicitamente. Não se usa essa contagem para afirmar 402 conceitos independentes.
- Revisão técnica/pedagógica humana permanece pendente; banco é introdutório e não equivale ao programa completo nem a provas oficiais da FEI. Verificações automáticas não substituem revisão conceitual.
- Simulações mostram hipóteses, unidades e grandezas do gráfico. São ferramentas educacionais, não dimensionadores certificados. Modelos lineares e idealizações têm faixas limitadas.
- Nenhum material privado do usuário foi extraído sem acesso. O adaptador de Drive permite trechos locais após consentimento, mas a conexão real não foi testada.

## Renovação

`site/catalog/v1.json` é um catálogo público estruturado, separado do código principal. `content/lessons.tsv` e `content/videos.sources.json` são fontes editoriais; `tools/build-catalog.cjs` valida e gera o catálogo. A aplicação busca a versão publicada ao abrir e em Configurações, valida antes de instalar e mantém cópia válida offline. Atualização fica adiada durante simulado/sessão ativos.

Há verificação semanal de fontes autorizadas em `.github/workflows/catalog-audit.yml`, por artefatos de auditoria, sem editar conteúdo ou fazer deploy automaticamente. Novos conteúdos passam por revisão no Git; não existe geração de IA paga nem raspagem indiscriminada. A existência do workflow não significa que a execução remota já foi confirmada.

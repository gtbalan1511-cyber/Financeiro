# Validação — 30/10/2026

## Motor: 22 testes aprovados

`npm test` executa cenários A–E obrigatórios e testes de centavos, conservação de valores e partes em milhares de combinações de parcelamento, datas de fim de mês, receita extraordinária, previsão salarial sem receita fictícia, recebíveis fora do gasto livre, estornos proporcionais e após quitação, recorrência por ocorrência, duplicidades, backup inválido, URL executável, reembolso acima da parte após estorno, reflexão, envelope sem dupla contagem e limites de lazer.

| Cenário obrigatório | Resultado |
|---|---|
| A: 1.500 de fatura, 900 Gabriel, 600 Mãe, reembolso 400 | Pendente da Mãe: exatamente 200; consumo: 900 |
| B: transferência de 500 para reserva | Consumo e patrimônio inalterados |
| C: conserto 800 em 2 períodos | 400 por período |
| D: compra de 250 com obrigações e envelopes | Usa caixa protegido/projeção; rejeita financeiramente quando insuficiente |
| E: pagamento integral da fatura | Reduz caixa e dívida; não duplica consumo |

## Navegador

Chromium, desktop 1440×1000 e viewport 390×844, execução automatizada real:

- cadastro de conta, salário configurado e recebido;
- importação CSV e revisão dos responsáveis Gabriel/Mãe;
- reembolso parcial e saldo a receber exato;
- plano do carro 800/2 e desejo perfume 250;
- análise e consultor consultando dados gravados;
- persistência após reload, exportação e restauração do backup;
- nove telas sem overflow horizontal do documento;
- reload offline após cache do PWA;
- nenhuma exceção JavaScript capturada.

Testes separados com arquivos **sintéticos identificados como testes** confirmam importação de XLSX e PDF textual, possível duplicidade desmarcada e auditoria. Não foram usados dados financeiros reais do usuário nem pré-carregados na aplicação.

Resultados detalhados em `BROWSER-RESULTS.json`. Capturas locais produzidas pelo teste são excluídas do código e dos pacotes públicos.

## Regressão do projeto existente

26/26 testes de `TZ=America/Sao_Paulo node test_logic.cjs` do Órbita Estudos aprovados antes da implementação. Nenhum arquivo da aplicação existente alterado.

## Dependências e verificações

`npm audit --omit=dev` terminou com zero vulnerabilidades conhecidas reportadas. Sintaxe dos módulos verificada com Node. Recursos de importação empacotados localmente; sem CDN em tempo de uso.

## Limites da evidência

Viewport móvel em Chromium não é teste em Safari/iPhone físico. PDFs foram validados com um layout textual sintético; variações de bancos e digitalizações não são garantidas. Não foram testadas integrações de IA paga, sincronização ou autenticação de um banco em nuvem, porque não estão implementadas. Publicação e acesso remoto são verificados separadamente em DEPLOY.md.

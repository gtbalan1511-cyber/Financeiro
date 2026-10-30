# Arquitetura e modelo financeiro

PWA estática em JavaScript ES Modules, CSS responsivo e IndexedDB. Não usa servidor para dados financeiros, nem serviços pagos. Bibliotecas de importação locais: PapaParse (CSV), SheetJS (XLSX), PDF.js (extração textual, eval desativado). Bibliotecas sob suas licenças em THIRD-PARTY.md e vendor. Backups não devem entrar no código fonte.

## Persistência

Banco `clareza-financeira-v1`, object store `vault`, chave `state`. O estado versionado agrega contas, movimentos, compras por parcela, compromissos, planos, desejos, regras, preferências e auditoria. Salvamento valida todas as invariantes e grava dados + auditoria na mesma transação. Auditoria registra UUID, data UTC, ação e objetos antes/depois. Verifica última revisão antes de gravar; uma aba desatualizada precisa ser recarregada, evitando sobrepor silenciosamente alterações. Restauração é explícita e substitui o banco, com novo registro de auditoria.

## Entidades

| Entidade | Campos principais / semântica |
|---|---|
| account | id UUID, nome, saldo inicial em centavos, finalidade cash/emergency/investment, data da base |
| entry | id, data, tipo, valor positivo em centavos, conta, destino opcional, referência de compra/pessoa/fatura/ocorrência |
| purchase | id por parcela, grupo, data da compra, cartão, vencimento, valor da parcela, categoria, partes pessoa/centavos |
| bill | compromisso único ou mensal, valor conhecido ou null, data inicial, categoria, conta prevista, prioridade, estimativa |
| goal | despesa futura, custo conhecido ou null, reservado, vencimento, períodos restantes, prioridade |
| wish | valor, reservado, data de criação/desejada, reflexão via configuração, prioridade, status, URL validada |
| rule | descrição exata → pessoa/categoria; aplicado apenas como sugestão revisável na importação |
| settings | salário configurável, dia, conta, margem extra, reflexão e limites de categoria |
| audit | evento com mudanças antes/depois; não é assinatura criptográfica e não resiste a manipulação do dispositivo |

## Invariantes e reconhecimento

- Valores em centavos inteiros seguros; rejeita frações de centavo e totais fora do limite seguro. Formatação BRL só na interface.
- Compra e consumo são reconhecidos na data da compra, somando parcelas sem contar o pagamento da fatura como nova despesa.
- Obrigação bancária = total da fatura − estornos − pagamentos. Crédito decorrente de estorno após quitação é ativo no cartão, sem aumentar caixa.
- Consumo pessoal = despesas pessoais à vista + parte de Gabriel nas compras − estornos correspondentes. Dinheiro enviado a terceiros é apresentado separadamente e sai do patrimônio, sem criar empréstimo a receber.
- Reembolso é vinculado a compra/parcela e pessoa. A receber = parte de terceiros após estorno − reembolsos. Não altera salário nem consumo pessoal.
- Transferência: debita origem e credita destino, patrimônio e consumo preservados. Investimentos/reserva são contas protegidas, sem rentabilidade suposta.
- Patrimônio líquido = saldos das contas − faturas pendentes + recebíveis + créditos no cartão. Saldos iniciais não contam como receita.
- Partes somam o valor da compra. Parcelas distribuem restos em centavos e conservam valor total e cada parte. Reembolsos e estornos não podem superar seus vínculos.
- Duplicidade usa data, descrição normalizada, valor, cartão e vencimento. É uma heurística conservadora: duas compras realmente iguais exigem descrição que as distinga.
- Pagamento de compromisso identifica a ocorrência; uma conta mensal não é quitada indefinidamente.
- Envelope é afetação virtual do caixa de uso diário. Não altera patrimônio nem cria despesa. Pagamento do plano libera seu envelope e registra despesa, evitando subtração dupla.

## Disponibilidade

1. Caixa: somente contas de uso diário. Reservas e investimentos em contas separadas não entram.
2. Subtrai envelopes financiados de planos e desejos ativos e margem de segurança escolhida.
3. Simula diariamente 90 dias: faturas integrais, contas únicas/mensais pendentes (atrasadas no dia de hoje), salário previsto nas datas configuradas e aportes faltantes dos planos.
4. Aporte por período = teto((meta − reservado) / períodos restantes); distribui o restante sem ultrapassar a meta. O primeiro aporte é protegido hoje e os demais em intervalos mensais, limitados ao vencimento.
5. Livre = máximo(0, menor saldo diário simulado, incluindo o dia atual). Recebíveis não recebidos não financiam consumo. Salário futuro é explicitamente estimativa.
6. Análise de desejo permite usar sua própria reserva: disponível para esse desejo = livre + sua reserva. Compra avaliada e saldo restante são exibidos, além das prioridades protegidas. Reflexão, pendências sem preço e margem pequena causam atenção. Decisão final é do usuário.

Confirmado nas projeções significa saldo inicial e obrigações com valores definidos, não garantia de que uma saída ocorrerá na data exata. Estimativas acrescentam salário futuro, contas estimadas e contribuições futuras dos planos. Envelopes não são subtraídos na projeção de **saldo bancário**, pois não são saída; são protegidos no indicador **livre**. Créditos de cartão e recebíveis não entram no saldo bancário.

## Segurança e extensões

Sem credenciais na interface. Textos escapados; URLs de desejos somente HTTP(S); fórmulas CSV escapadas; CSP na hospedagem compatível via `_headers`. Importação local com limite de tamanho e revisão. Não há telemetria. PWA armazena apenas recursos públicos da interface no cache; o banco local fica no IndexedDB.

Sincronização futura exige serviço autenticado, propriedade por usuário, políticas de acesso e resolução de conflitos. IA futura deve receber snapshot determinístico mínimo e nunca escrever saldos diretamente; chamadas somente no servidor, com quota, confirmação de alterações e controle de custos. Nenhuma dessas integrações está ativa nesta versão.

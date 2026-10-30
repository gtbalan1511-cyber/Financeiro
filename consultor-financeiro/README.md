# Clareza — consultor financeiro pessoal

Aplicação funcional e isolada de `site/` (Órbita Estudos). Não modifica a aplicação acadêmica do repositório.

## Usar

Abra a publicação HTTPS indicada em `DEPLOY.md`. No iPhone: Safari → Compartilhar → Adicionar à Tela de Início. Sem dados pré-carregados.

1. Na visão geral, cadastre uma conta com seu **saldo atual**, sem duplicar salário já incluído nesse saldo.
2. Em Configurações, configure salário líquido e dia de recebimento. Registre o recebimento somente se ainda não está incluído no saldo inicial.
3. Em Cartão compartilhado, importe CSV/XLSX/PDF textual, identifique colunas e revise pessoas/valores. Desconhecidos ficam explicitamente pendentes. Divida compras após importar; registre reembolsos e pagamento da fatura por seus botões próprios.
4. Em Planejamento, cadastre contas fixas e planos futuros. Informe exatamente quantos salários/períodos faltam para juntar o valor. Um conserto de R$ 800,00 em dois períodos sugere R$ 400,00 por período.
5. Em Meus desejos, cadastre o perfume e use “Posso comprar?”. No consultor, pergunte pelo nome do desejo para utilizar também a reserva específica e o período de reflexão.
6. Exporte backups regularmente. Para trocar de aparelho, exporte e restaure explicitamente. Não há sincronização automática.

## Execução local

Requer Python 3 e Node 20+ (testes). A aplicação já inclui bibliotecas de importação locais e não requer `npm install` para funcionar:

```sh
cd consultor-financeiro
npm start
# http://localhost:4180
npm test
npm run build
```

`localhost` permite testar PWA no computador. iPhone exige hospedagem HTTPS: um servidor no computador não é acessível por `localhost` do iPhone. Uso abrindo `index.html` pelo app Arquivos não é suportado.

Para restaurar dependências dos importadores: `npm ci --ignore-scripts`. Não há dependências remotas durante o uso. Para testes no navegador: `npm ci`, `npx playwright install chromium`, `npm run test:browser`. Se usar Chromium do sistema, configure `CHROMIUM_PATH=/usr/bin/chromium`. Playwright é apenas dependência de desenvolvimento.

## O que funciona

- IndexedDB, transações atômicas, histórico com antes/depois, detecção de alteração concorrente em outra aba.
- Receitas recorrentes e extraordinárias, despesas, dinheiro enviado a terceiros, transferências entre contas, faturas, reembolsos e estornos distintos.
- Importação local com revisão CSV/XLSX (primeira planilha) e PDFs textuais reconhecíveis; limite de 10 MB/2.000 linhas/60 páginas. PDF digitalizado e layouts desconhecidos não usam OCR e não são inventados.
- Cartão com partes por pessoa, parcelas manuais futuras, reembolsos por compra e pessoa, pagamento integral/parcial e estornos proporcionais.
- Regras recorrentes de pessoa/categoria por descrição exata, editáveis; possíveis duplicidades bloqueadas antes de gravar.
- Contas mensais, pagamentos por ocorrência, planos com custo desconhecido sem substituir por zero, envelopes e aportes por período.
- Desejos, reflexão configurável, reservas e registro de compra à vista.
- Orçamentos mensais de categoria e indicação de excesso/compensação, sem porcentagens impostas.
- Projeção 30/60/90, disponibilidade baseada no menor saldo diário, separação confirmado/estimativa.
- Consultor local por intenções e regras, com leitura dos registros e cálculos auditáveis. Não é um LLM nem aceita conversação financeira irrestrita.
- Patrimônio, contas de reserva/investimento, aportes e reconstrução histórica a partir da base declarada.
- Busca, filtros, relatórios de terceiros por fatura/mês, mensagem de cobrança copiável, exportação JSON/CSV, restauração validada.
- PWA offline com todos os importadores em cache após primeira abertura.

## Limites importantes

- **Dados locais, sem sincronização:** publicar a interface não envia seu banco financeiro à nuvem. Cada aparelho/navegador tem seu próprio banco. O deploy privado protege a distribuição da interface; a proteção do banco local depende do dispositivo e do navegador. Não há criptografia local própria nem login do banco financeiro.
- Backup JSON contém dados em texto e todo o histórico. Guarde-o em local privado. Navegadores podem apagar armazenamento; há solicitação de persistência e aviso na interface.
- **IA paga não integrada.** O consultor por regras é funcional sem chaves e não faz chamadas de API. Uma futura integração precisa de backend com autenticação e limites de custo; nunca coloque uma chave no cliente.
- Sem Open Finance, conexão bancária, WhatsApp automático, cotações ou rentabilidade presumida. A cobrança é somente texto para copiar.
- Importar uma linha de fatura significa importar **a parcela daquela fatura**, sem recriar automaticamente parcelas futuras. O cadastro manual de compra parcelada gera todas as parcelas. Não use ambos para a mesma compra sem conciliar para evitar duplicidade.
- Reserva de um plano não cria movimentação bancária. Não duplique a mesma obrigação em conta fixa e plano futuro. Contas de emergência/investimento já ficam fora do caixa livre: não reserve o mesmo dinheiro novamente em envelopes.
- Dias/períodos de planos precisam ser atualizados pelo usuário quando seu horizonte mudar. Não há tarefas automáticas em segundo plano.
- Faturas e contas não aceitam pagamento duplicado; lançamentos incorretos podem ser revertidos no histórico de movimentações. Compras se corrigem por divisão/categoria ou estorno. Não há edição da data/valor original de compra já importada.
- Estorno após pagamento cria crédito no cartão, visível e incluído no patrimônio; não baixa automaticamente faturas futuras nem registra restituição em dinheiro.
- Desejos pagos no cartão: registre a compra no módulo do cartão e libere manualmente a reserva para evitar duplicação. O botão “Registrar compra” do desejo é à vista.
- Valores desconhecidos geram aviso e recomendação de atenção, mas não bloqueiam decisões. O motor não inventa valor para eles.
- As projeções só contemplam os dados cadastrados e 90 dias. Salário previsto é estimativa, não garantia. Renda variável, despesas não cadastradas e mudança de prioridades exigem revisão.
- Testado em Chromium desktop/mobile; Safari real e instalação física no iPhone ainda precisam de validação no aparelho.

Veja `ARCHITECTURE.md`, `TEST-REPORT.md`, `NEXT-STEPS.md` e `DEPLOY.md`.

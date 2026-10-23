# Configuração pessoal da versão existente — 23/10/2026

A hospedagem não foi alterada. Esta atualização mantém a versão 1.5.0 e o mesmo armazenamento `orbita_private_v1`. Não houve acesso ao navegador ou armazenamento do aplicativo publicado.

## Importação única e privada

O pacote entregue separadamente, `Orbita-Pacote-Pessoal-Unico.json`, preserva os quatro documentos originais em um envelope `orbita-personal-package-v1`. Ele não integra Git, catálogo, arquivos públicos ou ZIP-fonte. Não publique esse arquivo. O ZIP original contém referências parciais, não exportações integrais.

Após esta atualização estar disponível no aplicativo existente:

1. No mesmo navegador/PWA em que está seu progresso, abra Configurações e exporte um backup.
2. Em **Importar pacote pessoal único**, selecione o único JSON pessoal entregue. Não use “Importar backup”, que é uma restauração substitutiva.
3. Confira os totais em Configurações, os blocos em Hoje e os links em Estudar → matéria → Materiais. Os atalhos das bases do Notion aparecem em Configurações.
4. Reimportar o pacote é seguro: a mesclagem mantém registros ausentes no recorte e atualiza aqueles com o mesmo ID/URL. Tentativas, notas, revisões, cartões privados e simulados permanecem intactos.

A leitura ocorre localmente com limite de 5 MB. Campos inválidos são recusados e contabilizados; esquema desconhecido cancela a importação antes da gravação. Falha de armazenamento bloqueia a gravação, preservando o estado anterior. Não se executam instruções de documentos importados.

Calendar usa America/Sao_Paulo, conserva IDs e instantes de origem e distingue tipo explícito. Aulas não geram exercício do dia; datas de blocos de estudo e títulos de arquivos não viram provas. Avaliações importadas precisam de data válida, disciplina conhecida, confirmação, tipo, fonte e evidência. Um recorte sem provas não apaga avaliações anteriores.

Notion: referências de bases e dificuldades são preservadas sem fabricar tentativas, notas, confiança ou datas de revisão. Drive: links permanecem referências, sem alegação de download, indexação ou leitura de PDF.

## Autorizações que ainda dependem do ambiente publicado

O usuário forneceu a URL do aplicativo existente. Sua leitura foi bloqueada neste ambiente por resposta 403 do proxy; não há ferramenta de edição/publicação desse site disponível neste chat. É necessário acesso de atualização pelo editor que criou o aplicativo para instalar este código nele. Nenhum site novo é necessário. Alterar o repositório não comprova que o aplicativo do ChatGPT foi atualizado.

Para sincronização real, a plataforma atual precisa oferecer um servidor seguro com as rotas `/api/` e armazenamento protegido dos segredos OAuth. O adaptador existente em `netlify/functions/api.js` é específico da hospedagem anterior; copiá-lo para um site estático do ChatGPT não ativa as conexões. Não foi configurada outra hospedagem. É necessário verificar a capacidade do ambiente existente antes de adaptar sua execução.

Quando esse servidor estiver disponível, o titular deverá consentir a leitura no Google (Calendar e Drive) e no Notion, autorizando as bases/pastas escolhidas. O administrador cadastra os aplicativos OAuth e callbacks da própria URL atual em configuração privada do servidor. Nunca enviar senhas, tokens ou segredos pelo chat. Importação local não equivale a consentimento OAuth. Sem isso, o aplicativo informa indisponibilidade e mantém a cópia importada para uso offline.

## Correção pedagógica e limites

Treino e desafios do feed compartilham gabarito, explicação autoral, comparação da alternativa escolhida e recomendação de revisão. O resultado do simulado permite reabrir a resolução de cada questão. O exercício do dia conserva suas resoluções trabalhadas com fórmulas, substituições e unidades. Questões conceituais não recebem cálculos inventados; a qualidade e o detalhamento numérico dependem da resolução disponível no banco. Não há correção automática de respostas discursivas nem extração de gabaritos privados de PDFs.

Dados locais não são cifrados pelo aplicativo: proteja o dispositivo e seus backups. Safari/PWA podem ter armazenamentos separados; importe no ambiente em que seu histórico já existe. Não limpar dados, trocar domínio nem reinstalar o PWA para importar.

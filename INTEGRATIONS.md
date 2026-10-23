# Calendar, Notion e publicação

## Implementado e utilizável sem conta conectada

- JSON de Calendar com `study_events`: `date`, `start`, `end` opcional, `subject` (código do catálogo), `title`, `description` opcional e `kind: "study"` opcional. Sem kind explícito, o título deve identificar Estudo/Revisão/Simulado. Use horários do dispositivo. Aulas genéricas são ignoradas.
- Exportação `.ics` local com eventos únicos: identifica código da disciplina no título/descrição e blocos de estudo; suporta horário flutuante local ou UTC `Z`, IDs e linhas dobradas. RRULE/RDATE/EXDATE, TZID e eventos que cruzam meia-noite são recusados com aviso, sem importação parcial. Exporte JSON com ocorrências expandidas nesses casos. Não há URL de calendário público ou leitura silenciosa.
- JSON Notion com `error_records` e `grades`; CSV exportado da base com colunas `Matéria` e `Conteúdo`, além de `Regra para próxima vez`, `Onde começou o erro`, `Status` e `Tipo de erro` opcionais. CSV substitui os erros e preserva notas já importadas. Reimportação substitui o snapshot: não duplica registros. Linhas de erro concluído/resolvido não aumentam prioridade.
- Tentativas locais, categorias e próximas revisões entram no histórico local e no backup. Não há gravação na conta Notion.
- Dados privados são lidos pelo seletor de arquivos e permanecem no navegador. Nenhum token é necessário para esses recursos.

## OAuth não configurado

Na instância foram verificados somente nomes/presença de credenciais: sem GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET, NOTION_TOKEN ou sessão OAuth disponível para o app. Não existe backend autenticado. Não foram simuladas conexões bem-sucedidas nem criados endpoints públicos que exponham bases.

Para sincronização automática será necessário conectar:

1. Um backend com sessão privada por usuário e armazenamento protegido de tokens, definindo antes o provedor gratuito e limites. Segredos somente em configurações seguras do servidor.
2. Um projeto OAuth do usuário no Google, consentimento para Calendar somente leitura (`calendar.readonly` ou escopo mais restrito compatível), redirects HTTPS exatos, state/PKCE e renovação/revogação de sessão. Escolher calendário e filtrar blocos de estudo explicitamente.
3. Integração Notion com leitura limitada à base compartilhada pelo usuário; OAuth para uso multiusuário ou token de servidor para instância estritamente pessoal. Sessão autenticada obrigatória antes de retornar dados. Não ativar escrita por consequência da leitura.

Não existe segredo de servidor seguro num frontend público. Por isso esta versão entrega importadores funcionais, validação e regras reutilizáveis para futuros adaptadores; não adiciona um backend sem controle de acesso. Credenciais nunca devem ser enviadas no chat ou commitadas.

## Netlify

Sem NETLIFY_AUTH_TOKEN/NETLIFY_SITE_ID nem conector de deploy disponível nesta sessão. Para publicar por automação, conectar a conta Netlify com permissão de deploy no site `venerable-narwhal-8d8674`. Não é necessário fornecer senha. Alternativa: conectar o repositório no painel Netlify e configurar publicação de `site/` (netlify.toml incluído), escolhendo a branch de produção desejada.

O ZIP Netlify já contém index.html na raiz. Não publicar ZIP-fonte, snapshots ou backups. Esta entrega não aciona deploy nem altera DNS. A existência do endereço antigo não demonstra que a nova versão foi publicada.

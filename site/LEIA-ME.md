# Órbita Estudos 1.3.0 — instalação e uso

App web estático gratuito, autoral, com 9 matérias, exercícios, flashcards, feed educativo, simulado Exam Prep e exercício do dia condicionado a uma agenda de estudo importada. Não requer API paga.

## Publicação

Publique **somente os arquivos desta pasta `site/`**, mantendo `index.html` na raiz do deploy. O ZIP `Órbita-Deploy-1.3.0.zip` já foi preparado para isso. O site publicado é acessível publicamente por quem souber o endereço; o arquivo `robots.txt` apenas desencoraja indexação, **não é autenticação**. O site NÃO inclui os dados pessoais, notas, links de Drive nem JSONs privados.

Para publicar na mesma conta Netlify: abra o painel da sua conta, escolha o site existente, faça o deploy do ZIP de publicação e confirme que a versão 1.3.0 aparece no rodapé. Não há credenciais de publicação neste pacote.

## Importar seus dados pessoais

1. Abra o ZIP **privado** em Arquivos no iPhone e extraia seus 3 JSONs.
2. Abra o Órbita no Safari, vá a **Configurações**.
3. Importe `agenda_estudos_snapshot.json` no campo Agenda, `notion_estudos_snapshot.json` em Notion e `fontes_drive.json` em Drive.
4. O app mostra a data da cópia e avisa que **não existe sincronização automática**. O conteúdo é guardado apenas no armazenamento local do navegador; exporte backups periodicamente.
5. Use **Hoje** para exercício elaborado (apenas se houver bloco de estudo no snapshot), **Preparação de provas** para simulado e **Progresso** para revisão.

**Nunca envie os JSONs pessoais ou o ZIP privado para a hospedagem.** Importação ocorre pelo seletor de arquivos dentro do app, no navegador. Não cole credenciais, tokens ou chaves no aplicativo.

## Instalar no iPhone

Abra o endereço HTTPS no Safari → Compartilhar → Adicionar à Tela de Início. Abra o ícone Órbita. Após primeiro carregamento online, parte do conteúdo pode funcionar offline graças ao Service Worker. O funcionamento offline ainda precisa de teste real no Safari.

## Limitações

O app não lê Google Calendar, Notion ou Drive ao vivo; usa apenas snapshots importados. Não extrai PDFs nem oferece IA generativa conectada. Os exercícios são **autorais**, não provas oficiais da FEI. Respostas de exercícios elaborados são autoavaliadas, não corrigidas automaticamente. Dados não sincronizam entre dispositivos. Não foi realizado teste final no Safari real.

Atualização 1.3.0: offline validado em Chromium mobile/desktop. Safari real continua pendente. Simulados priorizam dificuldades e feed encerra ao fim do catálogo.

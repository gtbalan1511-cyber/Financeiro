# Pendências atuais — Missão 02 / 1.6.0

**Caminho alternativo identificado:** atualizar o Sites existente preserva o domínio, mas depende de disponibilizar o helper obrigatório do plugin no ambiente. A publicação tem cliente Notion configurado, sem conta conectada; preservá-lo em vez de recriá-lo. Ver docs/INFRA-ATUAL.md.


1. Criar/autorizar conta Cloudflare Free, disponibilizando acesso seguro; CLI atual não autenticada. Provisionar D1 real, cadastrar segredos privados, publicar e validar URL HTTPS. Não existe deploy remoto aceito. Guia: docs/DEPLOY-CLOUDFLARE.md.
2. Criar clientes OAuth próprios do Órbita (Google Calendar/Drive e Notion), registrar redirects na origem final e consentir nas contas/fontes. Executar pelo menos uma operação real em cada serviço e testar revogação/renovação. Conexões do ChatGPT não autorizam o app.
3. Validar Safari/iPhone físico, instalação standalone e offline. WebKit automatizado: erro interno na reabertura offline do runtime Linux; diagnóstico não comprova comportamento iOS. Validar também computador Windows/macOS real.
4. Completar ingestão PDF/slides/OCR com fonte/página e revisão pedagógica dos materiais autorizados. Conteúdo atual é autoral introdutório, não catálogo oficial completo. Nenhum documento pessoal inventado.
5. Tutor generativo/fotos, podcasts e escrita de progresso/erros ao Notion não estão implementados/ativos. Tutor atual é guiado sem API. Exigem decisões de provedor/autorização e testes reais; não ativar cobrança.
6. Verificar CI remoto após push, quotas/CPU do Workers Free na conta, banco real e sincronização entre dois dispositivos reais. Preservar backup do domínio antigo antes de migrar. PR continua revisável; sem merge automático de entrega incompleta.

## Pendências e relatos anteriores (históricos; consultar estado atual acima)

## Bloqueio atual da integração real

- Disponibilizar acesso ao editor/painel do aplicativo atual com execução segura de Node ou proxy de `/api/` na mesma origem. Não há conector de publicação neste ambiente; acesso HTTP remoto foi bloqueado (403).
- Configurar clientes OAuth Google/Notion em configuração privada do servidor e conceder leitura às fontes reais. Não enviar segredos no chat.
- Após isso, testar dados e renovação reais no iPhone, identificar a estrutura das quatro fontes Notion (data sources versus páginas comuns) e resolver matérias sem código explícito.
- Nenhuma conexão real está ativa ou validada nesta rodada. A missão depende dessas autorizações; testes locais com provedores simulados não a concluem.

## Configuração pessoal atual

- Aplicar o código atualizado no aplicativo existente pelo editor responsável pela publicação informada. Não configurar outra hospedagem.
- Importar o JSON pessoal único pelo novo controle; os dados não foram inseridos remotamente no navegador do usuário.
- Autorizar OAuth de leitura e disponibilizar execução segura de `/api/` na plataforma existente para conexões reais. Recortes não substituem sincronização.
- Recuperar avaliações confirmadas e registros completos quando as contas estiverem autorizadas. Não estimar datas.
- Validar Safari físico e resoluções quantitativas com o material original do professor.

# Pendências — 1.5.0

1. **Publicar com autorização Netlify.** O projeto Git inclui funções e rotas; o ZIP estático permite estudo offline, mas não ativa OAuth. Sem publicação nova nesta sessão. main não foi mesclada.
2. **Registrar os dois aplicativos OAuth e segredos de servidor** descritos em BACKEND-SETUP.md; depois o usuário conecta Google/Notion e escolhe fontes por nome. Nenhuma conexão real foi testada. Mocks não equivalem a sync com contas reais.
3. **Validar reprodução dos 60 vídeos no iPhone.** IDs/títulos e arquivos oficiais foram conferidos por HTTP; player e durações exatas não foram validados devido a bloqueio direto do YouTube. Vinte aulas longas ficam fora de sessões de até 30 minutos. Idioma dos vídeos: inglês; cobertura audiovisual concentrada em três áreas.
4. **Revisão pedagógica humana** das 153 explicações, 153 desafios e 36 modelos. Banco introdutório, com hipóteses e estado de revisão explícitos; não representa todo o currículo FEI.
5. **Safari físico e atualização standalone.** Chromium mobile/desktop, offline e migração são testados; instalação real, gestos físicos e expulsão de armazenamento pelo iOS ainda exigem aparelho.
6. **Drive ampliado:** OCR/PDF com páginas/diagramas, subpastas recursivas, extração de slides e paginação dos seletores acima de 100 fontes não concluídos. Hoje: metadados da pasta selecionada e texto/Google Docs até 1 MB; origem preservada e página não inventada.
7. **Notion ampliado:** resolver relações entre bases, mapear esquemas personalizados e política de renovação de autorização Notion. Escrita continua ausente e não autorizada. Histórico do aplicativo é local, não enviado ao Notion.
8. **Catálogo editorial:** revisão semântica de duplicação, ajuste de dificuldade/pré-requisitos por professor, durações reais dos vídeos e melhor associação multilíngue dos conceitos. Verificações atuais de duplicação são exatas e por ID de vídeo; não provam ausência de toda sobreposição pedagógica.
9. **Persistência/sync:** localStorage com alertas e backup, sem sincronização privada de progresso entre aparelhos. A senha protege o backend, não cifra dados locais. Cookies de autenticação expiram; conexão pode exigir novo consentimento. Rate limit do login é por instância, não distribuído.
10. **GitHub:** API retornou Forbidden, Git funciona. Nova branch 1.5 e atualização do PR #1 existente oferecem revisão; criação de PR separado/edição de título e CI remota dependem de acesso de API disponível. Não se afirma CI remota aprovada.

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

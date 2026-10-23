/* Conteúdo educacional inicial autoral. Não é reprodução integral dos slides da FEI. */
window.ORBITA_DATA = (() => {
  const subjects = [
    {id:'ELE010',name:'Eletricidade Geral',short:'Eletricidade',emoji:'⚡',accent:'#edb84f',folder:'',topics:[
      ['Fundamentos de CC e CA','Leis de Kirchhoff, impedância e grandezas senoidais.'],
      ['Fasores e argumentos','Referência de fase, formas polar e retangular, relação entre tensão e corrente.'],
      ['Potências elétricas','Potências ativa, reativa e aparente; triângulo de potências.'],
      ['Fator de potência','Correção por capacitores e interpretação de cargas indutivas.'],
      ['Trifásicos equilibrados','Ligações estrela e triângulo e relações fase–linha.'],
      ['Máquinas e energia','Noções de transformadores, máquinas e sistema elétrico.']
    ]},
    {id:'MEE120',name:'Transferência de Calor',short:'Transf. de Calor',emoji:'🌡️',accent:'#ee8659',folder:'',topics:[
      ['Modos de transferência','Condução, convecção e radiação. Lei de Fourier.'],
      ['Condução e resistências','Paredes planas, multicamadas, contato, série/paralelo.'],
      ['Equação da condução','Hipóteses, regime permanente/transiente, geração volumétrica.'],
      ['Cilindros e esferas','Condução radial e resistências térmicas.'],
      ['Radiação e emissividade','Corpo negro, emissividade e trocas radiativas.'],
      ['Raio crítico e aletas','Área, convecção, eficiência de aletas e isolamento.'],
      ['Transiente térmico','Modelo concentrado e número de Biot.']
    ]},
    {id:'MED120',name:'Vibrações Mecânicas',short:'Vibrações',emoji:'〰️',accent:'#aa99ff',folder:'',topics:[
      ['DCL, momentos e EDM','Forças, momentos, TMA/TMB e equação diferencial do movimento.'],
      ['Coordenada generalizada','Transformação x = rθ e grandezas equivalentes.'],
      ['Vibração livre','Frequência natural, massa e rigidez.'],
      ['Amortecimento','Coeficiente de amortecimento, razão ζ e regimes.'],
      ['Vibração forçada','Excitação harmônica, amplificação e fase.'],
      ['Ressonância e batimento','Frequências próximas e resposta dinâmica.'],
      ['Desbalanceamento','Massa excêntrica, força centrífuga e resposta.'],
      ['Transmissibilidade','Isolamento e transmissão de vibração.']
    ]},
    {id:'MEP230',name:'Mecânica dos Materiais',short:'Mec. Materiais',emoji:'📐',accent:'#6bc4d0',folder:'',topics:[
      ['Estados de tensão','Tensões normais/cisalhantes, principais e octaédricas.'],
      ['Deformações e modelos','Estado de deformações e modelos constitutivos.'],
      ['Critérios para dúcteis','Von Mises e Tresca.'],
      ['Critérios para frágeis','Rankine e critérios associados.'],
      ['Critério de Hill','Materiais anisotrópicos e interpretação da condição de falha.'],
      ['Energia de deformação','Trabalho e energia interna.'],
      ['Deslocamentos e Castigliano','Momento real, carga unitária, integral de Mohr.'],
      ['Kurt-Beyer e pórticos','Integração gráfica, treliças e pórticos.'],
      ['Hiperestática e Menabrea','Compatibilidade e energia.']
    ]},
    {id:'MEP140',name:'Elementos de Máquinas II',short:'Elementos II',emoji:'⚙️',accent:'#79c8ad',folder:'',topics:[
      ['Potência e torque','Transmissão de potência, rotação e torque.'],
      ['Engrenagens cilíndricas','Geometria, relações de transmissão e forças.'],
      ['Engrenagens helicoidais','Forças Ft, Fr, Fa e ângulo de hélice.'],
      ['Eixos e reações','DCL, mancais e reações de apoio.'],
      ['Lewis e Hertz','Critérios de resistência dos dentes.'],
      ['Molas e uniões','Molas, parafusos, interferência e fixações.'],
      ['Engrenagens cônicas','Tópico futuro — ainda não estudado segundo o histórico.']
    ]},
    {id:'MRD230',name:'Materiais Poliméricos',short:'Poliméricos',emoji:'🧬',accent:'#d9a1d9',folder:'',topics:[
      ['Estrutura e classificação','Cadeias poliméricas e tipos de polímero.'],
      ['Termoplásticos e termorrígidos','Estrutura, processamento e comportamento.'],
      ['Propriedades mecânicas','Viscoelasticidade, resistência e rigidez.'],
      ['Propriedades térmicas','Tg, Tm e dependência da temperatura.'],
      ['Processamento','Extrusão, injeção e outros processos.'],
      ['Laboratório','Ensaios e relatórios da disciplina.']
    ]},
    {id:'MEF120',name:'Usinagem',short:'Usinagem',emoji:'🛠️',accent:'#e4ad6c',folder:'',topics:[
      ['Torneamento','Movimentos, velocidade de corte, rotação, avanço e profundidade.'],
      ['Furação e roscamento','Ferramentas e operações.'],
      ['Fresamento','Movimentos e parâmetros de fresamento.'],
      ['Mandrilamento e retificação','Operações de acabamento e abrasivos.'],
      ['Materiais de ferramentas','Vida, propriedades e geometrias.'],
      ['Força e potência','Estimativa de potência e esforços de corte.'],
      ['CNC e NX CAM','Planejamento e programação.']
    ]},
    {id:'MEI150',name:'Projeto Integrador II',short:'Projeto II',emoji:'🔧',accent:'#84b5ef',folder:'',project:true,topics:[
      ['Balanços de energia','Conservação de energia em sistemas termofluidos.'],
      ['Trocadores de calor','Arranjos, operação e balanço térmico.'],
      ['ΔT média logarítmica','Diferença de temperatura média logarítmica e domínio.'],
      ['Dimensionamento','UA e hipóteses de transferência.'],
      ['Relatórios e entregas','Rastreabilidade das decisões e correções de projeto.']
    ]},
    {id:'CSJ030',name:'Ética Social Cristã',short:'Ética Social',emoji:'💬',accent:'#b6c1cf',folder:'',project:true,topics:[
      ['Fundamentos de ética social','Responsabilidade e bem comum.'],
      ['Apostas online','Publicidade, riscos e mecanismos econômicos.'],
      ['Jogos digitais e endividamento','Consumo, comportamento e vulnerabilidade.'],
      ['Debate e apresentação','Argumentação, fontes e exposição oral.']
    ]}
  ];
  // Referências privadas só aparecem após importação explícita no dispositivo.
  const sources = [];
  const questions = [
    ['ele1','ELE010','Trifásicos equilibrados','Em uma ligação estrela equilibrada, qual é a relação entre a tensão de linha e a tensão de fase (módulos)?',['V_L = √3 · V_f','V_L = V_f','V_L = V_f / √3','V_L = 3 · V_f'],0,'Na ligação estrela, as tensões de linha são diferenças fasoriais entre tensões de fase defasadas de 120°. Por isso |V_L| = √3 |V_f|.','Pense na diferença entre dois fasores separados por 120°.',2],
    ['ele2','ELE010','Trifásicos equilibrados','Em uma carga equilibrada ligada em triângulo, qual relação de módulo é verdadeira?',['I_L = I_f','I_L = √3 · I_f','V_L = √3 · V_f','I_L = I_f/3'],1,'Na ligação triângulo, a tensão de linha é igual à de fase, e a corrente de linha tem módulo √3 vezes a corrente de fase.','Em triângulo, cada ramo fica entre duas linhas.',2],
    ['ele3','ELE010','Fator de potência','Uma carga indutiva apresenta fator de potência atrasado. Qual grandeza é utilizada para corrigi-lo localmente?',['Indutor em paralelo','Capacitor em paralelo','Resistor em série','Aumento da frequência'],1,'Um capacitor em paralelo fornece potência reativa capacitiva, compensando parte da potência reativa indutiva demandada pela carga.','Procure um componente com potência reativa de sinal oposto.',2],
    ['ele4','ELE010','Fasores e argumentos','Considere V = 100∠30° V e I = 5∠−10° A. Qual é o ângulo de V/I?',['20°','−40°','40°','−20°'],2,'Na divisão de fasores, subtraímos os argumentos: 30° − (−10°) = 40°.','Na divisão de números complexos em forma polar, subtraia ângulos.',2],
    ['ele5','ELE010','Potências elétricas','Uma carga monofásica recebe 1000 VA com fator de potência 0,8. Qual a potência ativa?',['800 W','1250 W','200 W','1000 W'],0,'P = S cos φ = 1000 × 0,8 = 800 W.','P = S × FP.',1],
    ['mee1','MEE120','Condução e resistências','Uma parede plana tem espessura de 0,1 m, k = 2 W/(m·K) e área 1 m². Qual sua resistência térmica?',['0,05 K/W','0,2 K/W','20 K/W','5 K/W'],0,'Para parede plana R = L/(kA). Logo R = 0,1/(2×1) = 0,05 K/W.','Use R = L/(kA).',1],
    ['mee2','MEE120','Equação da condução','Para condução unidimensional em uma placa, regime permanente, k constante e sem geração, a equação reduzida é:',['d²T/dx² = 0','dT/dx = 0 sempre','∂T/∂t = constante não nula','T(x) é obrigatoriamente constante'],0,'A equação diferencial reduzida é d²T/dx² = 0. O perfil T(x) é linear e pode ter gradiente não nulo.','Elimine acumulação e geração da equação geral.',2],
    ['mee3','MEE120','Cilindros e esferas','Em condução radial permanente sem geração, qual resistência descreve uma parede cilíndrica entre r1 e r2?',['ln(r2/r1)/(2πkL)','(r2−r1)/(kA) usando A constante','1/(4πkr1r2)','2πkL ln(r2/r1)'],0,'Em cilindros, a área radial muda com o raio; a integração de Fourier fornece R = ln(r2/r1)/(2πkL).','A área para condução radial cilíndrica vale 2πrL.',3],
    ['mee4','MEE120','Transiente térmico','Qual condição é tipicamente necessária para aplicar análise concentrada de temperatura uniforme?',['Bi ≪ 1 (geralmente Bi < 0,1)','Bi > 10','Número de Fourier igual a zero','Condutividade térmica nula'],0,'Para Bi < 0,1, a resistência à condução interna é pequena frente à convectiva; a hipótese de temperatura espacialmente uniforme costuma ser adequada.','Compare resistências internas e superficiais.',2],
    ['med1','MED120','Vibração livre','Um sistema massa–mola não amortecido tem m = 4 kg e k = 400 N/m. Qual é sua frequência angular natural?',['10 rad/s','100 rad/s','5 rad/s','20 rad/s'],0,'ωn = √(k/m) = √(400/4) = 10 rad/s. Frequência em Hz é ωn/(2π).','ωn = √(k/m).',1],
    ['med2','MED120','DCL, momentos e EDM','Ao construir a EDM de 1 GDL pelo método de forças/momentos, qual procedimento vem primeiro?',['Somar amplitudes prontas','Escolher coordenada e construir DCL','Assumir sempre massa equivalente zero','Resolver frequência antes de modelar'],1,'Defina coordenada generalizada e sentido positivo, desenhe DCL e então aplique ΣF = ma ou ΣM = Jα para chegar à EDM.','Identifique primeiro como o sistema pode se mover.',1],
    ['med3','MED120','Ressonância e batimento','Em um sistema forçado com baixo amortecimento, a maior amplificação costuma ocorrer quando:',['ω ≈ ωn','ω = 0 sempre','ω ≫ 100 ωn','k = 0'],0,'A resposta atinge pico próximo da frequência natural. O amortecimento modifica a posição e a magnitude do pico.','Compare frequência da excitação com a natural.',2],
    ['med4','MED120','Desbalanceamento','Uma massa excêntrica me gira com excentricidade e e velocidade angular ω. Qual o módulo da força harmônica de desbalanceamento?',['me·e·ω²','me·e/ω²','me·ω/e','k·e/ω'],0,'A força centrífuga associada à excentricidade tem módulo F0 = me e ω².','A aceleração centrípeta tem módulo eω².',2],
    ['mep1','MEP230','Deslocamentos e Castigliano','Na integral de Mohr para deslocamento por carga unitária, qual par de momentos deve ser usado?',['Momento das cargas reais e momento da carga unitária','Dois momentos apenas das cargas reais','Momento máximo vezes momento mínimo','Somente forças cortantes'],0,'Para flexão, δ = Σ∫ M_real(x) M_unitário(x)/(EI) dx. Desenhe os diagramas para cada trecho.','A carga fictícia de valor 1 atua na direção do deslocamento desejado.',2],
    ['mep2','MEP230','Critério de Hill','Em uma forma adimensional do critério de Hill normalizada para que a falha ocorra ao atingir 1, quando se prevê início de falha?',['Função de Hill ≥ 1','Função de Hill < 0 sempre','Somente quando E = 0','Somente quando ν = 0'],0,'Com a função normalizada, o limiar de falha corresponde ao valor 1; abaixo do limiar, esse critério isoladamente não prevê falha.','O limite de comparação foi escolhido como 1.',1],
    ['mep3','MEP230','Critérios para dúcteis','Qual hipótese é típica do critério de von Mises?',['Falha ligada à energia de distorção','Falha somente pela tensão normal máxima','Falha pela deflexão máxima','Falha apenas por fadiga'],0,'Von Mises usa a tensão equivalente associada à energia de distorção para avaliar escoamento em materiais dúcteis.','Pense em energia de distorção.',2],
    ['mep4','MEP230','Kurt-Beyer e pórticos','Para uma viga, ao procurar deslocamento vertical num ponto pelo método da carga unitária, qual ação fictícia é aplicada?',['Força vertical unitária no ponto','Momento unitário vertical','Força horizontal em outro ponto','Nenhuma ação'],0,'Uma força unitária no ponto e sentido do deslocamento linear desejado gera o diagrama M̄. Para rotação, usa-se um momento unitário.','Deslocamento linear usa força; angular usa momento.',2],
    ['maq1','MEP140','Potência e torque','Um eixo transmite potência P = 2 kW a 100 rad/s. Qual é o torque transmitido?',['20 N·m','200 N·m','0,05 N·m','1000 N·m'],0,'P = Tω, logo T = P/ω = 2000/100 = 20 N·m.','Converta kW para W.',1],
    ['maq2','MEP140','Engrenagens helicoidais','Uma engrenagem helicoidal transmite torque. Em geral, quais componentes de força surgem no engrenamento?',['Tangencial, radial e axial','Apenas tangencial','Apenas radial e axial','Somente axial'],0,'Diferente do engrenamento cilíndrico de dentes retos ideal, o helicoidal gera componente axial além da tangencial e radial.','O ângulo de hélice produz uma componente ao longo do eixo.',2],
    ['maq3','MEP140','Eixos e reações','Para resolver reações nos mancais de um eixo, qual é o procedimento correto?',['Montar DCL e aplicar equilíbrio em cada plano','Somar módulos das forças sem direção','Desprezar sempre forças axiais','Assumir que os dois mancais têm reação igual'],0,'Separe os esforços nos planos adequados, faça o DCL e aplique ΣF = 0 e ΣM = 0, conforme vínculos reais dos mancais.','Observe direções e posições das forças.',2],
    ['pol1','MRD230','Termoplásticos e termorrígidos','Qual característica é típica de um termoplástico?',['Pode amolecer quando aquecido em faixa adequada','Sempre possui rede tridimensional densamente reticulada','Não pode ser moldado','É sempre elastômero'],0,'Termoplásticos podem ser processados por aquecimento e resfriamento, diferentemente de termorrígidos completamente curados.','Considere reversibilidade de amolecimento.',1],
    ['pol2','MRD230','Propriedades térmicas','O que a transição vítrea Tg representa em polímeros amorfos?',['Mudança de mobilidade molecular e resposta mecânica','Temperatura em que todos os polímeros vaporizam','Temperatura de cristalização do metal','Limite de resistência elétrica'],0,'A Tg marca uma faixa de mudança de mobilidade segmentar e comportamento mecânico da fase amorfa. Não é equivalente à fusão cristalina.','Diferencie Tg de Tm.',2],
    ['pol3','MRD230','Propriedades mecânicas','Viscoelasticidade significa que a resposta mecânica do polímero pode depender de:',['Tempo e temperatura','Apenas cor do material','Somente volume','Somente densidade'],0,'Polímeros viscoelásticos apresentam resposta dependente do tempo de carregamento e temperatura, entre outros fatores.','Pense em fluência e relaxação.',1],
    ['usi1','MEF120','Torneamento','No torneamento, a peça tem diâmetro de 50 mm e gira a 1000 rpm. Qual velocidade de corte aproximada?',['157 m/min','15,7 m/min','3140 m/min','50 m/min'],0,'Vc = πdn/1000 = π×50×1000/1000 ≈ 157 m/min, com d em mm e n em rpm.','Use Vc = πdn/1000.',2],
    ['usi2','MEF120','Torneamento','No torneamento, o que representa fn?',['Avanço por rotação, em mm/rot','Profundidade de corte em mm','Rotação em rpm','Diâmetro inicial'],0,'fn é o avanço da ferramenta por rotação; a velocidade de avanço é Vf = fn × n.','Observe as unidades mm/rot.',1],
    ['usi3','MEF120','Fresamento','Em fresamento, normalmente qual componente realiza o movimento principal de corte?',['Ferramenta de múltiplas arestas em rotação','Peça obrigatoriamente em rotação','Apenas o fluido de corte','Mandril imóvel'],0,'No fresamento a ferramenta multicortante gira; o avanço relativo pode ser produzido por movimentos da mesa ou ferramenta.','Compare com o torneamento.',1],
    ['proj1','MEI150','Trocadores de calor','Em um trocador adiabático para o ambiente, desprezadas perdas, qual relação energética vale entre fluidos?',['|Q_quente| = |Q_frio|','Q_quente + Q_frio = 100 W sempre','Q_quente = 0','Q_frio é sempre o dobro'],0,'Em regime permanente sem perdas externas, a energia cedida pelo fluido quente é igual à recebida pelo frio, em módulo.','Faça balanço de energia no equipamento.',1],
    ['proj2','MEI150','ΔT média logarítmica','Na equação ΔTml = (ΔT1−ΔT2)/ln(ΔT1/ΔT2), o que ocorre no limite ΔT1 = ΔT2 > 0?',['ΔTml tende ao valor comum','ΔTml tende a infinito','ΔTml vale zero','A equação não tem limite'],0,'A expressão é 0/0 na forma direta, mas seu limite matemático é ΔTml = ΔT1 = ΔT2.','Considere o limite contínuo da média logarítmica.',2],
    ['proj3','MEI150','Dimensionamento','Qual é a relação usual do método DTML para um trocador em regime permanente?',['Q = U A F ΔTml','Q = m g h','Q = σ T^4 sempre','Q = k L / A'],0,'A forma geral com fator corretivo é Q = U A F ΔTml; para arranjos em que F=1, Q = UAΔTml.','Use coeficiente global e diferença média de temperaturas.',2],
    ['et1','CSJ030','Apostas online','Qual medida é mais consistente com prevenção de endividamento relacionado a apostas?',['Educação financeira, transparência e limites de gastos','Prometer retorno financeiro garantido','Usar empréstimos para recuperar perdas','Esconder probabilidades'],0,'Medidas preventivas incluem comunicação responsável, limites, transparência e educação sobre risco financeiro.','Procure reduzir exposição a riscos e danos.',1],
    ['et2','CSJ030','Fundamentos de ética social','Uma análise ética social de uma atividade econômica deve considerar:',['Efeitos individuais e coletivos, incluindo vulnerabilidades','Só lucro de curto prazo','Somente popularidade nas redes','Apenas preferência da empresa'],0,'Uma análise ética social inclui impactos em pessoas, relações, vulnerabilidades e bem comum, além do resultado econômico.','Pense em partes afetadas.',1],
    ['et3','CSJ030','Debate e apresentação','Qual prática fortalece uma apresentação acadêmica de tema controverso?',['Distinguir evidências, interpretações e opinião','Usar apenas manchetes sem fontes','Excluir qualquer perspectiva divergente','Fazer afirmações sem contexto'],0,'Diferenciar fatos sustentados, hipóteses e posicionamentos aumenta a clareza e a credibilidade da apresentação.','Como a audiência pode conferir suas afirmações?',1]
  ].map(([id,subject,topic,q,choices,answer,explanation,hint,difficulty])=>({id,subject,topic,q,choices,answer,explanation,hint,difficulty,original:true}));
  const flashcards=[
    ['ELE010','Fasores e argumentos','Qual é a regra para dividir fasores em forma polar?','Dividir módulos e subtrair argumentos.'],
    ['ELE010','Potências elétricas','Como relacionar P, S e fator de potência?','P = S cos φ, onde cos φ é o fator de potência.'],
    ['MEE120','Condução e resistências','Qual a resistência de uma parede plana?','R_cond = L/(kA), para condução unidimensional e k constante.'],
    ['MEE120','Equação da condução','O que elimina o termo de armazenamento na equação da condução?','Regime permanente: ∂T/∂t = 0.'],
    ['MED120','Vibração livre','Qual é a frequência angular natural em massa–mola não amortecido?','ωn = √(k/m), em rad/s.'],
    ['MED120','DCL, momentos e EDM','Qual o roteiro para obter uma EDM?','Coordenada/sentido → DCL → equilíbrio dinâmico de forças ou momentos → EDM.'],
    ['MEP230','Deslocamentos e Castigliano','Qual integral calcula deslocamento por carga unitária em flexão?','δ = Σ∫M_real M_unitário/(EI) dx.'],
    ['MEP230','Critério de Hill','Em forma normalizada, qual limiar indica falha?','Função de Hill ≥ 1, na convenção normalizada.'],
    ['MEP140','Potência e torque','Como calcular torque a partir de potência e velocidade angular?','T = P/ω. Use P em W e ω em rad/s.'],
    ['MEP140','Engrenagens helicoidais','Que forças surgem no engrenamento helicoidal?','Tangencial Ft, radial Fr e axial Fa.'],
    ['MRD230','Propriedades térmicas','Tg é igual a Tm?','Não. Tg é transição vítrea da fase amorfa; Tm é fusão da fase cristalina.'],
    ['MRD230','Termoplásticos e termorrígidos','Qual é a distinção prática mais comum?','Termoplásticos podem amolecer e ser reprocessados por aquecimento; termorrígidos curados não fundem de maneira equivalente.'],
    ['MEF120','Torneamento','Qual é a fórmula de velocidade de corte?','Vc = π d n / 1000, com d em mm, n em rpm, Vc em m/min.'],
    ['MEF120','Torneamento','Como calcular velocidade de avanço?','Vf = fn n, em mm/min se fn é mm/rot e n é rpm.'],
    ['MEI150','ΔT média logarítmica','Qual a expressão de DTML?','ΔTml = (ΔT1−ΔT2)/ln(ΔT1/ΔT2), com ΔT1 e ΔT2 positivos.'],
    ['MEI150','Dimensionamento','Qual é a expressão térmica com DTML?','Q = U A F ΔTml; se aplicável, F=1.'],
    ['CSJ030','Apostas online','O que significa prevenção de danos com apostas?','Educação, transparência de probabilidades, limites de gastos e proteção de pessoas vulneráveis.'],
    ['CSJ030','Debate e apresentação','Como separar argumento forte de opinião?','Apresente fontes e evidências verificáveis e identifique o que é interpretação.']
  ].map(([subject,topic,front,back],i)=>({id:`flash${i+1}`,subject,topic,front,back}));
  const feedTopics = [
    ['MED120','Por que o carro vibra mais em certas rotações?','A rotação altera a frequência de excitação. Próximo da frequência natural do conjunto, a amplitude pode aumentar bastante.','curiosidade','Ressonância e batimento'],
    ['MEP140','Por que uma engrenagem helicoidal gera força axial?','O contato do dente inclinado projeta parte da força ao longo do eixo. Por isso os mancais precisam considerar Fa.','conceito','Engrenagens helicoidais'],
    ['MEE120','Por que a garrafa térmica conserva a temperatura?','Ela reduz condução e convecção com isolamento e minimiza radiação com superfícies apropriadas.','curiosidade','Modos de transferência'],
    ['ELE010','Por que uma tensão pode estar adiantada da corrente?','Em circuitos senoidais com reatância, tensão e corrente podem ter argumentos diferentes; a referência escolhida importa.','conceito','Fasores e argumentos'],
    ['MEF120','Como o torno transforma rotação em uma peça cilíndrica?','A peça gira e a ferramenta avança longitudinalmente. A combinação produz a superfície usinada.','curiosidade','Torneamento'],
    ['MEP230','Como medir o deslocamento sem aplicar a carga real ali?','No método da carga unitária, criamos um carregamento fictício para calcular o deslocamento da estrutura no ponto desejado.','conceito','Deslocamentos e Castigliano'],
    ['MRD230','Por que uma peça plástica pode deformar lentamente?','A viscoelasticidade faz a deformação depender também do tempo de carregamento e da temperatura.','curiosidade','Propriedades mecânicas'],
    ['MEI150','Trocadores de calor fazem a água “perder” energia?','A energia que sai do fluido quente entra no frio, se desprezarmos perdas para o ambiente.','conceito','Trocadores de calor'],
    ['CSJ030','Quando uma promoção de apostas vira um problema ético?','A análise inclui transparência, exposição de pessoas vulneráveis e efeitos sobre endividamento.','reflexão','Apostas online'],
    ['MED120','O segredo de ωn = √(k/m)','Mais rigidez eleva a frequência natural; mais massa reduz. Experimente ajustar os parâmetros.','sim_nat','Vibração livre'],
    ['MEE120','O que acontece se dobrarmos a espessura do isolamento?','Em uma parede plana simples, a resistência R = L/(kA) dobra, reduzindo o fluxo para a mesma diferença de temperatura.','sim_heat','Condução e resistências'],
    ['ELE010','Você sabe diferenciar estrela e triângulo?','Em estrela, IL = If. Em triângulo, VL = Vf. Os fatores √3 aparecem nas grandezas complementares.','quiz','Trifásicos equilibrados'],
    ['MEP230','Erro comum: trocar M pelo M̄','No método da carga unitária, M vem das cargas reais e M̄ da unidade fictícia. Ambos entram na integral.','quiz','Deslocamentos e Castigliano'],
    ['MEF120','Qual a diferença entre Vc e Vf?','Vc é velocidade tangencial de corte (m/min); Vf é deslocamento de avanço (mm/min).','quiz','Torneamento'],
    ['MED120','Batimento não é ressonância','Batimento surge da superposição de frequências próximas; ressonância é uma grande amplificação por excitação próxima da frequência natural.','conceito','Ressonância e batimento'],
    ['MEE120','Por que a simetria impõe dT/dr = 0 no centro?','Num sólido cilíndrico/esférico com simetria radial, não há direção radial preferencial exatamente no centro.','conceito','Equação da condução'],
    ['MEP140','Se a rotação cair, o torque pode subir?','Para a mesma potência, T = P/ω. Diminuir ω aumenta T.','quiz','Potência e torque'],
    ['MRD230','Termoplástico e termorrígido não são sinônimos','Os termorrígidos curados têm ligações cruzadas que impedem fusão como termoplásticos comuns.','conceito','Termoplásticos e termorrígidos'],
    ['MEI150','DTML: por que um logaritmo?','Em trocadores, a diferença local de temperatura varia ao longo do comprimento. A média logarítmica representa essa variação.','conceito','ΔT média logarítmica'],
    ['CSJ030','O que torna uma fonte confiável?','Método, transparência, atualidade e possibilidade de conferir a origem da informação.','reflexão','Debate e apresentação'],
    ['MED120','Desbalanceamento cresce com o quadrado da rotação','F0 = m_e e ω². Se ω dobra, a força quadruplica — mantendo massa e excentricidade.','quiz','Desbalanceamento'],
    ['MEP230','Antes da integral, desenhe o diagrama','Em Castigliano: carregamento real → momento real → força unitária → momento fictício → integral por trechos.','conceito','Deslocamentos e Castigliano'],
    ['MEE120','Quando se pode supor temperatura uniforme?','Com número de Biot suficientemente pequeno, a resistência interna é pequena em comparação à resistência externa.','quiz','Transiente térmico'],
    ['MEP140','Não some forças sem olhar a direção','Reações em mancais exigem DCL e equilíbrio em cada plano. A força axial também precisa de vínculo compatível.','conceito','Eixos e reações'],
    ['ELE010','FP baixo significa sempre pouca potência ativa?','Não necessariamente. FP baixo significa que uma parcela maior da potência aparente não se converte em potência ativa.','conceito','Fator de potência'],
    ['MEF120','Por que ferramentas de corte precisam suportar calor?','Atrito e deformação na zona de corte geram calor; material da ferramenta influencia vida e desempenho.','curiosidade','Materiais de ferramentas'],
    ['MRD230','Tg pode importar mais do que a temperatura ambiente','O comportamento de um polímero pode mudar muito quando a temperatura se aproxima ou cruza Tg.','conceito','Propriedades térmicas'],
    ['MEI150','Por que ΔTml = 0/0 pode não ser erro?','Quando ΔT1 e ΔT2 se tornam iguais e positivos, a fórmula possui um limite bem definido: o valor comum.','quiz','ΔT média logarítmica'],
    ['CSJ030','Uma boa apresentação começa com uma pergunta','Ao discutir apostas e endividamento, compare benefícios alegados, riscos documentados e responsabilidade das partes.','reflexão','Fundamentos de ética social'],
    ['MED120','O amortecimento pode evitar vibração excessiva?','Ele dissipa energia e geralmente reduz a amplitude perto da ressonância, mas não elimina todas as forças excitadoras.','conceito','Amortecimento'],
    ['MEE120','Em condução radial, a área não é constante','Num cilindro, A(r)=2πrL: isso explica o logaritmo na resistência térmica.','conceito','Cilindros e esferas'],
    ['MEF120','No fresamento, quem gira?','Tipicamente é a ferramenta multicortante. Já no torneamento convencional, a peça gira.','quiz','Fresamento'],
    ['MEP230','Hill não é a mesma coisa que von Mises','Hill permite considerar comportamento anisotrópico sob determinadas hipóteses constitutivas.','conceito','Critério de Hill'],
    ['MEP140','Lewis e Hertz avaliam mecanismos diferentes','Lewis está ligado à tensão de flexão dos dentes; Hertz às tensões de contato.','conceito','Lewis e Hertz'],
    ['MRD230','Extrusão ou injeção?','Extrusão produz perfis contínuos; injeção usa cavidade de molde para obter peças.','quiz','Processamento'],
    ['MEI150','Se falta dado no projeto, não invente','Liste hipóteses e propriedades adotadas; uma planilha confiável torna a origem de cada parâmetro auditável.','reflexão','Relatórios e entregas']
  ];
  const feed=feedTopics.map(([subject,title,body,type,topic],i)=>({id:`feed${i+1}`,subject,title,body,type,topic}));
  return {subjects,questions,flashcards,feed,sources,version:'1.5.0',updated:'2026-10-23'};
})();

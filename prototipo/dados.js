// Dados simulados do prototipo SmartSec AI
// Baseados nas validacoes do projeto Startup One (PNCP, Sinesp/MJSP, ABESE/IBM e LGPD/ANPD)

const CUSTO_POSTO_12X36_ANUAL = 171570.75; // Fonte: Planilha oficial PNCP (posto 24h escala 12x36)
const CUSTO_POSTO_12X36_MENSAL = 14297.56;

const PERFIS_SINESP = {
  SP: {
    estado: "São Paulo (SP)",
    focoPrincipal: "Roubo de Carga em Docas, Furto Qualificado em Varejo e Invasão Perimetral",
    sensibilidadeDoca: "Máxima (98%)",
    pesos: [
      { categoria: "Movimentação atípica em docas fora de janela", peso: 96 },
      { categoria: "Permanência suspeita em estacionamento / varejo", peso: 89 },
      { categoria: "Tentativa de intrusão em perímetro noturno", peso: 94 },
      { categoria: "Risco de colisão empilhadeira × pedestre (SafetyTech)", peso: 88 }
    ],
    resumoSinesp: "Modelo calibrado segundo estatísticas estaduais do Sinesp/MJSP para SP: prioriza detecção precoce em docas logísticas, formação de grupos para furto em galerias comerciais e retenção de veículos em eclusas."
  },
  RJ: {
    estado: "Rio de Janeiro (RJ)",
    focoPrincipal: "Abordagem Veicular em Acessos, Escolta de Pátio e Perímetro Crítico",
    sensibilidadeDoca: "Alta (95%)",
    pesos: [
      { categoria: "Abordagem brusca de veículos na portaria/acesso", peso: 98 },
      { categoria: "Desvio de rota de caminhão no pátio externo", peso: 95 },
      { categoria: "Invasão de perímetro com ocultação facial", peso: 92 },
      { categoria: "Risco operacional e bloqueio de rota de fuga", peso: 86 }
    ],
    resumoSinesp: "Modelo calibrado segundo o Sinesp/MJSP para RJ: reforça leitura comportamental em vias de acesso, retenção em portarias de condomínios logísticos e alerta imediato para parada forçada de frota."
  },
  MG: {
    estado: "Minas Gerais (MG)",
    focoPrincipal: "Prevenção de Acidentes Industriais (SafetyTech), Pátios e Furto Patrimonial",
    sensibilidadeDoca: "Alta (91%)",
    pesos: [
      { categoria: "Quase-acidente: trajetória de máquinas × pedestres", peso: 97 },
      { categoria: "Circulação em área restrita sem EPI obrigatório", peso: 93 },
      { categoria: "Acesso não autorizado a depósito de insumos", peso: 90 },
      { categoria: "Intrusão em perímetro sob baixa visibilidade/neblina", peso: 88 }
    ],
    resumoSinesp: "Modelo calibrado para plantas industriais e centros de distribuição em MG: combina segurança patrimonial regionalizada com prevenção preditiva de acidentes de trabalho."
  }
};

const CAMERAS_CCO = [
  {
    id: "CAM-01",
    nome: "Doca de Carga 04 — Acesso Sul",
    setor: "Condomínio Logístico · Bloco A",
    imagemFundo: "img/cam01.jpg",
    status: "alerta_real",
    statusTexto: "AMEAÇA REAL CONFIRMADA",
    fps: 30,
    resolucao: "4K Edge AI",
    confiancaIA: 97,
    pessoasDetectadas: 2,
    rostosBorrados: 2,
    motivoAlerta: "Acesso não autorizado próximo a baia de caminhão fora da janela de descarga",
    acaoRecomendada: "Travar portão automático da Doca 04 e deslocar 1 vigilante motorizado",
    tempoEvento: "Há 18 segundos",
    coordenadasMapa: { x: 24, y: 65 },
    deteccoes: [
      { tipo: "colaborador", label: "Operador Doca · EPI OK", x: 10, y: 38, w: 20, h: 42, cor: "seguro", temRosto: true },
      { tipo: "pessoa_suspeita", label: "Indivíduo s/ crachá · 97%", x: 42, y: 36, w: 21, h: 44, cor: "critico", temRosto: true },
      { tipo: "veiculo", label: "Baia / Carga #4812", x: 72, y: 30, w: 22, h: 48, cor: "neutro", temRosto: false }
    ]
  },
  {
    id: "CAM-02",
    nome: "Corredor de Empilhadeiras — Galpão B2",
    setor: "Área Industrial · Cruzamento Cego",
    imagemFundo: "img/cam02.jpg",
    status: "alerta_preditivo",
    statusTexto: "ALERTA PREDITIVO (QUASE-ACIDENTE)",
    fps: 30,
    resolucao: "1080p Edge AI",
    confiancaIA: 94,
    pessoasDetectadas: 1,
    rostosBorrados: 1,
    motivoAlerta: "Rota de colisão prevista em 3,2s: Empilhadeira (18 km/h) × Pedestre no ponto cego",
    acaoRecomendada: "Sinal sonoro/luminoso acionado automaticamente no cruzamento B2",
    tempoEvento: "Há 42 segundos",
    coordenadasMapa: { x: 55, y: 38 },
    deteccoes: [
      { tipo: "empilhadeira", label: "Empilhadeira #07 · 18 km/h", x: 12, y: 36, w: 30, h: 42, cor: "aviso", temRosto: false },
      { tipo: "pedestre_risco", label: "Pedestre Ponto Cego · 3,2s", x: 60, y: 38, w: 20, h: 42, cor: "critico", temRosto: true }
    ]
  },
  {
    id: "CAM-03",
    nome: "Estacionamento Externo — Setor Norte",
    setor: "Shopping Center · Perímetro Aberto",
    imagemFundo: "img/cam03.jpg",
    status: "falso_filtrado",
    statusTexto: "FALSO POSITIVO SILENCIADO NA BORDA",
    fps: 30,
    resolucao: "1080p Edge AI",
    confiancaIA: 99,
    pessoasDetectadas: 0,
    rostosBorrados: 0,
    motivoAlerta: "Movimento causado por chuva forte, balanço de árvores e animal de rua (Cão)",
    acaoRecomendada: "Nenhuma ação — Alarme suprimido para evitar fadiga cognitiva do operador",
    tempoEvento: "Há 2 minutos",
    coordenadasMapa: { x: 32, y: 24 },
    deteccoes: [
      { tipo: "ambiental", label: "Vento / Vegetação · Ignorado", x: 10, y: 34, w: 28, h: 32, cor: "filtrado", temRosto: false },
      { tipo: "ambiental", label: "Animal (Cão) · Ignorado", x: 52, y: 56, w: 22, h: 22, cor: "filtrado", temRosto: false }
    ]
  },
  {
    id: "CAM-04",
    nome: "Portaria Principal & Eclusa de Pedestres",
    setor: "Acesso Corporativo · Recepção",
    imagemFundo: "img/cam04.jpg",
    status: "normal",
    statusTexto: "OPERAÇÃO NORMAL · LGPD ATIVA",
    fps: 30,
    resolucao: "4K Edge AI",
    confiancaIA: 99,
    pessoasDetectadas: 2,
    rostosBorrados: 2,
    motivoAlerta: "Fluxo regular de visitantes e colaboradores com biometria anonimizada na gravação",
    acaoRecomendada: "Monitoramento autônomo em execução",
    tempoEvento: "Tempo real",
    coordenadasMapa: { x: 78, y: 70 },
    deteccoes: [
      { tipo: "visitante", label: "Visitante · EPI OK", x: 6, y: 28, w: 17, h: 42, cor: "seguro", temRosto: true },
      { tipo: "visitante", label: "Colaborador · LGPD", x: 26, y: 30, w: 17, h: 40, cor: "seguro", temRosto: true }
    ]
  }
];

const FILA_EVENTOS = [
  {
    id: "EVT-904",
    horario: "11:42:18",
    camera: "CAM-01 · Doca de Carga 04",
    tipo: "real",
    severidade: "Crítica",
    titulo: "Intrusão humana em área restrita de doca fora de janela operacional",
    detalheIA: "Padrão Sinesp (SP): Permanência > 45s próxima ao lacre da carreta sem colete refletivo.",
    confianca: "97,4%",
    statusOperador: "Aguardando despacho",
    rostosProtegidos: "Sim (Borrão nativo Art. 11 LGPD)"
  },
  {
    id: "EVT-903",
    horario: "11:41:50",
    camera: "CAM-02 · Galpão B2 (Corredor)",
    tipo: "real",
    severidade: "Alta (SafetyTech)",
    titulo: "Quase-acidente previsto: convergência entre empilhadeira e pedestre",
    detalheIA: "Velocidade acima do limite (18 km/h) a 4 metros de esquina sem visibilidade. Alerta sonoro emitido.",
    confianca: "94,8%",
    statusOperador: "Mitigado automaticamente",
    rostosProtegidos: "Sim (Borrão nativo Art. 11 LGPD)"
  },
  {
    id: "EVT-902",
    horario: "11:40:12",
    camera: "CAM-03 · Estacionamento Norte",
    tipo: "falso",
    severidade: "Descartado",
    titulo: "Disparo de sensor de movimento por rajada de vento e galhos",
    detalheIA: "CFTV legado dispararia alarme sonoro. SmartSec AI classificou como ruído climático em 12ms.",
    confianca: "99,1%",
    statusOperador: "Silenciado pela IA",
    rostosProtegidos: "N/A (Sem humanos)"
  },
  {
    id: "EVT-901",
    horario: "11:38:45",
    camera: "CAM-03 · Estacionamento Norte",
    tipo: "falso",
    severidade: "Descartado",
    titulo: "Passagem de animal doméstico (cão) junto à cerca perimetral",
    detalheIA: "Classificação morfológica descartou silhueta humana. Operador não foi interrompido.",
    confianca: "98,7%",
    statusOperador: "Silenciado pela IA",
    rostosProtegidos: "N/A (Sem humanos)"
  },
  {
    id: "EVT-900",
    horario: "11:35:09",
    camera: "CAM-01 · Doca de Carga 04",
    tipo: "falso",
    severidade: "Descartado",
    titulo: "Reflexo de farol de caminhão sobre poça d'água na pista",
    detalheIA: "Variação brusca de luminância ignorada pelo filtro anti-fadiga.",
    confianca: "99,5%",
    statusOperador: "Silenciado pela IA",
    rostosProtegidos: "N/A (Sem humanos)"
  },
  {
    id: "EVT-899",
    horario: "11:29:33",
    camera: "CAM-02 · Galpão B2 (Corredor)",
    tipo: "real",
    severidade: "Média (SafetyTech)",
    titulo: "Colaborador circulando em zona de carga sem capacete de segurança (EPI)",
    detalheIA: "Detecção de conformidade SST: notificação enviada ao supervisor de turno.",
    confianca: "93,2%",
    statusOperador: "Notificado ao Líder SST",
    rostosProtegidos: "Sim (Borrão nativo Art. 11 LGPD)"
  },
  {
    id: "EVT-898",
    horario: "11:24:10",
    camera: "CAM-04 · Portaria Principal",
    tipo: "falso",
    severidade: "Descartado",
    titulo: "Sombra de nuvem e oscilação de iluminação no saguão externo",
    detalheIA: "Descartado na borda sem consumo de banda de gravação.",
    confianca: "99,8%",
    statusOperador: "Silenciado pela IA",
    rostosProtegidos: "N/A"
  }
];

const INCIDENTES_SAFETYTECH = [
  {
    id: "SST-01",
    setor: "Cruzamento Doca B2 × Corredor Central",
    risco: "Alto (89%)",
    ocorrencia: "14 quase-acidentes (empilhadeira × pedestre) registrados nos últimos 7 dias entre 11h e 13h.",
    recomendacaoIA: "Reduzir limite da empilhadeira para 10 km/h neste trecho e instalar barreira física no corredor lateral.",
    economiaEstimada: "Prevenção de afastamento INSS e ação regressiva trabalhista (estimativa R$ 85.000)"
  },
  {
    id: "SST-02",
    setor: "Plataforma Elevatória — Galpão A1",
    risco: "Médio (64%)",
    riscoCor: "aviso",
    ocorrencia: "6 ocorrências de acesso à área de içamento sem capacete ou colete refletivo no turno noturno.",
    recomendacaoIA: "Ativar trava eletrônica de catraca vinculada à validação visual de EPI pela câmera CAM-05.",
    economiaEstimada: "Mitigação de multa NR-12 / NR-06 e interdição de setor"
  },
  {
    id: "SST-03",
    setor: "Doca Externa 04 — Trânsito de Carretas",
    risco: "Alto (82%)",
    ocorrencia: "Manobra de ré sem auxiliar sinalizador e circulação simultânea de terceiros próximos ao ponto cego.",
    recomendacaoIA: "Isolamento dinâmico de faixa com alerta sonoro automático acionado pela SmartSec AI.",
    economiaEstimada: "Prevenção de sinistro patrimonial e responsabilidade civil solidária"
  }
];

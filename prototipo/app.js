// Logica interativa do prototipo SmartSec AI (Edicao Retro-Futurista Cyberpunk HUD)

let abaAtiva = "cco";
let cameraSelecionadaId = "CAM-01";
let lgpdAtiva = true;
let estadoSinespAtivo = "SP";
let filtroEventosAtivo = "todos";
let planoSelecionado = "enterprise";
let hudMinimizado = false;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function trocarAba(novaAba) {
  abaAtiva = novaAba;

  document.querySelectorAll(".cyber-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.aba === novaAba);
  });

  document.querySelectorAll(".tab-section").forEach((sec) => {
    sec.classList.toggle("active", sec.id === `aba-${novaAba}`);
  });
}

function alternarPainelFlutuante() {
  hudMinimizado = !hudMinimizado;
  const corpo = document.getElementById("corpoHudFlutuante");
  const btn = document.getElementById("btnMinimizarHud");
  if (corpo && btn) {
    corpo.classList.toggle("minimizado", hudMinimizado);
    btn.textContent = hudMinimizado ? "+ EXPANDIR" : "_ MINIMIZAR";
  }
}

function renderizarCameras() {
  const container = document.getElementById("gradeCameras");
  container.innerHTML = "";

  CAMERAS_CCO.forEach((cam) => {
    const selecionada = cam.id === cameraSelecionadaId ? "selecionada" : "";
    const caixasHtml = cam.deteccoes
      .map((det) => {
        let conteudoInterno = "";
        if (det.temRosto) {
          const corTorso = det.cor === "critico" ? "rgba(255, 42, 84, 0.58)" : "rgba(16, 185, 129, 0.55)";
          const classeMascara = lgpdAtiva ? "borrado" : "exposto";
          const textoMascara = lgpdAtiva ? "LGPD" : "S/ LGPD";
          conteudoInterno = `
            <div class="person-silhouette">
              <div class="face-box ${classeMascara}" title="Rosto anonimizado na borda (Art. 11 LGPD)">${textoMascara}</div>
              <svg class="torso-svg" viewBox="0 0 64 50" fill="none">
                <path d="M10 50 C10 26, 54 26, 54 50 Z" fill="${corTorso}" stroke="rgba(0, 240, 255, 0.55)" stroke-width="1.5"/>
              </svg>
            </div>
          `;
        }
        return `
          <div class="bbox ${det.cor}" style="left:${det.x}%; top:${det.y}%; width:${det.w}%; height:${det.h}%;">
            <span class="bbox-label">${det.label}</span>
            ${conteudoInterno}
          </div>
        `;
      })
      .join("");

    const chipLgpd = lgpdAtiva
      ? `<span class="lgpd-chip">🔒 LGPD: ${cam.rostosBorrados} ROSTO(S) BORRADO(S)</span>`
      : `<span class="lgpd-chip desativado">⚠️ LGPD OFF: BIOMETRIA EXPOSTA</span>`;

    const card = document.createElement("div");
    card.className = `cam-card status-${cam.status} ${selecionada}`;
    card.onclick = () => selecionarCamera(cam.id);

    card.innerHTML = `
      <div class="cam-viewport">
        <img src="${cam.imagemFundo}" class="cam-feed-img" alt="${cam.nome}" />
        <div class="cam-scene-bg"></div>
        <div class="cam-hud-top">
          <span class="cam-id-tag">${cam.id} // ${cam.resolucao} // ${cam.fps}FPS</span>
          <span class="cam-status-badge ${cam.status}">${cam.statusTexto}</span>
        </div>
        ${caixasHtml}
        <div class="cam-hud-bottom-overlay">
          <div class="chb-top">
            <span>${cam.nome}</span>
            <span class="chb-meta">IA: ${cam.confiancaIA}% · ${cam.tempoEvento}</span>
          </div>
          <div class="chb-desc">
            <span>${cam.motivoAlerta}</span>
            ${chipLgpd}
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  renderizarPainelInspetor();
}

function selecionarCamera(idCamera) {
  cameraSelecionadaId = idCamera;
  renderizarCameras();
}

function renderizarPainelInspetor() {
  const cam = CAMERAS_CCO.find((c) => c.id === cameraSelecionadaId) || CAMERAS_CCO[0];
  const painel = document.getElementById("painelCameraDetalhe");

  const statusLgpdTexto = lgpdAtiva
    ? `ATIVO (${cam.rostosBorrados} PROTEGIDOS)`
    : `OFF (RISCO ANPD)`;

  painel.innerHTML = `
    <div class="cyber-row-list">
      <div class="cyber-row-item">
        <span>CANAL SELECIONADO</span>
        <strong>◀ ${cam.id} · ${cam.setor} ▶</strong>
      </div>
      <div class="cyber-row-item">
        <span>CONFIANÇA NEURAL</span>
        <strong>◀ ${cam.confiancaIA}% (${estadoSinespAtivo}) ▶</strong>
      </div>
      <div class="cyber-row-item">
        <span>PRIVACY BY DESIGN</span>
        <strong>◀ ${statusLgpdTexto} ▶</strong>
      </div>
      <div class="cyber-row-item">
        <span>AÇÃO RECOMENDADA</span>
        <strong style="color:#fbbf24; font-size:9.5px;">${cam.acaoRecomendada}</strong>
      </div>
    </div>
    <div style="display:flex; gap:6px; margin-top:6px;">
      <button class="btn-acao" style="flex:1" onclick="despacharOcorrencia('${cam.id}')">
        🚓 DESPACHAR RONDA
      </button>
      <button class="btn-acao secundario" onclick="trocarAba('safetytech')">
        🗺️ RADAR GALPÃO
      </button>
    </div>
  `;
}

function alternarLgpd(ativo) {
  lgpdAtiva = ativo;
  const textoToggle = document.getElementById("textoStatusLgpd");
  const btnTopo = document.getElementById("btnToggleLgpdTopo");

  if (ativo) {
    textoToggle.textContent = "🔒 LGPD: BORRÃO ON";
    btnTopo.classList.add("lgpd-on");
    btnTopo.classList.remove("lgpd-off");
    mostrarNotificacao("🔒 MÓDULO PRIVACY BY DESIGN (ART. 11 LGPD) ATIVO: Rostos anonimizados na borda antes da gravação.");
  } else {
    textoToggle.textContent = "⚠️ LGPD: BORRÃO OFF";
    btnTopo.classList.remove("lgpd-on");
    btnTopo.classList.add("lgpd-off");
    mostrarNotificacao("⚠️ ALERTA JURÍDICO: Sem anonimização na borda, o CFTV expõe a operação a multas da ANPD de até R$ 50 milhões.");
  }

  renderizarCameras();
}

function selecionarEstadoSinesp(uf) {
  estadoSinespAtivo = uf;
  const perfil = PERFIS_SINESP[uf];

  document.querySelectorAll(".uf-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.uf === uf);
  });

  document.getElementById("badgeUfAtiva").textContent = uf;
  document.getElementById("resumoFocoSidebar").textContent = perfil.focoPrincipal.split(",")[0];
  document.getElementById("ufTituloCard").textContent = uf;
  document.getElementById("descricaoSinespCard").textContent = perfil.resumoSinesp;

  const barrasContainer = document.getElementById("barrasSinesp");
  barrasContainer.innerHTML = perfil.pesos
    .slice(0, 3)
    .map(
      (item) => `
      <div class="sbar-item">
        <div class="sbar-head">
          <span>${item.categoria}</span>
          <strong>${item.peso}%</strong>
        </div>
        <div class="sbar-track">
          <div class="sbar-fill" style="width:${item.peso}%"></div>
        </div>
      </div>
    `
    )
    .join("");

  renderizarPainelInspetor();
}

function simularDisparoAmbiental() {
  if (abaAtiva !== "cco") trocarAba("cco");
  selecionarCamera("CAM-03");
  mostrarNotificacao(
    "🌧️ TESTE ANTI-FADIGA [CAM-03]: Chuva e vento detectados. O CFTV comum dispararia alarme falso; a SmartSec AI silenciou em 11ms!"
  );
}

function despacharOcorrencia(camId) {
  mostrarNotificacao(
    `🚓 PROTOCOLO TÁTICO ENVIADO [${camId}]: Equipe acionada com clipe de 10s e biometria de terceiros borrada (LGPD).`
  );
}

function mostrarNotificacao(mensagem) {
  const banner = document.getElementById("bannerNotificacao");
  banner.innerHTML = `
    <span>${mensagem}</span>
    <button class="btn-acao secundario" style="padding:3px 8px; font-size:10px;" onclick="fecharNotificacao()">[X]</button>
  `;
  banner.classList.remove("oculto");
}

function fecharNotificacao() {
  document.getElementById("bannerNotificacao").classList.add("oculto");
}

function filtrarEventos(filtro) {
  filtroEventosAtivo = filtro;
  document.querySelectorAll(".pill-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filtro === filtro);
  });
  renderizarTabelaEventos();
}

function renderizarTabelaEventos() {
  const tbody = document.getElementById("tabelaEventosBody");
  const lista = FILA_EVENTOS.filter((ev) => {
    if (filtroEventosAtivo === "todos") return true;
    return ev.tipo === filtroEventosAtivo;
  });

  tbody.innerHTML = lista
    .map((ev) => {
      const classeBadge = ev.tipo === "real" ? "real" : "falso";
      const textoBadge = ev.tipo === "real" ? `🚨 ${ev.severidade}` : `🛡️ FALSO POSITIVO FILTRADO`;
      return `
        <tr>
          <td>
            <strong style="font-family:'JetBrains Mono',monospace;">${ev.horario}</strong><br/>
            <span style="font-size:10.5px; color:#00f0ff; font-family:'JetBrains Mono',monospace;">${ev.id}</span>
          </td>
          <td><strong>${ev.camera}</strong></td>
          <td>
            <span class="badge-evt ${classeBadge}">${textoBadge}</span><br/>
            <small style="color:#94a3b8; font-size:10px;">Confiança: ${ev.confianca}</small>
          </td>
          <td>
            <strong>${ev.titulo}</strong><br/>
            <span style="color:#94a3b8; font-size:11px;">${ev.detalheIA}</span>
          </td>
          <td style="font-size:11px; color:#00f0ff; font-family:'JetBrains Mono',monospace;">${ev.rostosProtegidos}</td>
          <td><strong>${ev.statusOperador}</strong></td>
        </tr>
      `;
    })
    .join("");
}

function renderizarSafetyTech() {
  const container = document.getElementById("listaSafetyTech");
  container.innerHTML = INCIDENTES_SAFETYTECH.map(
    (item) => `
      <div class="safety-item">
        <div class="safety-item-head">
          <strong>${item.id} // ${item.setor}</strong>
          <span class="badge-evt real">RISCO ${item.risco}</span>
        </div>
        <p>${item.ocorrencia}</p>
        <div class="safety-rec"><strong>💡 AÇÃO PREDITIVA:</strong> ${item.recomendacaoIA}</div>
        <div class="safety-econ">✔️ IMPACTO: ${item.economiaEstimada}</div>
      </div>
    `
  ).join("");
}

function selecionarPlano(plano) {
  planoSelecionado = plano;
  document.getElementById("btnPlanoCore").classList.toggle("active", plano === "core");
  document.getElementById("btnPlanoEnterprise").classList.toggle("active", plano === "enterprise");
  calcularRoi();
}

function calcularRoi() {
  const postosAtuais = parseInt(document.getElementById("inputPostos").value, 10);
  const cameras = parseInt(document.getElementById("inputCameras").value, 10);
  const faturamentoMilhoes = parseInt(document.getElementById("inputFaturamento").value, 10);

  document.getElementById("valPostos").textContent = `${postosAtuais} postos`;
  document.getElementById("valCameras").textContent = `${cameras} câmeras`;
  document.getElementById("valFaturamento").textContent = `R$ ${faturamentoMilhoes} milhões`;

  const postosOtimizados = Math.max(1, Math.ceil(postosAtuais / 3));
  const postosEconomizados = Math.max(1, postosAtuais - postosOtimizados);

  const custoAtualAnual = postosAtuais * CUSTO_POSTO_12X36_ANUAL;
  const precoPorCamera = planoSelecionado === "enterprise" ? 129 : 89;
  const custoSaasMensal = cameras * precoPorCamera;
  const custoSaasAnual = custoSaasMensal * 12;

  const novoCustoAnual = postosOtimizados * CUSTO_POSTO_12X36_ANUAL + custoSaasAnual;
  const economiaLiquidaAnual = Math.max(0, custoAtualAnual - novoCustoAnual);
  const economiaLiquidaMensal = economiaLiquidaAnual / 12;

  const percentualNovoCusto = Math.min(95, Math.round((novoCustoAnual / custoAtualAnual) * 100));
  const paybackMeses = Math.max(0.4, (custoSaasMensal * 1.5) / Math.max(1, economiaLiquidaMensal)).toFixed(1).replace(".", ",");

  const multaPotencialMilhoes = Math.min(50, faturamentoMilhoes * 0.02);
  const multaFormatada = formatarMoeda(multaPotencialMilhoes * 1000000);

  document.getElementById("roiEconomiaAnual").textContent = `${formatarMoeda(economiaLiquidaAnual)} / ano`;
  document.getElementById("roiResumoPostos").innerHTML = `Redução de <strong>${postosAtuais} para ${postosOtimizados} posto(s) humano(s)</strong> (otimização de ${postosEconomizados} posto(s) passivo(s) 12×36 substituídos por triagem Edge AI)`;
  document.getElementById("roiPayback").textContent = `${paybackMeses} mês`;
  document.getElementById("roiCustoAtual").textContent = formatarMoeda(custoAtualAnual);
  document.getElementById("roiNovoCusto").textContent = formatarMoeda(novoCustoAnual);
  document.getElementById("barraNovoCusto").style.width = `${percentualNovoCusto}%`;
  document.getElementById("roiEconomiaMensal").textContent = `${formatarMoeda(economiaLiquidaMensal)} / mês`;
  document.getElementById("roiInvestimentoSaas").textContent = `${formatarMoeda(custoSaasMensal)} / mês`;
  document.getElementById("roiDetalheSaas").textContent = `${cameras} câmeras × R$ ${precoPorCamera} (${planoSelecionado === "enterprise" ? "Enterprise" : "Core"})`;
  document.getElementById("roiMultaEvitada").textContent = `Até ${multaFormatada}`;
}

window.addEventListener("DOMContentLoaded", () => {
  selecionarEstadoSinesp("SP");
  renderizarCameras();
  renderizarTabelaEventos();
  renderizarSafetyTech();
  calcularRoi();

  const params = new URLSearchParams(window.location.search);
  const abaParam = params.get("aba");
  if (abaParam && ["cco", "antifadiga", "safetytech", "roi"].includes(abaParam)) {
    trocarAba(abaParam);
  }
});

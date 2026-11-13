import os
import shutil
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

BASE_DIR = r"C:\Users\rsrx1\OneDrive\Desktop\ADS FIAP\SmartSec AI"
ENTREGA_DIR = os.path.join(BASE_DIR, "entrega")
PRINTS_DIR = os.path.join(ENTREGA_DIR, "prints")
TEMPLATE_DOCX = os.path.join(ENTREGA_DIR, "Template_Original_Cap08.docx")
OUTPUT_DOCX = os.path.join(ENTREGA_DIR, "2TDS_Fase04_Cap08_Atividade_Prototipacao_Startup_One_RM566997.docx")
OUTPUT_HTML = os.path.join(ENTREGA_DIR, "documento_entrega.html")

DESCRICAO_UMA_LINHA = (
    "A SmartSec AI reduz o alto custo e os falsos alarmes do CFTV passivo com IA preditiva e LGPD na borda."
)

TELAS_PROTOTIPO = [
    {
        "arquivo": "01_cco_monitoramento_lgpd.png",
        "titulo": "Tela 1 — Central de Monitoramento Preditivo (CCO Ao Vivo, Borrão Facial LGPD e Calibração Sinesp)",
        "comentario": (
            "Visão principal do operador na Central de Controle Operacional (CCO), projetada para substituir múltiplos "
            "postos de observação humana passiva por uma triagem ativa assistida por IA acoplada às câmeras já instaladas. "
            "Na grade ao vivo de 4 câmeras, a Visão Computacional destaca apenas eventos relevantes com caixas delimitadoras "
            "coloridas por criticidade (vermelho para ameaça real na Doca 04, âmbar para risco de quase-acidente no Galpão B2, "
            "cinza tracejado para falso positivo ambiental ignorado e verde para fluxo regular). O painel lateral esquerdo permite "
            "ativar/desativar em tempo real o módulo Privacy by Design (Art. 11 da LGPD), aplicando borrão facial nativo na borda "
            "antes da gravação em disco, além de alternar a Calibração Regional Sinesp/MJSP (SP, RJ, MG) que ajusta os pesos "
            "do algoritmo conforme a dinâmica criminal específica de cada estado."
        ),
        "url_direta": "https://smartsec-ai.vercel.app/?aba=cco"
    },
    {
        "arquivo": "02_filtro_antifadiga_alarmes.png",
        "titulo": "Tela 2 — Motor Anti-Fadiga de Alarmes (Triagem Inteligente: Ameaça Real vs. Falso Positivo Ambiental)",
        "comentario": (
            "Materializa a solução para a Dor Operacional validada com 78% dos gestores na etapa anterior e fundamentada "
            "pelos estudos da ABESE e IBM (Alert Fatigue). O painel comparativo superior contrasta o CFTV tradicional passivo "
            "(142 disparos/dia, sendo 94% ruídos climáticos que esgotam a atenção humana) com o motor da SmartSec AI "
            "(que descarta 139 falsos positivos causados por chuva, vento, faróis e animais em menos de 15ms na borda e "
            "entrega apenas 3 alertas reais verificados). O usuário pode filtrar a tabela auditável entre 'Todos os Eventos', "
            "'Apenas Ameaças Reais' e 'Falsos Positivos Silenciados', verificando o grau de confiança da IA e o status de proteção biométrica."
        ),
        "url_direta": "https://smartsec-ai.vercel.app/?aba=antifadiga"
    },
    {
        "arquivo": "03_mapa_preditivo_safetytech.png",
        "titulo": "Tela 3 — Planta Tática Preditiva: Prevenção de Quase-Acidentes (SafetyTech) e Rastreamento Multi-Câmera",
        "comentario": (
            "Atende à dor de perda de rastreamento manual de suspeitos por sobrecarga visual e incorpora a prevenção preditiva "
            "de acidentes de trabalho (SafetyTech / NR-12 e NR-06). O mapa tático do complexo comercial e logístico traça "
            "automaticamente o vetor de deslocamento de um indivíduo suspeito entre diferentes câmeras (da CAM-03 às 11:39 "
            "para a Doca Sul CAM-01 às 11:42) e antecipa em 3,2 segundos uma rota de colisão entre empilhadeira (18 km/h) "
            "e pedestre em ponto cego no Galpão B2, acionando alerta luminoso/sonoro preventivo antes que o acidente ocorra."
        ),
        "url_direta": "https://smartsec-ai.vercel.app/?aba=safetytech"
    },
    {
        "arquivo": "04_simulador_roi_12x36_pncp.png",
        "titulo": "Tela 4 — Simulador Comercial B2B de ROI (Otimização da Escala 12×36 PNCP e Blindagem contra Multas ANPD)",
        "comentario": (
            "Ferramenta consultiva desenvolvida a partir do principal aprendizado da validação de mercado (onde 54% dos "
            "decisores elegeram a redução do custo da folha 12×36 como prioridade absoluta e 86% demonstraram disposição "
            "imediata para realocar orçamento em IA). Utilizando o valor oficial do Portal Nacional de Contratações Públicas "
            "(PNCP) de R$ 171.570,75/ano por posto 24h, o cliente ajusta controles deslizantes (sliders) de postos atuais, "
            "quantidade de câmeras e faturamento anual, visualizando instantaneamente a economia líquida anual (R$ 611.979,00/ano "
            "em uma operação de 6 postos), o payback de 0,4 mês e o passivo jurídico evitado contra multas da ANPD (até 2% do faturamento)."
        ),
        "url_direta": "https://smartsec-ai.vercel.app/?aba=roi"
    }
]


def gerar_docx():
    doc = docx.Document(TEMPLATE_DOCX)

    # Limpar paragrafos vazios extras mantendo a estrutura original
    # Vamos reconstruir o corpo logo abaixo do titulo principal do template
    for p in list(doc.paragraphs):
        p._element.getparent().remove(p._element)

    # Cabecalho de identificacao academica
    p_aluno = doc.add_paragraph()
    r1 = p_aluno.add_run("Aluno: ")
    r1.bold = True
    r1.font.size = Pt(10.5)
    r2 = p_aluno.add_run("Renan Santa Rosa Xavier  |  ")
    r2.font.size = Pt(10.5)
    r3 = p_aluno.add_run("RM: ")
    r3.bold = True
    r3.font.size = Pt(10.5)
    r4 = p_aluno.add_run("566997  |  ")
    r4.font.size = Pt(10.5)
    r5 = p_aluno.add_run("Projeto Startup One: ")
    r5.bold = True
    r5.font.size = Pt(10.5)
    r6 = p_aluno.add_run("SmartSec AI (Sistema Inteligente de Monitoramento Preditivo e Dinâmico)")
    r6.font.size = Pt(10.5)

    p_tema = doc.add_paragraph()
    rt1 = p_tema.add_run("Tema: ")
    rt1.bold = True
    rt1.font.size = Pt(10)
    rt2 = p_tema.add_run(
        "As Dores dos Sistemas de Monitoramento por Sistemas de Segurança Dinâmica, e a Possibilidade do "
        "Desenvolvimento para Sistemas Inteligentes Através da Inteligência Artificial e seu Impacto Econômico no Meio."
    )
    rt2.italic = True
    rt2.font.size = Pt(10)

    # Titulo Oficial do Template
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = p_title.add_run("ATIVIDADE DE PROTOTIPAÇÃO (Startup One)")
    run_title.bold = True
    run_title.font.size = Pt(14)
    run_title.font.color.rgb = RGBColor(237, 20, 91)

    # PERGUNTA 1 DO TEMPLATE
    p_q1 = doc.add_paragraph()
    rq1 = p_q1.add_run("1. Em uma linha, descreva o seu projeto de startup, incluindo o problema e a solução:")
    rq1.bold = True
    rq1.font.size = Pt(11.5)

    p_a1 = doc.add_paragraph()
    ra1 = p_a1.add_run(DESCRICAO_UMA_LINHA)
    ra1.font.size = Pt(10.5)

    # PERGUNTA 2 DO TEMPLATE
    p_q2 = doc.add_paragraph()
    rq2 = p_q2.add_run("2. Coloque aqui os prints do seu protótipo e comentários, se julgar necessário.")
    rq2.bold = True
    rq2.font.size = Pt(11.5)

    p_intro2 = doc.add_paragraph()
    r_intro2 = p_intro2.add_run(
        "O protótipo navegável da SmartSec AI foi desenvolvido como uma aplicação web interativa B2B focada no contexto "
        "real de Diretores de Operações, Gestores de Segurança Patrimonial e Operadores de CCO (Shopping Centers, "
        "Condomínios Logísticos e Indústrias). Abaixo estão os 4 módulos que tangibilizam a proposta de valor validada:"
    )
    r_intro2.font.size = Pt(10)

    for tela in TELAS_PROTOTIPO:
        p_t = doc.add_paragraph()
        rt = p_t.add_run(tela["titulo"])
        rt.bold = True
        rt.font.size = Pt(10.5)
        rt.font.color.rgb = RGBColor(190, 18, 60)

        caminho_img = os.path.join(PRINTS_DIR, tela["arquivo"])
        if os.path.exists(caminho_img):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.add_run().add_picture(caminho_img, width=Inches(6.1))

        p_c = doc.add_paragraph()
        rc_label = p_c.add_run("Comentário Técnico e de Usabilidade: ")
        rc_label.bold = True
        rc_label.font.size = Pt(9.5)
        rc_text = p_c.add_run(tela["comentario"])
        rc_text.font.size = Pt(9.5)

    # PERGUNTA 3 DO TEMPLATE
    p_q3 = doc.add_paragraph()
    rq3 = p_q3.add_run("3. Compartilhe o link navegável do seu protótipo (se possível).")
    rq3.bold = True
    rq3.font.size = Pt(11.5)

    p_a3 = doc.add_paragraph()
    ra3_1 = p_a3.add_run("• Link Navegável Principal (Produção Vercel — Acesso Público sem senha): ")
    ra3_1.bold = True
    ra3_1.font.size = Pt(10.5)
    ra3_2 = p_a3.add_run("https://smartsec-ai.vercel.app\n")
    ra3_2.bold = True
    ra3_2.font.size = Pt(11)
    ra3_2.font.color.rgb = RGBColor(2, 132, 199)

    ra3_3 = p_a3.add_run(
        "• Atalhos diretos para cada módulo do protótipo:\n"
        "   - Módulo 1 (CCO Ao Vivo + Borrão Facial LGPD + Calibração Sinesp): https://smartsec-ai.vercel.app/?aba=cco\n"
        "   - Módulo 2 (Filtro Anti-Fadiga de Alarmes Ambientais): https://smartsec-ai.vercel.app/?aba=antifadiga\n"
        "   - Módulo 3 (Mapa Tático Preditivo SafetyTech & Rastreamento): https://smartsec-ai.vercel.app/?aba=safetytech\n"
        "   - Módulo 4 (Simulador Comercial de ROI 12×36 PNCP & Blindagem ANPD): https://smartsec-ai.vercel.app/?aba=roi"
    )
    ra3_3.font.size = Pt(9.5)

    doc.save(OUTPUT_DOCX)
    print("DOCX salvo em:", OUTPUT_DOCX)


def gerar_html():
    logo_path = "file:///" + os.path.join(ENTREGA_DIR, "fiap_logo.png").replace("\\", "/")

    cards_html = ""
    for idx, tela in enumerate(TELAS_PROTOTIPO, start=1):
        img_url = "file:///" + os.path.join(PRINTS_DIR, tela["arquivo"]).replace("\\", "/")
        cards_html += f"""
        <div class="screen-block">
          <div class="screen-header">
            <span class="screen-badge"> TELA 0{idx} </span>
            <h3>{tela["titulo"]}</h3>
          </div>
          <div class="screen-img-wrap">
            <img src="{img_url}" alt="{tela["titulo"]}" />
          </div>
          <div class="screen-comment">
            <strong>Comentário de Contexto, Usabilidade e Validação:</strong> {tela["comentario"]}
            <div class="screen-direct-link">
              🔗 Acesso direto à tela: <a href="{tela["url_direta"]}">{tela["url_direta"]}</a>
            </div>
          </div>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>ATIVIDADE DE PROTOTIPAÇÃO (Startup One) — SmartSec AI — RM 566997</title>
  <style>
    @page {{
      size: A4;
      margin: 11mm 14mm 11mm 14mm;
    }}
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    body {{
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
      background: #ffffff;
      font-size: 9.8pt;
      line-height: 1.38;
    }}
    .header-top {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #c8104f;
      padding-bottom: 6px;
      margin-bottom: 8px;
    }}
    .fiap-logo {{
      height: 28px;
    }}
    .header-meta {{
      text-align: right;
      font-size: 8.5pt;
      color: #4b5563;
    }}
    .doc-title {{
      text-align: center;
      font-size: 13pt;
      font-weight: 700;
      margin: 6px 0 8px;
      color: #111827;
      letter-spacing: 0.02em;
    }}
    .student-box {{
      background: #f9fafb;
      border: 1px solid #d1d5db;
      border-left: 4px solid #c8104f;
      padding: 6px 10px;
      margin-bottom: 9px;
      font-size: 9.2pt;
    }}
    .student-box p {{
      margin-bottom: 2px;
    }}
    .student-box p:last-child {{
      margin-bottom: 0;
    }}
    .section-banner {{
      background: #c83250;
      color: #ffffff;
      font-weight: 700;
      font-size: 10pt;
      padding: 5px 10px;
      border: 1px solid #111827;
      margin-top: 8px;
    }}
    .section-body {{
      border: 1px solid #111827;
      border-top: none;
      padding: 8px 10px;
      margin-bottom: 9px;
      background: #ffffff;
    }}
    .one-line-box {{
      font-size: 9.8pt;
      line-height: 1.42;
      color: #111827;
      text-align: justify;
    }}
    .pills-summary {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 7px;
      padding-top: 7px;
      border-top: 1px dashed #d1d5db;
    }}
    .pill-card {{
      background: #fdf2f4;
      border: 1px solid #f9a8d4;
      border-radius: 5px;
      padding: 5px 7px;
      font-size: 8.2pt;
    }}
    .pill-card strong {{
      display: block;
      color: #9d174d;
      font-size: 8.5pt;
      margin-bottom: 1px;
    }}
    .screen-block {{
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 9px;
      background: #f8fafc;
      break-inside: avoid;
    }}
    .screen-header {{
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 5px;
    }}
    .screen-badge {{
      background: #c83250;
      color: #fff;
      font-weight: 700;
      font-size: 8pt;
      padding: 2px 7px;
      border-radius: 4px;
      white-space: nowrap;
    }}
    .screen-header h3 {{
      font-size: 9.6pt;
      color: #0f172a;
    }}
    .screen-img-wrap {{
      border: 1px solid #94a3b8;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 5px;
      background: #090d16;
      text-align: center;
    }}
    .screen-img-wrap img {{
      width: 100%;
      max-height: 182px;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }}
    .screen-comment {{
      font-size: 8.8pt;
      color: #1e293b;
      text-align: justify;
      line-height: 1.36;
    }}
    .screen-direct-link {{
      margin-top: 3px;
      font-size: 8.4pt;
      color: #0369a1;
      font-weight: 700;
    }}
    .screen-direct-link a {{
      color: #0284c7;
      text-decoration: underline;
    }}
    .sec3-wrapper {{
      break-inside: avoid;
    }}
    .link-callout {{
      background: #f0f9ff;
      border: 2px solid #0284c7;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 8px;
    }}
    .link-callout .main-url {{
      font-size: 12.5pt;
      font-weight: 700;
      color: #0369a1;
      display: block;
      margin: 3px 0 6px;
    }}
    .links-list {{
      margin-left: 18px;
      font-size: 9.2pt;
      line-height: 1.55;
    }}
    .links-list a {{
      color: #c8104f;
      font-weight: 700;
      text-decoration: underline;
    }}
  </style>
</head>
<body>

  <div class="header-top">
    <img src="{logo_path}" alt="FIAP" class="fiap-logo" />
    <div class="header-meta">
      <strong>Tecnologia em Análise e Desenvolvimento de Sistemas (2TDS)</strong><br/>
      Fase 04 · Capítulo 08 · Startup One — Atividade de Prototipação
    </div>
  </div>

  <div class="doc-title">ATIVIDADE DE PROTOTIPAÇÃO (Startup One)</div>

  <div class="student-box">
    <p><strong>Aluno:</strong> Renan Santa Rosa Xavier &nbsp;|&nbsp; <strong>RM:</strong> 566997 &nbsp;|&nbsp; <strong>Startup:</strong> SmartSec AI (Sistema Inteligente de Monitoramento Preditivo e Dinâmico)</p>
    <p><strong>Tema:</strong> As Dores dos Sistemas de Monitoramento por Sistemas de Segurança Dinâmica, e a Possibilidade do Desenvolvimento para Sistemas Inteligentes Através da Inteligência Artificial e seu Impacto Econômico no Meio.</p>
  </div>

  <!-- QUESTAO 1 DO TEMPLATE -->
  <div class="section-banner">
    1. Em uma linha, descreva o seu projeto de startup, incluindo o problema e a solução:
  </div>
  <div class="section-body">
    <p class="one-line-box" style="white-space: nowrap;">
      <strong>{DESCRICAO_UMA_LINHA}</strong>
    </p>
  </div>

  <!-- QUESTAO 2 DO TEMPLATE -->
  <div class="section-banner">
    2. Coloque aqui os prints do seu protótipo e comentários, se julgar necessário.
  </div>
  <div class="section-body">
    <p style="font-size: 9.3pt; color: #374151; margin-bottom: 9px;">
      O protótipo navegável da <strong>SmartSec AI</strong> foi construído pensando na jornada intuitiva de dois perfis complementares: o <strong>Operador/Supervisor de CCO</strong> (que precisa de telas limpas, sem fadiga de alarmes falsos e com rastreamento preditivo) e o <strong>Diretor de Operações / Segurança B2B</strong> (que valida a redução imediata da folha 12×36 e a conformidade com a LGPD).
    </p>
    {cards_html}
  </div>

  <!-- QUESTAO 3 DO TEMPLATE -->
  <div class="sec3-wrapper">
    <div class="section-banner">
      3. Compartilhe o link navegável do seu protótipo (se possível).
    </div>
    <div class="section-body">
      <div class="link-callout">
        <strong>🌐 Link Público Navegável do Protótipo (Hospedado em Produção na Vercel):</strong>
        <a class="main-url" href="https://smartsec-ai.vercel.app">https://smartsec-ai.vercel.app</a>
        <span style="font-size: 8.8pt; color: #334155;">
          O protótipo é 100% interativo e aberto (não requer login). Nele é possível alternar entre as 4 abas no menu lateral, ligar/desligar o <strong>Borrão Facial LGPD (Privacy by Design)</strong> nas câmeras ao vivo, trocar a <strong>Calibração Criminal Sinesp (SP, RJ e MG)</strong>, simular disparos climáticos de chuva/vento, filtrar a fila de alarmes e testar os controles deslizantes do <strong>Simulador de ROI 12×36</strong>.
        </span>
      </div>

      <ul class="links-list">
        <li><strong>Acesso Direto — Tela 1 (Central CFTV Ao Vivo + LGPD + Sinesp):</strong> <a href="https://smartsec-ai.vercel.app/?aba=cco">https://smartsec-ai.vercel.app/?aba=cco</a></li>
        <li><strong>Acesso Direto — Tela 2 (Filtro Anti-Fadiga: Real vs. Falso Positivo):</strong> <a href="https://smartsec-ai.vercel.app/?aba=antifadiga">https://smartsec-ai.vercel.app/?aba=antifadiga</a></li>
        <li><strong>Acesso Direto — Tela 3 (Mapa Tático Preditivo SafetyTech &amp; Rastreamento):</strong> <a href="https://smartsec-ai.vercel.app/?aba=safetytech">https://smartsec-ai.vercel.app/?aba=safetytech</a></li>
        <li><strong>Acesso Direto — Tela 4 (Simulador Comercial de ROI 12×36 PNCP &amp; ANPD):</strong> <a href="https://smartsec-ai.vercel.app/?aba=roi">https://smartsec-ai.vercel.app/?aba=roi</a></li>
      </ul>
    </div>
  </div>

</body>
</html>
"""
    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)
    print("HTML salvo em:", OUTPUT_HTML)


if __name__ == "__main__":
    gerar_docx()
    gerar_html()

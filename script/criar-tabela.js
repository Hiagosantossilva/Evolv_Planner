// ================================================
//  CRIAÇÃO DE TABELAS
// ================================================
function criarTabela() {

    const criadorElement = document.getElementById("criador");
    if (!criadorElement) return;

    const nova = document.createElement("div");
    nova.innerHTML = `
        <div class="criadorTabela">

            <button class="btnFecharCriador" onclick="fecharCriador()">✕</button>

            <p>
                <label for="linhas">Linhas</label>
                <input type="number" id="linhas" min="1" max="20" value="3">
            </p>

            <p>
                <label for="colunas">Colunas</label>
                <input type="number" id="colunas" min="1" max="20" value="3">
            </p>

            <p>
                <button class="btnTarefasOpcoes" onclick="gerarTabela()">
                    <img src="midias/icon/add.svg" alt="">
                    Gerar Tabela
                </button>
            </p>

            <div id="previewTabela"></div>

            <p>
                <button id="btnSalvarTabela" class="btnTarefasOpcoes" style="display:none" onclick="salvarTabela()">
                    <img src="midias/icon/save.svg" alt="">
                    Salvar Tabela
                </button>
            </p>
        </div>
    `;

    criadorElement.appendChild(nova);

    const botaoPadrao = document.getElementById("btnPadrao");
    if (botaoPadrao) botaoPadrao.style.display = "none";
    document.querySelectorAll(".btnCriar").forEach(btn => btn.style.display = "none");

}

function gerarTabela() {
    const linhas = parseInt(document.getElementById("linhas")?.value || "0", 10);
    const colunas = parseInt(document.getElementById("colunas")?.value || "0", 10);
    const preview = document.getElementById("previewTabela");

    if (!preview) return;
    if (linhas <= 0 || colunas <= 0) return;

    let html = `<table class="tabelaGerada">`;

    for (let i = 0; i < linhas; i++) {
        html += "<tr>";
        for (let j = 0; j < colunas; j++) {
            html += `<td contenteditable="true"></td>`;
        }
        html += "</tr>";
    }

    html += "</table>";

    preview.innerHTML = html;

    const btnSalvar = document.getElementById("btnSalvarTabela");
    if (btnSalvar) btnSalvar.style.display = "flex";
}

function salvarTabela() {
    const preview = document.getElementById("previewTabela");
    if (!preview) return;

    const tabelaHTML = preview.innerHTML.trim();
    if (!tabelaHTML) return;

    let itens = [];
    try {
        itens = JSON.parse(localStorage.getItem("roadmapItens")) || [];
    } catch (e) {
        console.error("Erro ao ler roadmapItens:", e);
    }

    itens.push({
        tipo: "tabela",
        conteudo: tabelaHTML
    });

    localStorage.setItem("roadmapItens", JSON.stringify(itens));

    location.reload();

}

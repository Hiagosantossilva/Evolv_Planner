// ================================================
//  CRIAÇÃO DE TAREFAS (FORM POPUP)
// ================================================
const criadorElement = document.getElementById("criador");

function criarTarefa() {

    if (!criadorElement) return;

    const novaTarefa = document.createElement("div");

    novaTarefa.innerHTML = `
        <button type="button" class="btnFecharCriador" onclick="fecharCriador()">✕</button>

        <p>
            <label for="nome">Nome</label>
            <input type="text" name="nome" id="nome" placeholder="Insira o nome">
        </p>

        <p>
            <label for="descricao">Descrição</label>
            <input type="text" name="descricao" id="descricao" placeholder="Insira uma descrição">
        </p>

        <p>
            <label for="pontos">Pontos</label>
            <input type="number" name="pontos" id="pontos" min="1" max="10" value="1">

            <label for="data">Data</label>
            <input type="datetime-local" name="data" id="data">
        </p>

        <p>
            <button id="btnAdicionarTarefa" onclick="obterDadosDeFormulario()" class="btnTarefasOpcoes">
                <img src="midias/icon/add.svg" alt="adicionar tarefa">
                Adicionar Tarefa
            </button>
        </p>
    `;

    criadorElement.appendChild(novaTarefa);

    const botaoPadrao = document.getElementById("btnPadrao");
    if (botaoPadrao) botaoPadrao.style.display = "none";
    document.querySelectorAll(".btnCriar").forEach(btn => btn.style.display = "none");

}

function fecharCriador() {
    // mantém sua lógica de reset geral
    location.reload();
}

function obterDadosDeFormulario() {
    const nome = document.getElementById("nome")?.value || "";
    const descricao = document.getElementById("descricao")?.value || "";
    const dataInput = document.getElementById("data")?.value || "";
    const pontos = document.getElementById("pontos")?.value || 0;

    if (!nome.trim()) {
        alert("Insira um nome para a tarefa.");
        return;
    }

    const tarefa = {
        nome: nome,
        descricao: descricao,
        dataISO: dataInput || null,
        dataFormatada: dataInput ? formatarDataAmigavel(dataInput) : "-",
        pontos: Number(pontos) || 0,
        status: "Em andamento"
    };

    let itens = [];
    try {
        itens = JSON.parse(localStorage.getItem("roadmapItens")) || [];
    } catch (e) {
        console.error("Erro ao ler roadmapItens:", e);
    }

    itens.push({
        tipo: "tarefa",
        dados: tarefa
    });

    localStorage.setItem("roadmapItens", JSON.stringify(itens));

    // limpar campos (opcional, já que você recarrega)
    ["nome", "descricao", "data", "pontos"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    location.reload();
}

function formatarDataAmigavel(dataInput) {
    const data = new Date(dataInput);
    if (isNaN(data.getTime())) return "-";
    return data.toLocaleString();
}

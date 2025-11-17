// ===========================================================
//  ROADMAP UNIFICADO — tarefas + tabelas no mesmo fluxo
// ===========================================================

// Elemento principal onde tudo é renderizado
const areaRoadmap = document.getElementById("Roadmap");

// Utilitários de acesso ao localStorage
function getRoadmapItens() {
    try {
        return JSON.parse(localStorage.getItem("roadmapItens")) || [];
    } catch (e) {
        console.error("Erro ao ler roadmapItens:", e);
        return [];
    }
}

function setRoadmapItens(itens) {
    localStorage.setItem("roadmapItens", JSON.stringify(itens));
}


// ===========================================================
//  RENDERIZAÇÃO PRINCIPAL
// ===========================================================
function exibirRoadmapUnificado() {
    const itens = getRoadmapItens();
    if (!areaRoadmap) return;

    areaRoadmap.innerHTML = "";

    itens.forEach((item, index) => {
        if (item.tipo === "tarefa") {
            areaRoadmap.insertAdjacentHTML("beforeend", renderizarTarefa(item.dados, index));
        } else if (item.tipo === "tabela") {
            areaRoadmap.insertAdjacentHTML("beforeend", renderizarTabela(item.conteudo, index));
        }
    });
    ativarEdicaoTabelas();

    ativarEventosSalvarStatus();
    verificarAtrasos(); // checa atrasos sempre que renderiza
}



// ===========================================================
//  RENDER: CARD DE TAREFA
// ===========================================================
function renderizarTarefa(tarefa, index) {
    const statusId = tarefa.status || "Em andamento";

    return `
        <div class="tarefaContainer" id="${statusId}">
            
            <div class="iconTarefa">
                <p>${index + 1}</p>
            </div>

            <ul class="tarefaConteudo">
                
                <li class="tarefaInfo">
                    <p class="dataTarefaEstilo">Data de término: ${tarefa.dataFormatada || "-"}</p>

                    <h2 class="nomeTarefa">${tarefa.nome || ""}</h2>

                    <p class="descricaoTarefaEstilo">${tarefa.descricao || ""}</p>

                    <p class="pontosTarefaEstilo">Valendo ${tarefa.pontos || 0} Pontos</p>
                </li>

                <li class="tarefaAcoes">

                    <select id="status${index}" class="selectBox">
                        <option value="Em andamento" ${statusId === "Em andamento" ? "selected" : ""}>Em andamento</option>
                        <option value="Pendente" ${statusId === "Pendente" ? "selected" : ""}>Pendente</option>
                        <option value="Concluida" ${statusId === "Concluida" ? "selected" : ""}>Concluída</option>
                    </select>

                    <button class="btnTarefasOpcoes" onclick="deletarItem(${index})">
                        <img src="midias/icon/trash.svg" alt="">
                        <span>Excluir</span>
                    </button>

                    <div class="botoesMover">
                        <button class="btnTarefasOpcoes" onclick="moverItemParaCima(${index})">
                            <img src="midias/icon/up.svg" alt="Subir">
                        </button>

                        <button class="btnTarefasOpcoes" onclick="moverItemParaBaixo(${index})">
                            <img src="midias/icon/down.svg" alt="Descer">
                        </button>
                    </div>

                    <button id="btnSalvar${index}" 
                            class="btnTarefasOpcoes" 
                            style="display:none" 
                            onclick="salvarStatus(${index})">
                        <img src="midias/icon/save.svg" alt="">
                        <span>Salvar</span>
                    </button>

                </li>

            </ul>

        </div>
    `;
}


// ===========================================================
//  RENDER: SEÇÃO DE TABELA
// ===========================================================
function renderizarTabela(conteudo, index) {

    return `
        <div class="tarefaContainer tabelaContainer">

            <h2 style="color:var(--cor0); margin-bottom:10px;">
                Tabela
            </h2>

            <!-- TABELA EDITÁVEL -->
            <div class="tabelaWrapper" contenteditable="true" id="tabela${index}">
                ${conteudo}
            </div>

            <!-- AÇÕES DA TABELA -->
            <div class="tabelaAcoes">

                <button class="btnTarefasOpcoes salvarTabelaBtn" id="btnSalvarTabela${index}" 
                        style="display:none" onclick="salvarTabelaEditada(${index})">
                    <img src="midias/icon/save.svg" alt="">
                    <span>Salvar</span>
                </button>

                <div class="botoesMover">
                    <button class="btnTarefasOpcoes" onclick="moverItemParaCima(${index})">
                        <img src="midias/icon/up.svg" alt="Subir">
                    </button>

                    <button class="btnTarefasOpcoes" onclick="moverItemParaBaixo(${index})">
                        <img src="midias/icon/down.svg" alt="Descer">
                    </button>
                </div>

                <button class="btnTarefasOpcoes" onclick="deletarItem(${index})">
                    <img src="midias/icon/trash.svg" alt="">
                    <span>Excluir</span>
                </button>

            </div>

        </div>
    `;
}

function ativarEdicaoTabelas() {
    const tabelas = document.querySelectorAll('.tabelaWrapper');

    tabelas.forEach((tabela) => {
        tabela.addEventListener("input", () => {

            const index = tabela.id.replace("tabela", "");
            const btn = document.getElementById(`btnSalvarTabela${index}`);

            if (btn) btn.style.display = "flex";
        });
    });
}
function salvarTabelaEditada(index) {
    const itens = getRoadmapItens();

    const tabelaHTML = document.getElementById(`tabela${index}`).innerHTML;

    // salva de volta
    itens[index].conteudo = tabelaHTML;

    setRoadmapItens(itens);

    // recarrega a interface
    exibirRoadmapUnificado();

    // se quiser animação: 
    // location.reload();
}


// ===========================================================
//  STATUS: MOSTRAR BOTÃO SALVAR QUANDO MUDAR
// ===========================================================
function ativarEventosSalvarStatus() {
    const selects = document.querySelectorAll('select[id^="status"]');

    selects.forEach((selectEl) => {
        selectEl.addEventListener("change", () => {
            // pega o número REAL do id, ex: "status5" -> 5
            const id = selectEl.id; // "statusX"
            const itemIndex = id.replace("status", ""); 

            const btn = document.getElementById(`btnSalvar${itemIndex}`);
            if (btn) btn.style.display = "flex";
        });
    });

}


function salvarStatus(index) {
    const itens = getRoadmapItens();
    if (!itens[index] || itens[index].tipo !== "tarefa") return;

    const selectEl = document.getElementById(`status${index}`);
    if (!selectEl) return;

    itens[index].dados.status = selectEl.value;
    setRoadmapItens(itens);
    exibirRoadmapUnificado();
    window.location.reload();

}


// ===========================================================
//  MOVER ITENS (TAREFA OU TABELA)
// ===========================================================
function moverItemParaCima(index) {
    const itens = getRoadmapItens();
    if (index <= 0) return;

    const tmp = itens[index];
    itens[index] = itens[index - 1];
    itens[index - 1] = tmp;

    setRoadmapItens(itens);
    exibirRoadmapUnificado();
}

function moverItemParaBaixo(index) {
    const itens = getRoadmapItens();
    if (index >= itens.length - 1) return;

    const tmp = itens[index];
    itens[index] = itens[index + 1];
    itens[index + 1] = tmp;

    setRoadmapItens(itens);
    exibirRoadmapUnificado();
}


// ===========================================================
//  DELETAR ITEM
// ===========================================================
function deletarItem(index) {
    const itens = getRoadmapItens();
    itens.splice(index, 1);
    setRoadmapItens(itens);
    exibirRoadmapUnificado();
}


// ===========================================================
//  VERIFICAÇÃO DE ATRASOS
// ===========================================================
function verificarAtrasos() {
    const itens = getRoadmapItens();
    let atrasadas = 0;
    let alterouAlgo = false;
    const agora = new Date();

    itens.forEach((item, index) => {
        if (item.tipo !== "tarefa") return;
        
        const tarefa = item.dados;
        if (!tarefa.dataISO) return;

        const data = new Date(tarefa.dataISO);

        // 🔥 1 — Se estiver concluída, nunca altera
        if (tarefa.status === "Concluida") return;

        // 2 — Lógica de atraso normal
        if (data < agora) {
            atrasadas++;

            // 🔥 3 — Só marca como atrasada se NÃO for concluída
            if (tarefa.status !== "Pendente") {
                itens[index].dados.status = "Pendente";
                alterouAlgo = true;
            }
        }
    });

    if (alterouAlgo)
        setRoadmapItens(itens);

    // mensagens
    if (atrasadas > 0) {
        mostrarAvisoTopo(atrasadas);
        verificarIntervaloPopup(atrasadas);
    } else {
        const aviso = document.querySelector(".avisoAtrasoTopo");
        if (aviso) aviso.remove();
    }
}


// Aviso fixo no topo
function mostrarAvisoTopo(qtd) {
    let aviso = document.querySelector(".avisoAtrasoTopo");

    if (!aviso) {
        aviso = document.createElement("div");
        aviso.className = "avisoAtrasoTopo";
        document.body.prepend(aviso);
    }

    aviso.innerHTML = `
        <p>😢 Você possui ${qtd === 1 ? "1 tarefa atrasada" : `${qtd} tarefas atrasadas`}!</p>
    `;
}

// Controle de intervalo para popup
function verificarIntervaloPopup(qtd) {
    const ultimoAviso = localStorage.getItem("ultimoAvisoAtraso");
    const agora = Date.now();
    const INTERVALO_MINUTOS = 30;
    const intervaloMs = INTERVALO_MINUTOS * 60 * 1000;

    if (!ultimoAviso || agora - Number(ultimoAviso) >= intervaloMs) {
        localStorage.setItem("ultimoAvisoAtraso", String(agora));
        mostrarPopupAtraso(qtd);
    }
}

// Popup visual
function mostrarPopupAtraso(qtd) {
    const popup = document.createElement("div");
    popup.className = "popupAtraso";

    popup.innerHTML = `
        <div class="popupAtrasoBox">
            <button class="popupClose" onclick="this.parentElement.parentElement.remove()">✕</button>
            <h3>⚠ Tarefa atrasada!</h3>
            <p>${qtd === 1 ? "Uma tarefa está atrasada!" : `${qtd} tarefas estão atrasadas!`}</p>
        </div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        if (popup && popup.parentElement) {
            popup.remove();
        }
    }, 1000);
}


// ===========================================================
//  INITIALIZAÇÃO
// ===========================================================
window.addEventListener("load", () => {
    exibirRoadmapUnificado();
});

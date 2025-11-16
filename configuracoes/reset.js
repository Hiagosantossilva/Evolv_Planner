function abrirPopupReset() {

    // Evita duplicar pop-ups
    if (document.querySelector(".popupResetOverlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "popupResetOverlay";

    const box = document.createElement("div");
    box.className = "popupResetBox";

    box.innerHTML = `
        <h2>⚠ Resetar Planner?</h2>
        <p>Isso vai apagar <strong>todas as tarefas, tabelas e progresso</strong>.
        <br>Esta ação <strong>não pode ser desfeita.</strong></p>

        <div class="popupResetBtns">
            <button class="btnCancelarReset">Cancelar</button>
            <button class="btnConfirmarReset">Resetar</button>
        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // fechar ao clicar no botão Cancelar
    box.querySelector(".btnCancelarReset").onclick = () => overlay.remove();

    // confirmar reset
    box.querySelector(".btnConfirmarReset").onclick = () => {
        overlay.remove();
        resetarPlanner();
    };

    // NÃO fecha ao clicar fora (modal de verdade)
}
function resetarPlanner() {
    localStorage.setItem("roadmapItens", JSON.stringify([])); 
    localStorage.removeItem("ultimoAvisoAtraso");
    location.reload();
}

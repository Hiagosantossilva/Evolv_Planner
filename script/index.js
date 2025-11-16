// ================================================
//  INICIALIZAÇÃO + EXPORT / IMPORT
// ================================================
if (typeof exibirRoadmapUnificado === "function") {
    exibirRoadmapUnificado();
}

// Exporta o conteúdo de roadmapItens para um arquivo .json
function exportarTarefas() {
    const dados = {
        nomeRoadmap: localStorage.getItem("nomeRoadmap") || "",
        roadmapItens: JSON.parse(localStorage.getItem("roadmapItens")) || []
    };

    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = (dados.nomeRoadmap || "planner") + ".json";
    a.click();

    URL.revokeObjectURL(url);
}

// Importa um arquivo .json e substitui roadmapItens
function importarTarefas(event) {
    const reader = new FileReader();

    reader.onload = function() {
        try {
            const dados = JSON.parse(reader.result);

            // valida
            if (!dados.roadmapItens || !Array.isArray(dados.roadmapItens)) {
                alert("Arquivo inválido.");
                return;
            }

            // restaura tudo
            localStorage.setItem("roadmapItens", JSON.stringify(dados.roadmapItens));
            localStorage.setItem("nomeRoadmap", dados.nomeRoadmap || "");

            document.getElementById("nameRoadmap").value = dados.nomeRoadmap || "";

            location.reload();
        } catch (e) {
            alert("Erro ao importar o arquivo.");
        }
    };

    reader.readAsText(event.target.files[0]);
}

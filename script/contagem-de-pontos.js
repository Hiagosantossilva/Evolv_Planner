// ================================================
//  CONTAGEM DE PONTOS — baseado em roadmapItens
// ================================================
function calcularTotalPontos() {
    let itens = [];
    try {
        itens = JSON.parse(localStorage.getItem("roadmapItens")) || [];
    } catch (e) {
        console.error("Erro ao ler roadmapItens:", e);
        return 0;
    }

    let total = 0;

    itens.forEach(item => {
        if (item.tipo !== "tarefa" || !item.dados) return;
        const pontos = parseInt(item.dados.pontos, 10);
        if (!isNaN(pontos)) total += pontos;
    });

    return total;
}

function calcularTotalPontosConquistados() {
    let itens = [];
    try {
        itens = JSON.parse(localStorage.getItem("roadmapItens")) || [];
    } catch (e) {
        console.error("Erro ao ler roadmapItens:", e);
        return 0;
    }

    let total = 0;

    itens.forEach(item => {
        if (item.tipo !== "tarefa" || !item.dados) return;
        if (item.dados.status === "Concluida") {
            const pontos = parseInt(item.dados.pontos, 10);
            if (!isNaN(pontos)) total += pontos;
        }
    });

    return total;
}

var totalDePontos = calcularTotalPontos();
var totalDePontosConquistados = calcularTotalPontosConquistados();

var porcentagemPontos = totalDePontos > 0
    ? (totalDePontosConquistados / totalDePontos) * 100
    : 0;

console.log(`Total de pontos: ${totalDePontos}`);
console.log(`Total de pontos conquistados: ${totalDePontosConquistados}`);
console.log(`Total de pontos conquistados: ${porcentagemPontos}%`);

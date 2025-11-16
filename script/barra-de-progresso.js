const progresso = document.querySelector(".barraDeProgresso div");
const contador = document.getElementById("contadorProgresso");

if (typeof porcentagemPontos === "number" && progresso && contador) {
    const porcentagemPontosFormatado = Math.max(0, Math.min(100, Number(porcentagemPontos.toFixed(0))));
    progresso.style.width = `${porcentagemPontosFormatado}%`;
    contador.textContent = `Progresso: ${porcentagemPontosFormatado}%`;
}

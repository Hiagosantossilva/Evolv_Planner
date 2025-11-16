function moverTarefaParaCima(index) {
    if (index > 0) {
        var tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
        var tarefaAtual = tarefasSalvas[index];
        tarefasSalvas.splice(index, 1);
        tarefasSalvas.splice(index - 1, 0, tarefaAtual);
        localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
        exibirRoadmap();
    }
}

function moverTarefaParaBaixo(index) {
    var tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
   if(index < tarefasSalvas.length - 1){
        var tarefaAtual = tarefasSalvas[index];
        tarefasSalvas.splice(index, 1)
        tarefasSalvas.splice(index + 1, 0, tarefaAtual) 
        localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
        exibirRoadmap();
   } 
}
    

function salvarRoadmap() {
    const nomeRoadmapInput = document.getElementById('nameRoadmap').value;

    localStorage.setItem('nomeRoadmap', nomeRoadmapInput);
}

const nomeRoadmapSalvo = localStorage.getItem('nomeRoadmap');

const nomeRoadmapInput = document.getElementById('nameRoadmap');
nomeRoadmapInput.value = nomeRoadmapSalvo;


function fazRequisicaoInicial() {
    let xhr2 = new XMLHttpRequest();
    xhr2.onload = recebeMeusRepositorios;
    xhr2.onerror = error;
    xhr2.open('GET', 'https://api.github.com/users/lbrandaao/repos');
    xhr2.send();
}

function recebeMeusRepositorios() {
    let repositorios = JSON.parse(this.responseText);
    adicionaMeusRepositorios('row-repositories', repositorios);
}

function adicionaMeusRepositorios(idRow, array_repositorios) {
    let row_repositories = document.getElementById(idRow);
    let content_rowRepositories = '';
     
    for (i = 0; i < array_repositorios.length; i++) {
        let repositorio = array_repositorios[i];
        
        content_rowRepositories += `
            <a href="${repositorio.html_url}" target="_blank" class="col-5 col-sm-5 col-md-3 col-lg-3 box-repository">
                        
                <h3 class="repository-name"><i class="fas fa-folder" style="font-size: 0.8em;"></i> ${repositorio.name}</h3>
            
                <p class="repository-description"><span style="font-weight: 500;">Descrição: </span>${repositorio.description}</p>
            
                <p class="repository-language"><span style="font-weight: 500;">Linguagem: </span>${repositorio.language}</p>
            
            </a>
        `
     };

    row_repositories.innerHTML = content_rowRepositories;
}

function buscaRepositorios() {
    let nome_repositorio = document.getElementById('inputRepository').value;
    
    let xhr2 = new XMLHttpRequest();
    xhr2.onload = recebeRepositoriosBuscados;
    xhr2.onerror = error;
    xhr2.open('GET', `https://api.github.com/search/repositories?q=${nome_repositorio}&sort=stars`);
    xhr2.send();
}

function recebeRepositoriosBuscados() {
    let response = JSON.parse(this.responseText);
    let repositorios = response.items;
    adicionaRepositoriosBuscados('row-repositories', repositorios);
}

function adicionaRepositoriosBuscados(idRow, array_repositorios) {
    let section_searchedRepositories = document.getElementById('section-searched-repositories');

    section_searchedRepositories.innerHTML = `
        <div class="row">
            <h2 class="col-12">repositórios buscados</h2>
        </div>

        <div class="row repositories" id="row-repositories"></div>
    `
    
    let row_repositories = document.getElementById(idRow);
    let content_rowRepositories = '';
     
    for (i = 0; (i < array_repositorios.length) & (i < 10); i++) {
        let repositorio = array_repositorios[i];
        
        content_rowRepositories += `
            <a href="${repositorio.html_url}" target="_blank" class="col-5 col-sm-5 col-md-3 col-lg-3 box-repository">
                        
                <h3 class="repository-name"><i class="fas fa-folder" style="font-size: 0.8em;"></i> ${repositorio.name}</h3>
            
                <p class="repository-description"><span style="font-weight: 500;">Descrição: </span>${repositorio.description}</p>
            
                <p class="repository-language"><span style="font-weight: 500;">Linguagem: </span>${repositorio.language}</p>
            
            </a>
        `
     };

    row_repositories.innerHTML = content_rowRepositories;
}

function error (err) {
    console.log('Erro:', err);
}

onload = fazRequisicaoInicial;

// Configurações
document.getElementById('btnSearchRepository').addEventListener('click', buscaRepositorios);
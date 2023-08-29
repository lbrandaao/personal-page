function montaPagina () {
    let dados_perfil = JSON.parse( this.responseText );
    
    montaSecaoPerfil(dados_perfil);

    fazRequisicaoMeusRepositorios(dados_perfil);
    
    fazRequisicaoRepositoriosRecomendados(dados_perfil);
}

function montaSecaoPerfil(dados_perfil) {
    let section_profile = document.getElementById('section-profile');

    section_profile.innerHTML = `
        <div class="row">
            <img src="${dados_perfil.avatar_url}" alt="Minha Foto" class="col-4 col-sm-4 col-md-3 col-lg-3 img">
        </div>

        <div class="info-profile box-information">
            <div class="row name">
                <p class="col-5">${dados_perfil.name}</p>
            </div>

            <div class="row username">
                <p class="col-5">${dados_perfil.login}</p>
            </div>

            <div class="row bio">
                <p class="col-5">${dados_perfil.bio}</p>
            </div>
        </div>

        <div class="info-location box-information">
            <div class="row company">
                <p class="col-5">${dados_perfil.company}</p>
            </div>

            <div class="row city">
                <p class="col-5">${dados_perfil.location}</p>
            </div>

            <div class="row email">
                <p class="col-5"><i class="far fa-envelope"></i> leonardobbrandao@hotmail.com</p>
            </div>
        </div>
    `
}

function fazRequisicaoMeusRepositorios(dados_perfil) {
    let xhr2 = new XMLHttpRequest();
    xhr2.onload = montaSecaoMeusRepositorios;
    xhr2.onerror = error;
    xhr2.open('GET', `${dados_perfil.repos_url}`);
    xhr2.send();
}

function fazRequisicaoRepositoriosRecomendados(dados_perfil) {
    let xhr3 = new XMLHttpRequest();
    xhr3.onload =  montaSecaoRepositoriosRecomendados;
    xhr3.onerror = error;
    xhr3.open('GET', `https://api.github.com/users/${dados_perfil.login}/starred`);
    xhr3.send(); 
}

function montaSecaoMeusRepositorios() {
    let repositorios = JSON.parse(this.responseText);
    adicionaRepositorios('row-user-repositories', repositorios);
}

function montaSecaoRepositoriosRecomendados() {
    let repositorios = JSON.parse(this.responseText);
    adicionaRepositorios('row-recommended-repositories', repositorios);
}

function adicionaRepositorios(idRow, array_repositorios) {
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

function error (err) {
    console.log('Erro:', err);
}

function fazRequisicaoInicial() {
    let xhr = new XMLHttpRequest();
    xhr.onload = montaPagina;
    xhr.onerror = error;
    xhr.open('GET', `https://api.github.com/users/lbrandaao`);
    xhr.send();
}

onload = fazRequisicaoInicial;
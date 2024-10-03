const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

document.getElementById('image-upload').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        alert('Por favor, selecione uma imagem PNG ou JPEG.');
        inputUpload.value = ''; // Reseta o valor do input
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        inputUpload.value = ''; // Reseta o valor do input
        return;
    }
    
    console.log(file);
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

const tagsDisponiveis = ["FRONT-END", "PROGRAMAÇÃO", "DATA SCIENCE", "FULL STACK", "HTML", "CSS", "JAVASCRIPT"];

async function verificarTagsDisponiveis(tagTexto){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 100)
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter"){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== ""){
            try{
                const tagExiste = await verificarTagsDisponiveis(tagTexto);
                if (tagExiste){
                    const tagNova =  document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else{
                    alert("Tag não foi encontrada")
                }
            } catch(error){
                console.error("Erro ao verificar a existêcnia da tag")
                alert("Erro ao verificar a existência da tag. Verifique o console")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");



async function publicarProjeto (nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            deuCerto = Math.random();

            
            
            if (deuCerto > 0.5){
                resolve("Projeto publicado com sucesso.")
            } else{
                reject("Erro ao publicar o projeto.")
            }
            console.log(deuCerto)
        }, 2000)
        
    })
}

const feedContainer = document.getElementById("feed-container");


botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = 'por: '+ document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);
    const imagemSrc = imagemPrincipal.src;

    // Verifica se o formulário está completo
    if (nomeDoProjeto === "" || descricaoDoProjeto === "" || tagsProjeto.length === 0 || imagemSrc === "http://127.0.0.1:5500/img/semImagem.png") {
        alert("Por favor, preencha todos os campos e carregue uma imagem.");
        return;
    }

    console.log(imagemSrc)
    // Cria o novo post
    const novoPost = document.createElement("div");
    novoPost.classList.add("post");

    // Adiciona o conteúdo do post
    novoPost.innerHTML = `
        <h3>${nomeDoProjeto}</h3>
        <img src="${imagemSrc}" alt="Imagem do projeto ${nomeDoProjeto}">
        <p>${descricaoDoProjeto}</p>
        <div class="post-tags">
            ${tagsProjeto.map(tag => `<span>${tag}</span>`).join("")}
        </div>
    `;

    // Adiciona o post no feed
    feedContainer.appendChild(novoPost);
    const formulario = document.querySelector("form");
    // Reseta o formulário após a publicação
    formulario.reset();
    imagemPrincipal.src = "./img/semImagem.png";
    nomeDaImagem.textContent = "Carregue uma Imagem";
    listaTags.innerHTML = "";
    descricaoDoProjeto.textContent = "";
});

const botaoDescartar = document.querySelector(".botao-descartar");

 botaoDescartar.addEventListener("click", (evento) => {
     evento.preventDefault();
    
     const formulario = document.querySelector("form");
     formulario.reset();

     imagemPrincipal.src = "./img/semImagem.png";
     nomeDaImagem.textContent = "";

     listaTags.innerHTML = "";
 })

const carregarTags = document.getElementById("input-tags");

// Seleciona todos os links de tags
const tags = document.querySelectorAll('.tag');

// Adiciona um evento de clique para cada tag
tags.forEach(tag => {
    tag.addEventListener('click', (evento) => {
        evento.preventDefault(); // Impede que o link siga a URL
        
        // Obtém o texto da tag clicada
        const tagText = tag.textContent.trim();

        // Insere o texto da tag no input de tags
        carregarTags.value = tagText;
        console.log(carregarTags)
        console.log(tags)
    });
});

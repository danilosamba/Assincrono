
![Banner-Titulo](https://i.imgur.com/QUea5jJ.png)

# Titulo do projeto

Aplicação web com aplicação de funções assíncronas

```javascript
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
```

## 🔨 Funcionalidades do projeto

A aplicação permite inserir itens no feed de forma dinâmica. Os itens terão o nome, descrição e uma organização por tags.

## ✔️ Técnicas e tecnologias utilizadas

As técnicas e tecnologias utilizadas pra isso são:

- `HTML`: criação dos elementos da tela;
- `CSS`: estilização da aplicação;
- `JavaScript`: construção de elementos dinâmicos através da manipulação do DOM.

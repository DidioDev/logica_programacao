let itens = []

function inicializar() {
    itens = JSON.parse(localStorage.getItem('itens') || '[]');
    exibirItens();
    console.log(itens)
}
var logTarget = document.getElementById('logTarget');
function useAsyncApi() {
    return document.querySelector('input[value=async]').checked;
  }
function performPaste() {
    navigator.clipboard.readText()
        .then((text) => {
            document.querySelector('#LinkVideo').value = `${text}`
        })
}
document.querySelector('#Paste').addEventListener('click', performPaste);

function AddItem() {
    console.log("Salvando Item")

    let inputTask = document.querySelector("#AddInput").value
    let id = document.querySelector("#idItem").value
    let link = document.querySelector("#LinkVideo").value

    let link1 = ArrumarLink(link)

    let nome = inputTask[0].toUpperCase() + inputTask.substr(1);

    if (id) {
        let index = itens.findIndex(f => f.id == id);
        itens[index].nome = nome,
        itens[index].link = link1
    } else {
        let Item = {
            id: Math.random().toString(36).substring(2),
            nome: nome,
            link: link1,
            assistido: false
        };
        console.log(itens)
        itens.push(Item);
    }
    localStorage.setItem('itens', JSON.stringify(itens));
    exibirItens()
    document.querySelector("#AddInput").value = null
    document.querySelector("#LinkVideo").value = null
}
function ArrumarLink(link){
    //https://www.youtube.com/embed/hsm6Uf4IKU0   VIDEO NO IFRAME
    //https://www.youtube.com/watch?v=hsm6Uf4IKU0 VIDEO NORMAL
    if (link.includes("embed/")) {
        var ordem1 = link.split("https://www.youtube.com/embed/")
    } else {
        var ordem1 = link.split("https://www.youtube.com/watch?v=")
    }
    return `https://www.youtube.com/embed/${ordem1[1]}`
}

function exibirItens() {
    let template = '';
    for (let i = 0; i < itens.length; i++) {
        if(itens[i].assistido) {
            template = template + '<div class="Item">';
            template = template + `<iframe src="${itens[i].link}" frameborder="0"></iframe>`;
            template = template + `<p>${itens[i].nome}</p>`
            template = template + `<div class="icons">`
            template = template + `<button type="button" onclick="editarItem('${itens[i].id}')">Editar</button>`;
            template = template + `<button type="button" onclick="excluirItem('${itens[i].id}')">Deletar</button>`;
            template = template + `<button type="button" onclick="Assistido('${itens[i].id}')">Visualizado</button><div id="Assistido">Assistido</div>`;
            template = template + '</div>';
            template = template + '</div>';        
        } else {
            template = template + '<div class="Item">';
            template = template + `<iframe src="${itens[i].link}" frameborder="0"></iframe>`;
            template = template + `<p>${itens[i].nome}</p>`
            template = template + `<div class="icons">`
            template = template + `<button type="button" onclick="editarItem('${itens[i].id}')">Editar</button>`;
            template = template + `<button type="button" onclick="excluirItem('${itens[i].id}')">Deletar</button>`;
            template = template + `<button type="button" onclick="Assistido('${itens[i].id}')">Não Vizualizado</button><div id="Assistido">Não Assistido</div>`;
            template = template + '</div>';
            template = template + '</div>';
        }
    }
    document.querySelector("#listaDeItens").innerHTML = `${template}`;
}
function Assistido(id) {
    let index = itens.findIndex(f => f.id == id);
    if (itens[index].assistido) {
        itens[index].assistido = false
    } else {
        itens[index].assistido = true
    }
    localStorage.setItem('itens', JSON.stringify(itens))
    exibirItens()
}
function excluirItem(id) {
    let r = confirm("Tem certeza que deseja excluir ?")
    if (r == true) {
        console.log('id ', id);
        let index = itens.findIndex(f => f.id == id);
        itens.splice(index, 1);
        localStorage.setItem('itens', JSON.stringify(itens))
        exibirItens();
    }
}

function editarItem(id) {
    let index = itens.findIndex(f => f.id == id);

    document.querySelector('#idItem').value = itens[index].id;
    document.querySelector('#AddInput').value = itens[index].nome;
    document.querySelector('#LinkVideo').value = itens[index].link
}
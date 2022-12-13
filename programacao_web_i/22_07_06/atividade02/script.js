let itens = []

function inicializar() {
    itens = JSON.parse(localStorage.getItem('itens') || '[]');
    exibirItens();
    console.log(itens)
}

function AddItem() {
    console.log("Salvando Item")

    let inputTask = document.querySelector("#AddInput").value
    let id = document.querySelector("#idItem").value

    let nome = inputTask[0].toUpperCase() + inputTask.substr(1);

    if (id) {
        let index = itens.findIndex(f => f.id == id);
        itens[index].nome = nome;
    } else {
        let Item = {
            id: Math.random().toString(36).substring(2),
            nome: nome,
            marcado: false
        };
        console.log(itens)
        itens.push(Item);
    }
    localStorage.setItem('itens', JSON.stringify(itens));
    exibirItens()
    document.querySelector("#AddInput").value = null
}

function exibirItens() {
    let template = '';
    for (let i = 0; i < itens.length; i++) {
        if(itens[i].marcado) {
            template = template + '<div class="Item">';
            template = template + `<h2><li><del>${i + 1} - ${itens[i].nome}</del></li></h2>`;
            template = template + `<div class="icons">`
            template = template + `<button type="button"  onclick="editarItem('${itens[i].id}')">edit</button>`;
            template = template + `<button type="button" onclick="excluirItem('${itens[i].id}')">delete</button>`;
            template = template + '</div>';
            template = template + '</div>';
        } else {
            template = template + '<div class="Item">';
            template = template + `<h2><li>${i + 1} - ${itens[i].nome}</li></h2>`;
            template = template + `<div class="icons">`
            template = template + `<button type="button" onclick="editarItem('${itens[i].id}')">editar</button>`;
            template = template + `<button type="button" excluirItem('${itens[i].id}')">delete</button>`;
            template = template + `<button type="button" onclick="Checkbox('${itens[i].id}')">visto</button>`
            template = template + '</div>';
            template = template + '</div>';
        }
    }
    document.querySelector("#listaDeItens").innerHTML = `${template}`;
}

function Checkbox(id) {
    let index = itens.findIndex(f => f.id == id);
    if (itens[index].marcado) {
        itens[index].marcado = false
    } else {
        itens[index].marcado = true}
    localStorage.setItem('itens', JSON.stringify(itens))
    exibirItens()
}

function excluirItem(id) {
    let r = confirm("Tem certeza que deseja excluir?")
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
}
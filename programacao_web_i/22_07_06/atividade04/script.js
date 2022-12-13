
let produtos = [];

function inicializar() {
    produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    exibirprodutos();
}

function salvarproduto(event) {
    event.preventDefault();
    console.log('salvar produto');

    let id     = document.querySelector('#idProduto').value;
    let nome = document.querySelector('#name').value;
    let preco = document.querySelector('#price').value;
    let link   = document.querySelector('#image').value;

    if (id) {
        let index = produtos.findIndex(f => f.id == id);
        produtos[index].nome = nome;
        produtos[index].preco = preco;
        produtos[index].link = link;
    } else {
        let produto = {
            id: Math.random().toString(36).substring(2),
            nome: nome,
            preco: preco,
            link: link
        };
    
        produtos.push(produto);
    }

    localStorage.setItem('produtos', JSON.stringify(produtos));    

    exibirprodutos();

    document.querySelector('#idProduto').value = null;
    document.querySelector('#name').value = null;
    document.querySelector('#price').value = null;
    document.querySelector('#image').value = null;
}

function exibirprodutos() {
    let template = '';
    for (let i = 0; i < produtos.length; i++) {
        template = template + '<div class="produto">';
        template = template + `<p class="nome_produto2">Nome do Produto: ${produtos[i].nome}</p>`;
        template = template + `<p class="preço_produto2">R$${produtos[i].preco}</p>`;
        template = template + `<img src="${produtos[i].link}" class="imagem_produto2"></img>`;
        template = template + `<div class="botões_utilidades">`;
        template = template + `<button type="button" onclick="editarproduto('${produtos[i].id}')">Editar</button>`;
        template = template + `<button type="button" onclick="excluirproduto('${produtos[i].id}')">Excluir</button>`;
        template = template + '</div>';
        template = template + '</div>';
    }    
    document.querySelector('#listaProdutos').innerHTML = template;
}

function excluirproduto(id) {
    console.log('id ', id);
    let index = produtos.findIndex(f => f.id == id);
    produtos.splice(index, 1);
    exibirprodutos();
}

function editarproduto(id) {
    let index = produtos.findIndex(f => f.id == id);

    document.querySelector('#idProduto').value = produtos[index].id;
    document.querySelector('#name').value = produtos[index].nome;
    document.querySelector('#price').value = produtos[index].preco;
    document.querySelector('#image').value = produtos[index].link;
}
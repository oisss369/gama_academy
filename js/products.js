class produto {
    constructor(nome, categoria, valor) {
        this.nome = nome;
        this.categoria = categoria;
        this.valor = valor;
    }
}

let idEdicao = 0;

function validarPreenchimento() {
    let result = false;
    let nome = document.getElementById('nome').value;
    let categoria = document.getElementById('categoria').value;
    let valor = document.getElementById('valor').value;
    if (nome == '' || categoria == '' || valor == '') {
        alert('Todos os dados devem ser preenchidos');
    }
    else {
        result = true;
    }
    return result;
}

function cadastrarProduto() {
    if (validarPreenchimento()) {
        let nome = document.getElementById('nome').value;
        let categoria = document.getElementById('categoria').value;
        let valor = document.getElementById('valor').value;
        let produtoI = new produto(nome, categoria, valor);
        let produtos = JSON.parse(localStorage.getItem('produtos'));
        if (produtos == null) {
            produtos = [];
            produtos.push(produtoI);
        }
        else {
            produtos.push(produtoI);
        }

        let convertProduto = JSON.stringify(produtos)
        localStorage.setItem('produtos', convertProduto);
        resetarForm();
    }
}

function editarProduto() {
    if (validarPreenchimento()) {
        excluirProduto(idEdicao);
        let nome = document.getElementById('nome').value;
        let categoria = document.getElementById('categoria').value;
        let valor = document.getElementById('valor').value;
        let produtoE = new produto(nome, categoria, valor);
        let produtos = JSON.parse(localStorage.getItem('produtos'));
        produtos.push(produtoE);
        let convertProduto = JSON.stringify(produtos)
        localStorage.setItem('produtos', convertProduto);
        resetarForm();
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
        let linke = document.createElement("a");
        let editar = "editarProd(" + data.indexOf(element) + ");"
        linke.setAttribute("onclick", editar)
        linke.setAttribute("href", "#")
        let ie = document.createElement("i");
        ie.className = 'fas fa-edit';
        linke.appendChild(ie);
        let celle = row.insertCell();
        celle.appendChild(linke);
        let link = document.createElement("a");
        let excluir = "excluirProduto(" + data.indexOf(element) + ");"
        link.setAttribute("onclick", excluir)
        link.setAttribute("href", "produtos.html")
        let i = document.createElement("i");
        i.className = 'fas fa-trash-alt';
        link.appendChild(i);
        let cell = row.insertCell();
        cell.appendChild(link);
    }
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
    let thEdit = document.createElement("th");
    row.appendChild(thEdit);
    let thExcluir = document.createElement("th");
    row.appendChild(thExcluir);
}

function gerarTabela() {
    limparTabela();
    let listaProdutos = JSON.parse(localStorage.getItem('produtos'));
    let table = document.querySelector("table");
    let data = Object.keys(listaProdutos[0]);
    generateTableHead(table, data);
    generateTable(table, listaProdutos);
}

function limparTabela() {
    let table = document.querySelector("table");
    table.innerHTML = "";
}

function excluirProduto(id) {
    let arr = JSON.parse(localStorage.getItem('produtos'));
    arr.splice(id, 1);
    let arrProd = JSON.stringify(arr)
    localStorage.setItem('produtos', arrProd);
}

function editarProd(id) {
    let arr = JSON.parse(localStorage.getItem('produtos'));
    let dados = arr[id];
    document.getElementById("nome").value = dados['nome'];
    document.getElementById("categoria").value = dados['categoria'];
    document.getElementById("valor").value = dados['valor'];
    document.getElementById("botao").innerHTML = "editar";
    document.getElementById("botao").setAttribute('onclick', 'editarProduto(); gerarTabela();');
    idEdicao = id;
}

function resetarForm() {
    document.getElementById("nome").value = '';
    document.getElementById("categoria").value = '';
    document.getElementById("valor").value = '';
    document.getElementById("botao").innerHTML = "cadastrar";
    document.getElementById("botao").setAttribute('onclick', 'cadastrarProduto(); gerarTabela();');
}
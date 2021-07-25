class cliente {
    constructor(nome, endereco, email, telefone) {
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
    }
}

let idEdicao = 0;

function validarPreenchimento() {
    let nome = document.getElementById('nome').value;
    let endereco = document.getElementById('endereco').value;
    let email = document.getElementById('email').value;
    let telefone = document.getElementById('telefone').value;
    if (nome == '' || endereco == '' || email == '' || telefone == '') {
        alert('Todos os dados devem ser preenchidos');
    }
    else {
        result = true;
    }
    return result;
}

function cadastrarCliente() {
    if (validarPreenchimento()) {
        let nome = document.getElementById('nome').value;
        let endereco = document.getElementById('endereco').value;
        let email = document.getElementById('email').value;
        let telefone = document.getElementById('telefone').value;

        let clienteI = new cliente(nome, endereco, email, telefone);

        let clientes = JSON.parse(localStorage.getItem('clientes'));
        if (clientes == null) {
            clientes = [];
            clientes.push(clienteI);
        }
        else {
            clientes.push(clienteI);
        }

        let convertCliente = JSON.stringify(clientes)
        localStorage.setItem('clientes', convertCliente);
        resetarForm();
    }
}

function editarCliente() {
    if (validarPreenchimento()) {
        excluirCliente(idEdicao);
        let nome = document.getElementById('nome').value;
        let endereco = document.getElementById('endereco').value;
        let email = document.getElementById('email').value;
        let telefone = document.getElementById('telefone').value;
        let clienteE = new cliente(nome, endereco, email, telefone);
        let clientes = JSON.parse(localStorage.getItem('clientes'));
        clientes.push(clienteE);
        let convertCliente = JSON.stringify(clientes)
        localStorage.setItem('clientes', convertCliente);
        document.getElementById("botao").innerHTML = "cadastrar";
        document.getElementById("botao").setAttribute('onclick', 'cadastrarCliente()');
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
        let editar = "editarCli(" + data.indexOf(element) + ");"
        linke.setAttribute("onclick", editar)
        linke.setAttribute("href", "#")
        let ie = document.createElement("i");
        ie.className = 'fas fa-edit';
        linke.appendChild(ie);
        let celle = row.insertCell();
        celle.appendChild(linke);
        let link = document.createElement("a");
        let excluir = "excluirCliente(" + data.indexOf(element) + ");"
        link.setAttribute("onclick", excluir)
        link.setAttribute("href", "clientes.html")
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
    let listaClientes = JSON.parse(localStorage.getItem('clientes'));
    let table = document.querySelector("table");
    let data = Object.keys(listaClientes[0]);
    generateTableHead(table, data);
    generateTable(table, listaClientes);

}

function limparTabela() {
    let table = document.querySelector("table");
    table.innerHTML = "";
}

function excluirCliente(id) {
    let arr = JSON.parse(localStorage.getItem('clientes'));
    arr.splice(id, 1);
    let arrProd = JSON.stringify(arr)
    localStorage.setItem('clientes', arrProd);
}

function editarCli(id) {
    let arr = JSON.parse(localStorage.getItem('clientes'));
    let dados = arr[id];
    document.getElementById("nome").value = dados['nome'];
    document.getElementById("endereco").value = dados['endereco'];
    document.getElementById("email").value = dados['email'];
    document.getElementById("telefone").value = dados['telefone'];
    document.getElementById("botao").innerHTML = "editar";
    document.getElementById("botao").setAttribute('onclick', 'editarCliente(); gerarTabela();');
    idEdicao = id;
}

function resetarForm() {
    document.getElementById("nome").value = '';
    document.getElementById("endereco").value = '';
    document.getElementById("email").value = '';
    document.getElementById("telefone").value = '';
    document.getElementById("botao").innerHTML = "cadastrar";
    document.getElementById("botao").setAttribute('onclick', 'cadastrarCliente(); gerarTabela();');
}
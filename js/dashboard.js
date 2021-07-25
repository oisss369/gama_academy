function limparDados() {
    localStorage.removeItem('login');
    localStorage.removeItem('produtos');
    localStorage.removeItem('clientes')
    window.location.replace("login.html");
}

function totalProdutos() {
    let totalP = 0;
    let produtosTotal = JSON.parse(localStorage.getItem('produtos'));
    if (produtosTotal != null) {
        totalP = produtosTotal.length;
    }
    document.getElementById("total-produtos").innerHTML = totalP;
}

function totalClientes() {
    let totalC = 0;
    let clientesTotal = JSON.parse(localStorage.getItem('clientes'));
    if (clientesTotal != null) {
        totalC = clientesTotal.length;
    }
    document.getElementById("total-clientes").innerHTML = totalC;
}
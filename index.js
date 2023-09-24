(function(){
function carrinho(){
    const sacola = []

    function addProduto (produto){
        const index = encontrarItemIndex(produto.name)
        if(index !== -1){
            sacola[index]. quantidade+= produto.quantidade
        }else{
            sacola.push({
                id: sacola.length + 1,
                name: produto.name,
                description: produto.description,
                quantidade: produto.quantidade,
                price: produto.price
            })
        }
        atualizarCarrinho()
    }

    function calcularTotal(){
        let total = 0
        for(const produto of sacola){
            total += produto.price * produto.quantidade
        }
        return total
    }

    function getSacola(){
        return sacola
    }

    function encontrarItemIndex(nomeItem){
        return sacola.findIndex(produto => produto.name == nomeItem)
    }

    return {
        addProduto: addProduto,
        getSacola: getSacola,
        calcularTotal: calcularTotal

    }
}
const minhaSacola = carrinho()

const addBtns = document.querySelectorAll(".add-btn")

addBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const nomeItem = btn.getAttribute("data-name")
        const precoItem = parseFloat(btn.getAttribute("data-preco"))
        minhaSacola.addProduto({
            name: nomeItem,
            price: precoItem,
            quantidade: 1
        })
    })
})

function atualizarCarrinho() {
    const carrinhoItensDiv = document.getElementById("carrinho-itens")
    const totalCarrinho = document.getElementById("total-carrinho")

    carrinhoItensDiv.innerHTML = ""
    totalCarrinho.textContent = ""

    let total = 0
    minhaSacola.getSacola().forEach(item =>{
        total += item.price * item.quantidade
        carrinhoItensDiv.innerHTML +=
        `<div class= "dropdown-item">${item.name} Qtd:${item.quantidade} - R$ ${item.price.toFixed(2)}</div>`
    })

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`
}

const mostrarCarrinhoBtn = document.getElementById("mostrar-carrinho");

mostrarCarrinhoBtn.addEventListener("click", abrirCarrinho);

function abrirCarrinho() {
    const sacola = minhaSacola.getSacola();
    if (sacola.length === 0) {
        alert("SEU CARRINHO ESTÁ VAZIO !!!!!");
    } else {
        const carrinhoItensHTML = sacola.map(item => `${item.name} Qtd:${item.quantidade} - R$ ${item.price.toFixed(2)}`).join('<br>');
        const total = minhaSacola.calcularTotal().toFixed(2);
        const carrinhoConteudo = `<h1 style="font-size: 50px">Seu Carrinho de Compras</h1><h3">${carrinhoItensHTML}</h3><h2>Total: R$ ${total}</h2>`;
        
        // Abrir uma nova guia com o conteúdo do carrinho
        const novaGuia = window.open("", "_blank");
        novaGuia.document.write(carrinhoConteudo);
        novaGuia.document.close();
    }
}

})();



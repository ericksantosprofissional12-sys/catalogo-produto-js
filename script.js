const produtos = [
    { id: 1, nome: "Pc Samsung AC14", preco: 1500, categoria: "eletronicos" },
    { id: 2, nome: "Monitor Assus 320hz", preco: 500, categoria: "perifericos" },
    { id: 3, nome: "Tablet RedMagic Astra 7", preco: 2000, categoria: "eletronicos" },
    { id: 4, nome: "Abajur gamer bochoco", preco: 5000, categoria: "perifericos" },
    { id: 6, nome: "Webcam Full HD", preco: 350.00, categoria: "eletronicos" }
];

const formulario = document.querySelector('form');
const inputNome = document.getElementById('nome');
const inputPreco = document.getElementById('preco');
const selectCategoria = document.getElementById('categoria');
const inputBusca = document.getElementById('busca');
const botoesFiltro = document.querySelectorAll('.filtro');
const listaProdutos = document.getElementById('lista-produtos');

let categoriaAtual = 'todos';

// Recebe uma lista e desenha os cards na tela
function renderizarProdutos(lista) {
    listaProdutos.innerHTML = lista.map((produto) => {
        const { nome, preco, categoria } = produto;

        return `
            <div class="card">
                <h4>${nome}</h4>
                <p>R$ ${preco.toFixed(2)}</p>
                <span>${categoria}</span>
            </div>
        `;
    }).join('');
}

// Junta busca por texto + filtro de categoria
function aplicarFiltros() {
    const texto = inputBusca.value.toLowerCase();

    const filtrados = produtos.filter((produto) => {
        const combinaNome = produto.nome.toLowerCase().includes(texto);
        const combinaCategoria =
            categoriaAtual === 'todos' || produto.categoria === categoriaAtual;

        return combinaNome && combinaCategoria;
    });

    renderizarProdutos(filtrados);
}

// Cadastro de novo produto
formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const novoProduto = {
        id: Date.now(),
        nome: inputNome.value,
        preco: Number(inputPreco.value),
        categoria: selectCategoria.value
    };

    produtos.push(novoProduto);
    formulario.reset();
    aplicarFiltros();
});

// Busca enquanto digita
inputBusca.addEventListener('input', aplicarFiltros);

// Botões de filtro
botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', function () {
        categoriaAtual = botao.dataset.categoria;
        aplicarFiltros();
    });
});

// Mostra os produtos iniciais ao abrir a página
aplicarFiltros();
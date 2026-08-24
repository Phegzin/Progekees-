const produtos = [

  {
    id: 1,
    nome: "Poster Cyber",
    categoria: "poster",
    descricao: "Poster premium para deixar seu setup ainda mais insano.",
    preco: 29.90,
    antigo: 39.90,
    imagem: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=85",
    destaque: true
  },

  {
    id: 2,
    nome: "Quadro Gamer",
    categoria: "quadro",
    descricao: "Arte gamer para transformar completamente sua parede.",
    preco: 59.90,
    antigo: 79.90,
    imagem: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=85",
    destaque: true
  },

  {
    id: 3,
    nome: "Desk Setup",
    categoria: "acessorio",
    descricao: "Acessório perfeito para completar seu espaço gamer.",
    preco: 24.90,
    imagem: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=85"
  },

  {
    id: 4,
    nome: "Poster FPS",
    categoria: "poster",
    descricao: "Para quem vive no competitivo.",
    preco: 34.90,
    antigo: 44.90,
    imagem: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=800&q=85",
    destaque: true
  },

  {
    id: 5,
    nome: "Quadro Pixel",
    categoria: "quadro",
    descricao: "Visual retrô inspirado nos clássicos.",
    preco: 64.90,
    imagem: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=85"
  },

  {
    id: 6,
    nome: "Chaveiro Gamer",
    categoria: "acessorio",
    descricao: "Pequeno detalhe que faz diferença.",
    preco: 14.90,
    imagem: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=85"
  }

];


let carrinho = [];
let filtroAtual = "todos";


const produtosContainer =
  document.getElementById("produtos");

const cart =
  document.getElementById("carrinho");

const overlay =
  document.getElementById("overlay");

const cartItems =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");

const emptyCart =
  document.getElementById("emptyCart");


function dinheiro(valor) {

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

}


function renderProdutos() {

  produtosContainer.innerHTML = "";

  const lista = produtos.filter(produto => {

    return filtroAtual === "todos" ||
           produto.categoria === filtroAtual;

  });


  lista.forEach(produto => {

    const card =
      document.createElement("article");

    card.className = "produto";


    card.innerHTML = `

      <div class="produto-imagem">

        ${
          produto.destaque
          ? `<span class="badge">DESTAQUE</span>`
          : ""
        }

        <img
          src="${produto.imagem}"
          alt="${produto.nome}"
          loading="lazy"
        >

      </div>


      <div class="produto-info">

        <h3>${produto.nome}</h3>

        <p>
          ${produto.descricao}
        </p>

        <div class="preco">

          ${
            produto.antigo
            ? `
              <span class="preco-antigo">
                ${dinheiro(produto.antigo)}
              </span>
            `
            : ""
          }

          <span class="preco-atual">
            ${dinheiro(produto.preco)}
          </span>

        </div>

        <button
          class="add-cart"
          onclick="adicionar(${produto.id})"
        >
          Adicionar ao carrinho
        </button>

      </div>

    `;


    produtosContainer.appendChild(card);

  });

}


function adicionar(id) {

  const produto =
    produtos.find(p => p.id === id);

  carrinho.push(produto);

  atualizarCarrinho();

  abrirCarrinho();

}


function remover(index) {

  carrinho.splice(index, 1);

  atualizarCarrinho();

}


function atualizarCarrinho() {

  cartCount.textContent =
    carrinho.length;


  cartItems.innerHTML = "";


  if (carrinho.length === 0) {

    emptyCart.style.display = "flex";

  } else {

    emptyCart.style.display = "none";


    carrinho.forEach((produto, index) => {

      const item =
        document.createElement("div");

      item.className = "cart-item";


      item.innerHTML = `

        <img
          src="${produto.imagem}"
          alt="${produto.nome}"
        >

        <div class="cart-item-info">

          <h4>
            ${produto.nome}
          </h4>

          <span>
            ${dinheiro(produto.preco)}
          </span>

        </div>

        <button
          class="remove"
          onclick="remover(${index})"
        >
          ×
        </button>

      `;


      cartItems.appendChild(item);

    });

  }


  const total =
    carrinho.reduce(
      (soma, produto) =>
        soma + produto.preco,
      0
    );


  cartTotal.textContent =
    dinheiro(total);

}


function abrirCarrinho() {

  cart.classList.add("open");

  overlay.classList.add("active");

}


function fecharCarrinho() {

  cart.classList.remove("open");

  overlay.classList.remove("active");

}


document
  .getElementById("cartBtn")
  .onclick = abrirCarrinho;


document
  .getElementById("closeCart")
  .onclick = fecharCarrinho;


overlay.onclick = fecharCarrinho;


document
  .querySelectorAll(".filtro")
  .forEach(botao => {

    botao.onclick = () => {

      document
        .querySelectorAll(".filtro")
        .forEach(b =>
          b.classList.remove("ativo")
        );

      botao.classList.add("ativo");

      filtroAtual =
        botao.dataset.filter;

      renderProdutos();

    };

  });


document
  .querySelectorAll(".categoria-card")
  .forEach(card => {

    card.onclick = () => {

      filtroAtual =
        card.dataset.categoria;

      document
        .querySelectorAll(".filtro")
        .forEach(b =>
          b.classList.remove("ativo")
        );

      const filtro =
        document.querySelector(
          `[data-filter="${filtroAtual}"]`
        );

      if (filtro) {
        filtro.classList.add("ativo");
      }

      document
        .getElementById("loja")
        .scrollIntoView({
          behavior: "smooth"
        });

      renderProdutos();

    };

  });


document
  .getElementById("ofertaBtn")
  .onclick = () => {

    filtroAtual = "todos";

    document
      .getElementById("loja")
      .scrollIntoView({
        behavior: "smooth"
      });

  };


document
  .getElementById("checkout")
  .onclick = () => {

    if (carrinho.length === 0) {

      alert("Seu carrinho está vazio!");

      return;

    }

    alert(
      "🚀 Checkout da Progekees\n\n" +
      "Aqui entraria o pagamento real."
    );

  };


document
  .getElementById("newsletter")
  .onsubmit = evento => {

    evento.preventDefault();

    alert(
      "🔥 Você entrou para a Progekees!"
    );

    evento.target.reset();

  };


renderProdutos();

atualizarCarrinho();

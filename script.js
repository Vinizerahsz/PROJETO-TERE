// Função para buscar os produtos no banco (Exemplo usando Fetch)
async function obterProdutos() {
    try {
      const resposta = await fetch('http://localhost:8000/produtos'); // Substitua pelo seu endpoint real
      const produtos = await resposta.json();
      atualizarProdutos(produtos);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro);
    }
  }
  
  // Função para atualizar os produtos na página
  function atualizarProdutos(produtos) {
    const containers = [
      ...document.querySelectorAll('.imagens-linha1'),
      ...document.querySelectorAll('.imagens-linha2'),
      ...document.querySelectorAll('.imagem-exclusiva'),
      ...document.querySelectorAll('.produtos-linha2'), 
      ...document.querySelectorAll('.imagens-linha3'),
      ...document.querySelectorAll('.imagens-linha4'),
      ...document.querySelectorAll('.imagens-linha5')
    ]; // Seleciona todos os elementos de imagem
  
    const textos = [
      ...document.querySelectorAll('.texto-paragrafo'),
      ...document.querySelectorAll('.texto-linha1'),
      ...document.querySelectorAll('.texto-linha2'),
      ...document.querySelectorAll('.texto-linha3'),
      ...document.querySelectorAll('.texto-linha4'),
      ...document.querySelectorAll('.texto-linha5')
    ]; // Seleciona todos os elementos de texto
  
    // Preencher os containers com as imagens e nomes dos produtos
    produtos.forEach((produto, index) => {
      if (containers[index] && textos[index]) {
        // Substituindo imagem
        containers[index].innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-produto">
          <div class="nome-produto">${produto.nome}</div>
        `;
  
        // Verifica se o elemento de texto tem um id
        const idTexto = textos[index].id;
        if (idTexto) {
          // Substituindo nome do produto com base no id
          if (idTexto === `produto-linha${index + 1}`) {
            textos[index].innerHTML = produto.nome;
          }
        }
      }
    });
  }
  
  // Chama a função para obter os produtos
  obterProdutos();
  
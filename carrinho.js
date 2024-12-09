document.addEventListener('DOMContentLoaded', async () => {
    const containerCarrinho = document.getElementById('itens-carrinho');

    try {
        // Busca os produtos do carrinho
        const respostaCarrinho = await fetch('http://localhost:8000/carrinho');
        const produtosCarrinho = await respostaCarrinho.json();

        // Exibe os produtos na página
        produtosCarrinho.forEach(produto => {
            const produtoHTML = `
                <div class="item-carrinho">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>Preço: R$${produto.preco}</p>
                    <button class="remover-item" data-id="${produto.id}">Remover</button>
                </div>
            `;
            containerCarrinho.insertAdjacentHTML('beforeend', produtoHTML);
        });

        // Adiciona funcionalidade de remoção
        document.querySelectorAll('.remover-item').forEach(button => {
            button.addEventListener('click', async () => {
                const id = button.getAttribute('data-id');
                try {
                    await fetch(`http://localhost:8000/carrinho/${id}`, { method: 'DELETE' });
                    button.closest('.item-carrinho').remove();
                } catch (erro) {
                    console.error('Erro ao remover produto do carrinho:', erro);
                }
            });
        });
    } catch (erro) {
        console.error('Erro ao carregar produtos do carrinho:', erro);
    }
});

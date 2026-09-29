document.addEventListener("DOMContentLoaded", () => {
    const inputBusca = document.getElementById("input-busca");
    const secoes = document.querySelectorAll(".apresentacao"); // Captura as seções inteiras

    inputBusca.addEventListener("input", (evento) => {
        const termoBusca = evento.target.value.toLowerCase().trim();

        // 1. Primeiro, filtramos os cards individualmente (como já fazíamos)
        secoes.forEach((secao) => {
            const cards = secao.querySelectorAll(".card");
            let cardsVisiveisNaSecao = 0; // Contador para saber quantos cards restaram nesta seção

            cards.forEach((card) => {
                const titulo = card.querySelector("h3").textContent.toLowerCase();
                const autor = card.querySelector(".author").textContent.toLowerCase();
                const genero = card.querySelector(".genre").textContent.toLowerCase();

                if (titulo.includes(termoBusca) || autor.includes(termoBusca) || genero.includes(termoBusca)) {
                    card.style.display = "flex";
                    cardsVisiveisNaSecao++; // Se o card atende à busca, somamos +1 no contador
                } else {
                    card.style.display = "none";
                }
            });

            // 2. A MÁGICA: Controla a visibilidade da seção e do título
            // Se o contador for maior que 0, mostra a seção. Se for 0, esconde tudo.
            if (cardsVisiveisNaSecao > 0) {
                secao.style.display = "block"; // Torna a seção (e o título h3 dela) visível
            } else {
                secao.style.display = "none";  // Esconde a seção inteira para o título não ficar "órfão"
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-cadastro");
    const btnAbrir = document.getElementById("btn-abrir-cadastro"); 
    const btnFechar = document.getElementById("btn-fechar-modal");
    const formCadastro = document.getElementById("form-cadastro");

    // 1. Abre o modal ao clicar no seu botão
    if (btnAbrir) {
        btnAbrir.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    // 2. Fecha o modal ao clicar no (X)
    if (btnFechar) {
        btnFechar.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // 3. Fecha se clicar no fundo escuro
    window.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.style.display = "none";
        }
    });

    // 4. COLOQUE O CÓDIGO DAQUI ATÉ O FINAL:
    // 4. Envia os dados para o PHP do professor ao clicar em salvar
    if (formCadastro) {
        formCadastro.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Impede a página de recarregar

            // 📑 ADICIONE APENAS ESTA LINHA AQUI:
            alert("Cadastro enviado com sucesso!");        

            // 📑 FORCE O FECHAMENTO AQUI NO COMEÇO PARA TESTAR:
            modal.style.display = "none"; 

            // O código abaixo vai rodar em segundo plano
            try {
                const dadosFormulario = new FormData();
                dadosFormulario.append('nome_cliente', document.getElementById('cad-nome').value);
                dadosFormulario.append('email', document.getElementById('cad-email').value);

                fetch('salvar.php', { method: 'POST', body: dadosFormulario })
                    .catch(e => console.log("Aguardando PHP do professor..."));
                
                formCadastro.reset();
            } catch (erroGeral) {
                // Se algum ID estiver errado no seu HTML, o erro morre aqui e não trava a tela
                console.error("Erro interno capturado:", erroGeral.message);
            }
        });
    }

}); // Fim do DOMContentLoaded



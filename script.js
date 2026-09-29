document.addEventListener("DOMContentLoaded", () => {
    const inputBusca = document.getElementById("input-busca");
    const secoes = document.querySelectorAll(".apresentacao"); 

    inputBusca.addEventListener("input", (evento) => {
        const termoBusca = evento.target.value.toLowerCase().trim();

        secoes.forEach((secao) => {
            const cards = secao.querySelectorAll(".card");
            let cardsVisiveisNaSecao = 0;

            cards.forEach((card) => {
                const titulo = card.querySelector("h3").textContent.toLowerCase();
                const autor = card.querySelector(".author").textContent.toLowerCase();
                const genero = card.querySelector(".genre").textContent.toLowerCase();

                if (titulo.includes(termoBusca) || autor.includes(termoBusca) || genero.includes(termoBusca)) {
                    card.style.display = "flex";
                    cardsVisiveisNaSecao++; 
                } else {
                    card.style.display = "none";
                }
            });

            if (cardsVisiveisNaSecao > 0) {
                secao.style.display = "block"; 
            } else {
                secao.style.display = "none";  
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-cadastro");
    const btnAbrir = document.getElementById("btn-abrir-cadastro"); 
    const btnFechar = document.getElementById("btn-fechar-modal");
    const formCadastro = document.getElementById("form-cadastro");

    if (btnAbrir) {
        btnAbrir.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    if (btnFechar) {
        btnFechar.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.style.display = "none";
        }
    });

    if (formCadastro) {
        formCadastro.addEventListener("submit", (evento) => {
            evento.preventDefault(); 

            alert("Cadastro enviado com sucesso!");        

            modal.style.display = "none"; 

            try {
                const dadosFormulario = new FormData();
                dadosFormulario.append('nome_cliente', document.getElementById('cad-nome').value);
                dadosFormulario.append('email', document.getElementById('cad-email').value);

                fetch('salvar.php', { method: 'POST', body: dadosFormulario })
                    .catch(e => console.log("Aguardando PHP do professor..."));
                
                formCadastro.reset();
            } catch (erroGeral) {
                console.error("Erro interno capturado:", erroGeral.message);
            }
        });
    }

});



const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = pegaCartoesDoUsuario();
    
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
             
    
    
    
    cartoes.forEach(cartao=>{
        preparaCartao(cartao);
    });

    function pegaCartoesDoUsuario(){
        let cartoesLocal = JSON.parse(localStorage.getItem(usuario))
        if(cartoesLocal){
            return cartoesLocal.map(cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo));
        } else {
            return []
        }
    }

    function preparaCartao(cartao){
        /*console.log("pegando as imagens...");
        let urlsImagens = Cartao.pegaImagens(cartao);
        console.log(urlsImagens);
        urlsImagens.forEach(url => {
            fetch(url)
                .then(res => {
                    caches.open('ceep-imagens')
                        .then(cache=> {
                            cache.put(url, res);
                        })
                })
        })*/

        const urlsImagens = Cartao.pegaImagens(cartao)
        urlsImagens.forEach(url => {
          fetch(url).then((resposta) => {
            caches.open("ceep-imagens").then(cache => {
              cache.put(url, resposta)
              });
          })
          .catch(err=>{
              console.log(err);
          });
        });

        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao),1)
            salvaCartoes()
            render()
        })
    }
    render()
    Filtro.on("filtrado", render)

    function salvaCartoes(){
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(
                cartao => 
                    ({
                        conteudo:cartao.conteudo,
                        tipo : cartao.tipo
                    })
            )
        ));
    }


    login.on("login", ()=>{
        cartoes = pegaCartoesDoUsuario();
        render();
    });

    login.on("logout", ()=>{
        cartoes = [];
        render();
    });

    function adiciona(cartao){
        if(logado){
            cartoes.push(cartao)
            //localStorage.setItem("cartoes", JSON.stringify(cartoes))
            salvaCartoes();
            cartao.on("mudanca.**", render)
            preparaCartao(cartao);
            /*let urlImagens = Cartao.pegaImagens(cartao);
            caches.open('ceep-imagens')
                .then(cache => {
                    cache.matchAll(urlImagens) 
                        .then(listaResposta=> 
                            // RESPONSE
                            listaResposta;
                        });
                })*/
            render()
            return true
        } else {
            alert("Você não está logado!");
        }
        
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)

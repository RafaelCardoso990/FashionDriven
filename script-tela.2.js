let selecionou = 0;
let link;
let modeloCamiseta;
let modeloGola;
let modeloTecido;
let objeto = [];
const nome = prompt('Digite o seu nome :')

function escolherModelo(modelo){
    let selecionado = document.querySelector('.primeira-escolha .selecionado');
    if(selecionado !== null){
        selecionado.classList.toggle('selecionado')
    }
    modelo.classList.add('selecionado')
    selecionou = 'sim'
    
    modeloCamiseta = document.querySelector('.primeira-escolha .selecionado .tipo').innerHTML;
    
    console.log(modeloCamiseta)   
}   

function escolherGola(gola){
    let selecionado = document.querySelector('.segunda-escolha .selecionado');
    if(selecionado !== null){
        selecionado.classList.toggle('selecionado')
    }
    gola.classList.add('selecionado')

    selecionou = 'sim'
    
    modeloGola = document.querySelector('.segunda-escolha .selecionado .tipo').innerHTML;
    
    console.log(modeloGola)
  
}

function escolherTecido(tecido){
    let selecionado = document.querySelector('.terceira-escolha .selecionado');
    if(selecionado !== null){
        selecionado.classList.toggle('selecionado')
    }
    tecido.classList.add('selecionado')

    selecionou = 'sim'

    modeloTecido = document.querySelector('.terceira-escolha .selecionado .tipo').innerHTML;

    console.log(modeloTecido)

    ativarbotao();
   
}

function ativarbotao(){
    let botaoAtivado = document.querySelector('.botao');
    if(selecionou.length >= 3){
        botaoAtivado.classList.add('ativo');
    }
}

function validarInput(){
    link = document.querySelector('.link').value;
    if(link == ''){
        alert('Digite um link de referência.')
    }else{
        alert('Confirmando encomenda')
        
    }
}  

function armazenarDados(){
    objeto.push({
        model: modeloCamiseta,
        neck: modeloGola,
        material: modeloTecido,
        owner: nome,
        image: link,
        author: nome
    })

    
}

function confirmarPedido(){
    validarInput();
    armazenarDados();
    postarDados();
}

function postarDados(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', objeto);
    promise.then((resposta)=>{
        alert('Encomenda confirmada.');
        console.log(resposta.data);
        const envioPedido = document.querySelector(`.link`)
        for(let i = 0; i < envioPedido.length; i++){
        envioPedido.innerHTML = `<div>   
                                    <div><img src="${resposta.data[i].image}" alt="camiseta"></div>
                                    <p><b>Criador</b>: ${resposta.data[i].owner}</p>
                                </div>`;
        }                        
    });
    promise.catch(postErro);
} 


// function postSucesso(reposta){
    
    
// }

function postErro(){
    alert('Ops, não conseguimos processar sua encomenda.');
}

function mostrarBlusasCriadas(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts') 
    promise.then(processarResposta);
}

function processarResposta(resposta){
    console.log(resposta.data)
    const camisasCriadas = document.querySelector('.ultimos-pedidos')
    for(let i = 0; i <resposta.data.length; i++){
    camisasCriadas.innerHTML +=` <div>   
                                    <div><img src="${resposta.data[i].image}" alt="camiseta"></div>
                                    <p><b>Criador</b>: ${resposta.data[i].owner}</p>
                                </div>`
    }
}
mostrarBlusasCriadas();

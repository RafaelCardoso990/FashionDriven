let selecionou = 0;
let link;
let modeloCamiseta;
let modeloGola;
let modeloTecido;
let objeto = [];
let pedidoPronto;
const nome = prompt('Digite o seu nome :')

function escolherModelo(modelo) {
    let selecionado = document.querySelector('.primeira-escolha .selecionado');
    if (selecionado !== null) {
        selecionado.classList.toggle('selecionado')
    }
    modelo.classList.add('selecionado')
    selecionou = 'sim'

    modeloCamiseta = document.querySelector('.primeira-escolha .selecionado .tipo').innerHTML;

    console.log(modeloCamiseta)
}

function escolherGola(gola) {
    let selecionado = document.querySelector('.segunda-escolha .selecionado');
    if (selecionado !== null) {
        selecionado.classList.toggle('selecionado')
    }
    gola.classList.add('selecionado')

    selecionou = 'sim'

    modeloGola = document.querySelector('.segunda-escolha .selecionado .tipo').innerHTML;

    console.log(modeloGola)

}

function escolherTecido(tecido) {
    let selecionado = document.querySelector('.terceira-escolha .selecionado');
    if (selecionado !== null) {
        selecionado.classList.toggle('selecionado')
    }
    tecido.classList.add('selecionado')

    selecionou = 'sim'

    modeloTecido = document.querySelector('.terceira-escolha .selecionado .tipo').innerHTML;

    console.log(modeloTecido)

    ativarbotao();

}

function ativarbotao() {
    let botaoAtivado = document.querySelector('.botao');
    if (selecionou.length >= 3) {
        botaoAtivado.classList.add('ativo');
    }
}

function validarInput() {
    link = document.querySelector('.link').value;
    if (link == '') {
        alert('Digite um link de referência.')
    } else {
        alert('Confirmando encomenda')

    }
}

function confirmarPedido() {
    validarInput();
    // armazenarDados();
    postarDados();
}

function postarDados() {
    const request = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', {
        model: modeloCamiseta,
        neck: modeloGola,
        material: modeloTecido,
        image: link,
        owner: nome,
        author: nome
    });
    request.then(postSucesso);
    request.catch(postErro);
}

function postSucesso(reposta) {
    alert('Encomenda feita com sucesso.');  
    mostrarBlusasCriadas();
}

function postErro() {
    alert('Ops, não conseguimos processar sua encomenda.');
}

function mostrarBlusasCriadas() {
    const request = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts')
    request.then(processarResposta);
}

function processarResposta(resposta) {
    const camisasCriadas = document.querySelector('.ultimos-pedidos')
    camisasCriadas.innerHTML = '';
    console.log(resposta.data)
    for (let i = 0; i < resposta.data.length; i++) {
        camisasCriadas.innerHTML += ` <div class="refazer" onclick="pegarBlusaCriada(this)">   
                                        <div><img src="${resposta.data[i].image}" alt="camiseta"></div>
                                        <p class="img"><b>Criador</b>: ${resposta.data[i].owner}</p>
                                      </div>`
    }
}

function pegarBlusaCriada(camiseta){
    let selecionado = document.querySelector('.ultimos-pedidos .selecionado-camiseta');
    
    if (selecionado !== null) {
        selecionado.classList.toggle('selecionado-camiseta')
    }
    camiseta.classList.add('selecionado-camiseta')
    
    pedidoPronto = document.querySelector('.ultimos-pedidos .selecionado-camiseta .img').innerHTML;
    console.log(pedidoPronto)

   confirmandoEncomenda(); 
}

function confirmandoEncomenda(){
    let confirma = confirm('Você quer criar uma blusa igual a essa ?')
    
    if(confirma === true){
        pegandoPedido();
    }   
}

function pegandoPedido(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts')
    promise.then(comparandoPedidos);
    
}   

function comparandoPedidos(resposta1){
     
    for(i = 0; i < resposta1.data.length; i++){
        if(pedidoPronto.includes(resposta1.data[i].owner) === true){
            // console.log(resposta1.data[i].image)
        
            modeloCamiseta = resposta1.data[i].model,
            modeloGola = resposta1.data[i].neck,
            modeloTecido = resposta1.data[i].material,
            link = resposta1.data[i].image
    }
    }
    
    enviarEncomendaPronta();
}

function enviarEncomendaPronta(){
    const request = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', {
        model: modeloCamiseta,
        neck: modeloGola,
        material: modeloTecido,
        image: link,
        owner: nome,
        author: nome
    });
    request.then(enviouComSucesso)
    request.catch(naoEnviouComSucesso)
}

function enviouComSucesso(){
    alert('Enviou com Sucesso.')
    mostrarBlusasCriadas();
}

function naoEnviouComSucesso(){
    alert('Não enviou com Sucesso.')
}
mostrarBlusasCriadas();
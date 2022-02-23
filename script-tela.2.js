let selecionou;
let link = null;
let objeto = [];
// const nome = prompt('Digite o seu nome :')

function escolherModelo(modelo){
    let selecionado = document.querySelector('.primeira-escolha .selecionado');
    if(selecionado !== null){
        selecionado.classList.toggle('selecionado')
    }
    modelo.classList.add('selecionado')

    selecionou = "sim"
}

function escolherGola(gola){
    let selecionado = document.querySelector('.segunda-escolha .selecionado');
    if(selecionado !== null){
        selecionado.classList.toggle('selecionado')
    }
    gola.classList.add('selecionado')

    selecionou = "sim"
}

function escolherTecido(tecido){
    let selecionado = document.querySelector('.terceira-escolha .selecionado');
    if(selecionado !== null){
        selecionado.classList.toggle('selecionado')
    }
    tecido.classList.add('selecionado')

    selecionou = "sim"
    ativarbotao();
}

function ativarbotao(){
    if(selecionou.length == 3){
        let botaoAtivado = document.querySelector('.botao');
        botaoAtivado.classList.add('ativo');
    }
}

function validarInput(){
    if(link === ''){
        alert('Digite um link de referência.')
    }else{
        alert('Confirmando encomenda')
    }
}

function armazenarDados(){
    link = document.querySelector('.link').value;    
    
}

function confirmarPedido(){
    validarInput();
}


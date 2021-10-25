const inputConta = document.querySelector('#total-conta')
const inputPessoas = document.querySelector('#total-pessoa')
const inputGorjeta = document.querySelector('#porcentagem')
const saidaGorjeta = document.querySelector('#saida-gorjeta')
const saidaTotal = document.querySelector('#saida-total')
const btReset = document.querySelector('.bt-reset')
const gorjetas = document.querySelectorAll('.bt-gorjeta')
let gorjeta = 0;


function desativarAlerta(){
    document.querySelector('.txt-alerta').classList.add('off')
    document.querySelector('#total-pessoa').classList.remove('input-alerta')    
}

function ativarAlerta(){
    document.querySelector('.txt-alerta').classList.remove('off')
    document.querySelector('#total-pessoa').classList.add('input-alerta')
}

function mudarSaidaTotal (totalGorjeta, totalPessoas){
    saidaGorjeta.innerHTML = `$${totalGorjeta}`
    saidaTotal.innerHTML = `$${totalPessoas}`
}

function ativarBotao (){
    document.querySelector('.bt-reset').classList.remove('bt-desabilitado')
}

function desativarBotao (){
    document.querySelector('.bt-reset').classList.add('bt-desabilitado')
}

function pegarGorjeta(e){
    inputGorjeta.value = ''
    let selecionada = document.querySelector('.gorjeta-selecionada')
    if(selecionada === null){
        document.querySelector(`#${e.target.id}`).classList.add('gorjeta-selecionada')
    } else {
        selecionada.classList.remove('gorjeta-selecionada')
        document.querySelector(`#${e.target.id}`).classList.add('gorjeta-selecionada')
    }
    switch(e.target.id){
        case 'cinco': gorjeta = .05; break;
        case 'dez': gorjeta = .1; break;
        case 'quinze': gorjeta = .15; break;
        case 'vinte-cinco': gorjeta = .25; break;
        case 'cinquenta': gorjeta = .5; break;
    }
}

function pegarinputGorjeta(){
    let selecionada = document.querySelector('.gorjeta-selecionada')
    if(selecionada !== null){
        selecionada.classList.remove('gorjeta-selecionada')
    }
    gorjeta = inputGorjeta.value /100
    calcularGorjeta();
}

function calcularGorjeta(){
    let valorConta = inputConta.value
    let numeroPessoas = inputPessoas.value;
    // Ativar botão Reset
    ativarBotao();
    // input válido da conta
    if(valorConta == ''){
        mudarSaidaTotal('0,00', '0.00')
        desativarAlerta()
        desativarBotao()
        return
    }
    // numero certo de pessoas
    if(numeroPessoas === ''){
        ativarAlerta()
        return
    } else { desativarAlerta() }
    let totalGorjeta = (valorConta * gorjeta / numeroPessoas).toFixed(2)
    let totalPessoa = (valorConta * (1 + gorjeta) / numeroPessoas).toFixed(2)
    mudarSaidaTotal(totalGorjeta, totalPessoa)
}

// EVENTOS
inputConta.addEventListener('input', calcularGorjeta)
inputPessoas.addEventListener('input',calcularGorjeta)

inputGorjeta.addEventListener('input', pegarinputGorjeta)
gorjetas.forEach(e =>{
    e.addEventListener('click', e => {
        pegarGorjeta(e)
        calcularGorjeta()
    })
})

btReset.addEventListener('click', () => {
    inputConta.value = ""
    inputPessoas.value = ""
    inputGorjeta.value = ""
    gorjeta = 0
    let selecionada = document.querySelector('.gorjeta-selecionada')
    if(selecionada !== null){
        selecionada.classList.remove('gorjeta-selecionada')
    }
    desativarAlerta()
    desativarBotao()
    mudarSaidaTotal('0.00', '0.00')
})
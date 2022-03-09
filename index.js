const btnDigito = document.getElementsByClassName('botao')
const boxDigitos = document.getElementsByClassName('digito')
const htmlNumeroPolitico = document.getElementById('numero-politico')
const htmlNomePolitico = document.getElementById('nome-politico')
const htmlPartidoPolitico = document.getElementById('partido-politico')
const boxRetornoPolitico = document.getElementsByClassName('retorno-politico')[0]
let numeroTotal = ''
let nomePolitico = ''
let cargoPolitico = ''
let partidoPolitico = ''
let numeroPolitico = ''

for (let numBotao = 0; numBotao < 10; numBotao++) {
    btnDigito[numBotao].addEventListener('click', function () {
        const btnValor = btnDigito[numBotao].value
        console.log(btnValor)
        insereDigito(btnValor)
    })
}

const btnCorrige = document.getElementById('op-corrige')
btnCorrige.addEventListener('click', function() {
    let verificaCorrecao = verificaCorrige()
    if (verificaCorrecao != false) {
        for (let i = 3; i >= 0; i--) {
            let valorBox = boxDigitos[i].innerHTML;
            if (valorBox.length > 0) {
                boxDigitos[i].innerHTML = '' 
                break
            }
        }
    } else {
        alert('Não há nada para corrigir!')
    }
})

const btnConfirma = document.getElementById('op-confirma')
btnConfirma.addEventListener('click', function () {
    numeroTotal = ''
    for (let contaNumeros = 0; contaNumeros < 4; contaNumeros ++) {
        let valorBox = boxDigitos[contaNumeros].innerHTML
        numeroTotal+= valorBox
    }
    if (numeroTotal.length != 4) {
        alert('Você ainda não digitou todos os números!')
        limparCampos()
        votarNulo()
    } else {
        verificaDeputado(numeroTotal)

    }
})

const btnBranco = document.getElementById('op-branco') 
btnBranco.addEventListener('click', function() {
    const opBranco = confirm('Você tem certeza que deseja votar branco?')
    if (opBranco === true) {
        numeroTotal = '0000'
        limparCampos()
        votarNulo()
    } else {
        alert('Vote novamente!')
    }
})

function verificaCorrige() {
    let valorBox = boxDigitos[0].innerHTML
    if (valorBox.length <= 0) {
        return false
    }
}

function insereDigito (numero) {
    for (let cont = 0; cont < 4; cont++) {
        let digitoBox = boxDigitos[cont].innerHTML
        if (digitoBox.length < 1) {
            boxDigitos[cont].innerHTML = numero
            break
        }
    }
}

function limparCampos () {
    for (let i = 0; i < 4; i++) {
        boxDigitos[i].innerHTML = ''
    }
}

function verificaDeputado (numeroTotal) {
    nomePolitico = ''
    for (let cont = 0; cont < 2; cont++) {
        if (numeroTotal == deputados[cont].numero) {
            nomePolitico = deputados[cont].nome
            numeroPolitico = deputados[cont].numero
            cargoPolitico = deputados[cont].cargo
            partidoPolitico = deputados[cont].partido
            // return exibeDeputado(nomePolitico, numeroPolitico, cargoPolitico, partidoPolitico)
        }
    }
    if (nomePolitico.length > 0) {
        exibeDeputado(numeroPolitico, nomePolitico, partidoPolitico, cargoPolitico)
    } else {
        alert ('VOTO INVÁLIDO!')
        limparCampos()
        limpaDeputado()
    }
}

function exibeDeputado(numero, nome, partido, cargo) {
    boxRetornoPolitico.style.opacity = '1'
    htmlNumeroPolitico.innerHTML = 'Seu voto: ' + numero
    htmlNumeroPolitico.style.fontSize = '1.17em'
    htmlNomePolitico.innerHTML = 'Nome: ' + nome
    htmlPartidoPolitico.innerHTML = 'Partido: ' + partido
}

function limpaDeputado() {
    boxRetornoPolitico.style.opacity = '1'
    htmlNumeroPolitico.innerHTML = 'VOTO INVÁLIDO'
    htmlNumeroPolitico.style.fontSize = '40px'
    htmlNomePolitico.innerHTML = ''
    htmlPartidoPolitico.innerHTML = ''
}

function votarNulo() {
    boxRetornoPolitico.style.opacity = '1'
    htmlNumeroPolitico.innerHTML = 'VOTO BRANCO'
    htmlNumeroPolitico.style.fontSize = '40px'
    htmlNomePolitico.innerHTML = ''
    htmlPartidoPolitico.innerHTML = ''
}
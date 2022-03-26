const btnDigito = document.getElementsByClassName('botao')
const boxDigitos = document.getElementsByClassName('digito')
const digitosBox = document.querySelectorAll('.box')
const digitos = document.querySelectorAll('.digito')
const htmlNumeroPolitico = document.getElementById('numero-politico')
const htmlNomePolitico = document.getElementById('nome-politico')
const htmlPartidoPolitico = document.getElementById('partido-politico')
const boxRetornoPolitico = document.getElementsByClassName('retorno-politico')[0]
const tituloTela = document.querySelector('.titulo-tela')
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
        for (let i = (document.querySelectorAll('.box').length - 1); i >= 0; i--) {
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
    for (let contaNumeros = 0; contaNumeros < document.querySelectorAll('.box').length; contaNumeros ++) {
        let valorBox = boxDigitos[contaNumeros].innerHTML
        numeroTotal+= valorBox
    }
    if (numeroTotal.length != document.querySelectorAll('.box').length) {
        alert('Você ainda não digitou todos os números!')
        limparCampos()
        votarNulo()
    } else {
        if (tituloTela.textContent === 'Deputado Federal') {
            verificaDeputado(numeroTotal)
        } else if (tituloTela.textContent === 'Presidente') {
            verificaPresidente(numeroTotal)
        }
        

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
    for (let cont = 0; cont < document.querySelectorAll('.box').length; cont++) {
        let digitoBox = boxDigitos[cont].innerHTML
        if (digitoBox.length < 1) {
            boxDigitos[cont].innerHTML = numero
            break
        }
    }
}

function limparCampos () {
    for (let i = 0; i < document.querySelectorAll('.box').length; i++) {
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
        }
    }
    if (nomePolitico.length > 0) {
        exibeDeputado(numeroPolitico, nomePolitico, partidoPolitico, cargoPolitico)
        setTimeout(alterna, 3000)
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

const alterna = function mudaTela() {
    digitos.forEach((digito) => digito.textContent = '')
    htmlNumeroPolitico.textContent = ''
    htmlNomePolitico.textContent = ''
    htmlPartidoPolitico.textContent = ''
    tituloTela.textContent = 'Presidente'
    digitosBox.forEach(function (el, i) {
        if (i>1) {
            return el.remove()}
    })
}

function verificaPresidente(numeroTotal) {
    nomePolitico = ''
    for (let cont = 0; cont < 2; cont++) {
        if (numeroTotal == presidentes[cont].numero) {
            nomePolitico = presidentes[cont].nome
            numeroPolitico = presidentes[cont].numero
            cargoPolitico = presidentes[cont].cargo
            partidoPolitico = presidentes[cont].partido
        }
    }
    if (nomePolitico.length > 0) {
        exibeDeputado(numeroPolitico, nomePolitico, partidoPolitico, cargoPolitico)
        setTimeout(finalizaVoto, 3000)
    } else {
        alert ('VOTO INVÁLIDO!')
        limparCampos()
        limpaDeputado()
    }
}

function finalizaVoto() {
    digitos.forEach((digito) => digito.textContent = '')
    htmlNumeroPolitico.textContent = ''
    htmlNomePolitico.textContent = ''
    htmlNumeroPolitico.textContent = 'FIM DE ELEIÇÃO!'
    htmlNumeroPolitico.style.fontSize = '30px'
    htmlPartidoPolitico.textContent = ''
    tituloTela.textContent = ''
    document.querySelector('.fim-tela').style.display = 'none'
    digitosBox.forEach(el => el.remove())
    document.querySelector('.fim-eleicao').style.display = 'block'
}

document.querySelector('.fim-eleicao').addEventListener('click', function() {
    window.location.reload()
})
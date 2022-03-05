const btnDigito = document.getElementsByClassName('botao')
const boxDigitos = document.getElementsByClassName('digito')
let numeroTotal = ''

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

function insereDigito (numero) {
    for (let cont = 0; cont < 4; cont++) {
        let digitoBox = boxDigitos[cont].innerHTML
        if (digitoBox.length < 1) {
            boxDigitos[cont].innerHTML = numero
            break
        }
    }
}

const btnConfirma = document.getElementById('op-confirma')
btnConfirma.addEventListener('click', function () {
    for (let contaNumeros = 0; contaNumeros < 4; contaNumeros ++) {
        let valorBox = boxDigitos[contaNumeros].innerHTML
        numeroTotal+= valorBox
    }
    if (numeroTotal.length != 4) {
        alert('Você ainda não digitou todos os números!')
    } else {
        alert(`Seu voto: ${numeroTotal}`)
    }
})

const btnBranco = document.getElementById('op-branco') 
btnBranco.addEventListener('click', function() {
    const opBranco = confirm('Você tem certeza que deseja votar branco?')
    if (opBranco === true) {
        numeroTotal = '0000'
        console.log ('Voto branco!')
        console.log(numeroTotal)
    } else {
        console.log('Vote novamente!')
    }
})

function verificaCorrige() {
    let valorBox = boxDigitos[0].innerHTML
    if (valorBox.length <= 0) {
        return false
    }
}

// Uma função que quando o último número for preenchido, ele vai verificar se possui algum dep com esse número. Caso sim, executa uma função que altera a tela para a daquele deputado. Senão, retorna um alert e limpa os campos.

function verificaDeputado () {

}
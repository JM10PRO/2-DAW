let cultura = ['monumento', 'cuadro', 'vino'];
let parrafoVidas = "";
let parrafoInicio = "";
let parrafoGuiones = "";
let parrafoOculto = "";
let palabraOcultada = [];
let letrasRestantes = 0;
let palabraSeleccionada = "";
let numeroVidas = 6;
let letrasUsadas = [];

function lanzadera() {
    alert('Page is loaded');
    parrafoVidas = document.getElementById('vidas');
    parrafoInicio = document.getElementById('parrafo');
    parrafoGuiones = document.getElementById('guiones');
    parrafoOculto = document.getElementById('parrafoOculto');
}

function getNuevaPalabra() {
    parrafoInicio.style.display = 'none';
    parrafoGuiones.style.display = '';
    parrafoVidas.style.display = '';
    parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    let indice = getRandomWord(0, cultura.length - 1).toFixed(0);
    palabraSeleccionada = cultura[indice];
    letrasRestantes = palabraSeleccionada.length;
    getGuiones(palabraSeleccionada);
    let contenido = getPalabraOculta();
    parrafoGuiones.textContent = contenido;
    // parrafoOculto.style.display = '';
    mostrarBotonera();
}

function getPalabraOculta() {
    let palabraConGuiones = "";
    for (let i = 0; i < palabraOcultada.length; i++) {
        palabraConGuiones += palabraOcultada[i];
    }
    return palabraConGuiones;
}

function getRandomWord(min, max) {
    return Math.random() * (max - min) + min;
}

function getGuiones(palabra) {
    let letras = palabra.split("");
    console.log(letras);
    for (let i = 0; i < letras.length; i++) {
        palabraOcultada[i] = " _ ";
    }
    console.log(palabraOcultada);
    console.log(palabraOcultada.length);
}

function comprobarSiHayEsaLetra(botonLetra) {
    console.log(botonLetra);
    letra = botonLetra.innerText.toLowerCase();
    botonLetra.disable = true;
    botonLetra.style.opacity = 0.7;
    botonLetra.setAttribute('onclick', '');
    console.log(letra);
    let letraEncontrada = false;

    //if(!checkLetraUsada(letra)){
    for (let i = 0; i < palabraOcultada.length; i++) {
        if (letra == palabraSeleccionada[i]) {
            palabraOcultada[i] = letra;
            let contenido = getPalabraOculta();
            parrafoGuiones.textContent = contenido;
            console.log(palabraOcultada);
            letraEncontrada = true;
            letrasRestantes--;
        }
    }
    //}
    document.getElementById('letra').value = "";
    if (letraEncontrada) {
        console.log('está la letra');
        console.log('letras restantes = ' + letrasRestantes);
        console.log(palabraSeleccionada.length);
        if (letrasRestantes == 0) {
            parrafoVidas.style.color = 'green';
            parrafoVidas.textContent = '¡HAS GANADO!';
            parrafoOculto.style.display = 'none';
        }
    } else {
        console.log('NO está la letra');
        numeroVidas--;
        numeroVidas = getVidas();
    }
}

function getVidas() {
    if (numeroVidas == 0) {
        parrafoOculto.style.display = 'none';
        parrafoVidas.textContent = 'Se acabó la partida';
        parrafoGuiones.textContent = 'La palabra secreta era "' + palabraSeleccionada + '"';
    } else {
        parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    }
    return numeroVidas;
}

function mostrarBotonera() {
    let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let espacioBotonera = document.getElementById('botonera');
    for (let i = 0; i < abecedario.length; i++) {
        let span = document.createElement('span');
        let botonLetra = document.createElement('button');
        botonLetra.innerText = abecedario[i];
        botonLetra.setAttribute('onclick', 'comprobarSiHayEsaLetra(this)');
        span.appendChild(botonLetra);
        espacioBotonera.appendChild(span);
    }
}

// function checkLetraUsada(letra){
//     console.log(letrasUsadas.length);
//     for(let i=0; i<letrasUsadas.length; i++){
//         if(letra==letrasUsadas[i]){
//             alert('Ya has usado esa letra');
//             return true;
//         }else{
//             console.log('letra añadida')
//             letrasUsadas.push(letra);
//             return false;
//         }
//     }
// }
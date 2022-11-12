let parrafoVidas = "";
let botonJugar = "";
let parrafoGuiones = "";
let palabraOcultada = [];
let letrasRestantes = "";
let palabraSeleccionada = "";
let numeroVidas = 6;
let categorias = "";
let espacioBotonera = "";
let selectNivel = "";
let countNivel = 1;
let botonCategoria = "";
const music = new Audio("sound/west.mp3");
const fallo = new Audio("sound/fallo.mp3");
const hasPerdido = new Audio("sound/goofy.mp3");
const winnner = new Audio("sound/winner.mp3");

// Inicializa estas variables cuando cargue el contenido para interactuar con la página
function lanzadera() {
    parrafoVidas = document.getElementById('vidas');
    botonJugar = document.getElementById('jugar');
    parrafoGuiones = document.getElementById('guiones');
    espacioBotonera = document.getElementById('botonera');
}

// Muestra el contenido a pantalla completa o a modo ventana según su estado actual
function toggleFullScreen() {
    let textoBoton = document.getElementById('bt-pantalla-completa');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        textoBoton.textContent = "[ ]";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            textoBoton.textContent = "[ ]";
        }
    }
}

function getRandomNumber(min, max) {
    let numeroAleatorio = Math.random() * (max - min) + min;
    return numeroAleatorio.toFixed(0);
}

function letraMasAparecida(palabra) {
    let initialArray = palabra.split("");
    const array = initialArray.sort();

    let items = [];
    let counterTimesRepeat = [];
    let count = 1;

    for (let i = 0; i < array.length; i++) {
        if (array[i + 1] === array[i]) {
            count++;
        } else {
            items.push(array[i]);
            counterTimesRepeat.push(count);
            count = 1;
        }

    }

    let maxItem = counterTimesRepeat.indexOf(Math.max(...counterTimesRepeat));
    let itemMaxRepeat = items[maxItem];
    return itemMaxRepeat;
}

function letraAleatoriaDeLaPalabraSeleccionada(palabraSeleccionada){
    console.log(palabraSeleccionada);
    let numeroAleatorio = getRandomNumber(0, palabraSeleccionada.length-1);
    let arrayPalabraSeleccionada = palabraSeleccionada.split('');
    console.log(arrayPalabraSeleccionada);
    let letraAleatoria = arrayPalabraSeleccionada[numeroAleatorio];
    console.log('letra aleatoria = '+letraAleatoria);
    return letraAleatoria;
}

function cambiaLetra(letra) {
    for (let i = 0; i < palabraOcultada.length; i++) {
        if (letra == palabraSeleccionada[i]) {
            palabraOcultada[i] = letra;
            let contenido = getPalabraOculta();
            parrafoGuiones.textContent = contenido;
            letrasRestantes--;
        }
    }
}

function nivel() {
    let selectNivel = document.getElementById('nivel');
    let nivel = selectNivel.options[selectNivel.selectedIndex].value;
    console.log(nivel);
    let pistaLetra = "";

    if (nivel == 0) {
        nivel = 1;
    }

    if (nivel == 1) {
        pistaLetra = letraMasAparecida(palabraSeleccionada);
        cambiaLetra(pistaLetra);
    } else if (nivel == 2) {
        pistaLetra = letraAleatoriaDeLaPalabraSeleccionada(palabraSeleccionada);
        cambiaLetra(pistaLetra);
    } else if (nivel == 3) {

    } else if (nivel == 4) {

    }
    return pistaLetra;
}

function seleccionarPalabraCategoria() {
    let categorias = document.getElementById('opciones');
    let categoriaSeleccionada = categorias.options[categorias.selectedIndex].textContent;

    if (categoriaSeleccionada != "seleccionar categoria") {
        let arrayPalabrasCategoria = document.getElementById(categoriaSeleccionada).textContent.split(" ");

        let indice = getRandomNumber(0, arrayPalabrasCategoria.length - 1);

        palabraSeleccionada = arrayPalabrasCategoria[indice];
    } else {
        categorias.options[0].textContent = 'categoria random';

        let indiceAleatorio = getRandomNumber(1, categorias.options.length - 1);

        let categoriaAleatoria = categorias.options[indiceAleatorio].textContent;
        console.log(categoriaAleatoria);

        let arrayPalabrasCategoriaAleatoria = document.getElementById(categoriaAleatoria).textContent.split(" ");

        let palabraAleatoria = getRandomNumber(0, arrayPalabrasCategoriaAleatoria.length - 1);

        palabraSeleccionada = arrayPalabrasCategoriaAleatoria[palabraAleatoria];
    }
    console.log(palabraSeleccionada);
    return palabraSeleccionada;
}

function getPalabraOculta() {
    let palabraConGuiones = "";
    for (let i = 0; i < palabraOcultada.length; i++) {
        palabraConGuiones += palabraOcultada[i];
    }
    return palabraConGuiones;
}

function getGuiones(palabra) {
    let letras = palabra.split("");

    for (let i = 0; i < letras.length; i++) {
        palabraOcultada[i] = " _ ";
    }

    let letraParaDesabilitar = nivel(palabraOcultada);
    console.log('letra ' + letraParaDesabilitar);
    mostrarBotonera(letraParaDesabilitar);
}

function mostrarBotonera(letraParaDesabilitar) {
    let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < abecedario.length; i++) {
        let span = document.createElement('span');
        let botonLetra = document.createElement('button');
        botonLetra.innerText = abecedario[i];
        botonLetra.setAttribute('onclick', 'comprobarSiHayEsaLetra(this)');
        if (letraParaDesabilitar == abecedario[i].toLowerCase()) {
            console.log(botonLetra.innerText + ' desabilitada');
            botonLetra.setAttribute('disabled', 'true');
            botonLetra.style.opacity = 0.7;
            botonLetra.style.backgroundColor = 'gray';
        }
        botonLetra.classList.add('botonLetra');
        span.appendChild(botonLetra);
        espacioBotonera.appendChild(span);
    }
}

function borrarBotonesBotonera() {
    let botonera = document.getElementById('botonera');
    while (botonera.hasChildNodes()) {
        botonera.removeChild(botonera.firstChild);
    }
}
function comprobarSiHayEsaLetra(botonLetra) {
    let letra = botonLetra.innerText.toLowerCase();
    botonLetra.disable = true;
    botonLetra.style.opacity = 0.7;
    botonLetra.style.backgroundColor = 'gray';
    botonLetra.setAttribute('onclick', '');
    let letraEncontrada = false;

    for (let i = 0; i < palabraOcultada.length; i++) {
        if (letra == palabraSeleccionada[i]) {
            palabraOcultada[i] = letra;
            let contenido = getPalabraOculta();
            parrafoGuiones.textContent = contenido;
            letraEncontrada = true;
            letrasRestantes--;
        }
    }

    botonLetra.value = "";

    if (letraEncontrada) {
        if (letrasRestantes == 0) {
            sonidoWinner();
            parrafoVidas.style.color = 'green';
            parrafoVidas.textContent = '¡HAS GANADO!';
            borrarBotonesBotonera();
            categorias.options[0].textContent = 'seleccionar categoria';
            botonJugar.innerText = 'JUGAR DE NUEVO';
            botonJugar.style.display = '';
            numeroVidas = 6;
        }
    } else {
        sonidoFallo();
        numeroVidas--;
        numeroVidas = actualizaEstadoVidas();
    }
}

function actualizaEstadoVidas() {
    if (numeroVidas == 0) {
        muestraFondoHangMan(numeroVidas);
        sonidoHasPerdido();
        parrafoVidas.textContent = 'La partida ha terminado';
        parrafoGuiones.textContent = 'La palabra secreta era "' + palabraSeleccionada + '"';
        borrarBotonesBotonera();
        espacioBotonera.style.display = 'none';
        categorias.options[0].textContent = 'seleccionar categoria';
        palabraOcultada = [];
        letrasRestantes = 0;
        numeroVidas = 6;
        botonJugar.innerText = 'JUGAR DE NUEVO';
        botonJugar.style.display = '';
    } else {
        muestraFondoHangMan(numeroVidas);
        parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    }
    return numeroVidas;
}

function muestraFondoHangMan(numeroVidas) {
    let nuevoFondo = " #ff0000ae url('img/western" + numeroVidas + ".png') no-repeat center center fixed";

    if (numeroVidas == 6) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 5) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 4) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 3) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 2) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 1) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 0) {
        document.body.style.background = nuevoFondo;
    }
}

function getNuevaPalabra() {
    categorias = document.getElementById('opciones');
    categorias.style.display = 'none';
    botonJugar.style.display = 'none';
    parrafoGuiones.style.display = '';
    parrafoVidas.style.display = '';
    palabraOcultada = [];
    espacioBotonera.style.display = '';
    parrafoVidas.style.color = 'red';
    parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    palabraSeleccionada = seleccionarPalabraCategoria();
    letrasRestantes = palabraSeleccionada.length;
    getGuiones(palabraSeleccionada);
    let contenido = getPalabraOculta();
    parrafoGuiones.textContent = contenido;
    muestraFondoHangMan(numeroVidas);
}

function reproducirMusica() {
    if (music.paused) {
        music.loop = true;
        music.play();
    } else {
        music.pause();
    }
}

function sonidoFallo() {
    fallo.play();
}

function sonidoHasPerdido() {
    hasPerdido.play();
}

function sonidoWinner() {
    winnner.play();
}
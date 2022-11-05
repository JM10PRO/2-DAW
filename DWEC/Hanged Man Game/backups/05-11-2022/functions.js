let cultura = ['monumento', 'cuadro', 'vino'];
let parrafoVidas = "";
let botonJugar = "";
let parrafoGuiones = "";
let parrafoOculto = "";
let palabraOcultada = [];
let letrasRestantes = 0;
let palabraSeleccionada = "";
let numeroVidas = 6;
let letrasUsadas = [];
let espacioBotonera = "";

// Inicializa estas variables cuando cargue el contenido para interactuar con la página
function lanzadera() {
    parrafoVidas = document.getElementById('vidas');
    botonJugar = document.getElementById('jugar');
    parrafoGuiones = document.getElementById('guiones');
    parrafoOculto = document.getElementById('parrafoOculto');
    espacioBotonera = document.getElementById('botonera');
}

function getNuevaPalabra() {
    botonJugar.style.display = 'none';
    parrafoGuiones.style.display = '';
    parrafoVidas.style.display = '';
    palabraOcultada = [];
    espacioBotonera.style.display = '';
    parrafoVidas.style.color = 'red';
    parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    let indice = getRandomWord(0, cultura.length - 1).toFixed(0);
    palabraSeleccionada = cultura[indice];
    letrasRestantes = palabraSeleccionada.length;
    getGuiones(palabraSeleccionada);
    let contenido = getPalabraOculta();
    parrafoGuiones.textContent = contenido;
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
    botonLetra.style.backgroundColor = 'gray';
    botonLetra.setAttribute('onclick', '');
    console.log(letra);
    let letraEncontrada = false;

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

    document.getElementById('letra').value = "";
    if (letraEncontrada) {
        console.log('está la letra');
        console.log('letras restantes = ' + letrasRestantes);
        console.log(palabraSeleccionada.length);
        if (letrasRestantes == 0) {
            parrafoVidas.style.color = 'green';
            parrafoVidas.textContent = '¡HAS GANADO!';
            parrafoOculto.style.display = 'none';
            letrasRestantes = 0;
            numeroVidas = 6;
            borrarBotonesBotonera();
            botonJugar.innerText = 'JUGAR DE NUEVO';
            botonJugar.style.display = '';
        }
    } else {
        console.log('NO está la letra');
        numeroVidas--;
        numeroVidas = actualizaEstadoVidas();
    }
}

function actualizaEstadoVidas() {
    if (numeroVidas == 0) {
        muestraImagenHangMan(numeroVidas);
        parrafoOculto.style.display = 'none';
        parrafoVidas.textContent = 'La partida ha terminado';
        parrafoGuiones.textContent = 'La palabra secreta era "' + palabraSeleccionada + '"';
        borrarBotonesBotonera();
        espacioBotonera.style.display = 'none';
        palabraOcultada = [];
        letrasRestantes = 0;
        numeroVidas = 6;
        botonJugar.innerText = 'JUGAR DE NUEVO';
        botonJugar.style.display = '';
    } else {
        muestraImagenHangMan(numeroVidas);
        parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    }
    return numeroVidas;
}

function mostrarBotonera() {
    let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < abecedario.length; i++) {
        let span = document.createElement('span');
        let botonLetra = document.createElement('button');
        botonLetra.innerText = abecedario[i];
        botonLetra.setAttribute('onclick', 'comprobarSiHayEsaLetra(this)');
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
// Muestra el contenido a pantalla completa o a modo ventana según su estado actual
function toggleFullScreen() {
    let textoBoton = document.getElementById('bt-pantalla-completa');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        textoBoton.textContent = "Salir pantalla completa";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            textoBoton.textContent = "Pantalla completa";
        }
    }
}

function muestraImagenHangMan(numeroVidas) {
    let nuevoFondo = "url('img/western" + numeroVidas + ".png')";

    if (numeroVidas == 6) {
        document.body.style.backgroundImage = nuevoFondo;
    } else if (numeroVidas == 5) {
        document.body.style.backgroundImage = nuevoFondo;
    } else if (numeroVidas == 4) {
        document.body.style.backgroundImage = nuevoFondo;
    } else if (numeroVidas == 3) {
        document.body.style.backgroundImage = nuevoFondo;
    } else if (numeroVidas == 2) {
        document.body.style.backgroundImage = nuevoFondo;
    } else if (numeroVidas == 1) {
        document.body.style.backgroundImage = nuevoFondo;
    } else if (numeroVidas == 0) {
        document.body.style.backgroundImage = nuevoFondo;
    }
}
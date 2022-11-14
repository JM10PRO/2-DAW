let parrafoVidas = "";
let botonJugar = "";
let descripcion = "";
let parrafoGuiones = "";
let palabraOcultada = [];
let letrasRestantes = "";
let palabraSeleccionada = "";
let numeroVidas = 6;
let espacioBotonera = "";
let selectNivel = "";
let countNivel = 1;
let infoCategoria = "";
let infoNivel = "";
let infoestrellas = "";
let reloj = "";
let minutos = 3;
let segundos = 0;
let spanSegundos = "";
let spanMinutos = "";
let intervalo = "";
let estrella = "";
let recuentoEstrellas = 0;
let caballo = "";
const musica = new Audio("sound/west.mp3");
const winnner = new Audio("sound/winner.mp3");
const hasPerdido = new Audio("sound/caballo.mp3");
const acierto = new Audio("sound/ding.mp3");
const fallo = new Audio("sound/fallo.mp3");
const disparo = new Audio("sound/disparo.mp3");

// Inicializa estas variables cuando cargue el contenido para interactuar con la página
function lanzadera() {
    parrafoVidas = document.getElementById('vidas');
    botonJugar = document.getElementById('jugar');
    descripcion = document.getElementById('descripcion');
    parrafoGuiones = document.getElementById('guiones');
    espacioBotonera = document.getElementById('botonera');
    infoCategoria = document.getElementById('infoCategoria');
    infoNivel = document.getElementById('infoNivel');
    infoestrellas = document.getElementById('infoestrellas');
    reloj = document.getElementById('reloj');
    spanMinutos = document.getElementById('minutos');
    spanSegundos = document.getElementById('segundos');
    estrella = document.getElementById('estrella');
    caballo = document.getElementById('caballo');
    reproducirMusica();
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

function letraAleatoriaDeLaPalabraSeleccionada(palabraSeleccionada) {
    console.log(palabraSeleccionada);
    let numeroAleatorio = getRandomNumber(0, palabraSeleccionada.length - 1);
    let arrayPalabraSeleccionada = palabraSeleccionada.split('');
    console.log(arrayPalabraSeleccionada);
    let letraAleatoria = arrayPalabraSeleccionada[numeroAleatorio];
    console.log('letra aleatoria = ' + letraAleatoria);
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

    if (nivel == 1) {
        pistaLetra = letraMasAparecida(palabraSeleccionada);
        cambiaLetra(pistaLetra);
    } else if (nivel == 2) {
        pistaLetra = letraAleatoriaDeLaPalabraSeleccionada(palabraSeleccionada);
        cambiaLetra(pistaLetra);
    } else if (nivel == 3) {

    }
    infoNivel.textContent = 'Nivel : ' + nivel;
    return pistaLetra;
}

function seleccionarPalabraCategoria() {
    let categorias = document.getElementById('opciones');
    let categoriaSeleccionada = categorias.options[categorias.selectedIndex].textContent;


    if (categoriaSeleccionada != "categorias") {
        let arrayPalabrasCategoria = document.getElementById(categoriaSeleccionada).textContent.split(" ");

        let indice = getRandomNumber(0, arrayPalabrasCategoria.length - 1);

        palabraSeleccionada = arrayPalabrasCategoria[indice];
    } else {
        categoriaSeleccionada = "Aleatoria";
        let indiceAleatorio = getRandomNumber(1, categorias.options.length - 1);

        let categoriaAleatoria = categorias.options[indiceAleatorio].textContent;
        console.log(categoriaAleatoria);

        let arrayPalabrasCategoriaAleatoria = document.getElementById(categoriaAleatoria).textContent.split(" ");

        let palabraAleatoria = getRandomNumber(0, arrayPalabrasCategoriaAleatoria.length - 1);

        palabraSeleccionada = arrayPalabrasCategoriaAleatoria[palabraAleatoria];
    }
    infoCategoria.textContent = 'Categoria : ' + categoriaSeleccionada;
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

function cargarSegundos() {
    let txtSegundos = "";

    if (segundos < 0) {
        segundos = 59;
    }

    // Mostramos Segundos en pantalla
    if (segundos < 10) {
        txtSegundos = `0${segundos}`;
    } else {
        txtSegundos = segundos;
    }
    spanSegundos.innerHTML = txtSegundos;
    segundos--;
    cargarMinutos(segundos);
}

function cargarMinutos(segundos) {
    let txtMinutos = "";

    if (segundos == -1 && minutos == 0) {
        clearInterval(intervalo);
        vistaHaPerdido();
    } else if (segundos == -1 && minutos !== 0) {
        setTimeout(() => {
            minutos--;
        }, 500);
    }

    // Mostramos los minutos en pantalla
    if (minutos < 10) {
        txtMinutos = `0${minutos}`;
    } else {
        txtMinutos = minutos;
    }
    spanMinutos.innerHTML = txtMinutos;
}

function iniciarCuentaAtras() {
    intervalo = setInterval(cargarSegundos, 1000);
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

function vistaHaGanado() {
    recuentoEstrellas++;
    sonidoWinner();
    borrarBotonesBotonera();
    minutos = 3;
    segundos = 0;
    clearInterval(intervalo);
    reloj.classList.remove('vibrate-3');
    parrafoVidas.style.color = 'green';
    parrafoVidas.textContent = '¡HAS GANADO!';
    let selectCategorias = document.getElementById('opciones');
    selectCategorias.style.display = '';
    let selectNivel = document.getElementById('nivel');
    selectNivel.style.display = '';
    let mensajeNivelCategoria = document.getElementById('info');
    mensajeNivelCategoria.style.display = 'none';
    botonJugar.innerText = 'JUGAR DE NUEVO';
    botonJugar.style.display = '';
    estrella.style.display = '';
    numeroVidas = 6;
}

function vistaHaPerdido() {
    muestraFondoHangMan(numeroVidas);
    sonidoHasPerdido();
    borrarBotonesBotonera();
    minutos = 3;
    segundos = 0;
    clearInterval(intervalo);
    reloj.classList.remove('vibrate-3');
    caballo.style.display = '';
    parrafoVidas.textContent = 'La partida ha terminado';
    parrafoGuiones.textContent = 'La palabra secreta era "' + palabraSeleccionada + '"';
    espacioBotonera.style.display = 'none';
    let mensajeNivelCategoria = document.getElementById('info');
    mensajeNivelCategoria.style.display = 'none';
    let selectCategorias = document.getElementById('opciones');
    selectCategorias.style.display = '';
    let selectNivel = document.getElementById('nivel');
    selectNivel.style.display = '';
    palabraOcultada = [];
    letrasRestantes = 0;
    numeroVidas = 6;
    botonJugar.innerText = 'JUGAR DE NUEVO';
    botonJugar.style.display = '';
}

function muestraFondoHangMan(numeroVidas) {
    let nuevoFondo = "#530000ae url('img/western" + numeroVidas + ".png') no-repeat center center fixed";

    if (numeroVidas == 6) {
        document.body.style.background = nuevoFondo;
        document.body.style.backgroundSize = 'cover';
    } else if (numeroVidas == 5) {
        document.body.style.background = nuevoFondo;
        document.body.style.backgroundSize = 'cover';
    } else if (numeroVidas == 4) {
        document.body.style.background = nuevoFondo;
        document.body.style.backgroundSize = 'cover';
    } else if (numeroVidas == 3) {
        document.body.style.background = nuevoFondo;
        document.body.style.backgroundSize = 'cover';
    } else if (numeroVidas == 2) {
        document.body.style.background = nuevoFondo;
        document.body.style.backgroundSize = 'cover';
    } else if (numeroVidas == 1) {
        document.body.style.background = nuevoFondo;
        document.body.style.backgroundSize = 'cover';
    } else if (numeroVidas == 0) {
        document.body.style.background = nuevoFondo;
        document.body.style.backgroundSize = 'cover';
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
            vistaHaGanado();
        }else{
            sonidoAcierto();
        }
    } else {
        sonidoFallo();
        numeroVidas--;
        numeroVidas = actualizaEstadoVidas();
    }
}

function actualizaEstadoVidas() {
    if (numeroVidas == 0) {
        vistaHaPerdido();
    } else {
        muestraFondoHangMan(numeroVidas);
        parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    }
    return numeroVidas;
}

function mostrarElementosParaEmpezarPartida() {
    spanMinutos.innerHTML = '03';
    spanSegundos.innerHTML = '00';
    reloj.style.display = '';
    reloj.classList.add('vibrate-3');
    sonidoDisparo();
    infoestrellas.textContent = 'Estrellas : '+recuentoEstrellas;
    let mensajeNivelCategoria = document.getElementById('info');
    mensajeNivelCategoria.style.display = '';
    parrafoGuiones.style.display = '';
    parrafoVidas.style.display = '';
    parrafoVidas.style.color = 'red';
    parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    espacioBotonera.style.display = '';
}

function ocultarElementosParaEmpezarPartida() {
    estrella.style.display = 'none';
    caballo.style.display = 'none';
    descripcion.style.display = 'none';
    let selectCategorias = document.getElementById('opciones');
    selectCategorias.style.display = 'none';
    let selectNivel = document.getElementById('nivel');
    selectNivel.style.display = 'none';
    botonJugar.style.display = 'none';
}

function jugar() {
    ocultarElementosParaEmpezarPartida();
    mostrarElementosParaEmpezarPartida();
    clearInterval(intervalo);
    iniciarCuentaAtras();
    palabraOcultada = [];
    palabraSeleccionada = seleccionarPalabraCategoria();
    letrasRestantes = palabraSeleccionada.length;
    getGuiones(palabraSeleccionada);
    let contenido = getPalabraOculta();
    parrafoGuiones.textContent = contenido;
    muestraFondoHangMan(numeroVidas);
}

function reproducirMusica() {
    if (musica.paused) {
        musica.volume = 1;
        musica.loop = true;
        musica.play();
    } else {
        musica.pause();
    }
}

function sonidoAcierto() {
    acierto.play();
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
function sonidoDisparo() {
    disparo.play();
}
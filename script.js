let score = 0;
let lives = 3;
let juegoTerminado = false;

const musicaVictoria = new Audio('victoria.ogg');
const musicaDerrota = new Audio('derrota.ogg');

function generarPregunta() {
  if (juegoTerminado) return;

  let num1 = Math.floor(Math.random() * 91) + 10;
  let num2 = Math.floor(Math.random() * 91) + 10;
  const operadores = ["+", "-", "*", "/"];
  const operador = operadores[Math.floor(Math.random() * operadores.length)];
  let correcta;

  if (operador === "/") {
    correcta = Math.floor(Math.random() * 10 + 2);
    num2 = Math.floor(Math.random() * 10 + 2);
    num1 = correcta * num2;
  } else if (operador === "*") {
    num1 = Math.floor(Math.random() * 10 + 1);
    num2 = Math.floor(Math.random() * 10 + 1);
    correcta = num1 * num2;
  }

  switch (operador) {
    case "+":
      correcta = num1 + num2;
      break;
    case "-":
      correcta = num1 - num2;
      break;
    case "/":
      break;
  }

  const pregunta = `${num1} ${operador} ${num2} = ?`;
  document.getElementById("question").innerText = pregunta;

  const opciones = new Set();
  opciones.add(correcta);
  while (opciones.size < 4) {
    let distraccion = correcta + Math.floor(Math.random() * 21 - 10);
    if (distraccion !== correcta && distraccion >= 0) {
      opciones.add(distraccion);
    }
  }

  const opcionesArray = [...opciones].sort(() => Math.random() - 0.5);
  const opcionesHTML = opcionesArray.map(op =>
    `<button onclick="verificarRespuesta(${op}, ${correcta})">${op}</button>`
  ).join("");

  document.getElementById("options").innerHTML = opcionesHTML;
}

function verificarRespuesta(seleccionada, correcta) {
  if (juegoTerminado) return;

  if (seleccionada === correcta) {
    score++;
  } else {
    lives--;
  }

  if (lives <= 0) {
    juegoTerminado = true;
    musicaDerrota.play(); // 🆕 Reproducir música de derrota
    setTimeout(() => {
      alert("¡Perdiste! Intenta de nuevo.");
      reiniciar();
    }, 1200);
  } else if (score >= 10) {
    juegoTerminado = true;
    musicaVictoria.play();
    setTimeout(() => {
      alert("¡Ganaste! Has completado el reto matemático.");
      reiniciar();
    }, 1000);
  } else {
    actualizarEstado();
    generarPregunta();
  }
}

function actualizarEstado() {
  document.getElementById("score").innerText = `Puntaje: ${score} | Vidas: ${lives}`;
}

function reiniciar() {
  score = 0;
  lives = 3;
  juegoTerminado = false;
  actualizarEstado();
  generarPregunta();
}

window.onload = () => {
  actualizarEstado();
  generarPregunta();
};


async function cargarPersonajeAleatorio() {
    const personaje = await obtenerPersonajeAleatorio();
    const cuestionarioHTML = generarCuestionario(personaje);
    document.getElementById("quiz-container").innerHTML = cuestionarioHTML;
}

async function obtenerPersonajeAleatorio() {
    const id = Math.floor(Math.random() * 5) + 1;
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const personaje = await response.json();
    return personaje;
}

function generarOpcionesIncorrectasColorOjos(personaje) {
    const coloresPosibles = ["verde", "gris", "marrón", "amarillo"];
    const opcionesIncorrectas = coloresPosibles.filter(color => color !== personaje.eye_color);
    return opcionesIncorrectas.slice(0, 2);
}

function generarOpcionesIncorrectasNombreCompleto(personaje) {
    const partesNombre = personaje.name.split(" ");
    const nombreIncorrecto1 = partesNombre.reverse().join(" ");
    return [nombreIncorrecto1];
}
function generarOpcionesIncorrectas(personaje){
    const presencias = personaje.films.length
    return[presencias + 1, presencias - 1]
}

function generarCuestionario(personaje) {
    const preguntas = [
        {
            pregunta: `¿Cuál es el nombre completo de ${personaje.name.split(" ")[0]}?`,
            opciones: generarOpcionesIncorrectasNombreCompleto(personaje).concat([personaje.name]),
        },
        {
            pregunta: `¿En cuantas peliculas de Star Wars estuvo presente ${personaje.name}?`,
            opciones: generarOpcionesIncorrectas(personaje).concat([personaje.films.length]),
        },
        {
            pregunta: `¿Cuál es el color de ojos de ${personaje.name}?`,
            opciones: generarOpcionesIncorrectasColorOjos(personaje).concat([personaje.eye_color]),
        },
    ];

    let cuestionarioHTML = "<h2>Cuestionario sobre " + personaje.name + "</h2>";
    cuestionarioHTML += "<ol>";
    
    preguntas.forEach((item, index) => {
        cuestionarioHTML += `<li>${item.pregunta}`;
        cuestionarioHTML += "<ul>";
        item.opciones.forEach(opcion => {
            cuestionarioHTML += `<li>${opcion}</li>`;
        });
        cuestionarioHTML += "</ul></li>";
    });

    cuestionarioHTML += "</ol>";

    return cuestionarioHTML;
}







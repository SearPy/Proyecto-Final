
var person;
var alt = 1;

var num = Math.floor(Math.random() * 5) + 1;
console.log(num)

const endpoint = "https://swapi.dev/api/people/"+num+"/"
var nom = document.getElementById("personaje")
var pre = document.getElementById("pregunta")
var op = document.getElementById("opcion")

function cargarPersonaje(){
    fetch(endpoint).then((response) =>{
        response.json().then((data) => {
            person = data
            console.log(person)
            nom.innerHTML = "<h3>"+person.name.toUpperCase()+"</h3>"
            alt = data.height
            pregunta()
        });
    });
     
}


cargarPersonaje()
var preg = 1;


function pregunta(){
    var a;
    var b;
    var c;
    if(preg == 1){
        a = alt/100
        b = (alt - 10)/100
        c = (parseInt(alt)+ 10)/100;
        pre.innerHTML = "<h2>Cual es su altura?</h2>"
        op.innerHTML = `<li>A) ${a}</li> <li>B) ${b}</li> <li>C) ${c}</li>`
    }else if(preg == 2){
        a = "Verdes";
        if(person.eye_color == "blue"){
            b = "Azules";
        }else if(person.eye_color == "yellow"){
            b = "Amarillos"
        }else if(person.eye_color == "red"){
            b = "Rojo"
        }else{
            b = "Marrones"
        }
        var c = "Negros";
        pre.innerHTML = "<h2>Cual es el color de sus ojos?</h2>"
        op.innerHTML = `<li>A) ${a}</li> <li>B) ${b}</li> <li>C) ${c}</li>`
    }else if(preg ==3){
        a = 1
        b = 2
        c = person.films.length
        pre.innerHTML = "<h2>En cuantas peliculas aparecio?</h2>"
        op.innerHTML = `<li>A) ${a}</li> <li>B) ${b}</li> <li>C) ${c}</li>`
    }else if(preg ==4){
        a = person.starships.length;
        b = (person.starships.length)+1;
        c = (person.starships.length)+2;
        pre.innerHTML = "<h2>Cuantas naves ha pilotado?</h2>"
        op.innerHTML = `<li>A) ${a}</li> <li>B) ${b}</li> <li>C) ${c}</li>`
    }
}

const buttona = document.getElementById("opcionA");
const buttonb = document.getElementById("opcionB");
const buttonc = document.getElementById("opcionC");
const siguiente = document.getElementById("siguiente");
const respuesta = document.getElementById("correcto");
const puntuacion = document.getElementById("puntos");
var puntos = 0;

buttona.addEventListener('click', () => {
    if(preg == 1 || preg == 4){
        respuesta.innerHTML = "<h1> Correcto! </h1>"
        puntos ++
        if(preg == 4) renderPoints()
    }else{
        respuesta.innerHTML = "<h1> Fallaste! </h1>"
    }
    preg ++
});

buttonb.addEventListener('click', () => {
    if(preg == 2){
        respuesta.innerHTML = "<h1> Correcto! </h1>"
        puntos ++
    }else{
        respuesta.innerHTML = "<h1> Fallaste! </h1>"
    }
    if(preg == 4) renderPoints()
    preg ++
});

buttonc.addEventListener('click', () => {
    if(preg == 3){
        respuesta.innerHTML = "<h1> Correcto! </h1>"
        puntos ++
    }else{
        respuesta.innerHTML = "<h1> Fallaste! </h1>"
    }
    if(preg == 4) renderPoints()
    preg ++
});

siguiente.addEventListener('click', () => {
    console.log(preg)
    pregunta();
    respuesta.innerHTML = "<h1></h1>"
    
})
function renderPoints(){
    puntuacion.innerHTML = "<h2> Puntuacion final: "+puntos+"</h2>"
    siguiente.disabled = true;
    buttona.disabled = true;
    buttonb.disabled = true;
    buttonc.disabled = true;
}



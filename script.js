
var person;

var num = Math.floor(Math.random() * 5) + 1;
console.log(num)

const endpoint = "https://swapi.dev/api/people/"+num+"/"

fetch(endpoint).then((response) =>{
    response.json().then((data) => {
        person = data
        console.log(person)
    });
});


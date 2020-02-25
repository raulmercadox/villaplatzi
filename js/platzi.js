const MIN = 1;
const MAX = 10;
const CLUTTERED = 5;

var vp = document.getElementById("villaplatzi");
var papel = vp.getContext("2d");

var animales = [];
var establo = [];

var fondo = new Image();
fondo.src = "../img/tile.png";

var vaca = new Image();
vaca.src = "../img/vaca.png";
vaca.nombre = "vaca";

var cerdo = new Image();
cerdo.src = "../img/cerdo.png";
cerdo.nombre = "cerdo";

var pollo = new Image();
pollo.src = "../img/pollo.png";
pollo.nombre = "pollo";

var primerCerdo = null;

fondo.addEventListener("load", cargarFondo);

vaca.addEventListener("load", cargarAnimal);
cerdo.addEventListener("load", cargarAnimal);
pollo.addEventListener("load", cargarAnimal);

document.addEventListener("keyup", moverAnimal);

var teclas = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}

function aleatorio(min, max)
{
    var numero = Math.round(min + (max - min) * Math.random());
    return numero;
}

function cargarFondo()
{
    fondo.cargado = true;
    dibujarVilla();
}

function cargarAnimal()
{
    animales.push(this);
    dibujarVilla();
}

function dibujarVilla()
{
    if (fondo.cargado && animales.length == 3)
    {
        animales.forEach((animal, indice, arreglo) => {
            var numVeces = aleatorio(MIN, MAX);
            var xMax = (vp.width - animal.width) ;
            var yMax = (vp.height - animal.height) ;
            for (var i=0; i<numVeces; i++)
            {
                frequencyX = animal.width / CLUTTERED;
                frequencyY = animal.height / CLUTTERED;
                xPosition = aleatorio(0, parseInt(xMax / frequencyX)) * parseInt(frequencyX);
                yPosition = aleatorio(0, parseInt(yMax / frequencyY)) * parseInt(frequencyY);
                // papel.drawImage(animal, xPosition , yPosition);
                establo.push({
                    especie : animal,
                    posicionX : xPosition,
                    posicionY : yPosition
                });
            }
        });
        pintarAnimales();
    }
}

function pintarAnimales()
{
    papel.drawImage(fondo, 0, 0);
    establo.forEach((animal, indice, arreglo) => {
        if (animal.especie.nombre == "cerdo" && primerCerdo == null)
        {
            primerCerdo = animal;
        }
        papel.drawImage(animal.especie, animal.posicionX , animal.posicionY);
    });
}

function moverAnimal(e) {
    console.log("x= " +primerCerdo.posicionX + " y=" + primerCerdo.posicionY);

    switch(e.keyCode)
    {
        case teclas.LEFT:
            primerCerdo.posicionX = primerCerdo.posicionX - 1;
            pintarAnimales();
            break;
        case teclas.UP:
            primerCerdo.posicionY = primerCerdo.posicionY - 1;
            pintarAnimales();
            break;
        case teclas.RIGHT:
            primerCerdo.posicionX = primerCerdo.posicionX + 1;
            pintarAnimales();
            break;
        case teclas.DOWN:
            primerCerdo.posicionY = primerCerdo.posicionY + 1;
            pintarAnimales();
            break;
    }

}
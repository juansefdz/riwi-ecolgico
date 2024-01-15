//variables globales

let pisoInicial = [
  {
    piso: "3",
    no_aprovechables: 0,
    organicos: 0,
    aprovechables: 0,
  },
  {
    piso: "4",
    no_aprovechables: 0,
    organicos: 0,
    aprovechables: 0,
  },
  {
    piso: "5",
    no_aprovechables: 0,
    organicos: 0,
    aprovechables: 0,
  },
];

//variables
let tipoCanecaAgregar;

//selectores globales

const piso = document.getElementById("select_floor");
const btnOpenModel = document.getElementById("btnOpenModal");
const canecas = document.querySelectorAll(".bowl"); //queryselectorall devuelve todas las clases en una lista
const btnSubmit = document.getElementById("btnSubmit");

//eventos o escuchadores

document.addEventListener("DOMContentLoaded", function () {
  const puntosEcoCache = localStorage.getItem("basuras");
  if (puntosEcoCache) {
    pisoInicial = JSON.parse(puntosEcoCache);
  }
  pintarPuntoEcologico();
});

piso.addEventListener("input", function () {
  pintarPuntoEcologico();
});

//recorro toda la lista de nodos (etiqueta HTML)
canecas.forEach((caneca) => {
  //a cada canenca le agrego un evento click
  caneca.addEventListener("click", function () {
    //evento encargado de abrir el modal
    btnOpenModel.click();
    tipoCanecaAgregar = caneca.getAttribute("type-bowl");
    console.log(tipoCanecaAgregar);
  });
});

btnSubmit.addEventListener("click", function () {
  const cantidadAgregar = document.getElementById("cantidad").value;
  const pisoAgregar = piso.value;

  //recorrer lista de puntos ecologicos
  pisoInicial.forEach((puntoEco) => {
    //buscar el piso a modificar
    if (puntoEco.piso == pisoAgregar) {
      console.log("asd", puntoEco.aprovechables);
      if (puntoEco[tipoCanecaAgregar] <= 500) {
        //modificar la caneca correspondiente
        puntoEco[tipoCanecaAgregar] += parseInt(cantidadAgregar);

        //cierre modal
        document.querySelector("#btnCloseModal").click();
        //Le hago reset a la entrada (input)
        document.getElementById("cantidad").value = "";
      }
    }
  });
  pintarPuntoEcologico();
});

//funciones
function pintarPuntoEcologico() {
  pisoInicial.forEach((caneca) => {
    if (caneca.piso == piso.value) {
      const contAprovechables = document.querySelector(
        "#aprovechables .body_top span"
      );
      const contNoAprovechables = document.querySelector(
        "#no_aprovechables .body_top span"
      );
      const contOrganicos = document.querySelector("#organicos .body_top span");

      //if (caneca[tipoCanecaAgregar] <= 500) {
      contAprovechables.textContent = `${caneca.aprovechables}/500`;
      contNoAprovechables.textContent = `${caneca.no_aprovechables}/500`;
      contOrganicos.textContent = `${caneca.organicos}/500`;

      const porcentajeLimpieza =
        ((caneca.aprovechables + caneca.no_aprovechables + caneca.organicos) /
          1500) *
        100;
      const estadoPiso = document.querySelector("#estado_piso");
      if (porcentajeLimpieza < 25) {
        document.body.style.background = "#ff0000";
        estadoPiso.textContent = `No amigo del medio ambiente!`;
      } else if (porcentajeLimpieza >= 25 && porcentajeLimpieza <= 50) {
        document.body.style.background = "#ff7c00";
        estadoPiso.textContent = `Estado del piso normal`;
      } else {
        estadoPiso.textContent = `Amigo del medio ambiente!`;
        document.body.style.background = "#00ff00";
      }

      //
    }
  });
  localStorage.setItem("basuras", JSON.stringify(pisoInicial));
}

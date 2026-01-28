
import * as Js1 from "./gestionPresupuestoWeb.js";
import * as Js2 from "./gestionPresupuesto.js";



Js2.actualizarPresupuesto(1500);
Js1.mostrarDatoEnId("presupuesto",Js2.mostrarPresupuesto());

const g1 = new Js2.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const g2 = new Js2.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const g3 = new Js2.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const g4 = new Js2.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const g5 = new Js2.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const g6 = new Js2.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

Js2.anyadirGasto(g1);
Js2.anyadirGasto(g2);
Js2.anyadirGasto(g3);
Js2.anyadirGasto(g4);
Js2.anyadirGasto(g5);
Js2.anyadirGasto(g6);

Js1.mostrarDatoEnId("gastos-totales",Js2.calcularTotalGastos());
Js1.mostrarDatoEnId("balance-total",Js2.calcularBalance());

Js1.mostrarGastoWeb("listado-gastos-completo",Js2.listarGastos());
Js1.mostrarGastoWeb("listado-gastos-filtrado-1",Js2.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));
Js1.mostrarGastoWeb("listado-gastos-filtrado-2",Js2.filtrarGastos({valorMinimo: 50}));
Js1.mostrarGastoWeb("listado-gastos-filtrado-3",Js2.filtrarGastos({valorMinimo: 200,etiquetasTiene:["seguros"]}));
Js1.mostrarGastoWeb("listado-gastos-filtrado-4",Js2.filtrarGastos({valorMaximo: 50,etiquetasTiene:["comida","transporte"]}));

Js1.mostrarGastosAgrupadosWeb("agrupacion-dia",Js2.agruparGastos("dia"),"día");
Js1.mostrarGastosAgrupadosWeb("agrupacion-mes",Js2.agruparGastos("mes"),"mes");
Js1.mostrarGastosAgrupadosWeb("agrupacion-anyo",Js2.agruparGastos("anyo"),"año");

document.getElementById("formulario-filtrado").addEventListener("submit", Js1.filtrarGastosWeb);

document.getElementById("guardar-gastos").addEventListener("click",Js1.guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener("click",Js1.cargarGastosWeb);


document.getElementById("cargar-gastos-api").addEventListener("click",Js1.cargarGastosApiClick);

const h1 = document.createElement("h1");
const h1_2 = document.createElement("h1");
const h1_3 = document.createElement("h1");
const h1_4 = document.createElement("h1");


h1.textContent = "Gastos filtrados 1";
h1_2.textContent = "Gastos filtrados 2";
h1_3.textContent = "Gastos filtrados 3";
h1_4.textContent = "Gastos filtrados 4"

document.getElementById("listado-gastos-filtrado-1").append(h1);
document.getElementById("listado-gastos-filtrado-2").append(h1_2);
document.getElementById("listado-gastos-filtrado-3").append(h1_3);
document.getElementById("listado-gastos-filtrado-4").append(h1_4);



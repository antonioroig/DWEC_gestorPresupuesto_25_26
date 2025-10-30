"use strict";

import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";

gp.actualizarPresupuesto(1500);
console.log(gp.mostrarPresupuesto());
gpw.mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());

let g1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gp.anyadirGasto(g1);
gp.anyadirGasto(g2);
gp.anyadirGasto(g3);
gp.anyadirGasto(g4);
gp.anyadirGasto(g5);
gp.anyadirGasto(g6);

gpw.mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());

gpw.mostrarDatoEnId("balance-total", gp.calcularBalance());

let listaGastos = document.getElementById("listado-gastos-completo");
if(listaGastos){
    listaGastos.textContent = "";
}

let lista = gp.listarGastos();
for(let i = 0; i < lista.length; i++){
    gpw.mostrarGastoWeb("listado-gastos-completo", lista[i]);
}

let filtro = gp.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for(let i = 0; i < filtro.length; i++){
    gpw.mostrarGastoWeb("listado-gastos-filtrado-1", filtro[i]);
}

let filtro2 = gp.filtrarGastos({ valorMinimo: 50 });
for (let i = 0; i < filtro2.length; i++) {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-2", filtro2[i]);
}

let filtro3 = gp.filtrarGastos({ valorMinimo: 200, etiqueta: "seguros" });
for (let i = 0; i < filtro3.length; i++) {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-3", filtro3[i]);
}

let filtro4 = gp.filtrarGastos({ etiquetas: ["comida", "transporte"], valorMaximo: 50 });
for (let i = 0; i < filtro4.length; i++) {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-4", filtro4[i]);
}



let agrupacionDia = gp.agruparGastos("dia");
gpw.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacionDia, "día");

let agrupacionMes = gp.agruparGastos("mes");
gpw.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacionMes, "mes");

let agrupacionAnyo = gp.agruparGastos("anyo");
gpw.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacionAnyo, "año");



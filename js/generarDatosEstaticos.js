import * as gP from "./gestionPresupuesto.js"
import * as gPWeb from "./gestionPresupuestoWeb.js"

gP.actualizarPresupuesto(1500);
gPWeb.mostrarDatoEnId('presupuesto', gP.mostrarPresupuesto());

//creo los gastos
let g1 = new gP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new gP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new gP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new gP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new gP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new gP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//añado los gastos
gP.anyadirGasto(g1);
gP.anyadirGasto(g2);
gP.anyadirGasto(g3);
gP.anyadirGasto(g4);
gP.anyadirGasto(g5);
gP.anyadirGasto(g6);

gPWeb.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
gPWeb.mostrarDatoEnId("balance-total", gP.calcularBalance());

let listCompleto = document.getElementById("listado-gastos-completo");
let lista = gP.listarGastos();
for (let i = 0; i < lista.length; i++)
    gPWeb.mostrarGastoWeb("listado-gastos-completo", lista[i]);

let filtr1 = gP.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
for (let i = 0; i < filtr1.length; i++) 
    gPWeb.mostrarGastoWeb("listado-gastos-filtrado-1", filtr1[i]);

let filtr2 = gP.filtrarGastos({ valorMinimo: 50 });
for (let i = 0; i < filtr2.length; i++) 
    gPWeb.mostrarGastoWeb("listado-gastos-filtrado-2", filtr2[i]);

let filtr3 = gP.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] });
for (let i = 0; i < filtr3.length; i++) 
    gPWeb.mostrarGastoWeb("listado-gastos-filtrado-3", filtr3[i]);

let filtr4 = gP.filtrarGastos({ etiquetasTiene: ["comida", "transporte"], valorMaximo: 50 });
for (let i = 0; i < filtr4.length; i++) 
    gPWeb.mostrarGastoWeb("listado-gastos-filtrado-4", filtr4[i]);

let agrupDia = gP.agruparGastos("dia");
gPWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupDia, "dia");

let agrupMes = gP.agruparGastos("mes");
gPWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupMes, "mes");

let agrupAnyo = gP.agruparGastos("anyo");
gPWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupAnyo, "anyo");
import * as gP from "./gestionPresupuesto.js"
import * as gPW from "./gestionPresupuestoWeb.js"

gP.actualizarPresupuesto(1500);

gPW.mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());

let gasto1 = new gP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gP.anyadirGasto(gasto1);
gP.anyadirGasto(gasto2);
gP.anyadirGasto(gasto3);
gP.anyadirGasto(gasto4);
gP.anyadirGasto(gasto5);
gP.anyadirGasto(gasto6);

let gastosTotales = gP.calcularTotalGastos()

gPW.mostrarDatoEnId("gastos-totales", gastosTotales);

let balance = gP.calcularBalance()

gPW.mostrarDatoEnId("balance-total", balance);

let listaGastos = gP.listarGastos();

for (let i = 0; i < listaGastos.length; i++)
{
    gPW.mostrarGastoWeb("listado-gastos-completo", listaGastos[i]);
}

let gastosFiltrados1 = gP.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for (let i = 0; i < gastosFiltrados1.length; i++)
{
    gPW.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltrados1[i]);
}

let gastosFiltrados2 = gP.filtrarGastos({valorMinimo: 50});
for (let i = 0; i < gastosFiltrados2.length; i++)
{
    gPW.mostrarGastoWeb("listado-gastos-filtrado-2", gastosFiltrados2[i]);
}

let gastosFiltrados3 = gP.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (let i = 0; i < gastosFiltrados3.length; i++)
{
    gPW.mostrarGastoWeb("listado-gastos-filtrado-3", gastosFiltrados3[i]);
}


let gastosFiltrados4 = gP.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});
for (let i = 0; i < gastosFiltrados4.length; i++)
{
    gPW.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados4[i]);
}

let gastosAgrupadosDia = gP.agruparGastos("dia");
gPW.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosDia, "dia");

let gastosAgrupadosMes = gP.agruparGastos("mes");
gPW.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupadosMes, "mes");

let gastosAgrupadosAnyo = gP.agruparGastos("anyo");
gPW.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupadosAnyo, "anyo");


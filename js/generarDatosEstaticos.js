import * as gP from './gestionPresupuesto.js'
import * as gPw from './gestionPresupuestoWeb.js'

gP.actualizarPresupuesto(1500);
gPw.mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());

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

gPw.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());

gPw.mostrarDatoEnId("balance-total", gP.calcularBalance());

gPw.mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());

let objfiltrado1 = {
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
}

let objfiltrado2 = {
    valorMinimo: 50
}

let objfiltrado3 = {
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
}

let objfiltrado4 = {
    etiquetasTiene: ["comida", "transporte"],
    valorMaximo: 50
}

gPw.mostrarGastoWeb("listado-gastos-filtrado-1", gP.filtrarGastos(objfiltrado1));

gPw.mostrarGastoWeb("listado-gastos-filtrado-2", gP.filtrarGastos(objfiltrado2));

gPw.mostrarGastoWeb("listado-gastos-filtrado-3", gP.filtrarGastos(objfiltrado3));

gPw.mostrarGastoWeb("listado-gastos-filtrado-4", gP.filtrarGastos(objfiltrado4));

gPw.mostrarGastosAgrupadosWeb("agrupacion-dia", gP.agruparGastos("dia"), "día");

gPw.mostrarGastosAgrupadosWeb("agrupacion-mes", gP.agruparGastos("mes"), "mes");

gPw.mostrarGastosAgrupadosWeb("agrupacion-anyo", gP.agruparGastos("anyo"), "año");

document.getElementById("guardar-gastos").addEventListener("click", gPw.guardarGastosWeb);

document.getElementById("cargar-gastos").addEventListener("click", gPw.cargarGastosWeb);

document.getElementById("cargar-gastos-api").addEventListener("click", gPw.cargarGastosApi);
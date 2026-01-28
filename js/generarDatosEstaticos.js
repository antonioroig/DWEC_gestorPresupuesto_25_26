import * as gestionWeb from "./gestionPresupuestoWeb.js"
import * as gestion from "./gestionPresupuesto.js"

gestion.actualizarPresupuesto(1500);
let presupuestoTexto = gestion.mostrarPresupuesto();
gestionWeb.mostrarDatoEnId("presupuesto", presupuestoTexto);


let gasto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestion.anyadirGasto(gasto1);
gestion.anyadirGasto(gasto2);
gestion.anyadirGasto(gasto3);
gestion.anyadirGasto(gasto4);
gestion.anyadirGasto(gasto5);
gestion.anyadirGasto(gasto6);

let total = gestion.calcularTotalGastos();
gestionWeb.mostrarDatoEnId("gastos-totales", total);

let balance = gestion.calcularBalance();
gestionWeb.mostrarDatoEnId("balance-total" , balance);

let lista = gestion.listarGastos();
lista.forEach ( elemento => {
    gestionWeb.mostrarGastoWeb("listado-gastos-completo", elemento)
});

let listaSep2021 = gestion.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
listaSep2021.forEach ( elemento => {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-1", elemento)
});

let listaMas50 = gestion.filtrarGastos({valorMinimo: 50});
listaMas50.forEach ( elemento => {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-2", elemento)
});

let listaMas200 = gestion.filtrarGastos({valorMinimo: 200});
listaMas200.forEach ( elemento => {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-3", elemento)
});

let listaConEtiquetas = gestion.filtrarGastos({etiquetasTiene: ["transporte", "comida"], valorMaximo: 50});
listaConEtiquetas.forEach ( elemento => {
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-4", elemento)
});

let agrupDia = gestion.agruparGastos("dia");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupDia,"dia");

let agrupMes = gestion.agruparGastos("mes");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupMes,"mes");

let agrupAnyo = gestion.agruparGastos("anyo");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupAnyo,"anyo");
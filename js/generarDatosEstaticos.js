import * as gp from './gestionPresupuesto.js';
import * as gpw from './gestionPresupuestoWeb.js';

//presupuesto

let valor = 1500;
gp.actualizarPresupuesto(valor);
gpw.mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto())

//gastos

let gasto1 = new gp.CrearGasto("Comprar carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

//Listado de Gastos

gpw.mostrarGastoWeb("listado-gastos-completo", gasto1);
gpw.mostrarGastoWeb("listado-gastos-completo", gasto2);
gpw.mostrarGastoWeb("listado-gastos-completo", gasto3);
gpw.mostrarGastoWeb("listado-gastos-completo", gasto4);
gpw.mostrarGastoWeb("listado-gastos-completo", gasto5);
gpw.mostrarGastoWeb("listado-gastos-completo", gasto6);

//Gastos totales

gpw.mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos())

//Balance total

gpw.mostrarDatoEnId("balance-total", gp.calcularBalance())

//Filtrado

// fecha (aaaa-mm-dd)

let filtro1 = gp.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
let filtro2 = gp.filtrarGastos({valorMinimo: 50})
let filtro3 = gp.filtrarGastos({valorMaximo: 200, etiquetasTiene: ["seguros"]})
let filtro4 = gp.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]})

if(filtro1 && filtro1.length > 0){
    filtro1.forEach(gasto => {
        gpw.mostrarGastoWeb("listado-gastos-filtrado-1", gasto)
    })
}

if(filtro2 && filtro2.length > 0){
    filtro2.forEach(gasto => {
        gpw.mostrarGastoWeb("listado-gastos-filtrado-2", gasto)
    })
}

if(filtro3 && filtro3.length > 0){
    filtro3.forEach(gasto => {
        gpw.mostrarGastoWeb("listado-gastos-filtrado-3", gasto)
    })
}

if(filtro4 && filtro4.length > 0){
    filtro4.forEach(gasto => {
        gpw.mostrarGastoWeb("listado-gastos-filtrado-4", gasto)
    })
}

//agrupacion
gpw.mostrarGastosAgrupadosWeb("agrupacion-dia", gp.agruparGastos("dia"), "día")
gpw.mostrarGastosAgrupadosWeb("agrupacion-mes", gp.agruparGastos("mes"), "mes")
gpw.mostrarGastosAgrupadosWeb("agrupacion-anyo", gp.agruparGastos("anyo"), "año")
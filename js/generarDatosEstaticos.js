"use strict";
// Importar módulos
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

// Generar datos estáticos para pruebas
gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

function generarGastosEstaticos() {
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));
}

generarGastosEstaticos();

gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

let gastos = gestionPresupuesto.listarGastos();
for (let i = 0; i < gastos.length; i++) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gastos[i]);
}
//filrado
let filtroSeptiembre = gestionPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
for (let i = 0; i < filtroSeptiembre.length; i++) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', filtroSeptiembre[i]);
}

let filtroMas50 = gestionPresupuesto.filtrarGastos({ valorMinimo: 50 });
filtroMas50.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
});

let filtroMas200 = gestionPresupuesto.filtrarGastos({ valorMinimo: 200 });
filtroMas200.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
});

let filtroGastoEtiqueta = gestionPresupuesto.filtrarGastos({ valorMinimo: 50, etiquetas: ["comida","transporte"] });
filtroGastoEtiqueta.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
});

//agrupacion

const agrupDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupDia, "día");

const agrupMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupMes, "mes");

const agrupAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupAnyo, "año");
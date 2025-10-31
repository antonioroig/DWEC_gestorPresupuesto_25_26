import * as gp from "./gestionPresupuesto.js";
import * as web from "./gestionPresupuestoWeb.js";

function main() {
    gp.actualizarPresupuesto(1500);
    web.mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());
    
    const g1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
    const g2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
    const g3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
    const g4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
    const g5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
    const g6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

    [g1, g2, g3, g4, g5, g6].forEach(gp.anyadirGasto);

    web.mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());
    web.mostrarDatoEnId("balance-total", gp.calcularBalance());

    gp.listarGastos().forEach(g => web.mostrarGastoWeb("listado-gastos-completo", g));

    gp.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })
    .forEach(g => web.mostrarGastoWeb("listado-gastos-filtrado-1", g));

    gp.filtrarGastos({ valorMinimo: 50 })
    .forEach(g => web.mostrarGastoWeb("listado-gastos-filtrado-2", g));
}
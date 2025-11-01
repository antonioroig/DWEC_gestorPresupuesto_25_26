import * as gP from "./gestionPresupuesto.js";
import * as gW from "./gestionPresupuestoWeb.js";


gP.actualizarPresupuesto(1500);
gW.mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());

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

gW.mostrarDatoEnId("gastos-totales", Math.floor(gP.calcularTotalGastos()));
gW.mostrarDatoEnId("balance-total", Math.floor(gP.calcularBalance()));

gP.listarGastos().forEach(g => gW.mostrarGastoWeb("listado-gastos-completo", g));




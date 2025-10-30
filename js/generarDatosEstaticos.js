import * as gp from './gestionPresupuesto.js'
import * as gW from './gestionPresupuestoWeb.js'

gp.actualizarPresupuesto(1500);

const preActual = gp.mostrarPresupuesto();
gW.mostrarDatoEnId("presupuesto", preActual);

const gasto1 = gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

const calcTotGasto = gp.calcularTotalGastos();
gW.mostrarDatoEnId("gastos-totales", calcTotGasto);

const balance = gp.calcularBalance();
gW.mostrarDatoEnId("balance-total", balance);
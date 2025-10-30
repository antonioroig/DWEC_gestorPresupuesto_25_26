import * as gp from './gestionPresupuesto.js'
import * as gW from './gestionPresupuestoWeb.js'

gp.actualizarPresupuesto(1500);

const preActual = gp.mostrarPresupuesto();
gW.mostrarDatoEnId("presupuesto", preActual);

let gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
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

const calcTotGasto = gp.calcularTotalGastos();
gW.mostrarDatoEnId("gastos-totales", calcTotGasto);

const balance = gp.calcularBalance();
gW.mostrarDatoEnId("balance-total", balance);

const lGasto = gp.listarGastos();
for (let i = 0; i < lGasto.length; i++) {
  const gasto = lGasto[i];

  const fecha = new Date(gasto.fecha);
  if (!isNaN(fecha)) {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anyo = fecha.getFullYear();
    gasto.fecha = `${dia}/${mes}/${anyo}`;
  }

  gW.mostrarGastoWeb("listado-gastos-completo", gasto);
}


import * as gP from './gestionPresupuesto.js'
import * as gW from './gestionPresupuestoWeb.js'

gP.actualizarPresupuesto(1500);
const presupuesto = gP.mostrarPresupuesto();
gW.mostrarDatoEnId(presupuesto,"presupuesto");

const gasto1 = new gP.CrearGasto ("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gP.CrearGasto ("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = new gP.CrearGasto ("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = new gP.CrearGasto ("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = new gP.CrearGasto ("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = new gP.CrearGasto ("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gP.anyadirGasto(gasto1);
gP.anyadirGasto(gasto2);
gP.anyadirGasto(gasto3);
gP.anyadirGasto(gasto4);
gP.anyadirGasto(gasto5);
gP.anyadirGasto(gasto6);

const gastoTotal = gP.calcularTotalGastos();
gW.mostrarDatoEnId(gastoTotal,"gastos-totales");

const balanceTotal = gP.calcularBalance();
gW.mostrarDatoEnId(balanceTotal,"balance-total")

const listadoGastos = gP.listarGastos();
gW.mostrarGastoWeb(listadoGastos,"listado-gastos-completo")

const listadoGastosSep = gP.listarGastos();
gW.mostrarGastoWeb(listadoGastosSep,"listado-gastos-completo1")

const listadoGastos50 = gP.listarGastos();
gW.mostrarGastoWeb(listadoGastos50,"listado-gastos-completo2")

const listadoGastos200 = gP.listarGastos();
gW.mostrarGastoWeb(listadoGastos200,"listado-gastos-completo3")

const listadoGastosMenos50 = gP.listarGastos();
gW.mostrarGastoWeb(listadoGastosMenos50,"listado-gastos-completo4")


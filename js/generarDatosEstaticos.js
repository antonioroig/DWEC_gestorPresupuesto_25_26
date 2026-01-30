'use strict';

import * as funcs from './gestionPresupuestoWeb.js';
import * as funcs2 from './gestionPresupuesto.js';

funcs2.actualizarPresupuesto(1500);
funcs.mostrarDatoEnId('presupuesto', funcs2.mostrarPresupuesto());

let gasto1 = new funcs2.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new funcs2.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new funcs2.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new funcs2.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new funcs2.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new funcs2.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

funcs2.anyadirGasto(gasto1);
funcs2.anyadirGasto(gasto2);
funcs2.anyadirGasto(gasto3);
funcs2.anyadirGasto(gasto4);
funcs2.anyadirGasto(gasto5);
funcs2.anyadirGasto(gasto6);

funcs.mostrarDatoEnId('gastos-totales', funcs2.calcularTotalGastos());
funcs.mostrarDatoEnId('balance-total', funcs2.calcularBalance());
funcs.mostrarGastoWeb('listado-gastos-completo', funcs2.listarGastos());
funcs.mostrarGastoWeb('listado-gastos-filtrado-1', funcs2.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));
funcs.mostrarGastoWeb('listado-gastos-filtrado-2', funcs2.filtrarGastos({valorMinimo: 50}));
funcs.mostrarGastoWeb('listado-gastos-filtrado-3', funcs2.filtrarGastos({etiquetasTiene: ["seguros"], valorMinimo:200}));
funcs.mostrarGastoWeb('listado-gastos-filtrado-4', funcs2.filtrarGastos({etiquetasTiene: ["comida", "transporte"], valorMaximo:50}));
funcs.mostrarGastosAgrupadosWeb('agrupacion-dia', funcs2.agruparGastos('dia'), 'día');
funcs.mostrarGastosAgrupadosWeb('agrupacion-mes', funcs2.agruparGastos('mes'), 'mes');
funcs.mostrarGastosAgrupadosWeb('agrupacion-anyo', funcs2.agruparGastos('anyo'), 'anyo');
funcs.filtrarGastoWeb();






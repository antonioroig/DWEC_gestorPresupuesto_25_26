//ACTUALIZAR Y MOSTRAR EL PRESUPUESTO EN  DIVPRESUPUESTO
gP.actualizarPresupuesto(1500);
gPw.mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto())

//CREAR LOS 6 GASTOS Y AÑADIRLOS

gP.anyadirGasto(new gP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gP.anyadirGasto(new gP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gP.anyadirGasto(new gP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gP.anyadirGasto(new gP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gP.anyadirGasto(new gP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gP.anyadirGasto(new gP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

//MOSTRAR TODOS LOS GASTOS EN DIVGASTOSTOTALES
gPw.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());

//MOSTRAR EL BALANCE TOTAL EN BALANCETOTAL
gPw.mostrarDatoEnId("balance-total", gP.calcularBalance());

//MOSTRAR EL LISTADO COMPLETO DE GASTOS EN DIVLISTADOGASTOSCOMPLETOS
gPw.mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());

import * as gP from "./gestionPresupuesto.js"
import * as gPw from "./gestionPresupuestoWeb.js"
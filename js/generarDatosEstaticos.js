
import * as gP from './gestionPresupuesto.js'
import * as gW from './gestionPresupuestoWeb.js'

gP.actualizarPresupuesto(1500);
const presupuesto = gP.mostrarPresupuesto();
gW.mostrarDatoEnId(presupuesto,"presupuesto");

let gasto1 = new gP.CrearGasto ("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gP.CrearGasto ("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gP.CrearGasto ("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gP.CrearGasto ("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gP.CrearGasto ("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gP.CrearGasto ("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

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
//filtrados

let lGasto = gP.listarGastos();
for (let i = 0; i < lGasto.length; i++) {
  let gasto = lGasto[i];
  
  gW.mostrarGastoWeb("listado-gastos-completo", gasto);
}


let lGastosSep = gP.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"})
for (let i = 0; i < lGastosSep.length; i++){




  gW.mostrarGastoWeb("listado-gastos-filtrado-1", lGastosSep[i]);
}

let listadoGastos50 = gP.filtrarGastos({
  valorMinimo: 50
});
for(let i = 0; i < listadoGastos50.length; i++){
  gW.mostrarGastoWeb("listado-gastos-filtrado-2", listadoGastos50[i]);
}

let listadoGastos200 = gP.filtrarGastos({valorMinimo: 200, etiquetas: "seguros"});

for(let i = 0; i < listadoGastos200.length; i++){
  gW.mostrarGastoWeb("listado-gastos-filtrado-3", listadoGastos200[i]);
}

let listadoGastosMenos50 = gP.filtrarGastos({valorMaximo: 50, etiquetas: "comida" || "transporte"
});

for(let i = 0; i < listadoGastosMenos50.length; i++){
  gW.mostrarGastoWeb("listado-gastos-filtrado-4", listadoGastosMenos50[i]);
}
//agruupaciones

let gastosDia = gP.agruparGastos("dia");
gW.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosDia, "día");

let gastosMes = gP.agruparGastos("mes");
gW.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

let gastosAnyo = gP.agruparGastos("anyo")
gW.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "año");


import * as gp from './gestionPresupuesto.js'
import * as gW from './gestionPresupuestoWeb.js'

gp.actualizarPresupuesto(1500);

let preActual = gp.mostrarPresupuesto();
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


let calcTotGasto = gp.calcularTotalGastos();
gW.mostrarDatoEnId("gastos-totales", calcTotGasto);


let balance = gp.calcularBalance();
gW.mostrarDatoEnId("balance-total", balance);


let lGasto = gp.listarGastos();
for (let i = 0; i < lGasto.length; i++) {
  let gasto = lGasto[i];

  let fecha = new Date(gasto.fecha);
  if (!isNaN(fecha)) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anyo = fecha.getFullYear();
    gasto.fecha = `${dia}/${mes}/${anyo}`;
  }

  gW.mostrarGastoWeb("listado-gastos-completo", gasto);
}


let fFecha = gp.filtrarGastos({
  fechaDesde: "2021-09-01",
  fechaHasta: "2021-09-30"
})

for (let i = 0; i < fFecha.length; i++) {
  gW.mostrarGastoWeb("listado-gastos-filtrado-1", fFecha[i]);
}


let fGastosMas50 = gp.filtrarGastos({
  valorMinimo: 50
});

for(let i = 0; i < fGastosMas50.length; i++){
  gW.mostrarGastoWeb("listado-gastos-filtrado-2", fGastosMas50[i]);
}


let fGastos3= gp.filtrarGastos({
  valorMinimo: 200,
  etiquetas: "seguros"
});

for(let i = 0; i < fGastos3.length; i++){
  gW.mostrarGastoWeb("listado-gastos-filtrado-3", fGastos3[i]);
}
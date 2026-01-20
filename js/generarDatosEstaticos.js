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

const gastos = gP.listarGastos();
for (let i = 0; i < gastos.length; i++) {
  const gasto = gastos[i];

  let fechaObj = new Date(gasto.fecha);
  if (!isNaN(fechaObj)) {
    let dia = fechaObj.getDate();
    let mes = fechaObj.getMonth() + 1;
    let anyo = fechaObj.getFullYear();

    gasto.fecha = `${anyo}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
  }

  gW.mostrarGastoWeb("listado-gastos-completo", gasto);
} 

document.getElementById("listado-gastos-filtrado-1").innerHTML = "";

let filtro1 = gP.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
for (let i = 0; i < filtro1.length; i++) {
  gW.mostrarGastoWeb("listado-gastos-filtrado-1", filtro1[i]);
}

let filtro2 = gP.filtrarGastos({ valorMinimo: 50 });
for (let i = 0; i < filtro2.length; i++) 
  gW.mostrarGastoWeb("listado-gastos-filtrado-2", filtro2[i]);

let filtro3 = gP.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] });
for (let i = 0; i < filtro3.length; i++) 
  gW.mostrarGastoWeb("listado-gastos-filtrado-3", filtro3[i]);

let filtro4 = gP.filtrarGastos({ etiquetasTiene: ["comida", "transporte"], valorMaximo: 50 });
for (let i = 0; i < filtro4.length; i++) 
  gW.mostrarGastoWeb("listado-gastos-filtrado-4", filtro4[i]);

gW.mostrarGastosAgrupadosWeb("agrupacion-dia", gP.agruparGastos("dia"), "día");
gW.mostrarGastosAgrupadosWeb("agrupacion-mes", gP.agruparGastos("mes"), "mes");
gW.mostrarGastosAgrupadosWeb("agrupacion-anyo", gP.agruparGastos("anyo"), "año");
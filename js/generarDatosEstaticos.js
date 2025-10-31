import * as gp from "./gestionPresupuesto.js";
import * as web from "./gestionPresupuestoWeb.js";

function main() {
  gp.actualizarPresupuesto(1500);
  web.mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());
}
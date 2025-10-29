"use strict";

import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";

gp.actualizarPresupuesto(1500);
console.log(gp.mostrarPresupuesto());
gpw.mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());
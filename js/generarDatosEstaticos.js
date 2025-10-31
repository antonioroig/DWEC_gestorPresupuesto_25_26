"use strict"
import * as presupuesto from './gestionPresupuesto.js'
import * as presupuestoWeb from "./gestionPresupuestoWeb.js"


presupuesto.actualizarPresupuesto(1500);

let presupuestoValor = presupuesto.mostrarPresupuesto()
presupuestoWeb.mostrarDatoEnId("presupuesto", presupuestoValor)

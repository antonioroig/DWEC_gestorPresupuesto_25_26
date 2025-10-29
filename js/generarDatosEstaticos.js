import * as gp from './gestionPresupuesto.js'
import * as gW from './gestionPresupuestoWeb.js'

gp.actualizarPresupuesto(1500);

const preActual = gp.mostrarPresupuesto();
gW.mostrarDatoEnId(presupuesto, preActual);


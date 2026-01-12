"use strict"
import * as presupuesto from './gestionPresupuesto.js'
import * as presupuestoWeb from "./gestionPresupuestoWeb.js"


presupuesto.actualizarPresupuesto(1500)

let presupuestoValor = presupuesto.mostrarPresupuesto()
presupuestoWeb.mostrarDatoEnId("presupuesto", presupuestoValor)

let gasto1 = new presupuesto.CrearGasto("Comprar carne", 23.44, "2021-10-06", "casa", "comida")
let gasto2 = new presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let gasto3 = new presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte")
let gasto4 = new presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let gasto5 = new presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let gasto6 = new presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")

presupuesto.anyadirGasto(gasto1)
presupuesto.anyadirGasto(gasto2)
presupuesto.anyadirGasto(gasto3)
presupuesto.anyadirGasto(gasto4)
presupuesto.anyadirGasto(gasto5)
presupuesto.anyadirGasto(gasto6)

let totalGastos = presupuesto.calcularTotalGastos()
presupuestoWeb.mostrarDatoEnId("gastos-totales", totalGastos)

let balanceTotal = presupuesto.calcularBalance()
presupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal)


let listadoCompletoGastos = presupuesto.listarGastos()
presupuestoWeb.mostrarGastoWeb("listado-gastos-completo",listadoCompletoGastos)

let listadoGastosFiltrados1 = presupuesto.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta: "2021-09-30"})
presupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",listadoGastosFiltrados1)


let listadoGastosFiltrados2 = presupuesto.filtrarGastos({valorMinimo : 50})
presupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", listadoGastosFiltrados2)



let listadoGastosFiltrados3 = presupuesto.filtrarGastos({valorMinimo : 200, etiquetasTiene: ["seguros"]})
presupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", listadoGastosFiltrados3)


let listadoGastosFiltrados4 = presupuesto.filtrarGastos({valorMaximo : 50, etiquetasTiene: ["comida","transporte"]})
presupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", listadoGastosFiltrados4)

let datosAgrupadosDia = presupuesto.agruparGastos("dia")
presupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", datosAgrupadosDia , "día")

let datosAgrupadosMes = presupuesto.agruparGastos("mes")
presupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", datosAgrupadosMes, "mes")

let datosAgrupadosAnyo = presupuesto.agruparGastos("anyo")
presupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", datosAgrupadosAnyo, "año")

document.getElementById("actualizarpresupuesto").addEventListener("click", presupuestoWeb.actualizarPresupuestoWeb)

document.getElementById("anyadirgasto").addEventListener("click", presupuestoWeb.nuevoGastoWeb)
document.getElementById("anyadirgasto-formulario").addEventListener("click", presupuestoWeb.nuevoGastoWebFormulario)
document.getElementById("formulario-filtrado").addEventListener("submit", presupuestoWeb.filtrarGastoWeb)
document.getElementById("guardar-gastos").addEventListener("click", presupuestoWeb.guardarGastoWeb)
document.getElementById("cargar-gastos").addEventListener("click", presupuestoWeb.cargarGastoWeb)
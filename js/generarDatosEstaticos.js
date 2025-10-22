import * as gestionPresupuesto from "./gestionPresupuesto.js"
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js"

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte")
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
gestionPresupuesto.anyadirGasto(gasto1)
gestionPresupuesto.anyadirGasto(gasto2)
gestionPresupuesto.anyadirGasto(gasto3)
gestionPresupuesto.anyadirGasto(gasto4)
gestionPresupuesto.anyadirGasto(gasto5)
gestionPresupuesto.anyadirGasto(gasto6)


gestionPresupuesto.actualizarPresupuesto(1500)
let string = gestionPresupuesto.mostrarPresupuesto()
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", string)


let totalGastos = gestionPresupuesto.calcularTotalGastos()
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", totalGastos)

let balance = gestionPresupuesto.calcularBalance()
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balance)

let gastosCompletos = gestionPresupuesto.listarGastos()
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gastosCompletos)

let filtroFecha = {fechaDesde: "2021-09-01", fechaHasta: "2021-09-31"}
let gastosFiltradosFecha = gestionPresupuesto.filtrarGastos(filtroFecha)
console.log(gastosFiltradosFecha)
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltradosFecha)
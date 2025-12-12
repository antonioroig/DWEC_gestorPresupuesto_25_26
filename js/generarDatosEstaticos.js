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

let titulo = document.createElement("h1")
titulo.innerText = "Gastos Filtrados"
let divGastosCompletos = document.getElementById("listado-gastos-completo")
divGastosCompletos.append(titulo)

let filtroFecha = {fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}
let gastosFiltradosFecha = gestionPresupuesto.filtrarGastos(filtroFecha)
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltradosFecha)

let gastosFiltradosPrecioMinimo = gestionPresupuesto.filtrarGastos({valorMinimo: 50})
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastosFiltradosPrecioMinimo)

let gastosFiltradosPrecioMinimoEtiqueta = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]})
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastosFiltradosPrecioMinimoEtiqueta)

let gastosFiltradosPrecioMaximoEtiquetas = gestionPresupuesto.filtrarGastos({valorMaximo : 50, etiquetasTiene: ["comida", "transporte"]})
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltradosPrecioMaximoEtiquetas)

let gastosAgrupadosDia = gestionPresupuesto.agruparGastos("dia")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosDia, "día")

let gastosAgrupadoMes = gestionPresupuesto.agruparGastos("mes")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupadoMes, "mes")

let gastosAgrupadosAnyo = gestionPresupuesto.agruparGastos("anyo")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupadosAnyo, "año")

gestionPresupuestoWeb.actualizarPresupuestoWeb()
gestionPresupuestoWeb.nuevoGastoWeb()
gestionPresupuestoWeb.nuevoGastoWebFormulario()
gestionPresupuestoWeb.filtrarGastosWeb()